export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  demoVideo?: string;
  architectureImage?: string;
  github: string;
  liveDemo?: string;
  techStack: string[];
  isFeatured: boolean;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  databaseDesign: string;
  challenges: string;
  features: string[];
  futureImprovements: string[];
  timeline: string;
  role?: string;
  teamSize?: string;
  status?: string;
  highlights?: { value: string; label: string }[];
  whatILearned?: string[];
  created_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
  downloadUrl?: string;
  thumbnail: string;
  skillsCovered: string[];
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string; // "Present" or Date
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyWebsite?: string;
  certificateUrl?: string;
  recommendationLetter?: string;
  logo?: string;
}

export interface Training {
  id: string;
  title: string;
  provider: string;
  duration: string;
  skillsLearned: string[];
  certificateUrl?: string;
  projectsBuilt: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  proofUrl?: string;
  relatedProjects?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'AI & ML' | 'Cloud & DB' | 'DevOps' | 'Soft Skills';
  level: number; // 0 to 100
  experienceYears: number;
  projectsUsedIn: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  courses: string[];
  projects: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown supported
  coverImage: string;
  category: string;
  tags: string[];
  isDraft: boolean;
  views: number;
  publishedAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isImportant: boolean;
  isArchived: boolean;
  created_at: string;
}

export interface Settings {
  profileName: string;
  profileTitle: string;
  avatarUrl: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  location: string;
  availability: 'Available' | 'Busy' | 'Open for Offers';
  bio: string;
  typingStrings?: string;
  yearsExperience?: string;
  aboutSummary?: string;
  careerObjective?: string;
  currentLearning?: string;
  personalInterests?: string;
  languages?: string;
}

export const INITIAL_SETTINGS: Settings = {
  profileName: "Sourav Kuriakose",
  profileTitle: "Full-Stack Developer & AI Systems Engineer",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  resumeUrl: "#",
  githubUrl: "https://github.com/Sourav6404",
  linkedinUrl: "https://www.linkedin.com/in/sourav6404/",
  email: "souravkuriakose6404@gmail.com",
  phone: "+91 9778470167",
  location: " Lovely Professional University, Phagwara, Punjab",
  availability: "Available",
  bio: "B.Tech Computer Science & Engineering student at Lovely Professional University. Aspiring full-stack software engineer building intelligent web platforms and machine learning pipelines.",
  typingStrings: "Full-Stack Developer, AI Systems Engineer, React Developer, Python Programmer",
  yearsExperience: "1+ Years",
  aboutSummary: "I am a motivated Software Engineer and a B.Tech Computer Science & Engineering student at Lovely Professional University. My expertise spans Python, Java, JavaScript, TypeScript, and SQL, with a deep focus on both Frontend and Backend web development, as well as AI & ML integrations.\n\nI specialize in constructing intelligent, responsive, and scalable platforms—from AI-powered video frame interpolation pipelines to multilingual agricultural interfaces. I am analytical, resourceful, and committed to developing robust, end-to-end applications that drive real-world business value.",
  careerObjective: "To secure a challenging role as a Software Engineer where I can leverage my expertise in full-stack web development, AI integration, and networks to design performant, scalable software architectures.",
  currentLearning: "Deepening my expertise in distributed AI systems, Large Language Model (LLM) fine-tuning, large-scale enterprise network designs, and advanced React workflows.",
  personalInterests: "Contributing to open-source software, 3D modeling and Blender animation, exploring emerging AI models, virtual networking architectures",
  languages: "English (Native / Bilingual), Malayalam (Native / Bilingual), Hindi (Conversational)"
};

