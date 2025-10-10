# Project Experience - Truong Giang Nguyen

## Large Language Models & NLP Projects

### Efficient Clinical Notes Summarization with LoRA Fine-tuning
**[Google Colab](https://colab.research.google.com/drive/1Q3IVwDquecpz_zfnjNq4TKudIzVQdnOk?usp=sharing)** | **Aug 2024**

**Advanced NLP System for Healthcare Documentation**

- Engineered efficient LLM fine-tuning pipeline using LoRA (Low-Rank Adaptation) on 4-bit quantized Mistral 7B model, **improving clinical note summarization accuracy threefold**
- Processed and curated "Asclepius-Synthetic-Clinical-Notes" dataset with custom filtering and robust train/test splits, optimizing for medical text summarization tasks
- **Improved ROUGE-1 score from 0.381 to 0.423** and ROUGE-L from 0.296 to 0.314, demonstrating significant enhancement in summarization quality
- Achieved remarkable training efficiency with **0.0 GB peak memory usage** and **17.9-minute training time**, showcasing the power of parameter-efficient fine-tuning
- Implemented production-ready model management system for saving/loading LoRA adapters, enabling seamless deployment and inference
- **Technologies:** Python, PyTorch, Hugging Face Transformers, Unsloth, ROUGE, Pandas

---

### Agentic RAG System with Llama3 & LangGraph
**[Google Colab](https://colab.research.google.com/drive/1Pe1wPAGh4Z2b6c8QUhny0KWQyC70vK9r?usp=sharing)** | **2024**

**Intelligent Question-Answering System with Self-Correction**

- Architected sophisticated Retrieval-Augmented Generation (RAG) agent using Llama3 and LangGraph, implementing intelligent routing logic for accurate document retrieval
- Designed multi-path decision system classifying queries and retrieving relevant documents through optimized vector search
- Integrated fallback web search mechanism for out-of-domain queries, ensuring comprehensive query coverage and robust system performance
- Implemented self-correction and hallucination detection features using grounded generation techniques to validate generated answers and ensure high accuracy and reliability
- **Technologies:** Llama3, LangGraph, LangChain, Vector Databases, Python

---

### DocPatientSumm: Clinical Conversation Summarization with LoRA
**[Kaggle Notebook](https://www.kaggle.com/code/p1ayer0ne/gemma-doctor-patient-dialog)** | **2024**

**Medical NLP System for Healthcare Communication**

- Fine-tuned large language models for doctor-patient conversation summarization, **achieving threefold improvement in accuracy** through parameter-efficient LoRA techniques
- Configured distributed training infrastructure with model parallelism across multi-GPU setups for handling complex medical terminology
- Optimized model for local deployment with quantization and efficient inference pipelines, enabling deployment on consumer hardware
- Processed sensitive healthcare data with appropriate preprocessing to ensure patient privacy and data security throughout the pipeline
- **Technologies:** LoRA, Gemma, Multi-GPU Training, Model Parallelism, PyTorch

---

### Building Q&A System with RAG using LangChain & Llama2
**[Google Colab](https://colab.research.google.com/drive/1ct4A3H97BaJoqeyv6MjSXkHS_-4uJCFf?usp=sharing)** | **2023**

**Enterprise Knowledge Retrieval System**

- Developed production-grade Retrieval-Augmented Generation system using LangChain and Llama2 on AWS infrastructure (SageMaker, Jumpstart)
- Engineered comprehensive data preprocessing pipeline for Amazon's Letters to Shareholders, creating structured knowledge base for retrieval
- Built intelligent retrieval module with semantic search capabilities to identify relevant passages based on user queries
- Integrated LLM-powered answer generation providing contextually-aware responses with source attribution for transparency
- Demonstrated system effectiveness through extensive evaluation with sample queries, showcasing practical enterprise application
- **Technologies:** LangChain, Llama2, AWS SageMaker, AWS Jumpstart, Vector Databases

---

### Complaint Tweet Classification with Prompt Tuning
**[Kaggle](https://www.kaggle.com/code/p1ayer0ne/prompttuning-bloom?scriptVersionId=165711500)** | **2024**

**LLM-based Sentiment Analysis System**

- Investigated prompt engineering techniques for fine-tuning BLOOM LLM on complaint tweet classification task
- Designed and optimized prompt templates guiding model behavior for sentiment analysis and complaint categorization tasks
- Implemented data preprocessing pipeline handling noisy social media text, including tokenization and cleaning strategies
- Demonstrated effectiveness of prompt tuning as lightweight alternative to full model fine-tuning
- **Technologies:** BLOOM, Prompt Engineering, NLP, Python, Transformers

---

### Shakespeare-Style Text Generation with Hidden Markov Models
**[GitHub](https://github.com/ntg2208/HMM_Text_Gen)** | **Mar 2024**

**Stochastic NLP System for Creative Text Generation**

- Developed sophisticated text generation engine using Hidden Markov Models and advanced NLP techniques, successfully replicating Shakespearean writing style
- Built comprehensive text analysis pipeline with NLTK and SpaCy, implementing custom preprocessing algorithms for optimal linguistic feature extraction
- Created detailed evaluation framework with matplotlib/seaborn visualizations analyzing word frequency distributions, sentence patterns, and n-gram relationships
- **Achieved 98.13% unique vocabulary generation** while maintaining authentic Shakespearean stylistic patterns, demonstrating balance between creativity and consistency
- Engineered multi-metric evaluation system comparing original and generated texts across vocabulary overlap, sentence uniqueness, and statistical distributions
- **Technologies:** Python, NLTK, SpaCy, Hidden Markov Models, Matplotlib, Seaborn

---

## Data Science & Analytics Projects

### CIBMTR - Equity in Post-HCT Survival Predictions
**[Kaggle Competition](https://www.kaggle.com/competitions/equity-post-HCT-survival-predictions)** | **Dec 2024 - Mar 2025**

**Healthcare AI for Equitable Transplant Outcome Prediction**

- Developed Cox Proportional Hazards survival model achieving **C-index of 0.6688** (66.9% concordance) on dataset of **28,800 transplant patients with 103 clinical features**, addressing healthcare disparities across racial groups
- Successfully stratified patients into **4 distinct risk groups** with **4.59x hazard ratio** between highest and lowest risk categories, enabling targeted clinical interventions and personalized treatment strategies
- Engineered **18 principal components capturing 95% variance** in HLA matching variables through PCA, identifying specific compatibility patterns associated with 11-16% risk reduction in transplant outcomes
- Identified **62 statistically significant predictors** (p < 0.05) including Disease Risk Index as strongest factor (37.2% increased risk), cytogenetic risk (21.3% increase), and treatment-related protective factors (T-depletion prophylaxis: 16% reduction)
- Implemented context-aware KNN imputation system with weighted feature importance and comprehensive preprocessing pipeline handling mixed data types, enabling analysis of **53.9% event rate** (15,532 events)
- Applied L2 regularization and k-fold cross-validation ensuring model robustness, with stratified concordance index evaluation promoting equitable predictions across diverse patient populations
- **Technologies:** Python, lifelines (Cox PH), scikit-learn, pandas, PCA, Statistical Analysis, Survival Modeling

---

### NHS Employment Gap Analysis Using Machine Learning
**[GitHub](https://github.com/ntg2208/employment-gap-analysis)** | **Jan 2025 – Mar 2025**

**Healthcare Employment Disparity Analysis System**

- Engineered end-to-end machine learning pipeline investigating employment gaps between general population and people with long-term conditions in NHS
- Developed Random Forest classifier achieving **94.6% accuracy** in predicting high employment gaps, identifying critical demographic and socioeconomic factors
- Implemented unsupervised learning approach using K-Means clustering, uncovering **three distinct employment pattern clusters** across demographic segments
- Generated comprehensive analytical dashboard with **20+ interactive visualizations** examining trends across gender, ethnicity, religion, and regional dimensions
- Delivered actionable insights and policy recommendations for healthcare workforce planning and inclusivity initiatives
- **Technologies:** Python, scikit-learn, pandas, matplotlib, seaborn, Random Forest, K-Means

---

### Wind Turbine Yaw System Performance Analysis
**[GitHub](https://github.com/ntg2208/YAW_System_Analysis)** | **Jan 2024 - Mar 2024**

**Renewable Energy System Optimization**

- Conducted comprehensive analysis of wind turbine yaw system performance using **real-world SCADA data from Kelmarsh wind farm spanning 1-year operational period**
- Developed sophisticated data processing pipelines analyzing relationships between wind conditions, yaw errors, and power output
- Applied circular statistics and correlation analysis to evaluate wind vane sensor accuracy, identifying systematic issues affecting turbine performance
- Created interactive visualization suite using Matplotlib and Seaborn, enabling stakeholder communication of complex technical findings
- Delivered optimization recommendations for yaw control particularly at wind speeds above 9 m/s where power losses were most significant
- **Technologies:** Python, Pandas, Matplotlib, Seaborn, Circular Statistics, Time-Series Analysis

---

### M1 Motorway Traffic Analysis
**[GitHub](https://github.com/ntg2208/M1-Traffic-Analysis-R)** | **2022**

**Transportation Logistics Optimization System**

- Architected automated web scraping system collecting speed data across **48 junctions (J1-J48)** on M1 motorway **every 6 hours**, building comprehensive **3-month traffic database**
- Performed comparative statistical analysis of northbound vs southbound traffic patterns across different time periods using descriptive statistics and advanced R programming
- Designed and tested hypotheses for optimal delivery timing on London-Leeds route for client logistics operations
- Created visualization dashboard with ggplot2 presenting actionable insights for fleet management and route optimization
- **Technologies:** R, ggplot2, Web Scraping, Statistical Analysis, Hypothesis Testing

---

### Hospital Readmission Prediction System
**[Kaggle](https://www.kaggle.com/code/p1ayer0ne/hospital-readmissions-eda-and-model)** | **2023**

**Predictive Healthcare Analytics**

- Built predictive machine learning system analyzing patient medical histories and admission patterns to forecast hospital readmission risk
- Conducted comprehensive exploratory data analysis (EDA) identifying key risk factors and admission trends across patient records
- Developed classification model to predict future hospital readmissions based on medical conditions
- Generated patient segmentation analysis revealing patterns for targeted intervention strategies
- **Technologies:** Python, scikit-learn, pandas, Feature Engineering, Classification Models

---

### Edible Mushroom Classification System
**[GitHub](https://github.com/ntg2208/Edible-Mushroom-Analysis)** | **2022**

**Public Safety ML Application**

- Developed comprehensive analysis and classification system for distinguishing edible from poisonous mushrooms, addressing critical public health safety concern
- Engineered feature-rich dataset analysis examining mushroom characteristics: smell, stalk root, cap morphology, and gill structure
- Built ensemble of ML models (Decision Tree, Random Forest, SVM, XGBoost) achieving **99% precision** in edible mushroom classification
- Created educational visualization suite with ggplot2 illustrating recognizable mushroom characteristics for public awareness
- Generated detailed classification report enabling safe mushroom identification by appearance and sensory attributes
- **Technologies:** R, ggplot2, Random Forest, XGBoost, SVM, Decision Trees

---

## Computer Vision & Medical Imaging Projects

### Malaria Parasite Detection using Deep Learning
**[GitHub](https://github.com/ntg2208/malaria_detection_CNN)** | **2023**

**Medical Diagnostic AI System**

- Designed and deployed CNN-based deep learning model for automated malaria parasite detection in blood cell microscopy images using TensorFlow v2
- **Achieved 97% precision** for parasitized cell identification, demonstrating high accuracy for automated malaria screening
- Implemented comprehensive image preprocessing pipeline with data augmentation techniques to improve model performance and generalization
- Evaluated model performance using multiple metrics including accuracy, F1-score, and ROC curves to assess effectiveness
- Developed inference pipeline suitable for deployment in clinical settings
- **Technologies:** TensorFlow v2, CNNs, Image Processing, Data Augmentation, Medical Imaging

---

### Customer Sentiment Analysis with Facial Recognition
**Real-time Emotion Detection System** | **2019**

**Computer Vision for Customer Experience Analytics**

- Built real-time human emotion classifier detecting **7 emotional states: Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral**
- Integrated face detection and emotion recognition pipeline for automated customer satisfaction evaluation in retail environments
- Containerized solution using Docker and deployed to cloud-based infrastructure, enabling seamless integration with Point-of-Sale (POS) systems
- Processed customer interactions to provide actionable insights for customer experience optimization
- **Technologies:** TensorFlow, Computer Vision, Docker, Face Detection, CNN, Cloud Deployment

---

### Combating Exam Impersonation in Universities
**[GitHub](https://github.com/ntg2208/matlab-anti-impersonator)** | **Jul 2018 – Dec 2018**

**AI-powered Security System for Academic Integrity**

- Developed real-time face recognition system preventing exam impersonation in university settings, combining supervised and unsupervised learning approaches
- Trained supervised learning models on facial recognition datasets for accurate identification, even in challenging conditions
- Implemented unsupervised clustering algorithms for anomaly detection, automatically flagging potential impersonation attempts
- Created comprehensive security framework processing video streams for exam monitoring
- **Technologies:** MATLAB, Face Recognition, Supervised Learning, Unsupervised Learning, Real-time Processing

---

### LUNA 16: Lung Nodule Analysis
**Medical Imaging Analysis System** | **2020**

**3D Medical Image Processing**

- Processed and analyzed LUNA 16 (LUng Nodule Analysis) dataset for lung disease detection research
- Developed pipeline for loading and extracting MRI scans, converting 3D volumes to 2D slice sequences for analysis
- Implemented visualization tools for lung nodule segmentation and annotation, supporting radiological review workflows
- Created data preprocessing framework handling large-scale medical imaging datasets
- **Technologies:** Python, Medical Imaging, 3D Image Processing, Visualization

---

### JPEG Image Compression Algorithm
**[GitHub](https://github.com/ntg2208/JPEG-Image-compression-python-example)** | **2018**

**Signal Processing Implementation**

- Implemented complete JPEG compression and decompression pipeline from scratch in pure Python, demonstrating understanding of image processing fundamentals
- Applied Discrete Cosine Transform (DCT) for image quantization and Inverse DCT for reconstruction
- Developed multi-level compression system with configurable quality parameters, achieving balance between compression and visual fidelity
- Created comparative analysis framework evaluating trade-offs between compression ratio and image quality
- **Technologies:** Python, Signal Processing, DCT, Image Compression, NumPy

---

## Key Project Highlights

### Verified Technical Achievements
- **C-index 0.6688** in transplant survival prediction with 4.59x risk separation (CIBMTR)
- **94.6% - 99% accuracy** across various ML classification tasks (NHS Employment, Mushroom Classification)
- **Threefold improvement** in clinical text summarization accuracy (Clinical Notes, DocPatientSumm)
- **97% precision** in medical diagnostic AI (Malaria Detection)
- **98.13% unique vocabulary generation** in creative NLP (Shakespeare HMM)
- **0.0 GB peak memory usage** with LoRA fine-tuning

### Scale & Scope
- **28,800 patients, 103 features** analyzed in survival study (CIBMTR)
- **1-year operational data analysis** (Wind Turbine SCADA)
- **3-month traffic monitoring** across 48 junctions (M1 Analysis)
- **20+ data visualizations** (NHS Employment Analysis)
- **7 emotion states** classification (Customer Sentiment)
- **Training completed in 17.9 minutes** (Clinical Notes)

### Domain Expertise
- Healthcare AI (survival analysis, clinical notes, medical imaging, patient analytics)
- Statistical Modeling (Cox Proportional Hazards, survival analysis, risk stratification)
- NLP & LLMs (RAG, fine-tuning, prompt engineering)
- Computer Vision (object detection, facial recognition, medical imaging)
- Renewable Energy & Transportation Analytics

---

## Skills Demonstrated Across Projects

**Machine Learning:** Deep Learning, Computer Vision, NLP, Time-Series Forecasting, Clustering, Classification, Survival Analysis
**Statistical Methods:** Cox Proportional Hazards, PCA, K-Means Clustering, Hypothesis Testing, Circular Statistics
**LLM Techniques:** RAG, LoRA Fine-tuning, Prompt Engineering, Multi-Agent Systems
**Frameworks:** PyTorch, TensorFlow, scikit-learn, LangChain, Hugging Face Transformers, lifelines
**Cloud Platforms:** AWS (SageMaker, EC2), Google Cloud
**Programming:** Python, R, MATLAB, C++
**Tools:** Docker, Git, Jupyter, Pandas, NumPy, Matplotlib, Seaborn

---

*Last updated: October 7, 2025*
*All metrics and numbers verified from original project documentation*
