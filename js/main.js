document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburger Accessibile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Funzione centralizzata per aprire/chiudere il menu
    function toggleMenu() {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        
        // Cambia icona
        const icon = menuBtn.querySelector('i');
        if (!isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    if (menuBtn && mobileMenu) {
        // Apri/Chiudi cliccando sul bottone hamburger
        menuBtn.addEventListener('click', toggleMenu);

        // NOVITÀ: Chiudi il menu quando si clicca su qualsiasi link all'interno del menu mobile
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Chiude solo se il menu è attualmente aperto
                if (menuBtn.getAttribute('aria-expanded') === 'true') {
                    toggleMenu();
                }
            });
        });
    }

    // Gestione finta form contatti
    const joinForm = document.getElementById('join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Grazie! La funzionalità di invio email verrà collegata al server in produzione.');
            joinForm.reset();
        });
    }
});
