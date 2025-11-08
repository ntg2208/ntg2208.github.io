// assets/js/experience.js

const experienceData = [
    {
        "Company": "twentytwotensors, UK",
        "Position": "Machine Learning Engineer",
        "Period": "Dec 2024 - Present",
        "Projects": [
            {
                "Title": "Production AI Multi-Agent Systems",
                "Description": "Architected and deployed a production-grade multi-agent AI customer support system using Google Gemini, orchestrating a Master Agent with specialized Policy Agent (RAG) and Ticket Agent (database operations), reducing operational costs by 60% while enabling 24/7 service availability."
            },
            {
                "Title": "RAG + Database Hybrid Architecture",
                "Description": "Engineered a sophisticated RAG + Database hybrid architecture with location intelligence, achieving 100% routing accuracy across 15+ comprehensive test scenarios with sub-2-second response times."
            }
        ]
    },
    {
        "Company": "Seedcom R&D, Vietnam (Remote)",
        "Position": "AI Engineer",
        "Period": "Nov 2020 - Oct 2024",
        "Projects": [
            {
                "Title": "LLM & RAG Systems",
                "Description": "Built a Vietnamese recipe recommendation chatbot using Retrieval-Augmented Generation (RAG) with Google Gemini, leveraging customer basket history to deliver personalized culinary suggestions and enhance user engagement. Developed and fine-tuned a personalized notification system using LoRA on Llama 3, enhancing app re-engagement rates and significantly improving user retention metrics."
            },
            {
                "Title": "MLOps & Infrastructure",
                "Description": "Designed and automated end-to-end ML pipelines on Google Vertex AI for competitor price mapping and product recommendations, utilizing CI/CD best practices (GitLab CI, Airflow) for robust, automated deployment. Implemented comprehensive monitoring and automated deployment pipelines ensuring resilience and scalability."
            },
            {
                "Title": "Computer Vision - Fashion Recommendation System",
                "Description": "Led a cross-functional team of 3 engineers to research, develop, and deploy a production computer vision solution for fashion retail. Built a fashion item detection and localization system using RetinaNet and OpenCV, achieving 92% average precision in identifying customer outfits. Developed an outfit recommendation engine to improve customer shopping experiences, targeting increases in customer click-rate, cross-sell opportunities, and total selling revenue."
            },
            {
                "Title": "Pricing Intelligence & Competitive Analysis",
                "Description": "Developed an automated web scraping system with multimodal AI to map competitor products to the internal catalog for comprehensive price tracking. Built a real-time price tracking pipeline integrating with analytics dashboards, enabling data-driven pricing strategies and competitive analysis. Created a dynamic pricing algorithm for product bundles using statistical analysis of purchase patterns, optimizing profit margins while maintaining competitiveness."
            },
            {
                "Title": "Demand Forecasting & Inventory Optimization",
                "Description": "Deployed advanced forecasting models (DeepAR, LightGBM) for time-series sales prediction at store and regional levels with high accuracy. Implemented an intelligent alert system for inventory management to identify and address overstock and understock situations, optimizing stock levels and reducing carrying costs."
            },
            {
                "Title": "Data Analytics Platform",
                "Description": "Collaborated within an agile team of 7 members to build a comprehensive retail analytics and marketing platform for Vietnam's largest supermarket chain. Created interactive dashboards analyzing customer behavior, product trends, and clustering patterns using BigQuery and GCP. Optimized query performance for analytic dashboards, enabling real-time insights for business stakeholders."
            }
        ]
    },
    {
        "Company": "Northumbria University, UK",
        "Position": "Data Scientist",
        "Period": "Jan 2023 - Jul 2023",
        "Projects": [
            {
                "Title": "Researching Solutions for Parkinson's Disease Treatment",
                "Description": "Conducted statistical analysis and built predictive ML models (Random Forests, Logistic Regression) to evaluate the effectiveness of wearable/smartphone cues for drooling treatment in Parkinson's patients. Developed a personalized treatment schedule prediction system on AWS SageMaker, achieving 65% F1-score accuracy in predicting optimal cue timing through rigorous hyperparameter tuning and model selection."
            }
        ]
    },
    {
        "Company": "Vulcan Labs, Vietnam",
        "Position": "Machine Learning Engineer",
        "Period": "Jul 2020 - Nov 2020",
        "Projects": [
            {
                "Title": "Computer Vision for Mobile Applications",
                "Description": "Researched and implemented Generative Adversarial Networks (GANs) including StyleGAN, StyleGAN2, and U²-Net for image enhancement and salient object detection applications. Deployed Deep Learning and Computer Vision solutions to AWS EC2 using Docker containerization, ensuring scalable production infrastructure."
            }
        ]
    },
    {
        "Company": "Emage Development Pte. Ltd., Singapore",
        "Position": "Machine Learning Engineer",
        "Period": "Jul 2019 - Jul 2020",
        "Projects": [
            {
                "Title": "Defective Semiconductor Detection",
                "Description": "Collaborated with a team of 2 engineers to build a production-ready defect detection system. Built a high-precision defect detection system using YOLOv3 and RetinaNet, achieving 98% precision in identifying semiconductor defects. Engineered a computer vision pipeline combining OpenCV, Hough Transform, Canny edge detection, and ResNet for robust feature extraction. Deployed a containerized ML model to the factory floor with a 0.2-second inspection time per image, enabling real-time quality control."
            }
        ]
    },
    {
        "Company": "Robert Bosch Engineering, Vietnam",
        "Position": "Embedded Software Engineer Intern",
        "Period": "May 2019 - Nov 2019",
        "Projects": [
            {
                "Title": "Renault & Nissan Interior Application for Electrical Vehicles",
                "Description": "Trained in advanced C/C++ programming including parallel programming and application design patterns. Developed debugging tools for automotive user interface applications, supporting R&D team efficiency."
            }
        ]
    }
];

// Map experience project titles to SVG filenames
function getExperienceImageFilename(projectTitle) {
    const filenameMap = {
        "Production AI Multi-Agent Systems": "advanced-cpp-development",
        "RAG + Database Hybrid Architecture": "advanced-cpp-development",
        "LLM & RAG Systems": "recipe-based-product-recommendation",
        "MLOps & Infrastructure": "computer-vision-pipeline",
        "Computer Vision - Fashion Recommendation System": "ai-fashion-recommendation",
        "Pricing Intelligence & Competitive Analysis": "competitive-price-intelligence",
        "Demand Forecasting & Inventory Optimization": "sales-forecast-and-inventory-management",
        "Data Analytics Platform": "retail-data-analytics-platform",
        "Researching Solutions for Parkinson's Disease Treatment": "ml-model-development",
        "Computer Vision for Mobile Applications": "gan-research",
        "Defective Semiconductor Detection": "defective-semiconductor-detection",
        "Renault & Nissan Interior Application for Electrical Vehicles": "ev-interface-development"
    };

    return filenameMap[projectTitle] || "placeholder";
}

// Counter for eager loading first few experience images
let experienceCardIndex = 0;

function createExperienceCardHtml(project) {
    // Load first 4 experience images eagerly
    const loadingStrategy = experienceCardIndex < 4 ? 'eager' : 'lazy';
    experienceCardIndex++;

    return `
        <div class="project-card" role="listitem">
            <div class="card-image">
                <img src="assets/img/projects/placeholder.svg" alt="${project.Title} visualization" loading="${loadingStrategy}">
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