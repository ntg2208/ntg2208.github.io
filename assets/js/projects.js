// assets/js/projects.js

// Store original projects data and filtered data
let originalProjectsData = [];
let filteredProjectsData = [];

const projectsData = [
    {
        "Project Name": "Efficient Clinical Notes Summarization with LoRA Fine-tuning",
        "Sector": "Natural Language Processing",
        "Description": "Engineered an efficient LLM fine-tuning pipeline using LoRA on a 4-bit quantized Mistral 7B model, improving clinical note summarization accuracy threefold. Processed and curated the ‘Asclepius-Synthetic-Clinical-Notes’ dataset, improving ROUGE-1 score from 0.381 to 0.423.",
        "URL": "https://colab.research.google.com/drive/1Q3IVwDquecpz_zfnjNq4TKudIzVQdnOk?usp=sharing",
        "Keywords": "Python, PyTorch, Hugging Face Transformers, Unsloth, ROUGE, Pandas",
        "Year": "2024"
    },
    {
        "Project Name": "Agentic RAG System with Llama3 & LangGraph",
        "Sector": "Natural Language Processing",
        "Description": "Architected a sophisticated Retrieval-Augmented Generation (RAG) agent using Llama3 and LangGraph, implementing intelligent routing logic for accurate document retrieval. Integrated a fallback web search mechanism for out-of-domain queries and implemented self-correction and hallucination detection features.",
        "URL": "https://colab.research.google.com/drive/1Pe1wPAGh4Z2b6c8QUhny0KWQyC70vK9r?usp=sharing",
        "Keywords": "Llama3, LangGraph, LangChain, Vector Databases, Python",
        "Year": "2024"
    },
    {
        "Project Name": "DocPatientSumm: Clinical Conversation Summarization with LoRA",
        "Sector": "Natural Language Processing",
        "Description": "Fine-tuned large language models for doctor-patient conversation summarization, achieving a threefold improvement in accuracy through parameter-efficient LoRA techniques. Configured distributed training infrastructure with model parallelism across multi-GPU setups.",
        "URL": "https://www.kaggle.com/code/p1ayer0ne/gemma-doctor-patient-dialog",
        "Keywords": "LoRA, Gemma, Multi-GPU Training, Model Parallelism, PyTorch",
        "Year": "2024"
    },
    {
        "Project Name": "Building Q&A System with RAG using LangChain & Llama2",
        "Sector": "Natural Language Processing",
        "Description": "Developed a production-grade Retrieval-Augmented Generation system using LangChain and Llama2 on AWS infrastructure (SageMaker, Jumpstart). Engineered a comprehensive data preprocessing pipeline for Amazon's Letters to Shareholders, creating a structured knowledge base for retrieval.",
        "URL": "https://colab.research.google.com/drive/1ct4A3H97BaJoqeyv6MjSXkHS_-4uJCFf?usp=sharing",
        "Keywords": "LangChain, Llama2, AWS SageMaker, AWS Jumpstart, Vector Databases",
        "Year": "2023"
    },
    {
        "Project Name": "Complaint Tweet Classification with Prompt Tuning",
        "Sector": "Natural Language Processing",
        "Description": "Investigated prompt engineering techniques for fine-tuning the BLOOM LLM on a complaint tweet classification task. Designed and optimized prompt templates to guide model behavior for sentiment analysis and complaint categorization.",
        "URL": "https://www.kaggle.com/code/p1ayer0ne/prompttuning-bloom?scriptVersionId=165711500",
        "Keywords": "BLOOM, Prompt Engineering, NLP, Python, Transformers",
        "Year": "2024"
    },
    {
        "Project Name": "Shakespeare-Style Text Generation with Hidden Markov Models",
        "Sector": "Natural Language Processing",
        "Description": "Developed a sophisticated text generation engine using Hidden Markov Models and advanced NLP techniques, successfully replicating Shakespearean writing style. Achieved 98.13% unique vocabulary generation while maintaining authentic Shakespearean stylistic patterns.",
        "URL": "https://github.com/ntg2208/HMM_Text_Gen",
        "Keywords": "Python, NLTK, SpaCy, Hidden Markov Models, Matplotlib, Seaborn",
        "Year": "2024"
    },
    {
        "Project Name": "CIBMTR - Equity in Post-HCT Survival Predictions",
        "Sector": "Healthcare",
        "Description": "Developed a Cox Proportional Hazards survival model achieving a C-index of 0.6688 on a dataset of 28,800 transplant patients with 103 clinical features. Successfully stratified patients into 4 distinct risk groups with a 4.59x hazard ratio between the highest and lowest risk categories.",
        "URL": "https://www.kaggle.com/competitions/equity-post-HCT-survival-predictions",
        "Keywords": "Python, lifelines (Cox PH), scikit-learn, pandas, PCA, Statistical Analysis, Survival Modeling",
        "Year": "2025"
    },
    {
        "Project Name": "NHS Employment Gap Analysis Using Machine Learning",
        "Sector": "Healthcare",
        "Description": "Engineered an end-to-end machine learning pipeline to investigate employment gaps between the general population and people with long-term conditions in the NHS. Developed a Random Forest classifier achieving 94.6% accuracy in predicting high employment gaps.",
        "URL": "https://github.com/ntg2208/employment-gap-analysis",
        "Keywords": "Python, scikit-learn, pandas, matplotlib, seaborn, Random Forest, K-Means",
        "Year": "2025"
    },
    {
        "Project Name": "Wind Turbine Yaw System Performance Analysis",
        "Sector": "Renewable Energy",
        "Description": "Conducted a comprehensive analysis of wind turbine yaw system performance using real-world SCADA data from the Kelmarsh wind farm spanning a 1-year operational period. Delivered optimization recommendations for yaw control, particularly at wind speeds above 9 m/s where power losses were most significant.",
        "URL": "https://github.com/ntg2208/YAW_System_Analysis",
        "Keywords": "Python, Pandas, Matplotlib, Seaborn, Circular Statistics, Time-Series Analysis",
        "Year": "2024"
    },
    {
        "Project Name": "M1 Motorway Traffic Analysis",
        "Sector": "Transportation",
        "Description": "Architected an automated web scraping system to collect speed data across 48 junctions on the M1 motorway every 6 hours, building a comprehensive 3-month traffic database. Performed comparative statistical analysis of northbound vs southbound traffic patterns.",
        "URL": "https://github.com/ntg2208/M1-Traffic-Analysis-R",
        "Keywords": "R, ggplot2, Web Scraping, Statistical Analysis, Hypothesis Testing",
        "Year": "2022"
    },
    {
        "Project Name": "Hospital Readmission Prediction System",
        "Sector": "Healthcare",
        "Description": "Built a predictive machine learning system analyzing patient medical histories and admission patterns to forecast hospital readmission risk. Conducted comprehensive exploratory data analysis (EDA) to identify key risk factors and admission trends.",
        "URL": "https://www.kaggle.com/code/p1ayer0ne/hospital-readmissions-eda-and-model",
        "Keywords": "Python, scikit-learn, pandas, Feature Engineering, Classification Models",
        "Year": "2023"
    },
    {
        "Project Name": "Edible Mushroom Classification System",
        "Sector": "Data Analysis",
        "Description": "Developed a comprehensive analysis and classification system for distinguishing edible from poisonous mushrooms, addressing a critical public health safety concern. Built an ensemble of ML models achieving 99% precision in edible mushroom classification.",
        "URL": "https://github.com/ntg2208/Edible-Mushroom-Analysis",
        "Keywords": "R, ggplot2, Random Forest, XGBoost, SVM, Decision Trees",
        "Year": "2022"
    },
    {
        "Project Name": "Malaria Parasite Detection using Deep Learning",
        "Sector": "Healthcare",
        "Description": "Designed and deployed a CNN-based deep learning model for automated malaria parasite detection in blood cell microscopy images using TensorFlow v2. Achieved 97% precision for parasitized cell identification, demonstrating high accuracy for automated malaria screening.",
        "URL": "https://github.com/ntg2208/malaria_detection_CNN",
        "Keywords": "TensorFlow v2, CNNs, Image Processing, Data Augmentation, Medical Imaging",
        "Year": "2023"
    },
    {
        "Project Name": "Customer Sentiment Analysis with Facial Recognition",
        "Sector": "Computer Vision",
        "Description": "Built a real-time human emotion classifier detecting 7 emotional states: Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral. Integrated a face detection and emotion recognition pipeline for automated customer satisfaction evaluation in retail environments.",
        "URL": "",
        "Keywords": "TensorFlow, Computer Vision, Docker, Face Detection, CNN, Cloud Deployment",
        "Year": "2019"
    },
    {
        "Project Name": "Combating Exam Impersonation in Universities",
        "Sector": "Computer Vision",
        "Description": "Developed a real-time face recognition system to prevent exam impersonation in university settings, combining supervised and unsupervised learning approaches. Implemented unsupervised clustering algorithms for anomaly detection, automatically flagging potential impersonation attempts.",
        "URL": "https://github.com/ntg2208/matlab-anti-impersonator",
        "Keywords": "MATLAB, Face Recognition, Supervised Learning, Unsupervised Learning, Real-time Processing",
        "Year": "2018"
    },
    {
        "Project Name": "LUNA 16: Lung Nodule Analysis",
        "Sector": "Healthcare",
        "Description": "Processed and analyzed the LUNA 16 (LUng Nodule Analysis) dataset for lung disease detection research. Developed a pipeline for loading and extracting MRI scans, converting 3D volumes to 2D slice sequences for analysis.",
        "URL": "",
        "Keywords": "Python, Medical Imaging, 3D Image Processing, Visualization",
        "Year": "2020"
    },
    {
        "Project Name": "JPEG Image Compression Algorithm",
        "Sector": "Image Processing",
        "Description": "Implemented a complete JPEG compression and decompression pipeline from scratch in pure Python, demonstrating a deep understanding of image processing fundamentals. Applied Discrete Cosine Transform (DCT) for image quantization and Inverse DCT for reconstruction.",
        "URL": "https://github.com/ntg2208/JPEG-Image-compression-python-example",
        "Keywords": "Python, Signal Processing, DCT, Image Compression, NumPy",
        "Year": "2018"
    }
];

