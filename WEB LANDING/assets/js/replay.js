import FingerprintJS from 'https://esm.sh/@fingerprintjs/fingerprintjs@4';
import PocketBase from 'https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.21.1/pocketbase.es.mjs';

const DOMAIN_URL = "https://hanabira48.site"; 
const API_URL = `${DOMAIN_URL}/api`; 
const PB_URL = `${DOMAIN_URL}/pb`; 


const pb = new PocketBase(PB_URL);
pb.autoCancellation(false);


localStorage.removeItem('saved_user_email'); 
let userEmail = ""; // Reset variable memory
let currentUserData = null; 

document.addEventListener('DOMContentLoaded', () => {
    
    const appContainer = document.getElementById('app-container');
    const loginWrapper = document.getElementById('login-wrapper');
    const credentialInput = document.getElementById('credential-input');
    const submitCredentialButton = document.getElementById('submit-credential');
    const subscriptionModal = document.getElementById('subscription-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const resetButton = document.getElementById('reset-fingerprint-button');
    
    // --- 1. LOGIN & AUTH FLOW ---
    async function handleVerificationSubmit() {
        const credential = credentialInput.value.trim();
        if (!credential) return showCustomAlert("Error", "Mohon masukkan email tiket.", "warning");
        
        submitCredentialButton.disabled = true; 
        submitCredentialButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
        
        try {
            const visitorId = await getVisitorIdSafe(); 
            const response = await fetch(`${API_URL}/login`, { 
                method: 'POST', headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ credential: credential, fingerprint: visitorId }) 
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            
            currentUserData = data.data; 
            userEmail = credential;
            
            
            localStorage.setItem('saved_user_email', userEmail);
            
            updateSubscriptionUI(data.data);
            
            loginWrapper.classList.add('hidden');
            subscriptionModal.classList.remove('hidden');
        } catch (error) { 
            showCustomAlert("Akses Ditolak", error.message, "error"); 
        } finally { 
            submitCredentialButton.disabled = false; 
            submitCredentialButton.innerHTML = 'MASUK STAGE <i class="fas fa-arrow-right"></i>'; 
        }
    }

    // --- 2. RESET DEVICE LOGIC ---
    async function handleResetFingerprint() {
        const credential = credentialInput.value.trim();
        if(!credential) return showCustomAlert("Info", "Isi kolom email tiket terlebih dahulu.", "info");

        const res = await Swal.fire({
            title: 'Reset Perangkat?', 
            text: "Ini akan menghapus sesi lama. Maksimal 5x reset/hari.", 
            icon: 'question',
            showCancelButton: true, 
            confirmButtonText: 'Ya, Reset', 
            cancelButtonText: 'Batal',
            customClass: { 
                popup: 'glass-tips-popup', 
                title: 'swal-title-custom',
                htmlContainer: 'swal-text-custom',
                confirmButton: 'btn-main', 
                cancelButton: 'btn-ghost' 
            },
            buttonsStyling: false
        });
        if (!res.isConfirmed) return;

        const originalBtnText = resetButton.innerHTML;
        resetButton.disabled = true; 
        resetButton.innerHTML = '<i class="fas fa-cog fa-spin"></i> Processing...';

        try {
            const req = await fetch(`${API_URL}/reset`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ credential }) 
            });
            const d = await req.json();

            if (!d.success) throw new Error(d.message);
            
            Swal.fire({
                title: 'Berhasil',
                text: d.message || "Perangkat berhasil direset!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: { 
                    popup: 'glass-tips-popup', 
                    title: 'swal-title-custom',
                    htmlContainer: 'swal-text-custom',
                    confirmButton: 'btn-main'
                },
                buttonsStyling: false
            });

        } catch(e) { 
            showCustomAlert("Gagal", e.message || "Terjadi kesalahan server.", "error"); 
        } finally {
            resetButton.disabled = false;
            resetButton.innerHTML = originalBtnText;
        }
    }

    // --- HELPERS: DATE FORMATTER & ALERT ---
    function updateSubscriptionUI(userData) {
        const formatDate = (dateString) => {
            if (!dateString) return "-";
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });
            } catch (e) { return dateString; }
        };

        if (userData.expDate && userData.expDate.length >= 10) {
            const exp = new Date(userData.expDate);
            const diffDays = Math.ceil((exp - new Date()) / (1000 * 3600 * 24));
            document.getElementById('days-left').textContent = diffDays > 0 ? diffDays : '0';
        } else {
            document.getElementById('days-left').textContent = "∞";
        }

        document.getElementById('reg-date').textContent = formatDate(userData.regDate);
        document.getElementById('exp-date').textContent = formatDate(userData.expDate);
    }

    function showCustomAlert(title, text, icon) {
        Swal.fire({
            title: title, text: text, icon: icon,
            customClass: { 
                popup: 'glass-tips-popup', 
                title: 'swal-title-custom',
                htmlContainer: 'swal-text-custom',
                confirmButton: 'btn-main' 
            },
            buttonsStyling: false
        });
    }

    async function getVisitorIdSafe() {
        try { const fp = await FingerprintJS.load(); const res = await fp.get(); return res.visitorId; } 
        catch (e) { return 'fallback-' + Date.now(); }
    }

    // --- LISTENERS ---
    if(submitCredentialButton) submitCredentialButton.addEventListener('click', handleVerificationSubmit);
    if(resetButton) resetButton.addEventListener('click', handleResetFingerprint);
    
    if(closeModalButton) closeModalButton.addEventListener('click', () => { 
        subscriptionModal.classList.add('hidden'); 
        appContainer.classList.remove('hidden');
        initDashboardUI(); 
    });

    
});



