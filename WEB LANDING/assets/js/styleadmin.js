
(function() {
    'use strict';

  
    const baseURL = window.location.origin; 

    const japaneseThemeCSS = `
    
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');


    
    :root {
        /* --- Wood Textures --- */
        --jap-wood-dark: #3E2723;      /* Kayu Gelap (Border Utama) */
        --jap-wood-mid: #5D4037;       /* Kayu Medium (Border Tipis) */
        --jap-wood-light: #8D6E63;     /* Kayu Terang (Highlight) */
        
        /* --- Accents --- */
        --jap-sakura-pink: #FFB7C5;    /* Pink Sakura (Tombol Utama) */
        --jap-sakura-dark: #F06292;    /* Pink Hover */
        --jap-red: #C0392B;            /* Merah Torii (Danger/Active) */
        --jap-gold: #D4AF37;           /* Emas Vintage */
        
        /* --- Backgrounds & Text --- */
        --jap-ink: #2C2C2C;            /* Tinta Hitam (Teks Utama) */
        --jap-paper-white: #FFFDF5;    /* Warna Dasar Kertas */
    }


    
    * { 
        box-sizing: border-box; 
    }

    
    body, p, span, div, a, input, button, select, textarea, label, li, td,
    h1, h2, h3, h4, h5, h6, 
    .font-heading, 
    .btn-winter, 
    .nav-item, 
    thead th {
        font-family: 'Noto Sans JP', sans-serif !important;
        letter-spacing: 0.02em;
        font-style: normal !important; /* Mencegah tulisan miring */
    }

    
    h1, h2, h3, h4, h5, h6, .font-heading, thead th {
        font-weight: 700 !important;
    }

    
    .text-white { 
        color: var(--jap-ink) !important; 
    }
    
    .text-gray-300, 
    .text-gray-400, 
    .text-gray-500,
    .text-slate-500,
    .text-slate-600,
    .text-slate-700 { 
        color: #5D4037 !important; 
    }
    
    .text-iceBlue, 
    .text-brand-600 { 
        color: var(--jap-red) !important; 
    }
    
    /* PENGECUALIAN: Dashboard Cards Admin (Background Kayu Gelap) */
    #view-dashboard .grid .text-white { color: #F4F1EA !important; }
    #view-dashboard .grid .text-gray-400 { color: #A1887F !important; }


    
    
    /* 1. Set Background Image pada Body Global */
    body, 
    body.bg-gray-50, 
    body.text-gray-100 {
        background-color: #F4F1EA !important;
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770213837/background_s826qt.png') !important;
        background-size: cover !important;
        background-position: center top !important;
        background-attachment: fixed !important;
        background-repeat: no-repeat !important;
        color: var(--jap-ink) !important;
        min-height: 100vh;
        overflow-x: hidden;
    }

  
    #main-app, 
    main, 
    .bg-gray-50 {
        background-color: transparent !important;
        background: transparent !important;
    }

    /* Sembunyikan Elemen Tema Lama */
    #snow-container, 
    .snowflake, 
    .blur-\\[80px\\], 
    .blur-\\[40px\\], 
    .blur-md {
        display: none !important;
    }

    /* Scrollbar Kayu Custom */
    ::-webkit-scrollbar { 
        width: 12px; 
    }
    
    ::-webkit-scrollbar-track { 
        background: #e0e0e0; 
        border-left: 2px solid var(--jap-wood-dark); 
    }
    
    ::-webkit-scrollbar-thumb { 
        background-color: var(--jap-wood-mid);
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        background-image: linear-gradient(45deg, rgba(255,255,255,.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.1) 50%, rgba(255,255,255,.1) 75%, transparent 75%, transparent);
    }
    
    ::-webkit-scrollbar-thumb:hover { 
        background-color: var(--jap-wood-dark); 
    }


    /* ==========================================================================
       5. SIDEBAR STYLING
       ========================================================================== */
    #sidebar {
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/kertas_newcoq.png') !important;
        background-size: 500px auto;
        background-repeat: repeat;
        background-color: #FFFDF5;
        border-right: 8px solid var(--jap-wood-dark) !important;
        box-shadow: 10px 0 30px rgba(0,0,0,0.3);
    }

    /* Header Sidebar */
    #sidebar .p-8 {
        background-color: var(--jap-wood-dark) !important;
        background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px);
        border-bottom: 4px solid var(--jap-gold) !important;
        text-align: center;
        padding-bottom: 2rem !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    }
    
    #sidebar h1 { 
        color: #FFF !important; 
        text-shadow: 2px 2px 0 #000; 
        font-size: 1.5rem !important; 
        font-weight: 900 !important;
    }
    
    #sidebar h1 span { 
        color: var(--jap-sakura-pink) !important; 
    }

    /* Nav Items */
    .nav-item {
        color: var(--jap-wood-dark) !important;
        font-weight: 600 !important;
        border-radius: 12px !important;
        margin-bottom: 6px;
        transition: all 0.3s;
        padding: 12px 16px !important;
        border: 1px solid transparent;
    }
    
    .nav-item i {
        color: var(--jap-red) !important;
        width: 24px; 
        text-align: center;
    }
    
    .nav-item:hover {
        background-color: rgba(255, 183, 197, 0.4) !important; 
        border-color: var(--jap-red) !important;
        padding-left: 24px !important; 
        color: var(--jap-red) !important;
    }
    
    .nav-item.active {
        background-color: var(--jap-red) !important;
        color: #fff !important;
        box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
        border: none !important;
    }
    
    .nav-item.active i { 
        color: #fff !important; 
    }

    /* Sidebar Divider/Categories */
    #sidebar .uppercase {
        color: var(--jap-wood-mid) !important;
        font-weight: 800 !important;
        font-size: 0.8rem !important;
        border-bottom: 2px solid var(--jap-wood-light);
        display: inline-block;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        padding-right: 10px;
    }

    /* Logout Button */
    #sidebar button[onclick="logout()"] {
        background-color: #fff !important;
        color: var(--jap-red) !important;
        border: 2px solid var(--jap-red) !important;
        border-radius: 12px !important;
        font-weight: bold;
    }
    
    #sidebar button[onclick="logout()"]:hover {
        background-color: var(--jap-red) !important;
        color: #fff !important;
        transform: translateY(2px);
    }


    /* ==========================================================================
       6. DASHBOARD LOGIC (ADMIN vs RESELLER)
       ========================================================================== */
    
    /* RESET GLASSPANEL PADA DASHBOARD AGAR TRANSPARAN */
    #view-dashboard .glass-panel {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        backdrop-filter: none !important;
    }

    /* A. ADMIN DASHBOARD - CARDS SETUP 
       Target: body.text-gray-100 
    */
    
    body.text-gray-100 #view-dashboard .grid > div {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat;
        min-height: 150px;
        position: relative;
        filter: drop-shadow(0 8px 8px rgba(0,0,0,0.4));
        transition: transform 0.3s;
    }
    
    /* Mapping Images Admin - Menggunakan baseURL */
    body.text-gray-100 #view-dashboard .grid > div:nth-child(1) { background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/pelanggan_gaiede.png') !important; }
    body.text-gray-100 #view-dashboard .grid > div:nth-child(2) { background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214052/token_jv0yoy.png') !important; }
    body.text-gray-100 #view-dashboard .grid > div:nth-child(3) { background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214047/aktif_ytdeeb.png') !important; }
    body.text-gray-100 #view-dashboard .grid > div:nth-child(4) { background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214062/status_e4kbn2.png') !important; }

    /* Admin Text Positioning (White/Gold) */
    #view-dashboard #dash-total-subs, 
    #view-dashboard #dash-total-tokens, 
    #view-dashboard #dash-active-devices {
        position: absolute; 
        left: 35px; 
        bottom: 25px;
        font-size: 3.2rem !important; 
        color: #F4F1EA !important; 
        text-shadow: 2px 2px 4px #000;
        margin: 0 !important; 
        line-height: 1;
        font-weight: 700 !important;
    }
    
    /* Hide Default Labels in Admin */
    body.text-gray-100 #view-dashboard .grid p.uppercase,
    body.text-gray-100 #view-dashboard .grid i { 
        display: none !important; 
    }
    
    /* Status Stream */
    #view-dashboard #dash-stream-status {
        position: absolute; 
        left: 35px; 
        bottom: 30px;
        font-size: 2rem !important; 
        color: #D4AF37 !important; 
        text-shadow: 2px 2px 4px #000;
        font-weight: 700 !important;
    }


    /* B. RESELLER DASHBOARD 
       Target: body.bg-gray-50
       Action: Use Paper Background + Wood Borders (No specific image assets)
    */
    body.bg-gray-50 #view-dashboard .glass-panel,
    body.bg-gray-50 #view-dashboard .grid > div {
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/kertas_newcoq.png') !important;
        background-color: #FFFDF5 !important;
        background-size: 300px auto;
        border: 8px solid var(--jap-wood-dark) !important;
        border-radius: 16px !important;
        min-height: 150px;
        padding: 1.5rem !important;
        position: relative;
        box-shadow: 5px 8px 15px rgba(0,0,0,0.2) !important;
    }

    /* Reseller Text Styling (Dark Wood Color) - FORCE BLACK/DARK */
    body.bg-gray-50 #view-dashboard .text-4xl,
    body.bg-gray-50 #view-dashboard #dash-reseller-subs,
    body.bg-gray-50 #view-dashboard #dash-total-subs,
    body.bg-gray-50 #view-dashboard #dash-total-tokens,
    body.bg-gray-50 #view-dashboard #dash-active-devices {
        color: var(--jap-wood-dark) !important;
        font-size: 3.5rem !important;
        margin-top: 10px !important;
        text-shadow: none !important;
        position: static !important;
        opacity: 1 !important;
        font-weight: 900 !important; /* Sangat Tebal agar jelas */
    }
    
    /* Reseller Labels */
    body.bg-gray-50 #view-dashboard p.uppercase {
        display: block !important;
        color: var(--jap-wood-mid) !important;
        border-bottom: 2px dashed var(--jap-wood-light);
        padding-bottom: 5px;
        font-weight: 700 !important;
    }
    
    /* Reseller Watermark Icons */
    body.bg-gray-50 #view-dashboard i.text-6xl {
        display: block !important;
        color: var(--jap-wood-light) !important;
        opacity: 0.1 !important;
        position: absolute;
        right: 20px; 
        top: 20px;
    }


    /* ==========================================================================
       7. GENERAL PANELS & MODALS (FIXED: PAPER BG EVERYWHERE)
       ========================================================================== */
    
    /* Target semua container data */
    section:not(#view-dashboard) .glass-panel, 
    #modal-add-trial .glass-panel, 
    #edit-customer-modal .glass-panel,
    #modal-add-trial .bg-white, 
    #edit-customer-modal .bg-white,
    .overflow-hidden.rounded-xl.border,
    .bg-white.rounded-2xl {
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/kertas_newcoq.png') !important;
        background-size: 400px auto; 
        background-repeat: repeat;
        background-color: #FFFDF5 !important;
        
        /* Border Kayu Tebal */
        border: 10px solid var(--jap-wood-dark) !important;
        border-radius: 12px !important;
        
        box-shadow: 
            inset 0 0 20px rgba(0,0,0,0.15), 
            0 20px 50px rgba(0,0,0,0.5) !important;
            
        padding: 2rem !important;
        margin-bottom: 2rem;
        color: var(--jap-ink) !important;
    }

    /* Override bg-white tailwind */
    .bg-white {
        background-color: #FFFDF5 !important; 
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/kertas_newcoq.png') !important;
    }

    /* Styling Judul Panel */
    .glass-panel h2, 
    .glass-panel h3, 
    .view-section h2, 
    #modal-add-trial h3, 
    #edit-customer-modal h3 {
        color: var(--jap-wood-dark) !important;
        border-bottom: 2px dashed var(--jap-wood-mid);
        padding-bottom: 10px;
        margin-bottom: 20px;
        text-shadow: none !important;
        font-weight: 700 !important;
    }


    /* ==========================================================================
       8. INPUT FIELDS (WHITE BG)
       ========================================================================== */
    
    /* Input field Putih Polos agar kontras dengan kertas */
    input, 
    select, 
    textarea, 
    .input-field {
        background-color: #ffffff !important;
        background-image: none !important;
        
        border: 3px solid var(--jap-wood-light) !important;
        color: #000000 !important; 
        
        border-radius: 16px !important;
        padding: 12px 16px !important;
        font-size: 0.95rem !important;
        box-shadow: inset 2px 2px 5px rgba(0,0,0,0.05);
        transition: all 0.3s;
        width: 100%;
        opacity: 1 !important;
    }

    /* Focus State */
    input:focus, 
    select:focus, 
    textarea:focus {
        border-color: var(--jap-red) !important;
        outline: none !important;
        background-color: #fff !important;
        box-shadow: 0 0 0 4px rgba(192, 57, 43, 0.15) !important;
    }

    /* Placeholder - Dibuat normal (tidak miring aneh) */
    ::placeholder { 
        color: #aaa !important; 
        font-style: normal !important; 
        opacity: 0.8; 
    }

    /* Label */
    label {
        color: var(--jap-wood-dark) !important;
        font-weight: 700 !important;
        margin-bottom: 6px;
        display: block;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Search Icon Fix */
    .group i.absolute {
        color: var(--jap-wood-mid) !important;
        z-index: 10;
        top: 50% !important;
        transform: translateY(-50%) !important;
    }
    

    /* ==========================================================================
       9. BUTTONS
       ========================================================================== */
    .btn-winter, 
    button[type="submit"], 
    #btn-generate, 
    .bg-blue-600, 
    .bg-brand-600 {
        background: var(--jap-sakura-pink) !important;
        color: var(--jap-wood-dark) !important;
        font-weight: 700 !important;
        
        border: 2px solid var(--jap-wood-dark) !important;
        border-radius: 25px !important;
        
        box-shadow: 0 4px 0 var(--jap-wood-dark) !important;
        
        padding: 10px 24px !important;
        text-transform: uppercase;
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        gap: 8px; 
        font-size: 0.9rem !important;
    }

    .btn-winter:hover, 
    button[type="submit"]:hover, 
    .bg-brand-600:hover {
        transform: translateY(2px);
        box-shadow: 0 2px 0 var(--jap-wood-dark) !important; 
        background: var(--jap-sakura-dark) !important; 
        color: #fff !important;
    }
    
    .btn-winter i, button i { 
        color: inherit !important; 
    }

    /* Secondary Buttons */
    #btn-test-backup, 
    button.border-gray-600, 
    .bg-white.border {
        border: 2px solid var(--jap-wood-mid) !important;
        color: var(--jap-wood-dark) !important; 
        background: rgba(255, 255, 255, 0.5) !important;
        border-radius: 16px !important;
        font-weight: 700 !important;
    }
    
    #btn-test-backup:hover, 
    button.border-gray-600:hover, 
    .bg-white.border:hover {
        background: rgba(141, 110, 99, 0.2) !important; 
        color: var(--jap-red) !important; 
        border-color: var(--jap-red) !important;
    }


    /* ==========================================================================
       10. DATA TABLES
       ========================================================================== */
    table, 
    .overflow-x-auto table, 
    .overflow-hidden table {
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/kertas_newcoq.png') !important;
        background-size: 300px auto;
        background-repeat: repeat;
        background-color: #FFFDF5 !important;
        
        border: 4px solid var(--jap-wood-mid) !important;
        border-radius: 8px !important;
        overflow: hidden; 
        width: 100%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        border-collapse: separate; 
        border-spacing: 0; 
        margin-top: 10px;
    }

    /* Header */
    thead tr {
        background-color: var(--jap-wood-light) !important;
        background-image: none !important;
    }
    
    thead th {
        color: #F4F1EA !important;
        font-weight: 700 !important;
        padding: 14px !important;
        border-bottom: 2px solid var(--jap-wood-dark) !important;
        text-transform: uppercase;
        font-size: 0.8rem !important;
    }

    /* Body */
    tbody tr {
        background-color: transparent !important;
        border-bottom: 1px solid #eee !important;
        color: var(--jap-ink) !important;
    }
    
    tbody tr:hover {
        background-color: rgba(255, 249, 196, 0.6) !important; /* Kuning Transparan */
    }
    
    tbody td {
        padding: 12px 14px !important;
        color: var(--jap-ink) !important; 
        border-bottom: 1px solid rgba(0,0,0,0.1);
        font-size: 0.9rem !important;
        font-weight: 500 !important;
    }
    
    tbody td button i.fa-trash-alt { color: var(--jap-red) !important; }
    tbody td button i.fa-edit { color: var(--jap-wood-mid) !important; }


    /* ==========================================================================
       11. SPECIAL ELEMENTS
       ========================================================================== */
    /* Live Control Button */
    #btn-toggle-live {
        background: var(--jap-wood-dark) !important; 
        border: 10px solid #5D4037 !important;
        box-shadow: inset 0 0 30px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.4) !important;
    }
    
    #icon-power { 
        color: #8D6E63 !important; 
        filter: drop-shadow(0 1px 2px rgba(255,255,255,0.1)); 
    }
    
    .live-on-glow {
        border-color: var(--jap-red) !important; 
        background: #3E2723 !important; 
        animation: pulseRed 2s infinite; 
    }
    
    .live-on-glow #icon-power { 
        color: var(--jap-red) !important; 
        text-shadow: 0 0 20px red; 
    }
    
    .live-text-on { 
        color: var(--jap-red) !important; 
        font-weight: 700 !important;
    }
    
    @keyframes pulseRed { 
        0% { box-shadow: 0 0 30px rgba(192, 57, 43, 0.4); } 
        50% { box-shadow: 0 0 60px rgba(192, 57, 43, 0.8); } 
        100% { box-shadow: 0 0 30px rgba(192, 57, 43, 0.4); } 
    }

    /* Timer Input */
    #countdown-input {
        color: #000000 !important; 
        font-weight: 800 !important; 
        font-size: 1.4rem !important; 
        background-color: #fff !important; 
        text-align: center; 
        letter-spacing: 1px; 
        border: 3px solid var(--jap-wood-dark) !important; 
        border-radius: 12px !important; 
    }


    /* ==========================================================================
       12. LOGIN SCREEN
       ========================================================================== */
    #login-screen {
        background-color: var(--jap-wood-dark) !important;
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770213837/background_s826qt.png') !important;
    }
    
    #login-screen .glass-panel, 
    #login-screen .bg-white {
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/kertas_newcoq.png') !important; 
        background-color: #F4F1EA !important;
        border: 12px solid var(--jap-wood-dark) !important; 
        border-top: 30px solid var(--jap-red) !important; 
        border-radius: 8px !important; 
        padding: 3rem !important;
    }
    
    #login-screen h2 { color: var(--jap-ink) !important; text-shadow: none !important; }
    #login-screen h2 span { color: var(--jap-red) !important; }
    #login-screen p { color: var(--jap-wood-light) !important; }


    /* ==========================================================================
       13. TOAST & SAKURA ANIMATION
       ========================================================================== */
    .toast-msg {
        background: #fff !important; 
        background-image: url('https://res.cloudinary.com/dnriiwrmn/image/upload/v1770214054/kertas_newcoq.png') !important;
        border: 4px solid var(--jap-wood-dark) !important; 
        border-left: 10px solid var(--jap-red) !important;
        color: var(--jap-ink) !important; 
        border-radius: 12px !important; 
        font-weight: 700 !important;
    }
    
    @keyframes fall-sakura { 
        0% { top: -10%; transform: rotate(0deg) translateX(0); opacity: 0; } 
        20% { opacity: 1; } 
        100% { top: 110%; transform: rotate(360deg) translateX(100px); opacity: 0; } 
    }
    
    @media (max-width: 768px) {
        #view-dashboard .grid { grid-template-columns: 1fr; }
        #view-dashboard .grid > div { min-height: 120px !important; }
        #sidebar { position: fixed; height: 100%; z-index: 50; }
        body { background-attachment: scroll !important; }
    }
    `;


    /* ==========================================================================
       JAVASCRIPT INJECTION LOGIC
       ========================================================================== */
    
    function injectJapaneseTheme() {
        const existingStyle = document.getElementById('theme-japanese-full');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'theme-japanese-full';
        style.type = 'text/css';
        style.appendChild(document.createTextNode(japaneseThemeCSS));
        document.head.appendChild(style);
        console.log('🌸 Japanese Traditional Theme (Mobile Font Fixed) Loaded');
    }

    function fixFontAwesome() {
        const style = document.createElement('style');
        style.innerHTML = `
            .fas, .fab, .far, .fa { 
                font-family: "Font Awesome 6 Free", "Font Awesome 5 Free", "FontAwesome" !important; 
                font-weight: 900; 
                font-style: normal !important;
            }
            .fab { 
                font-family: "Font Awesome 6 Brands" !important; 
                font-weight: 400; 
                font-style: normal !important;
            }
        `;
        document.head.appendChild(style);
    }

    function createSakura() {
        if(document.querySelectorAll('.sakura-petal').length > 0) return;
        const container = document.body;
        
        for (let i = 0; i < 15; i++) {
            const petal = document.createElement('div');
            petal.className = 'sakura-petal';
            
            const size = Math.random() * 12 + 8 + 'px';
            const left = Math.random() * 100 + 'vw';
            const duration = Math.random() * 5 + 10 + 's';
            const delay = Math.random() * 5 + 's';
            const colors = ['#FFB7C5', '#FFC0CB', '#FFD1DC'];
            
            petal.style.cssText = `
                position: fixed; 
                top: -10%; 
                background-color: ${colors[Math.floor(Math.random() * colors.length)]}; 
                border-radius: 100% 0 100% 0; 
                z-index: 9999; 
                pointer-events: none; 
                opacity: 0.8; 
                width: ${size}; 
                height: ${size}; 
                left: ${left}; 
                animation: fall-sakura ${duration} linear infinite; 
                animation-delay: ${delay}; 
                box-shadow: 0 0 5px rgba(255,192,203,0.5);
            `;
            
            container.appendChild(petal);
        }
    }

    /* ==========================================================================
       INITIALIZATION
       ========================================================================== */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectJapaneseTheme();
            fixFontAwesome();
            createSakura();
        });
    } else {
        injectJapaneseTheme();
        fixFontAwesome();
        createSakura();
    }

})();