const projectCategoryMap = {
    "Natural Language Processing": { name: "AI & Machine Learning", icon: "fas fa-robot" },
    "Customer Service": { name: "AI & Machine Learning", icon: "fas fa-robot" },
    "Healthcare": { name: "Healthcare Solutions", icon: "fas fa-heartbeat" },
    "Image Processing": { name: "Computer Vision", icon: "fas fa-eye" },
    "Computer Vision": { name: "Computer Vision", icon: "fas fa-eye" },
    "Education": { name: "Computer Vision", icon: "fas fa-eye" },
    "Renewable Energy": { name: "Data Science & Analytics", icon: "fas fa-chart-line" },
    "Transportation": { name: "Data Science & Analytics", icon: "fas fa-chart-line" },
    "Data Analysis": { name: "Data Science & Analytics", icon: "fas fa-chart-line" }
};

function getProjectCategory(sector) {
    return projectCategoryMap[sector] || { name: "Other Projects", icon: "fas fa-code" };
}

// Create filename-friendly slug from project name
function getProjectImageFilename(projectName) {
    const filenameMap = {
        "Efficient Clinical Notes Summarization with LoRA Fine-tuning": "docpatientsumm-lora",
        "Agentic RAG System with Llama3 & LangGraph": "rag-agent-llama3",
        "DocPatientSumm: Clinical Conversation Summarization with LoRA": "docpatientsumm-lora",
        "Building Q&A System with RAG using LangChain & Llama2": "building-qa-system-rag-langchain-llama2",
        "Complaint Tweet Classification with Prompt Tuning": "complaint-tweet-classification",
        "Shakespeare-Style Text Generation with Hidden Markov Models": "shakespeare-text-generation",
        "CIBMTR - Equity in Post-HCT Survival Predictions": "cibmtr-equity-post-hct-survival-predictions",
        "NHS Employment Gap Analysis Using Machine Learning": "nhs-employment-gap-analysis",
        "Wind Turbine Yaw System Performance Analysis": "wind-turbine-yaw-system",
        "M1 Motorway Traffic Analysis": "m1-traffic-analysis",
        "Hospital Readmission Prediction System": "hospital-readmission-prediction",
        "Edible Mushroom Classification System": "edible-mushroom-analysis",
        "Malaria Parasite Detection using Deep Learning": "malaria-parasite-detection-deep-learning",
        "Customer Sentiment Analysis with Facial Recognition": "customer-sentiment-analysis",
        "Combating Exam Impersonation in Universities": "combating-exam-impersonation-universities",
        "LUNA 16: Lung Nodule Analysis": "lung-nodule-analysis-luna16",
        "JPEG Image Compression Algorithm": "jpeg-image-compression-python"
    };

    return filenameMap[projectName] || "placeholder";
}

