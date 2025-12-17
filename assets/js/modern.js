// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Reset any hero transform from previous session
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = 'none';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate the toggle button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.classList.contains('active')
        );
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Skill Bars Animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkillBars() {
        skillItems.forEach(item => {
            const progress = item.querySelector('.skill-progress');
            const level = item.getAttribute('data-level');
            
            if (isElementInViewport(item)) {
                progress.style.width = `${level}%`;
                progress.style.transition = 'width 1.5s ease-out';
            } else {
                progress.style.width = '0%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
    
    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = testimonialSlides.length;
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    // Project Filtering and Search handled by original projects.js
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual fetch)
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Cursor Effect - Removed to use default cursor
    
    // Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('in-view');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Initialize Particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#2563eb' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#2563eb',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero background and image - disabled to prevent overlap
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const particles = document.querySelector('.particles');
        const heroImage = document.querySelector('.hero-image');

        // Reset hero transform to prevent overlap
        if (hero) {
            hero.style.transform = 'none';
        }
        // Disable parallax to prevent overlapping issues
        // if (particles) {
        //     // Move background slower for depth effect
        //     particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        // }
        // if (heroImage) {
        //     // Move hero image slightly for subtle depth
        //     heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        // }
    });

    // Hide skeleton placeholders when content loads
    function hideSkeletons() {
        const experienceSkeleton = document.querySelector('.experience-skeleton');
        const projectsSkeleton = document.querySelector('.projects-skeleton');

        if (experienceSkeleton && document.querySelector('.experience-content').children.length > 0) {
            experienceSkeleton.style.display = 'none';
        }
        if (projectsSkeleton && document.querySelector('.projects-content').children.length > 0) {
            projectsSkeleton.style.display = 'none';
        }
    }

    // Ensure content is rendered; if not, try to render it
    function ensureContentRendered() {
        const experienceContent = document.querySelector('.experience-content');
        const projectsContent = document.querySelector('.projects-content');

        // If experience content is empty, try to render experience
        if (experienceContent && experienceContent.children.length === 0 && window.renderExperience) {
            console.log('Experience content empty, calling renderExperience');
            window.renderExperience();
        }

        // If projects content is empty, try to render projects
        if (projectsContent && projectsContent.children.length === 0 && window.renderProjects) {
            console.log('Projects content empty, calling renderProjects');
            window.renderProjects();
            // Also initialize search if available
            if (window.initializeProjectSearch) {
                setTimeout(() => window.initializeProjectSearch(), 300);
            }
        }
    }

    // Check periodically for loaded content
    const skeletonCheckInterval = setInterval(() => {
        hideSkeletons();
        ensureContentRendered();
        const experienceLoaded = document.querySelector('.experience-content').children.length > 0;
        const projectsLoaded = document.querySelector('.projects-content').children.length > 0;
        if (experienceLoaded && projectsLoaded) {
            clearInterval(skeletonCheckInterval);
        }
    }, 500);

    // Also hide skeletons after max 5 seconds as fallback
    setTimeout(() => {
        hideSkeletons();
        ensureContentRendered();
        clearInterval(skeletonCheckInterval);
    }, 5000);
});