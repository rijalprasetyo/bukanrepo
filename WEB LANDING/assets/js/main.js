const PB_URL = "https://hanabira48.site/pb"; 
const ADMIN_PHONE = "628567898135"; 
const SEC_KEY = "webgeneral"; 

const pb = new PocketBase(PB_URL);


pb.beforeSend = function (url, options) {
    options.headers = Object.assign({}, options.headers, {
        'xseckey': SEC_KEY,
    });
    return { url, options };
};

document.addEventListener('DOMContentLoaded', () => {
    
    if (typeof createRamadanAtmosphere === 'function') {
        createRamadanAtmosphere();
    }

    initMobileMenu();
    initScrollEffect();
    
    
    loadPublicData();
    
    
    loadFormConfig();

    const subForm = document.getElementById('subscription-form');
    if (subForm) {
        subForm.addEventListener('submit', handleSubscriptionSubmit);
    }
});


async function loadFormConfig() {
    const loadingEl = document.getElementById('form-loading');
    const containerEl = document.getElementById('form-container');
    const closedEl = document.getElementById('form-closed-state');

    if (!loadingEl || !containerEl) return;

    try {
        const setting = await pb.collection('settings').getFirstListItem('');
        const isFormOpen = setting.formOpen; 

        loadingEl.classList.add('hidden');

        if (isFormOpen) {
            containerEl.classList.remove('hidden');
            if(closedEl) closedEl.classList.add('hidden');
        } else {
            containerEl.classList.add('hidden');
            if(closedEl) closedEl.classList.remove('hidden');
        }
    } catch (e) {
        console.error("Gagal load config form:", e);
        if(loadingEl) loadingEl.classList.add('hidden');
        if(containerEl) containerEl.classList.remove('hidden');
    }
}


async function loadPublicData() {
    try {
        const schedules = await pb.collection('schedules').getFullList({ sort: 'date' });
        renderScheduleList(schedules);
    } catch (error) {
        console.error("Error Load Data:", error);
        const container = document.getElementById('schedule-container');
        if (container) {
            container.innerHTML = `<div class="col-span-full text-center py-10 text-gray-400">Gagal memuat jadwal.</div>`;
        }
    }
}


function renderScheduleList(data) {
    const container = document.getElementById('schedule-container');
    if (!container) return; 

    const isLandingPage = document.querySelector('section#home') !== null;

    if (!data || data.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center text-gray-400 py-10 glass-panel rounded-xl w-full">Belum ada jadwal show Ramadan.</div>';
        return;
    }

    data.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));

    let displayData = [];

    if (isLandingPage) {
        const todayStr = new Date().toISOString().split('T')[0]; 
        const todayShow = data.find(item => item.date === todayStr);
        if (todayShow) {
            displayData = [todayShow];
        } else {
            const upcomingShow = data.find(item => item.date > todayStr);
            displayData = upcomingShow ? [upcomingShow] : [data[data.length - 1]]; 
        }
        container.className = "flex justify-center w-full max-w-2xl mx-auto animate-fade-in-down";
    } else {
        displayData = data;
        container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8";
    }

    container.innerHTML = ''; 

    displayData.forEach(item => {
        const showDate = new Date(item.date);
        const todayStr = new Date().toISOString().split('T')[0];
        const isToday = item.date === todayStr;

        const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
        const dateStr = showDate.toLocaleDateString('id-ID', dateOptions); 
        const price = item.price ? parseInt(item.price) : 30000;
        const priceStr = price.toLocaleString('id-ID');

        const waMessage = 
`Halo Admin Hanabira48, saya ingin membeli tiket untuk show Ramadan:

*SHOW :* ${item.title.toUpperCase()}
*JADWAL :* ${dateStr}
*WAKTU :* ${item.time} WIB
*HARGA :* Rp ${priceStr}

Mohon info pembayarannya. Terima kasih!`;

        const waLink = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(waMessage)}`;

        let imageUrl = 'https://placehold.co/400x600/022c22/fbbf24?text=Ramadan+Show';
        if (item.img && item.img.length > 0) {
            if (item.img.startsWith('http')) {
                imageUrl = item.img;
            } else {
                imageUrl = `${PB_URL}/api/files/schedules/${item.id}/${item.img}`;
            }
        }

        const widthClass = isLandingPage ? "w-full" : "h-full";

        const cardHTML = `
            <div class="glass-panel rounded-2xl p-6 hover-card relative overflow-hidden group ${widthClass} flex flex-col border border-emerald-500/20">
                ${isToday ? `<div class="absolute top-0 right-0 bg-goldAccent text-black text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-lg animate-pulse z-10">LIVE HARI INI</div>` : ''}
                
                <div class="text-emerald-300 font-bold mb-3 flex items-center gap-2 text-sm">
                    <i class="far fa-clock"></i> ${dateStr}, ${item.time} WIB
                </div>
                
                <div class="flex gap-4 mb-4">
                    <img src="${imageUrl}" class="w-24 h-32 object-cover rounded-lg shadow-md bg-emerald-900 flex-shrink-0 border border-white/10" alt="Poster" onerror="this.src='https://placehold.co/400x600?text=No+Img'">
                    <div class="flex-1 flex flex-col justify-center">
                        <h3 class="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors leading-tight line-clamp-2">${item.title}</h3>
                        <p class="text-gray-400 text-xs mb-2 line-clamp-2">${item.desc || '-'}</p>
                        <div>
                            <span class="text-[10px] bg-emerald-900/50 px-2 py-1 rounded text-emerald-200 border border-emerald-500/30 font-mono tracking-wider">ID: ${item.customId}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-auto flex items-center justify-between border-t border-emerald-500/20 pt-4">
                    <div class="text-base md:text-lg font-bold text-white">Rp ${priceStr}</div>
                    <a href="${waLink}" target="_blank" class="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 text-white px-5 py-2 rounded-xl text-sm font-bold hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg flex items-center gap-2 uppercase transform hover:scale-105">
                        <i class="fab fa-whatsapp text-lg"></i> Beli Tiket
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}