function initDashboardUI() {
    console.log("Initializing V3.3 Dashboard...");
    const appContainer = document.getElementById('app-container');
    const displayEmail = localStorage.getItem('saved_user_email') || 'Guest';
    
    const v3Structure = `
    <div class="v3-wrapper">
        <aside class="v3-sidebar">
            <div class="v3-brand">
                <img src="assets/images/logo.png" alt="Hanabira48">
            </div>
            <nav class="v3-menu">
                <a href="#" class="v3-menu-item active" data-v3-target="dashboard">
                    <i class="fas fa-home"></i> <span>Home</span>
                </a>
                <a href="#" class="v3-menu-item" data-v3-target="replay">
                    <i class="fas fa-play-circle"></i> <span>Replay Show</span>
                </a>
                <a href="#" class="v3-menu-item v3-logout" id="v3-logout-btn">
                    <i class="fas fa-sign-out-alt"></i> <span>Keluar</span>
                </a>
            </nav>
        </aside>

        <main class="v3-content">
            <div id="v3-page-dashboard" class="v3-page active">
                <div class="dash-header">
                    <h2>Selamat Datang,</h2>
                    <p id="v3-user-email">${displayEmail}</p>
                </div>
                <div class="stat-grid">
                    <div class="stat-card">
                        <div class="stat-label">STATUS TIKET</div>
                        <div class="stat-val" style="color: #10b981;">ACTIVE</div>
                        <i class="fas fa-check-circle" style="position:absolute; right:20px; top:20px; font-size:1.5rem; color:#10b981;"></i>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">TOTAL REPLAY</div>
                        <div class="stat-val" id="stat-replay-count">0</div>
                    </div>
                </div>
            </div>

            <div id="v3-page-replay" class="v3-page">
                <div class="replay-container">
                    <div class="dash-header">
                        <h2>Replay Show</h2>
                        <p>Tonton ulang pertunjukan theater.</p>
                    </div>
                    <div class="replay-player-box">
                        <iframe id="replay-iframe" src="" allowfullscreen></iframe>
                    </div>
                    <div class="replay-meta">
                        <div>
                            <div class="replay-title" id="rep-main-title">Pilih Video</div>
                            <div class="replay-date" id="rep-main-date">-</div>
                        </div>
                    </div>
                    <div id="replay-list-container" class="replay-grid-list">
                        <div style="text-align:center; grid-column:1/-1;">
                            <i class="fas fa-spinner fa-spin"></i> Memuat data replay...
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    `;

    appContainer.innerHTML = v3Structure;
    setupNavigation();
}

