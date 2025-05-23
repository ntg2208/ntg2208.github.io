document.addEventListener('DOMContentLoaded', function() {
    // Create placeholder image
    function createPlaceholderImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#3498db');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px Roboto';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Project Image', canvas.width/2, canvas.height/2);
        
        return canvas.toDataURL('image/png');
    }

    // Set placeholder images
    const placeholderImage = createPlaceholderImage();
    document.querySelectorAll('.project-image img, .card-image img').forEach(img => {
        if (!img.src || img.src === '') {
            img.src = placeholderImage;
        }
    });

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
});
