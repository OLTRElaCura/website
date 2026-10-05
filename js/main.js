document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        // 1. Apri/Chiudi cliccando sull'hamburger
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Previene comportamenti anomali su mobile
            e.stopPropagation(); 
            
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (!isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // 2. Chiudi il menu in modo forzato quando clicchi un link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Nascondi il div
                menuBtn.setAttribute('aria-expanded', 'false'); // Resetta accessibilità
                
                // Resetta l'icona
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }
});