// Counter for eager loading first few images
let projectCardIndex = 0;

function createProjectCardHtml(project) {
    const urlHtml = project.URL ? `<a href="${project.URL}" target="_blank" rel="noopener noreferrer">${project.URL.includes('github.com') ? 'GitHub' : (project.URL.includes('kaggle.com') ? 'Kaggle Notebook' : (project.URL.includes('colab.research.google.com') ? 'Google Colab' : 'Project Link'))}</a>` : '';
    const keywordsHtml = project.Keywords ? `<div class="project-keywords">${project.Keywords.split(',').map(k => `<span>${k.trim()}</span>`).join('')}</div>` : '';
    const year = project.Year || 'N/A';

    // Load first 6 images eagerly for better perceived performance
    const loadingStrategy = projectCardIndex < 6 ? 'eager' : 'lazy';
    projectCardIndex++;

    return `
        <div class="project-card" role="listitem">
            <div class="card-image">
                <img src="assets/img/projects/placeholder.svg" alt="${project['Project Name']} visualization" loading="${loadingStrategy}">
            </div>
            <div class="card-content">
                <h4>${project['Project Name']}</h4>
                ${urlHtml}
                <span>${year}</span>
                <p>${project.Description}</p>
                ${keywordsHtml}
            </div>
        </div>
    `;
}

