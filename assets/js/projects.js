// assets/js/projects.js

// Store original projects data and filtered data
let originalProjectsData = [];
let filteredProjectsData = [];

const projectsData = [
    {
        "Project Name": "Shakespeare-Style Text Generation using Hidden Markov Models",
        "Sector": "Natural Language Processing",
        "Description": "Developed a text generation system using Hidden Markov Models and Natural Language Processing techniques to generate Shakespeare-style text.",
        "URL": "https://github.com/ntg2208/HMM_Text_Gen",
        "Keywords": "Hidden Markov Models, Natural Language Processing, text generation, NLTK, SpaCy, matplotlib, seaborn",
        "Year": "2020"
    },
    {
        "Project Name": "Wind Turbine Yaw System Performance Analysis",
        "Sector": "Renewable Energy",
        "Description": "Conducted comprehensive analysis of wind turbine yaw system performance using real-world SCADA data.",
        "URL": "https://github.com/ntg2208/YAW_System_Analysis",
        "Keywords": "wind turbine, yaw system, SCADA data, Python, Pandas, circular statistics, correlation analysis, Matplotlib, Seaborn",
        "Year": "2021"
    },
    {
        "Project Name": "NHS Employment Gap Analysis Using Machine Learning",
        "Sector": "Healthcare",
        "Description": "Developed a machine learning analysis system to investigate employment gaps in the NHS.",
        "URL": "https://github.com/ntg2208/employment-gap-analysis",
        "Keywords": "machine learning, employment gaps, NHS, Python, scikit-learn, pandas, Random Forest, K-Means clustering, data visualization",
        "Year": "2022"
    },
    {
        "Project Name": "DocPatientSumm: Low-Rank Adaptation (LoRA) finetune for Clinical Conversations",
        "Sector": "Natural Language Processing",
        "Description": "Fine-tuned LLMs to enhance summarization of doctor-patient conversations, improving accuracy threefold.",
        "URL": "https://www.kaggle.com/code/p1ayer0ne/gemma-doctor-patient-dialog",
        "Keywords": "LLMs, summarization, doctor-patient conversations, low-rank adaptation, model efficiency, multi-GPU training, model parallelism",
        "Year": "2024"
    },
    {
        "Project Name": "Complaint Tweet Classification using Prompt Tuning of Large Language Models (LLMs)",
        "Sector": "Natural Language Processing",
        "Description": "Investigated prompt tuning to fine-tune a Large Language Model (LLM) for classifying complaint tweets.",
        "URL": "https://www.kaggle.com/code/p1ayer0ne/prompttuning-bloom?scriptVersionId=165711500",
        "Keywords": "prompt tuning, Large Language Model (LLM), BLOOM model, complaint tweets, sentiment analysis",
        "Year": "2024"
    },
    {
        "Project Name": "RAG agent llama3",
        "Sector": "Natural Language Processing",
        "Description": "Developed a retrieval-augmented generation system using Llama3 and LangGraph to improve automated question-answering capabilities.",
        "URL": "https://colab.research.google.com/drive/1Pe1wPAGh4Z2b6c8QUhny0KWQyC70vK9r?usp=sharing",
        "Keywords": "retrieval-augmented generation, Llama3, LangGraph, question-answering, routing function, web searches, self-correction, hallucination detection",
        "Year": "2024"
    },
    {
        "Project Name": "Building a Q&A System with Retrieval-Augmented Generation (RAG) using LangChain and llama2",
        "Sector": "Natural Language Processing",
        "Description": "Implementation of (RAG) with LangChain to build a question-answering (Q&A) system.",
        "URL": "https://colab.research.google.com/drive/1ct4A3H97BaJoqeyv6MjSXkHS_-4uJCFf?usp=sharing",
        "Keywords": "Retrieval-Augmented Generation (RAG), LangChain, llama2, question-answering, AWS Sagemaker, AWS Jumpstart",
        "Year": "2023"
    },
    {
        "Project Name": "Malaria Parasite Detection using Deep Learning (TensorFlow v2)",
        "Sector": "Healthcare",
        "Description": "Developed a deep learning model for classifying malaria parasites in blood cell images.",
        "URL": "https://github.com/ntg2208/malaria_detection_CNN",
        "Keywords": "deep learning, malaria parasites, blood cell images, Convolutional Neural Networks (CNNs), TensorFlow v2, image processing, data augmentation",
        "Year": "2020"
    },
    {
        "Project Name": "Hospital readmission prediction",
        "Sector": "Healthcare",
        "Description": "Analysed Patient's data and their reason for admissions and predicted future hospital readmission given their medical condition",
        "URL": "https://www.kaggle.com/code/p1ayer0ne/hospital-readmissions-eda-and-model",
        "Keywords": "hospital readmission, patient data, medical condition, prediction",
        "Year": "2021"
    },
    {
        "Project Name": "M1 Traffic Analysis",
        "Sector": "Transportation",
        "Description": "Built a system that can crawl speed allowed between each junction of M1 motorway and compared the speed using descriptive analysis.",
        "URL": "https://github.com/ntg2208/M1-Traffic-Analysis-R",
        "Keywords": "Data Crawling, Data Analysis, R Programming, traffic analysis, M1 motorway, descriptive analysis, R ggplot2, hypothesis testing",
        "Year": "2019"
    },
    {
        "Project Name": "Edible Mushroom Analysis",
        "Sector": "Data Analysis",
        "Description": "Created report for analysing edible mushroom and poisonous mushroom using R and Machine Learning models.",
        "URL": "https://github.com/ntg2208/Edible-Mushroom-Analysis",
        "Keywords": "Data Analysis, Data Visualisation, Model training and evaluation, R Statistical Programming, Supervised Learning, edible mushroom, poisonous mushroom, R ggplot2, Decision Tree, Random Forest, SVM, XGBoost",
        "Year": "2018"
    },
    {
        "Project Name": "Lung Nodule Analysis 2016 (LUNA 16)",
        "Sector": "Healthcare",
        "Description": "Loading and Extract MRI Scan to 2D images and Visualise segment and annotation of the Lung disease dataset.",
        "URL": "",
        "Keywords": "Image Processing, MRI Scan, Lung disease dataset",
        "Year": "2016"
    },
    {
        "Project Name": "Customer Sentiment Analysis",
        "Sector": "Computer Vision",
        "Description": "Built Human's Emotion Classifier and Applied Face Detection and Emotion Recognition to evaluate customer satisfaction.",
        "URL": "",
        "Keywords": "Tensorflow, Image Processing, Computer Vision Model Deployment, Human's Emotion Classifier, Face Detection, Emotion Recognition, Docker Container",
        "Year": "2022"
    },
    {
        "Project Name": "Combating Exam Impersonation in Universities",
        "Sector": "Computer Vision",
        "Description": "Developed a real-time face recognition system to prevent exam impersonation in university settings.",
        "URL": "https://github.com/ntg2208/matlab-anti-impersonator",
        "Keywords": "face recognition, supervised learning, unsupervised learning, exam impersonation, MATLAB",
        "Year": "2019"
    },
    {
        "Project Name": "JPEG Image Compression in Python",
        "Sector": "Image Processing",
        "Description": "Applied Discrete Cosine Transform for Image quantisation and Applied Inverse Discrete Cosine Transform for de-quantisation",
        "URL": "https://github.com/ntg2208/JPEG-Image-compression-python-example",
        "Keywords": "Python, Image Processing, Discrete Cosine Transform, Image Compression, Image Decompression",
        "Year": "2018"
    },
    {
        "Project Name": "Multimodal Conversational AI for E-commerce",
        "Sector": "Natural Language Processing",
        "Description": "Developed a multi-agent conversational AI using Google Gemini Flash & PydanticAI for fashion e-commerce, handling multimodal queries and complex dialogue flows with RAG system.",
        "URL": "",
        "Keywords": "conversational AI, Google Gemini, PydanticAI, multimodal, RAG, e-commerce, fashion recommendation",
        "Year": "2025"
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

function createProjectCardHtml(project) {
    const urlHtml = project.URL ? `<a href="${project.URL}" target="_blank" rel="noopener noreferrer">${project.URL.includes('github.com') ? 'GitHub' : (project.URL.includes('kaggle.com') ? 'Kaggle Notebook' : (project.URL.includes('colab.research.google.com') ? 'Google Collab' : 'Project Link'))}</a>` : '';
    const keywordsHtml = project.Keywords ? `<div class="project-keywords">${project.Keywords.split(',').map(k => `<span>${k.trim()}</span>`).join('')}</div>` : '';
    const year = project.Year || 'N/A'; 

    return `
        <div class="project-card" role="listitem">
            <div class="card-image">
                <img src="assets/img/projects/placeholder.svg" alt="${project['Project Name']} visualization" loading="lazy">
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
