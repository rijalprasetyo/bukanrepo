import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, query, where, onSnapshot, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


const PB_URL = "https://hanabira48.site/pb";

const firebaseConfig = {
    apiKey: "AIzaSyCOEEMU_NHJtbrslA4hote132-sw87MwRA",
    authDomain: "billing-6f1eb.firebaseapp.com",
    projectId: "billing-6f1eb",
    storageBucket: "billing-6f1eb.firebasestorage.app",
    messagingSenderId: "904666584444",
    appId: "1:904666584444:web:7751229a4f465dfba300f9"
};


const pb = new PocketBase(PB_URL);
pb.beforeSend = function (url, options) {
    options.headers = Object.assign({}, options.headers, { 'xseckey': 'webgeneral' });
    return { url, options };
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);


let state = {
    customers: [],
    tokens: [],
    allTotalCount: 0,
    currentUserEmail: null,
    currentUsername: null,
    activeInvoiceId: null
};


const formatRupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
const formatDate = (dateObj) => {
    if(!dateObj) return "-";
    const d = dateObj.seconds ? new Date(dateObj.seconds * 1000) : new Date(dateObj);
    return d.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
};


window.switchTab = switchTab;
window.toggleSidebar = toggleSidebar;
window.refreshAllData = refreshAllData;
window.logout = logout;
window.openAddTrialModal = openAddTrialModal;
window.closeAddTrialModal = closeAddTrialModal;
window.openEditCustomerModal = openEditCustomer; 
window.closeEditCustomerModal = closeEditCustomerModal;
window.deleteFingerprint = deleteFingerprint;
window.resetCustomerCount = resetCustomerCount;
window.refreshBilling = refreshBilling;
window.closeInvoiceModal = () => document.getElementById('modal-invoice-detail').classList.add('hidden');
window.confirmPayment = confirmPayment;
window.showDetail = showInvoiceDetail;
window.pay = openInvoicePayment;
window.switchInvoiceTab = switchInvoiceTab;


document.addEventListener('DOMContentLoaded', () => {
    if (pb.authStore.isValid) {
        state.currentUserEmail = pb.authStore.model.email;
        state.currentUsername = pb.authStore.model.username; 
        showMainApp();
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('username').value.trim();
            const keyInput = document.getElementById('password').value.trim();
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Authenticating..."; btn.disabled = true;

            try {
                await pb.collection('users').authWithPassword(emailInput, keyInput);
                if (pb.authStore.isValid) {
                    state.currentUserEmail = pb.authStore.model.email;
                    state.currentUsername = pb.authStore.model.username; 
                    showMainApp();
                    showToast(`Welcome, ${state.currentUsername}!`, 'success');
                } else {
                    showToast('Invalid Credentials.', 'error');
                }
            } catch (err) {
                console.error(err);
                showToast('Error: ' + err.message, 'error');
            }
            btn.innerText = originalText; btn.disabled = false;
        });
    }

    const formEditCust = document.getElementById('form-edit-customer');
    if(formEditCust) formEditCust.addEventListener('submit', saveEditCustomer);

    const formTrial = document.getElementById('form-add-trial');
    if(formTrial) formTrial.addEventListener('submit', handleSaveTrialUser);
    
    const searchInput = document.getElementById('search-reset-customer');
    if (searchInput) searchInput.addEventListener('input', () => renderResetControl(searchInput.value.trim()));
    
    const searchCust = document.getElementById('search-customer');
    if(searchCust) searchCust.addEventListener('input', renderCustomers);

    const billingForm = document.getElementById('billing-login-form');
    if(billingForm) {
        billingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('billing-email-input').value;
            const pass = document.getElementById('billing-pass-input').value;
            try {
                await signInWithEmailAndPassword(auth, email, pass);
                showToast("Billing Connected", "success");
            } catch(err) {
                showToast("Billing Login Failed: " + err.message, "error");
            }
        });
    }
});

