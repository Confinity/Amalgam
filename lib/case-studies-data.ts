export interface CaseStudy {
  id: string
  slug: string
  client: string
  industry: string
  headline: string
  location: string
  heroImageSrc: string
  heroImageAlt: string
  // Thumbnail card summary (3 panels)
  problem: string
  approach: string
  outcome: string
  // Full page content
  overview: string
  challenges: string[]
  solution: {
    title: string
    description: string
  }[]
  results: {
    metric: string
    value: string
    description: string
  }[]
  technologies: string[]
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    id: "premier-financial-alliance",
    slug: "premier-financial-alliance",
    client: "Premier Financial Alliance",
    industry: "Insurance",
    location: "Suwanee, Georgia",
    headline: "How We Streamlined Premier Financial Alliance's Employee Operations",
    heroImageSrc: "/case-studies/premier-financial-alliance.webp",
    heroImageAlt: "Premier Financial Alliance team and operations dashboard thumbnail from the legacy Amalgam case study",
    problem: "Outdated technology and inefficient platforms created unnecessary manual processes for agent onboarding, reporting, and administrative tasks, wasting resources and risking inaccurate incentive distribution.",
    approach: "We modernized their platform by automating complex data relationships, optimizing agent onboarding, and improving reporting capabilities. We migrated data from MySQL to PostgreSQL, refined business logic, and built an intuitive interface for administrators.",
    outcome: "PFA now has a solid incentive management system, secure team communication, and dynamic custom reporting that enables data-driven decision-making and streamlined operations.",
    overview: "Premier Financial Alliance is an insurance brokerage disrupting the industry with proprietary financial products focused on Middle America. They offer whole life, universal life, term life insurance, and annuities. However, their outdated platform hindered efficiency for both agents and administrators.",
    challenges: [
      "Manual processes lacked key business logic for complex data relationships",
      "Inflexible reporting and counterintuitive UI prevented data-driven insights",
      "Inconsistent data management created poor decision-making foundation",
      "Non-standardized administrative tasks slowed agent onboarding",
      "Risk of inaccurate or unfair incentive distribution"
    ],
    solution: [
      {
        title: "Application Assessment & Architecture",
        description: "Evaluated PFA's existing application structure and designed a comprehensive improvement plan."
      },
      {
        title: "Data Migration & Modernization",
        description: "Migrated legacy data from MySQL to PostgreSQL, scrubbed data, and added new fields to facilitate agent management using Java-based data access objects."
      },
      {
        title: "Process Automation & Business Logic",
        description: "Created new administrative and reporting logic to optimize agent onboarding, team communication, and incentive management."
      },
      {
        title: "UX/UI Redesign",
        description: "Engineered a modern, intuitive interface enabling agents to create dynamic personal reports and administrators to manage complex hierarchies and relationships."
      }
    ],
    results: [
      {
        metric: "Efficiency",
        value: "Dynamic Reporting",
        description: "Admins can now create custom personal reports to review individual agent performance with ease."
      },
      {
        metric: "Security",
        value: "Encrypted Communications",
        description: "Modern email server with key security and backup protocols ensures critical communications are never lost."
      },
      {
        metric: "Management",
        value: "Automated Hierarchy",
        description: "Automated agent hierarchy management replaced manual commission payout processes while maintaining data integrity."
      },
      {
        metric: "Experience",
        value: "Modern Platform",
        description: "Contemporary UX/UI makes it easy for administrators to edit agent profiles and manage complex relationships."
      }
    ],
    technologies: ["Java", "PostgreSQL", "MySQL Migration", "Modern UI/UX"],
    featured: true
  },

  {
    id: "pearlx",
    slug: "pearlx",
    client: "PearlX",
    industry: "Energy",
    location: "Charlottesville, Virginia",
    headline: "How We Built PearlX's State-of-the-Art Customer Portal",
    heroImageSrc: "/case-studies/pearlx.webp",
    heroImageAlt: "PearlX customer portal thumbnail from the legacy Amalgam case study",
    problem: "As a startup, PearlX lacked the resources to build their customer portal, a critical part of the business, risking delayed go-to-market and costly inefficiencies.",
    approach: "We built a robust customer portal with data infrastructure, seamless onboarding processes, and user profiles with custom permissions. The architecture uses React.js and AWS services including AWS Kinesis, AWS Lambda, and PostgreSQL.",
    outcome: "PearlX now has a streamlined onboarding process, efficient community management, and a scalable, user-friendly portal that helps them attract and retain clients. Amalgam remains their trusted development partner.",
    overview: "PearlX is an innovative energy startup transforming how multi-housing facilities access sustainable power. They provide affordable clean energy solutions benefiting both property owners and residents through their unique model.",
    challenges: [
      "Limited startup resources prevented building a high-quality customer portal",
      "Need for partner with expertise to architect a complex multi-tenant platform",
      "Tight timeline required rapid development without sacrificing quality",
      "Required support for both landlords and renters with different permission levels"
    ],
    solution: [
      {
        title: "Vision & Architecture Planning",
        description: "Analyzed current vision and outlined roadmap for portal architecture and UX design."
      },
      {
        title: "Front-End Development",
        description: "Built responsive front-end using React.js with HTML, JavaScript, and CSS for intuitive user experience."
      },
      {
        title: "Data Infrastructure & Onboarding",
        description: "Architected PostgreSQL-based data infrastructure with AWS services for document management and secure data handling."
      },
      {
        title: "Permission & Community Management",
        description: "Developed different user profiles with associated permissions and logic to enable community-specific onboarding."
      }
    ],
    results: [
      {
        metric: "Onboarding",
        value: "Seamless Process",
        description: "Landlords and renters can now easily onboard and manage their communities through an intuitive interface."
      },
      {
        metric: "Management",
        value: "Community Control",
        description: "Landlords can effectively manage multiple communities with community-specific onboarding and document management."
      },
      {
        metric: "UX",
        value: "Modern Portal",
        description: "Contemporary UX/UI design wrapped around data infrastructure provides user-centric approach to community management."
      },
      {
        metric: "Partnership",
        value: "Ongoing Support",
        description: "Amalgam continues as PearlX's sole development partner for all technological needs as they scale."
      }
    ],
    technologies: ["React.js", "PostgreSQL", "AWS Kinesis", "AWS Lambda", "Python"],
    featured: true
  },

  {
    id: "confinity",
    slug: "confinity",
    client: "Confinity",
    industry: "Memory Preservation Platform",
    location: "Delaware",
    headline: "How We Helped Confinity Move from Early Conviction to a Real Product Foundation",
    heroImageSrc: "/case-studies/confinity.webp",
    heroImageAlt: "Confinity product image representing the platform's family memory-preservation experience",
    problem: "Confinity needed more than implementation help. As a seed-stage company building a private platform for families to preserve memories and stories, it needed support across funding readiness, architecture, and day-to-day product development without the overhead of building a full engineering organization too early.",
    approach: "We partnered from the beginning as a senior product and engineering extension, helping shape the technical plan behind the business, define the architecture, and provide hands-on development support through contributors including Oleg and Ruben. The relationship stayed close and responsive as product, funding, and launch priorities evolved.",
    outcome: "Confinity moved forward with a clearer product foundation, a working platform direction, and an always-available technical partner who could support architecture, delivery, and engineering judgment as the company matured.",
    overview: "Confinity is a Delaware company building a private platform for families to capture milestones, organize memories, and preserve stories across generations. As the company took shape, it needed a partner that could help translate early conviction into a real product and an architecture the team could grow with.",
    challenges: [
      "Balancing fundraising conversations with early product and technical decisions",
      "Needing architecture leadership before a full internal engineering team existed",
      "Moving from concept to working product without fragmented freelancer handoffs",
      "Maintaining responsive development support while priorities evolved quickly",
      "Creating a foundation the business could keep building on as the roadmap matured"
    ],
    solution: [
      {
        title: "Early Product & Funding Support",
        description: "Worked with the founding team from the outset to support funding conversations, sharpen the product story, and connect business ambition to a credible technical plan."
      },
      {
        title: "Architecture & System Design",
        description: "Helped define the application structure, technical foundations, and delivery approach for a private platform centered on stories, memories, and family connections."
      },
      {
        title: "Embedded Development Support",
        description: "Provided hands-on development support through Amalgam contributors including Oleg and Ruben, giving the company reliable engineering capacity without slowing decisions."
      },
      {
        title: "Always-On Technical Partnership",
        description: "Stayed close as an on-call technical partner, helping navigate product tradeoffs, unblock delivery, and adapt the roadmap as the company evolved."
      }
    ],
    results: [
      {
        metric: "Foundation",
        value: "Product Direction Built",
        description: "Confinity moved from early concept work into a clearer product foundation with architecture aligned to the platform's long-term direction."
      },
      {
        metric: "Delivery",
        value: "Embedded Capacity",
        description: "The founding team had immediate access to senior technical help without having to assemble a full internal engineering function too early."
      },
      {
        metric: "Decisions",
        value: "Clearer Tradeoffs",
        description: "Architecture, sequencing, and development decisions could move faster because the business had a consistent technical partner close to the work."
      },
      {
        metric: "Partnership",
        value: "Always Available",
        description: "Amalgam remained an always-on extension of the team, supporting product, development, and technical judgment as the company matured."
      }
    ],
    technologies: ["Product Architecture", "Embedded Engineering", "Technical Strategy", "Ongoing Development Support"],
    featured: false
  },

  {
    id: "barclays-bank-us",
    slug: "barclays-bank-us",
    client: "Barclays Bank US",
    industry: "Banking",
    location: "New York, New York",
    headline: "How The Website Revamp And CMS We Implemented Enabled Barclays to Cater to its Diverse Customers",
    heroImageSrc: "/case-studies/barclays-bank-us.webp",
    heroImageAlt: "Barclays Bank US website thumbnail from the legacy Amalgam case study",
    problem: "Barclays Bank US had an outdated marketing website with poor UX, lack of accessibility compliance, and no personalization capabilities, preventing them from effectively showcasing their services and risking customer engagement.",
    approach: "We redesigned the website with modern UI/UX, implemented Magnolia CMS for content management, added personalization features like goal setters and CD ladder builders, and ensured WCAG accessibility compliance.",
    outcome: "The redesigned website empowered Barclays Bank US to stand out in a competitive market with an optimized online banking experience, enhanced customer engagement, and a modern, customer-centric brand perception.",
    overview: "Barclays Bank is a global financial services provider offering personal and business banking, student loans, home equity products, credit cards, and more. They needed a website that could effectively communicate their unique offerings and security features.",
    challenges: [
      "Outdated website with unintuitive UX and UI prevented customer engagement",
      "Lack of accessibility compliance limited reach and brand perception",
      "No personalization capabilities to tailor information to diverse customer needs",
      "Inability to effectively communicate competitive advantages and security",
      "Content management challenges slowed marketing updates"
    ],
    solution: [
      {
        title: "Website Redesign",
        description: "Created seamless, dynamic user experience with CSS transitions, parallax scrolling, intelligent page indicators, and modern tech-focused identity with accessible imagery and contemporary design touches."
      },
      {
        title: "Personalization Engine",
        description: "Incorporated banking tools like goal setters, FDIC maximizers, and CD ladder builders. Integrated rate comparisons and product bundles with flexibility for future additions."
      },
      {
        title: "Magnolia CMS Implementation",
        description: "Enabled rules-based content and image delivery across the site with support for infographics, videos, blogging, and integrated social media content."
      },
      {
        title: "Accessibility & Responsiveness",
        description: "Ensured WCAG compliance and optimized responsiveness across all devices while maintaining modern design integrity."
      }
    ],
    results: [
      {
        metric: "Experience",
        value: "WCAG Compliant",
        description: "Inclusive and visitor-friendly digital experience seamlessly displays across devices in adherence to WCAG standards."
      },
      {
        metric: "Content",
        value: "Clear Homepage",
        description: "Homepage showcases Savings and CD overviews with market-leading rates, minimum deposits, FDIC insurance, fees, and intuitive CTAs."
      },
      {
        metric: "Efficiency",
        value: "Streamlined Updates",
        description: "Magnolia CMS enables streamlined content updates, eliminating coordination hassles and expediting deployment."
      },
      {
        metric: "Trust",
        value: "Modern Bank",
        description: "Customers perceive Barclays as secure, dependable, and customer-centric through modern, accessible design."
      }
    ],
    technologies: ["Magnolia CMS", "CSS", "Responsive Design", "WCAG Accessibility"],
    featured: true
  },

  {
    id: "john-templeton-foundation",
    slug: "john-templeton-foundation",
    client: "John Templeton Foundation",
    industry: "Philanthropy",
    location: "West Conshohocken, Pennsylvania",
    headline: "How We Improved Grant Classification and Trend Analysis Using Artificial Intelligence",
    heroImageSrc: "/case-studies/john-templeton-foundation.webp",
    heroImageAlt: "John Templeton Foundation AI grant-classification thumbnail from the legacy Amalgam case study",
    problem: "JTF struggled to efficiently analyze and classify grant applications and academic publications, hindering their ability to scale operations, maintain data integrity, and extract actionable insights.",
    approach: "We customized OpenAlex's text classification tool to fit JTF's specific requirements by adding relevant topics, fine-tuning the classification model, and enabling API call functionality with rigorous testing.",
    outcome: "The enhanced classification system enabled JTF to streamline grant application processes, produce more informative and actionable results, and identify trends across supported research and publications.",
    overview: "John Templeton Foundation is a philanthropic organization funding interdisciplinary research with the mission to start awe-inspiring conversations. They allow people to submit ideas on any topic while focusing on strategic priority areas.",
    challenges: [
      "Manual grant classification processes were cumbersome and inconsistent",
      "Existing proprietary meta-databases were inadequate and expensive",
      "Traditional machine learning required extensive data and training sets",
      "Data integrity and security risks with manual processing",
      "Issues with scalability due to unsustainable manual processes",
      "Limited insights due to data silos"
    ],
    solution: [
      {
        title: "OpenAlex Customization",
        description: "Customized OpenAlex's text classification tool to fit JTF's specific requirements and research focus areas."
      },
      {
        title: "Model Fine-Tuning",
        description: "Added relevant topics to the classification model and fine-tuned it for improved accuracy in grant and publication categorization."
      },
      {
        title: "API Integration",
        description: "Enabled API call functionality for seamless integration with JTF's existing systems and workflows."
      },
      {
        title: "Rigorous Testing",
        description: "Ensured accuracy and reliability through comprehensive testing and validation processes."
      }
    ],
    results: [
      {
        metric: "Classification",
        value: "Accurate & Fast",
        description: "Automated classification system efficiently processes grant applications and publications with consistent accuracy."
      },
      {
        metric: "Insights",
        value: "Trend Analysis",
        description: "JTF can now identify trends across supported research and extract actionable insights for strategic decisions."
      },
      {
        metric: "Operations",
        value: "Streamlined Process",
        description: "Grant application workflow is now streamlined with reduced manual overhead and improved consistency."
      },
      {
        metric: "Data",
        value: "Integrated Data",
        description: "Eliminates data silos and enables comprehensive analysis across all grant and publication information."
      }
    ],
    technologies: ["OpenAlex", "Machine Learning", "API Integration", "Text Classification"],
    featured: false
  },

  {
    id: "cleanitsupply",
    slug: "cleanitsupply",
    client: "CleanItSupply",
    industry: "Retail",
    location: "Jeffersonville, Pennsylvania",
    headline: "How We Streamlined CleanItSupply's Operations for Enhanced Efficiency",
    heroImageSrc: "/case-studies/cleanitsupply.webp",
    heroImageAlt: "CleanItSupply ecommerce modernization thumbnail from the legacy Amalgam case study",
    problem: "CleanItSupply's outdated ASP.net website had slow loading times (20+ seconds), limited scalability, and poor SEO performance, causing operational inefficiencies and reduced conversion rates.",
    approach: "We rebuilt their website using React.js for the frontend and introduced a new REST API service to decouple the backend. We transitioned search functionality from Nextopia to SearchSpring for better product management.",
    outcome: "The new site is significantly faster, more user-friendly, and scalable with stronger search functionality and easier maintenance, delivering improved engagement and conversion rates.",
    overview: "CleanItSupply is an online retailer for wholesale supplies offering janitorial, restaurant, and home/office cleaning supplies. They serve both small individual and large bulk orders as a B2C and B2B retail business.",
    challenges: [
      "Outdated ASP.net framework with tightly coupled frontend and backend",
      "Slow loading times (20+ seconds) limited user engagement",
      "Poor SEO performance due to speed and crawlability issues",
      "Limited scalability for business growth",
      "Lack of in-house frontend development expertise"
    ],
    solution: [
      {
        title: "Frontend Modernization",
        description: "Rebuilt frontend using React.js library to separate frontend from tightly coupled ASP.net backend."
      },
      {
        title: "API Decoupling",
        description: "Revamped backend to incorporate new REST API service supporting decoupled architecture."
      },
      {
        title: "Search Enhancement",
        description: "Transitioned search functionality from Nextopia to SearchSpring for more relevant results and efficient product management."
      },
      {
        title: "Single-Page Application",
        description: "Converted static designs into a React.js application with significantly improved performance."
      }
    ],
    results: [
      {
        metric: "Speed",
        value: "Drastically Faster",
        description: "Single-page React application drastically decreases loading times, dramatically improving user engagement and conversion rates."
      },
      {
        metric: "Search",
        value: "Improved Results",
        description: "Optimized search functionality provides more relevant results and efficient management of products and promotions."
      },
      {
        metric: "Maintenance",
        value: "Simplified Upkeep",
        description: "Decoupled frontend and backend facilitate implementation of future updates, features, and enhancements."
      },
      {
        metric: "Performance",
        value: "High-Performance Site",
        description: "Modern architecture positions CleanItSupply for scalability and long-term technical sustainability."
      }
    ],
    technologies: ["React.js", "REST API", "SearchSpring", "PostgreSQL", "ASP.net"],
    featured: false
  },

  {
    id: "constructive-built-environment",
    slug: "constructive-built-environment",
    client: "Constructive Built Environment",
    industry: "Procurement & Utility Solutions",
    location: "Pennsylvania",
    headline: "How We Helped Constructive Built Environment Build the CART Platform",
    heroImageSrc: "/case-studies/constructive-built-environment.webp",
    heroImageAlt: "Constructive Built Environment CART platform thumbnail from the legacy Amalgam case study",
    problem: "As a startup, Constructive faced resource constraints and needed a tech partner to develop their CART platform quickly without hiring overhead or managing multiple contractors.",
    approach: "We acted as an extension of Constructive's team, providing on-demand full-scope development with startup agility. We shaped the product through strategic conversations, designed UX/UI for 12+ pages, and ensured seamless transitions when their tech stack evolved.",
    outcome: "We kickstarted their product with an MVP users enjoyed, accelerating go-to-market, ensuring smooth user engagement, and avoiding overhead costs. We continue supporting their platform evolution.",
    overview: "Constructive Built Environment is a team of water industry professionals solving complex procurement challenges. They create value through solutions that make procurement and deployment easier, more effective, and transparent.",
    challenges: [
      "Startup resource constraints prevented rapid MVP development",
      "Need for all-in-one partner without fragmented support",
      "Hiring full-time team would be costly and slow",
      "Managing multiple contractors threatened process speed",
      "Required rapid market entry for early adopter capture"
    ],
    solution: [
      {
        title: "Strategic Partnership",
        description: "Operated as extension of Constructive team, clarifying vision, uncovering friction points, and proposing improvements beyond initial scope."
      },
      {
        title: "MVP Development",
        description: "Custom-developed UX/UI for 12+ pages: invoicing, project tracking, lead management, service publishing, vendor listings, and multi-step registration."
      },
      {
        title: "Platform Architecture",
        description: "Designed architecture for long-term scalability and tested full user journey before handoff with rapid iteration feedback."
      },
      {
        title: "Framework Flexibility",
        description: "When client switched to Tailwind CSS and Gatsby, ensured painless transition while adapting work and maintaining design integrity."
      }
    ],
    results: [
      {
        metric: "Timeline",
        value: "Accelerated Launch",
        description: "Rapid MVP delivery enabled faster go-to-market without delays of internal hiring or multi-contractor management."
      },
      {
        metric: "UX",
        value: "Frictionless Procurement",
        description: "CART platform delivers frictionless procurement process ensuring smooth vendor-utility transactions."
      },
      {
        metric: "Scalability",
        value: "On-Demand Growth",
        description: "On-demand model allows scaling development efforts based on evolving needs without fixed overhead."
      },
      {
        metric: "Cost",
        value: "Efficient Delivery",
        description: "High-quality development and UX/UI design delivered at fraction of full-time staff hiring costs."
      }
    ],
    technologies: ["React", "Bootstrap", "Tailwind CSS", "Gatsby", "Magnolia CMS"],
    featured: false
  },

  {
    id: "admin-partners",
    slug: "admin-partners",
    client: "Admin Partners",
    industry: "Professional Services",
    location: "United States",
    headline: "Streamlining Core Systems for Operational Excellence",
    heroImageSrc: "/case-studies/admin-partners.webp",
    heroImageAlt: "Admin Partners systems-integration thumbnail from the legacy Amalgam case study",
    problem: "Admin Partners faced operational bottlenecks due to disconnected core systems that didn't work seamlessly together, creating friction in their business processes.",
    approach: "We assessed their core systems architecture, identified integration gaps, and implemented solutions to streamline their operational workflows and data flow.",
    outcome: "Admin Partners gained improved operational efficiency through better system integration and streamlined business processes.",
    overview: "Admin Partners provides professional administrative services to help businesses optimize their operations. They needed to modernize their internal systems to better serve their clients.",
    challenges: [
      "Disconnected systems created operational inefficiencies",
      "Limited visibility across business processes",
      "Manual data entry and duplicate efforts",
      "Difficulty scaling operations"
    ],
    solution: [
      {
        title: "Systems Assessment",
        description: "Comprehensive evaluation of current core systems and integration points."
      },
      {
        title: "Integration Planning",
        description: "Designed integration approach to connect systems and improve data flow."
      },
      {
        title: "Implementation",
        description: "Executed system improvements to streamline operations."
      },
      {
        title: "Optimization",
        description: "Fine-tuned processes for maximum efficiency and scalability."
      }
    ],
    results: [
      {
        metric: "Efficiency",
        value: "Improved",
        description: "Streamlined workflows reduced manual work and operational overhead."
      },
      {
        metric: "Integration",
        value: "Connected Systems",
        description: "Core systems now work seamlessly together for better data flow."
      },
      {
        metric: "Scalability",
        value: "Ready to Grow",
        description: "Improved systems foundation supports business growth."
      },
      {
        metric: "Operations",
        value: "Optimized",
        description: "Better visibility and control across operational processes."
      }
    ],
    technologies: ["Systems Integration", "Process Optimization"],
    featured: false
  },

  {
    id: "mt-bank",
    slug: "mt-bank",
    client: "M&T Bank",
    industry: "Banking",
    location: "New York State",
    headline: "How We Helped M&T Bank Navigate a Complex Legacy System Replacement",
    heroImageSrc: "/case-studies/mt-bank.webp",
    heroImageAlt: "M&T Bank digital-banking modernization thumbnail from the legacy Amalgam case study",
    problem: "M&T Bank's business banking platform operated on Voyager, a legacy system. When the vendor announced discontinuation of support, M&T faced a mission-critical decision: modernize or risk operational vulnerabilities.",
    approach: "We joined as a strategic implementation partner, providing skilled consultants to support decommissioning and helping M&T reimagine their digital banking experience. We evaluated multiple digital banking vendors using a matrix of 130+ business use cases, facilitated the selection of Q2, and delivered change management including training and documentation.",
    outcome: "M&T successfully transitioned from the aging Voyager platform to Q2's modern, cloud-based solution with seamless integration into existing tools and successful cross-departmental adoption.",
    overview: "M&T Bank is one of the largest commercial banks in the United States, offering financial solutions across retail, commercial, and institutional markets. The bank needed to modernize its digital infrastructure to better serve evolving customer needs and address vendor discontinuation.",
    challenges: [
      "Vendor discontinuation of legacy Voyager platform requiring immediate action",
      "Complex technical integration: Voyager deeply embedded with dependencies across IT, operations, compliance, and business units",
      "High licensing costs for legacy systems creating unnecessary overhead",
      "Internal delays in vendor selection slowing transformation timeline",
      "Need for extensive change management across all business and technical teams"
    ],
    solution: [
      {
        title: "Vendor Evaluation & Selection",
        description: "Conducted comprehensive side-by-side assessments of multiple platforms across scalability, security, UX, and integration capabilities using 130+ business use cases."
      },
      {
        title: "Middleware Modernization",
        description: "Replaced Tibco middleware with a Spring Boot-based microservices framework, enabling modern API-first integrations and reducing infrastructure costs."
      },
      {
        title: "Data Migration & Integration",
        description: "Built batch data pipelines and integration APIs for real-time and overnight synchronization, migrating data from Voyager to Q2 with validated mapping and transformation."
      },
      {
        title: "Change Management & Training",
        description: "Delivered internal training programs, clear stakeholder communications, and comprehensive operational documentation for smooth adoption across teams."
      }
    ],
    results: [
      {
        metric: "Platform",
        value: "Modernized",
        description: "Successfully implemented Q2 digital banking platform replacing legacy Voyager system."
      },
      {
        metric: "Infrastructure",
        value: "Optimized",
        description: "Replaced costly Tibco middleware with scalable, maintainable Spring Boot microservices."
      },
      {
        metric: "Integration",
        value: "Seamless",
        description: "Built secure integrations connecting Q2 to core banking systems and third-party solutions."
      },
      {
        metric: "Adoption",
        value: "Successful",
        description: "Enabled cross-departmental adoption through training, documentation, and change enablement."
      }
    ],
    technologies: ["Q2 Platform", "Spring Boot", "AWS", "PostgreSQL", "RESTful APIs", "Microservices"],
    featured: true
  },

  {
    id: "finra",
    slug: "finra",
    client: "FINRA",
    industry: "Financial Regulation",
    location: "United States",
    headline: "Enhancing Operations for Financial Market Integrity",
    heroImageSrc: "/case-studies/finra.webp",
    heroImageAlt: "FINRA operations-enhancement thumbnail from the legacy Amalgam case study",
    problem: "FINRA, the self-regulatory organization overseeing the financial industry, needed to enhance technical capabilities to support their regulatory mission and operational efficiency.",
    approach: "We provided strategic technology consulting to strengthen FINRA's systems and operations, enabling them to better serve their core mission of protecting investors and ensuring market integrity.",
    outcome: "FINRA gained enhanced technical capabilities supporting their regulatory responsibilities and improving operational effectiveness across the organization.",
    overview: "FINRA is the self-regulatory organization that protects investors and ensures integrity of financial markets by regulating broker-dealers and their representatives. They administer qualifying exams, enforce rules and federal securities laws, and maintain comprehensive oversight of the securities industry.",
    challenges: [
      "Supporting complex regulatory requirements across the financial industry",
      "Operating at scale with numerous broker-dealers and representatives",
      "Maintaining rigorous compliance and security standards",
      "Coordinating examinations, rule enforcement, and market monitoring"
    ],
    solution: [
      {
        title: "Technology Assessment",
        description: "Evaluated FINRA's existing technical infrastructure and identified optimization opportunities."
      },
      {
        title: "Systems Enhancement",
        description: "Implemented improvements to strengthen operational systems and regulatory capabilities."
      },
      {
        title: "Process Optimization",
        description: "Streamlined processes to support FINRA's regulatory functions and oversight responsibilities."
      }
    ],
    results: [
      {
        metric: "Capability",
        value: "Enhanced",
        description: "Strengthened technical systems supporting regulatory mission."
      },
      {
        metric: "Operations",
        value: "Improved",
        description: "Optimized processes for better effectiveness and efficiency."
      },
      {
        metric: "Impact",
        value: "Expanded",
        description: "Better positioned to protect investors and ensure market integrity."
      }
    ],
    technologies: ["Enterprise Systems", "Regulatory Technology"],
    featured: false
  }
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured)
}

// Unique industries from case studies for filtering
export const industries = [...new Set(caseStudies.map((cs) => cs.industry))]
