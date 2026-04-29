document.addEventListener("DOMContentLoaded", () => {
    // SPA Routing Logic
    const navLinks = document.querySelectorAll('.nav-links-vert a, .cta-group a');
    const sections = document.querySelectorAll('.section, .hero');
    const slashContainer = document.getElementById('descorrer-transition');
    const slashTop = document.querySelector('.arrancar-door.left');
    const slashBottom = document.querySelector('.arrancar-door.right');
    const slashGlow = document.querySelector('.void-glow');

    // Make Home the active page initially
    sections.forEach(sec => {
        if(sec.id !== 'home') sec.classList.remove('active-page');
        else sec.classList.add('active-page');
    });

    navLinks.forEach(link => {
        if(!link.getAttribute('href').startsWith('#')) return; // Ignore external links
        
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (!targetSection || targetSection.classList.contains('active-page')) return;
            e.preventDefault();

            // Trigger Arrancar Descorrer Animation In
            slashContainer.style.display = 'block';
            void slashContainer.offsetWidth; // Force reflow

            slashTop.classList.add('active');
            slashBottom.classList.add('active');

            setTimeout(() => {
                // Glow effect on impact
                slashGlow.classList.add('active');
                
                // Swap Pages behind the Descorrer
                sections.forEach(sec => {
                    sec.classList.remove('active-page');
                    // Reset scroll animations so they trigger again
                    const hiddenEls = sec.querySelectorAll('.show');
                    hiddenEls.forEach(el => el.classList.remove('show'));
                });
                
                targetSection.classList.add('active-page');
                window.scrollTo(0, 0);

                // Update active nav link style
                document.querySelectorAll('.nav-links-vert a').forEach(a => a.classList.remove('active-link'));
                const activeNav = document.querySelector(`.nav-links-vert a[href="#${targetId}"]`);
                if(activeNav) activeNav.classList.add('active-link');

                // Trigger observer for new page elements
                setTimeout(() => {
                    const newHiddenEls = targetSection.querySelectorAll('.hidden-left, .hidden-right');
                    newHiddenEls.forEach(el => observer.observe(el));
                }, 50);

                setTimeout(() => {
                    // Fade out glow and slide doors out
                    slashGlow.classList.remove('active');
                    slashTop.classList.remove('active');
                    slashBottom.classList.remove('active');
                    
                    setTimeout(() => {
                        slashContainer.style.display = 'none';
                    }, 400); // Wait for sweep out
                }, 300); // Glow duration
            }, 400); // Wait for doors to close
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
    hiddenElements.forEach((el) => observer.observe(el));

    // Dynamic mouse glow and 3D tilt effect on glass cards
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // 3D tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // Loader logic
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.visibility = 'hidden';
                }, 500);
            }
        }, 2000); // 2 second DBZ charge animation
    });

    // Parallax logic for GIF background
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        if (parallaxBg) {
            const scrollPos = window.scrollY;
            // Move background down at a fraction of the scroll speed
            parallaxBg.style.transform = `translateY(${scrollPos * 0.4}px)`;
        }
    });
});
