export const scenariosData = [
    {
        profile: 'img/team-1.jpeg',
        type: 'Mortgage - Pre-approval',
        title: "What's slowing down your mortgage journey?",
        quote: 'How can we guide customers through a complex mortgage process in a way that feels personalised, and transparent without losing momentum?',
        description: 'In this journey, we show how Pega helps a customer move through the pre-approval process— switching channels when needed, providing fast-tracked approval where possible, and re-engaging with the customer intelligently when they get distracted or seem to be stuck and need help.',
        proofPoints: [
            '<strong>Guided onboarding</strong>: Customers are led step by step — but can pause and return to application without losing previously provided information.',
            '<strong>Omnichannel re-engagement</strong>: Email and SMS reminders bring customers back to where they left off, increasing completion rates.',
            '<strong>Human + digital orchestration</strong>: Balance intelligent automation with human-led advisory support, depending on each customer\'s needs.',
            '<strong>Smart branching logic</strong>: Instantly fast-track low-risk applicants or seamlessly offer advisor support for more complex profiles.',
            '<strong>Integrated document handling</strong>: Upload, track, and verify required documents — all visible in a dynamic dashboard.'
        ],
        technologies: [
            'Pega Process Fabric',
            'Pega Customer Service',
            'Constellation',
            'Pega CoExistence (remote case types)',
            'DX Accelerator'
        ],
        image: 'img/mortgage.jpg',
        caseTypeId: 'Labb-LabbCS-Work-Service-MortgagePreApproval',
        clients: [
            'angular-rabobank',
            'angular-citibank',
            'react-hsbc'
        ]
    },
    {
        profile: 'img/team-2.jpeg',
        type: 'Healthcare - Personalised Plan Enrolment',
        title: 'Are your patients falling through the cracks?',
        quote: 'How do we intelligently guide patients to the right care plan, personalise their options, and keep them engaged post-enrolment?',
        description: 'Enrolling in health care should be easy — but rigid systems and disconnected services leave patients confused and disengaged.​ Watch how Pega intelligently recommends the most suitable healthcare plan, simplifies onboarding, and keeps patients connected through every step.',
        proofPoints: [
            '<strong>Intelligent triage</strong>: Guide patients to the right care plan based on real risk data.',
            '<strong>Improved enrolment rates</strong>: Simple, streamlined flows reduce friction and confusion.',
            '<strong>Proactive engagement</strong>: Keep patients involved post-enrolment with timely check-ins.',
            '<strong>Personalised at scale</strong>: Dynamically tailor care options based on individual preferences and clinical need.',
            '<strong>Operational efficiency</strong>: Automation handles the bulk of admin work — freeing up clinicians.'
        ],
        technologies: [
            'Constellation',
            'DX Accelerator'
        ],
        image: 'img/healthcare.jpg',
        caseTypeId: 'Labb-LabbCS-Work-Service-UpgradeCarePlan',
        clients: [
            'react-nhs',
            'vue-hca'
        ]
    },
    {
        profile: 'img/team-3.jpeg',
        type: 'Insurance - Life insurance application',
        title: 'Why do life insurance applications still feel like hard work?',
        quote: 'How can we digitise and simplify complex insurance applications, while tailoring the journey to the customer\'s risk profile?',
        description: 'How can we use AI to deflect support volume, guide customers to the right answer, and bring in a live agent only when needed — all within a fully branded experience?',
        proofPoints: [
            '<strong>Truly hybrid support</strong>: Start with an AI assistant (Knowledge Buddy) and escalate to live chat when the bot reaches its limit — no dropped context.',
            '<strong>Customer-first branding</strong>: A fully custom chat client ensures the support experience matches the brand. Not a generic web widget.',
            '<strong>Smarter self-service</strong>: Customers get accurate, context-aware answers instantly, reducing wait time and avoiding call center traffic.',
            '<strong>Human-in-the-loop</strong>: On request, Pega Digital Messaging routes the chat to an agent with full conversation history.',
        ],
        technologies: [
            'Constellation',
            'DX Accelerator',
            'Pega Knowledge Buddy',
            'Pega Customer Service',
            'Digital Messaging',
            'ClientAPI',
            'Custom front/back-end chat server and UX'
        ],
        image: 'img/insurance.jpg',
        caseTypeId: 'Labb-LabbCS-Work-Service-InsuranceIssuance',
        clients: [
            'angular-athora',
            'angular-rabobank',
            'angular-citibank',
            'react-hsbc'
        ]
    },
    {
        profile: 'img/team-4.jpeg',
        type: 'Bike Tour - Red Rock Canyon Self-Service Planner',
        title: 'What does a modern customer experience look like — end to end?',
        quote: 'How do we deliver a seamless, self-service booking experience that feels personal, dynamic, and flexible even when things change?',
        description: 'From selection to scheduling to last-minute changes, this journey shows how Pega enables a smooth, responsive self-service experience — just like a real-world adventure should feel.',
        proofPoints: [
            '<strong>End-to-end self service</strong>: From booking to last-mile logistics, it\'s all handled in one flow.',
            '<strong>Cross-channel continuity</strong>: Chat, web, and email all carry the same case — no duplication or restarts.',
            '<strong>Dynamic experience</strong>: The journey adapts in real-time based on customer choices and context.',
            '<strong>Back-office integration</strong>: Operations teams stay in sync with customer activity, resolving issues fast.'
        ],
        technologies: [
            'Constellation',
            'Pega Knowledge Buddy',
            'DX Accelerator',
            'Digital Messaging',
            'ClientAPI',
            'Custom front/back-end chat server and UX'
        ],
        image: 'img/mountain-bike.jpg',
        caseTypeId: 'Labb-LabbCS-Work-Service-BikeTourBooking',
        clients:[
            'react-lvcyclery'
        ]
    },
    {
        profile: 'img/team-4.jpeg',
        type: 'Pick up where you left off',
        title: 'What happened to my service request?',
        quote: '',
        description: 'Imagine giving your customers the power to take control—anytime, anywhere. With our intuitive self-service portal, users can instantly view any pending tasks requiring their attention. Whether it\'s approving requests, completing forms, or tracking progress, everything they need is in one place. This seamless experience not only boosts engagement but also streamlines operations, ensuring faster turnaround times and improved satisfaction.',
        proofPoints: [
            '<strong>Empowerment</strong>: Empowers users to act independently without waiting on support',
            '<strong>Efficiency</strong>: Speeds up task completion and overall workflow',
            '<strong>Transparency</strong>: Improves transparency by making action items visible and trackable',
            '<strong>Accountability</strong>: Reduces missed deadlines through timely task notifications',
            '<strong>Satisfaction</strong>: Enhances customer satisfaction with 24/7 accessibility and control',
        ],
        technologies: [
            'Constellation',
            'DX Accelerator',
            'Worklists'
        ],
        image: 'img/work-from-home.jpg',
        pageId: 'pyWorklist',
        pageClass: 'Data-Portal'
    },
    {
        image: 'img/fnol.png',
        type: 'First notice of loss',
        title: '',
        quote: '',
        description: 'Notifying your insurance company when something goes wrong shouldn\'t be a struggle. With our DX accelerator and AI-Driven process, we are making the process of your customers filling out the required details to make a claim seamless.',
        proofPoints: [
            'Seamless user experience: Customer\'s are guided through a simple process of submitting their details, utilising our DX Accelerator for a process that is integrated into your design system giving trust to your customers',
            'AI-Driven: Utilising the latest Generative AI technology to speed up customer data capture, means they only need to capture the details that matter, not re-keying information from other places.',
            'All in one place - Utilising Pega\'s omni-channel design, the same process your customer\'s capture their data can be routed to your agents for review. This reduces duplication of data and keep\'s your processes in one central location'
        ],
        technologies: [
            'Constellation',
            'DX Accelerator',
            'Pega GenAI'
        ],
        caseTypeId: 'Labb-LabbCS-Work-Service-FNOL-ClaimIntake',
        clients: [
            'react-fbto',
            'react-centraalbeheer'
        ]
    }
]