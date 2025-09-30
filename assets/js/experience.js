// assets/js/experience.js

const experienceData = [
    // Northumbria University
    {
        "Company": "Northumbria University, UK",
        "Position": "Data Scientist",
        "Period": "Jan 2023 - Jun 2023",
        "Projects": [
            {
                "Title": "Data Analysis & Processing",
                "Description": "Extracted and transformed sensory data from medical wearable devices into structured datasets for Parkinson's Disease treatment research."
            },
            {
                "Title": "Statistical Analysis", 
                "Description": "Conducted comprehensive statistical analysis of treatment effectiveness using medical device data to validate therapeutic approaches."
            },
            {
                "Title": "ML Model Development",
                "Description": "Developed machine learning model for personalized treatment recommendations with optimal scheduling based on patient data."
            }
        ]
    },
    // Seedcom
    {
        "Company": "Seedcom - A Venture Capital Company, Vietnam",
        "Position": "Machine Learning Engineer",
        "Period": "Nov. 2020 - Nov. 2024",
        "Projects": [
            {
                "Title": "Recipe-Based Product Recommendation",
                "Description": "Developed a NLP-based system to analyze Vietnamese recipe blogs and automatically curate product bundles, resulting in a 15% increase in bundle purchases. Implemented a real-time recommendation engine using collaborative filtering to suggest complementary products based on shopping baskets and recipe associations, leading to a 25% increase in cross-sales."
            },
            {
                "Title": "Competitive Price Intelligence",
                "Description": "Architected an automated web scraping system using Selenium and BeautifulSoup to monitor competitor pricing. Implemented a BERT-based multimodal model achieving 95% accuracy in mapping competitor products. Developed real-time price monitoring dashboards in Tableau, improving profit margins by 12%."
            },
            {
                "Title": "Product and Combo Pricing",
                "Description": "Conducted statistical analysis to identify top-performing product combinations. Developed dynamic pricing algorithm for product bundles and designed a comprehensive 1-year promotional strategy incorporating special pricing to boost sales and enhance customer engagement."
            },
            {
                "Title": "Sales Forecast and Inventory Management",
                "Description": "Deployed sophisticated forecasting models including DeepAR and LightGBM to predict sales at store and area levels. Enhanced inventory management by implementing an alert system to identify and address overstock and understock situations."
            },
            {
                "Title": "AI Fashion Recommendation",
                "Description": "Led a team of 3 engineers in developing computer vision solution using RetinaNet with 92% precision. Containerized the solution using Docker and deployed via RESTful APIs, resulting in 30% increase in click-through rates and 20% increase in cross-category purchases."
            },
            {
                "Title": "Retail Data Analytics Platform",
                "Description": "Built an in-house data analytics platform using Python and SQL, migrating from Looker Studio to reduce operational costs by $2,000 per month. The platform provides real-time sales insights, customer behavior analysis, and automated reporting for strategic decision-making."
            },
            {
                "Title": "Styling Camera Application",
                "Description": "Developed a real-time camera application that detects user appearance and recommends fashion styles using computer vision. The application integrates with the e-commerce platform to suggest relevant products, enhancing user experience and driving sales."
            }
        ]
    },
    // Vulcan Labs
    {
        "Company": "Vulcan Labs",
        "Position": "Computer Vision Engineer",
        "Period": "Sep. 2018 - Nov. 2020",
        "Projects": [
            {
                "Title": "GAN Research",
                "Description": "Researched and implemented state-of-the-art GAN architectures to enhance image quality and create realistic synthetic datasets for training purposes."
            },
            {
                "Title": "Advanced Image Processing",
                "Description": "Developed sophisticated image processing algorithms for real-time applications, optimizing performance and accuracy for production environments."
            },
            {
                "Title": "Defective Semiconductor Detection",
                "Description": "Created an automated quality control system using deep learning models to detect defective semiconductors with 98% accuracy, reducing manual inspection time by 80%."
            },
            {
                "Title": "Computer Vision Pipeline",
                "Description": "Designed and implemented end-to-end computer vision pipelines for multiple client projects, integrating object detection, segmentation, and classification models."
            },
            {
                "Title": "Auto Inspection System",
                "Description": "Built automated inspection systems for manufacturing quality control, utilizing advanced computer vision techniques to identify defects and anomalies in real-time."
            }
        ]
    },
    // Emage Development
    {
        "Company": "Emage Development",
        "Position": "Software Engineer",
        "Period": "Jun. 2017 - Sep. 2018",
        "Projects": [
            {
                "Title": "EV Interface Development",
                "Description": "Developed user interfaces and control systems for electric vehicle charging stations, focusing on user experience and system reliability."
            },
            {
                "Title": "Advanced C++ Development",
                "Description": "Implemented high-performance C++ applications for embedded systems, optimizing code for resource-constrained environments and real-time operations."
            }
        ]
    }
];

