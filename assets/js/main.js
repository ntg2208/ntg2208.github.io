document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Detect WebP support
    detectWebPSupport();
    
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

    // Function to convert project name to filename with manual mapping for existing files
    function getProjectImageFilename(projectName) {
        // Manual mapping for existing files
        const fileMapping = {
            'Shakespeare-Style Text Generation using Hidden Markov Models': 'shakespeare-text-generation',
            'Wind Turbine Yaw System Performance Analysis': 'wind-turbine-yaw-system',
            'NHS Employment Gap Analysis Using Machine Learning': 'nhs-employment-gap-analysis',
            'DocPatientSumm: Low-Rank Adaptation (LoRA) finetune for Clinical Conversations': 'docpatientsumm-lora',
            'Complaint Tweet Classification using Prompt Tuning of Large Language Models (LLMs)': 'complaint-tweet-classification',
            'RAG agent llama3': 'rag-agent-llama3',
            'Building a Q&A System with Retrieval-Augmented Generation (RAG) using LangChain and llama2': 'building-qa-system-rag-langchain-llama2',
            'Malaria Parasite Detection using Deep Learning (TensorFlow v2)': 'malaria-parasite-detection-deep-learning',
            'Hospital readmission prediction': 'hospital-readmission-prediction',
            'Multimodal Conversational AI for E-commerce': 'multimodal-conversational-ai-ecommerce'
        };
        
        // Check if we have a manual mapping
        if (fileMapping[projectName]) {
            return fileMapping[projectName];
        }
        
        // Fallback to automatic conversion
        return projectName.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    }

    // Progressive image loading with WebP support
    function updateProjectThumbnails() {
        document.querySelectorAll('.project-image img, .card-image img').forEach(img => {
            const card = img.closest('.project-card');
            if (card && window.projectsData) {
                const projectName = card.querySelector('h4')?.textContent;
                const project = window.projectsData.find(p => p['Project Name'] === projectName);
                if (project && (!img.src || img.src === '' || img.src.includes('placeholder'))) {
                    const filename = getProjectImageFilename(project['Project Name']);
                    
                    // Try WebP first, then fallback to SVG, then generated thumbnail
                    loadImageWithFallbacks(img, filename, 'projects', project);
                }
            }
        });
    }
    
    // Progressive image loading with multiple format support
    function loadImageWithFallbacks(imgElement, filename, folder, dataObject) {
        const formats = ['webp', 'svg', 'png', 'jpg'];
        let currentFormatIndex = 0;
        
        function tryNextFormat() {
            if (currentFormatIndex >= formats.length) {
                // All formats failed, handle error gracefully
                handleImageError(imgElement, folder, dataObject);
                return;
            }
            
            const format = formats[currentFormatIndex];
            const imagePath = `assets/images/${folder}/${filename}.${format}`;
            
            // Add loading state
            imgElement.classList.add('loading-image');
            
            const testImg = new Image();
            testImg.onload = () => {
                imgElement.src = imagePath;
                imgElement.classList.remove('loading-image', 'error-image');
                imgElement.classList.add('loaded-image');
                
                if (folder === 'projects') {
                    imgElement.alt = `${dataObject['Project Name']} - ${dataObject.Sector}`;
                } else if (folder === 'experience') {
                    imgElement.alt = `${dataObject.Title} icon`;
                }
                
                // Hide error message if it exists
                hideImageError(imgElement);
            };
            testImg.onerror = () => {
                currentFormatIndex++;
                if (currentFormatIndex < formats.length) {
                    tryNextFormat();
                } else {
                    // All formats failed, handle error gracefully
                    handleImageError(imgElement, folder, dataObject);
                }
            };
            testImg.src = imagePath;
        }
        
        tryNextFormat();
    }
    
    // Update thumbnails initially and when theme changes
    // Delay initial update to allow DOM to load
    setTimeout(updateProjectThumbnails, 100);
    
    // Theme toggle will be handled in initializeDarkMode function
    
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
    
    // Function to convert experience title to filename with manual mapping for existing files
    function getExperienceImageFilename(title) {
        // Manual mapping for existing files
        const experienceMapping = {
            'Data Analysis & Processing': 'data-analysis-processing',
            'Statistical Analysis': 'statistical-analysis',
            'ML Model Development': 'ml-model-development',
            'Recipe-Based Product Recommendation': 'recipe-based-product-recommendation',
            'Competitive Price Intelligence': 'competitive-price-intelligence',
            'Product and Combo Pricing': 'product-and-combo-pricing',
            'Sales Forecast and Inventory Management': 'sales-forecast-and-inventory-management',
            'AI Fashion Recommendation': 'ai-fashion-recommendation',
            'Retail Data Analytics Platform': 'retail-data-analytics-platform',
            'Styling Camera Application': 'styling-camera-application',
            'GAN Research': 'gan-research',
            'Advanced Image Processing': 'advanced-image-processing',
            'Defective Semiconductor Detection': 'defective-semiconductor-detection',
            'Computer Vision Pipeline': 'computer-vision-pipeline',
            'Auto Inspection System': 'auto-inspection-system',
            'EV Interface Development': 'ev-interface-development',
            'Advanced C++ Development': 'advanced-cpp-development'
        };
        
        // Check if we have a manual mapping
        if (experienceMapping[title]) {
            return experienceMapping[title];
        }
        
        // Fallback to automatic conversion
        return title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    }

    function updateExperienceIcons() {
        document.querySelectorAll('.experience-category .project-card').forEach(card => {
            const img = card.querySelector('.card-image img');
            const title = card.querySelector('h4')?.textContent || '';
            const description = card.querySelector('p')?.textContent || '';
            
            if (img && (img.src.includes('placeholder') || img.src.includes('data:image/svg'))) {
                const filename = getExperienceImageFilename(title);
                const experienceData = { Title: title, Description: description };
                
                // Use progressive loading with WebP support
                loadImageWithFallbacks(img, filename, 'experience', experienceData);
            }
        });
    }
    
    // Update experience icons initially
    updateExperienceIcons();

    // Slider functionality removed - now using static grids for better UX

    // Note: Slider functionality removed - now using static grids

    // Render projects from projects.js
    if (window.renderProjects) {
        window.renderProjects();
        // Update thumbnails after projects are rendered
        setTimeout(updateProjectThumbnails, 200);
        
        // Initialize project search after rendering
        if (window.initializeProjectSearch) {
            setTimeout(() => {
                window.initializeProjectSearch();
            }, 300);
        }
    }

    // Render experience from experience.js
    if (window.renderExperience) {
        window.renderExperience();
        // Update experience icons after experience is rendered
        setTimeout(updateExperienceIcons, 200);
    }

    // Add window load event to ensure all elements are properly rendered
    window.addEventListener('load', () => {
        // Update thumbnails after everything is loaded
        updateProjectThumbnails();
        updateExperienceIcons();
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
    
    // Initialize mobile navigation
    initializeMobileNavigation();
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
        const formButton = contactForm.querySelector('.btn-primary');
        const originalButtonText = formButton.innerHTML;
        
        // Show loading state
        formButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formButton.disabled = true;
        
        // Check if Netlify is available (when deployed)
        const isNetlifyDeployment = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        
        if (isNetlifyDeployment) {
            // Let Netlify handle the form submission
            return; // Don't prevent default, let it submit naturally
        } else {
            // Local development - prevent default and show demo message
            e.preventDefault();
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Demo mode: Message would be sent successfully! (This form will work when deployed to Netlify)', 'success');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Sorry, there was an error. In production, this form will work with Netlify Forms.', 'error');
            } finally {
                // Reset button
                formButton.innerHTML = originalButtonText;
                formButton.disabled = false;
            }
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
    } else {
        // Set default light theme if no saved preference
        body.setAttribute('data-theme', 'light');
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
        
        // Update thumbnails after theme change
        setTimeout(() => {
            updateProjectThumbnails();
            updateExperienceIcons();
        }, 100);
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

// Mobile Navigation
function initializeMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            navMenu.classList.add('active');
            mobileMenuToggle.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// WebP Support Detection
function detectWebPSupport() {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
        if (webP.height === 2) {
            document.documentElement.classList.add('webp');
        } else {
            document.documentElement.classList.add('no-webp');
        }
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

// Image Error Handling
function handleImageError(imgElement, folder, dataObject) {
    imgElement.classList.remove('loading-image');
    imgElement.classList.add('error-image');
    
    // Try to generate fallback image
    try {
        if (folder === 'projects') {
            imgElement.src = createProjectThumbnail(dataObject);
            imgElement.alt = `${dataObject['Project Name']} - ${dataObject.Sector}`;
        } else if (folder === 'experience') {
            imgElement.src = createExperienceIcon(dataObject.Title, dataObject.Description);
            imgElement.alt = `${dataObject.Title} icon`;
        }
        imgElement.classList.remove('error-image');
        imgElement.classList.add('loaded-image');
    } catch (error) {
        // If even fallback generation fails, show error message
        console.warn('Failed to load or generate image:', error);
        showImageError(imgElement, folder, dataObject);
    }
}

function showImageError(imgElement, folder, dataObject) {
    const card = imgElement.closest('.project-card, .skeleton-experience-item');
    if (!card) return;
    
    // Create error overlay
    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'image-error-overlay';
    errorOverlay.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Image not available</span>
            <button class="retry-btn" onclick="retryImageLoad(this)" data-folder="${folder}" data-name="${dataObject['Project Name'] || dataObject.Title}">
                <i class="fas fa-redo"></i> Retry
            </button>
        </div>
    `;
    
    // Position overlay over image
    const imageContainer = imgElement.parentElement;
    if (imageContainer && !imageContainer.querySelector('.image-error-overlay')) {
        imageContainer.style.position = 'relative';
        imageContainer.appendChild(errorOverlay);
    }
    
    // Hide the broken image
    imgElement.style.opacity = '0.1';
}

function hideImageError(imgElement) {
    const card = imgElement.closest('.project-card, .skeleton-experience-item');
    if (!card) return;
    
    const errorOverlay = card.querySelector('.image-error-overlay');
    if (errorOverlay) {
        errorOverlay.remove();
    }
    
    imgElement.style.opacity = '';
}

// Retry image loading
window.retryImageLoad = function(button) {
    const folder = button.getAttribute('data-folder');
    const name = button.getAttribute('data-name');
    const card = button.closest('.project-card, .skeleton-experience-item');
    
    if (!card) return;
    
    const img = card.querySelector('img');
    const errorOverlay = card.querySelector('.image-error-overlay');
    
    if (errorOverlay) {
        errorOverlay.remove();
    }
    
    img.style.opacity = '';
    
    // Find the data object and retry loading
    let dataObject;
    if (folder === 'projects' && window.projectsData) {
        dataObject = window.projectsData.find(p => p['Project Name'] === name);
    } else if (folder === 'experience') {
        dataObject = { Title: name, Description: '' };
    }
    
    if (dataObject) {
        const filename = folder === 'projects' ? 
            getProjectImageFilename(dataObject['Project Name']) : 
            getExperienceImageFilename(dataObject.Title);
        loadImageWithFallbacks(img, filename, folder, dataObject);
    }
};
