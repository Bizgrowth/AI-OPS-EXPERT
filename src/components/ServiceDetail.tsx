import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target, DollarSign, BarChart3, Globe, Users, TrendingUp, Settings, Zap, Clock, AlertTriangle, Search, Cog, ClipboardList, Monitor, FileText, RotateCcw, Headphones, Package, Italic as Crystal, Activity, UserCheck, Wrench, MessageSquare, Bot, Crosshair, Eye, Mic, Edit, ShoppingCart, GraduationCap, PieChart, Factory, Calculator, Link, BarChart, DollarSign as CostIcon, RefreshCw, TrendingUp as PerformanceIcon } from 'lucide-react';
import { downloadCaseStudy, CaseStudyData } from '../utils/downloadUtils';
import SchedulingModal from './SchedulingModal';
import SEOHead from './SEOHead';

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [showScheduling, setShowScheduling] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  // This would typically come from a CMS or API
  const serviceData = {
    'ai-strategy': {
      title: "AI Strategy & Implementation",
      subtitle: "Strategic AI Transformation for Enterprise Excellence",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
      coreValue: "I deliver intelligent business optimization that transforms how enterprise organizations operate through strategic AI implementation. My comprehensive approach combines proven methodologies with cutting-edge technology to generate measurable productivity improvements, streamline operational processes, and create systems that scale with your business growth.",
      applications: [
        {
          icon: Search,
          title: "AI Readiness Assessment",
          problem: "Organizations lacking clarity on their AI implementation readiness and potential ROI opportunities",
          solution: "Comprehensive analysis that evaluates your current operational workflows, data infrastructure, and organizational readiness for AI implementation",
          impact: "Typical AI readiness evaluation reveals 25-45% efficiency improvement opportunities",
          color: "from-orange-500 to-red-600",
          badge: "Business Process Evaluation",
          features: [
            "Business process mapping",
            "Data quality assessment", 
            "Technology infrastructure evaluation",
            "ROI potential identification",
            "Automated enhancement recommendations"
          ]
        },
        {
          icon: Cog,
          title: "Custom AI Solution Development",
          problem: "Businesses needing tailored AI solutions that integrate seamlessly with existing operations",
          solution: "Build custom AI applications designed specifically for your business needs, integrating seamlessly with existing operations to drive immediate value",
          impact: "Save 60-80% cost compared to off-the-shelf solutions with 3x better performance",
          color: "from-purple-500 to-violet-600",
          badge: "Tailored Process Speed",
          features: [
            "Custom machine learning models",
            "Process automation workflows",
            "Predictive analytics dashboards", 
            "Integration architecture",
            "Scalable deployment framework"
          ]
        },
        {
          icon: ClipboardList,
          title: "Strategic Implementation Planning",
          problem: "Companies struggling with AI adoption due to lack of structured implementation approach",
          solution: "Structured approach to AI adoption that minimizes disruption while maximizes value creation through carefully orchestrated deployment phases",
          impact: "Achieve 90% faster successful implementation with structured methodology",
          color: "from-green-500 to-emerald-600",
          badge: "Phased Rollout Strategy",
          features: [
            "Risk mitigation planning",
            "Change management protocols",
            "Staff training programs",
            "Performance monitoring setup", 
            "Success metrics definition"
          ]
        },
        {
          icon: Monitor,
          title: "Performance Optimization Dashboard",
          problem: "Organizations lacking visibility into AI system performance and optimization opportunities",
          solution: "Advanced analytics platform that tracks AI system performance, identifies optimization opportunities, and provides actionable insights for continuous improvement",
          impact: "Maximize ROI through continuous optimization yielding additional 25% performance gains",
          color: "from-blue-500 to-indigo-600",
          badge: "Real-time Monitoring System",
          features: [
            "Real-time performance monitoring",
            "Predictive maintenance alerts",
            "ROI tracking and reporting",
            "Optimization recommendations",
            "Business impact analytics"
          ]
        }
      ],
      successStories: [
        {
          story: "Reduced a SaaS company's customer onboarding time from 7 weeks to 3 days by implementing intelligent process automation, resulting in 40% increased customer satisfaction and $2.3M additional annual revenue",
          highlight: "$2.3M"
        },
        {
          story: "Automated 85% of manual document processing for a consulting firm, reducing processing time from 6 hours to 15 minutes while improving accuracy by 94% and saving $180K annually",
          highlight: "85%"
        },
        {
          story: "Improved project delivery times by 65% for a marketing agency through intelligent resource allocation and predictive project management, increasing client retention by 35%",
          highlight: "65%"
        }
      ],
      methodology: [
        "Strategic AI Assessment & Gap Analysis",
        "Custom Solution Architecture & Design", 
        "Agile Implementation & Integration",
        "Performance Monitoring & Continuous Improvement"
      ],
      deliverables: [
        "Comprehensive AI Strategy Roadmap",
        "Custom Solution Architecture",
        "Implementation Timeline & Milestones",
        "ROI Projections & KPIs",
        "Performance Monitoring Dashboard",
        "Team Training & Documentation"
      ]
    },
    'intelligent-automation': {
      title: "Intelligent Process Automation",
      subtitle: "AI-driven automation systems that handle complex decision-making and workflows",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      coreValue: "I design intelligent automation systems that go beyond simple task automation to handle complex decision-making processes. My solutions combine machine learning, natural language processing, and workflow optimization to create autonomous systems that adapt, learn, and improve operational efficiency while reducing human intervention in repetitive but critical business processes.",
      applications: [
        {
          icon: FileText,
          title: "Document Processing Automation",
          problem: "Organizations spending excessive time on manual document processing with high error rates and inconsistent handling",
          solution: "Advanced AI system that automatically processes, categorizes, and extracts critical information from documents while making intelligent routing decisions based on content analysis",
          impact: "Reduce document processing time by 85% while improving accuracy to 99.2%",
          color: "from-orange-500 to-red-600",
          badge: "Intelligent Document Recognition",
          features: [
            "OCR and intelligent text extraction",
            "Automated document classification",
            "Data validation and verification",
            "Smart routing and approval workflows",
            "Exception handling and escalation"
          ]
        },
        {
          icon: RotateCcw,
          title: "Workflow Decision Engine",
          problem: "Complex business decisions requiring manual review causing delays and inconsistent outcomes",
          solution: "Intelligent system that automates complex business decisions using machine learning algorithms, business rules, and historical data to make consistent, optimized choices across workflows",
          impact: "Achieve 92% consistency in decision-making while reducing processing time by 70%",
          color: "from-purple-500 to-violet-600",
          badge: "Smart Decision Automation",
          features: [
            "Multi-criteria decision algorithms",
            "Real-time data integration",
            "Adaptive learning capabilities",
            "Risk assessment automation",
            "Outcome prediction modeling"
          ]
        },
        {
          icon: Headphones,
          title: "Customer Service Automation",
          problem: "High volume of customer inquiries overwhelming support teams and causing delayed response times",
          solution: "AI-powered customer service platform that handles complex inquiries, escalates appropriately, and provides personalized responses while maintaining human-like interaction quality",
          impact: "Handle 75% of customer inquiries automatically with 95% satisfaction rate",
          color: "from-green-500 to-emerald-600",
          badge: "Intelligent Response System",
          features: [
            "Natural language understanding",
            "Intent recognition and routing",
            "Personalized response generation",
            "Multi-channel integration",
            "Sentiment analysis and escalation"
          ]
        },
        {
          icon: Package,
          title: "Supply Chain Optimization",
          problem: "Inefficient inventory management and unpredictable demand causing stockouts and excess inventory costs",
          solution: "Intelligent automation system that optimizes inventory management, predicts demand fluctuations, and automatically adjusts procurement and distribution strategies in real-time",
          impact: "Reduce inventory costs by 30% while improving delivery efficiency by 45%",
          color: "from-blue-500 to-indigo-600",
          badge: "Predictive Logistics Management",
          features: [
            "Demand forecasting algorithms",
            "Automated inventory optimization",
            "Supplier performance monitoring",
            "Route optimization and scheduling",
            "Risk assessment and mitigation"
          ]
        }
      ],
      successStories: [
        {
          story: "Automated invoice processing for a logistics company, reducing manual review time from 4 hours to 8 minutes per batch while achieving 99.8% accuracy, saving $340K annually in processing costs",
          highlight: "$340K"
        },
        {
          story: "Implemented intelligent customer service automation for an e-commerce platform, handling 78% of inquiries automatically and improving response time from 24 hours to under 2 minutes",
          highlight: "78%"
        },
        {
          story: "Deployed predictive supply chain optimization for a manufacturing firm, reducing inventory holding costs by 35% while eliminating 90% of stockouts through intelligent demand forecasting",
          highlight: "35%"
        }
      ],
      methodology: [
        "Process Mapping & Optimization Analysis",
        "AI Model Development & Training",
        "Workflow Integration & Testing",
        "Continuous Learning & Improvement"
      ],
      deliverables: [
        "Complete Workflow Automation Audit",
        "Custom AI Decision Models",
        "Intelligent Process Orchestration",
        "Real-time Performance Monitoring",
        "Exception Handling & Escalation",
        "Continuous Learning & Adaptation"
      ]
    },
    'ai-analytics': {
      title: "AI Analytics & Insights",
      subtitle: "Advanced AI analytics platforms that provide actionable business intelligence",
      icon: BarChart3,
      color: "from-green-500 to-emerald-600",
      coreValue: "I create sophisticated AI analytics platforms that transform raw business data into actionable insights and predictive intelligence. My solutions combine advanced machine learning algorithms, real-time data processing, and intuitive visualization to help organizations make data-driven decisions that drive growth, optimize operations, and identify new opportunities before competitors do.",
      applications: [
        {
          icon: Crystal,
          title: "Predictive Business Intelligence",
          problem: "Organizations struggling to predict market trends and business outcomes, leading to reactive decision-making",
          solution: "Advanced analytics platform that predicts market trends, customer behavior, and business outcomes using machine learning models trained on historical and real-time data patterns",
          impact: "Improve forecast accuracy by 85% and identify revenue opportunities 3 months earlier",
          color: "from-green-500 to-emerald-600",
          badge: "Future Trend Analysis",
          features: [
            "Revenue forecasting models",
            "Customer lifetime value prediction",
            "Market trend analysis",
            "Risk assessment algorithms",
            "Opportunity identification systems"
          ]
        },
        {
          icon: Activity,
          title: "Real-Time Performance Dashboard",
          problem: "Lack of real-time visibility into business performance causing delayed responses to critical issues",
          solution: "Intelligent dashboard system that processes multiple data streams in real-time, automatically identifies anomalies, and provides actionable insights for immediate business optimization",
          impact: "Reduce decision-making time by 60% with instant access to critical insights",
          color: "from-blue-500 to-indigo-600",
          badge: "Live Data Visualization",
          features: [
            "Multi-source data integration",
            "Automated anomaly detection",
            "Interactive visualization tools",
            "Alert and notification systems",
            "Mobile-responsive interface"
          ]
        },
        {
          icon: UserCheck,
          title: "Customer Behavior Analytics",
          problem: "Limited understanding of customer behavior patterns leading to missed opportunities and poor retention",
          solution: "Comprehensive analytics platform that analyzes customer interactions, predicts purchasing behavior, and identifies optimization opportunities for improved customer experience and revenue growth",
          impact: "Increase customer retention by 35% and improve conversion rates by 45%",
          color: "from-purple-500 to-violet-600",
          badge: "Behavioral Intelligence",
          features: [
            "Journey mapping and analysis",
            "Churn prediction modeling",
            "Segmentation algorithms",
            "Personalization engines",
            "A/B testing automation"
          ]
        },
        {
          icon: Wrench,
          title: "Operational Intelligence Platform",
          problem: "Inefficient business processes and lack of visibility into operational bottlenecks causing increased costs",
          solution: "AI-powered operational analytics that monitors business processes, identifies inefficiencies, and recommends optimization strategies to improve productivity and reduce costs",
          impact: "Reduce operational costs by 25% while improving process efficiency by 40%",
          color: "from-orange-500 to-red-600",
          badge: "Process Optimization",
          features: [
            "Process mining and analysis",
            "Bottleneck identification",
            "Resource optimization models",
            "Cost analysis algorithms",
            "Performance benchmarking"
          ]
        }
      ],
      successStories: [
        {
          story: "Implemented predictive analytics for a retail chain, increasing inventory turnover by 40% and reducing stockouts by 75% through AI-powered demand forecasting, resulting in $1.8M additional profit",
          highlight: "$1.8M"
        },
        {
          story: "Built customer behavior analytics platform for a SaaS company, identifying churn patterns 8 weeks earlier and improving retention by 32% through targeted intervention strategies",
          highlight: "8 weeks earlier"
        },
        {
          story: "Deployed operational intelligence dashboard for a manufacturing firm, identifying process inefficiencies that saved $450K annually and improved production throughput by 28%",
          highlight: "$450K"
        }
      ],
      methodology: [
        "Data Discovery & Quality Assessment",
        "Analytics Model Development & Training",
        "Platform Integration & Visualization",
        "Insights Delivery & Optimization"
      ],
      deliverables: [
        "Comprehensive Data Analytics Audit",
        "Custom Predictive Models",
        "Interactive Dashboard Platform",
        "Automated Insights & Alerts",
        "Real-time Data Processing",
        "Strategic Recommendations Engine"
      ]
    },
    'business-growth': {
      title: "Business Growth Strategy",
      subtitle: "Turn Growth Challenges into Measurable Opportunities",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600",
      coreValue: "I develop AI-powered business applications that turn growth challenges into measurable opportunities. My data-driven approach helps companies identify revenue gaps, optimize operations, and scale efficiently using intelligent automation.",
      applications: [
        {
          icon: BarChart3,
          title: "Revenue Intelligence Dashboard",
          problem: "Companies struggling to identify which customers, products, or channels drive the most profitable growth",
          solution: "Built a no-code application that integrates with existing business data to provide real-time insights on customer lifetime value, churn predictors, and revenue optimization opportunities",
          impact: "Helps businesses increase revenue by 15-30% through data-driven decision making",
          color: "from-green-500 to-emerald-600"
        },
        {
          icon: Globe,
          title: "Market Expansion Analyzer",
          problem: "Businesses wanting to enter new markets but lacking clear data on opportunity size and competitive positioning",
          solution: "Created an AI-powered tool that analyzes market data, competitor strategies, and customer feedback to identify the most promising expansion opportunities",
          impact: "Reduces market research time from months to weeks while improving success rates",
          color: "from-blue-500 to-cyan-600"
        },
        {
          icon: Users,
          title: "Customer Growth Accelerator",
          problem: "Companies with high customer acquisition costs and unclear retention strategies",
          solution: "Developed a platform that uses AI to analyze customer behavior patterns, predict churn risk, and recommend personalized retention strategies",
          impact: "Improves customer lifetime value by 25-40% while reducing acquisition costs",
          color: "from-purple-500 to-violet-600"
        }
      ],
      successStories: [
        {
          story: "Helped a mid-size manufacturing company identify $2.3M in untapped revenue opportunities by analyzing their customer data patterns and market positioning",
          highlight: "$2.3M"
        },
        {
          story: "Enabled a professional services firm to expand into three new markets with 90% confidence by providing data-driven market entry strategies",
          highlight: "90% confidence"
        }
      ],
      methodology: [
        "Data Analysis & Revenue Gap Identification",
        "Market Opportunity Assessment",
        "AI-Powered Predictive Modeling",
        "Custom Application Development",
        "Performance Monitoring & Optimization"
      ],
      deliverables: [
        "Comprehensive Growth Strategy Report",
        "Custom AI-Powered Business Applications",
        "Revenue Optimization Roadmap",
        "Market Expansion Analysis",
        "90-Day Implementation Plan"
      ]
    },
    'operational-workflow': {
      title: "Operational Workflow Optimization",
      subtitle: "Workflow Efficiency Tools Portfolio",
      icon: Settings,
      color: "from-blue-500 to-cyan-600",
      coreValue: "I develop intelligent workflow optimization tools that eliminate operational bottlenecks and maximize team productivity. My AI-powered solutions automatically identify inefficiencies, streamline processes, and create systems that scale with your business growth.",
      applications: [
        {
          icon: AlertTriangle,
          title: "Process Bottleneck Identifier",
          problem: "Companies losing 20-30% productivity due to hidden workflow inefficiencies",
          solution: "An AI-powered dashboard that analyzes team workflows and automatically identifies where delays occur most frequently",
          impact: "Typically reduces process completion time by 25-40%",
          color: "from-red-500 to-orange-600",
          features: [
            "Real-time process mapping",
            "Bottleneck alerts",
            "Efficiency scoring",
            "Automated improvement recommendations"
          ]
        },
        {
          icon: Zap,
          title: "Task Automation Engine",
          problem: "Employees spending 40% of their time on manual, repetitive work instead of high-value activities",
          solution: "A no-code platform that connects different business systems and automates repetitive tasks using AI decision-making",
          impact: "Saves 15-20 hours per employee per week on administrative tasks",
          color: "from-yellow-500 to-amber-600",
          features: [
            "Drag-and-drop workflow builder",
            "Smart task routing",
            "Approval automation",
            "Performance tracking"
          ]
        },
        {
          icon: Users,
          title: "Resource Allocation Optimizer",
          problem: "Poor resource allocation leading to burnout, missed deadlines, and uneven workload distribution",
          solution: "An intelligent system that analyzes workload patterns and automatically assigns tasks to the most suitable team members",
          impact: "Improves project completion rates by 35% while reducing employee overtime",
          color: "from-purple-500 to-violet-600",
          features: [
            "Skill-based task matching",
            "Workload balancing",
            "Deadline prediction",
            "Capacity planning"
          ]
        },
        {
          icon: BarChart3,
          title: "Operational Performance Dashboard",
          problem: "Managers lacking visibility into operational performance and unable to make data-driven decisions",
          solution: "A real-time monitoring system that tracks key operational metrics and provides actionable insights for continuous improvement",
          impact: "Enables 50% faster response to operational issues",
          color: "from-green-500 to-emerald-600",
          features: [
            "Custom KPI tracking",
            "Trend analysis",
            "Predictive alerts",
            "Executive reporting"
          ]
        }
      ],
      successStories: [
        {
          story: "Reduced a SaaS company's customer onboarding time from 2 weeks to 3 days by identifying and eliminating 7 critical workflow bottlenecks",
          highlight: "2 weeks to 3 days"
        },
        {
          story: "Automated 80% of manual approval processes for a consulting firm, freeing up 25 hours per week for senior managers to focus on strategic work",
          highlight: "25 hours per week"
        },
        {
          story: "Improved project delivery rates by 45% for a marketing agency through intelligent resource allocation and workload balancing",
          highlight: "45%"
        }
      ],
      methodology: [
        "Workflow Analysis & Bottleneck Identification",
        "Process Mapping & Optimization Design",
        "AI-Powered Automation Implementation",
        "Resource Allocation Optimization",
        "Performance Monitoring & Continuous Improvement"
      ],
      deliverables: [
        "Complete Workflow Efficiency Audit",
        "Custom Process Optimization Tools",
        "Automated Task Management System",
        "Resource Allocation Dashboard",
        "Performance Monitoring Setup",
        "Team Training & Documentation"
      ]
    },
    'ai-customer-systems': {
      title: "AI Customer Experience Systems",
      subtitle: "Intelligent customer service and engagement solutions powered by AI",
      icon: MessageSquare,
      color: "from-pink-500 to-rose-600",
      coreValue: "I build intelligent customer experience systems that revolutionize how businesses interact with their customers. My AI-powered solutions combine natural language processing, sentiment analysis, and predictive modeling to create personalized, efficient, and scalable customer service platforms that enhance satisfaction while reducing operational costs and response times.",
      applications: [
        {
          icon: Bot,
          title: "Intelligent Chatbot Platform",
          problem: "High volume customer inquiries overwhelming support teams with inconsistent response quality and long wait times",
          solution: "Advanced conversational AI that understands context, emotions, and intent to provide human-like customer interactions while seamlessly escalating complex issues to human agents",
          impact: "Handle 80% of customer inquiries automatically with 92% satisfaction rating",
          color: "from-pink-500 to-rose-600",
          badge: "Natural Language Understanding",
          features: [
            "Multi-language conversation support",
            "Sentiment analysis and emotion detection",
            "Contextual conversation memory",
            "Smart escalation protocols",
            "Integration with CRM systems"
          ]
        },
        {
          icon: Crosshair,
          title: "Personalization Engine",
          problem: "Generic customer experiences leading to low engagement and poor conversion rates",
          solution: "AI-driven personalization system that analyzes customer behavior, preferences, and history to deliver tailored experiences, recommendations, and content across all touchpoints",
          impact: "Increase conversion rates by 45% and customer engagement by 60%",
          color: "from-blue-500 to-indigo-600",
          badge: "Behavioral Intelligence",
          features: [
            "Real-time behavior tracking",
            "Dynamic content optimization",
            "Recommendation algorithms",
            "A/B testing automation",
            "Cross-channel personalization"
          ]
        },
        {
          icon: Eye,
          title: "Predictive Customer Support",
          problem: "Reactive customer support approach leading to escalated issues and customer dissatisfaction",
          solution: "Advanced analytics platform that predicts customer issues before they occur, automatically triggers preventive actions, and optimizes support resources based on anticipated demand patterns",
          impact: "Reduce support tickets by 55% through proactive issue prevention",
          color: "from-green-500 to-emerald-600",
          badge: "Proactive Issue Resolution",
          features: [
            "Issue prediction algorithms",
            "Proactive notification systems",
            "Automated resolution workflows",
            "Resource allocation optimization",
            "Customer health scoring"
          ]
        },
        {
          icon: Mic,
          title: "Voice Analytics Platform",
          problem: "Limited insights from customer calls and inconsistent service quality across support agents",
          solution: "Sophisticated voice analysis system that processes customer calls in real-time, extracts insights, monitors quality, and provides coaching recommendations to improve service delivery",
          impact: "Improve call quality scores by 35% and reduce training time by 50%",
          color: "from-purple-500 to-violet-600",
          badge: "Speech Intelligence",
          features: [
            "Real-time speech-to-text processing",
            "Emotion and sentiment detection",
            "Quality scoring algorithms",
            "Compliance monitoring",
            "Agent coaching insights"
          ]
        }
      ],
      successStories: [
        {
          story: "Deployed intelligent chatbot for an e-commerce company, reducing customer service costs by 65% while handling 10,000+ daily interactions with 94% customer satisfaction rate",
          highlight: "65%"
        },
        {
          story: "Built personalization engine for a streaming service, increasing user engagement by 75% and reducing churn by 28% through AI-powered content recommendations",
          highlight: "75%"
        },
        {
          story: "Implemented predictive support system for a software company, preventing 60% of potential issues and improving customer satisfaction scores from 3.2 to 4.7 stars",
          highlight: "4.7 stars"
        }
      ],
      methodology: [
        "Customer Journey Analysis & Mapping",
        "AI Model Training & Customization",
        "Platform Integration & Testing",
        "Performance Optimization & Enhancement"
      ],
      deliverables: [
        "Complete Customer Experience Audit",
        "Custom AI Conversation Models",
        "Multi-channel Integration Platform",
        "Real-time Analytics Dashboard",
        "Automated Quality Monitoring",
        "Continuous Learning & Improvement"
      ]
    },
    'ai-web-solutions': {
      title: "AI-Enhanced Web Solutions",
      subtitle: "Intelligent websites and applications with built-in AI capabilities",
      icon: Globe,
      color: "from-indigo-500 to-blue-600",
      coreValue: "I develop next-generation web solutions that seamlessly integrate artificial intelligence into every aspect of user interaction. My AI-enhanced platforms combine modern web technologies with machine learning capabilities to create intelligent, adaptive, and personalized digital experiences that evolve with user behavior and business needs while maintaining exceptional performance and scalability.",
      applications: [
        {
          icon: Edit,
          title: "Smart Content Management System",
          problem: "Organizations struggling with time-consuming content creation and poor SEO performance",
          solution: "Intelligent CMS that automatically generates, optimizes, and personalizes content based on user behavior, SEO requirements, and performance analytics while maintaining brand consistency",
          impact: "Reduce content creation time by 70% while improving SEO rankings by 150%",
          color: "from-indigo-500 to-blue-600",
          badge: "AI-Powered Content Creation",
          features: [
            "Automated content generation",
            "SEO optimization algorithms",
            "Dynamic content personalization",
            "Performance analytics integration",
            "Multi-language content adaptation"
          ]
        },
        {
          icon: ShoppingCart,
          title: "Intelligent E-commerce Platform",
          problem: "E-commerce businesses struggling with low conversion rates and poor customer experience",
          solution: "AI-powered e-commerce solution that provides personalized product recommendations, dynamic pricing, intelligent search, and predictive inventory management to maximize conversions and customer satisfaction",
          impact: "Increase average order value by 35% and conversion rates by 55%",
          color: "from-green-500 to-emerald-600",
          badge: "Smart Shopping Experience",
          features: [
            "Personalized recommendation engine",
            "Dynamic pricing algorithms",
            "Intelligent search and filtering",
            "Abandoned cart recovery automation",
            "Predictive inventory management"
          ]
        },
        {
          icon: GraduationCap,
          title: "Adaptive Learning Platform",
          problem: "Educational institutions facing poor learning outcomes and high dropout rates",
          solution: "Intelligent education platform that adapts content difficulty, learning paths, and delivery methods based on individual learning styles, progress patterns, and performance analytics",
          impact: "Improve learning outcomes by 65% and reduce completion time by 40%",
          color: "from-blue-500 to-cyan-600",
          badge: "Personalized Education",
          features: [
            "Adaptive learning algorithms",
            "Personalized content delivery",
            "Progress tracking and analytics",
            "Interactive assessment tools",
            "Collaborative learning features"
          ]
        },
        {
          icon: PieChart,
          title: "Intelligent Business Dashboard",
          problem: "Business leaders lacking quick access to actionable insights from complex data",
          solution: "AI-enhanced dashboard that automatically analyzes business data, identifies trends, generates insights, and provides actionable recommendations through intuitive visualizations and natural language queries",
          impact: "Reduce data analysis time by 80% and improve decision accuracy by 45%",
          color: "from-purple-500 to-violet-600",
          badge: "Smart Analytics Interface",
          features: [
            "Natural language query interface",
            "Automated insight generation",
            "Predictive trend analysis",
            "Custom visualization engine",
            "Real-time data processing"
          ]
        }
      ],
      successStories: [
        {
          story: "Built AI-enhanced e-commerce platform for a fashion retailer, increasing online sales by 120% through personalized recommendations and dynamic pricing, generating $3.2M additional revenue",
          highlight: "$3.2M"
        },
        {
          story: "Developed intelligent content management system for a media company, reducing content production costs by 60% while improving audience engagement by 85% through AI-generated personalized content",
          highlight: "85%"
        },
        {
          story: "Created adaptive learning platform for an education provider, improving student completion rates by 75% and reducing support requests by 50% through intelligent course personalization",
          highlight: "75%"
        }
      ],
      methodology: [
        "User Experience Analysis & AI Integration Planning",
        "Intelligent Architecture Design & Development",
        "AI Model Integration & Testing",
        "Performance Optimization & Scaling"
      ],
      deliverables: [
        "Complete Web Solution Architecture",
        "Integrated AI Capabilities",
        "Responsive & Scalable Design",
        "Advanced Analytics & Insights",
        "Security & Performance Optimization",
        "Ongoing AI Model Enhancement"
      ]
    },
    'custom-ai-development': {
      title: "Custom AI Solution Development",
      subtitle: "Bespoke AI applications and tools designed specifically for your business needs",
      icon: Bot,
      color: "from-red-500 to-pink-600",
      coreValue: "I create completely custom AI solutions tailored to your unique business challenges and opportunities. Unlike off-the-shelf products, my bespoke development approach ensures that every algorithm, interface, and feature is specifically designed to address your exact requirements, integrate seamlessly with your existing systems, and deliver measurable results that align perfectly with your strategic objectives.",
      applications: [
        {
          icon: Factory,
          title: "Industry-Specific AI Tools",
          problem: "Organizations struggling with generic AI solutions that don't address their specific industry requirements and compliance needs",
          solution: "Custom-built AI applications designed for specific industries such as healthcare, finance, manufacturing, or retail, incorporating domain expertise and regulatory compliance requirements",
          impact: "Achieve 90% better performance than generic solutions with full compliance assurance",
          color: "from-red-500 to-pink-600",
          badge: "Sector-Specialized Solutions",
          features: [
            "Industry compliance frameworks",
            "Sector-specific data models",
            "Regulatory reporting automation",
            "Domain expert consultation",
            "Legacy system integration"
          ]
        },
        {
          icon: Calculator,
          title: "Proprietary Algorithm Development",
          problem: "Businesses needing unique competitive advantages that standard AI models cannot provide",
          solution: "Development of unique machine learning algorithms and AI models specifically designed for your data patterns, business logic, and competitive requirements that provide sustainable competitive advantages",
          impact: "Create unique competitive advantages with 60% better accuracy than standard models",
          color: "from-purple-500 to-violet-600",
          badge: "Custom Machine Learning Models",
          features: [
            "Custom neural network architectures",
            "Proprietary training methodologies",
            "Algorithm intellectual property protection",
            "Performance optimization tuning",
            "Scalable model deployment"
          ]
        },
        {
          icon: Link,
          title: "Enterprise Integration Platform",
          problem: "Complex enterprise environments with disparate systems that need intelligent coordination and data flow",
          solution: "Custom AI integration layer that connects disparate enterprise systems, automates data flows, and provides intelligent orchestration across your entire technology ecosystem",
          impact: "Eliminate 95% of manual data entry and reduce integration costs by 70%",
          color: "from-blue-500 to-indigo-600",
          badge: "Seamless System Connectivity",
          features: [
            "Multi-system API development",
            "Real-time data synchronization",
            "Intelligent workflow automation",
            "Legacy system modernization",
            "Security and access control"
          ]
        },
        {
          icon: BarChart,
          title: "Specialized Analytics Engine",
          problem: "Organizations with unique data sources and business metrics that require custom intelligence solutions",
          solution: "Bespoke analytics platform that combines your unique data sources, business metrics, and decision-making frameworks into a comprehensive intelligence system tailored to your strategic needs",
          impact: "Improve strategic decision speed by 85% with 40% better outcome prediction",
          color: "from-green-500 to-emerald-600",
          badge: "Custom Intelligence Platform",
          features: [
            "Custom KPI modeling",
            "Predictive forecasting algorithms",
            "Interactive visualization dashboards",
            "Automated insight generation",
            "Strategic recommendation engine"
          ]
        }
      ],
      successStories: [
        {
          story: "Developed proprietary fraud detection algorithm for a fintech company, reducing false positives by 80% and increasing detection accuracy to 99.7%, saving $2.8M annually in fraud losses",
          highlight: "$2.8M"
        },
        {
          story: "Built custom inventory optimization system for a pharmaceutical distributor, improving stock efficiency by 45% while ensuring 99.9% availability of critical medications",
          highlight: "99.9%"
        },
        {
          story: "Created specialized AI diagnostic tool for a medical practice, reducing diagnosis time by 60% while improving accuracy by 25%, enabling treatment of 40% more patients daily",
          highlight: "40% more patients"
        }
      ],
      methodology: [
        "Business Requirements Analysis & Solution Design",
        "Custom Algorithm Development & Training",
        "System Integration & Testing",
        "Deployment & Ongoing Optimization"
      ],
      deliverables: [
        "Comprehensive Business Analysis",
        "Custom Algorithm Development",
        "Full System Integration",
        "Intellectual Property Protection",
        "Scalable Architecture Design",
        "Ongoing Support & Enhancement"
      ]
    },
    'ai-performance-optimization': {
      title: "AI Performance Optimization",
      subtitle: "Continuous optimization of AI systems for maximum ROI and operational impact",
      icon: Target,
      color: "from-yellow-500 to-amber-600",
      coreValue: "I maximize the performance and ROI of your AI systems through continuous monitoring, optimization, and enhancement. My systematic approach ensures your AI investments deliver sustained value by identifying performance bottlenecks, optimizing resource utilization, improving accuracy, and scaling capabilities to meet evolving business demands while maintaining cost efficiency and operational excellence.",
      applications: [
        {
          icon: Target,
          title: "Model Performance Tuning",
          problem: "AI models losing accuracy over time or underperforming due to suboptimal configuration and outdated training",
          solution: "Systematic optimization of machine learning models through hyperparameter tuning, feature engineering, and algorithm refinement to maximize accuracy while minimizing computational costs",
          impact: "Improve model accuracy by 25-40% while reducing computational costs by 50%",
          color: "from-yellow-500 to-amber-600",
          badge: "Accuracy Enhancement",
          features: [
            "Hyperparameter optimization",
            "Feature selection and engineering",
            "Model architecture refinement",
            "Cross-validation improvement",
            "Ensemble method optimization"
          ]
        },
        {
          icon: CostIcon,
          title: "Resource Optimization",
          problem: "High infrastructure costs and inefficient resource utilization leading to poor ROI on AI investments",
          solution: "Intelligent resource management that optimizes cloud computing costs, reduces infrastructure overhead, and maximizes hardware utilization while maintaining performance standards",
          impact: "Reduce infrastructure costs by 60% while improving system responsiveness by 45%",
          color: "from-green-500 to-emerald-600",
          badge: "Cost Efficiency",
          features: [
            "Cloud cost optimization",
            "Auto-scaling configuration",
            "Hardware utilization analysis",
            "Load balancing optimization",
            "Energy consumption reduction"
          ]
        },
        {
          icon: RefreshCw,
          title: "Continuous Learning Systems",
          problem: "AI models becoming outdated and less effective as business conditions and data patterns change over time",
          solution: "Implementation of continuous learning frameworks that automatically adapt and improve AI models based on new data patterns, user feedback, and changing business conditions",
          impact: "Maintain 95% model effectiveness over time with 70% less manual intervention",
          color: "from-blue-500 to-cyan-600",
          badge: "Adaptive Intelligence",
          features: [
            "Online learning algorithms",
            "Automated model retraining",
            "Drift detection systems",
            "Feedback loop integration",
            "A/B testing automation"
          ]
        },
        {
          icon: PerformanceIcon,
          title: "Performance Monitoring Dashboard",
          problem: "Lack of visibility into AI system performance and inability to identify optimization opportunities proactively",
          solution: "Comprehensive monitoring platform that tracks AI system performance, identifies optimization opportunities, and provides actionable insights for continuous improvement and ROI maximization",
          impact: "Identify optimization opportunities 80% faster with 90% proactive issue prevention",
          color: "from-purple-500 to-violet-600",
          badge: "Real-time Analytics",
          features: [
            "Real-time performance metrics",
            "Predictive maintenance alerts",
            "ROI tracking and reporting",
            "Bottleneck identification",
            "Optimization recommendations"
          ]
        }
      ],
      successStories: [
        {
          story: "Optimized recommendation engine for an e-commerce platform, improving click-through rates by 65% and reducing server costs by 55% through model efficiency improvements, generating $2.1M additional revenue",
          highlight: "$2.1M"
        },
        {
          story: "Enhanced fraud detection system for a financial services company, reducing false positives by 70% while maintaining 99.8% accuracy, saving $850K annually in manual review costs",
          highlight: "$850K"
        },
        {
          story: "Optimized supply chain prediction models for a manufacturing firm, improving forecast accuracy by 35% and reducing inventory costs by $1.3M while eliminating stockouts",
          highlight: "$1.3M"
        }
      ],
      methodology: [
        "Performance Audit & Baseline Assessment",
        "Optimization Strategy & Implementation",
        "Continuous Monitoring & Improvement",
        "ROI Validation & Scaling"
      ],
      deliverables: [
        "Comprehensive Performance Audit",
        "Optimized Model Performance",
        "Resource Cost Reduction",
        "Continuous Learning Framework",
        "Real-time Monitoring Dashboard",
        "Ongoing Optimization Support"
      ]
    }
    // Add other services here...
  };

  const service = serviceData[serviceId as keyof typeof serviceData];

  const handleDownloadCaseStudy = () => {
    if (!service) return;
    
    const caseStudyData: CaseStudyData = {
      serviceTitle: service.title,
      serviceSubtitle: service.subtitle,
      coreValue: service.coreValue,
      applications: service.applications,
      successStories: service.successStories,
      methodology: service.methodology,
      deliverables: service.deliverables
    };
    
    downloadCaseStudy(caseStudyData);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <SEOHead 
          title="Service Not Found"
          description="The requested AI service could not be found."
          canonicalUrl={`/service/${serviceId}`}
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Service Not Found</h2>
          <button 
            onClick={() => navigate('/services')}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <SEOHead 
        title={service.title}
        description={service.coreValue}
        keywords={`${service.title}, AI Services, ${service.category}, Business Automation, AI Implementation`}
        canonicalUrl={`/service/${serviceId}`}
      />
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>
          
          <div className="flex items-center space-x-4">
            <div className={`p-4 bg-gradient-to-r ${service.color} rounded-xl`}>
              <service.icon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{service.title}</h1>
              <p className="text-xl text-gray-300 mt-2">{service.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Core Value Proposition */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 md:p-12 rounded-2xl border border-slate-600 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Core Value Proposition</h2>
          <p className="text-lg text-gray-300 leading-relaxed">{service.coreValue}</p>
        </div>

        {/* Featured Applications */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Applications</h2>
          <div className="space-y-8">
            {service.applications.map((app, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  <div className="flex items-center space-x-4 mb-6 lg:mb-0 lg:flex-col lg:space-x-0 lg:space-y-4 lg:text-center lg:min-w-[200px]">
                    <div className={`p-4 bg-gradient-to-r ${app.color} rounded-xl`}>
                      <app.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white lg:text-center">{app.title}</h3>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Business Problem Solved
                      </h4>
                      <p className="text-gray-300">{app.problem}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Solution
                      </h4>
                      <p className="text-gray-300">{app.solution}</p>
                    </div>

                    {/* Badge for AI Strategy service */}
                    {app.badge && (
                      <div className="mb-4">
                        <span className="inline-block bg-green-800 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                          {app.badge}
                        </span>
                      </div>
                    )}

                    {/* Key Features (for operational workflow) */}
                    {app.features && (
                      <div>
                        <h4 className="text-purple-400 font-semibold mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Includes
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {app.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-400 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 p-4 rounded-lg">
                      <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ROI Impact
                      </h4>
                      <p className="text-gray-300 font-medium">{app.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Client Success Stories</h2>
            <div className="space-y-6">
              {service.successStories.map((story, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    "{story.story.split(story.highlight)[0]}"
                    <span className="text-green-400 font-bold">{story.highlight}</span>
                    {story.story.split(story.highlight)[1] || ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Methodology */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">Methodology</h3>
              <div className="space-y-3">
                {service.methodology.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">What You Get</h3>
              <div className="space-y-3">
                {service.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-slate-800 to-slate-700 p-12 rounded-2xl border border-slate-600">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how this service can accelerate your business growth and deliver measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setShowScheduling(true);
              }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
            >
              Schedule Strategy Session
            </button>
            <button 
              onClick={handleDownloadCaseStudy}
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
            >
              Download Case Studies
            </button>
          </div>
        </div>
      </div>
      
      <SchedulingModal 
        isOpen={showScheduling} 
        onClose={() => setShowScheduling(false)} 
      />
    </div>
  );
};

export default ServiceDetail;