function renderProjects() {
    const projectsSection = document.querySelector('#projects');
    if (!projectsSection) {
        console.error('Projects section not found.');
        return;
    }

    // Clear existing content within the projects section, except the heading
    const projectsContent = projectsSection.querySelector('.projects-content');
    if (projectsContent) {
        projectsContent.innerHTML = '';
    } else {
        // If .projects-content doesn't exist, create it
        const newProjectsContent = document.createElement('div');
        newProjectsContent.classList.add('projects-content');
        projectsSection.appendChild(newProjectsContent);
    }

    const targetContainer = projectsSection.querySelector('.projects-content');

    // Group projects by category
    const categorizedProjects = {};
    projectsData.forEach(project => {
        const category = getProjectCategory(project.Sector);
        if (!categorizedProjects[category.name]) {
            categorizedProjects[category.name] = {
                icon: category.icon,
                projects: []
            };
        }
        categorizedProjects[category.name].projects.push(project);
    });

    // Render each category
    for (const categoryName in categorizedProjects) {
        const categoryData = categorizedProjects[categoryName];
        const categorySection = document.createElement('div');
        categorySection.classList.add('project-category');
        categorySection.innerHTML = `
            <h3 class="category-heading"><i class="${categoryData.icon}"></i> ${categoryName}</h3>
            <div class="category-projects-grid">
                ${categoryData.projects.map(createProjectCardHtml).join('')}
            </div>
        `;
        targetContainer.appendChild(categorySection);
    }
}

// Project Search and Filter Functionality
function initializeProjectSearch() {
    originalProjectsData = [...projectsData];
    filteredProjectsData = [...projectsData];
    
    const searchInput = document.getElementById('projectSearch');
    const sectorFilter = document.getElementById('sectorFilter');
    const projectCount = document.getElementById('projectCount');
    
    // Update project count
    function updateProjectCount() {
        const count = filteredProjectsData.length;
        projectCount.textContent = `${count} project${count === 1 ? '' : 's'} found`;
    }
    
    // Apply filters and search
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedSector = sectorFilter.value;
        
        filteredProjectsData = originalProjectsData.filter(project => {
            // Search filter
            const matchesSearch = !searchTerm || 
                project['Project Name'].toLowerCase().includes(searchTerm) ||
                project.Description.toLowerCase().includes(searchTerm) ||
                project.Keywords.toLowerCase().includes(searchTerm) ||
                project.Sector.toLowerCase().includes(searchTerm);
            
            // Sector filter
            const matchesSector = !selectedSector || project.Sector === selectedSector;
            
            return matchesSearch && matchesSector;
        });
        
        updateProjectCount();
        renderFilteredProjects();
    }
    
    // Render filtered projects
    function renderFilteredProjects() {
        const projectsContent = document.querySelector('.projects-content');
        
        if (filteredProjectsData.length === 0) {
            showNoResults(projectsContent);
        } else {
            // Use the same rendering logic but with filtered data
            const tempData = projectsData;
            window.projectsData = filteredProjectsData;
            renderProjects();
            window.projectsData = tempData; // Restore original data
        }
    }
    
    // Show no results message
    function showNoResults(container) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No projects found</h3>
                <p>Try adjusting your search terms or filters</p>
                <button class="clear-filters-btn" onclick="clearAllFilters()">
                    <i class="fas fa-times"></i> Clear Filters
                </button>
            </div>
        `;
    }
    
    // Clear all filters
    window.clearAllFilters = function() {
        searchInput.value = '';
        sectorFilter.value = '';
        applyFilters();
    };
    
    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
    
    if (sectorFilter) {
        sectorFilter.addEventListener('change', applyFilters);
    }
    
    // Initial update
    updateProjectCount();
}

// Debounce function for search input
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

// Expose functions and data
window.renderProjects = renderProjects;
window.projectsData = projectsData;
window.initializeProjectSearch = initializeProjectSearch;