// Map experience project titles to SVG filenames
function getExperienceImageFilename(projectTitle) {
    const filenameMap = {
        "Data Analysis & Processing": "data-analysis-processing.svg",
        "Statistical Analysis": "statistical-analysis.svg",
        "ML Model Development": "ml-model-development.svg",
        "Recipe-Based Product Recommendation": "recipe-based-product-recommendation.svg",
        "Competitive Price Intelligence": "competitive-price-intelligence.svg",
        "Product and Combo Pricing": "product-and-combo-pricing.svg",
        "Sales Forecast and Inventory Management": "sales-forecast-and-inventory-management.svg",
        "AI Fashion Recommendation": "ai-fashion-recommendation.svg",
        "Retail Data Analytics Platform": "retail-data-analytics-platform.svg",
        "Styling Camera Application": "styling-camera-application.svg",
        "GAN Research": "gan-research.svg",
        "Advanced Image Processing": "advanced-image-processing.svg",
        "Defective Semiconductor Detection": "defective-semiconductor-detection.svg",
        "Computer Vision Pipeline": "computer-vision-pipeline.svg",
        "Auto Inspection System": "auto-inspection-system.svg",
        "EV Interface Development": "ev-interface-development.svg",
        "Advanced C++ Development": "advanced-cpp-development.svg"
    };

    return filenameMap[projectTitle] || "placeholder.svg";
}

// Counter for eager loading first few experience images
let experienceCardIndex = 0;

function createExperienceCardHtml(project) {
    const imageFile = getExperienceImageFilename(project.Title);

    // Load first 4 experience images eagerly
    const loadingStrategy = experienceCardIndex < 4 ? 'eager' : 'lazy';
    experienceCardIndex++;

    return `
        <div class="project-card" role="listitem">
            <div class="card-image">
                <img src="assets/images/experience/${imageFile}" alt="${project.Title} visualization" loading="${loadingStrategy}">
            </div>
            <div class="card-content">
                <h4>${project.Title}</h4>
                <p>${project.Description}</p>
            </div>
        </div>
    `;
}

function renderExperience() {
    const experienceSection = document.querySelector('#experience');
    if (!experienceSection) {
        console.error('Experience section not found.');
        return;
    }

    // Clear existing content within the experience section, except the heading
    const experienceContent = experienceSection.querySelector('.experience-content');
    if (experienceContent) {
        experienceContent.innerHTML = '';
    } else {
        // If .experience-content doesn't exist, create it
        const newExperienceContent = document.createElement('div');
        newExperienceContent.classList.add('experience-content');
        experienceSection.appendChild(newExperienceContent);
    }

    const targetContainer = experienceSection.querySelector('.experience-content');

    // Create experience entries for each company
    experienceData.forEach(company => {
        const companySection = document.createElement('div');
        companySection.classList.add('experience-category');
        companySection.innerHTML = `
            <div class="company-header">
                <h3 class="company-position">${company.Position}</h3>
                <h4 class="company-name">${company.Company}</h4>
                <span class="company-period">${company.Period}</span>
            </div>
            <div class="experience-projects-grid">
                ${company.Projects.map(createExperienceCardHtml).join('')}
            </div>
        `;
        targetContainer.appendChild(companySection);
    });
}

// Expose renderExperience and experience data to be called from main.js
window.renderExperience = renderExperience;
window.experienceData = experienceData;