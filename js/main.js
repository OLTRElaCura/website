// js/main.js

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    // 1. Apre e chiude il menu tramite il pulsante hamburger
    menuBtn.addEventListener('click', function() {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', isExpanded);
            icon.classList.toggle('fa-xmark', !isExpanded);
        }
    });

    // 2. FORZA la chiusura quando si tocca un qualsiasi link del menu
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Nasconde forzatamente il menu aggiungendo "hidden"
            mobileMenu.classList.add('hidden');
            // Ripristina l'attributo di accessibilità
            menuBtn.setAttribute('aria-expanded', 'false');
            
            // Ripristina l'icona ad hamburger
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });
}

// Gestione form (finta per ora)
const joinForm = document.getElementById('join-form');
if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Grazie! La funzionalità di invio email verrà collegata al server in produzione.');
        joinForm.reset();
    });
}