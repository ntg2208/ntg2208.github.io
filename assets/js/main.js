document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after everything is loaded
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
    // Create water-themed SVG thumbnails based on project type
    function createProjectThumbnail(project) {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const colors = isDark ? {
            primary: '#60a5fa',
            secondary: '#3b82f6',
            accent: '#2563eb',
            background: '#1e293b',
            text: '#f1f5f9'
        } : {
            primary: '#2563eb',
            secondary: '#1e40af',
            accent: '#3b82f6',
            background: '#ffffff',
            text: '#1e3a8a'
        };
        
        // Determine project type and icon based on keywords and description
        const keywords = project.Keywords.toLowerCase();
        const description = project.Description.toLowerCase();
        let icon = '';
        let patterns = '';
        
        if (keywords.includes('llm') || keywords.includes('language model') || description.includes('text generation')) {
            // NLP/LLM Projects - Brain/Neural Network
            icon = `
                <g transform="translate(200, 120)">
                    <circle cx="0" cy="0" r="25" fill="${colors.primary}" opacity="0.8"/>
                    <circle cx="40" cy="-20" r="20" fill="${colors.secondary}" opacity="0.7"/>
                    <circle cx="-35" cy="15" r="18" fill="${colors.accent}" opacity="0.6"/>
                    <circle cx="20" cy="35" r="22" fill="${colors.primary}" opacity="0.5"/>
                    <circle cx="-15" cy="-30" r="16" fill="${colors.secondary}" opacity="0.9"/>
                    ${Array.from({length: 8}, (_, i) => {
                        const angle = (i * 45) * Math.PI / 180;
                        const x1 = Math.cos(angle) * 25;
                        const y1 = Math.sin(angle) * 25;
                        const x2 = Math.cos(angle) * 45;
                        const y2 = Math.sin(angle) * 45;
                        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors.text}" stroke-width="2" opacity="0.6"/>`;
                    }).join('')}
                </g>`;
        } else if (keywords.includes('healthcare') || keywords.includes('medical') || keywords.includes('patient')) {
            // Healthcare Projects - Medical Cross with Data
            icon = `
                <g transform="translate(200, 150)">
                    <rect x="-30" y="-10" width="60" height="20" fill="${colors.primary}" rx="5"/>
                    <rect x="-10" y="-30" width="20" height="60" fill="${colors.primary}" rx="5"/>
                    <circle cx="-45" cy="-25" r="8" fill="${colors.secondary}" opacity="0.8"/>
                    <circle cx="45" cy="-15" r="6" fill="${colors.accent}" opacity="0.7"/>
                    <circle cx="-35" cy="35" r="7" fill="${colors.secondary}" opacity="0.6"/>
                    <circle cx="40" cy="25" r="9" fill="${colors.accent}" opacity="0.8"/>
                    <path d="M -45,-25 Q -20,-10 45,-15" fill="none" stroke="${colors.text}" stroke-width="2" opacity="0.5"/>
                    <path d="M 45,-15 Q 20,10 -35,35" fill="none" stroke="${colors.text}" stroke-width="2" opacity="0.5"/>
                </g>`;
        } else if (keywords.includes('wind') || keywords.includes('turbine') || keywords.includes('energy')) {
            // Energy Projects - Wind Turbine
            icon = `
                <g transform="translate(200, 150)">
                    <rect x="-3" y="-40" width="6" height="80" fill="${colors.secondary}"/>
                    <ellipse cx="0" cy="-40" rx="40" ry="8" fill="${colors.primary}" transform="rotate(0)"/>
                    <ellipse cx="0" cy="-40" rx="40" ry="8" fill="${colors.accent}" opacity="0.7" transform="rotate(120)"/>
                    <ellipse cx="0" cy="-40" rx="40" ry="8" fill="${colors.secondary}" opacity="0.8" transform="rotate(240)"/>
                    <circle cx="0" cy="-40" r="6" fill="${colors.text}"/>
                    ${Array.from({length: 3}, (_, i) => {
                        const x = Math.cos((i * 120) * Math.PI / 180) * 60;
                        const y = Math.sin((i * 120) * Math.PI / 180) * 60 - 40;
                        return `<circle cx="${x}" cy="${y}" r="4" fill="${colors.primary}" opacity="0.6"/>`;
                    }).join('')}
                </g>`;
        } else if (keywords.includes('machine learning') || keywords.includes('classification') || keywords.includes('clustering')) {
            // ML Projects - Data Nodes
            icon = `
                <g transform="translate(200, 150)">
                    ${Array.from({length: 12}, (_, i) => {
                        const angle = (i * 30) * Math.PI / 180;
                        const radius = 30 + (i % 3) * 15;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        const size = 6 + (i % 3) * 3;
                        const colorIndex = i % 3;
                        const nodeColor = colorIndex === 0 ? colors.primary : colorIndex === 1 ? colors.secondary : colors.accent;
                        return `<circle cx="${x}" cy="${y}" r="${size}" fill="${nodeColor}" opacity="0.8"/>`;
                    }).join('')}
                    <circle cx="0" cy="0" r="12" fill="${colors.text}" opacity="0.9"/>
                    ${Array.from({length: 4}, (_, i) => {
                        const angle = (i * 90) * Math.PI / 180;
                        const x = Math.cos(angle) * 45;
                        const y = Math.sin(angle) * 45;
                        return `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${colors.primary}" stroke-width="2" opacity="0.6"/>`;
                    }).join('')}
                </g>`;
        } else {
            // Default - Data Visualization
            icon = `
                <g transform="translate(200, 150)">
                    ${Array.from({length: 6}, (_, i) => {
                        const height = 20 + Math.random() * 40;
                        const x = -75 + i * 25;
                        return `<rect x="${x}" y="${-height/2}" width="18" height="${height}" fill="${i % 2 === 0 ? colors.primary : colors.secondary}" opacity="0.8" rx="3"/>`;
                    }).join('')}
                    <line x1="-80" y1="40" x2="80" y2="40" stroke="${colors.text}" stroke-width="2" opacity="0.6"/>
                    <line x1="-80" y1="-40" x2="-80" y2="40" stroke="${colors.text}" stroke-width="2" opacity="0.6"/>
                </g>`;
        }
        
        // Background patterns
        patterns = `
            <defs>
                <pattern id="waves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0,20 Q10,10 20,20 Q30,30 40,20" fill="none" stroke="${colors.accent}" stroke-width="1" opacity="0.1"/>
                </pattern>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${colors.background}"/>
                    <stop offset="50%" stop-color="${colors.primary}" stop-opacity="0.1"/>
                    <stop offset="100%" stop-color="${colors.secondary}" stop-opacity="0.05"/>
                </linearGradient>
            </defs>`;
        
        const svg = `
            <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                ${patterns}
                <rect width="400" height="300" fill="url(#oceanGradient)"/>
                <rect width="400" height="300" fill="url(#waves)"/>
                ${icon}
                <text x="200" y="280" text-anchor="middle" fill="${colors.text}" font-family="Inter, sans-serif" font-size="14" font-weight="600" opacity="0.8">
                    ${project['Project Name'].substring(0, 30)}${project['Project Name'].length > 30 ? '...' : ''}
                </text>
            </svg>`;
        
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    // Generate dynamic SVG thumbnails for projects
    function updateProjectThumbnails() {
        document.querySelectorAll('.project-image img, .card-image img').forEach(img => {
            const card = img.closest('.project-card');
            if (card && window.projectsData) {
                const projectName = card.querySelector('h4')?.textContent;
                const project = window.projectsData.find(p => p['Project Name'] === projectName);
                if (project && (!img.src || img.src === '' || img.src.includes('placeholder'))) {
                    img.src = createProjectThumbnail(project);
                    img.alt = `${project['Project Name']} - ${project.Sector}`;
                }
            }
        });
    }
    
    // Update thumbnails initially and when theme changes
    updateProjectThumbnails();
    
    // Re-generate thumbnails when theme changes
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                updateProjectThumbnails();
                updateExperienceIcons();
            }, 100); // Small delay to let theme change
        });
    }
    
    // Generate SVG icons for experience section
    function createExperienceIcon(title, description) {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const colors = isDark ? {
            primary: '#60a5fa',
            secondary: '#3b82f6',
            accent: '#2563eb',
            background: '#1e293b',
            text: '#f1f5f9'
        } : {
            primary: '#2563eb',
            secondary: '#1e40af',
            accent: '#3b82f6',
            background: '#ffffff',
            text: '#1e3a8a'
        };
        
        let icon = '';
        const titleLower = title.toLowerCase();
        const descLower = description.toLowerCase();
        
        if (titleLower.includes('data analysis') || titleLower.includes('processing')) {
            // Data processing icon
            icon = `
                <g transform="translate(75, 50)">
                    <rect x="-30" y="-15" width="60" height="5" fill="${colors.primary}" rx="2"/>
                    <rect x="-25" y="-5" width="50" height="5" fill="${colors.secondary}" rx="2"/>
                    <rect x="-35" y="5" width="70" height="5" fill="${colors.accent}" rx="2"/>
                    <rect x="-20" y="15" width="40" height="5" fill="${colors.primary}" rx="2"/>
                    <circle cx="-45" cy="-10" r="3" fill="${colors.accent}"/>
                    <circle cx="45" cy="0" r="3" fill="${colors.secondary}"/>
                    <circle cx="-40" cy="10" r="3" fill="${colors.primary}"/>
                    <path d="M -45,-10 Q 0,-5 45,0" fill="none" stroke="${colors.text}" stroke-width="1" opacity="0.5"/>
                </g>`;
        } else if (titleLower.includes('statistical') || titleLower.includes('analysis')) {
            // Statistical analysis icon
            icon = `
                <g transform="translate(75, 50)">
                    ${Array.from({length: 5}, (_, i) => {
                        const height = 10 + Math.sin(i) * 15;
                        const x = -30 + i * 15;
                        return `<rect x="${x}" y="${-height/2}" width="10" height="${height}" fill="${i % 2 === 0 ? colors.primary : colors.secondary}" rx="2"/>`;
                    }).join('')}
                    <line x1="-35" y1="20" x2="35" y2="20" stroke="${colors.text}" stroke-width="2" opacity="0.7"/>
                    <line x1="-35" y1="-20" x2="-35" y2="20" stroke="${colors.text}" stroke-width="2" opacity="0.7"/>
                    <path d="M -30,-10 Q -15,5 0,-5 Q 15,10 30,-2" fill="none" stroke="${colors.accent}" stroke-width="2" opacity="0.8"/>
                </g>`;
        } else if (titleLower.includes('ml') || titleLower.includes('machine learning') || titleLower.includes('model')) {
            // ML model icon
            icon = `
                <g transform="translate(75, 50)">
                    <circle cx="0" cy="0" r="8" fill="${colors.primary}"/>
                    ${Array.from({length: 6}, (_, i) => {
                        const angle = (i * 60) * Math.PI / 180;
                        const x = Math.cos(angle) * 25;
                        const y = Math.sin(angle) * 25;
                        return `<circle cx="${x}" cy="${y}" r="5" fill="${colors.secondary}" opacity="0.8"/>`;
                    }).join('')}
                    ${Array.from({length: 6}, (_, i) => {
                        const angle = (i * 60) * Math.PI / 180;
                        const x = Math.cos(angle) * 25;
                        const y = Math.sin(angle) * 25;
                        return `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${colors.accent}" stroke-width="2" opacity="0.6"/>`;
                    }).join('')}
                </g>`;
        } else if (titleLower.includes('recommendation') || titleLower.includes('pricing') || titleLower.includes('fashion')) {
            // Recommendation/ecommerce icon
            icon = `
                <g transform="translate(75, 50)">
                    <rect x="-20" y="-15" width="40" height="25" fill="${colors.primary}" rx="5" opacity="0.8"/>
                    <rect x="-15" y="-10" width="30" height="3" fill="${colors.background}" rx="1"/>
                    <rect x="-15" y="-5" width="20" height="3" fill="${colors.background}" rx="1"/>
                    <rect x="-15" y="0" width="25" height="3" fill="${colors.background}" rx="1"/>
                    <circle cx="25" cy="-5" r="8" fill="${colors.secondary}" opacity="0.7"/>
                    <path d="M 20,-5 L 22,-3 L 28,-9" fill="none" stroke="${colors.background}" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="-30" cy="5" r="6" fill="${colors.accent}" opacity="0.6"/>
                    <text x="-30" y="8" text-anchor="middle" fill="${colors.background}" font-size="8" font-weight="bold">★</text>
                </g>`;
        } else if (titleLower.includes('forecast') || titleLower.includes('inventory') || titleLower.includes('sales')) {
            // Forecasting icon
            icon = `
                <g transform="translate(75, 50)">
                    <line x1="-30" y1="15" x2="30" y2="15" stroke="${colors.text}" stroke-width="2" opacity="0.7"/>
                    <line x1="-30" y1="-15" x2="-30" y2="15" stroke="${colors.text}" stroke-width="2" opacity="0.7"/>
                    <path d="M -25,10 Q -15,0 -5,5 Q 5,-5 15,-2 Q 25,8 30,0" fill="none" stroke="${colors.primary}" stroke-width="3"/>
                    <path d="M -20,12 Q -10,2 0,7 Q 10,-3 20,0 Q 30,10 35,2" fill="none" stroke="${colors.secondary}" stroke-width="2" opacity="0.7" stroke-dasharray="3,2"/>
                    <circle cx="15" cy="-2" r="3" fill="${colors.accent}"/>
                    <circle cx="-5" cy="5" r="3" fill="${colors.accent}"/>
                </g>`;
        } else {
            // Default icon
            icon = `
                <g transform="translate(75, 50)">
                    <rect x="-25" y="-15" width="50" height="30" fill="${colors.primary}" rx="8" opacity="0.8"/>
                    <circle cx="0" cy="0" r="12" fill="${colors.secondary}" opacity="0.9"/>
                    <circle cx="0" cy="0" r="6" fill="${colors.background}"/>
                    <path d="M -3,-3 L 0,0 L 3,-3" fill="none" stroke="${colors.primary}" stroke-width="2" stroke-linecap="round"/>
                </g>`;
        }
        
        const svg = `
            <svg width="150" height="100" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="experienceGradient${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.1"/>
                        <stop offset="100%" stop-color="${colors.secondary}" stop-opacity="0.05"/>
                    </linearGradient>
                </defs>
                <rect width="150" height="100" fill="${colors.background}" rx="8"/>
                <rect width="150" height="100" fill="url(#experienceGradient${Date.now()})" rx="8"/>
                ${icon}
            </svg>`;
        
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }
    
    function updateExperienceIcons() {
        document.querySelectorAll('.company-slider .project-card').forEach(card => {
            const img = card.querySelector('.card-image img');
            const title = card.querySelector('h4')?.textContent || '';
            const description = card.querySelector('p')?.textContent || '';
            
            if (img && (img.src.includes('placeholder') || img.src.includes('data:image/svg'))) {
                img.src = createExperienceIcon(title, description);
                img.alt = `${title} icon`;
            }
        });
    }
    
    // Update experience icons initially
    updateExperienceIcons();

    /**
     * Generic slider initialization function that handles both company and project sliders
     * @param {HTMLElement} container - The slider container element
     * @param {Object} options - Configuration options for the slider
     */
    function initializeSlider(container, options = {}) {
        const track = container.querySelector(options.trackClass || '.cards-track');
        const items = container.querySelectorAll(options.itemClass || '.project-card');
        const prevButton = container.querySelector('.prev-arrow');
        const nextButton = container.querySelector('.next-arrow');
        let currentIndex = 0;
        let autoScrollInterval;

        // Check if we have all necessary elements
        if (!track || !items.length || !prevButton || !nextButton) {
            console.error('Missing required elements for slider');
            return;
        }

        function updateSlider() {
            const containerWidth = track.parentElement.offsetWidth;
            const visibleItems = 3;
            const gap = options.gap || 32;
            const totalGaps = visibleItems - 1;
            const itemWidth = (containerWidth - (totalGaps * gap)) / visibleItems;
            
            // Update card widths
            items.forEach(item => {
                item.style.width = `${itemWidth}px`;
                item.style.minWidth = `${itemWidth}px`;
                item.style.maxWidth = `${itemWidth}px`;
                item.style.marginRight = `${gap}px`;
            });
            
            // Calculate exact offset
            const offset = currentIndex * (itemWidth + gap);
            
            // Apply transform with GPU acceleration
            track.style.transform = `translate3d(-${offset}px, 0, 0)`;
            track.classList.add('sliding');
            
            // Remove sliding class after transition
            track.addEventListener('transitionend', () => {
                track.classList.remove('sliding');
            }, { once: true });
            
            // Update button states
            if (prevButton) {
                prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
                prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
            }
            if (nextButton) {
                const maxIndex = items.length - visibleItems;
                nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
                nextButton.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
            }
        }

        function moveSlide(direction) {
            const maxIndex = Math.max(0, items.length - 3); // Always show 3 items
            if (direction === 'prev') {
                currentIndex = Math.max(0, currentIndex - 1);
            } else {
                currentIndex = Math.min(maxIndex, currentIndex + 1);
            }
            updateSlider();
        }

        // Event listeners for buttons
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentIndex > 0) {
                stopAutoScroll();
                moveSlide('prev');
                setTimeout(startAutoScroll, 5000);
            }
        });
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const maxIndex = items.length - 3;
            if (currentIndex < maxIndex) {
                stopAutoScroll();
                moveSlide('next');
                setTimeout(startAutoScroll, 5000);
            }
        });

        // Add touch event handling
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoScroll();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    moveSlide('next');
                } else {
                    moveSlide('prev');
                }
            }
            
            setTimeout(startAutoScroll, 5000);
        }, { passive: true });

        // Auto scroll functionality
        function startAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => moveSlide('next'), options.autoScrollInterval || 5000);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Hover events
        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);

        // Initialize auto scroll
        startAutoScroll();

        // Initial update
        updateSlider();

        // Handle window resize
        window.addEventListener('resize', () => {
            updateSlider();
            // Reset auto scroll on resize
            stopAutoScroll();
            startAutoScroll();
        });

        // Return control functions for debugging
        return { moveSlide, updateSlider, startAutoScroll, stopAutoScroll };
    }

    // Initialize all company sliders
    function initializeAllSliders() {
        document.querySelectorAll('.company-slider').forEach((slider, index) => {
            console.log(`Initializing company slider ${index + 1}`);
            try {
                const track = slider.querySelector('.cards-track');
                if (!track) return;

                // Force layout calculation and reset transform
                track.style.transform = 'translate3d(0, 0, 0)';
                track.offsetWidth; // Force reflow
                
                const controls = initializeSlider(slider, {
                    trackClass: '.cards-track',
                    itemClass: '.project-card',
                    gap: 32,
                    visibleItems: 3,
                    autoScrollInterval: 5000
                });
                
                if (!controls) {
                    console.error(`Failed to initialize company slider ${index + 1}`);
                }

                // Initial card sizing
                const cards = track.querySelectorAll('.project-card');
                const containerWidth = track.parentElement.offsetWidth;
                const gap = 32;
                const totalGaps = 2; // 3 cards - 1
                const cardWidth = (containerWidth - (totalGaps * gap)) / 3;
                
                cards.forEach((card, i) => {
                    card.style.width = `${cardWidth}px`;
                    card.style.minWidth = `${cardWidth}px`;
                    card.style.maxWidth = `${cardWidth}px`;
                    if (i < cards.length - 1) {
                        card.style.marginRight = `${gap}px`;
                    }
                });
            } catch (error) {
                console.error(`Error initializing company slider ${index + 1}:`, error);
            }
        });
    }

    // Initialize sliders after DOM content loaded
    initializeAllSliders();

    // Re-initialize on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initializeAllSliders, 250);
    });

    // Render projects from projects.js
    if (window.renderProjects) {
        window.renderProjects();
    }

    // Add window load event to ensure all elements are properly rendered
    window.addEventListener('load', () => {
        // Force layout recalculation for all sliders
        document.querySelectorAll('.company-slider').forEach(slider => {
            const track = slider.querySelector('.cards-track');
            if (track) {
                // Force layout recalculation
                track.style.display = 'none';
                track.offsetHeight;
                track.style.display = 'flex';
                
                // Ensure cards are properly sized
                const cards = track.querySelectorAll('.project-card');
                const containerWidth = track.parentElement.offsetWidth;
                const cardWidth = (containerWidth - (2 * 32)) / 3; // 3 cards with 32px gaps
                cards.forEach(card => {
                    card.style.width = `${cardWidth}px`;
                    card.style.minWidth = `${cardWidth}px`;
                    card.style.maxWidth = `${cardWidth}px`;
                });
            }
        });

        // Trigger resize event to update slider positions
        window.dispatchEvent(new Event('resize'));
    });

    // Back to Top Button functionality
    initializeBackToTop();
    
    // Contact Form functionality
    initializeContactForm();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Initialize dark mode toggle
    initializeDarkMode();
    
    // Initialize intersection observer for animations
    initializeScrollAnimations();
    
    // Initialize scroll progress indicator
    initializeScrollProgress();
});

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        const scrolled = window.pageYOffset;
        const threshold = 300; // Show button after scrolling 300px
        
        if (scrolled > threshold) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Initial check
    toggleBackToTopButton();
}

// Contact Form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formButton = contactForm.querySelector('.btn-primary');
        const originalButtonText = formButton.innerHTML;
        
        // Show loading state
        formButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual form handler)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button
            formButton.innerHTML = originalButtonText;
            formButton.disabled = false;
        }
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

// Input validation
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing error styling
    input.classList.remove('error');
    
    // Validate required fields
    if (input.hasAttribute('required') && !value) {
        showInputError(input, 'This field is required');
        return;
    }
    
    // Validate email
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Please enter a valid email address');
            return;
        }
    }
    
    // Clear any existing errors
    clearInputError(input);
}

function showInputError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    input.classList.remove('error');
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearValidationError(e) {
    const input = e.target;
    if (input.value.trim()) {
        clearInputError(input);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Dark mode functionality
function initializeDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle animation
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    }
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // System theme detection
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Set initial theme based on system preference if no saved preference
        if (!currentTheme) {
            body.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Scroll animations with Intersection Observer
function initializeScrollAnimations() {
    // Check if browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
        return;
    }
    
    // Animation observer options
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
    };
    
    // Create observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Unobserve after animation to improve performance
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('section-animate');
        
        // Add stagger effect for certain sections
        if (section.id === 'skills' || section.id === 'projects') {
            section.classList.add('stagger-children');
        }
        
        // Alternate slide directions for visual interest
        if (index % 2 === 0) {
            section.classList.add('slide-in-left');
        } else {
            section.classList.add('slide-in-right');
        }
        
        sectionObserver.observe(section);
    });
    
    // Animate cards individually
    const cards = document.querySelectorAll('.project-card, .icon, .stat, .education-item');
    cards.forEach((card, index) => {
        card.classList.add('section-animate');
        card.style.transitionDelay = `${index * 0.1}s`;
        sectionObserver.observe(card);
    });
}

// Add CSS animation keyframes programmatically
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
}

// Initialize animation styles
addAnimationStyles();

// Scroll Progress Indicator
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrolled + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
}