function showMainApp() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-app').style.display = 'flex';
    document.body.style.overflow = 'auto';
    fetchAllData();
    initBillingAuthListener();
}

async function fetchAllData() {
    try {
        const [rawCust, toks] = await Promise.all([
            pb.collection('customers').getFullList({ sort: '-created' }),
            pb.collection('tokens').getFullList({ sort: '-created' })
        ]);

        state.allTotalCount = rawCust.length;
        const userLabel = state.currentUsername ? state.currentUsername.toUpperCase() : "RESELLER";
        state.customers = rawCust.filter(c => c.wa && c.wa.startsWith(userLabel));
        state.tokens = toks || [];

        updateDashboard(); 
        renderCustomers(); 
        renderFingerprints();
        loadScheduleOptions();

    } catch (err) {
        if(err.status === 401) logout();
        console.error(err);
    }
}

async function refreshAllData() {
    await fetchAllData();
    showToast('Data refreshed.', 'success');
}

function switchTab(tabId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active', 'bg-gray-50', 'text-brand-600');
        el.classList.add('text-slate-600');
    });
    
    const buttons = document.querySelectorAll('.nav-item');
    buttons.forEach(btn => { 
        if(btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active', 'bg-gray-50', 'text-brand-600'); 
            btn.classList.remove('text-slate-600');
        } 
    });

    if (tabId === 'billing') checkBillingAccess();
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('hidden'); }

function logout() { 
    pb.authStore.clear(); 
    fbSignOut(auth); 
    window.location.reload(); 
}

function updateDashboard() {
    document.getElementById('dash-total-subs').innerText = state.allTotalCount;
    document.getElementById('dash-reseller-subs').innerText = state.customers.length;
    
    const activeCustomers = state.customers.filter(c => c.fingerprint && c.fingerprint.length > 5);
    const activeDevEl = document.getElementById('dash-active-devices');
    if(activeDevEl) activeDevEl.innerText = activeCustomers.length;
}