export const INITIAL_SKILLS: Skill[] = [
  // Programming
  { id: "s1", name: "Python", category: "Programming", level: 90, experienceYears: 3, projectsUsedIn: ["CHRONOS.WMS", "KISSANMITRA"] },
  { id: "s2", name: "Java", category: "Programming", level: 85, experienceYears: 3, projectsUsedIn: ["Algorithm Lab"] },
  { id: "s3", name: "C / C++", category: "Programming", level: 80, experienceYears: 2, projectsUsedIn: ["DSA Lab"] },
  { id: "s4", name: "JavaScript", category: "Programming", level: 88, experienceYears: 2, projectsUsedIn: ["CHRONOS.WMS", "KISSANMITRA"] },
  { id: "s5", name: "TypeScript", category: "Programming", level: 85, experienceYears: 1, projectsUsedIn: ["Commonwealth Bank Intern"] },
  { id: "s6", name: "SQL", category: "Programming", level: 82, experienceYears: 2, projectsUsedIn: ["CHRONOS.WMS", "Database Lab"] },
  
  // Frontend
  { id: "s7", name: "React", category: "Frontend", level: 90, experienceYears: 2, projectsUsedIn: ["CHRONOS.WMS", "KISSANMITRA", "Commonwealth Bank Intern"] },
  { id: "s8", name: "HTML5 / CSS3", category: "Frontend", level: 92, experienceYears: 3, projectsUsedIn: ["Quantium Virtual Experience", "KISSANMITRA"] },
  { id: "s9", name: "UI/UX Design", category: "Frontend", level: 80, experienceYears: 2, projectsUsedIn: ["KISSANMITRA"] },
  
  // Backend
  { id: "s10", name: "Django", category: "Backend", level: 82, experienceYears: 1, projectsUsedIn: ["CHRONOS.WMS"] },
  { id: "s11", name: "Flask", category: "Backend", level: 82, experienceYears: 1, projectsUsedIn: ["KISSANMITRA"] },
  { id: "s12", name: "Node.js / Express.js", category: "Backend", level: 85, experienceYears: 2, projectsUsedIn: ["API Gateway"] },
  { id: "s13", name: "REST API Development", category: "Backend", level: 88, experienceYears: 2, projectsUsedIn: ["CHRONOS.WMS", "KISSANMITRA"] },
  
  // Database
  { id: "s14", name: "MySQL / PostgreSQL", category: "Cloud & DB", level: 80, experienceYears: 2, projectsUsedIn: ["CHRONOS.WMS", "Database Lab"] },
  { id: "s15", name: "MongoDB Atlas", category: "Cloud & DB", level: 82, experienceYears: 1, projectsUsedIn: ["Commonwealth Bank Intern"] },
  { id: "s16", name: "Redis", category: "Cloud & DB", level: 75, experienceYears: 1, projectsUsedIn: ["CHRONOS.WMS"] },
  { id: "s17", name: "Firebase", category: "Cloud & DB", level: 78, experienceYears: 1, projectsUsedIn: ["Mobile Chat App"] },

  // AI & ML
  { id: "s18", name: "NumPy / Pandas", category: "AI & ML", level: 85, experienceYears: 2, projectsUsedIn: ["Quantium Virtual Experience"] },
  { id: "s19", name: "PyTorch & OpenCV", category: "AI & ML", level: 80, experienceYears: 1, projectsUsedIn: ["CHRONOS.WMS"] },
  { id: "s20", name: "LangChain / LlamaIndex", category: "AI & ML", level: 82, experienceYears: 1, projectsUsedIn: ["KISSANMITRA"] },
  { id: "s21", name: "Prompt Engineering & LLM Integration", category: "AI & ML", level: 88, experienceYears: 1, projectsUsedIn: ["KISSANMITRA"] },

  // DevOps & Tools
  { id: "s22", name: "Git & GitHub", category: "DevOps", level: 90, experienceYears: 3, projectsUsedIn: ["CHRONOS.WMS", "KISSANMITRA", "Commonwealth Bank Intern"] },
  { id: "s23", name: "Vercel / Netlify / Render", category: "DevOps", level: 85, experienceYears: 2, projectsUsedIn: ["CHRONOS.WMS", "KISSANMITRA"] },
  { id: "s24", name: "Postman & npm", category: "DevOps", level: 85, experienceYears: 2, projectsUsedIn: ["Commonwealth Bank Intern", "CHRONOS.WMS"] },
  { id: "s25", name: "AWS (S3, Lambda)", category: "DevOps", level: 75, experienceYears: 1, projectsUsedIn: ["Cloud Deployments"] },

  // Soft Skills & Concepts
  { id: "s26", name: "Full Stack Development", category: "Soft Skills", level: 90, experienceYears: 2, projectsUsedIn: ["CHRONOS.WMS", "KISSANMITRA", "Commonwealth Bank Intern"] },
  { id: "s27", name: "Version Control & Git workflows", category: "Soft Skills", level: 88, experienceYears: 3, projectsUsedIn: ["Commonwealth Bank Intern", "KISSANMITRA"] },
  { id: "s28", name: "OOP & Data Structures (DSA)", category: "Soft Skills", level: 85, experienceYears: 3, projectsUsedIn: ["Algorithm Lab", "LPU Degree"] }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "CHRONOS.WMS - Temporal Frame Interpolation & Visualization Platform",
    slug: "chronows",
    description: "An AI-powered video frame interpolation platform transforming low-frame-rate videos into high-FPS outputs with real-time visualization and performance analytics.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
    ],
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34316-large.mp4",
    architectureImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/Sourav6404/Chronos.WMS-AI-Powered-Temporal-Frame-Interpolation-Visualization-Platform",
    liveDemo: "https://chronos-wms-ai-powered-temporal-fra.vercel.app",
    techStack: ["React.js", "Django REST Framework", "PyTorch", "OpenCV", "Celery", "Redis", "Three.js", "Tailwind CSS", "Recharts", "PostgreSQL"],
    isFeatured: true,
    overview: "Pioneered an AI-powered video frame interpolation platform to transform low-frame-rate videos into high-FPS outputs with real-time visualization and performance analytics.",
    problem: "Low-frame-rate videos often suffer from stuttering and lack of fluid motion, which limits their use in high-fidelity analytics, quantitative video quality analyses, and smooth rendering environments.",
    solution: "We designed a scalable full-stack AI solution utilizing a PyTorch model for video frame interpolation. The backend manages distributed generation queues via Celery and Redis, while the frontend provides real-time visualization.",
    architecture: "Microservices-based setup: React.js handles the interactive dashboard UI, displaying real-time video frames and metric visualizations. The Django REST Framework acts as the core API server, routing heavy processing requests to background Celery workers. Redis acts as the broker and cache layer.",
    databaseDesign: "PostgreSQL structures processed video histories, performance metrics (SSIM, PSNR), and user workspace configurations.",
    challenges: "Processed 100+ videos (500+ frames) using AI-based frame interpolation, achieving an average 92.4% SSIM and 31.8 dB PSNR while maintaining temporal consistency and enabling real-time visualization.",
    features: [
      "AI-powered Video Frame Interpolation",
      "Real-time processing queue visualization with Three.js",
      "Performance metrics tracking (SSIM and PSNR charts)",
      "Distributed task management using Celery & Redis"
    ],
    futureImprovements: [
      "Optimized model compilation for edge deployments using TensorRT",
      "Support for multi-stream concurrent video processing pipelines"
    ],
    timeline: "May 2025",
    role: "AI Systems Architect",
    teamSize: "2 Members",
    status: "Completed",
    highlights: [
      { value: "92.4%", label: "Average SSIM score" },
      { value: "31.8 dB", label: "Average PSNR score" },
      { value: "100+", label: "Videos processed in testing" },
      { value: "Real-time", label: "Visualization & analytics dashboard" }
    ],
    whatILearned: [
      "Deep learning model optimization using PyTorch and OpenCV",
      "Real-time video frame streaming and rendering in browser viewports",
      "Configuring distributed event systems with Celery and Redis",
      "Managing PostgreSQL databases for performance metrics tracking"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "p2",
    title: "KISSANMITRA - AI-Powered Agricultural Platform",
    slug: "kissan-mithra",
    description: "Multilingual AI-powered agriculture platform empowering farmers with crop disease prediction, weather forecasting, and generative LLM assistance.",
    coverImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
    ],
    github: "https://github.com/Sourav6404/AI---Based-Agriculture-Query-support-for-farmers",
    liveDemo: "",
    techStack: ["React.js", "Flask", "Python", "Scikit-learn", "Google Gemini API", "Prompt Engineering", "Render", "Netlify"],
    isFeatured: true,
    overview: "Conceived a multilingual AI-powered agriculture platform to empower farmers with crop disease prediction, weather forecasting, market intelligence, and AI-driven multilingual assistance through Large Language Model (LLM) integration.",
    problem: "Farmers struggle to diagnose crop diseases accurately and access weather/market data in their local languages, causing crop failures and financial losses.",
    solution: "Developed KISSANMITRA, integrating machine learning disease prediction models (Scikit-learn) with a generative conversational interface (Google Gemini API) to support multi-regional queries.",
    architecture: "React.js frontend deployed on Netlify, connected to a Flask API hosted on Render. Python backend scripts perform crop disease inference and manage LLM dialogue states.",
    databaseDesign: "MongoDB structures regional dataset caches, crop health logs, and market price lists.",
    challenges: "Delivered an AI-powered agriculture platform achieving 94.6% crop disease prediction accuracy, supporting 8 regional languages, processing 900+ multilingual farmer queries, and reducing average recommendation response time to under 2 Sec.",
    features: [
      "94.6% accurate crop disease diagnostics",
      "Conversational assistant supporting 8 regional languages",
      "Dynamic weather forecasting integrations",
      "Market price intelligence and crop scheduling calendar"
    ],
    futureImprovements: [
      "IoT sensor integration for real-time soil moisture and NPK tracking",
      "Offline mobile application containing quantized model weights"
    ],
    timeline: "Oct 2025",
    role: "Lead AI Developer",
    teamSize: "3 Members",
    status: "Completed",
    highlights: [
      { value: "94.6%", label: "Crop disease prediction accuracy" },
      { value: "8", label: "Regional Indian languages supported" },
      { value: "900+", label: "Multilingual farmer queries processed" },
      { value: "< 2s", label: "Average recommendation response time" }
    ],
    whatILearned: [
      "Integrating Gemini AI conversational systems for regional assistance",
      "Training crop disease classifier models with Scikit-learn random forests",
      "Deploying multi-tenant web systems using Flask on Render",
      "Writing robust multi-lingual prompt templates"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "p3",
    title: "Altuni Invest: AI Terminals & Equity Reports",
    slug: "altuni-invest",
    description: "An AI-powered multi-agent investment research platform automating company analysis using 10 specialized AI agents to generate reports and insights.",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    ],
    github: "https://github.com/Sourav6404/Altuni-Invest",
    liveDemo: "https://altuni-invest.vercel.app",
    techStack: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "Recharts", "Node.js", "Express.js", "TypeScript", "MongoDB", "Gemini API"],
    isFeatured: true,
    overview: "Altuni Invest is an AI-powered multi-agent investment research platform that automates company analysis using 10 specialized AI agents. It performs financial, market, competitor, news, sentiment, valuation, and risk analysis to generate data-driven investment insights through an interactive dashboard with real-time AI workflow tracking.",
    problem: "Analyzing public companies requires compiling voluminous financial statements, market reports, news articles, and risk factors, which takes hours of manual work.",
    solution: "Built a multi-agent backend orchestrating 10 specialized agents to parallelize retrieval and synthesis, and render them on an interactive data terminal.",
    architecture: "Multi-agent network orchestrated with Node.js/Express, calling Google Gemini APIs with specialized system prompts. The UI is built using React Vite and Recharts for metrics charting.",
    databaseDesign: "MongoDB cache collection for financial reports, company tickers, and aggregated risk matrix scores.",
    challenges: "Enforcing atomic outputs from 10 concurrent LLM agents and mapping unstructured data into clean financial visualizations.",
    features: [
      "10 specialized financial AI agents",
      "Real-time sentiment and competitor analysis",
      "Automated PDF investment report generator",
      "Interactive stock chart and risk matrix UI"
    ],
    futureImprovements: [
      "Real-time WebSocket streaming of stock charts",
      "Support for global international currency exchanges"
    ],
    timeline: "Jun 2026",
    role: "Core Platform Developer",
    teamSize: "Solo Project",
    status: "Completed",
    highlights: [
      { value: "10", label: "Specialized financial AI agents active" },
      { value: "Real-time", label: "Workflow tracking terminal UI dashboard" },
      { value: "Automated", label: "PDF investment report compiler" },
      { value: "100%", label: "Type safety and schema validation" }
    ],
    whatILearned: [
      "Designing recursive LLM agent coordination graphs",
      "Compiling financial charts and indicators dynamically in Recharts",
      "Implementing fast caching strategies using MongoDB database",
      "Crafting detailed PDF document compilers inside Node.js scripts"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "p4",
    title: "FairSplit: Expense Manager & Settlement Tracker",
    slug: "fairsplit",
    description: "Full-stack shared expense management application with CSV import, anomaly detection, balance tracking, and auto settlement calculations.",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    ],
    github: "https://github.com/Sourav6404/FairSplit",
    liveDemo: "https://fairsplit-puce.vercel.app",
    techStack: ["React.js", "Node.js", "Express.js", "TypeScript", "MongoDB", "Tailwind CSS", "Recharts"],
    isFeatured: true,
    overview: "FairSplit is a smart expense management platform that helps groups track expenses, settle balances, and import historical data intelligently using AI-driven anomaly detection.",
    problem: "Manually tracking group expenses and splitting shares of recurring utility bills is complex and prone to mathematical errors or duplicate filings.",
    solution: "Designed a clean full-stack portal with automated transaction importing and a recursive algorithm to compute the minimum number of debt settlement transfers.",
    architecture: "React.js frontend handles group user operations, while Node.js and Express.js API manage authentication and calculation engines, backed by MongoDB.",
    databaseDesign: "Flexible MongoDB collections for group memberships, split logs, and balance sheets.",
    challenges: "Optimizing the split calculation algorithm to resolve complex multi-party debts with minimum transaction overhead.",
    features: [
      "Automated CSV transaction parsing & importing",
      "Minimized transaction debt settlement logic",
      "Group budget split metrics and interactive charts",
      "AI-driven anomaly detection to identify duplicate filings"
    ],
    futureImprovements: [
      "Direct digital payment gateway API integrations",
      "Receipt optical character recognition (OCR) scanner support"
    ],
    timeline: "Jan 2025 - May 2025",
    role: "Full Stack Developer",
    teamSize: "4 Members",
    status: "Completed",
    highlights: [
      { value: "95%", label: "Anomaly detection accuracy" },
      { value: "15+", label: "Anomaly types detected" },
      { value: "Multi-currency", label: "Auto conversion support" },
      { value: "1000+", label: "Expenses processed in testing" }
    ],
    whatILearned: [
      "Building scalable full stack applications utilizing React and Express",
      "AI/ML integration in real-world shared utility calculations",
      "Handling complex data streams and ledger edge cases",
      "Database schema design and optimization in MongoDB",
      "Background task processing architectures",
      "Clean code and modular microservice structures"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "p5",
    title: "webXpert: Prompt to Full-Stack Web App Generator",
    slug: "webxpert",
    description: "AI-powered platform generating fully functional codebases from a single text prompt, featuring visual previews and downloadable project zip files.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    screenshots: [],
    github: "https://github.com/Sourav6404/webXpert",
    liveDemo: "",
    techStack: ["React.js", "Django", "PostgreSQL", "Gemini API", "Tailwind CSS", "JSZip"],
    isFeatured: false,
    overview: "WebXpert is an AI-powered platform that generates full-stack web applications from a single prompt. Built with React, Django, and PostgreSQL, it analyzes user input using Gemini API, creates structured code, allows preview, and provides downloadable ZIP files for deployment.",
    problem: "Setting up frontend scaffolding, backend schemas, and database connectors takes developer time during early prototype phases.",
    solution: "Created an AI generator that dynamically compiles component structures and APIs, bundling them using client-side JSZip for instant downloads.",
    architecture: "Django serves as the backend controller orchestrating code generation instructions with Gemini. The React dashboard handles output workspace displays.",
    databaseDesign: "PostgreSQL holds generated templates, prompt histories, and compilation statuses.",
    challenges: "Prompt engineering the LLM to output syntax-valid directories and boilerplate components without syntax compilation errors.",
    features: [
      "Prompt-to-fullstack directory generator",
      "Interactive code preview workspace panel",
      "One-click zip compilation and download",
      "Custom boilerplate configurations support"
    ],
    futureImprovements: [
      "Direct code sandbox preview using WebContainers",
      "One-click deploy integrations to Vercel/Render"
    ],
    timeline: "Feb 2026",
    role: "Core Systems Developer",
    teamSize: "Solo Project",
    status: "Completed",
    highlights: [
      { value: "1", label: "Prompt to fullstack generation" },
      { value: "Zip", label: "Instant directory compilation" },
      { value: "Gemini", label: "Dynamic system prompt model" },
      { value: "Interactive", label: "Live codebase preview window" }
    ],
    whatILearned: [
      "Configuring prompt instruction structures for clean output formats",
      "Creating zip files in browser runtimes using JSZip library",
      "Building dynamic multi-view preview frames",
      "Managing PostgreSQL databases in Django REST backends"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "p6",
    title: "Agrolens: Agriculture Self-Expert Classifier",
    slug: "agrolens",
    description: "Jupyter Notebook based agricultural dataset classifier analyzing soil qualities, moisture contents, and crop health parameters.",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    screenshots: [],
    github: "https://github.com/Sourav6404/agrolens",
    liveDemo: "",
    techStack: ["Jupyter Notebook", "Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
    isFeatured: false,
    overview: "Self agro expert classifier built using machine learning data pipelines to predict optimal soil parameters and validate farm conditions.",
    problem: "Interpreting soil chemistry readings manually leads to incorrect crop choices and reduced agricultural productivity.",
    solution: "Built a Python-based diagnostic model utilizing Scikit-learn random forests to identify optimal conditions for various crops.",
    architecture: "Data pipeline executed via Jupyter notebooks containing feature engineering, correlation analysis, and model training tasks.",
    databaseDesign: "CSV files containing historical multi-regional agricultural factors.",
    challenges: "Balancing class imbalances in agricultural datasets containing sparse historical records.",
    features: [
      "Random Forest model for crop prediction",
      "Correlation matrix charting for soil variables",
      "Feature importance ranking graphs",
      "Data preprocessing scripts"
    ],
    futureImprovements: [
      "Export model weights to ONNX format for mobile deployment",
      "Adding real-time satellite spectral imagery input processing"
    ],
    timeline: "May 2026",
    role: "ML Researcher",
    teamSize: "Solo Project",
    status: "Completed",
    highlights: [
      { value: "RF", label: "Random Forest classifier model active" },
      { value: "Pandas", label: "Feature engineering data pipeline" },
      { value: "Matplotlib", label: "Soil variables correlation matrix" },
      { value: "NumPy", label: "Array math & prediction matrices" }
    ],
    whatILearned: [
      "Preprocessing agricultural records and balancing label weights",
      "Evaluating classifier performance with precision-recall scores",
      "Conducting feature correlation checks with correlation matrices",
      "Structuring reproducible Jupyter research workbooks"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "p7",
    title: "Sourav Portfolio: Next.js Dynamic Website",
    slug: "sourav-portfolio-next",
    description: "Modern, dynamic glassmorphic developer portfolio page integrating settings edit capability, certifications, and experiences direct from admin panels.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    screenshots: [],
    github: "https://github.com/Sourav6404/sourav-portfolio",
    liveDemo: "https://sourav-portfolio-pi.vercel.app",
    techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React"],
    isFeatured: false,
    overview: "Next.js-based portfolio presenting all dynamic sections (projects, experiences, credentials) loaded straight from local state database adapters.",
    problem: "Normal static portfolios require editing code and redeploying files every time a developer gains a new skill or changes text.",
    solution: "Designed a premium web portal with fully implemented admin consoles to manage skills, education, and certificates databases.",
    architecture: "Next.js dynamic routing with AppRouter. Context state managers serve data layers to public templates.",
    databaseDesign: "Flexible client-side localStorage fallback adapters mapping projects, certificates, and settings keys.",
    challenges: "Crafting a premium visual interface utilizing CSS animations and glassmorphism without compromising rendering speed.",
    features: [
      "Fully interactive admin dashboard editor",
      "Clickable project and certificate direct link cards",
      "Initials calculations based on profile settings",
      "Interactive charts and responsiveness check"
    ],
    futureImprovements: [
      "Integrating Supabase DB collections backend tables sync",
      "Adding a markdown compiler inside the blog draft writer dashboard"
    ],
    timeline: "Mar 2026",
    role: "Creator & Designer",
    teamSize: "Solo Project",
    status: "Completed",
    highlights: [
      { value: "Next.js", label: "AppRouter dynamic server-rendering" },
      { value: "Glassmorphic", label: "Premium CSS styling layout" },
      { value: "CRUD", label: "Console database editors integrated" },
      { value: "100%", label: "TypeScript verification score" }
    ],
    whatILearned: [
      "Building high-performance layouts utilizing Framer Motion",
      "Managing state parameters using Context API dynamic state layers",
      "Creating CRUD dashboard management system dashboards",
      "Restricting routing security for admin console tabs"
    ],
    created_at: new Date().toISOString()
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "python-basic",
    title: "Python (Basic)",
    organization: "HackerRank",
    issueDate: "2026-01",
    credentialId: "HR-PYTHON-BASIC-2026",
    verificationUrl: "https://www.hackerrank.com",
    downloadUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=300",
    skillsCovered: ["Python Basics", "Data Structures", "Control Flow"],
    created_at: new Date().toISOString()
  },
  {
    id: "java-basic",
    title: "Java (Basic)",
    organization: "HackerRank",
    issueDate: "2025-10",
    credentialId: "HR-JAVA-BASIC-2025",
    verificationUrl: "https://www.hackerrank.com",
    downloadUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300",
    skillsCovered: ["Java Programming", "Object Oriented Programming (OOP)"],
    created_at: new Date().toISOString()
  },
  {
    id: "project-time-management",
    title: "Project time management",
    organization: "Infosys",
    issueDate: "2023-10",
    credentialId: "INFY-PTM-2023",
    verificationUrl: "https://www.infosys.com",
    downloadUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=300",
    skillsCovered: ["Agile planning", "Task prioritizing", "Milestone scheduling"],
    created_at: new Date().toISOString()
  },
  {
    id: "backend-development",
    title: "Back-End Development and APIs",
    organization: "FreeCodeCamp",
    issueDate: "2023-11",
    credentialId: "FCC-BACKEND-2023",
    verificationUrl: "https://www.freecodecamp.org",
    downloadUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=300",
    skillsCovered: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs"],
    created_at: new Date().toISOString()
  },
  {
    id: "responsive-web-design",
    title: "Responsive Web Design Developer",
    organization: "FreeCodeCamp",
    issueDate: "2023-11",
    credentialId: "FCC-RWD-2023",
    verificationUrl: "https://www.freecodecamp.org",
    downloadUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300",
    skillsCovered: ["HTML5", "CSS3", "Responsive Layouts", "Flexbox & Grid"],
    created_at: new Date().toISOString()
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "quantium",
    company: "Quantium (Forage)",
    position: "Software Engineering Virtual Experience",
    startDate: "2026-07",
    endDate: "2026-07",
    responsibilities: [
      "Simulated the role of a Software Engineer to develop data-driven solutions that help retail clients analyze declining sales trends and support informed business decision-making.",
      "Applied Python, Dash, CSS, virtual environments, data analysis libraries, automated testing, shell scripting, and dashboard development to implement software engineering solutions."
    ],
    achievements: [
      "Transformed retail sales data into 6 analytical deliverables, utilizing Python-based automation, interactive dashboards, and software engineering best practices to support strategic business decisions."
    ],
    technologies: ["Python", "Dash", "CSS", "Data Analysis", "Automated Testing"],
    companyWebsite: "https://www.theforage.com"
  },
  {
    id: "commonwealth-bank",
    company: "Commonwealth Bank",
    position: "Software Engineering Intern (Virtual)",
    startDate: "2026-06",
    endDate: "2026-06",
    responsibilities: [
      "Experienced the responsibilities of a Software Engineer by enhancing backend and frontend applications to implement new features within a simulated enterprise banking environment.",
      "Leveraged C#, .NET, React, Redux, TypeScript, MongoDB, Postman, Git, npm, and xUnit to build, validate, and maintain scalable full-stack application components."
    ],
    achievements: [
      "Strengthened full-stack software engineering expertise by completing 4 engineering modules, integrating 10+ technologies, 2 application layers (frontend & backend), and industry-standard testing and Git workflows."
    ],
    technologies: ["C#", ".NET", "React", "TypeScript", "MongoDB", "xUnit"],
    companyWebsite: "https://www.commbank.com.au"
  },
  {
    id: "lpu-nextgen-networking",
    company: "Lovely Professional University",
    position: "NextGen Networking Summer Intern",
    startDate: "2025-06",
    endDate: "2025-07",
    responsibilities: [
      "Examined enterprise networking principles by designing scalable virtual network infrastructures and optimizing IP address allocation using subnetting, supernetting, and VLSM techniques.",
      "Implemented virtual enterprise network environments using Cisco Packet Tracer, TCP/IP, OSI Model, Routing Protocols, Switching, IP Addressing, and Network Troubleshooting to simulate real-world communication systems."
    ],
    achievements: [
      "Validated 15+ virtual networking scenarios by configuring multi-router topologies, achieving 100% successful end-to-end packet transmission while strengthening expertise in routing, switching, and enterprise network optimization."
    ],
    technologies: ["Cisco Packet Tracer", "TCP/IP", "VLSM / Subnetting", "Routing Protocols", "Switching", "Network Troubleshooting"],
    companyWebsite: "https://www.lpu.in"
  }
];

export const INITIAL_TRAININGS: Training[] = [
  {
    id: "t1",
    title: "NEXTGEN NETWORKING: Summer Internship in Computer Networks",
    provider: "Lovely Professional University",
    duration: "Jun 2025 – Jul 2025",
    skillsLearned: ["Subnetting / VLSM", "Cisco Packet Tracer", "Routing Protocols", "Switching", "TCP/IP"],
    certificateUrl: "#",
    projectsBuilt: ["Virtual Enterprise Network Topology Design"]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1",
    title: "HackerRank 5-Star Rating in Java",
    description: "Achieved a 5-Star rating in Java on HackerRank, demonstrating strong proficiency in object-oriented programming and problem-solving.",
    date: "2025-10",
    images: ["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "a2",
    title: "Top 15 out of 400+ Teams",
    description: "Led a multidisciplinary team to secure a Top 15 position among 400+ teams at Lovely Professional University by developing the AI-powered KISSANMITRA agriculture platform.",
    date: "2025-10",
    images: ["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "a3",
    title: "Vocational Certification in Blender Animation",
    description: "Completed a Vocational Certification in Blender Animation from the Kerala State Board, gaining foundational skills in 3D modeling, animation, and rendering.",
    date: "2025-06",
    images: ["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"]
  }
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: "ed1",
    institution: "Lovely Professional University",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    startYear: "2023",
    endYear: "Present",
    cgpa: "7.20",
    courses: ["Object Oriented Programming", "Data Structures & Algorithms", "Database Schema Design", "Software Engineering"],
    projects: ["CHRONOS.WMS Frame Interpolation", "KISSANMITRA AI Agricultural Platform"]
  },
  {
    id: "ed2",
    institution: "Sarvodaya HS School (Eachome, Kerala)",
    degree: "Intermediate",
    startYear: "2020",
    endYear: "2022",
    cgpa: "9.41",
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    projects: []
  },
  {
    id: "ed3",
    institution: "Sarvodaya HS School (Eachome, Kerala)",
    degree: "Matriculation",
    startYear: "2019",
    endYear: "2020",
    cgpa: "9.89",
    courses: ["General Science", "Mathematics", "Social Studies"],
    projects: []
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Designing LangGraph Agents that Don't Infinite-Loop",
    slug: "designing-langgraph-agents",
    summary: "A practical guide to implementing strict state thresholds, exit nodes, and history summaries to build robust cyclic agent workflows.",
    content: `
# Designing LangGraph Agents that Don't Infinite-Loop

Cyclic agent structures are extremely powerful because they simulate a human's edit-review-rework process. However, without strict constraints, they are prone to infinite execution loops—wasting API credits and causing crashes.

Here is how to design state graphs that execute reliably.

## 1. Introduce an Execution Counter

Always keep an atomic counter in your state keys. If the loop count exceeds a safe threshold (e.g., 5 or 10), route the state to a fallback exit node rather than continuing the cycle.

\`\`\`typescript
interface AgentState {
  messages: string[];
  executionCount: number;
}
\`\`\`

## 2. Implement Summarized History

LLMs fail when their context window gets overloaded with repetitive prompts. Summarize older steps of the history before forwarding to the next prompt cycle.

### Checklist for Resilient Loops
* Use bounded loops with maximum counters.
* Enforce schema validations on agent tools.
* Always log loop metrics to track performance.

Feel free to checkout the [OmniAgent](https://github.com) codebase for a live example of LangGraph states!
`,
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    category: "AI",
    tags: ["AI", "LangGraph", "TypeScript"],
    isDraft: false,
    views: 432,
    publishedAt: "2026-06-15T12:00:00Z"
  },
  {
    id: "b2",
    title: "Next.js 16 Performance Optimizations: The Ultimate Checklist",
    slug: "nextjs-16-performance",
    summary: "How to leverage server component streaming, selective hydration, and asset compilation to achieve a perfect 100 Lighthouse score.",
    content: `
# Next.js 16 Performance Optimizations

Next.js 16 delivers incredible features for building fast, user-centric web apps. Let's cover key optimizations.

## 1. Streaming Layouts

By nesting \`loading.tsx\` inside layout boundaries, Next.js streams components as they resolve, showing placeholders and keeping interactive metrics high.

## 2. Dynamic Image Sizing

Always use the \`<Image>\` tag with appropriate \`sizes\` specifications to prevent layout shifts.

\`\`\`tsx
import Image from 'next/image';

<Image 
  src="/hero.jpg" 
  alt="Hero" 
  width={800} 
  height={400} 
  priority 
/>
\`\`\`
`,
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800",
    category: "React",
    tags: ["React", "Next.js", "Performance"],
    isDraft: false,
    views: 290,
    publishedAt: "2026-06-20T12:00:00Z"
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    name: "Sarah Jenkins",
    email: "sarah@techpartners.com",
    subject: "Collaboration on AI Agent Architecture",
    message: "Hey Sourav, saw your projects. We are interested in integrating similar machine learning modules. Let's hop on a brief Zoom call next Tuesday!",
    isRead: false,
    isImportant: true,
    isArchived: false,
    created_at: new Date(Date.now() - 100000000).toISOString()
  }
];
