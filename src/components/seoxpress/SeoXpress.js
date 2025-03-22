import React, { useState, useRef, useEffect } from "react";
import "./seoxpress.css";

const SeoXPress = () => {
  
  const [inputKeyword, setInputKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState([]);
  const [groupedKeywords, setGroupedKeywords] = useState({});
  const [category, setCategory] = useState("");
  const [showToast, setShowToast] = useState({ message: "", type: "" });
  const [showModal, setShowModal] = useState(false);
  const [customFileName, setCustomFileName] = useState("");
  const [copyError, setCopyError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const [analytics, setAnalytics] = useState({ keywords: {}, categories: {} });
  const [showExportPreview, setShowExportPreview] = useState(false);
  
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  
  const [filterGroup, setFilterGroup] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("asc");
  
  const [exportOptions, setExportOptions] = useState({
    keywords: true,
    metrics: false,
    groups: false,
  });
  
  const [generationTriggered, setGenerationTriggered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("keywordHistory")) || []
  );
  
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const keywordRef = useRef(null);
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const keywordList = {
    "Digital Marketing": [
      "digital marketing strategies",
      "online marketing techniques",
      "social media marketing tips",
      "SEO best practices 2023",
      "content marketing ideas",
      "email marketing campaigns",
      "PPC advertising guide",
      "affiliate marketing programs",
      "digital marketing courses online",
      "digital marketing certification",
      "influencer marketing trends",
      "digital marketing tools",
      "online advertising platforms",
      "digital marketing for small businesses",
      "digital marketing analytics",
      "digital marketing career path",
      "digital marketing freelancing",
      "digital marketing agency services",
      "digital marketing for e-commerce",
      "digital marketing ROI optimization",
      "digital marketing trends 2023",
      "digital marketing for beginners",
      "advanced digital marketing strategies",
      "digital marketing case studies",
      "digital marketing budget planning",
      "digital marketing automation tools",
      "digital marketing for startups",
      "digital marketing for bloggers",
      "digital marketing for local businesses",
      "digital marketing for B2B",
      "digital marketing for B2C",
      "digital marketing for SaaS companies",
      "digital marketing for influencers",
      "digital marketing for nonprofits",
      "digital marketing for real estate",
      "digital marketing for healthcare",
      "digital marketing for education",
      "digital marketing for travel industry",
      "digital marketing for fashion brands",
      "digital marketing for food industry",
      "digital marketing for tech companies",
      "digital marketing for finance sector",
      "digital marketing for automotive industry",
      "digital marketing for fitness brands",
      "digital marketing for beauty industry",
      "digital marketing for gaming industry",
      "digital marketing for entertainment industry",
      "digital marketing for event management",
      "digital marketing for hospitality industry",
      "digital marketing for retail businesses",
    ],
    "Data Science": [
      "data science courses online",
      "data science certification",
      "data science career path",
      "data science for beginners",
      "data science tools",
      "data science programming languages",
      "data science vs machine learning",
      "data science projects for portfolio",
      "data science salary trends",
      "data science job opportunities",
      "data science for business analytics",
      "data science for healthcare",
      "data science for finance",
      "data science for marketing",
      "data science for e-commerce",
      "data science for startups",
      "data science for big data",
      "data science for AI",
      "data science for IoT",
      "data science for cloud computing",
      "data science for cybersecurity",
      "data science for blockchain",
      "data science for cryptocurrency",
      "data science for renewable energy",
      "data science for sustainability",
      "data science for government",
      "data science for nonprofits",
      "data science for education",
      "data science for research",
      "data science for social media",
      "data science for gaming",
      "data science for entertainment",
      "data science for sports analytics",
      "data science for logistics",
      "data science for supply chain",
      "data science for manufacturing",
      "data science for retail",
      "data science for real estate",
      "data science for agriculture",
      "data science for energy sector",
      "data science for telecommunications",
      "data science for automotive industry",
      "data science for aerospace",
      "data science for defense",
      "data science for space exploration",
      "data science for climate change",
      "data science for disaster management",
      "data science for public health",
      "data science for genomics",
      "data science for robotics",
      "data science bootcamps",
      "SQL for data analysis",
      "data visualization techniques",
      "Python vs. R for data science",
      "big data technologies",
      "data pipeline automation",
      "predictive analytics use cases",
      "cloud data warehouses",
      "data ethics and governance",
      "machine learning pipelines",
      "ETL vs. ELT processes",
      "data modeling best practices",
      "data quality management",
      "data storytelling techniques",
      "data preprocessing methods",
      "advanced statistical analysis",
      "Bayesian inference models",
      "open-source data science tools",
      "data engineering roles and skills",
      "large-scale data processing",
    ],
    "Web Development": [
      "web development courses online",
      "web development certification",
      "web development career path",
      "web development for beginners",
      "web development tools",
      "web development programming languages",
      "web development vs software engineering",
      "web development projects for portfolio",
      "web development salary trends",
      "web development job opportunities",
      "web development for e-commerce",
      "web development for startups",
      "web development for small businesses",
      "web development for bloggers",
      "web development for nonprofits",
      "web development for education",
      "web development for healthcare",
      "web development for finance",
      "web development for real estate",
      "web development for travel industry",
      "web development for fashion brands",
      "web development for food industry",
      "web development for tech companies",
      "web development for automotive industry",
      "web development for fitness brands",
      "web development for beauty industry",
      "web development for gaming industry",
      "web development for entertainment industry",
      "web development for event management",
      "web development for hospitality industry",
      "web development for retail businesses",
      "web development for online stores",
      "web development for service-based businesses",
      "web development for product-based businesses",
      "web development for global markets",
      "web development for multilingual audiences",
      "web development for mobile apps",
      "web development for software companies",
      "web development for IT services",
      "web development for consulting firms",
      "web development for legal services",
      "web development for accounting firms",
      "web development for insurance companies",
      "web development for banking sector",
      "web development for investment firms",
      "web development for cryptocurrency",
      "web development for blockchain technology",
      "web development for AI companies",
      "web development for machine learning",
      "web development for data science",
      "full-stack developer roadmap",
      "JavaScript frameworks 2025",
      "React.js tutorials",
      "Next.js vs. Angular",
      "web app performance optimization",
      "responsive web design",
      "Progressive Web Apps (PWA)",
      "API integration tips",
      "frontend developer salary",
      "HTML5 and CSS3 best practices",
      "modern web development trends",
      "headless CMS integration",
      "JavaScript performance optimization",
      "single-page application architecture",
      "RESTful API design best practices",
      "GraphQL implementation tips",
      "CSS Grid vs. Flexbox",
      "TypeScript adoption trends",
      "static site generation (SSG)",
      "server-side rendering (SSR)",
      "SEO for modern web apps",
      "web accessibility (WCAG) compliance",
      "WebAssembly use cases",
      "state management in React.js",
      "cross-browser compatibility strategies",
      "JAMstack development patterns",
      "API-first development approaches",
      "full-stack JavaScript frameworks",
      "hybrid mobile app development",
      "component-based UI libraries",
      "micro-frontends architecture",
      "web performance optimization tools",
      "Webpack and module bundlers",
      "Lighthouse performance audits",
      "critical CSS strategies",
      "cross-platform app frameworks",
      "code-splitting techniques",
      "web animation with CSS and JS",
      "cloud-based web hosting solutions",
      "static site security practices",
      "Content Delivery Network (CDN) integration",
      "web standards and best practices",
      "responsive typography techniques",
      "web app scalability planning",
      "frontend monitoring and logging",
      "modern CSS methodologies (BEM, OOCSS)",
      "advanced CSS animations with keyframes",
      "open-source frontend libraries",
    ],
    "Artificial Intelligence (AI)": [
      "AI courses online",
      "AI certification",
      "AI career path",
      "AI for beginners",
      "AI tools",
      "AI programming languages",
      "AI vs machine learning",
      "AI projects for portfolio",
      "AI salary trends",
      "AI job opportunities",
      "AI for business analytics",
      "AI for healthcare",
      "AI for finance",
      "AI for marketing",
      "AI for e-commerce",
      "AI for startups",
      "AI for big data",
      "AI for IoT",
      "AI for cloud computing",
      "AI for cybersecurity",
      "AI for blockchain",
      "AI for cryptocurrency",
      "AI for renewable energy",
      "AI for sustainability",
      "AI for government",
      "AI for nonprofits",
      "AI for education",
      "AI for research",
      "AI for social media",
      "AI for gaming",
      "AI for entertainment",
      "AI for sports analytics",
      "AI for logistics",
      "AI for supply chain",
      "AI for manufacturing",
      "AI for retail",
      "AI for real estate",
      "AI for agriculture",
      "AI for energy sector",
      "AI for telecommunications",
      "AI for automotive industry",
      "AI for aerospace",
      "AI for defense",
      "AI for space exploration",
      "AI for climate change",
      "AI for disaster management",
      "AI for public health",
      "AI for genomics",
      "AI for robotics",
      "AI for smart homes",
      "AI developer jobs",
      "machine learning engineer salary",
      "deep learning techniques",
      "AI model training",
      "Python for machine learning",
      "AI in business automation",
      "Natural Language Processing (NLP)",
      "AI-based applications",
      "reinforcement learning algorithms",
      "computer vision systems",
      "TensorFlow tutorials",
      "AI-driven data analysis",
      "image recognition AI",
      "AI-powered chatbots",
      "AI project management",
      "AI data labeling services",
      "machine learning datasets",
      "AI for predictive analytics",
      "Automated Machine Learning (AutoML)",
      "Python vs. R for AI",
      "AI model deployment",
      "AI algorithm optimization",
      "natural language understanding",
      "AI and deep neural networks",
      "computer vision object detection",
      "sentiment analysis AI",
      "AI-driven automation tools",
      "edge AI development",
      "AI job market trends",
      "ethical AI implementation",
      "AI research opportunities",
      "AI for natural image processing",
      "AI-powered voice assistants",
      "AI bias detection",
      "AI hyperparameter tuning",
      "real-time AI analytics",
      "AI-powered sentiment analysis",
      "AI in supply chain optimization",
      "AI-based predictive maintenance",
      "AI-driven personalization",
      "AI model interpretability",
      "AI in financial services",
      "AI training infrastructure",
      "computer vision frameworks",
      "AI in smart cities",
      "AI model benchmarking",
      "AI regulation and compliance",
      "AI-driven decision-making",
      "transfer learning in AI",
      "data augmentation in AI",
      "Explainable AI (XAI) techniques",
      "AI performance evaluation",
      "AI model versioning",
      "deep learning libraries",
      "AI ethics and guidelines",
    ],
    Cybersecurity: [
      "cybersecurity courses online",
      "cybersecurity certification",
      "cybersecurity career path",
      "cybersecurity for beginners",
      "cybersecurity tools",
      "cybersecurity programming languages",
      "cybersecurity vs ethical hacking",
      "cybersecurity projects for portfolio",
      "cybersecurity salary trends",
      "cybersecurity job opportunities",
      "cybersecurity for business analytics",
      "cybersecurity for healthcare",
      "cybersecurity for finance",
      "cybersecurity for marketing",
      "cybersecurity for e-commerce",
      "cybersecurity for startups",
      "cybersecurity for big data",
      "cybersecurity for AI",
      "cybersecurity for IoT",
      "cybersecurity for cloud computing",
      "cybersecurity for blockchain",
      "cybersecurity for cryptocurrency",
      "cybersecurity for renewable energy",
      "cybersecurity for sustainability",
      "cybersecurity for government",
      "cybersecurity for nonprofits",
      "cybersecurity for education",
      "cybersecurity for research",
      "cybersecurity for social media",
      "cybersecurity for gaming",
      "cybersecurity for entertainment",
      "cybersecurity for sports analytics",
      "cybersecurity for logistics",
      "cybersecurity for supply chain",
      "cybersecurity for manufacturing",
      "cybersecurity for retail",
      "cybersecurity for real estate",
      "cybersecurity for agriculture",
      "cybersecurity for energy sector",
      "cybersecurity for telecommunications",
      "cybersecurity for automotive industry",
      "cybersecurity for aerospace",
      "cybersecurity for defense",
      "cybersecurity for space exploration",
      "cybersecurity for climate change",
      "cybersecurity for disaster management",
      "cybersecurity for public health",
      "cybersecurity for genomics",
      "cybersecurity for robotics",
      "cybersecurity for smart homes",
      "cybersecurity certifications",
      "ethical hacking training",
      "network security solutions",
      "cyber threat analysis",
      "cloud security best practices",
      "penetration testing tools",
      "data privacy laws compliance",
      "information security analyst jobs",
      "malware protection techniques",
      "zero-trust architecture",
      "cybersecurity frameworks",
      "secure coding practices",
      "identity and access management (IAM)",
      "phishing detection software",
      "cybersecurity risk assessment",
      "cyber incident response",
      "cloud infrastructure security",
      "cybersecurity strategy development",
      "penetration testing methodologies",
      "cyber forensics investigation",
      "endpoint detection and response (EDR)",
      "cyber threat intelligence sharing",
      "security operations center (SOC)",
      "digital forensics tools",
      "data breach prevention",
      "cybersecurity policy frameworks",
      "secure DevOps practices",
      "multi-factor authentication (MFA)",
      "security automation platforms",
      "ransomware prevention strategies",
      "cloud-native security",
      "data encryption techniques",
      "compliance and audit readiness",
      "incident management lifecycle",
      "web application security testing",
      "cyber insurance best practices",
      "network vulnerability scanning",
      "cyber threat modeling",
      "security awareness training",
      "secure API design",
      "cybersecurity governance frameworks",
      "third-party risk management",
      "zero-day vulnerability protection",
      "security information and event management (SIEM)",
      "cyber resilience strategies",
      "mobile application security",
      "critical infrastructure protection",
      "cyber risk mitigation",
    ],
    "Cloud Computing": [
      "cloud computing courses online",
      "cloud computing certification",
      "cloud computing career path",
      "cloud computing for beginners",
      "cloud computing tools",
      "cloud computing programming languages",
      "cloud computing vs data science",
      "cloud computing projects for portfolio",
      "cloud computing salary trends",
      "cloud computing job opportunities",
      "cloud computing for business analytics",
      "cloud computing for healthcare",
      "cloud computing for finance",
      "cloud computing for marketing",
      "cloud computing for e-commerce",
      "cloud computing for startups",
      "cloud computing for big data",
      "cloud computing for AI",
      "cloud computing for IoT",
      "cloud computing for cybersecurity",
      "cloud computing for blockchain",
      "cloud computing for cryptocurrency",
      "cloud computing for renewable energy",
      "cloud computing for sustainability",
      "cloud computing for government",
      "cloud computing for nonprofits",
      "cloud computing for education",
      "cloud computing for research",
      "cloud computing for social media",
      "cloud computing for gaming",
      "cloud computing for entertainment",
      "cloud computing for sports analytics",
      "cloud computing for logistics",
      "cloud computing for supply chain",
      "cloud computing for manufacturing",
      "cloud computing for retail",
      "cloud computing for real estate",
      "cloud computing for agriculture",
      "cloud computing for energy sector",
      "cloud computing for telecommunications",
      "cloud computing for automotive industry",
      "cloud computing for aerospace",
      "cloud computing for defense",
      "cloud computing for space exploration",
      "cloud computing for climate change",
      "cloud computing for disaster management",
      "cloud computing for public health",
      "cloud computing for genomics",
      "cloud computing for robotics",
      "cloud computing for smart homes",
      "AWS certification training",
      "cloud architect salary",
      "Microsoft Azure skills",
      "Google Cloud Platform tutorials",
      "multi-cloud deployment strategies",
      "cloud-native applications",
      "serverless computing examples",
      "DevOps in cloud environments",
      "cloud security best practices",
      "hybrid cloud solutions",
      "cloud migration strategies",
      "Infrastructure as Code (IaC)",
      "Kubernetes cluster management",
      "cloud service orchestration",
      "cloud networking fundamentals",
      "cloud storage optimization",
      "SaaS, PaaS, IaaS explained",
      "cloud cost management tools",
      "edge computing in the cloud",
      "cloud disaster recovery solutions",
      "elastic computing models",
      "cloud-based AI and ML solutions",
      "data governance in the cloud",
      "multi-cloud data integration",
      "serverless microservices architecture",
      "virtual desktop infrastructure (VDI)",
      "cloud-native development pipelines",
      "cloud monitoring and observability",
      "continuous delivery in cloud environments",
      "cloud-based data lakes",
      "serverless security best practices",
      "cloud API management platforms",
      "cloud-native app modernization",
      "cloud governance frameworks",
      "cloud-native networking concepts",
      "cloud migration cost optimization",
      "multi-cloud load balancing",
      "cloud-based analytics tools",
      "cloud-native software engineering",
      "cloud-first development models",
      "cloud computing career roadmap",
      "cloud DevOps automation",
      "serverless workflow orchestration",
      "distributed cloud architecture",
      "cloud workload security best practices",
      "multi-cloud strategy for enterprises",
      "data sovereignty in cloud environments",
      "cloud-native CI/CD pipelines",
      "green computing in the cloud",
      "cloud innovation frameworks",
    ],
    "Frontend Development": [
      "best frontend development frameworks",
      "modern frontend development techniques",
      "frontend developer roadmap 2025",
      "HTML CSS JavaScript best practices",
      "responsive web design tips",
      "web development trends 2025",
      "Next.js vs React.js comparison",
      "frontend coding challenges",
      "performance optimization for frontend",
      "UI component libraries for developers",
      "CSS best practices for developers",
      "fast-loading website techniques",
      "frontend developer skills checklist",
      "how to become a frontend developer",
      "best tools for frontend development",
      "JavaScript frameworks for beginners",
      "frontend vs backend development",
      "web design vs frontend development",
      "mobile-first web development strategies",
      "SEO for frontend developers",
      "Progressive Web Apps (PWA) development",
      "state management in React and Vue",
      "frontend security best practices",
      "AI-powered frontend development",
      "web performance testing tools",
      "best CSS frameworks 2025",
      "frontend interview questions and answers",
      "frontend career growth strategies",
      "code splitting and lazy loading",
      "web accessibility for developers",
      "server-side rendering vs client-side",
      "JAMstack development guide",
      "JavaScript libraries every developer should know",
      "CSS-in-JS vs traditional CSS",
      "frontend design systems and patterns",
      "UX/UI design for frontend developers",
      "frontend development automation tools",
      "Tailwind CSS vs Bootstrap",
      "best frontend GitHub repositories",
      "writing clean code in frontend development",
      "frontend API integration best practices",
      "creating interactive web elements",
      "frontend debugging techniques",
      "single-page applications (SPA) development",
      "web animation techniques for frontend",
      "managing frontend project workflows",
      "GraphQL for frontend developers",
      "frontend freelancing opportunities",
      "CSS grid vs flexbox comparison",
      "next-gen frontend coding methodologies",
    ],
    "3D Web Animation": [
      "3D web animation with CSS",
      "web animation libraries comparison",
      "3D animations for website UI",
      "create 3D animations in React",
      "WebGL vs Three.js vs Babylon.js",
      "best 3D animation tools for web",
      "CSS3 animation techniques for developers",
      "3D web animations with Three.js",
      "interactive animations for websites",
      "advanced CSS animation tricks",
      "web animation trends 2025",
      "parallax scrolling animation guide",
      "performance optimization for web animations",
      "using SVG for web animations",
      "creating 3D interactive websites",
      "AI-powered web animation tools",
      "JavaScript animation libraries comparison",
      "CSS keyframes animation tutorial",
      "3D motion graphics for web developers",
      "UX/UI impact of web animations",
      "custom animations with GSAP",
      "WebGL shader programming for 3D effects",
      "animating UI elements for better UX",
      "CSS transitions vs keyframes",
      "3D typography animation techniques",
      "website animation best practices",
      "scroll-triggered animations for websites",
      "JavaScript animation performance tips",
      "creating micro-interactions with CSS",
      "Blender vs Three.js for web animation",
      "3D car models for web projects",
      "best websites with 3D animation",
      "web-based VR and AR animations",
      "creating looping animations in CSS",
      "CSS animations vs JavaScript animations",
      "web animation frameworks in 2025",
      "best resources to learn 3D web animation",
      "lightweight animation libraries for web",
      "implementing Lottie animations",
      "custom SVG animations for web",
      "motion UI frameworks for websites",
      "interactive product showcases using 3D",
      "AI-generated animations for web design",
      "performance testing for animated web pages",
      "CSS animation easing functions explained",
      "web animation inspiration sites",
      "create animated UI components",
      "animating backgrounds in web design",
      "interactive storytelling with web animation",
      "future of 3D web animation",
    ],
    "CSS3 Keyframes & Animation": [
      "mastering CSS3 keyframes animations",
      "best CSS animation libraries",
      "CSS animation tutorials for beginners",
      "smooth scrolling animations in CSS",
      "keyframe animation timing functions",
      "CSS hover animation effects",
      "parallax effects with CSS",
      "best CSS3 animation examples",
      "CSS animation cheat sheet",
      "web animations with only CSS",
      "animating SVGs with CSS",
      "performance-friendly CSS animations",
      "3D transformations using CSS",
      "step-by-step CSS keyframe animations",
      "CSS animation frameworks overview",
      "adding delay in CSS animations",
      "CSS animations vs JavaScript animations",
      "CSS keyframe animations for buttons",
      "CSS animations for website navigation",
      "creating loaders using CSS animations",
      "implementing custom CSS transitions",
      "CSS animation timeline concepts",
      "hover effects with CSS keyframes",
      "animating text with CSS keyframes",
      "using CSS variables in animations",
      "CSS sprite animations tutorial",
      "CSS transitions vs keyframes comparison",
      "looping animations with CSS",
      "advanced CSS keyframe properties",
      "creating pulse effects using CSS",
      "CSS 3D transforms and animations",
      "best practices for smooth animations",
      "CSS animations for dark mode transitions",
      "optimizing CSS animations for performance",
      "how to create a CSS keyframe animation",
      "animated progress bars using CSS",
      "combining CSS animations and JavaScript",
      "scroll animations using CSS only",
      "creating neon glow effects with CSS",
      "responsive animations in CSS3",
      "CSS animations for mobile UI",
      "best websites using CSS animations",
      "CSS3 animation generator tools",
      "floating elements using CSS keyframes",
      "CSS flip card animations",
      "custom bouncing effects in CSS",
      "creating animated gradient backgrounds",
      "how to use animation-fill-mode in CSS",
      "CSS transition timing functions explained",
      "best CSS animation hacks for web designers",
    ],
    "React.js & JavaScript": [
      "React.js performance optimization",
      "JavaScript best practices for 2025",
      "state management in React apps",
      "React.js interview questions and answers",
      "how to optimize React applications",
      "Next.js vs React.js – key differences",
      "JavaScript frameworks comparison",
      "async/await vs Promises in JavaScript",
      "React hooks best practices",
      "understanding JavaScript ES6+ features",
      "building real-time apps with React",
      "JavaScript functional programming guide",
      "server-side rendering with React.js",
      "JavaScript debugging techniques",
      "event handling in React",
      "React component lifecycle explained",
      "best React UI component libraries",
      "JavaScript security best practices",
      "React.js state management comparison",
      "JavaScript closures and scope explained",
      "React.js for beginners guide",
      "best JavaScript IDEs for developers",
      "optimizing JavaScript code performance",
      "JavaScript vs TypeScript – which is better",
      "advanced React.js component patterns",
      "JavaScript design patterns guide",
      "animating UI in React with GSAP",
      "understanding React context API",
      "handling API calls in React",
      "JavaScript libraries every developer should know",
    ],
    "AI-Powered Web Design": [
      "AI-driven website design tools",
      "how AI is transforming web design",
      "AI-generated website layouts",
      "AI-powered UX/UI design trends",
      "best AI tools for web designers",
      "AI in frontend development",
      "machine learning in web design",
      "AI-powered chatbots for websites",
      "AI-driven personalized user experiences",
      "how AI improves web accessibility",
      "the future of AI in web design",
      "best AI-driven website builders",
      "AI-generated color schemes for web design",
      "AI-driven design automation tools",
      "AI-powered image optimization",
      "AI-based UX research tools",
      "AI-generated website templates",
      "AI-enhanced graphic design software",
      "AI-powered conversion rate optimization",
      "AI and predictive analytics in web design",
      "AI-driven website performance testing",
      "AI-powered eCommerce website design",
      "how AI improves website load speed",
      "AI-based website heatmaps",
      "AI in responsive web design",
      "AI-powered dynamic content generation",
      "how AI automates UI testing",
      "AI-driven A/B testing for websites",
      "AI-generated typography trends",
      "AI-powered website personalization",
      "AI-driven wireframe generators",
      "best AI UX research tools",
      "AI-powered automated coding assistants",
      "AI in website security and fraud detection",
      "AI-generated visual storytelling in web design",
      "AI-driven user behavior tracking",
      "AI and voice search optimization",
      "AI-powered video content generation",
      "AI-assisted mobile-first web design",
      "AI-powered accessibility tools for the web",
      "AI-generated UI components for React",
      "AI in motion design for websites",
      "AI-driven CSS layout optimization",
      "AI-based adaptive website layouts",
      "AI-generated dynamic user interfaces",
      "AI-powered no-code website builders",
      "how AI improves dark mode UI",
      "AI-driven interactive storytelling in web design",
      "AI-powered automated website testing",
      "ethical considerations of AI in web design",
    ],
    "Web3 & Blockchain Development": [
      "Web3 development tutorial for beginners",
      "blockchain in web development",
      "smart contracts with Solidity",
      "Web3 vs traditional web development",
      "how to build a decentralized application (DApp)",
      "Ethereum smart contract development",
      "best Web3 frameworks for developers",
      "NFT marketplace development guide",
      "how to connect React.js with Web3",
      "metaverse development with Web3",
      "best blockchain programming languages",
      "AI-powered blockchain applications",
      "Web3 gaming development guide",
      "decentralized finance (DeFi) website development",
      "Web3 and AI integration",
      "best Web3 hosting solutions",
      "crypto wallet integration for web apps",
      "how to create a Web3 token",
      "Web3 UI/UX design best practices",
      "smart contract security best practices",
      "IPFS and decentralized storage for websites",
      "how to develop a DAO website",
      "best Web3 authentication methods",
      "layer 2 solutions in Web3 development",
      "how to build a DeFi dashboard",
      "AI-powered blockchain analytics",
      "Web3 data privacy best practices",
      "decentralized identity (DID) for websites",
      "Web3 SEO strategies for decentralized sites",
      "the role of AI in blockchain technology",
      "Web3-based digital marketing strategies",
      "cross-chain interoperability solutions",
      "Web3 security threats and mitigation",
      "zero-knowledge proofs in Web3",
      "how to develop a decentralized eCommerce platform",
      "how NFTs are changing web development",
      "building a Web3 social media platform",
      "using Web3.js for blockchain applications",
      "decentralized cloud computing for developers",
      "the future of Web3 job opportunities",
      "integrating blockchain into mobile applications",
      "AI-generated smart contracts",
      "building a decentralized chat application",
      "the role of Web3 in cybersecurity",
      "Web3 app monetization strategies",
      "Web3 decentralized search engines",
      "how to deploy smart contracts on Polygon",
      "best resources to learn Web3 development",
      "AI-driven blockchain analytics tools",
      "sustainable blockchain development practices",
    ],
    "UI/UX & Digital Experience Optimization": [
      "UI/UX design trends for 2025",
      "best UI/UX design tools",
      "dark mode UI best practices",
      "AI-powered UI/UX optimization",
      "micro-interactions in UX design",
      "mobile-first UI design strategies",
      "how to conduct UX research",
      "heatmaps for UI/UX analysis",
      "accessibility in UX design",
      "UX writing best practices",
      "the psychology behind UI/UX design",
      "best UI/UX prototyping tools",
      "UI animation techniques for better UX",
      "voice UI design best practices",
      "personalization in UX design",
      "the role of AI in UX research",
      "mobile UI design guidelines",
      "UX case studies for inspiration",
      "how to create an intuitive navigation system",
      "data-driven UX optimization strategies",
      "augmented reality in UX design",
      "A/B testing for UI/UX design",
      "the impact of typography on UX",
      "UX/UI design patterns every designer should know",
      "AI-powered UX testing tools",
      "minimalist UI design principles",
      "designing UX for SaaS applications",
      "UX metrics and KPIs to track",
      "gamification in UI/UX design",
      "how to improve website usability",
      "creating seamless user onboarding experiences",
      "how AI enhances customer experience in UX",
      "UX design principles for eCommerce websites",
      "UX research methodologies explained",
      "best UI color palettes for 2025",
      "how motion design improves UX",
      "data visualization best practices for UX",
      "ethical considerations in UX design",
      "the role of storytelling in UX design",
      "mobile app UX vs web UX comparison",
      "how to reduce bounce rates with better UX",
      "designing for cognitive load reduction",
      "UX strategies for conversion rate optimization",
      "emotional design in UX",
      "the impact of AI on UI/UX trends",
      "how to create an inclusive UX design",
      "the best UX design books and courses",
      "eye-tracking studies in UX research",
      "the role of neuromarketing in UX",
      "predictive UX design using AI",
    ],
    "SEO & Content Strategy": [
      "best SEO tools for 2025",
      "AI-powered content marketing strategies",
      "voice search optimization techniques",
      "how to rank on Google’s first page",
      "SEO trends for 2025",
      "Core Web Vitals and SEO",
      "AI-generated SEO content strategies",
      "structured data and schema markup for SEO",
      "how to optimize images for SEO",
      "technical SEO checklist for developers",
      "AI-powered SEO automation tools",
      "SEO-friendly website architecture",
      "video SEO strategies for YouTube and Google",
      "the impact of AI on search engine rankings",
      "content clustering strategies for better SEO",
      "local SEO strategies for small businesses",
      "link building strategies for high authority",
      "how to create pillar content for SEO",
      "AI-driven keyword research tools",
      "how to optimize for featured snippets",
    ],
    "Metaverse Development": [
      "build metaverse application",
      "metaverse vs virtual reality",
      "tools for metaverse development",
      "AI in metaverse",
      "Web3 integration in metaverse",
      "virtual reality in metaverse",
      "create metaverse avatars",
      "3D modeling for metaverse",
      "NFTs in metaverse",
      "blockchain in metaverse",
      "develop metaverse game",
      "metaverse engines",
      "AR and VR in metaverse",
      "smart contracts in metaverse",
      "metaverse UI/UX",
      "immersive metaverse experiences",
      "AI-powered NPCs",
      "spatial computing in metaverse",
      "monetize metaverse project",
      "metaverse marketing",
      "cloud computing for metaverse",
      "AI chatbots in metaverse",
      "decentralized identity in metaverse",
      "security in metaverse",
      "AI in metaverse economy",
      "5G in metaverse",
      "social metaverse platform",
      "cross-platform metaverse",
      "virtual real estate",
      "AI in metaverse interactions",
      "programming languages for metaverse",
      "gamification in metaverse",
      "metaverse events",
      "AI-generated content in metaverse",
      "metaverse interoperability",
      "IoT in metaverse",
      "metaverse development companies",
      "metaverse accessibility",
      "motion tracking in metaverse",
      "3D animation in metaverse",
      "AI-generated art in metaverse",
      "digital twins in metaverse",
      "AI-driven physics in metaverse",
      "optimize metaverse apps",
      "DeFi in metaverse",
      "real-time rendering in metaverse",
      "AR shopping in metaverse",
      "ethics of AI in metaverse",
      "future of metaverse technology",
    ],
    "eCommerce Development & Optimization": [
      "best eCommerce platforms 2025",
      "optimize eCommerce conversion rates",
      "AI-powered eCommerce personalization",
      "headless commerce vs traditional",
      "voice commerce trends 2025",
      "SEO for eCommerce",
      "AI product recommendations",
      "eCommerce UI/UX design",
      "live shopping on eCommerce",
      "blockchain in eCommerce security",
      "reduce cart abandonment",
      "best payment gateways",
      "AI chatbots for eCommerce",
      "AR in online shopping",
      "AI demand forecasting",
      "future of mobile commerce",
      "optimize product pages for SEO",
      "AI fraud detection in eCommerce",
      "social commerce best practices",
      "NFTs in eCommerce",
      "personalization for online stores",
      "AI supply chain optimization",
      "emerging payment technologies",
      "AI visual search for eCommerce",
      "customer data for eCommerce growth",
      "shoppable video strategy",
      "AI-generated product descriptions",
      "boost eCommerce site speed",
      "automation tools for eCommerce",
      "influencer marketing for eCommerce",
      "AI inventory management",
      "optimize eCommerce checkout",
      "5G in eCommerce",
      "AI customer support",
      "subscription-based eCommerce",
      "personalized loyalty programs",
      "omnichannel marketing",
      "AI email marketing for eCommerce",
      "cryptocurrency payments",
      "AI predictive pricing",
      "video content in eCommerce",
      "Web3 in online retail",
      "real-time analytics for eCommerce",
      "sustainability in eCommerce",
      "automation for dropshipping",
      "AI customer segmentation",
      "future of B2B eCommerce",
      "AI-generated UI for eCommerce",
      "chatbots for eCommerce engagement",
      "conversion rate optimization case studies",
    ],
    "Augmented Reality (AR) & Virtual Reality (VR) Development": [
      "best AR development tools",
      "develop AR apps for iOS and Android",
      "VR game development",
      "AI-powered AR experiences",
      "AR vs VR",
      "integrate AR in mobile apps",
      "top VR programming languages",
      "AR in eCommerce",
      "optimize AR performance",
      "machine learning in AR/VR",
      "AI-driven character interactions in VR",
      "create AR filters",
      "5G in AR/VR",
      "AR cloud computing",
      "best VR headsets 2025",
      "WebAR vs App-based AR",
      "AR in real estate",
      "AI hand tracking for VR",
      "develop VR training simulator",
      "AR in healthcare",
      "Unity for AR development",
      "AR frameworks for JavaScript",
      "VR motion sickness prevention",
      "AI in AR navigation",
      "real-time 3D rendering in AR",
      "AI-driven AR storytelling",
      "AR marketing strategies",
      "develop metaverse with AR/VR",
      "NFTs in virtual worlds",
      "blockchain in AR apps",
      "AR facial recognition",
      "best VR design software",
      "haptic feedback in VR",
      "create digital twin with AR",
      "cloud-based AR rendering",
      "AI in spatial computing",
      "AR/VR in education",
      "AI in VR simulations",
      "Web3 in AR/VR",
      "AR smart glasses applications",
      "mixed reality vs XR",
      "AI-driven AR translation",
      "AI-generated AR filters",
      "AI in AR/VR avatars",
      "AR gaming experiences",
      "AI in AR/VR interactions",
      "AR-powered social media",
      "AI object recognition in AR",
      "realistic virtual environments",
      "AI-generated content in VR",
    ],
    "Mobile App Development & Optimization": [
      "mobile app development trends 2025",
      "AI-powered app personalization",
      "optimize mobile app performance",
      "5G in mobile app development",
      "cross-platform vs native app development",
      "AI-driven mobile apps",
      "mobile app UI/UX design",
      "mobile app monetization",
      "AI chatbots in mobile apps",
      "mobile-first design principles",
      "AR features in mobile apps",
      "mobile app accessibility",
      "AI-generated app layouts",
      "optimize app loading speed",
      "frameworks for cross-platform development",
      "AI in mobile analytics",
      "mobile push notifications",
      "blockchain in mobile apps",
      "mobile gaming trends 2025",
      "cloud computing in mobile apps",
      "improve app store rankings",
      "mobile app security",
      "AI voice assistants for apps",
      "Web3 in mobile apps",
      "PWAs vs native apps",
      "AI in fintech apps",
      "mobile development tools",
      "AI-powered mobile commerce",
      "low-code vs no-code mobile apps",
      "AI app marketing strategies",
      "biometric authentication in apps",
      "future of mobile eCommerce",
      "mobile app retention strategies",
      "AI in mobile search optimization",
      "5G and cloud gaming",
      "real-time AI analytics for mobile",
      "AI health tracking apps",
      "AI in mobile advertising",
      "mobile app localization",
      "AI in app debugging",
      "AI-generated content in apps",
      "AI fraud detection in mobile",
      "AI chatbots for customer support",
      "AI recommendation engines",
      "machine learning in mobile development",
      "AI-powered app interfaces",
      "AI social media apps",
      "AI content moderation in apps",
      "AI tools for mobile development",
      "AI-powered search in apps",
    ],
    "SaaS & Cloud Computing": [
      "best SaaS business models 2025",
      "cloud-native development",
      "AI automation in SaaS",
      "develop SaaS startup",
      "best cloud platforms for SaaS",
      "scale SaaS business",
      "AI in SaaS applications",
      "optimize cloud-based software",
      "AI SaaS security",
      "SaaS vs traditional software",
      "future of cloud computing",
      "AI-powered SaaS tool",
      "multi-cloud vs hybrid cloud",
      "AI SaaS product recommendations",
      "AI in cloud cost optimization",
      "cloud-based data analytics",
      "AI in SaaS onboarding",
      "serverless vs cloud hosting",
      "cloud cybersecurity",
      "future of SaaS in AI",
      "AI workflow automation in SaaS",
      "best cloud storage for SaaS",
      "AI predictive maintenance in SaaS",
      "AI for customer retention in SaaS",
      "AI in cloud-based CRM",
      "AI fraud detection in SaaS",
      "no-code SaaS platform",
      "AI in cloud infrastructure",
      "AI assistants for businesses",
      "AI demand forecasting in SaaS",
      "AI chatbots in SaaS",
      "AI cybersecurity for cloud",
      "AI in cloud DevOps",
      "AI SaaS automation trends",
      "AI SaaS marketing automation",
      "AI SaaS personalization",
      "AI in cloud IoT",
      "AI data encryption in cloud",
      "AI in SaaS video analytics",
      "AI SaaS customer support",
      "AI in cloud HR management",
      "AI SaaS project management",
      "AI SaaS subscription optimization",
      "AI enterprise cloud solutions",
      "AI tools for SaaS development",
      "AI workflow automation in SaaS",
      "AI cloud resource allocation",
      "AI SaaS financial forecasting",
      "AI in cloud data visualization",
      "AI predictive analytics for SaaS",
    ],
    "AI & Machine Learning in Web Development": [
      "AI-powered website builders",
      "machine learning in front-end",
      "AI-generated web content",
      "AI in web design",
      "AI user behavior analytics",
      "AI website personalization",
      "AI-generated layouts",
      "machine learning in UX",
      "AI code completion tools",
      "AI in website accessibility",
      "AI SEO content generation",
      "AI in responsive design",
      "AI A/B testing",
      "machine learning for performance",
      "AI chatbot integration",
      "AI in website security",
      "AI image optimization",
      "AI voice search optimization",
      "machine learning for UI/UX",
      "AI website analytics",
      "AI dynamic content delivery",
      "AI fraud detection",
      "AI customer support",
      "AI animations for web",
      "AI eCommerce personalization",
      "AI in web accessibility",
      "AI heatmaps for tracking",
      "AI real-time translation",
      "AI dark mode and color schemes",
      "AI form validation",
      "machine learning for user intent",
      "AI predictive search",
      "AI content categorization",
      "AI recommendation engines",
      "AI auto-scaling hosting",
      "AI anti-bot security",
      "AI conversion rate optimization",
      "AI image recognition for eCommerce",
      "AI web page caching",
      "AI site audit and optimization",
      "machine learning error detection",
      "AI API integration",
      "AI front-end debugging",
      "AI interactive web experiences",
      "AI voice UI for websites",
      "AI automated sitemaps",
      "AI lazy loading",
      "AI structured data markup",
      "AI in headless CMS",
      "AI font selection for readability",
    ],
    "Web Performance Optimization & Speed Enhancement": [
      "web performance optimization 2025",
      "AI-driven website speed",
      "reduce website load time",
      "WebP vs AVIF",
      "AI caching strategies",
      "optimize JavaScript for speed",
      "best CDNs 2025",
      "AI website rendering speed",
      "lazy loading vs dynamic loading",
      "image compression for speed",
      "AI font optimization",
      "eliminate render-blocking JavaScript",
      "website speed testing tools",
      "AI CSS performance",
      "AI API response times",
      "AI resource prioritization",
      "optimize animations for UX",
      "AI CDN solutions",
      "preloading for page speed",
      "reduce server response time",
      "AI mobile-first optimization",
      "browser caching strategies",
      "AI image loading for speed",
      "AI TTFB optimization",
      "reduce HTTP requests",
      "AI dynamic resource allocation",
      "AI lazy loading scripts",
      "AI minification of CSS/JS",
      "AI web server performance",
      "AI website speed monitoring",
      "AI video compression",
      "optimize database queries",
      "AI bounce rate reduction",
      "AI progressive image loading",
      "AI adaptive image delivery",
      "AI script prioritization",
      "AI CDN performance",
      "AI website downtime reduction",
      "AI time-to-interactive optimization",
      "AI web page prefetching",
      "AI slow-loading page analysis",
      "AI predictive performance scaling",
      "AI WebAssembly optimization",
      "AI slow-loading UI fixes",
      "AI real user experience monitoring",
      "AI web security optimization",
      "AI API request optimization",
      "AI critical rendering paths",
      "AI web performance trends",
    ],
  };

  const synonymMap = {
    AI: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
    cyber: ["Cybersecurity", "Network Security", "Information Security"],
    cloud: ["Cloud Computing", "AWS", "Azure", "Google Cloud"],
    web: ["Web Development", "Frontend", "JavaScript"],
    data: ["Data Science", "Big Data", "Data Analysis"],
    digital: [
      "Digital Marketing",
      "Online Marketing",
      "Social Media Marketing",
    ],
    frontend: ["Frontend Development", "UI Development", "Client-side"],
    animation: [
      "3D Web Animation",
      "CSS3 Keyframes & Animation",
      "Motion Design",
    ],
    react: ["React.js & JavaScript", "React Development", "JS Framework"],
    web3: ["Web3 & Blockchain Development", "Decentralized Web", "Blockchain"],
    ux: [
      "UI/UX & Digital Experience Optimization",
      "User Experience",
      "Interface Design",
    ],
    seo: [
      "SEO & Content Strategy",
      "Search Engine Optimization",
      "Content Marketing",
    ],
    metaverse: ["Metaverse Development", "Virtual Worlds", "Immersive Tech"],
    ecommerce: [
      "eCommerce Development & Optimization",
      "Online Retail",
      "Digital Commerce",
    ],
    arvr: [
      "Augmented Reality (AR) & Virtual Reality (VR) Development",
      "AR/VR",
      "Mixed Reality",
    ],
    mobile: [
      "Mobile App Development & Optimization",
      "Mobile Development",
      "App Design",
    ],
    saas: ["SaaS & Cloud Computing", "Software as a Service", "Cloud Apps"],
    performance: [
      "Web Performance Optimization & Speed Enhancement",
      "Site Speed",
      "Optimization",
    ],
  };

  const calculateLevenshteinDistance = (str1, str2) => {
    const m = str1.length,
      n = str2.length;
    const dp = Array(m + 1)
      .fill()
      .map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] =
          str1[i - 1] === str2[j - 1]
            ? dp[i - 1][j - 1]
            : Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
    return 1 - dp[m][n] / Math.max(m, n);
  };

  const groupKeywords = (keywords) => {
    const groups = {
      "Courses and Certifications": [],
      "Career and Jobs": [],
      "Tools and Technologies": [],
      "Industries and Applications": [],
      "Trends and Strategies": [],
      Others: [],
    };
    keywords.forEach((keyword) => {
      const lowerKeyword = keyword.toLowerCase();
      if (
        lowerKeyword.includes("course") ||
        lowerKeyword.includes("certification") ||
        lowerKeyword.includes("bootcamp") ||
        lowerKeyword.includes("tutorial")
      )
        groups["Courses and Certifications"].push(keyword);
      else if (
        lowerKeyword.includes("career") ||
        lowerKeyword.includes("job") ||
        lowerKeyword.includes("salary") ||
        lowerKeyword.includes("freelancing") ||
        lowerKeyword.includes("interview")
      )
        groups["Career and Jobs"].push(keyword);
      else if (
        lowerKeyword.includes("tool") ||
        lowerKeyword.includes("platform") ||
        lowerKeyword.includes("framework") ||
        lowerKeyword.includes("language") ||
        lowerKeyword.includes("library")
      )
        groups["Tools and Technologies"].push(keyword);
      else if (
        lowerKeyword.includes("for ") ||
        lowerKeyword.includes("in ") ||
        lowerKeyword.includes("industry") ||
        lowerKeyword.includes("sector")
      )
        groups["Industries and Applications"].push(keyword);
      else if (
        lowerKeyword.includes("trend") ||
        lowerKeyword.includes("strategy") ||
        lowerKeyword.includes("optimization") ||
        lowerKeyword.includes("best practice")
      )
        groups["Trends and Strategies"].push(keyword);
      else groups["Others"].push(keyword);
    });
    return Object.fromEntries(
      Object.entries(groups).filter(([_, v]) => v.length)
    );
  };

  const generateKeywords = (
    restrictToCategory = "",
    useInput = inputKeyword
  ) => {
    const trimmedInput = useInput.trim();
    if (!trimmedInput) {
      setShowToast({ message: "Please enter a keyword!", type: "error" });
      setIsGenerating(false);
      setGenerationTriggered(false);
      return;
    }
    if (trimmedInput.length < 2) {
      setShowToast({
        message: "Keyword must be at least 2 characters!",
        type: "error",
      });
      setIsGenerating(false);
      setGenerationTriggered(false);
      return;
    }
    if (/[^a-zA-Z0-9\s-]/g.test(trimmedInput)) {
      setShowToast({
        message: "Only letters, numbers, spaces, and hyphens allowed!",
        type: "error",
      });
      setIsGenerating(false);
      setGenerationTriggered(false);
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      let matchedKeywords = [],
        matchedCategory = restrictToCategory;
      const searchCategories = matchedCategory
        ? { [matchedCategory]: keywordList[matchedCategory] }
        : keywordList;
      const synonyms = synonymMap[trimmedInput.toLowerCase()] || [];
      for (const synonym of [trimmedInput.toLowerCase(), ...synonyms]) {
        for (const cat in searchCategories) {
          const keywords = keywordList[cat];
          if (keywords.some((k) => k.toLowerCase().includes(synonym))) {
            matchedKeywords = [...matchedKeywords, ...keywords];
            if (!matchedCategory) matchedCategory = cat;
            break;
          }
          const fuzzyMatch = keywords.find(
            (k) => calculateLevenshteinDistance(synonym, k.toLowerCase()) > 0.8
          );
          if (fuzzyMatch) {
            matchedKeywords = [...matchedKeywords, ...keywords];
            if (!matchedCategory) matchedCategory = cat;
            break;
          }
        }
        if (matchedKeywords.length) break;
      }

      const uniqueKeywords = [...new Set(matchedKeywords)].map((k) => ({
        text: k,
        volume: Math.floor(Math.random() * 1000) + 10,
        difficulty: Math.floor(Math.random() * 100),
        tags: [],
      }));
      if (!uniqueKeywords.length) {
        setShowToast({ message: "No related keywords found!", type: "error" });
        setIsGenerating(false);
        setGenerationTriggered(false);
        return;
      }

      setGeneratedKeywords(uniqueKeywords);
      setGroupedKeywords(groupKeywords(uniqueKeywords.map((k) => k.text)));
      setCategory(matchedCategory);

      const initialExpanded = Object.keys(
        groupKeywords(uniqueKeywords.map((k) => k.text))
      ).reduce((acc, g) => ({ ...acc, [g]: true }), {});
      setExpandedGroups(initialExpanded);

      setAnalytics((prev) => ({
        keywords: {
          ...prev.keywords,
          [trimmedInput]: (prev.keywords[trimmedInput] || 0) + 1,
        },
        categories: {
          ...prev.categories,
          [matchedCategory]: (prev.categories[matchedCategory] || 0) + 1,
        },
      }));

      setHistory((prev) => {
        const newHistory = [
          {
            keyword: trimmedInput,
            category: matchedCategory,
            date: new Date().toISOString(),
          },
          ...prev.filter((h) => h.keyword !== trimmedInput),
        ].slice(0, 10);
        localStorage.setItem("keywordHistory", JSON.stringify(newHistory));
        return newHistory;
      });

      setIsGenerating(false);
      setGenerationTriggered(false);
      setIsTyping(false);
      outputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleRegenerate = () => {
    const lowerInput = inputKeyword.toLowerCase();
    const synonyms = synonymMap[lowerInput] || [];
    const allKeywords = Object.values(keywordList).flat();

    const relatedKeywords = allKeywords.filter((k) => {
      const lowerK = k.toLowerCase();
      return (
        (lowerK.includes(lowerInput) ||
          synonyms.some((s) => lowerK.includes(s.toLowerCase()))) &&
        lowerK !== lowerInput
      );
    });

    const possibleKeywords = [...synonyms, ...relatedKeywords].filter(
      (k) => k.toLowerCase() !== lowerInput
    );

    if (!possibleKeywords.length) {
      setShowToast({
        message: "No related keywords found to regenerate!",
        type: "error",
      });
      setTimeout(() => setShowToast({ message: "", type: "" }), 2000);
      return;
    }

    const newKeyword =
      possibleKeywords[Math.floor(Math.random() * possibleKeywords.length)];
    setInputKeyword(newKeyword);
    setSuggestions([]);
    setFocusedSuggestionIndex(-1);
    setGenerationTriggered(true);
    generateKeywords(selectedCategory, newKeyword);
  };

  useEffect(() => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (!inputKeyword.trim() || generationTriggered || !isTyping) {
        setSuggestions([]);
        setFocusedSuggestionIndex(-1);
        return;
      }
      const lowerInput = inputKeyword.toLowerCase();
      const allKeywordsWithCategory = Object.keys(keywordList).flatMap((cat) =>
        keywordList[cat].map((k) => ({
          keyword: k,
          category: cat,
          similarity: calculateLevenshteinDistance(lowerInput, k.toLowerCase()),
        }))
      );
      const filtered = allKeywordsWithCategory
        .filter(
          (i) =>
            i.keyword.toLowerCase().includes(lowerInput) || i.similarity > 0.7
        )
        .sort((a, b) => b.similarity - a.similarity);
      const uniqueSuggestions = [
        ...new Set(filtered.map((i) => i.keyword.toLowerCase())),
      ]
        .map((k) => filtered.find((i) => i.keyword.toLowerCase() === k))
        .slice(0, 5);
      setSuggestions(uniqueSuggestions);
      setFocusedSuggestionIndex(-1);
    }, 200);
    return () => clearTimeout(typingTimeoutRef.current);
  }, [inputKeyword, generationTriggered, isTyping]);

  const handleSuggestionClick = (suggestion) => {
    setInputKeyword(suggestion.keyword);
    setSuggestions([]);
    setFocusedSuggestionIndex(-1);
    setGenerationTriggered(true);
    setIsTyping(false);
    generateKeywords(suggestion.category, suggestion.keyword);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && focusedSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[focusedSuggestionIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setFocusedSuggestionIndex(-1);
    }
  };

  useEffect(() => {
    setInputKeyword("");
    setGeneratedKeywords([]);
    setGroupedKeywords({});
    setCategory("");
    setSuggestions([]);
    setFocusedSuggestionIndex(-1);
    setGenerationTriggered(false);
    setIsTyping(false);
    setSearchTerm("");
    setSelectedKeywords([]);
    inputRef.current?.focus();
  }, [selectedCategory]);

  const handleGenerateClick = (e) => {
    e.preventDefault();
    setSuggestions([]);
    setFocusedSuggestionIndex(-1);
    setGenerationTriggered(true);
    setIsTyping(false);
    generateKeywords(selectedCategory);
  };

  const handleInputChange = (e) => {
    setInputKeyword(e.target.value.trim());
    setIsTyping(true);
  };

  const handleCopyToClipboard = async () => {
    const text =
      exportOptions.keywords && exportOptions.metrics
        ? `${category}\n${generatedKeywords
            .map(
              (k) =>
                `${k.text} (Volume: ${k.volume}, Difficulty: ${
                  k.difficulty
                }, Tags: ${k.tags.join(", ")})`
            )
            .join("\n")}`
        : `${category}\n${generatedKeywords.map((k) => k.text).join("\n")}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setShowToast({ message: "Copied to clipboard!", type: "success" });
        setCopyError(false);
      } else {
        const textarea = keywordRef.current;
        if (!textarea) throw new Error("Textarea not available");
        textarea.value = text;
        textarea.style.display = "block";
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        textarea.style.display = "none";
        setShowToast({ message: "Copied to clipboard!", type: "success" });
        setCopyError(false);
      }
      setTimeout(() => setShowToast({ message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Copy error:", err);
      setShowToast({ message: "Failed to copy to clipboard!", type: "error" });
      setCopyError(true);
      setTimeout(() => setShowToast({ message: "", type: "" }), 3000);
    }
  };

  const handleOpenModal = () => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    setCustomFileName(`keywords-${dateStr}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCustomFileName("");
  };

  const handleDownloadAsTxt = () => {
    if (!customFileName.trim())
      return setShowToast({ message: "Enter a file name!", type: "error" });
    const fileName = customFileName.endsWith(".txt")
      ? customFileName
      : `${customFileName}.txt`;
    let text = `${category}\n`;
    if (exportOptions.keywords) {
      text += exportOptions.metrics
        ? generatedKeywords
            .map(
              (k) =>
                `${k.text} (Volume: ${k.volume}, Difficulty: ${
                  k.difficulty
                }, Tags: ${k.tags.join(", ")})`
            )
            .join("\n")
        : generatedKeywords.map((k) => k.text).join("\n");
    }
    if (exportOptions.groups) {
      text +=
        "\n\nGroups:\n" +
        Object.entries(groupedKeywords)
          .map(([g, kws]) => `${g}:\n${kws.join("\n")}`)
          .join("\n\n");
    }
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowModal(false);
    setCustomFileName("");
  };

  const toggleGroup = (group) =>
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));

  const toggleExportPreview = () => setShowExportPreview((prev) => !prev);

  const toggleFavorite = (keyword) => {
    const newFavorites = favorites.includes(keyword)
      ? favorites.filter((f) => f !== keyword)
      : [...favorites, keyword];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const filteredKeywords = () => {
    let result = generatedKeywords;
    if (searchTerm)
      result = result.filter((k) =>
        k.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (filterGroup)
      result = result.filter((k) =>
        groupedKeywords[filterGroup]?.includes(k.text)
      );
    if (sortBy === "default") {
      result = [...result].sort((a, b) => {
        return sortOrder === "asc"
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text);
      });
    } else if (sortBy !== "default") {
      result = [...result].sort((a, b) => {
        const valueA = sortBy === "volume" ? a.volume : a.difficulty;
        const valueB = sortBy === "volume" ? b.volume : b.difficulty;
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      });
    }
    return result;
  };

  const getKeywordInsights = () => {
    const totalKeywords = generatedKeywords.length;
    const avgVolume = totalKeywords
      ? Math.round(
          generatedKeywords.reduce((sum, k) => sum + k.volume, 0) /
            totalKeywords
        )
      : 0;
    const avgDifficulty = totalKeywords
      ? Math.round(
          generatedKeywords.reduce((sum, k) => sum + k.difficulty, 0) /
            totalKeywords
        )
      : 0;
    const medianVolume = totalKeywords
      ? [...generatedKeywords].sort((a, b) => a.volume - b.volume)[
          Math.floor(totalKeywords / 2)
        ].volume
      : 0;
    const difficultyDistribution = {
      easy: generatedKeywords.filter((k) => k.difficulty < 33).length,
      medium: generatedKeywords.filter(
        (k) => k.difficulty >= 33 && k.difficulty < 66
      ).length,
      hard: generatedKeywords.filter((k) => k.difficulty >= 66).length,
    };
    return {
      totalKeywords,
      avgVolume,
      avgDifficulty,
      medianVolume,
      difficultyDistribution,
    };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSuggestions([]);
        setFocusedSuggestionIndex(-1);
        setIsTyping(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const addTag = (keywordText, tag) => {
    if (!tag.trim()) return;
    setGeneratedKeywords((prev) =>
      prev.map((k) =>
        k.text === keywordText
          ? { ...k, tags: [...new Set([...k.tags, tag])] }
          : k
      )
    );
  };

  const toggleSelectKeyword = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const bulkFavorite = () => {
    const newFavorites = [...new Set([...favorites, ...selectedKeywords])];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setSelectedKeywords([]);
  };

  const bulkTag = (tag) => {
    if (!tag.trim()) return;
    setGeneratedKeywords((prev) =>
      prev.map((k) =>
        selectedKeywords.includes(k.text)
          ? { ...k, tags: [...new Set([...k.tags, tag])] }
          : k
      )
    );
    setSelectedKeywords([]);
  };

  const handleHistoryClick = (historyItem) => {
    setInputKeyword(historyItem.keyword);
    setSelectedCategory(historyItem.category);
    setGenerationTriggered(true);
    generateKeywords(historyItem.category, historyItem.keyword);
  };

  const clearHistory = () => {
    setInputKeyword("");
    setSelectedCategory("");
    setGeneratedKeywords([]);
    setHistory([]);
    localStorage.removeItem("keywordHistory");
    setShowToast({ message: "History cleared!", type: "success" });
    setTimeout(() => setShowToast({ message: "", type: "" }), 2000);
  };

  return (
    
    <div className="seo-xpress-container">
      
      <header className="seo-xpress-header">
        <h1>SEO-XPress: Keyword Generator</h1>
        <p>Discover powerful keywords across top tech niches!</p>
      </header>

      {showToast.message && (
        <div
          className={`toast-notification ${showToast.type}`}
          role="alert"
          aria-live="polite"
          key={showToast.message}
        >
          {showToast.message}
        </div>
      )}

      <form className="seo-xpress-form" onSubmit={handleGenerateClick}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category-filter">Category (Optional)</label>
            <div className="form-group-select" ref={dropdownRef}>
              <button
                type="button"
                className="custom-dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setIsDropdownOpen(!isDropdownOpen)
                }
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
              >
                {selectedCategory || "All Categories"}
                <span className="dropdown-arrow">
                  {isDropdownOpen ? "▲" : "▼"}
                </span>
              </button>
              {isDropdownOpen && (
                <ul
                  className="custom-dropdown-menu"
                  role="listbox"
                  onKeyDown={handleDropdownKeyDown}
                >
                  <li
                    className={`custom-dropdown-item ${
                      !selectedCategory ? "selected" : ""
                    }`}
                    onClick={() => handleCategorySelect("")}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleCategorySelect("")
                    }
                    tabIndex={0}
                    role="option"
                    aria-selected={!selectedCategory}
                  >
                    All Categories
                  </li>
                  {Object.keys(keywordList).map((cat) => (
                    <li
                      key={cat}
                      className={`custom-dropdown-item ${
                        selectedCategory === cat ? "selected" : ""
                      }`}
                      onClick={() => handleCategorySelect(cat)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleCategorySelect(cat)
                      }
                      tabIndex={0}
                      role="option"
                      aria-selected={selectedCategory === cat}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="form-group keyword-input-group">
            <label htmlFor="input-keyword">Enter Keyword</label>
            <input
              id="input-keyword"
              type="text"
              placeholder="e.g., AI, Web3"
              value={inputKeyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              required
            />
            {suggestions.length > 0 && (
              <ul className="suggestion-list" ref={suggestionRef}>
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className={i === focusedSuggestionIndex ? "focused" : ""}
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSuggestionClick(s)
                    }
                  >
                    {s.keyword} ({s.category})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button type="submit" className="generate-btn" disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate Keywords"}
        </button>
      </form>

      {history.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h3>Keyword History</h3>
            <button className="clear-history-btn" onClick={clearHistory}>
              Clear History
            </button>
          </div>
          <ul>
            {history.map((h, i) => (
              <li key={i} onClick={() => handleHistoryClick(h)}>
                {h.keyword} ({h.category}) -{" "}
                {new Date(h.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {generatedKeywords.length > 0 && (
        <div className="output-section" ref={outputRef}>
          <div className="keyword-insights">
            <h3>Keyword Insights</h3>
            <div className="insights-card">
              <div className="insight-item">
                <span>Total Keywords:</span>{" "}
                {getKeywordInsights().totalKeywords}
              </div>
              <div className="insight-item">
                <span>Avg. Search Volume:</span>{" "}
                {getKeywordInsights().avgVolume}
              </div>
              <div className="insight-item">
                <span>Avg. Difficulty:</span>{" "}
                {getKeywordInsights().avgDifficulty}
              </div>
              <div className="insight-item">
                <span>Median Volume:</span> {getKeywordInsights().medianVolume}
              </div>
              <div className="insight-item">
                <span>Difficulty Distribution:</span> Easy:{" "}
                {getKeywordInsights().difficultyDistribution.easy}, Medium:{" "}
                {getKeywordInsights().difficultyDistribution.medium}, Hard:{" "}
                {getKeywordInsights().difficultyDistribution.hard}
              </div>
            </div>
          </div>

          <h2>Related Keywords</h2>
          {category && <p className="category-label">Category: {category}</p>}

          <div className="controls">
            <input
              type="text"
              placeholder="Search keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
            >
              <option value="">All Groups</option>
              {Object.keys(groupedKeywords).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default Sort</option>
              <option value="volume">Search Volume</option>
              <option value="difficulty">Difficulty</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
            </button>
          </div>

          {selectedKeywords.length > 0 && (
            <div className="bulk-actions">
              <button onClick={bulkFavorite}>Favorite Selected</button>
              <input
                type="text"
                placeholder="Add tag to selected"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  bulkTag(e.target.value) &&
                  (e.target.value = "")
                }
              />
            </div>
          )}

          {isGenerating ? (
            <div className="skeleton">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div key={i} className="skeleton-item" />
                ))}
            </div>
          ) : (
            <div className="grouped-keywords">
              {Object.keys(groupedKeywords).map((g) => (
                <div key={g} className="keyword-group">
                  <div className="group-header" onClick={() => toggleGroup(g)}>
                    <span>
                      {g} ({groupedKeywords[g].length})
                    </span>
                    <span>{expandedGroups[g] ? "▼" : "▶"}</span>
                  </div>
                  {expandedGroups[g] && (
                    <ul className="keyword-list">
                      {filteredKeywords()
                        .filter((k) => groupedKeywords[g].includes(k.text))
                        .map((k, i) => (
                          <li key={i}>
                            <input
                              type="checkbox"
                              checked={selectedKeywords.includes(k.text)}
                              onChange={() => toggleSelectKeyword(k.text)}
                            />
                            <span>{k.text}</span>
                            <span>
                              Vol: {k.volume} | Diff: {k.difficulty}
                            </span>
                            <input
                              type="text"
                              placeholder="Add tag"
                              onKeyDown={(e) =>
                                e.key === "Enter" &&
                                addTag(k.text, e.target.value) &&
                                (e.target.value = "")
                              }
                            />
                            <span>{k.tags.join(", ")}</span>
                            <button
                              className={`favorite-btn ${
                                favorites.includes(k.text) ? "active" : ""
                              }`}
                              onClick={() => toggleFavorite(k.text)}
                            >
                              ★
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          <textarea
            ref={keywordRef}
            className="generated-keywords"
            style={{ position: "absolute", left: "-9999px" }}
            readOnly
          />
          {copyError && (
            <p className="copy-error-message">
              Clipboard access failed. Use Ctrl+C from the textarea.
            </p>
          )}

          <div className="favorites-section">
            <h3>Favorites ({favorites.length})</h3>
            <ul>
              {favorites.map((f, i) => (
                <li key={i}>
                  {f}
                  <button onClick={() => toggleFavorite(f)}>✕</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="seoxpress-action-buttons">
            <button className="copy-btn" onClick={handleCopyToClipboard}>
              Copy to Clipboard
            </button>
            <button className="download-btn" onClick={toggleExportPreview}>
              {showExportPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button className="download-btn" onClick={handleOpenModal}>
              Download as TXT
            </button>
            <button
              className="regenerate-btn"
              onClick={handleRegenerate}
              disabled={isGenerating}
            >
              Regenerate
            </button>
          </div>

          {showExportPreview && (
            <div className="export-preview">
              <h4>Export Preview</h4>
              <pre>
                {exportOptions.keywords &&
                  `${category}\n${
                    exportOptions.metrics
                      ? generatedKeywords
                          .map(
                            (k) =>
                              `${k.text} (Volume: ${k.volume}, Difficulty: ${
                                k.difficulty
                              }, Tags: ${k.tags.join(", ")})`
                          )
                          .join("\n")
                      : generatedKeywords.map((k) => k.text).join("\n")
                  }`}
                {exportOptions.groups &&
                  `\n\nGroups:\n${Object.entries(groupedKeywords)
                    .map(([g, kws]) => `${g}:\n${kws.join("\n")}`)
                    .join("\n\n")}`}
              </pre>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Download Keyword List</h3>
            <div className="form-group">
              <label htmlFor="file-name">File Name</label>
              <input
                type="text"
                id="file-name"
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                placeholder="e.g., keywords-20250316"
              />
            </div>
            <div className="export-options">
              <label>
                <input
                  type="checkbox"
                  checked={exportOptions.keywords}
                  onChange={() =>
                    setExportOptions((prev) => ({
                      ...prev,
                      keywords: !prev.keywords,
                    }))
                  }
                />
                Keywords
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={exportOptions.metrics}
                  onChange={() =>
                    setExportOptions((prev) => ({
                      ...prev,
                      metrics: !prev.metrics,
                    }))
                  }
                />
                Metrics
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={exportOptions.groups}
                  onChange={() =>
                    setExportOptions((prev) => ({
                      ...prev,
                      groups: !prev.groups,
                    }))
                  }
                />
                Groups
              </label>
            </div>
            <div className="modal-buttons">
              <button className="modal-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="modal-download-btn"
                onClick={handleDownloadAsTxt}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  
);

};

export default SeoXPress;