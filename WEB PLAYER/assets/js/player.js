/**
 * player.js - RAMADAN EDITION V5.0 (Auto Landscape Feature)
 * Updated: Auto Landscape on Fullscreen (Mobile), Admin Notifications, Live Page Tips Trigger
 */

import FingerprintJS from 'https://esm.sh/@fingerprintjs/fingerprintjs@4';
import PocketBase from 'https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.21.1/pocketbase.es.mjs';

const DOMAIN_URL = "https://hanabira48.site"; 
const API_URL = `${DOMAIN_URL}/api`; 
const PB_URL = `${DOMAIN_URL}/pb`; 

// Init PocketBase
const pb = new PocketBase(PB_URL);
pb.autoCancellation(false);

let player;
let hls;
let countdownInterval;
let rotationTimer = null; 
let subscriptionTicker = null;
let unsubscribers = []; 

let userEmail = localStorage.getItem('saved_user_email') || ""; 
let isTokenLogin = false; 
let currentAuthData = { apiToken: null, tokenId: null, secKey: null, showId: null };
let currentUserData = null; 

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM SELECTORS ---
    const appContainer = document.getElementById('app-container');
    const loginWrapper = document.getElementById('login-wrapper');
    const credentialInput = document.getElementById('credential-input');
    const submitCredentialButton = document.getElementById('submit-credential');
    const subscriptionModal = document.getElementById('subscription-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const initialOverlay = document.getElementById('initial-overlay');
    const countdownOverlay = document.getElementById('countdown-overlay');
    const resetButton = document.getElementById('reset-fingerprint-button');
    const headerDurationEl = document.getElementById('header-duration');
    const sidebar = document.querySelector('.sidebar');
    const streamInfoBottom = document.querySelector('.stream-info-bottom');
    const chatFrame = document.getElementById('youtube-chat-frame');
    const lineupContainer = document.getElementById('lineup-container');
    let videoElement = document.getElementById('player'); 
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Detail Modal Selectors (V4)
    const detailModal = document.getElementById('schedule-detail-modal');
    const closeDetailBtn = document.getElementById('close-detail-btn');
    if(closeDetailBtn && detailModal) {
        closeDetailBtn.addEventListener('click', () => {
            detailModal.classList.add('hidden');
        });
    }

    function setupTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });

                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                
                if(targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = (targetId === 'lineup-content') ? 'grid' : 'block';
                }
            });
        });
    }
    setupTabs();

    let urlHash = window.location.hash ? window.location.hash.substring(1).replace(/[^a-zA-Z0-9-]/g, "").trim() : "";
    if (urlHash.length > 5) handleTokenUrlLogin(urlHash);

    function showRamadanAlert(title, text, icon = 'info') {
        Swal.fire({
            title: title, text: text, icon: icon, buttonsStyling: false,
            customClass: { popup: 'glass-tips-popup', confirmButton: 'btn-main glow-effect' },
            confirmButtonText: 'OK'
        });
    }

    // --- UPDATED TIPS FUNCTION ---
    window.showStreamingTips = function() { 
        Swal.fire({
            title: 'TIPS NONTON 🌙',
            html: `
                <div style="text-align: left; font-size: 0.95rem; line-height: 1.5; color: #d1fae5; padding: 0 5px;">
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                        <li style="display: flex; gap: 10px; align-items: flex-start;">
                            <i class="fas fa-wifi" style="color: #fbbf24; margin-top: 4px; min-width: 20px;"></i>
                            <span>Pastikan jaringan internet kamu cukup bagus dan stabil.</span>
                        </li>
                        <li style="display: flex; gap: 10px; align-items: flex-start;">
                            <i class="fab fa-chrome" style="color: #fbbf24; margin-top: 4px; min-width: 20px;"></i>
                            <span>Disarankan menggunakan browser <b style="color: #fff;">Google Chrome</b> dan hindari browser bawaan Handphone (HP).</span>
                        </li>
                        <li style="display: flex; gap: 10px; align-items: flex-start;">
                            <i class="fas fa-rocket" style="color: #fbbf24; margin-top: 4px; min-width: 20px;"></i>
                            <span>Gunakan <a href="https://one.one.one.one/" target="_blank" style="color: #fbbf24; text-decoration: underline; font-weight: 600;">Cloudflare WARP</a> jika streaming terasa tidak stabil atau terdeteksi Bot.</span>
                        </li>
                    </ul>
                </div>
            `,
            confirmButtonText: 'SIAP MENONTON <i class="fas fa-play" style="margin-left: 8px;"></i>',
            buttonsStyling: false,
            customClass: {
                popup: 'glass-tips-popup',
                confirmButton: 'btn-main', 
                title: 'tips-title-text'
            },
            showClass: { popup: 'animate__animated animate__zoomIn animate__faster' },
            hideClass: { popup: 'animate__animated animate__fadeOut animate__faster' }
        });
    }

    // --- V4.2 ADMIN POPUP LOGIC ---
    window.showAdminPopup = function(message, type = 'info') {
        const toast = document.getElementById('admin-toast-container');
        const msgEl = document.getElementById('toast-message');
        const titleEl = document.getElementById('toast-title');
        const bar = document.getElementById('toast-bar');

        if(!toast) return;

        // Reset
        toast.classList.remove('hidden');
        bar.style.transition = 'none';
        bar.style.width = '100%';
        
        // Content
        msgEl.innerText = message;
        if(type === 'urgent') {
            titleEl.innerText = "PENTING / URGENT";
            titleEl.style.color = "#ef4444";
            bar.style.backgroundColor = "#ef4444";
        } else {
            titleEl.innerText = "PENGUMUMAN ADMIN";
            titleEl.style.color = "#fbbf24";
            bar.style.backgroundColor = "#fbbf24";
        }

        // Animation Bar
        setTimeout(() => {
            bar.style.transition = 'width 10s linear';
            bar.style.width = '0%';
        }, 100);

        // Hide after 10s
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 10000);
    }

    function getEmbedChatUrl(url) {
        if (!url) return "";
        let videoId = "";
        try {
            if (url.includes("v=")) {
                const urlObj = new URL(url);
                videoId = urlObj.searchParams.get('v');
            } else if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1].split("?")[0];
            } else if (url.includes("embed/")) {
                videoId = url.split("embed/")[1].split("?")[0];
            } else if (!url.includes('/')) {
                videoId = url;
            }
        } catch (e) { if (!url.includes('/')) videoId = url; }

        if (videoId) {
            const domain = window.location.hostname; 
            return `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${domain}`;
        }
        return "";
    }

    function startApplication() {
        if(loginWrapper) loginWrapper.classList.add('hidden');
        if(subscriptionModal) subscriptionModal.classList.add('hidden');
        if(appContainer) appContainer.classList.remove('hidden');
        
        // V3 handled by MutationObserver

        if (isTokenLogin && headerDurationEl) { 
            headerDurationEl.innerHTML = '<i class="fas fa-crown"></i> VIP Access'; 
            headerDurationEl.style.color = "#fbbf24"; 
        }

        const chatBtn = document.querySelector('.tab-btn[data-target="chat-content"]');
        if(chatBtn) chatBtn.click();

        initializeListeners(); 
        monitorUserStatus(); 
    }

    async function monitorUserStatus() {
        if (!currentUserData || !currentUserData.id) return;
        const col = isTokenLogin ? 'tokens' : 'customers';
        try {
            const unsub = await pb.collection(col).subscribe(currentUserData.id, function(e) {
                if (e.action === 'update' || e.action === 'delete') {
                    if (e.record.isBanned) {
                        forceLogout("AKSES DIBEKUKAN", "Anda melanggar aturan. Hubungi admin.");
                    }
                }
            });
            unsubscribers.push(unsub);
        } catch (err) { /* Silent fail */ }
    }

    function forceLogout(title, msg) {
        stopStream();
        unsubscribers.forEach(u => u()); unsubscribers = [];
        Swal.fire({
            icon: 'error', title: title, text: msg, allowOutsideClick: false, allowEscapeKey: false,
            confirmButtonText: 'KELUAR', customClass: { popup: 'glass-tips-popup', confirmButton: 'btn-main' }
        }).then(() => { window.location.hash = ""; window.location.reload(); });
    }

    async function initializeListeners() {
        unsubscribers.forEach(u => u()); 
        try {
            const record = await pb.collection('settings').getOne('hanabiraconfig1');
            applyAllConfig(record);

            const unsubMain = await pb.collection('settings').subscribe('hanabiraconfig1', (e) => {
                applyAllConfig(e.record);
            });
            unsubscribers.push(unsubMain);

            // V4.2 ADMIN BROADCAST LISTENER
            try {
                const unsubBroadcast = await pb.collection('broadcasts').subscribe('*', (e) => {
                    if (e.action === 'create') {
                        showAdminPopup(e.record.message, e.record.type);
                    }
                });
                unsubscribers.push(unsubBroadcast);
            } catch(e) { console.log("Broadcast listener skipped"); }

            try {
                const statsList = await pb.collection('stream_stats').getList(1, 1);
                if(statsList.items.length > 0) {
                    updateViewerDisplay(statsList.items[0].count);
                }
            } catch(e) {}

            const unsubStats = await pb.collection('stream_stats').subscribe('*', (e) => {
                if(e.record && e.record.count !== undefined) {
                    updateViewerDisplay(e.record.count);
                }
            });
            unsubscribers.push(unsubStats);

        } catch(e) { /* Silent fail */ }
    }

    function updateViewerDisplay(count) {
        const viewerEl = document.getElementById('viewer-count-display');
        if(viewerEl) {
            viewerEl.innerText = count || "0";
        }
    }

    function applyAllConfig(data) {
        handleStreamUpdate(data);
        if (data.chatUrl) updateChatUrl(data.chatUrl);
        if (data.lineup_config) renderLineup(data.lineup_config);
    }

    function updateChatUrl(rawUrl) {
        if (!chatFrame) return;
        const embedUrl = getEmbedChatUrl(rawUrl);
        const currentSrc = chatFrame.getAttribute('src');
        if (embedUrl && currentSrc !== embedUrl) {
            chatFrame.src = embedUrl;
        }
    }

    function extractNameFromUrl(url) {
        try {
            const filename = url.substring(url.lastIndexOf('/') + 1);
            const nameWithHash = filename.split('.')[0];
            const parts = nameWithHash.split('_');
            const firstName = parts[0];
            return firstName.charAt(0).toUpperCase() + firstName.slice(1);
        } catch (e) {
            return "Member";
        }
    }

    function renderLineup(lineupJson) {
        if(!lineupContainer) return;
        lineupContainer.innerHTML = '';
        let hasMember = false;
        
        for(let i=1; i<=24; i++){ 
            const url = lineupJson[`lineup_foto_${i}`]; 
            
            if(url && url.length > 5) { 
                const extractedName = extractNameFromUrl(url);

                const d = document.createElement('div'); 
                d.className = 'lineup-item'; 
                d.innerHTML = `
                    <img src="${url}" loading="lazy" alt="${extractedName}">
                    <div class="member-overlay">
                        <span class="member-name">${extractedName}</span>
                    </div>
                `; 
                lineupContainer.appendChild(d); 
                hasMember = true;
            } 
        }
        
        if(!hasMember) {
            lineupContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: #9ca3af; padding: 40px; display:flex; flex-direction:column; align-items:center; gap:10px;">
                    <i class="fas fa-user-friends" style="font-size: 2rem; opacity:0.5;"></i>
                    <span>Lineup belum tersedia.</span>
                </div>`;
        }
    }

    async function handleVerificationSubmit() {
        const credential = credentialInput.value.trim();
        if (!credential) return showRamadanAlert("Error", "Mohon masukkan email tiket.", "warning");
        
        submitCredentialButton.disabled = true; submitCredentialButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
        try {
            const visitorId = await getVisitorIdSafe(); 
            const response = await fetch(`${API_URL}/login`, { 
                method: 'POST', headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ credential: credential, fingerprint: visitorId }) 
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            
            if (data.data.status === 'Pending') {
                throw new Error("EMAIL BELUM DI VERIFIKASI ADMIN");
            }
            
            currentUserData = data.data; isTokenLogin = false; userEmail = credential;
            localStorage.setItem('saved_user_email', userEmail);
            updateSubscriptionUI(data.data);
            
            loginWrapper.classList.add('hidden');
            subscriptionModal.classList.remove('hidden');
        } catch (error) { showRamadanAlert("Akses Ditolak", error.message, "error"); } 
        finally { submitCredentialButton.disabled = false; submitCredentialButton.innerHTML = 'MASUK STAGE <i class="fas fa-arrow-right"></i>'; }
    }

    async function handleTokenUrlLogin(tokenString) {
        if(loginWrapper) loginWrapper.classList.add('hidden'); 
        if(appContainer) appContainer.classList.remove('hidden'); 
        if(initialOverlay) { initialOverlay.classList.remove('hidden'); initialOverlay.innerHTML = '<div class="spinner-winter"></div><h3>VERIFIKASI TIKET</h3>'; }
        
        try {
            const visitorId = await getVisitorIdSafe();
            const response = await fetch(`${API_URL}/check-token`, { 
                method: 'POST', headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({ token: tokenString, fingerprint: visitorId }) 
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            
            currentUserData = data.data; isTokenLogin = true; userEmail = "VIP-" + tokenString; 
            startApplication();
        } catch (error) {
            if(appContainer) appContainer.classList.add('hidden'); 
            if(loginWrapper) loginWrapper.classList.remove('hidden');
            showRamadanAlert("Token Invalid", error.message, "error");
        }
    }

    function updateSubscriptionUI(userData) {
        if (userData.expDate && userData.expDate.length >= 10) {
            const exp = new Date(userData.expDate);
            const diffDays = Math.ceil((exp - new Date()) / (1000 * 3600 * 24));
            document.getElementById('days-left').textContent = diffDays > 0 ? diffDays : '0';
            startSubscriptionTimer(userData.expDate);
        } else {
            if(subscriptionTicker) clearInterval(subscriptionTicker);
            if(headerDurationEl) { headerDurationEl.innerHTML = '<i class="fas fa-infinity"></i> Unlimited'; headerDurationEl.style.color = "#10b981"; }
            document.getElementById('days-left').textContent = "∞";
        }
        document.getElementById('reg-date').textContent = formatDateSafe(userData.regDate);
        document.getElementById('exp-date').textContent = formatDateSafe(userData.expDate);
    }

    function startSubscriptionTimer(expiryDateString) {
        if(subscriptionTicker) clearInterval(subscriptionTicker);
        
        const isMobile = window.innerWidth < 768 || /iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobile) {
            if(headerDurationEl) {
                headerDurationEl.style.color = "#10b981";
                headerDurationEl.innerHTML = `<i class="fas fa-check-circle"></i> ACTIVE`;
            }
            return; 
        }

        const expDate = new Date(expiryDateString.replace(/-/g, "/")); 
        
        if (isNaN(expDate.getTime())) {
             if(headerDurationEl) {
                headerDurationEl.style.color = "#10b981";
                headerDurationEl.innerHTML = `ACTIVE`;
            }
            return;
        }

        function tick() {
            const now = new Date();
            const diff = expDate - now;
            if (diff <= 0) {
                if(headerDurationEl) { headerDurationEl.innerHTML = 'EXPIRED'; headerDurationEl.style.color = "#ef4444"; }
                clearInterval(subscriptionTicker); forceLogout("Akses Habis", "Tiket berakhir."); return;
            }
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            if(headerDurationEl) {
                let clr = "#10b981"; 
                if(d < 3) clr = "#fbbf24"; 
                if(d < 1) clr = "#ef4444"; 
                headerDurationEl.style.color = clr;
                headerDurationEl.innerHTML = `<i class="fas fa-clock"></i> ${d}d ${h}:${m}:${s}`;
            }
        }
        tick(); subscriptionTicker = setInterval(tick, 1000);
    }

    async function handleResetFingerprint() {
        const credential = credentialInput.value.trim();
        if(!credential) return showRamadanAlert("Info", "Isi email dulu.", "warning");

        const res = await Swal.fire({
            title: 'Reset Perangkat?', 
            text: "Maksimal 5x reset per hari.", 
            icon: 'question',
            showCancelButton: true, 
            confirmButtonText: 'Ya, Reset', 
            cancelButtonText: 'Batal',
            customClass: { popup: 'glass-tips-popup', confirmButton: 'btn-main', cancelButton: 'btn-ghost' }
        });
        if (!res.isConfirmed) return;

        submitCredentialButton.disabled = true; 
        const originalBtnText = submitCredentialButton.innerHTML;
        submitCredentialButton.innerHTML = '<i class="fas fa-cog fa-spin"></i> Processing...';

        try {
            const req = await fetch(`${API_URL}/reset`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ credential }) 
            });
            const d = await req.json();

            if (!d.success) throw new Error(d.message);
            showRamadanAlert("Berhasil", d.message, "success");

        } catch(e) { 
            showRamadanAlert("Gagal", e.message || "Terjadi kesalahan server.", "error"); 
        } finally {
            submitCredentialButton.disabled = false;
            submitCredentialButton.innerHTML = originalBtnText;
        }
    }

    async function getVisitorIdSafe() {
        try { const fp = await FingerprintJS.load(); const res = await fp.get(); return res.visitorId; } 
        catch (e) { return 'fallback-' + Date.now(); }
    }

    function handleStreamUpdate(statusData) {
        if (!statusData) return;
        if (isTokenLogin && currentUserData && currentUserData.showId) {
            if (statusData.currentShowId && statusData.currentShowId !== currentUserData.showId) {
                forceLogout("Akses Ditolak", "Tiket tidak berlaku untuk Show ini.");
                return;
            }
        }

        if (statusData.isLive === true) {
            countdownOverlay.classList.add('hidden'); initialOverlay.classList.remove('hidden');
            streamInfoBottom.classList.remove('hidden'); sidebar.classList.remove('hidden');
            initStream(statusData); 
        } else {
            stopStream();
            initialOverlay.classList.add('hidden'); streamInfoBottom.classList.add('hidden'); sidebar.classList.add('hidden');
            if (statusData.countdown) {
                const targetDate = new Date(statusData.countdown);
                if (!isNaN(targetDate)) showCountdown(targetDate);
            }
        }
    }

    async function initStream(streamData) {
        const showId = streamData.currentShowId;
        
        const streamSources = [
            { url: 'https://api.ngidolihub.my.id/api/stream/v2/playback', name: 'Server 1 (Utama)' },
            { url: 'https://api.ngidolihub.my.id/api/stream/v3/playback', name: 'Server 2 (Backup)' }
        ];

        const controlsId = 'server-controls-container';
        let controlsContainer = document.getElementById(controlsId);
        
        if (!controlsContainer) {
            controlsContainer = document.createElement('div');
            controlsContainer.id = controlsId;
            controlsContainer.style.cssText = "display: flex; gap: 10px; padding: 10px; justify-content: flex-start; align-items: center; background: rgba(0,0,0,0.2); margin-bottom: 10px; border-radius: 8px;";
            
            if (streamInfoBottom) {
                streamInfoBottom.parentNode.insertBefore(controlsContainer, streamInfoBottom);
            } else {
                const pContainer = document.querySelector('.plyr') || videoElement;
                if(pContainer && pContainer.parentNode) pContainer.parentNode.appendChild(controlsContainer);
            }
        }
        
        controlsContainer.innerHTML = ''; 
        streamSources.forEach((source, index) => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="fas fa-server"></i> ${source.name}`;
            btn.className = 'btn-server-select'; 
            btn.style.cssText = "padding: 8px 15px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; background: rgba(255,255,255,0.05); color: #ccc; font-size: 0.85rem; transition: all 0.2s;";
            
            btn.onclick = () => loadSelectedServer(index);
            controlsContainer.appendChild(btn);
        });

        const authData = await fetchStreamToken(showId);
        if(!authData) { if(initialOverlay) initialOverlay.innerHTML = `<h3>AKSES GAGAL</h3>`; return; }
        
        currentAuthData = authData;
        startTokenRotation(showId);

        if(document.getElementById('show-title-bottom')) document.getElementById('show-title-bottom').textContent = streamData.currentShowTitle || "Hanabira Stage";

        // V4 UPDATE: Configured for iOS Playsinline support
        const defaultOptions = { 
            controls: ['play-large', 'play', 'progress', 'current-time', 'pip', 'mute', 'volume', 'settings', 'fullscreen'], 
            settings: ['quality', 'speed'], 
            i18n: { qualityLabel: { 0: 'Auto' } },
            quality: { default: 0, options: [0], forced: true, onChange: null },
            playsinline: true, // Explicitly set for iOS
            fullscreen: { 
                enabled: true, 
                fallback: true, 
                iosNative: true // Use native iOS fullscreen
            }
        };

        function loadSelectedServer(index) {
            if(initialOverlay) {
                initialOverlay.classList.remove('hidden');
                initialOverlay.innerHTML = `
                    <div class="spinner-winter"></div>
                    <h3>MENGHUBUNGKAN...</h3>
                    <p style="margin-top: 10px; font-size: 0.9rem; color: #fff;">
                        <i class="fas fa-satellite-dish"></i> ${streamSources[index].name}
                    </p>
                `;
            }

            if (hls) { hls.destroy(); hls = null; }
            if (player) { player.destroy(); player = null; }

            videoElement = document.getElementById('player');
            if(videoElement) {
                videoElement.removeAttribute('src'); 
                videoElement.load(); 
                // V4 UPDATE: Force playsInline property on the DOM element
                videoElement.playsInline = true; 
            }

            const btns = controlsContainer.querySelectorAll('button');
            btns.forEach((b, i) => {
                if(i === index) {
                    b.style.background = "#10b981"; 
                    b.style.color = "#fff";
                    b.style.borderColor = "#10b981";
                } else {
                    b.style.background = "rgba(255,255,255,0.05)";
                    b.style.color = "#ccc";
                    b.style.borderColor = "rgba(255,255,255,0.1)";
                }
            });

            setTimeout(() => {
                startHlsConnection(streamSources[index].url);
            }, 500); 
        }

        function startHlsConnection(currentUrl) {
            videoElement = document.getElementById('player');
            if (!videoElement) return;

            // V4 UPDATE: Re-apply playsInline before attaching source
            videoElement.playsInline = true;

            if (Hls.isSupported()) {
                hls = new Hls({ 
                    liveSyncDurationCount: 3, maxBufferLength: 30, enableWorker: true, 
                    xhrSetup: function(xhr) { 
                        xhr.setRequestHeader('x-token-id', currentAuthData.tokenId); 
                        xhr.setRequestHeader('x-api-token', currentAuthData.apiToken); 
                        xhr.setRequestHeader('x-sec-key', currentAuthData.secKey); 
                        xhr.setRequestHeader('x-showid', showId); 
                    } 
                });
                
                hls.loadSource(currentUrl);
                hls.attachMedia(videoElement);
                
                hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => { 
                    initialOverlay.classList.add('hidden'); 
                    
                    const availableQualities = hls.levels.map((l) => l.height); 
                    availableQualities.unshift(0);

                    defaultOptions.quality = {
                        default: 0, options: availableQualities, forced: true,
                        onChange: (newQuality) => {
                            if (newQuality === 0) hls.currentLevel = -1;
                            else {
                                hls.levels.forEach((level, levelIndex) => {
                                    if (level.height === newQuality) hls.currentLevel = levelIndex;
                                });
                            }
                        }
                    };

                    player = new Plyr(videoElement, defaultOptions); 
                    setupWatermarkAndLock(player); 
                    player.play().catch(() => { player.muted = true; player.play(); }); 
                });

                hls.on(Hls.Events.ERROR, function (event, data) {
                    if (data.fatal) {
                        if(initialOverlay) initialOverlay.innerHTML = `<h3>KONEKSI TERPUTUS</h3><p>Silakan ganti server.</p>`;
                    }
                });

            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                // FALLBACK UNTUK SAFARI IOS NATIVE
                videoElement.src = `${currentUrl}?x-token-id=${currentAuthData.tokenId}&x-api-token=${encodeURIComponent(currentAuthData.apiToken)}&x-sec-key=${currentAuthData.secKey}&x-showid=${showId}`;
                
                const onPlaying = () => {
                    initialOverlay.classList.add('hidden');
                    videoElement.removeEventListener('playing', onPlaying);
                };
                videoElement.addEventListener('playing', onPlaying);

                if (player) player.destroy(); 
                player = new Plyr(videoElement, defaultOptions);
                setupWatermarkAndLock(player);
                videoElement.addEventListener('loadedmetadata', () => { 
                    player.play().catch(() => { player.muted = true; player.play(); }); 
                });
            }
        }

        loadSelectedServer(0);
    }

    function stopStream() { 
        if (rotationTimer) clearInterval(rotationTimer); 
        if (hls) { hls.destroy(); hls = null; } 
        if (player) { player.destroy(); player = null; } 
    }
    
    async function fetchStreamToken(showId) { try { const r = await fetch(`${API_URL}/stream-token?showId=${showId}`); const j = await r.json(); return j.success ? j.data : null; } catch (e) { return null; } }
    function startTokenRotation(showId) { if (rotationTimer) clearInterval(rotationTimer); rotationTimer = setInterval(async () => { const n = await fetchStreamToken(showId); if (n) { currentAuthData = n; if (hls) { hls.config.xhrSetup = function(xhr) { xhr.setRequestHeader('x-token-id', currentAuthData.tokenId); xhr.setRequestHeader('x-api-token', currentAuthData.apiToken); xhr.setRequestHeader('x-sec-key', currentAuthData.secKey); xhr.setRequestHeader('x-showid', showId); }; } } }, 110000); }
    function formatDateSafe(s) { try { return new Date(s).toLocaleDateString('id-ID'); } catch (e) { return "-"; } }
    
    function showCountdown(d) { stopStream(); if(countdownOverlay) countdownOverlay.classList.remove('hidden'); const t = document.getElementById('countdown-timer'); if(t) t.classList.remove('hidden'); countdownInterval = setInterval(() => { const diff = d - new Date(); if(diff < 0) return clearInterval(countdownInterval); document.getElementById('cd-days').textContent = Math.floor(diff / 86400000); document.getElementById('cd-hours').textContent = Math.floor((diff % 86400000) / 3600000); document.getElementById('cd-minutes').textContent = Math.floor((diff % 3600000) / 60000); document.getElementById('cd-seconds').textContent = Math.floor((diff % 60000) / 1000); }, 1000); }

    function startEmailWatermark(c) {
        const w = document.createElement('div');
        let text = "";
        if (isTokenLogin) { text = userEmail.slice(-4); } else { const name = userEmail.split('@')[0]; text = name.slice(-5); }
        w.textContent = text;
        Object.assign(w.style, { position:'absolute', color:'rgba(255,255,255,0.1)', pointerEvents:'none', fontSize:'1.2rem', fontWeight:'bold', zIndex:'999' });
        c.appendChild(w);
        setInterval(() => { w.style.left = Math.random() * (c.clientWidth - 100) + 'px'; w.style.top = Math.random() * (c.clientHeight - 50) + 'px'; w.style.opacity = '1'; setTimeout(()=>w.style.opacity='0', 5000); }, 15000);
    }
    
    // --- V5 MODIFIED: Added Auto Landscape Logic here to avoid messing up main code ---
    function setupWatermarkAndLock(p) { 
        setTimeout(() => { 
            if(document.querySelector('.plyr')) startEmailWatermark(document.querySelector('.plyr')); 
        }, 1000); 

        // === AUTO LANDSCAPE V5 FEATURE ===
        try {
            // Deteksi event Fullscreen dari Plyr
            p.on('enterfullscreen', () => {
                // Cek apakah user menggunakan Mobile (Android/iOS)
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                if (isMobile) {
                    // Gunakan Screen Orientation API (Support: Android Chrome)
                    // iOS biasanya handle ini secara native via video player bawaan
                    if (screen.orientation && screen.orientation.lock) {
                        screen.orientation.lock('landscape').catch((err) => {
                            // Error handling silent (jika browser tidak support lock)
                            console.log('Landscape lock blocked/unsupported:', err);
                        });
                    }
                }
            });

            // Kembalikan ke Portrait saat keluar Fullscreen
            p.on('exitfullscreen', () => {
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            });
        } catch(e) {
            console.error("Auto Landscape Error:", e);
        }
    }

    if(submitCredentialButton) submitCredentialButton.addEventListener('click', handleVerificationSubmit);
    if(resetButton) resetButton.addEventListener('click', handleResetFingerprint);
    if(closeModalButton) closeModalButton.addEventListener('click', () => { subscriptionModal.classList.add('hidden'); startApplication(); });
});

