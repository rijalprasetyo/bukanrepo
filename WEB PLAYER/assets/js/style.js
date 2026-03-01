// assets/js/style.js

const styles = `
:root {
    /* --- PALETTE RAMADAN EMERALD --- */
    --bg-dark: #020617;
    --bg-gradient-start: #042f2e; /* Deep Teal/Emerald */
    --bg-gradient-end: #000000;
    
    --primary: #10b981;       /* Emerald Green */
    --primary-glow: rgba(16, 185, 129, 0.4);
    --secondary: #fbbf24;     /* Gold */
    --secondary-glow: rgba(251, 191, 36, 0.3);
    
    --glass-bg: rgba(4, 47, 46, 0.85);
    --glass-border: rgba(16, 185, 129, 0.25); 
    
    --text-main: #ecfdf5;
    --text-muted: #9ca3af;
    
    --font-main: 'Outfit', sans-serif;
    
    /* Plyr Override */
    --plyr-color-main: var(--primary);
    --plyr-menu-background: rgba(2, 6, 23, 0.95);
    --plyr-menu-color: var(--text-main);
}

* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

/* --- SCROLLBAR --- */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); border-radius: 10px; margin: 5px 0; }
::-webkit-scrollbar-thumb { background: #059669; border-radius: 10px; transition: all 0.3s ease; }
::-webkit-scrollbar-thumb:hover { background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
* { scrollbar-width: thin; scrollbar-color: var(--primary) rgba(0, 0, 0, 0.3); }

body { font-family: var(--font-main); background-color: var(--bg-dark); color: var(--text-main); min-height: 100vh; overflow-x: hidden; }
.hidden { display: none !important; }

/* --- BACKGROUNDS --- */
.ramadan-bg { 
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -3; 
    background: radial-gradient(circle at 50% 0%, var(--bg-gradient-start) 0%, #000000 100%); 
}

.ramadan-bg::after {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0l20 20-20 20z'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.4;
}

#star-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }
.star-sparkle { position: absolute; background: #fbbf24; border-radius: 50%; box-shadow: 0 0 8px var(--secondary); animation: twinkle linear infinite; }
@keyframes twinkle { 0% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } 100% { opacity: 0.2; transform: scale(0.8); } }

/* Dekorasi */
.decor-hanging { 
    position: fixed; top: -30px; right: 5%; 
    width: 200px; max-width: 25vw; z-index: -1; pointer-events: none; 
    filter: drop-shadow(0 10px 30px rgba(251, 191, 36, 0.2)); 
    animation: sway 6s ease-in-out infinite alternate; 
}

.decor-standing { 
    position: fixed; bottom: -20px; left: 2%; 
    height: 35vh; max-height: 300px; z-index: -1; pointer-events: none; 
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.2)); 
    animation: floatSlow 5s ease-in-out infinite; 
}

/* --- UTILS --- */
.view-center { display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; position: relative; z-index: 10; }
.glass-card { background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-border); box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.6); border-radius: 24px; padding: 40px; width: 100%; max-width: 420px; text-align: center; }
.glass-panel { background: rgba(2, 6, 23, 0.9); backdrop-filter: blur(12px); border: 1px solid var(--glass-border); border-radius: 16px; }

/* --- LOGIN STYLES --- */
.logo-main { 
    width: 220px; 
    margin-bottom: 25px; 
    filter: drop-shadow(0 0 25px rgba(16, 185, 129, 0.4)); 
    transition: transform 0.3s; 
}
.logo-main:hover { transform: scale(1.05); }

.subtitle { color: var(--secondary); letter-spacing: 3px; font-size: 0.85rem; font-weight: 700; margin-bottom: 35px; text-transform: uppercase; }

.input-icon-wrap { position: relative; margin-bottom: 25px; }
.input-icon-wrap i { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--text-muted); transition: 0.3s; }
.input-icon-wrap input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 18px 18px 18px 50px; border-radius: 12px; color: white; outline: none; transition: 0.3s; font-family: var(--font-main); font-size: 1rem; }
.input-icon-wrap input:focus { border-color: var(--primary); background: rgba(0,0,0,0.5); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); }
.input-icon-wrap input:focus + i { color: var(--primary); }

.help-link { display: block; text-align: right; color: var(--text-muted); font-size: 0.85rem; text-decoration: none; margin-bottom: 25px; transition: 0.3s; }
.help-link:hover { color: var(--secondary); }

.btn-main { width: 100%; padding: 18px; border-radius: 12px; border: none; background: linear-gradient(135deg, #10b981, #065f46); color: white; font-weight: 800; font-size: 1.1rem; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; transition: transform 0.2s, box-shadow 0.2s; letter-spacing: 0.5px; }
.btn-main:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3); }

.btn-ghost { background: transparent; border: 1px solid var(--glass-border); color: var(--text-muted); width: 100%; padding: 14px; margin-top: 15px; border-radius: 12px; cursor: pointer; transition: 0.3s; }
.btn-ghost:hover { background: rgba(255,255,255,0.05); color: var(--secondary); border-color: var(--secondary); }
.error-text { color: #ef4444; margin-top: 15px; font-size: 0.9rem; font-weight: 600; }
.card-footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--glass-border); color: var(--text-muted); font-size: 0.8rem; }

/* --- MODAL --- */
.modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); z-index: 1000; display: flex; justify-content: center; align-items: center; padding: 20px; }
.icon-circle-success { width: 90px; height: 90px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--primary); font-size: 3rem; border: 2px solid var(--primary); box-shadow: 0 0 30px var(--primary-glow); }
.ticket-details { background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid var(--glass-border); }
.detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 10px; }
.detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.highlight { color: var(--secondary); font-size: 1.2rem; margin-top: 10px; font-weight: bold; }

/* --- APP LAYOUT (Original) --- */
.main-layout { padding-top: 0; max-width: 100%; margin: 0 auto; min-height: 100vh; position: relative; z-index: 5; }

/* NAV - LOGO BESAR */
.glass-nav { 
    position: fixed; top: 0; left: 0; width: 100%; height: 90px; 
    background: rgba(2, 6, 23, 0.95); backdrop-filter: blur(15px); border-bottom: 1px solid var(--glass-border); z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 0 25px; 
}

.nav-brand { display: flex; align-items: center; }
.nav-brand img { 
    height: 75px; 
    filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.3)); 
    transition: 0.3s; 
}
.nav-brand img:hover { filter: drop-shadow(0 0 20px var(--primary)); }

/* Timer Kanan Atas */
.nav-right { display: flex; align-items: center; }
.timer-pill { background: rgba(251, 191, 36, 0.1); border: 1px solid var(--secondary); color: var(--secondary); padding: 10px 20px; border-radius: 50px; font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 10px; box-shadow: 0 0 20px rgba(251, 191, 36, 0.15); }

.content-grid { display: grid; grid-template-columns: 1fr 380px; gap: 25px; padding: 25px; }

/* PLAYER STYLES */
.player-frame { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 16px; overflow: hidden; position: relative; border: 1px solid var(--glass-border); box-shadow: 0 25px 60px rgba(0,0,0,0.8); }
.shadow-glow { box-shadow: 0 0 50px rgba(16, 185, 129, 0.15); }

/* --- OVERLAY FIX (CENTERING) --- */
.video-overlay { 
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
    background: radial-gradient(circle, #022c22 0%, #000 100%); 
    display: flex; flex-direction: column; justify-content: center; align-items: center; 
    z-index: 10; color: white; text-align: center; 
    padding: 10px;
}

.video-overlay h3 { 
    font-size: 1.8rem; letter-spacing: 2px; margin: 15px 0; 
    font-weight: 800; color: var(--secondary); 
}

.spinner-winter { width: 60px; height: 60px; border: 5px solid rgba(255,255,255,0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }

/* TIMER BOXES */
.timer-box-container { 
    display: flex; gap: 10px; margin-top: 20px; justify-content: center; flex-wrap: wrap; 
}
.time-unit { 
    background: rgba(0,0,0,0.5); padding: 15px; border-radius: 12px; min-width: 80px; 
    border: 1px solid var(--glass-border); display: flex; flex-direction: column; align-items: center; 
}
.time-unit b { 
    display: block; font-size: 1.8rem; color: var(--primary); line-height: 1; text-shadow: 0 0 10px var(--primary-glow); 
}
.time-unit span { 
    font-size: 0.75rem; color: var(--text-muted); letter-spacing: 1px; margin-top: 5px; display: block; 
}

/* STREAM INFO */
.stream-info-bottom { display: flex; align-items: center; justify-content: space-between; padding: 25px; }
.info-left { display: flex; align-items: center; gap: 20px; }
.channel-avatar { width: 65px; height: 65px; border-radius: 50%; border: 2px solid var(--secondary); padding: 3px; box-shadow: 0 0 15px rgba(251, 191, 36, 0.2); }
.text-meta h3 { font-size: 1.4rem; margin: 0; color: var(--text-main); font-weight: 700; }
.text-meta p { color: var(--primary); font-size: 1rem; margin: 0; font-weight: 500; }

.info-right { display: flex; align-items: center; gap: 15px; }
.viewer-badge { background: rgba(0,0,0,0.6); border: 1px solid var(--glass-border); color: var(--text-muted); padding: 8px 18px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; transition: all 0.3s ease; }
.viewer-badge i { color: var(--primary); animation: blinkSmooth 4s infinite; }
.live-badge { background: #ef4444; color: white; padding: 6px 15px; border-radius: 8px; font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
.live-badge i { font-size: 0.6rem; animation: pulseRed 1s infinite; }

/* SIDEBAR & LINEUP */
.sidebar-frame { height: 720px; display: flex; flex-direction: column; overflow: hidden; background: rgba(2, 6, 23, 0.95); }
.tabs-header { display: flex; border-bottom: 1px solid var(--glass-border); }
.tab-btn { flex: 1; background: transparent; border: none; padding: 20px; color: var(--text-muted); font-weight: 700; cursor: pointer; transition: 0.3s; border-bottom: 3px solid transparent; font-size: 1rem; }
.tab-btn:hover { color: white; background: rgba(255,255,255,0.03); }
.tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); background: rgba(16, 185, 129, 0.08); }
.tab-content { flex: 1; display: none; overflow: hidden; }
.tab-content.active { display: flex; flex-direction: column; }
.chat-embed { width: 100%; height: 100%; }

.lineup-grid { 
    padding: 15px; overflow-y: auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding-bottom: 60px;
}
.lineup-item { 
    aspect-ratio: 3/4; background: #042f2e; border-radius: 10px; overflow: hidden; border: 1px solid var(--glass-border); transition: 0.3s; position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.4);
}
.lineup-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.lineup-item:hover img { transform: scale(1.1); }
.lineup-item:hover { border-color: var(--secondary); z-index: 2; box-shadow: 0 0 25px rgba(251, 191, 36, 0.3); }

.member-overlay {
    position: absolute; bottom: 0; left: 0; width: 100%;
    background: linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.6) 60%, transparent 100%);
    padding: 30px 5px 8px 5px; text-align: center; display: flex; flex-direction: column; justify-content: flex-end; pointer-events: none;
}
.member-name {
    color: var(--text-main); font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

/* --- ADMIN TOAST STYLES (V4.2) --- */
.toast-container {
    position: fixed; top: 100px; left: 50%; transform: translateX(-50%);
    z-index: 9999; width: 90%; max-width: 450px;
    animation: slideDownFade 0.5s ease;
}
.toast-content {
    display: flex; flex-direction: row; align-items: center; gap: 15px;
    padding: 20px; position: relative; overflow: hidden;
    background: rgba(2, 6, 23, 0.98); border: 1px solid var(--secondary);
    box-shadow: 0 10px 40px rgba(0,0,0,0.8);
}
.toast-icon {
    width: 50px; height: 50px; border-radius: 50%;
    background: rgba(251, 191, 36, 0.1); color: var(--secondary);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; flex-shrink: 0;
    animation: pulseRed 2s infinite;
}
.toast-text h4 { margin: 0 0 5px 0; color: var(--secondary); font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; }
.toast-text p { margin: 0; font-size: 0.9rem; color: #fff; line-height: 1.4; }
.toast-progress {
    position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: rgba(255,255,255,0.1);
}
.progress-bar {
    height: 100%; background: var(--secondary); width: 100%;
    transition: width linear;
}

@keyframes slideDownFade {
    from { opacity: 0; transform: translate(-50%, -20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
}

/* ================================================================
   V3 & V4 DASHBOARD & SIDEBAR STYLES
================================================================ */

/* Layout Utama V3 */
.v3-wrapper { display: flex; height: 100vh; width: 100%; overflow: hidden; position: relative; }

/* Sidebar Desktop */
.v3-sidebar { 
    width: 280px; background: rgba(2, 6, 23, 0.98); border-right: 1px solid var(--glass-border);
    display: flex; flex-direction: column; padding: 25px; z-index: 500; transition: transform 0.3s ease;
}
.v3-brand { margin-bottom: 40px; text-align: center; }
.v3-brand img { height: 60px; filter: drop-shadow(0 0 10px var(--primary-glow)); }

.v3-menu { display: flex; flex-direction: column; gap: 10px; flex: 1; }
.v3-menu-item {
    padding: 15px 20px; border-radius: 12px; color: var(--text-muted); text-decoration: none;
    display: flex; align-items: center; gap: 15px; font-weight: 600; transition: all 0.3s;
    border: 1px solid transparent; cursor: pointer;
}
.v3-menu-item:hover { background: rgba(255,255,255,0.03); color: white; }
.v3-menu-item.active { 
    background: linear-gradient(90deg, rgba(16, 185, 129, 0.15), transparent); 
    color: var(--primary); border-left: 3px solid var(--primary);
}
.v3-menu-item i { width: 20px; text-align: center; font-size: 1.2rem; }

.v3-logout { margin-top: auto; color: #ef4444; border-color: rgba(239, 68, 68, 0.2); }
.v3-logout:hover { background: rgba(239, 68, 68, 0.1); color: #f87171; }

/* Content Area */
.v3-content { flex: 1; overflow-y: auto; position: relative; background: radial-gradient(circle at top right, #062c26 0%, #020617 60%); }
.v3-page { display: none; padding: 30px; max-width: 1200px; margin: 0 auto; animation: fadeInPage 0.5s ease; }
.v3-page.active { display: block; }

/* Dashboard Cards */
.dash-header { margin-bottom: 30px; }
.dash-header h2 { font-size: 2rem; color: white; margin-bottom: 5px; }
.dash-header p { color: var(--text-muted); }

.stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
.stat-card { 
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); 
    padding: 25px; border-radius: 16px; position: relative; overflow: hidden;
}
.stat-card::before {
    content: ''; position: absolute; top: -50px; right: -50px; width: 100px; height: 100px;
    background: var(--primary); filter: blur(60px); opacity: 0.2;
}
.stat-val { font-size: 2.5rem; font-weight: 800; color: white; margin: 10px 0; }
.stat-label { color: var(--text-muted); font-size: 0.9rem; letter-spacing: 1px; }

/* Show Schedule Styles */
.schedule-list { display: flex; flex-direction: column; gap: 15px; }
.show-card { 
    display: flex; background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border); 
    border-radius: 12px; overflow: hidden; transition: 0.3s; align-items: center;
}
.show-card:hover { border-color: var(--secondary); transform: translateX(5px); background: rgba(0,0,0,0.6); }

.date-box { 
    background: rgba(255,255,255,0.05); padding: 20px; text-align: center; min-width: 90px;
    display: flex; flex-direction: column; justify-content: center; align-self: stretch;
}
.date-box .d-day { font-size: 1.8rem; font-weight: 800; color: white; line-height: 1; }
.date-box .d-month { font-size: 0.8rem; color: var(--secondary); text-transform: uppercase; font-weight: 700; }

.show-info { padding: 20px; flex: 1; }
.show-title { font-size: 1.2rem; font-weight: 700; color: white; margin-bottom: 5px; }
.show-time { color: var(--text-muted); font-size: 0.9rem; display: flex; gap: 10px; align-items: center; }

.live-tag { 
    background: #ef4444; color: white; padding: 5px 10px; border-radius: 6px; 
    font-size: 0.7rem; font-weight: 800; margin-left: 10px; animation: pulseRed 1.5s infinite; 
}
.btn-ticket { 
    margin-right: 20px; padding: 8px 20px; background: transparent; border: 1px solid var(--primary); 
    color: var(--primary); border-radius: 50px; font-weight: 600; cursor: pointer; transition: 0.3s; 
    text-decoration: none; display: inline-block;
}
.btn-ticket:hover { background: var(--primary); color: white; }

/* Responsive Logic */
@media (max-width: 1024px) { 
    .content-grid { grid-template-columns: 1fr; } 
    .sidebar-frame { height: 500px; } 
    .decor-hanging { opacity: 0.7; right: -20px; width: 150px; }
    .decor-standing { height: 25vh; left: -10px; opacity: 0.8; }
}

@media (max-width: 768px) {
    /* V4.1 FIXED BOTTOM NAV */
    .v3-wrapper { flex-direction: column-reverse; } 
    .v3-sidebar { 
        position: fixed; bottom: 0; left: 0; width: 100%; height: auto; min-height: 70px;
        flex-direction: row; padding: 10px 15px; padding-bottom: env(safe-area-inset-bottom); 
        border-right: none; border-top: 1px solid var(--glass-border);
        justify-content: space-around; align-items: center;
        background: rgba(2, 6, 23, 0.98); z-index: 9999; box-shadow: 0 -5px 20px rgba(0,0,0,0.5);
    }
    .v3-brand { display: none; } 
    .v3-logout { margin-top: 0; border: none; padding: 10px; }
    .v3-logout span { display: none; }
    
    .v3-menu { flex-direction: row; gap: 0; justify-content: space-around; width: 100%; }
    .v3-menu-item { flex-direction: column; gap: 5px; padding: 10px; font-size: 0.7rem; border: none; border-radius: 0; }
    .v3-menu-item i { font-size: 1.4rem; margin-bottom: 2px; }
    .v3-menu-item.active { background: transparent; color: var(--primary); border-left: none; border-top: 2px solid var(--primary); }
    
    .v3-content { height: 100vh; padding-bottom: 100px; } /* Space for Nav */
    .v3-page { padding: 20px 15px; }
    .stat-val { font-size: 2rem; }
    
    .show-card { flex-direction: column; align-items: flex-start; position: relative; }
    .date-box { flex-direction: row; width: 100%; padding: 10px; justify-content: flex-start; gap: 10px; align-items: baseline; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .btn-ticket { position: absolute; right: 15px; top: 15px; margin: 0; font-size: 0.8rem; padding: 5px 12px; }
}

@media (max-width: 600px) { 
    .glass-nav { padding: 0 15px; height: 70px; } 
    .nav-brand img { height: 55px; } 
    .timer-pill { padding: 8px 15px; font-size: 0.85rem; }
    
    .view-center { padding: 15px; align-items: center; justify-content: center; } 
    .decor-hanging { width: 120px; right: -20px; top: -10px; }
    .decor-standing { height: 18vh; left: -20px; }
    
    /* FIX OVERLAY KEPOTONG DI HP */
    .video-overlay { padding: 5px; }
    .video-overlay h3 { font-size: 1.1rem !important; margin: 5px 0 !important; }
    .video-overlay p { font-size: 0.8rem; margin-bottom: 5px; }
    .waiting-icon { display: none; } /* Hilangkan icon jam pasir biar muat */
    
    /* FIX TIMER BOXES DI HP */
    .timer-box-container { gap: 5px; margin-top: 10px; }
    .time-unit { 
        padding: 5px 8px !important; min-width: 50px !important; border-radius: 8px;
    }
    .time-unit b { font-size: 1.2rem !important; }
    .time-unit span { font-size: 0.6rem !important; margin-top: 2px; }

    .glass-card { margin: 0; backdrop-filter: blur(25px); background: rgba(2, 6, 23, 0.9); } 
    .stream-info-bottom { flex-direction: column; align-items: flex-start; gap: 15px; } 
    .info-right { width: 100%; justify-content: space-between; }
    .lineup-grid { grid-template-columns: repeat(4, 1fr); gap: 6px; }
    .member-name { font-size: 0.7rem; }
}

/* --- ANIMATIONS --- */
@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes pulseRed { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
@keyframes sway { 0% { transform: rotate(2deg) translateY(0); } 100% { transform: rotate(-2deg) translateY(5px); } }
@keyframes floatSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes blinkSmooth { 0%, 45%, 55%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.fa-spin-slow { animation: spin 4s linear infinite; }
@keyframes fadeInPage { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* SWEETALERT CUSTOM */
div:where(.swal2-container) div:where(.swal2-popup) {
    background: rgba(2, 6, 23, 0.95) !important; backdrop-filter: blur(20px) !important;
    border: 1px solid rgba(16, 185, 129, 0.3) !important; border-radius: 20px !important; box-shadow: 0 0 50px rgba(0,0,0,0.8) !important;
}
div:where(.swal2-container) h2:where(.swal2-title) { color: #fff !important; font-family: var(--font-main) !important; }
div:where(.swal2-container) div:where(.swal2-html-container) { color: var(--text-muted) !important; }
div:where(.swal2-icon).swal2-success { border-color: var(--primary) !important; color: var(--primary) !important; }
div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm {
    background: linear-gradient(135deg, var(--primary), #065f46) !important; border-radius: 10px !important; font-weight: 700 !important;
}
.glass-tips-popup { background: rgba(2, 6, 23, 0.98) !important; border: 1px solid rgba(251, 191, 36, 0.3) !important; }
.tips-title-text { color: var(--secondary) !important; }
.btn-main-sm { background: linear-gradient(135deg, var(--primary), #065f46) !important; color: white !important; border-radius: 8px !important; font-weight: 700 !important; }
`;

function injectStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

injectStyles(); 