function renderCustomers() {
    const tbody = document.getElementById('table-customers');
    tbody.innerHTML = '';
    const filterVal = document.getElementById('search-customer').value.toLowerCase();

    state.customers.forEach(c => {
        const name = c.name || "No Name";
        const email = c.email || "-";
        const regDate = c.regDate ? c.regDate.substring(0,10) : "-";
        let statusBadge = '';
        let sisaDurasiTxt = '-';
        let isVerified = c.status && c.status.toLowerCase() === 'active';

        if (!isVerified) {
            statusBadge = `<span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">PENDING</span>`;
            sisaDurasiTxt = "Wait";
        } else {
            if(c.expDate && c.expDate.length >= 10) {
                const exp = new Date(c.expDate);
                const now = new Date(); now.setHours(0,0,0,0); exp.setHours(0,0,0,0);
                const diffTime = exp - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays >= 0) {
                    statusBadge = `<span class="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold border border-brand-200">ACTIVE</span>`;
                    sisaDurasiTxt = `${diffDays} Hari`;
                } else {
                    statusBadge = `<span class="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200">EXPIRED</span>`;
                    sisaDurasiTxt = "Habis";
                }
            } else {
                statusBadge = `<span class="text-gray-400 text-xs">Error Date</span>`;
            }
        }

        if(name.toLowerCase().includes(filterVal) || email.toLowerCase().includes(filterVal)) {
            const tr = document.createElement('tr');
            tr.className = "hover:bg-gray-50 transition border-b border-gray-100";
            tr.innerHTML = `
                <td class="p-4"><div class="font-bold text-slate-800 text-sm">${name}</div><div class="text-slate-500 text-xs">${email}</div></td>
                <td class="p-4 text-slate-600 text-xs">${regDate}</td>
                <td class="p-4 text-center font-mono text-sm font-bold text-slate-700">${sisaDurasiTxt}</td>
                <td class="p-4 text-center">${statusBadge}</td>
                <td class="p-4 text-center"><span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-slate-600 font-bold">${c.wa}</span></td>
                <td class="p-4 text-center">
                    <button class="text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 p-2 rounded-lg transition" onclick="openEditCustomerModal('${c.id}')"><i class="fas fa-edit"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

function openAddTrialModal() {
    document.getElementById('modal-add-trial').classList.remove('hidden');
    document.getElementById('modal-add-trial').classList.add('flex');
    document.getElementById('form-add-trial').reset();
    
    const labelValue = state.currentUsername ? state.currentUsername.toUpperCase() : "RESELLER";
    document.getElementById('trial-wa').value = labelValue;
}

function closeAddTrialModal() {
    document.getElementById('modal-add-trial').classList.add('hidden');
    document.getElementById('modal-add-trial').classList.remove('flex');
}

async function handleSaveTrialUser(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Saving..."; btn.disabled = true;

    const name = document.getElementById('trial-name').value.trim();
    const email = document.getElementById('trial-email').value.trim();
    const durationDays = parseInt(document.getElementById('trial-duration').value);
    
    let baseLabel = state.currentUsername ? state.currentUsername.toUpperCase() : "RESELLER";
    let waLabel = baseLabel;
    
    const selectedShow = document.getElementById('trial-schedule').value;
    if (selectedShow) waLabel = `${baseLabel} - ${selectedShow}`;

    const now = new Date();
    const expDate = new Date(); expDate.setDate(now.getDate() + durationDays);
    
    const payload = {
        username: email.split('@')[0] + Math.floor(Math.random()*1000),
        email: email, emailVisibility: true,
        password: '12345678', passwordConfirm: '12345678',
        name: name, wa: waLabel, status: 'Active',
        regDate: now.toISOString(), expDate: expDate.toISOString().split('T')[0],
        resetCount: 0, isBanned: false
    };

    try {
        await pb.collection('customers').create(payload);
        showToast(`User Created (${waLabel})`, 'success');
        closeAddTrialModal();
        await fetchAllData();
    } catch (err) {
        showToast('Failed: ' + (err.data?.email ? "Email already exists" : err.message), 'error');
    }
    btn.innerText = originalText; btn.disabled = false;
}

function openEditCustomer(id) {
    const cust = state.customers.find(c => c.id === id);
    if (!cust) return;

    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = cust.name || '';
    document.getElementById('edit-email').value = cust.email || '';
    document.getElementById('edit-wa').value = cust.wa;
    document.getElementById('edit-reg-date').value = cust.regDate ? cust.regDate.substring(0,10) : '';

    const modal = document.getElementById('edit-customer-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeEditCustomerModal() {
    const modal = document.getElementById('edit-customer-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

async function saveEditCustomer(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const regDateInput = document.getElementById('edit-reg-date').value;
    
    const original = state.customers.find(c => c.id === id);
    let newExpDate = original.expDate;
    if(regDateInput && regDateInput !== original.regDate.substring(0,10)) {
        const d = new Date(regDateInput); d.setDate(d.getDate() + 30);
        newExpDate = d.toISOString().split('T')[0];
    }

    try {
        await pb.collection('customers').update(id, { name, email, regDate: regDateInput, expDate: newExpDate });
        showToast('Updated!', 'success');
        closeEditCustomerModal();
        await fetchAllData();
    } catch(err) { showToast(err.message, 'error'); }
}

function renderFingerprints() {
    const t = document.getElementById('table-fingerprint');
    t.innerHTML = '';
    
    state.customers.filter(c => c.fingerprint && c.fingerprint.length > 5).forEach(f => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 border-b border-gray-100";
        tr.innerHTML = `
            <td class="p-4"><div class="font-bold text-slate-800 text-sm">${f.name}</div><div class="text-slate-500 text-xs">${f.email}</div></td>
            <td class="p-4 text-right"><button onclick="deleteFingerprint('${f.id}')" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1 rounded text-xs font-bold uppercase transition">RESET DEVICE</button></td>
        `;
        t.appendChild(tr);
    });
    if(t.innerHTML === '') t.innerHTML = '<tr><td colspan="2" class="p-6 text-center text-gray-400">Tidak ada perangkat aktif.</td></tr>';
}

async function deleteFingerprint(id) {
    if(!confirm("Reset Device User ini?")) return;
    try { await pb.collection('customers').update(id, { fingerprint: "" }); showToast("Device Reset!", "success"); fetchAllData(); } 
    catch(err) { showToast(err.message, "error"); }
}

function renderResetControl(query) {
    const container = document.getElementById('reset-control-container');
    container.innerHTML = '';
    if (query.length < 3) return;

    const found = state.customers.filter(c => (c.email && c.email.includes(query)) || (c.id && c.id.includes(query)));
    if (found.length === 0) { container.innerHTML = `<p class="text-red-400 text-center py-4">Tidak ditemukan.</p>`; return; }

    found.forEach(c => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center';
        div.innerHTML = `
            <div>
                <p class="font-bold text-slate-800">${c.name}</p>
                <p class="text-sm text-brand-600 font-mono">${c.email}</p>
            </div>
            <div class="text-center">
                <span class="block text-xs text-gray-400 uppercase">Count</span>
                <span class="block text-2xl font-black text-red-500">${c.resetCount || 0}</span>
                <button onclick="resetCustomerCount('${c.id}')" class="text-xs text-red-600 underline mt-1">Reset</button>
            </div>
        `;
        container.appendChild(div);
    });
}

async function resetCustomerCount(id) {
    if(!confirm("Reset Count menjadi 0?")) return;
    try { await pb.collection('customers').update(id, { resetCount: 0 }); showToast("Counter Reset!", "success"); fetchAllData(); }
    catch(err) { showToast(err.message, "error"); }
}

async function loadScheduleOptions() {
    const select = document.getElementById('trial-schedule');
    if(!select) return;
    try {
        const schedules = await pb.collection('schedules').getFullList({ sort: '-date' });
        select.innerHTML = '<option value="">-- Pilih Show / Event --</option>';
        schedules.forEach(s => {
            const dateStr = s.date ? s.date.substring(0, 10) : '';
            const opt = document.createElement('option');
            opt.value = s.title; 
            opt.innerText = `${s.title} [${dateStr}]`;
            select.appendChild(opt);
        });
    } catch (err) { console.warn("Schedule load fail", err); }
}


function initBillingAuthListener() {
    onAuthStateChanged(auth, (user) => {
        const billingContainer = document.getElementById('billing-content-container');
        const authContainer = document.getElementById('billing-auth-container');
        const billingEmailInput = document.getElementById('billing-email-input');

        if(user) {
            if(billingContainer) billingContainer.classList.remove('hidden');
            if(authContainer) authContainer.classList.add('hidden');
            loadFirebaseBills(user.email);
        } else {
            if(billingContainer) billingContainer.classList.add('hidden');
            if(authContainer) authContainer.classList.remove('hidden');
            if(state.currentUserEmail && billingEmailInput) {
                billingEmailInput.value = state.currentUserEmail;
            }
        }
    });
}

function checkBillingAccess() { }

function refreshBilling() {
    if(auth.currentUser) loadFirebaseBills(auth.currentUser.email);
    else showToast("Please login to billing first.", "error");
}

function loadFirebaseBills(email) {
    const q = query(collection(db, "invoices"), where("reseller_email", "==", email));
    const tbody = document.getElementById('table-billing');
    
    tbody.innerHTML = '<tr><td colspan="5" class="p-6 text-center text-gray-400">Loading Billing Data...</td></tr>';

    onSnapshot(q, (snap) => {
        let html = "";
        snap.forEach(d => {
            const data = d.data();
            let statusBadge = "";
            let actionBtn = "";

            if(data.status === 'SUCCESS') {
                statusBadge = `<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">LUNAS</span>`;
                actionBtn = `<button class="text-brand-600 hover:text-brand-800 text-xs font-bold" onclick="showDetail('${d.id}')">View</button>`;
            } else if (data.status === 'MEVERIFIKASI') {
                statusBadge = `<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">VERIFIKASI</span>`;
                actionBtn = `<button class="text-brand-600 hover:text-brand-800 text-xs font-bold" onclick="showDetail('${d.id}')">View</button>`;
            } else {
                statusBadge = `<span class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">UNPAID</span>`;
                actionBtn = `<button class="bg-brand-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-brand-500 shadow-sm" onclick="pay('${d.id}', ${data.total_amount})">PAY</button>`;
            }

            html += `
                <tr class="hover:bg-gray-50 border-b border-gray-100 transition">
                    <td class="p-4 text-brand-600 font-mono font-bold cursor-pointer" onclick="showDetail('${d.id}')">#${d.id.substr(0,6).toUpperCase()}</td>
                    <td class="p-4 font-bold text-slate-700">${formatRupiah(data.total_amount)}</td>
                    <td class="p-4 text-sm text-slate-500">${formatDate(data.created_at)}</td>
                    <td class="p-4 text-center">${statusBadge}</td>
                    <td class="p-4 text-center">${actionBtn}</td>
                </tr>
            `;
        });
        tbody.innerHTML = html || '<tr><td colspan="5" class="p-6 text-center text-gray-400">Belum ada tagihan.</td></tr>';
    }, (err) => {
        console.error("Billing Error", err);
        tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-red-400">Error: ${err.message} (Cek Permission)</td></tr>`;
    });
}


