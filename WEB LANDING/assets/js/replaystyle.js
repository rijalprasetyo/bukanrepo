const styles = `
:root {
    /* --- PALETTE RAMADAN EMERALD --- */
    --bg-dark: #020617;
    --bg-gradient-start: #042f2e;
    --bg-gradient-end: #000000;
    
    --primary: #10b981;       
    --primary-glow: rgba(16, 185, 129, 0.4);
    --secondary: #fbbf24;     
    --secondary-glow: rgba(251, 191, 36, 0.3);
    
    --glass-bg: rgba(4, 47, 46, 0.85);
    --glass-border: rgba(16, 185, 129, 0.25); 
    
    --text-main: #ecfdf5;
    --text-muted: #9ca3af;
    --font-main: 'Outfit', sans-serif;
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

/* --- BACKGROUNDS & DECOR --- */
.ramadan-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -3; background: radial-gradient(circle at 50% 0%, var(--bg-gradient-start) 0%, #000000 100%); }
.ramadan-bg::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0l20 20-20 20z'/%3E%3C/g%3E%3C/svg%3E"); opacity: 0.4; }
#star-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }
.star-sparkle { position: absolute; background: #fbbf24; border-radius: 50%; box-shadow: 0 0 8px var(--secondary); animation: twinkle linear infinite; }
@keyframes twinkle { 0% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } 100% { opacity: 0.2; transform: scale(0.8); } }
.decor-hanging { position: fixed; top: -30px; right: 5%; width: 200px; max-width: 25vw; z-index: -1; pointer-events: none; filter: drop-shadow(0 10px 30px rgba(251, 191, 36, 0.2)); animation: sway 6s ease-in-out infinite alternate; }
.decor-standing { position: fixed; bottom: -20px; left: 2%; height: 35vh; max-height: 300px; z-index: -1; pointer-events: none; filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.2)); animation: floatSlow 5s ease-in-out infinite; }

/* --- UTILS --- */
.view-center { display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; position: relative; z-index: 10; }
.glass-card { background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.6); border-radius: 24px; padding: 40px; width: 100%; max-width: 420px; text-align: center; }
.glass-panel { background: rgba(2, 6, 23, 0.9); backdrop-filter: blur(12px); border: 1px solid var(--glass-border); border-radius: 16px; }

/* --- LOGIN & MODAL --- */
.logo-main { width: 220px; margin-bottom: 25px; filter: drop-shadow(0 0 25px rgba(16, 185, 129, 0.4)); transition: transform 0.3s; }
.logo-main:hover { transform: scale(1.05); }
.subtitle { color: var(--secondary); letter-spacing: 3px; font-size: 0.85rem; font-weight: 700; margin-bottom: 35px; text-transform: uppercase; }
.input-icon-wrap { position: relative; margin-bottom: 25px; }
.input-icon-wrap i { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--text-muted); transition: 0.3s; }
.input-icon-wrap input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 18px 18px 18px 50px; border-radius: 12px; color: white; outline: none; transition: 0.3s; font-family: var(--font-main); font-size: 1rem; }
.input-icon-wrap input:focus { border-color: var(--primary); background: rgba(0,0,0,0.5); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); }
.input-icon-wrap input:focus + i { color: var(--primary); }
.help-link { display: block; text-align: right; color: var(--text-muted); font-size: 0.85rem; text-decoration: none; margin-bottom: 25px; }
.btn-main { width: 100%; padding: 18px; border-radius: 12px; border: none; background: linear-gradient(135deg, #10b981, #065f46); color: white; font-weight: 800; font-size: 1.1rem; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; transition: transform 0.2s, box-shadow 0.2s; letter-spacing: 0.5px; }
.btn-main:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3); }
.btn-ghost { background: transparent; border: 1px solid var(--glass-border); color: var(--text-muted); width: 100%; padding: 14px; margin-top: 15px; border-radius: 12px; cursor: pointer; transition: 0.3s; }
.btn-ghost:hover { background: rgba(255,255,255,0.05); color: var(--secondary); border-color: var(--secondary); }
.error-text { color: #ef4444; margin-top: 15px; font-size: 0.9rem; font-weight: 600; }
.card-footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--glass-border); color: var(--text-muted); font-size: 0.8rem; }
.modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); z-index: 1000; display: flex; justify-content: center; align-items: center; padding: 20px; }
.icon-circle-success { width: 90px; height: 90px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--primary); font-size: 3rem; border: 2px solid var(--primary); box-shadow: 0 0 30px var(--primary-glow); }
.ticket-details { background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid var(--glass-border); }
.detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 10px; }
.highlight { color: var(--secondary); font-size: 1.2rem; margin-top: 10px; font-weight: bold; }

/* --- V3 DASHBOARD STYLES --- */
.v3-wrapper { display: flex; height: 100vh; width: 100%; overflow: hidden; position: relative; }

/* SIDEBAR */
.v3-sidebar { 
    width: 280px; background: rgba(2, 6, 23, 0.98); border-right: 1px solid var(--glass-border);
    display: flex; flex-direction: column; padding: 25px; z-index: 500; transition: transform 0.3s ease;
}
.v3-brand { margin-bottom: 40px; text-align: center; }
.v3-brand img { height: 60px; filter: drop-shadow(0 0 10px var(--primary-glow)); }
.v3-menu { display: flex; flex-direction: column; gap: 10px; flex: 1; }
.v3-menu-item {
    padding: 15px 20px; border-radius: 12px; color: var(--text-muted); text-decoration: none;
    display: flex; align-items: center; gap: 15px; font-weight: 600; transition: all 0.3s; border: 1px solid transparent; cursor: pointer;
}
.v3-menu-item:hover { background: rgba(255,255,255,0.03); color: white; }
.v3-menu-item.active { 
    background: linear-gradient(90deg, rgba(16, 185, 129, 0.15), transparent); 
    color: var(--primary); border-left: 3px solid var(--primary);
}
.v3-logout { margin-top: auto; color: #ef4444; }

/* CONTENT */
.v3-content { flex: 1; overflow-y: auto; position: relative; background: radial-gradient(circle at top right, #062c26 0%, #020617 60%); }
.v3-page { display: none; padding: 30px; max-width: 1200px; margin: 0 auto; animation: fadeInPage 0.5s ease; }
.v3-page.active { display: block; }
@keyframes fadeInPage { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* DASHBOARD CARDS */
.dash-header { margin-bottom: 30px; }
.dash-header h2 { font-size: 2rem; color: white; margin-bottom: 5px; }
.dash-header p { color: var(--text-muted); }
.stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
.stat-card { background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 25px; border-radius: 16px; position: relative; overflow: hidden; }
.stat-val { font-size: 2.5rem; font-weight: 800; color: white; margin: 10px 0; }
.stat-label { color: var(--text-muted); font-size: 0.9rem; letter-spacing: 1px; }

/* --- REPLAY SYSTEM STYLES --- */
.replay-container { padding: 0; }
.replay-player-box { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 16px; overflow: hidden; border: 1px solid var(--glass-border); box-shadow: 0 0 30px rgba(16, 185, 129, 0.1); margin-bottom: 25px; }
.replay-player-box iframe { width: 100%; height: 100%; border:none; }
.replay-meta { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:30px; padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; }
.replay-title { font-size: 1.5rem; font-weight:700; color:white; margin-bottom:5px; }
.replay-date { color:var(--primary); font-size:0.9rem; }
.replay-grid-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 15px; }
.replay-item-card { 
    background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 10px; overflow: hidden; cursor: pointer; transition: 0.3s;
}
.replay-item-card:hover { border-color: var(--secondary); transform: translateY(-5px); }
.replay-thumb { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.replay-info { padding: 12px; }
.replay-item-title { font-size: 0.9rem; color: white; margin-bottom: 5px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;}
.replay-item-date { font-size: 0.75rem; color: var(--text-muted); }
.replay-active { border-color: var(--primary); background: rgba(16, 185, 129, 0.05); }

/* --- SWEETALERT CUSTOM DARK THEME --- */
.glass-tips-popup {
    background: rgba(2, 6, 23, 0.95) !important;
    backdrop-filter: blur(20px) !important;
    border: 1px solid rgba(16, 185, 129, 0.3) !important;
    border-radius: 24px !important;
    box-shadow: 0 0 50px rgba(0,0,0,0.8) !important;
    padding: 30px !important;
}
.swal-title-custom {
    color: #fff !important;
    font-family: var(--font-main) !important;
    font-size: 1.8rem !important;
    margin-bottom: 10px !important;
}
.swal-text-custom {
    color: var(--text-muted) !important;
    font-size: 1rem !important;
}
div:where(.swal2-icon).swal2-success {
    border-color: var(--primary) !important;
    color: var(--primary) !important;
}
div:where(.swal2-icon).swal2-question {
    border-color: var(--secondary) !important;
    color: var(--secondary) !important;
}

/* --- RESPONSIVE --- */
@media (max-width: 1024px) { 
    .v3-sidebar { width: 80px; padding: 15px 10px; }
    .v3-brand img { height: 40px; }
    .v3-menu-item span { display: none; }
    .v3-menu-item { justify-content: center; }
}

@media (max-width: 768px) {
    .v3-wrapper { flex-direction: column-reverse; } 
    .v3-sidebar { 
        position: fixed; bottom: 0; left: 0; width: 100%; height: auto; 
        flex-direction: row; padding: 10px 15px; padding-bottom: env(safe-area-inset-bottom);
        border-right: none; border-top: 1px solid var(--glass-border); justify-content: space-around;
        background: rgba(2, 6, 23, 0.98); z-index: 9999;
    }
    .v3-brand, .v3-menu-item span { display: none; } 
    .v3-menu { flex-direction: row; justify-content: space-around; width: 100%; }
    .v3-menu-item { padding: 10px; font-size: 1.5rem; border: none; }
    .v3-menu-item.active { border-left: none; border-top-color: var(--primary); color: var(--primary); }
    .v3-content { height: 100vh; padding-bottom: 80px; }
    .v3-page { padding: 20px; }
    .replay-grid-list { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .replay-title { font-size: 1.2rem; }
}
`;

function injectStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
injectStyles();
