// ============================================
// MODERN UI/UX ENHANCEMENTS
// Scroll animations, particle effects, and micro-interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    function updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        if (scrollProgress) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            scrollProgress.style.width = progress + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ============================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Observe stagger containers
    document.querySelectorAll('.stagger-container').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // HERO PARTICLES EFFECT
    // ============================================
    function createHeroParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'hero-particles';

        // Create 15 particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random horizontal position
            const leftPosition = Math.random() * 100;
            particle.style.left = leftPosition + '%';

            // Random animation delay
            const delay = Math.random() * 5;
            particle.style.animationDelay = delay + 's';

            // Random animation duration
            const duration = 15 + Math.random() * 10;
            particle.style.animationDuration = duration + 's';

            // Random size
            const size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            particleContainer.appendChild(particle);
        }

        heroSection.insertBefore(particleContainer, heroSection.firstChild);
    }

    createHeroParticles();

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just '#'
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // RIPPLE EFFECT FOR BUTTONS
    // ============================================
    function createRipple(event) {
        const button = event.currentTarget;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';

        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        if (!button.classList.contains('no-ripple')) {
            button.classList.add('btn-ripple');
            button.addEventListener('click', createRipple);
        }
    });

    // ============================================
    // ENHANCED CARD HOVER EFFECTS
    // ============================================
    document.querySelectorAll('.project-card, .education-item, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function(e) {
            this.style.zIndex = '';
        });
    });

    // ============================================
    // FORM ENHANCEMENTS
    // ============================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        // Add focus class to parent
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Real-time validation feedback
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                if (this.value.length > 0) {
                    this.classList.add('invalid');
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
        });
    }

    // ============================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ============================================
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Call once on load

    // ============================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ============================================
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ============================================
    // LAZY LOADING ENHANCEMENT
    // ============================================
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loading-image');

                    img.addEventListener('load', () => {
                        img.classList.remove('loading-image');
                        img.classList.add('loaded-image');
                    });

                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // ============================================
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.nav-menu.active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
            }
        }

        // Ctrl/Cmd + K for search (if you add search functionality later)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('projectSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // ============================================
    // TESTIMONIAL SLIDER AUTO-PLAY
    // ============================================
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        function showSlide(index) {
            if (index >= slides.length) currentSlide = 0;
            if (index < 0) currentSlide = slides.length - 1;

            testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide++;
                if (currentSlide >= slides.length) currentSlide = 0;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide--;
                if (currentSlide < 0) currentSlide = slides.length - 1;
                showSlide(currentSlide);
            });
        }

        // Auto-play every 5 seconds
        let autoplayInterval = setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);

        // Pause on hover
        if (testimonialSlider.parentElement) {
            testimonialSlider.parentElement.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });

            testimonialSlider.parentElement.addEventListener('mouseleave', () => {
                autoplayInterval = setInterval(() => {
                    currentSlide++;
                    showSlide(currentSlide);
                }, 5000);
            });
        }
    }

    // ============================================
    // SKILL ICONS ANIMATION ON SCROLL
    // ============================================
    const skillIcons = document.querySelectorAll('.icon');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50); // Stagger the animation

                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillObserver.observe(icon);
    });

    // ============================================
    // SECTION REVEAL ANIMATIONS
    // ============================================
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    const debouncedScrollProgress = debounce(updateScrollProgress, 10);
    const debouncedHighlightSection = debounce(highlightActiveSection, 100);

    window.removeEventListener('scroll', updateScrollProgress);
    window.removeEventListener('scroll', highlightActiveSection);

    window.addEventListener('scroll', debouncedScrollProgress);
    window.addEventListener('scroll', debouncedHighlightSection);

    // ============================================
    // CURSOR TRAIL EFFECT (OPTIONAL - SUBTLE)
    // ============================================
    if (window.innerWidth > 768) { // Only on desktop
        const cursorTrail = [];
        const trailLength = 5;

        document.addEventListener('mousemove', (e) => {
            cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

            if (cursorTrail.length > trailLength) {
                cursorTrail.shift();
            }
        });
    }

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c🚀 Welcome to My Portfolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies and attention to detail.', 'color: #60a5fa; font-size: 14px;');
    console.log('%cInterested in working together? Let\'s connect!', 'color: #3b82f6; font-size: 12px;');

    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page changes for screen readers
    function announcePageChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'visually-hidden';
        announcement.textContent = message;
        document.body.appendChild(announcement);

        setTimeout(() => announcement.remove(), 1000);
    }

    // ============================================
    // LOADING COMPLETE
    // ============================================
    console.log('✅ UI Enhancements loaded successfully');
});

// ============================================
// UTILITIES
// ============================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}