/* ================================================================
   V3 & V4 SYSTEM: DASHBOARD, SIDEBAR & SCHEDULE DETAIL
================================================================
*/

(function initV3System() {

    // --- 2. V3 DOM STRUCTURE (INJECTED) ---
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
                <a href="#" class="v3-menu-item" data-v3-target="schedule">
                    <i class="fas fa-calendar-alt"></i> <span>Jadwal Show</span>
                </a>
                <a href="#" class="v3-menu-item" data-v3-target="livestream">
                    <i class="fas fa-broadcast-tower"></i> <span>Live Stage</span>
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
                    <p id="v3-user-email">User Hanabira</p>
                </div>

                <div class="stat-grid">
                    <div class="stat-card">
                        <div class="stat-label">STATUS TIKET</div>
                        <div class="stat-val" style="color: #10b981;">ACTIVE</div>
                        <i class="fas fa-check-circle" style="position:absolute; right:20px; top:20px; font-size:1.5rem; color:#10b981;"></i>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">SISA DURASI</div>
                        <div class="stat-val" id="v3-days-left">0</div>
                        <div style="font-size:0.8rem; color:#9ca3af;">Hari lagi</div>
                    </div>
                    <div class="stat-card" style="cursor:pointer;" onclick="Swal.fire('Info', 'Fitur ini segera hadir', 'info')">
                        <div class="stat-label">OFC POINTS</div>
                        <div class="stat-val" style="color: #fbbf24;">0</div>
                        <div style="font-size:0.8rem; color:#9ca3af;">Points</div>
                    </div>
                </div>

                <div class="glass-panel" style="padding: 25px;">
                    <h3 style="margin-bottom:15px; display:flex; align-items:center; gap:10px;">
                        <i class="fas fa-lightbulb" style="color:var(--secondary)"></i> Tips Menonton
                    </h3>
                    <p style="color:var(--text-muted); line-height:1.6; font-size:0.95rem;">
                        Untuk pengalaman terbaik, gunakan browser Google Chrome. Jika video buffering, coba turunkan resolusi atau gunakan DNS 1.1.1.1.
                    </p>
                    <button class="btn-ghost" style="width:auto; margin-top:15px; padding:10px 20px;" id="v3-show-tips">
                        Lihat Tips Lengkap
                    </button>
                </div>
            </div>

            <div id="v3-page-schedule" class="v3-page">
                <div class="dash-header">
                    <h2>Jadwal Theater</h2>
                    <p>Jangan lewatkan pertunjukan member favoritmu.</p>
                </div>
                <div id="v3-schedule-list" class="schedule-list">
                    <div style="text-align:center; padding:50px;"><i class="fas fa-spinner fa-spin"></i> Memuat jadwal...</div>
                </div>
            </div>

            <div id="v3-page-livestream" class="v3-page" style="height: 100%; padding: 0;">
                <div id="v3-live-placeholder" style="height: 100%;"></div>
            </div>
        </main>
    </div>
    `;

    // --- 3. INITIALIZATION LOGIC ---
    let isV3Initialized = false;
    let cachedScheduleData = []; // Store schedule data globally for Detail Modal

    // Monitor changes to #app-container to detect successful login
    const appContainer = document.getElementById('app-container');
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class") {
                // If app-container becomes visible (removes 'hidden')
                if (!appContainer.classList.contains('hidden') && !isV3Initialized) {
                    initDashboardUI();
                }
            }
        });
    });

    if (appContainer) {
        observer.observe(appContainer, { attributes: true });
    }

    function initDashboardUI() {
        isV3Initialized = true;
        console.log("V4 Dashboard Initialized");

        // 1. Move Original Content (Player & Sidebar) temporarily
        const originalContent = document.querySelector('.main-layout .content-grid');
        const originalNav = document.querySelector('.main-layout .glass-nav');
        
        // Hide original Nav (we use sidebar now)
        if(originalNav) originalNav.style.display = 'none';

        // 2. Inject V3 Layout into app-container
        const v3Container = document.createElement('div');
        v3Container.innerHTML = v3Structure;
        appContainer.appendChild(v3Container);

        // 3. Move Original Player Content into 'Live Stage' Tab
        const livePlaceholder = document.getElementById('v3-live-placeholder');
        if(originalContent && livePlaceholder) {
            livePlaceholder.appendChild(originalContent);
            originalContent.style.padding = '20px';
            originalContent.style.height = '100%';
            originalContent.style.overflowY = 'auto';
        }

        // 4. Setup Event Listeners
        setupNavigation();
        populateDashboardData();
        fetchSchedule();
    }

    function setupNavigation() {
        const menuItems = document.querySelectorAll('.v3-menu-item[data-v3-target]');
        const pages = document.querySelectorAll('.v3-page');

        menuItems.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-v3-target');

                // Update Menu Active State
                menuItems.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // V4.2 - Show Tips on Live Click
                if (targetId === 'livestream') {
                    if(window.showStreamingTips) window.showStreamingTips();
                }

                // Update Page Visibility
                pages.forEach(p => p.classList.remove('active'));
                document.getElementById(`v3-page-${targetId}`).classList.add('active');
            });
        });

        // Logout Handler
        document.getElementById('v3-logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Keluar?', text: "Anda harus login ulang nanti.", icon: 'warning',
                showCancelButton: true, confirmButtonText: 'Ya, Keluar', 
                customClass: { popup: 'glass-tips-popup', confirmButton: 'btn-main', cancelButton: 'btn-ghost' }
            }).then((result) => {
                if (result.isConfirmed) window.location.reload();
            });
        });

        // Tips Handler
        const tipsBtn = document.getElementById('v3-show-tips');
        if(tipsBtn) {
            tipsBtn.addEventListener('click', () => {
                try { if(window.showStreamingTips) window.showStreamingTips(); } 
                catch(e) { Swal.fire('Tips', 'Gunakan Chrome & Koneksi Stabil.', 'info'); }
            });
        }
    }

    // --- V4 FEATURE: DETAIL MODAL LOGIC ---
    window.openScheduleDetail = function(index) {
        const data = cachedScheduleData[index];
        if(!data) return;

        const modal = document.getElementById('schedule-detail-modal');
        if(!modal) return;

        document.getElementById('modal-img').src = data.img || 'assets/images/logo.png';
        document.getElementById('modal-title').innerText = data.title || 'Show Title';
        
        const dateStr = data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-';
        document.getElementById('modal-date').innerText = `${dateStr} • ${data.time || 'TBA'}`;
        
        document.getElementById('modal-sts').innerText = data.sts || data.team || '-';
        
        const price = data.price || data.ucilprice || 0;
        document.getElementById('modal-price').innerText = "IDR " + parseInt(price).toLocaleString('id-ID');
        
        document.getElementById('modal-desc').innerText = data.desc || 'Tidak ada deskripsi.';

        modal.classList.remove('hidden');
    }

    function populateDashboardData() {
        setTimeout(() => {
            const daysLeftEl = document.getElementById('days-left');
            const savedEmail = localStorage.getItem('saved_user_email');
            
            if(savedEmail) document.getElementById('v3-user-email').innerText = savedEmail;
            if(daysLeftEl) document.getElementById('v3-days-left').innerText = daysLeftEl.innerText;
        }, 1000);
    }

    async function fetchSchedule() {
        const listContainer = document.getElementById('v3-schedule-list');
        try {
            const res = await fetch('https://hanabira48.site/api/shows');
            const responseData = await res.json();
            
            let shows = [];
            if (Array.isArray(responseData)) {
                shows = responseData;
            } else if (responseData.data && Array.isArray(responseData.data)) {
                shows = responseData.data;
            }
            
            cachedScheduleData = shows; // Cache for details

            if(shows.length === 0) {
                listContainer.innerHTML = '<div style="text-align:center; color:#9ca3af;">Belum ada jadwal show.</div>';
                return;
            }

            shows.sort((a, b) => new Date(a.date) - new Date(b.date));

            listContainer.innerHTML = '';
            
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayStr = `${year}-${month}-${day}`;

            shows.forEach((show, index) => {
                const showDate = new Date(show.date);
                const isLive = show.date.startsWith(todayStr); 
                
                const monthName = showDate.toLocaleString('id-ID', { month: 'short' });
                const dayDate = showDate.getDate();
                const timeString = show.time || showDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                const card = document.createElement('div');
                card.className = 'show-card';
                card.innerHTML = `
                    <div class="date-box">
                        <span class="d-day">${dayDate}</span>
                        <span class="d-month">${monthName}</span>
                    </div>
                    <div class="show-info">
                        <div class="show-title">
                            ${show.title} 
                            ${isLive ? '<span class="live-tag">LIVE HARI INI</span>' : ''}
                        </div>
                        <div class="show-time">
                            <i class="far fa-clock"></i> ${timeString} WIB
                            <span>•</span>
                            <span>${show.sts || show.team || 'Theater'}</span>
                        </div>
                    </div>
                    
                    <div style="display:flex; align-items:center;">
                         <button class="btn-ticket" onclick="window.openScheduleDetail(${index})" style="margin-right:10px; border-color:var(--text-muted); color:var(--text-muted); font-size:0.8rem;">
                            DETAIL
                         </button>

                         ${isLive 
                            ? `<button class="btn-ticket" onclick="document.querySelector('[data-v3-target=livestream]').click()" style="background:var(--primary); color:white; border-color:var(--primary);">NONTON</button>`
                            : ``
                         }
                    </div>
                `;
                listContainer.appendChild(card);
            });

        } catch (error) {
            console.error("Schedule Error:", error);
            listContainer.innerHTML = '<div style="text-align:center; color:#ef4444;">Gagal memuat jadwal.</div>';
        }
    }

})();