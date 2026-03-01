const PB_URL = "https://hanabira48.site/pb";
const pb = new PocketBase(PB_URL);

const SETTINGS_ID = "hanabiraconfig1";
const STREAM_STATS_ID = "a3isnabkjkyah0u"; // ID Record untuk Realtime Stats


const MEMBERS = [
  { "name": "Abigail Rachel", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702972/abigail_rachel_hm13z6.jpg" },
  { "name": "Adeline Wijaya", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702972/adeline_wijaya_mzjjog.jpg" },
  { "name": "Alya Amanda", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702972/alya_amanda_egiysy.jpg" },
  { "name": "Amanda Sukma", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702972/amanda_sukma_s9vbcb.jpg" },
  { "name": "Angelina Christy", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/angelina_christy_yy3sbd.jpg" },
  { "name": "Anindya Ramadhani", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/anindya_ramadhani_rsoi6a.jpg" },
  { "name": "Astrella Virgiananda", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690950/Astrella_Virgiananda_yftwr1.webp" },
  { "name": "Aulia Riza", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690956/Aulia_Riza_gzcdmo.webp" },
  { "name": "Aurellia", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/aurellia_ozjvjj.jpg" },
  { "name": "Aurhel Alana", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/aurhel_alana_xusvgy.jpg" },
  { "name": "Bong Aprilli", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690963/Bong_Aprilli_maxabi.webp" },
  { "name": "Catherina Vallencia", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/catherina_vallencia_u8toei.jpg" },
  { "name": "Cathleen Nixie", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702974/cathleen_nixie_cjq89p.jpg" },
  { "name": "Celline Thefani", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702974/celline_thefani_lchia0.jpg" },
  { "name": "Chelsea Davina", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702972/chelsea_davina_qdvw7x.jpg" },
  { "name": "Cornelia Vanisa", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702972/cornelia_vanisa_lz6fsi.jpg" },
  { "name": "Cynthia Yaputera", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702972/cynthia_yaputera_tdrgtw.jpg" },
  { "name": "Dena Natalia", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/dena_natalia_u5pmeq.jpg" },
  { "name": "Desy Natalia", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/desy_natalia_zl17g6.jpg" },
  { "name": "Febriola Sinambela", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702973/febriola_sinambela_b0x6jy.jpg" },
  { "name": "Feni Fitriyanti", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690641/feni_fitriyanti_hyvlt3.webp" },
  { "name": "Fiony Alveria", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702974/fiony_alveria_waor41.jpg" },
  { "name": "Freya Jayawardana", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702974/freya_jayawardana_syotzg.jpg" },
  { "name": "Fritzy Rosmerian", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702974/fritzy_rosmerian_q7x7ji.jpg" },
  { "name": "Gabriela Abigail", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702974/gabriela_abigail_kwy2r0.jpg" },
  { "name": "Gendis Mayrannisa", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690676/gendis_mayrannisa_vwtida.webp" },
  { "name": "Gita Sekar Andarini", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702975/gita_sekar_andarini_qhcnh0.jpg" },
  { "name": "Grace Octaviani", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702975/grace_octaviani_dlfv8f.jpg" },
  { "name": "Greesella Adhalia", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702975/greesella_adhalia_kqagks.jpg" },
  { "name": "Hagia Sopia", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690975/Hagia_Sopia_mpz0fq.webp" },
  { "name": "Helisma Putri", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702975/helisma_putri_wi5lxq.jpg" },
  { "name": "Hillary Abigail", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702975/hillary_abigail_wpivug.jpg" },
  { "name": "Humaira Ramadhani", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690994/Humaira_Ramadhani_y8zuzf.webp" },
  { "name": "Indah Cahya", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702975/indah_cahya_amtnjp.jpg" },
  { "name": "Jacqueline Immanuela", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760691001/Jacqueline_Immanuela_klv9zy.webp" },
  { "name": "Jazzlyn Trisha", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702976/jazzlyn_trisha_nbaauy.jpg" },
  { "name": "Jemima Evodie", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760691019/Jemima_Evodie_ypkmjq.webp" },
  { "name": "Jessica Chandra", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/jessica_chandra_scewu8.jpg" },
  { "name": "Jesslyn Elly", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/jesslyn_elly_emz0wh.jpg" },
  { "name": "Kathrina Irene", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/kathrina_irene_bjoppj.jpg" },
  { "name": "Kimberly", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702996/victoria_kimberly_ofnoyi.jpg" },
  { "name": "Lulu Salsabila", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/lulu_salsabila_kluqhm.jpg" },
  { "name": "Marsha Lenathea", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/marsha_lenathea_zzbgop.jpg" },
  { "name": "Michelle Alexandra", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/michelle_alexandra_v0jlzq.jpg" },
  { "name": "Michelle Levia", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/michelle_levia_c7x5oc.jpg" },
  { "name": "Mikaela Kusjanto", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760691036/Mikaela_Kusjanto_xp3bgt.webp" },
  { "name": "Mutiara Azzahra", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/mutiara_azzahra_mpsxtf.jpg" },
  { "name": "Nayla Suji", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702987/nayla_suji_vflkqz.jpg" },
  { "name": "Nina Tutachia", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702996/nina_tutachia_qunwtx.jpg" },
  { "name": "Nur Intan", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760691065/Nur_Intan_avk8d6.webp" },
  { "name": "Oline Manuel", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702996/oline_manuel_tjlcgn.jpg" },
  { "name": "Raisha Syifa", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702996/raisha_syifa_ukppvk.jpg" },
  { "name": "Ribka Budiman", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702996/ribka_budiman_aqcnyp.jpg" },
  { "name": "Shabilqis Naila", "url": "https://res.cloudinary.com/doclhrvd7/image/upload/v1768702996/shabilqis_naila_xs6gjm.jpg" },
  { "name": "Shania Gracia", "url": "https://res.cloudinary.com/dxh338hcx/image/upload/v1760690769/shania_gracia_vkdcnd.webp" }
];

let state = {
    settings: {
        isLive: false, countdown: "", formOpen: true, currentShowConfig: null,
        currentShowId: "", currentShowTitle: "", currentShowDesc: "",
        backupUrl: "" 
    },
    schedules: [], customers: [], replays: [], tokens: [],
    chatUrl: "",
    lineup: {},
    editingScheduleId: null,
    editingReplayId: null
};

document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    
    
    if (pb.authStore.isValid) {
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
            btn.innerText = "AUTHENTICATING..."; btn.disabled = true;

            try {
                
                await pb.admins.authWithPassword(emailInput, keyInput);
                
                if (pb.authStore.isValid) {
                    showMainApp();
                    showToast(`Access Granted. Welcome Admin!`, 'success');
                } else {
                    showToast('Access Denied. Cek Email/Password.', 'error');
                }
            } catch (err) {
                console.error(err);
                showToast('Login Failed: ' + err.message, 'error');
            }
            btn.innerText = originalText; btn.disabled = false;
        });
    }

   
    setupRealtimeListeners();

    
    const formSch = document.getElementById('form-schedule');
    if(formSch) formSch.addEventListener('submit', handleAddSchedule);
    const formRep = document.getElementById('form-replay');
    if(formRep) formRep.addEventListener('submit', handleAddReplay);
    
  
    const formEditCust = document.getElementById('form-edit-customer');
    if(formEditCust) formEditCust.addEventListener('submit', saveEditCustomer);

    
    const formTrial = document.getElementById('form-add-trial');
    if(formTrial) formTrial.addEventListener('submit', handleSaveTrialUser);
    
    
    const formBackup = document.getElementById('form-backup');
    if(formBackup) formBackup.addEventListener('submit', saveBackupUrl);

    renderLineupEditor();
    
    
    const searchInput = document.getElementById('search-reset-customer');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderResetControl(searchInput.value.trim());
        });
    }
});


function setupRealtimeListeners() {
    
    pb.collection('customers').subscribe('*', function(e) {
        handleRealtimeUpdate('customers', e);
    });

   
    pb.collection('tokens').subscribe('*', function(e) {
        handleRealtimeUpdate('tokens', e);
    });
}

async function handleRealtimeUpdate(collectionName, e) {
    
    const list = collectionName === 'customers' ? state.customers : state.tokens;
    
    if (e.action === 'create') {
        list.unshift(e.record);
    } else if (e.action === 'update') {
        const idx = list.findIndex(i => i.id === e.record.id);
        if (idx > -1) list[idx] = e.record;
    } else if (e.action === 'delete') {
        const idx = list.findIndex(i => i.id === e.record.id);
        if (idx > -1) list.splice(idx, 1);
    }

    
    if (collectionName === 'customers' && document.getElementById('view-customers').classList.contains('hidden') === false) {
        renderCustomers();
    }
    if (collectionName === 'tokens' && document.getElementById('view-token').classList.contains('hidden') === false) {
        renderTokenList();
    }

    
    syncActiveStatsToDB();
}

async function syncActiveStatsToDB() {
   
    const activeCust = state.customers.filter(c => c.fingerprint && c.fingerprint.length > 5).length;
    const activeTok = state.tokens.filter(t => t.fingerprint && t.fingerprint.length > 5).length;
    const totalActive = activeCust + activeTok;

   
    document.querySelectorAll('#dash-active-devices').forEach(el => el.innerText = totalActive);

    
    try {
        await pb.collection('stream_stats').update(STREAM_STATS_ID, { count: totalActive });
       
    } catch (err) {
        console.error("Gagal sync stats:", err);
    }
}

async function fetchAllData() {
    try {
        const [sched, cust, rep, sett, toks] = await Promise.all([
            pb.collection('schedules').getFullList({ sort: '-created' }),
            pb.collection('customers').getFullList({ sort: '-created' }),
            pb.collection('replays').getFullList({ sort: '-created' }),
            pb.collection('settings').getOne(SETTINGS_ID).catch(() => null),
            pb.collection('tokens').getFullList({ sort: '-created' })
        ]);

        state.schedules = sched || [];
        state.customers = cust || [];
        state.replays = rep || [];
        state.tokens = toks || [];

        
        if(sett) {
            state.settings = { 
                isLive: sett.isLive,
                countdown: sett.countdown,
                formOpen: sett.formOpen,
                currentShowId: sett.currentShowId,
                currentShowTitle: sett.currentShowTitle,
                currentShowDesc: sett.currentShowDesc,
                backupUrl: sett.backupUrl || "" 
            };
            state.chatUrl = sett.chatUrl || "";
            state.lineup = sett.lineup_config || {}; 
        }

        
        renderReplay();
        updateDashboard(); 
        renderSchedule(); 
        updateLiveControlUI(); 
        renderFormStatus();
        renderTokenOptions(); 
        renderConfigList(); 
        renderCustomers();
        renderLineupEditor();
        renderFingerprints();

        
        if(state.chatUrl) document.getElementById('chat-link-input').value = state.chatUrl;
        if(state.settings.countdown) { document.getElementById('countdown-input').value = state.settings.countdown; }

       
        if(state.settings.backupUrl !== undefined) {
            const backupInput = document.getElementById('backup-url-input');
            const testBtn = document.getElementById('btn-test-backup');
            if(backupInput) {
                backupInput.value = state.settings.backupUrl;
                if(state.settings.backupUrl) {
                    testBtn.href = state.settings.backupUrl;
                    testBtn.classList.remove('opacity-50', 'pointer-events-none');
                }
            }
        }

        const searchInput = document.getElementById('search-reset-customer');
        if (document.getElementById('view-reset-counter') && searchInput) {
            renderResetControl(searchInput.value.trim());
        }

       
        syncActiveStatsToDB();

    } catch (err) {
        showToast(`Error Fetching Data: ${err.message}`, 'error');
        if(err.status === 401) logout();
    }
}

async function refreshAllData() {
    const activeTabEl = document.querySelector('.nav-item.active');
    const activeTab = activeTabEl ? activeTabEl.getAttribute('onclick').split("'")[1] : 'dashboard';
    let btn;
    if (activeTab === 'dashboard') btn = document.getElementById('btn-refresh-dashboard');
    else if (activeTab === 'customers') btn = document.getElementById('btn-refresh-customers');
    else if (activeTab === 'fingerprint') btn = document.getElementById('btn-refresh-fingerprint');
    else if (activeTab === 'reset-counter') btn = document.getElementById('btn-refresh-reset-counter');
    
    if (btn) {
        btn.disabled = true;
        const icon = btn.querySelector('.fa-sync-alt');
        if (icon) icon.classList.add('animate-spin');
    }
    await fetchAllData();
    showToast('Data berhasil diperbarui!', 'success');
    if (btn) {
        btn.disabled = false;
        const icon = btn.querySelector('.fa-sync-alt');
        if (icon) icon.classList.remove('animate-spin');
    }
}

function showMainApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    document.body.style.overflow = 'auto';
    fetchAllData();
}

function logout() { 
    pb.authStore.clear(); 
    window.location.reload(); 
}

function switchTab(tabId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const buttons = document.querySelectorAll('.nav-item');
    buttons.forEach(btn => { if(btn.getAttribute('onclick').includes(tabId)) btn.classList.add('active'); });
    
    if (tabId === 'customers') renderCustomers();
    if (tabId === 'live-config') renderConfigList();
    if (tabId === 'token') renderTokenOptions();
    if (tabId === 'replay') renderReplay();
    if (tabId === 'fingerprint') renderFingerprints(); 
    if (tabId === 'reset-counter') {
        const searchInput = document.getElementById('search-reset-customer');
        renderResetControl(searchInput ? searchInput.value.trim() : '');
    }
    updateDashboard();
    resetForms();
}

function resetForms() {
    state.editingScheduleId = null;
    state.editingReplayId = null;
    
    const schForm = document.getElementById('form-schedule');
    if (schForm) {
        schForm.reset();
        document.getElementById('sch-id').disabled = false;
        const btn = schForm.querySelector('button[type="submit"]');
        if (btn) btn.innerText = "SIMPAN JADWAL";
    }

    const repForm = document.getElementById('form-replay');
    if (repForm) {
        repForm.reset();
        const btn = repForm.querySelector('button[type="submit"]');
        if (btn) btn.innerText = "TAMBAH REPLAY";
    }
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('hidden'); }

function updateDashboard() {
    document.getElementById('dash-total-subs').innerText = state.customers.length;
    
   
    const activeCustomers = state.customers.filter(c => c.fingerprint && c.fingerprint.length > 5);
    const activeTokens = state.tokens.filter(t => t.fingerprint && t.fingerprint.length > 5);
    const totalActiveDevices = activeCustomers.length + activeTokens.length;

    const activeDevicesElements = document.querySelectorAll('#dash-active-devices');
    activeDevicesElements.forEach(el => { el.innerText = totalActiveDevices; });
    
    const tokenCount = document.getElementById('dash-total-tokens');
    if(tokenCount) tokenCount.innerText = state.tokens.length;
    const statusEl = document.getElementById('dash-stream-status');
    statusEl.innerText = state.settings.isLive ? 'LIVE ON AIR' : 'OFFLINE';
    statusEl.className = state.settings.isLive ? 'text-2xl font-bold text-iceBlue mt-3 animate-pulse' : 'text-2xl font-bold text-gray-500 mt-3';
}


function renderLineupEditor() {
    const container = document.getElementById('lineup-form-container');
    if(!container) return;
    container.innerHTML = '';

    for (let i = 1; i <= 20; i++) {
        const savedUrl = state.lineup ? state.lineup[`lineup_foto_${i}`] : "";
        const wrapper = document.createElement('div');
        wrapper.className = "mb-2";
        const label = document.createElement('label');
        label.className = "block text-xs text-gray-400 mb-1";
        label.innerText = `Member Slot #${i}`;
        const select = document.createElement('select');
        select.id = `lineup-select-${i}`;
        select.className = "input-field text-sm";
        const defOpt = document.createElement('option');
        defOpt.value = "";
        defOpt.innerText = "-- Pilih Member --";
        select.appendChild(defOpt);
        MEMBERS.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.url; 
            opt.innerText = m.name;
            if (m.url === savedUrl) opt.selected = true;
            select.appendChild(opt);
        });
        wrapper.appendChild(label);
        wrapper.appendChild(select);
        container.appendChild(wrapper);
    }
}

async function saveLineupAndChat() {
    const chatUrl = document.getElementById('chat-link-input').value.trim();
    
    const lineupData = {};
    for (let i = 1; i <= 20; i++) {
        const val = document.getElementById(`lineup-select-${i}`).value;
        lineupData[`lineup_foto_${i}`] = val; 
    }

    try {
        await pb.collection('settings').update(SETTINGS_ID, {
            chatUrl: chatUrl,
            lineup_config: lineupData
        });
        await fetchAllData();
        showToast('Lineup & Chat Berhasil Disimpan!', 'success');
    } catch (e) {
        showToast('Gagal menyimpan: ' + e.message, 'error');
    }
}


function renderCustomers(customData = null) {
    const tbody = document.getElementById('table-customers');
    tbody.innerHTML = '';
    const filterVal = document.getElementById('search-customer').value.toLowerCase();


    const dataToRender = customData || state.customers;

    dataToRender.forEach(c => {
        const name = c.name || "No Name";
        const email = c.email || "-";
        const isBanned = c.isBanned === true;
        const regDate = c.regDate || "-";
        let statusBadge = '';
        let sisaDurasiTxt = '-';
        let isVerified = c.status && c.status.toLowerCase() === 'active';

        if (isBanned) {
            statusBadge = `<span class="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">BANNED</span>`;
            sisaDurasiTxt = "Terblokir";
        } else if (!isVerified) {
            statusBadge = `<span class="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded text-xs font-bold flex items-center justify-center gap-1"><i class="fas fa-times"></i> PENDING</span>`;
            sisaDurasiTxt = "Menunggu";
        } else {
            if(c.expDate && c.expDate.length >= 10) {
                const exp = new Date(c.expDate);
                const now = new Date();
                now.setHours(0,0,0,0);
                exp.setHours(0,0,0,0);
                const diffTime = exp - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays >= 0) {
                    statusBadge = `<span class="bg-green-500/20 text-green-400 border border-green-500/50 px-3 py-1 rounded text-xs font-bold">ACTIVE</span>`;
                    sisaDurasiTxt = `${diffDays} Hari`;
                } else {
                    statusBadge = `<span class="bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1 rounded text-xs font-bold">EXPIRED</span>`;
                    sisaDurasiTxt = "Habis";
                }
            } else {
                statusBadge = `<span class="text-gray-400 text-xs">Error Date</span>`;
                sisaDurasiTxt = "-";
            }
        }

        let buktiBtn = c.bukti ? `<a href="${pb.files.getUrl(c, c.bukti)}" target="_blank" class="text-iceBlue hover:text-white underline text-xs">Lihat</a>` : `<span class="text-gray-600 text-xs italic">-</span>`;

        if(name.toLowerCase().includes(filterVal) || email.toLowerCase().includes(filterVal) || c.id.toLowerCase().includes(filterVal)) {
            const tr = document.createElement('tr');
            tr.className = isBanned ? "bg-red-900/20 border-l-4 border-red-600 border-b border-white/5" : "hover:bg-white/5 transition border-b border-white/5";
            tr.innerHTML = `
                <td class="p-4"><div class="font-bold text-white text-sm">${name}</div><div class="text-gray-400 text-xs">${email}</div><div class="text-gray-500 text-[10px] mt-1"><i class="fab fa-whatsapp"></i> ${c.wa || '-'} (ID: ${c.id})</div></td>
                <td class="p-4 text-gray-300 text-xs">${regDate}</td>
                <td class="p-4 text-center font-mono text-sm text-white">${sisaDurasiTxt}</td>
                <td class="p-4 text-center">${statusBadge}</td>
                <td class="p-4 text-center">${buktiBtn}</td>
                <td class="p-4 text-center">
                    <div class="flex items-center justify-end gap-2">
                        ${!isVerified && !isBanned ? `<button class="bg-green-600 hover:bg-green-500 text-white w-8 h-8 rounded-lg shadow-lg transition flex items-center justify-center" title="Verifikasi & Aktifkan 30 Hari" onclick="verifyCustomer('${c.id}')"><i class="fas fa-check"></i></button>` : ''}
                        <button class="text-blue-400 hover:text-white p-2" title="Edit Data" onclick="openEditCustomer('${c.id}')"><i class="fas fa-edit"></i></button>
                        <button class="${isBanned ? 'text-green-400' : 'text-yellow-400'} hover:text-white p-2" title="${isBanned ? 'Unban' : 'Ban'}" onclick="toggleBanCustomer('${c.id}', ${isBanned})"><i class="fas ${isBanned ? 'fa-user-check' : 'fa-ban'}"></i></button>
                        <button class="text-red-400 hover:text-red-200 p-2" title="Hapus" onclick="deleteCustomer('${c.id}')"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}


function openAddTrialModal() {
    const modal = document.getElementById('modal-add-trial');
    if(modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.getElementById('form-add-trial').reset();
    }
}

function closeAddTrialModal() {
    const modal = document.getElementById('modal-add-trial');
    if(modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

async function handleSaveTrialUser(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "PROCESSING...";
    btn.disabled = true;

    const name = document.getElementById('trial-name').value.trim();
    const email = document.getElementById('trial-email').value.trim();
    const wa = document.getElementById('trial-wa').value.trim();
    const durationDays = parseInt(document.getElementById('trial-duration').value);

    
    const now = new Date();
    const expDate = new Date();
    expDate.setDate(now.getDate() + durationDays);
    const expDateStr = expDate.toISOString().split('T')[0];
    const regDateStr = now.toISOString();

    const payload = {
        username: email.split('@')[0] + Math.floor(Math.random() * 1000), 
        email: email,
        emailVisibility: true,
        password: '12345678',
        passwordConfirm: '12345678',
        name: name,
        wa: wa,
        status: 'Active',
        regDate: regDateStr,
        expDate: expDateStr,
        resetCount: 0,
        isBanned: false
    };

    try {
        await pb.collection('customers').create(payload);
        showToast(`User Trial Berhasil Dibuat! (${durationDays} Hari)`, 'success');
        closeAddTrialModal();
        await fetchAllData(); 
    } catch (err) {
        let msg = err.message;
        if(err.data && err.data.email) msg = "Email sudah terdaftar!";
        showToast('Gagal: ' + msg, 'error');
    }

    btn.innerText = originalText;
    btn.disabled = false;
}



function openEditCustomer(id) {
    const customer = state.customers.find(c => c.id === id);
    if (!customer) return;
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = customer.name || '';
    document.getElementById('edit-email').value = customer.email || '';
    document.getElementById('edit-wa').value = customer.wa || '';
    let dateVal = '';
    if (customer.regDate) dateVal = customer.regDate.substring(0, 10);
    document.getElementById('edit-reg-date').value = dateVal;
    
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
    const wa = document.getElementById('edit-wa').value;
    const regDateInput = document.getElementById('edit-reg-date').value; 

    const originalCustomer = state.customers.find(c => c.id === id);
    
    let newExpDate = originalCustomer.expDate; 
    if (regDateInput && regDateInput !== originalCustomer.regDate.substring(0,10)) {
        const d = new Date(regDateInput);
        d.setDate(d.getDate() + 30);
        newExpDate = d.toISOString().split('T')[0];
    }

    const payload = {
        name: name,
        email: email,
        wa: wa,
        regDate: regDateInput, 
        expDate: newExpDate    
    };

    const btnSubmit = document.querySelector('#form-edit-customer button[type="submit"]');
    const oldText = btnSubmit.innerText;
    btnSubmit.innerText = "Menyimpan...";
    btnSubmit.disabled = true;

    try {
        await pb.collection('customers').update(id, payload);
        showToast(`Berhasil!`, 'success');
        closeEditCustomerModal();
        await fetchAllData(); 
    } catch(err) {
        showToast('Gagal: ' + err.message, 'error');
    }
    btnSubmit.innerText = oldText;
    btnSubmit.disabled = false;
}


async function verifyCustomer(id) {
    const pendingReq = state.customers.find(c => c.id === id);
    if (!pendingReq) return;

    if(!confirm(`Verifikasi ${pendingReq.name}?\n\nSistem akan otomatis Cek Email:\n- Jika BARU: Aktif 30 Hari.\n- Jika LAMA: Tambah Sisa Durasi + 30 Hari.`)) return;

    const btn = document.querySelector(`button[onclick="verifyCustomer('${id}')"]`);
   
    const originalBtnContent = btn ? btn.innerHTML : ''; 
    if(btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Proses...';
        btn.disabled = true;
    }

    try {
        
        const existingUsers = await pb.collection('customers').getList(1, 1, {
            filter: `email = "${pendingReq.email}" && id != "${id}" && status != "Pending"`,
            sort: '-created'
        });

        if (existingUsers.items.length > 0) {
           
            const oldUser = existingUsers.items[0];
            const now = new Date();
            let oldExpDate = new Date(oldUser.expDate);
            
            
            if (isNaN(oldExpDate.getTime())) oldExpDate = new Date();

            let newExpDate;
            
            if (oldExpDate > now) {
                newExpDate = new Date(oldExpDate);
                newExpDate.setDate(newExpDate.getDate() + 30);
            } else {
                
                newExpDate = new Date();
                newExpDate.setDate(newExpDate.getDate() + 30);
            }
            const expDateStr = newExpDate.toISOString().split('T')[0];

            
            let buktiPayload = pendingReq.bukti; 
            
            
            if (pendingReq.bukti) {
                try {
                    
                    const url = pb.files.getUrl(pendingReq, pendingReq.bukti);
                    
                    
                    const res = await fetch(url);
                    if (!res.ok) throw new Error("Gagal download bukti transfer");
                    
                    
                    const blob = await res.blob();
                    
                  
                    buktiPayload = blob;
                } catch (fileErr) {
                    console.error("Gagal memindahkan file:", fileErr);
                    
                }
            }
            
            await pb.collection('customers').update(oldUser.id, {
                status: 'Active',
                expDate: expDateStr,
                bukti: buktiPayload, // Kirim OBJECT FILE/BLOB, bukan string
                isBanned: false,
                wa: pendingReq.wa, 
                name: pendingReq.name 
            });

            // 2. Hapus Data Pending (Agar tidak duplikat)
            await pb.collection('customers').delete(id);
            
            // Hitung total hari untuk notifikasi
            const diffTime = newExpDate - new Date();
            const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            showToast(`Akun Lama Diperpanjang! Total Sisa: ${totalDays} Hari.`, 'success');

        } else {
            // === LOGIKA MEMBER BARU ===
            const today = new Date();
            today.setDate(today.getDate() + 30);
            const expDateStr = today.toISOString().split('T')[0];

            await pb.collection('customers').update(id, {
                status: "Active",
                expDate: expDateStr
            });
            showToast(`Member Baru Diaktifkan (30 Hari)`, 'success');
        }

        // Refresh Data
        await fetchAllData();

    } catch(err) {
        console.error(err);
        showToast('Error: ' + err.message, 'error');
    } finally {
        // Kembalikan tombol ke kondisi semula
        if(btn) {
            btn.innerHTML = originalBtnContent || '<i class="fas fa-check"></i>';
            btn.disabled = false;
        }
    }
}

async function toggleBanCustomer(id, currentStatus) {
    try {
        await pb.collection('customers').update(id, { isBanned: !currentStatus });
        showToast(!currentStatus ? 'User di-BANNED!' : 'User di-UNBAN!', !currentStatus ? 'error' : 'success');
        fetchAllData();
    } catch(err) { showToast(err.message, 'error'); }
}

async function deleteCustomer(id) {
    if(confirm('Hapus data pelanggan permanen?')) {
        try {
            await pb.collection('customers').delete(id);
            showToast('Data dihapus', 'success');
            fetchAllData();
        } catch(err) { showToast(err.message, 'error'); }
    }
}



async function handleAddSchedule(e) {
    e.preventDefault();
    const isEdit = state.editingScheduleId !== null;

    const payload = {
        title: document.getElementById('sch-title').value,
        desc: document.getElementById('sch-desc').value, 
        date: document.getElementById('sch-date').value,
        time: document.getElementById('sch-time').value, 
        img: document.getElementById('sch-img').value || 'https://placehold.co/100',
        price: parseInt(document.getElementById('sch-price').value),
        customId: document.getElementById('sch-id').value // Optional Custom ID
    };

    try {
        if (isEdit) {
            await pb.collection('schedules').update(state.editingScheduleId, payload);
        } else {
            await pb.collection('schedules').create(payload);
        }
        showToast(isEdit ? 'Jadwal Diupdate!' : 'Jadwal Disimpan!', 'success');
        resetForms();
        fetchAllData();
    } catch (err) {
        showToast('Error: ' + err.message, 'error');
    }
}

function openEditSchedule(id) {
    const item = state.schedules.find(s => s.id === id);
    if (!item) return;

    document.getElementById('sch-title').value = item.title || "";
    document.getElementById('sch-desc').value = item.desc || "";
    document.getElementById('sch-date').value = item.date ? item.date.substring(0,10) : "";
    document.getElementById('sch-time').value = item.time || "";
    document.getElementById('sch-img').value = item.img || "";
    document.getElementById('sch-price').value = item.price || 0;
    
    // Tampilkan Custom ID jika ada
    document.getElementById('sch-id').value = item.customId || ""; 
    
    state.editingScheduleId = id;
    const btn = document.querySelector('#form-schedule button[type="submit"]');
    btn.innerText = "UPDATE JADWAL";
    document.getElementById('view-schedule').scrollIntoView({ behavior: 'smooth' });
}

function renderSchedule() {
    const container = document.getElementById('list-schedule'); container.innerHTML = '';
    state.schedules.forEach(item => {
        const displayId = item.customId || item.id;
        
        const card = document.createElement('div');
        card.className = "glass-panel p-5 rounded-2xl flex gap-5 items-start relative group hover:border-iceBlue/50 transition";
        card.innerHTML = `
            <img src="${item.img}" class="w-24 h-32 object-cover rounded-lg shadow-lg">
            <div class="flex-1">
                <h4 class="font-bold text-white text-xl leading-tight mb-1">${item.title}</h4>
                <p class="text-iceBlue text-sm font-bold uppercase tracking-wide mb-2">${item.date} • ${item.time}</p>
                <p class="text-gray-400 text-xs line-clamp-2">${item.desc}</p>
                <div class="mt-3 flex items-center gap-2">
                    <span class="text-xs font-mono bg-black/40 px-2 py-1 rounded text-gray-500">${displayId}</span>
                </div>
            </div>
            <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onclick="openEditSchedule('${item.id}')" class="text-blue-400 p-2 hover:bg-blue-500/20 rounded-full" title="Edit Jadwal">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteSchedule('${item.id}')" class="text-red-400 p-2 hover:bg-red-500/20 rounded-full" title="Hapus Jadwal">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}
async function deleteSchedule(id) { if(confirm('Hapus?')) { await pb.collection('schedules').delete(id); fetchAllData(); } }

async function handleAddReplay(e) {
    e.preventDefault();
    const isEdit = state.editingReplayId !== null;

    const payload = { 
        title: document.getElementById('rep-title').value, 
        url: document.getElementById('rep-url').value, 
        desc: document.getElementById('rep-desc').value, 
        date: document.getElementById('rep-date').value, 
        img: document.getElementById('rep-img').value || 'https://placehold.co/100' 
    };

    try {
        if (isEdit) {
            await pb.collection('replays').update(state.editingReplayId, payload);
        } else {
            await pb.collection('replays').create(payload);
        }
        showToast(isEdit ? 'Replay Diupdate!' : 'Replay Ditambahkan!', 'success');
        resetForms();
        fetchAllData();
    } catch(err) { showToast(err.message, 'error'); }
}

function openEditReplay(id) {
    const item = state.replays.find(r => r.id === id);
    if (!item) return;

    document.getElementById('rep-title').value = item.title || "";
    document.getElementById('rep-url').value = item.url || "";
    document.getElementById('rep-desc').value = item.desc || "";
    document.getElementById('rep-date').value = item.date ? item.date.substring(0,10) : "";
    document.getElementById('rep-img').value = item.img || "";

    state.editingReplayId = id;
    const btn = document.querySelector('#form-replay button[type="submit"]');
    btn.innerText = "UPDATE REPLAY";
    document.getElementById('view-replay').scrollIntoView({ behavior: 'smooth' });
}

function renderReplay() {
    const tbody = document.getElementById('table-replay'); tbody.innerHTML = '';
    state.replays.forEach(item => {
        const tr = document.createElement('tr'); tr.className = "hover:bg-white/5 transition border-b border-white/5";
        tr.innerHTML = `
            <td class="p-4"><img src="${item.img}" class="w-16 rounded-lg shadow-sm"></td>
            <td class="p-4"><div class="font-bold text-white">${item.title}</div><div class="text-xs text-gray-400">${item.date}</div></td>
            <td class="p-4 text-iceBlue truncate max-w-xs text-xs">${item.url}</td>
            <td class="p-4 text-right">
                <button onclick="openEditReplay('${item.id}')" class="text-blue-400 hover:text-white mr-2"><i class="fas fa-edit"></i></button>
                <button onclick="deleteReplay('${item.id}')" class="text-red-400 hover:text-white"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
async function deleteReplay(id) { if(confirm('Hapus?')) { await pb.collection('replays').delete(id); fetchAllData(); } }



async function toggleLive() {
    state.settings.isLive = !state.settings.isLive;
    await updateSettings(); updateLiveControlUI(); updateDashboard();
    showToast(state.settings.isLive ? 'ONLINE 🟢' : 'OFFLINE ⚪', state.settings.isLive ? 'success' : 'neutral');
}
function updateLiveControlUI() {
    const btn = document.getElementById('btn-toggle-live'); const icon = document.getElementById('icon-power'); const text = document.getElementById('text-live-status'); const ind = document.getElementById('live-indicator');
    if (state.settings.isLive) { btn.classList.add('live-on-glow'); icon.classList.replace('text-gray-600', 'text-green-400'); text.innerText = "LIVE"; text.classList.add('live-text-on'); ind.classList.replace('bg-gray-700', 'bg-green-500'); ind.classList.add('shadow-[0_0_20px_#22c55e]'); }
    else { btn.classList.remove('live-on-glow'); icon.classList.replace('text-green-400', 'text-gray-600'); text.innerText = "OFFLINE"; text.classList.remove('live-text-on'); ind.classList.replace('bg-green-500', 'bg-gray-700'); ind.classList.remove('shadow-[0_0_20px_#22c55e]'); }
}
async function setCountdown() { state.settings.countdown = document.getElementById('countdown-input').value; await updateSettings(); showToast('Timer Set', 'success'); }


async function selectShow(id) {
    
    
    
    const s = state.schedules.find(x => (x.customId || x.id) === id); 

    if (!s) return; // Safety check

    const showIdToSave = s.customId || s.id; 

    if (state.settings.currentShowId === showIdToSave) { 
        
        state.settings.currentShowId = ""; 
        state.settings.currentShowTitle = ""; 
        state.settings.currentShowDesc = ""; 
    } else { 
       
        state.settings.currentShowId = showIdToSave; 
        state.settings.currentShowTitle = s.title; 
        state.settings.currentShowDesc = s.desc;
    }
    await updateSettings(); 
    renderConfigList();
}

function renderConfigList() {
    const tbody = document.getElementById('table-config-list'); tbody.innerHTML = '';
    document.getElementById('active-config-display').innerText = state.settings.currentShowTitle || "Belum ada show";
    document.getElementById('active-config-id').innerText = "ID: " + (state.settings.currentShowId || "-");
    
    state.schedules.forEach(item => {
        
        const uniqueId = item.customId || item.id;
        
        const isActive = uniqueId === state.settings.currentShowId;
        
        const btnHtml = isActive 
            ? `<button onclick="selectShow('${uniqueId}')" class="bg-green-500/20 border border-green-500 text-green-400 w-full px-5 py-2 rounded-lg text-xs font-bold uppercase hover:bg-red-500 hover:text-white"><i class="fas fa-check-circle mr-1"></i> Terpilih (Batal)</button>` 
            : `<button onclick="selectShow('${uniqueId}')" class="bg-blue-600 hover:bg-iceBlue hover:text-black w-full text-white px-5 py-2 rounded-lg text-xs font-bold uppercase transition shadow-lg">Pilih Show</button>`;
            
        const tr = document.createElement('tr'); 
        tr.className = "hover:bg-white/5 transition border-b border-white/5";
        
        tr.innerHTML = `<td class="p-4"><img src="${item.img}" class="w-12 h-12 rounded-lg object-cover shadow-md"></td><td class="p-4 font-bold text-white text-lg">${item.title}</td><td class="p-4 text-gray-400">${item.date} ${item.time}</td><td class="p-4 font-mono text-xs text-iceBlue">${uniqueId}</td><td class="p-4 text-right min-w-[140px]">${btnHtml}</td>`;
        tbody.appendChild(tr);
    });
}

async function updateSettings() {
    const payload = { 
        isLive: state.settings.isLive, 
        countdown: state.settings.countdown, 
        formOpen: state.settings.formOpen, 
        currentShowId: state.settings.currentShowId || "", 
        currentShowTitle: state.settings.currentShowTitle || "", 
        currentShowDesc: state.settings.currentShowDesc || "" 
    };
    try {
        await pb.collection('settings').update(SETTINGS_ID, payload);
    } catch(err) { showToast("Gagal update settings: " + err.message, 'error'); }
}


async function saveBackupUrl(e) {
    e.preventDefault();
    const url = document.getElementById('backup-url-input').value.trim();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> SAVING...';
    btn.disabled = true;

    try {
      
        await pb.collection('settings').update(SETTINGS_ID, {
            backupUrl: url
        });
        
       
        state.settings.backupUrl = url;
        
        
        const testBtn = document.getElementById('btn-test-backup');
        if(url) {
            testBtn.href = url;
            testBtn.classList.remove('opacity-50', 'pointer-events-none');
        } else {
            testBtn.classList.add('opacity-50', 'pointer-events-none');
            testBtn.href = "#";
        }

        showToast('Backup Link Disimpan!', 'success');
    } catch (err) {
        showToast('Gagal menyimpan: ' + err.message, 'error');
    }

    btn.innerHTML = originalText;
    btn.disabled = false;
}


function renderTokenOptions() { 
    const s = document.getElementById('token-select-show'); 
    s.innerHTML = '<option value="">-- Pilih Show --</option>'; 
    state.schedules.forEach(x => { 
        const o = document.createElement('option'); 
       
        o.value = x.customId || x.id; 
        o.innerText = x.title; 
        s.appendChild(o); 
    }); 
    renderTokenList(); 
}

async function generateToken() {
    const id = document.getElementById('token-select-show').value; 
    if(!id) return showToast('Pilih Show!', 'error');
    
    const tokenStr = (Math.random().toString(36).substring(2,6)+Math.random().toString(36).substring(2,6)).toUpperCase();
    
    
    const show = state.schedules.find(x => (x.customId || x.id) === id);
    
    const newToken = { 
        token: tokenStr, 
        showId: id, // Simpan customId
        showName: show ? show.title : "Unknown Show", 
        link: `stream.hanabira48.site/#${tokenStr}`, 
        isBanned: false 
    };
    
    try {
        await pb.collection('tokens').create(newToken);
        showToast('Token Created', 'success');
        fetchAllData();
    } catch(err) { showToast(err.message, 'error'); }
}

function renderTokenList() {
    const tbody = document.getElementById('table-tokens'); tbody.innerHTML = '';
    state.tokens.forEach(t => {
        const isBanned = t.isBanned === true; const tr = document.createElement('tr'); tr.className = isBanned ? "bg-red-900/20 border-l-2 border-red-500" : "hover:bg-white/5 border-b border-white/5";
        tr.innerHTML = `<td class="p-4 font-bold ${isBanned ? 'text-red-400 line-through' : 'text-hanabira'} tracking-widest">${t.token}</td><td class="p-4 text-gray-300">${t.showName}</td><td class="p-4 text-xs text-iceBlue select-all">${t.link}</td><td class="p-4 text-center flex items-center justify-end gap-2"><button class="text-gray-400 hover:text-white" onclick="navigator.clipboard.writeText('${t.link}');showToast('Copied!')"><i class="fas fa-copy"></i></button><button class="${isBanned ? 'text-green-400' : 'text-yellow-400'} hover:text-white" onclick="toggleBanToken('${t.id}', ${isBanned})"><i class="fas ${isBanned ? 'fa-check' : 'fa-ban'}"></i></button><button class="text-red-400 hover:text-red-200" onclick="deleteToken('${t.id}')"><i class="fas fa-trash-alt"></i></button></td>`;
        tbody.appendChild(tr);
    });
}
async function toggleBanToken(id, status) { await pb.collection('tokens').update(id, { isBanned: !status }); fetchAllData(); showToast(!status?'Banned':'Unbanned','neutral'); }
async function deleteToken(id) { if(confirm('Hapus?')) { await pb.collection('tokens').delete(id); fetchAllData(); } }

// --- FINGERPRINT ---
function renderFingerprints() {
    const t = document.getElementById('table-fingerprint');
    t.innerHTML = '';
    const activeDevices = [];

    state.customers.forEach(c => {
        if (c.fingerprint && c.fingerprint.length > 5) {
            activeDevices.push({ id: c.id, fp: c.fingerprint, name: c.name, type: 'customers' });
        }
    });

    state.tokens.forEach(tkn => {
        if (tkn.fingerprint && tkn.fingerprint.length > 5) {
            activeDevices.push({ id: tkn.id, fp: tkn.fingerprint, name: "TOKEN: " + tkn.token, type: 'tokens' });
        }
    });

    activeDevices.forEach(f => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-white/5 border-b border-white/5";
        tr.innerHTML = `
            <td class="p-4"><div class="font-bold text-white text-sm">${f.name}</div><div class="text-gray-600 text-[10px] mt-1">ID: ${f.id} | FP: ${f.fp}</div></td>
            <td class="p-4 text-right min-w-[150px]"><button onclick="deleteFingerprint('${f.id}', '${f.type}')" class="bg-red-700/50 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition shadow-lg">RESET</button></td>
        `;
        t.appendChild(tr);
    });
}

async function deleteFingerprint(id, collection) {
    if(!confirm(`Reset perangkat user ini?`)) return;
    try {
        await pb.collection(collection).update(id, { fingerprint: "" });
        showToast('Fingerprint Direset!', 'success');
        fetchAllData();
    } catch(err) { showToast(err.message, 'error'); }
}

async function resetAllFingerprints() {
    if(!confirm("RESET SEMUA PERANGKAT?")) return;
    try {
        const promises = [];
        state.customers.forEach(c => { if(c.fingerprint) promises.push(pb.collection('customers').update(c.id, { fingerprint: "" })); });
        state.tokens.forEach(t => { if(t.fingerprint) promises.push(pb.collection('tokens').update(t.id, { fingerprint: "" })); });
        
        await Promise.all(promises);
        showToast('Semua fingerprint direset!', 'success');
        fetchAllData();
    } catch (err) { showToast('Error mass reset: ' + err.message, 'error'); }
}

// --- RESET COUNTER ---
function renderResetControl(query) {
    const container = document.getElementById('reset-control-container');
    container.innerHTML = '';
    
    if (query.length < 3) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">Ketik minimal 3 karakter Email/ID untuk mencari data pelanggan.</p>';
        return;
    }

    const foundCustomers = state.customers.filter(c => (c.email && c.email.toLowerCase().includes(query.toLowerCase())) || (c.id && c.id.toLowerCase().includes(query.toLowerCase())));

    if (foundCustomers.length === 0) {
        container.innerHTML = `<p class="text-red-400 text-center py-8">Tidak ditemukan.</p>`;
        return;
    }

    foundCustomers.forEach(customer => {
        const panel = document.createElement('div');
        panel.className = 'glass-panel p-6 rounded-xl mb-4 border border-white/10';
        panel.innerHTML = `
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="flex-1">
                    <p class="text-lg font-bold text-white">${customer.name || 'No Name'}</p>
                    <p class="text-sm text-iceBlue font-mono">${customer.email}</p>
                    <p class="text-xs text-gray-500 mt-1">ID: ${customer.id}</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-center">
                        <p class="text-sm text-gray-400 uppercase tracking-wider">Count</p>
                        <p class="text-3xl font-black text-red-400">${customer.resetCount || 0}</p>
                    </div>
                    <button onclick="resetCustomerCount('${customer.id}')" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition">RESET</button>
                </div>
            </div>
        `;
        container.appendChild(panel);
    });
}

async function resetCustomerCount(id) {
    if(!confirm(`Reset Count menjadi 0?`)) return;
    try {
        await pb.collection('customers').update(id, { resetCount: 0 });
        showToast('Count Direset!', 'success');
        fetchAllData();
    } catch(err) { showToast(err.message, 'error'); }
}

async function resetAllCustomerCounts() {
    if(!confirm("RESET SEMUA COUNT PELANGGAN?")) return;
    try {
        const promises = [];
        state.customers.forEach(c => { if(c.resetCount > 0) promises.push(pb.collection('customers').update(c.id, { resetCount: 0 })); });
        await Promise.all(promises);
        showToast('Global Reset Berhasil!', 'success');
        fetchAllData();
    } catch(err) { showToast(err.message, 'error'); }
}

// --- FORM STATUS ---
function renderFormStatus() { const cb = document.getElementById('toggle-form'); const lbl = document.getElementById('label-form-status'); cb.checked = state.settings.formOpen; lbl.innerText = state.settings.formOpen ? 'OPEN' : 'CLOSED'; lbl.className = state.settings.formOpen ? 'ml-4 text-sm font-bold text-green-400' : 'ml-4 text-sm font-bold text-red-500'; }
async function toggleFormStatus() { state.settings.formOpen = document.getElementById('toggle-form').checked; await updateSettings(); renderFormStatus(); showToast('Status Updated', 'neutral'); }

// --- UTILS ---
function createSnowflakes() { const c = document.getElementById('snow-container'); if(!c) return; for(let i=0; i<50; i++) { const f = document.createElement('div'); f.className='snowflake'; f.style.left=Math.random()*100+'vw'; f.style.width=(Math.random()*5+2)+'px'; f.style.height=f.style.width; f.style.animationDuration=(Math.random()*10+10)+'s'; f.style.animationDelay=(Math.random()*5)+'s'; f.style.opacity=Math.random(); c.appendChild(f); } }

function showToast(msg, type='neutral') { 
    const c = document.getElementById('toast-container'); 
    const t = document.createElement('div'); 
    t.className = 'toast-msg'; 
    let i = '<i class="fas fa-info-circle text-iceBlue"></i>'; 
    if(type==='success') i='<i class="fas fa-check-circle text-green-400"></i>'; 
    if(type==='error') i='<i class="fas fa-exclamation-triangle text-red-500"></i>'; 
    t.innerHTML = `${i} <span>${msg}</span>`; 
    c.appendChild(t); 
    setTimeout(() => { 
        t.style.opacity='0'; 
        t.style.transform='translateX(100%)'; 
        setTimeout(() => t.remove(), 300); 
    }, 3000); 
}

// --- FUNGSI BARU: DUPLICATE CUSTOMER CHECKER ---
function showDuplicateCustomers() {
    // 1. Hitung kemunculan setiap email
    const emailCounts = {};
    
    state.customers.forEach(c => {
        const email = c.email ? c.email.toLowerCase().trim() : "";
        if(email) {
            emailCounts[email] = (emailCounts[email] || 0) + 1;
        }
    });

    // 2. Filter data yang count-nya > 1
    const duplicates = state.customers.filter(c => {
        const email = c.email ? c.email.toLowerCase().trim() : "";
        return email && emailCounts[email] > 1;
    });

    // 3. Urutkan berdasarkan email supaya data kembar terlihat berdekatan
    duplicates.sort((a, b) => a.email.localeCompare(b.email));

    // 4. Tampilkan hasil
    if (duplicates.length === 0) {
        showToast("Tidak ditemukan email duplikat!", "success");
        // Kembalikan tabel ke kondisi normal
        renderCustomers(); 
    } else {
        showToast(`Ditemukan ${duplicates.length} data dengan email sama!`, "error");
        // Render tabel hanya dengan data duplikat
        renderCustomers(duplicates);
    }
}