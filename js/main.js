document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Scroll Animations (Fade Up)
    ========================================= */
    const animatedElements = document.querySelectorAll('.fade-up');

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once animation has triggered
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // If reduced motion is preferred, show all elements immediately
        animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    /* =========================================
       Smooth Scrolling for Anchor Links
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       Sticky Navbar Shadow on Scroll
    ========================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    /* =========================================
       Mobile Menu Toggle
    ========================================= */
    // Note: Simple placeholder for mobile menu logic.
    // In a full implementation, this would toggle a mobile menu modal/drawer.
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            
            // Toggle hamburger icon to X
            const svg = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('open')) {
                svg.innerHTML = '<line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/>';
            } else {
                svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
            }
        });
        
        // Close menu when a link is tapped
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const svg = mobileMenuBtn.querySelector('svg');
                svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
            });
        });
    }
});