async function handleSubscriptionSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Mengirim Berkas...';
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');

    try {
        const nama = document.getElementById('nama').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const email = document.getElementById('email').value;
        const fileInput = document.getElementById('bukti');
        
        if (!fileInput.files[0]) throw new Error("Wajib upload bukti transfer!");

        const formData = new FormData();
        formData.append('name', nama);
        formData.append('email', email);
        formData.append('wa', whatsapp);
        formData.append('bukti', fileInput.files[0]); 
        formData.append('status', 'Pending');
        formData.append('regDate', new Date().toISOString().split('T')[0]);
        formData.append('resetCount', 0);
        formData.append('isBanned', false);
        formData.append('fingerprint', "");

        await pb.collection('customers').create(formData);
        showSuccessMessage(whatsapp);

    } catch (err) {
        console.error(err);
        alert("Gagal mengirim data: " + err.message);
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

function showSuccessMessage(wa) {
    const formPanel = document.querySelector('.glass-panel.w-full.max-w-2xl');
    if (formPanel) {
        formPanel.innerHTML = `
            <div class="text-center py-10 animate-fade-in-down">
                <div class="inline-block p-4 rounded-full bg-emerald-500/20 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <i class="fas fa-check-circle text-5xl text-emerald-400"></i>
                </div>
                <h2 class="text-3xl font-bold text-white mb-2">Terimakasih!</h2>
                <p class="text-gray-300 mb-8">Data pendaftaran berhasil diterima.</p>
                <div class="bg-deepNight/50 border border-emerald-500/20 rounded-2xl p-6 mb-8 max-w-md mx-auto">
                    <p class="text-white text-sm leading-relaxed mb-4">Terima kasih! Bukti transfer kamu sedang diproses admin. Mohon tunggu maksimal 3 hari kerja.
                    Silakan Wajib bergabung ke Grup VIP.</p>
                    <a href="https://chat.whatsapp.com/K7cZyGaytppHiud9B0Axv5" target="_blank" class="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105">
                        <i class="fab fa-whatsapp mr-2 text-xl"></i> JOIN GRUP VIP
                    </a>
                </div>
                <a href="index.html" class="text-gray-400 hover:text-white text-sm underline">Kembali ke Beranda</a>
            </div>
        `;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}


function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuContent = document.getElementById('navbar-sticky');
    if (menuBtn && menuContent) menuBtn.addEventListener('click', () => menuContent.classList.toggle('hidden'));
}
function initScrollEffect() {
    const navbar = document.querySelector('nav');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-deepNight/90', 'backdrop-blur-xl', 'shadow-lg');
                navbar.classList.remove('glass-panel'); 
            } else {
                navbar.classList.remove('bg-deepNight/90', 'backdrop-blur-xl', 'shadow-lg');
                navbar.classList.add('glass-panel');
            }
        });
    }
}