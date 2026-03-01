document.addEventListener('DOMContentLoaded', () => {
    injectRamadanStyles();
    createRamadanAtmosphere();
});

function injectRamadanStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* ANIMASI LENTERA/LAMPU BERAYUN */
        @keyframes swing {
            0% { transform: rotate(5deg); }
            100% { transform: rotate(-5deg); }
        }
        
        .lantern-swing {
            transform-origin: top center;
            animation: swing 3s infinite ease-in-out alternate;
        }

        /* ANIMASI BINTANG JATUH (BACKGROUND) */
        .ramadan-floater {
            position: fixed;
            top: -10vh;
            z-index: 0;
            pointer-events: none;
            animation-name: floatDown;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        @keyframes floatDown {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.6; }
            100% { transform: translateY(110vh) rotate(20deg); opacity: 0; }
        }

        /* GLASS PANEL */
        .glass-panel {
            background: rgba(16, 185, 129, 0.05); /* Emerald tint */
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        /* TEXT GRADIENT */
        .gradient-text {
            background: linear-gradient(to right, #fbbf24, #10b981); /* Amber to Emerald */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* HOVER EFFECTS */
        .hover-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-card:hover {
            transform: translateY(-8px);
            background: rgba(16, 185, 129, 0.15);
            border-color: rgba(251, 191, 36, 0.5); 
            box-shadow: 0 15px 40px -5px rgba(16, 185, 129, 0.3);
        }

        /* FADE IN */
        @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
            animation: fade-in-down 1s ease-out;
        }
        
        .fa-spin-slow {
            animation: fa-spin 8s infinite linear;
        }
    `;
    document.head.appendChild(style);
}

function createRamadanAtmosphere() {
    const container = document.getElementById('ramadan-container');
    if (!container) return;

    container.innerHTML = '';
    const count = 25; // Jumlah partikel background
    const icons = [
        '<i class="fas fa-star text-yellow-400/40" style="font-size: 10px;"></i>',
        '<i class="fas fa-star text-yellow-200/20" style="font-size: 14px;"></i>',
        '<i class="fas fa-moon text-emerald-200/20" style="font-size: 18px;"></i>'
    ];

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.classList.add('ramadan-floater');
        el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 15 + 10) + 's';
        el.style.animationDelay = (Math.random() * 10) + 's';
        
        container.appendChild(el);
    }
}