async function showInvoiceDetail(id) {
    const snap = await getDoc(doc(db, "invoices", id));
    if(!snap.exists()) return;
    
    const data = snap.data();
    const tabsContainer = document.getElementById('invoice-tabs-container');
    const paymentContainer = document.getElementById('invoice-payment-container');
    
   
    const dbTotalAmount = data.total_amount || 0; 

    // 1. Grouping Data
    const groupedItems = { 'Pershow': [], 'Bundling': [], 'Bulanan': [], 'Lainnya': [] };

    data.items.forEach(i => {
        let typeStr = i.type ? i.type.toLowerCase() : '';
        if(typeStr.includes('pershow') || typeStr.includes('show')) groupedItems['Pershow'].push(i);
        else if(typeStr.includes('bundling') || typeStr.includes('minggu')) groupedItems['Bundling'].push(i);
        else if(typeStr.includes('bulan') || typeStr.includes('30')) groupedItems['Bulanan'].push(i);
        else groupedItems['Lainnya'].push(i);
    });

    groupedItems['Pershow'].sort((a, b) => (a.show_title || "").localeCompare(b.show_title || ""));

    // 2. Generate TABS HTML (SISI KIRI)
    let tabsHeaderHtml = `<div class="flex space-x-6 overflow-x-auto hide-scrollbar">`;
    let tabsContentHtml = `<div class="flex-1 overflow-y-auto px-6 md:px-8 py-4 custom-scroll">`;
    
    let firstGroup = null;

    for (const [groupName, items] of Object.entries(groupedItems)) {
        if (items.length > 0) {
            if(!firstGroup) firstGroup = groupName; // Set tab pertama yang aktif
            
            const btnClass = firstGroup === groupName 
                ? 'border-brand-500 text-brand-600 font-bold' 
                : 'border-transparent text-gray-500 hover:text-slate-700';
            
            const paneClass = firstGroup === groupName ? 'block' : 'hidden';

            // Tab Buttons
            tabsHeaderHtml += `
                <button onclick="window.switchInvoiceTab('${groupName}')" id="tab-btn-${groupName}" class="tab-invoice-btn flex items-center whitespace-nowrap px-1 pb-3 pt-2 border-b-[3px] text-[15px] transition-all ${btnClass}">
                    ${groupName} 
                    <span class="border border-current text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-2 font-mono">${items.length}</span>
                </button>
            `;

            // List Items Content
            tabsContentHtml += `<div id="tab-content-${groupName}" class="tab-invoice-content ${paneClass} animate-fade-in-up">`;

            items.forEach(i => {
                let showName = '';
                if(groupName === 'Pershow' && i.show_title) {
                    showName = `<div class="text-brand-600 italic text-xs mt-0.5">${i.show_title}</div>`;
                } else if(groupName === 'Lainnya') {
                    showName = `<div class="text-gray-400 text-xs mt-0.5">(${i.type})</div>`;
                }

                let dateDisplay = '';
                if(i.date) {
                    dateDisplay = `<div class="text-[11px] text-gray-500 mt-1.5"><i class="far fa-calendar-alt text-brand-500 mr-1"></i> ${i.date}</div>`;
                }

                tabsContentHtml += `
                    <div class="bg-white p-4 rounded-[12px] border-2 border-slate-800 shadow-[0_4px_0_rgba(15,23,42,1)] flex justify-between items-center mb-4 transition-transform hover:-translate-y-0.5">
                        <div class="leading-tight">
                            <span class="font-bold text-slate-800 text-sm block">${i.user}</span>
                            ${showName}
                            ${dateDisplay}
                        </div> 
                        <span class="font-mono text-slate-800 text-base font-black">${formatRupiah(i.price)}</span>
                    </div>`;
            });

            tabsContentHtml += `</div>`;
        }
    }
    
    tabsHeaderHtml += `</div>`;
    tabsContentHtml += `</div>`;

    // Inject Ke Sisi Kiri
    tabsContainer.innerHTML = `
        <div class="px-6 md:px-8 pb-4 pt-8 border-b border-gray-200">
            <h2 class="font-black text-slate-800 text-[28px] uppercase tracking-tight">INV-#${id.substr(0,6)}</h2>
            <p class="text-[13px] text-gray-600 mt-1"><i class="far fa-calendar-alt mr-1"></i> Periode: <span class="font-bold">${data.period || '-'}</span></p>
            <div class="mt-6">
                ${tabsHeaderHtml}
            </div>
        </div>
        ${tabsContentHtml}
    `;

    // 3. Generate PAYMENT & SUMMARY HTML (SISI KANAN)
    state.activeInvoiceId = id; 
    
    let paymentStatusHtml = '';
    let qrisSectionHtml = '';

    if (data.status === 'SUCCESS') {
        paymentStatusHtml = `
            <div class="bg-green-100 border border-green-200 text-green-700 p-4 rounded-[16px] text-center font-bold mb-6 text-sm flex items-center justify-center gap-2">
                <i class="fas fa-check-circle"></i> LUNAS
            </div>`;
    } else if (data.status === 'MEVERIFIKASI') {
        paymentStatusHtml = `
            <div class="bg-blue-100 border border-blue-200 text-blue-700 p-4 rounded-[16px] text-center font-bold mb-6 text-sm flex items-center justify-center gap-2">
                <i class="fas fa-spinner fa-spin"></i> MENUNGGU VERIFIKASI ADMIN
            </div>`;
    } else {
        paymentStatusHtml = `
            <div class="bg-[#FFF3CD] border border-[#FFE69C] text-[#997404] p-4 rounded-[16px] text-center font-bold mb-6 text-[13px] flex items-center justify-center gap-2">
                <i class="fas fa-exclamation-circle"></i> BELUM DIBAYAR
            </div>`;
        
        // Block QRIS and Button
        qrisSectionHtml = `
            <div class="mt-auto pt-6 text-center">
                <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Scan QRIS Untuk Membayar</p>
                
                <div class="bg-white p-3 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 mb-6 mx-auto inline-block">
                    <img src="https://res.cloudinary.com/doclhrvd7/image/upload/v1769170859/HANABIRA48_jjyuaa.png" class="w-[180px] object-contain rounded-xl">
                </div>
                
                <button onclick="window.confirmPayment()" class="w-full py-[14px] bg-[#FFB7C5] hover:bg-[#F06292] text-slate-900 rounded-full font-bold transition-all border-[3px] border-slate-800 shadow-[0_4px_0_rgba(15,23,42,1)] active:translate-y-1 active:shadow-none flex justify-center items-center gap-2">
                    <i class="fas fa-check-circle"></i> SAYA SUDAH TRANSFER
                </button>
            </div>
        `;
    }

    // Inject Ke Sisi Kanan (Merapikan Total Tagihan Mengambil dbTotalAmount)
    paymentContainer.innerHTML = `
        <div class="flex flex-col h-full bg-white/40 p-6 md:p-8 rounded-r-[24px] border-l border-gray-200/50">
            <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Ringkasan Pembayaran</h4>
            
            ${paymentStatusHtml}

            <div class="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] mb-5 text-center relative overflow-hidden">
                <div class="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-2">Total Tagihan</div>
                <div class="text-[32px] font-black text-slate-800 tracking-tight">${formatRupiah(dbTotalAmount)}</div>
            </div>

            <div class="text-xs text-gray-500 bg-gray-100/80 p-3 rounded-xl border border-gray-200 flex items-center gap-2 mb-6">
                <i class="fas fa-info-circle text-gray-400"></i> Diterbitkan pada: ${formatDate(data.created_at)}
            </div>

            ${qrisSectionHtml}
        </div>
    `;

    document.getElementById('modal-invoice-detail').classList.remove('hidden');
    document.getElementById('modal-invoice-detail').classList.add('flex');
}