function setupNavigation() {
    const menuItems = document.querySelectorAll('.v3-menu-item[data-v3-target]');
    const pages = document.querySelectorAll('.v3-page');
    let isReplayLoaded = false;

    menuItems.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-v3-target');
            menuItems.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            pages.forEach(p => p.classList.remove('active'));
            const targetPage = document.getElementById(`v3-page-${targetId}`);
            if(targetPage) targetPage.classList.add('active');

            if (targetId === 'replay' && !isReplayLoaded) {
                loadReplayData();
                isReplayLoaded = true;
            }
        });
    });

    document.getElementById('v3-logout-btn').addEventListener('click', () => {
        Swal.fire({
            title: 'Keluar?', text: "Sesi akan berakhir.", icon: 'warning',
            showCancelButton: true, confirmButtonText: 'Ya', 
            customClass: { 
                popup: 'glass-tips-popup', 
                title: 'swal-title-custom',
                htmlContainer: 'swal-text-custom',
                confirmButton: 'btn-main',
                cancelButton: 'btn-ghost'
            },
            buttonsStyling: false
        }).then((res) => {
            if (res.isConfirmed) {
                localStorage.removeItem('saved_user_email');
                window.location.reload();
            }
        });
    });
}

async function loadReplayData() {
    const listContainer = document.getElementById('replay-list-container');
    try {
        // Fetch Replay Data
        const resultList = await pb.collection('replays').getList(1, 50, { sort: '-date' });
        const replays = resultList.items;
        const statCount = document.getElementById('stat-replay-count');
        if(statCount) statCount.innerText = replays.length;

        if (replays.length === 0) {
            listContainer.innerHTML = '<div style="padding:20px; text-align:center;">Belum ada replay tersedia.</div>';
            return;
        }

        listContainer.innerHTML = '';
        replays.forEach((item, index) => {
            const thumbUrl = getThumbUrl(item.url, item.img);
            const dateStr = item.date ? new Date(item.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : '';

            const card = document.createElement('div');
            card.className = 'replay-item-card';
            card.innerHTML = `
                <img src="${thumbUrl}" class="replay-thumb" loading="lazy">
                <div class="replay-info">
                    <div class="replay-item-title">${item.title}</div>
                    <div class="replay-item-date">${dateStr}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                document.querySelectorAll('.replay-item-card').forEach(c => c.classList.remove('replay-active'));
                card.classList.add('replay-active');
                playReplayVideo(item);
                if(window.innerWidth < 768) document.querySelector('.v3-content').scrollTop = 0;
            });
            listContainer.appendChild(card);
        });

        if(replays.length > 0) {
            playReplayVideo(replays[0]);
            listContainer.firstElementChild.classList.add('replay-active');
        }
    } catch (err) {
        listContainer.innerHTML = `<div style="color:red; text-align:center;">Gagal memuat: ${err.message}</div>`;
    }
}

function playReplayVideo(item) {
    const iframe = document.getElementById('replay-iframe');
    const titleEl = document.getElementById('rep-main-title');
    const dateEl = document.getElementById('rep-main-date');
    const embedUrl = getYoutubeEmbedUrl(item.url);
    if (embedUrl) {
        iframe.src = embedUrl;
        titleEl.innerText = item.title;
        dateEl.innerText = item.date ? new Date(item.date).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}) : '';
    } else {
        Swal.fire("Error", "Link video rusak.", "error");
    }
}

function getYoutubeEmbedUrl(url) {
    if (!url) return null;
    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) videoId = match[2];
    else if (url.length === 11) videoId = url;
    if(videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    return null;
}

function getThumbUrl(url, customImg) {
    if(customImg && customImg.length > 5) return customImg;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
    return 'assets/images/logo.png';
}