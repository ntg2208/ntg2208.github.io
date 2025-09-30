// Aggressive image preloader - loads critical images immediately
(function() {
    'use strict';
    
    // Preload critical project images
    const criticalImages = [
        'assets/images/projects/shakespeare-text-generation.svg',
        'assets/images/projects/wind-turbine-yaw-system.svg',
        'assets/images/projects/nhs-employment-gap-analysis.svg',
        'assets/images/projects/docpatientsumm-lora.svg',
        'assets/images/experience/data-analysis-processing.svg',
        'assets/images/experience/statistical-analysis.svg',
        'assets/images/experience/ml-model-development.svg'
    ];
    
    // Create link elements for preloading
    criticalImages.forEach(function(src) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Force image loading on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceLoadImages);
    } else {
        forceLoadImages();
    }
    
    function forceLoadImages() {
        setTimeout(function() {
            // Find all project and experience images
            const images = document.querySelectorAll('.card-image img, .project-image img');
            images.forEach(function(img) {
                if (img.src.includes('placeholder') || !img.src || img.src === '') {
                    // Force reload from data attribute if available
                    const card = img.closest('.project-card');
                    if (card) {
                        const title = card.querySelector('h4');
                        if (title) {
                            img.loading = 'eager'; // Load immediately
                        }
                    }
                }
            });
        }, 50);
    }
})();