// Logic Pergantian Tab (Update CSS Active)
function switchInvoiceTab(targetGroup) {
    document.querySelectorAll('.tab-invoice-btn').forEach(btn => {
        btn.classList.remove('border-brand-500', 'text-brand-600', 'font-bold');
        btn.classList.add('border-transparent', 'text-gray-500');
    });
    document.querySelectorAll('.tab-invoice-content').forEach(content => {
        content.classList.remove('block');
        content.classList.add('hidden');
    });

    const activeBtn = document.getElementById(`tab-btn-${targetGroup}`);
    const activeContent = document.getElementById(`tab-content-${targetGroup}`);
    
    if (activeBtn) {
        activeBtn.classList.remove('border-transparent', 'text-gray-500');
        activeBtn.classList.add('border-brand-500', 'text-brand-600', 'font-bold');
    }
    if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('block');
    }
}

// Buka Langsung Menu QRIS dari tombol "PAY" (Sama dengan buka detail)
function openInvoicePayment(id, amount) {
    showInvoiceDetail(id); 
}

// Konfirmasi Pembayaran
async function confirmPayment() {
    if(!state.activeInvoiceId) return;
    try {
        await updateDoc(doc(db, "invoices", state.activeInvoiceId), { status: "MEVERIFIKASI" });
        showToast("Konfirmasi Terkirim! Admin akan memverifikasi.", "success");
        document.getElementById('modal-invoice-detail').classList.add('hidden');
    } catch(err) {
        showToast("Error: " + err.message, "error");
    }
}

function showToast(msg, type='neutral') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    
    let icon = '<i class="fas fa-info-circle text-blue-500"></i>';
    let borderClass = 'border-l-4 border-blue-500';
    
    if(type==='success') { icon='<i class="fas fa-check-circle text-brand-500"></i>'; borderClass='border-l-4 border-brand-500'; }
    if(type==='error') { icon='<i class="fas fa-exclamation-triangle text-red-500"></i>'; borderClass='border-l-4 border-red-500'; }
    
    t.className = `bg-white text-slate-800 px-4 py-3 rounded shadow-lg flex items-center gap-3 transform transition-all duration-300 translate-x-full ${borderClass}`;
    t.innerHTML = `${icon} <span class="font-medium text-sm">${msg}</span>`;
    
    c.appendChild(t);
    
    requestAnimationFrame(() => { t.classList.remove('translate-x-full'); });

    setTimeout(() => {
        t.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => t.remove(), 300);
    }, 3000);
}