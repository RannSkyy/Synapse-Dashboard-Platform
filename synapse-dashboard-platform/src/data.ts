import { Department, Employee, DocumentItem, MessageContact } from './types';

// Mock Departments for Page 1
export const DEPARTMENTS_PAGE_1: Department[] = [
  {
    id: 'd101',
    code: 'MK',
    name: 'Marketing',
    subtitle: 'Brand & Growth',
    headName: 'Kevin Foster',
    headUsername: '@kevinfoster',
    membersCount: 15,
    activeProjects: 9,
    budgetUsedPercent: 45,
    status: 'Active'
  },
  {
    id: 'd102',
    code: 'LE',
    name: 'Legal',
    subtitle: 'Compliance & Admin',
    headName: 'Susan Vance',
    headUsername: '@susanvance',
    membersCount: 4,
    activeProjects: 1,
    budgetUsedPercent: 82,
    status: 'Active'
  },
  {
    id: 'd103',
    code: 'RD',
    name: 'Research & Dev',
    subtitle: 'Deep Tech Lab',
    headName: 'Dr. Aris Thorne',
    headUsername: '@aristhorne',
    membersCount: 28,
    activeProjects: 16,
    budgetUsedPercent: 73,
    status: 'Active'
  },
  {
    id: 'd104',
    code: 'SE',
    name: 'Security',
    subtitle: 'Threat Mitigation',
    headName: 'Leo Vance',
    headUsername: '@leovance',
    membersCount: 8,
    activeProjects: 4,
    budgetUsedPercent: 24,
    status: 'Active'
  },
  {
    id: 'd105',
    code: 'DE',
    name: 'Design',
    subtitle: 'Brand Experience',
    headName: 'Chloe Carter',
    headUsername: '@chloecarter',
    membersCount: 14,
    activeProjects: 7,
    budgetUsedPercent: 56,
    status: 'Active'
  },
  {
    id: 'd106',
    code: 'BI',
    name: 'Business Intelligence',
    subtitle: 'Data Insights',
    headName: 'Dan Wu',
    headUsername: '@danwu',
    membersCount: 10,
    activeProjects: 5,
    budgetUsedPercent: 39,
    status: 'Active'
  },
  {
    id: 'd107',
    code: 'QA',
    name: 'Quality Assurance',
    subtitle: 'Testing Hub',
    headName: 'Tracy Lin',
    headUsername: '@tracylin',
    membersCount: 12,
    activeProjects: 6,
    budgetUsedPercent: 41,
    status: 'Active'
  }
];

// Exact Departments shown on Page 2 in the reference image
export const DEPARTMENTS_PAGE_2: Department[] = [
  {
    id: 'dept-hr',
    code: 'HR',
    name: 'Human Resources',
    subtitle: 'People & Culture',
    headName: 'Kenneth Smith',
    headUsername: '@kennethsm',
    membersCount: 19,
    activeProjects: 12,
    budgetUsedPercent: 68,
    status: 'Active'
  },
  {
    id: 'dept-fi',
    code: 'FI',
    name: 'Finance',
    subtitle: 'Accounting & Report...',
    headName: 'John Roberts',
    headUsername: '@johnroberts',
    membersCount: 21,
    activeProjects: 5,
    budgetUsedPercent: 12,
    status: 'Active'
  },
  {
    id: 'dept-sa',
    code: 'SA',
    name: 'Sales',
    subtitle: 'Revenue & Growth',
    headName: 'Sharon Anderson',
    headUsername: '@sharonanderson',
    membersCount: 33,
    activeProjects: 2,
    budgetUsedPercent: 32,
    status: 'Active'
  },
  {
    id: 'dept-it',
    code: 'IT',
    name: 'Information Tec...',
    subtitle: 'System & Support',
    headName: 'Elizabeth Rodriguez',
    headUsername: '@elizabethrodriguez',
    membersCount: 12,
    activeProjects: 8,
    budgetUsedPercent: 67,
    status: 'Active'
  },
  {
    id: 'dept-op',
    code: 'OP',
    name: 'Operations',
    subtitle: 'Process & Delivery',
    headName: 'Mark Simmons',
    headUsername: '@marksimmons',
    membersCount: 11,
    activeProjects: 11,
    budgetUsedPercent: 87,
    status: 'Active'
  },
  {
    id: 'dept-pr',
    code: 'PR',
    name: 'Product',
    subtitle: 'Strategy & Develop...',
    headName: 'Justin Johnson',
    headUsername: '@justinjohnson',
    membersCount: 6,
    activeProjects: 4,
    budgetUsedPercent: 14,
    status: 'Active'
  },
  {
    id: 'dept-cs',
    code: 'CS',
    name: 'Customer Succe...',
    subtitle: 'Customer Experience',
    headName: 'Shirely Young',
    headUsername: '@shirelyyoung',
    membersCount: 18,
    activeProjects: 3,
    budgetUsedPercent: 4,
    status: 'Inactive'
  }
];

// Mock Departments for Page 3
export const DEPARTMENTS_PAGE_3: Department[] = [
  {
    id: 'd301',
    code: 'PR',
    name: 'Public Relations',
    subtitle: 'Corporate Comms',
    headName: 'Jessica Bell',
    headUsername: '@jessicabell',
    membersCount: 8,
    activeProjects: 3,
    budgetUsedPercent: 40,
    status: 'Active'
  },
  {
    id: 'd302',
    code: 'LO',
    name: 'Logistics',
    subtitle: 'Supply Chain Management',
    headName: 'David Mercer',
    headUsername: '@davidmercer',
    membersCount: 14,
    activeProjects: 6,
    budgetUsedPercent: 55,
    status: 'Active'
  },
  {
    id: 'd303',
    code: 'AN',
    name: 'Analytics',
    subtitle: 'Big Data & AI Model',
    headName: 'Thomas Thorne',
    headUsername: '@thomasthorne',
    membersCount: 11,
    activeProjects: 8,
    budgetUsedPercent: 89,
    status: 'Active'
  },
  {
    id: 'd304',
    code: 'TR',
    name: 'Training',
    subtitle: 'L&D Curriculum Development',
    headName: 'Sandra Fox',
    headUsername: '@sandrafox',
    membersCount: 5,
    activeProjects: 2,
    budgetUsedPercent: 18,
    status: 'Active'
  }
];

// Compilation list for search and dynamically switching lists
export const ALL_DEPARTMENTS = [
  ...DEPARTMENTS_PAGE_1,
  ...DEPARTMENTS_PAGE_2,
  ...DEPARTMENTS_PAGE_3
];

// Preset Employee Data representing detailed cards
export const EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Kenneth Smith',
    email: 'kenneth.smith@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Head of Human Resources',
    department: 'Human Resources',
    activeTasks: 12,
    status: 'Active',
    joinedDate: 'Jan 2023'
  },
  {
    id: 'emp-2',
    name: 'John Roberts',
    email: 'john.roberts@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Finance Controller',
    department: 'Finance',
    activeTasks: 5,
    status: 'Active',
    joinedDate: 'Mar 2022'
  },
  {
    id: 'emp-3',
    name: 'Sharon Anderson',
    email: 'sharon.anderson@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'VP Sales & Growth',
    department: 'Sales',
    activeTasks: 8,
    status: 'Active',
    joinedDate: 'Nov 2021'
  },
  {
    id: 'emp-4',
    name: 'Elizabeth Rodriguez',
    email: 'elizabeth.r@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'IT Director & Security',
    department: 'Information Tech',
    activeTasks: 15,
    status: 'Active',
    joinedDate: 'Jun 2024'
  },
  {
    id: 'emp-5',
    name: 'Mark Simmons',
    email: 'mark.simmons@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'Chief Operations Officer',
    department: 'Operations',
    activeTasks: 18,
    status: 'Active',
    joinedDate: 'Sep 2020'
  },
  {
    id: 'emp-6',
    name: 'Justin Johnson',
    email: 'justin.johnson@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'Product VP',
    department: 'Product',
    activeTasks: 6,
    status: 'Active',
    joinedDate: 'Feb 2023'
  },
  {
    id: 'emp-7',
    name: 'Shirely Young',
    email: 'shirely.young@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Client Success Manager',
    department: 'Customer Success',
    activeTasks: 3,
    status: 'Away',
    joinedDate: 'Oct 2023'
  },
  {
    id: 'emp-8',
    name: 'Jerry Moore',
    email: 'jerry.moore@synapse.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'Lead UX Engineer',
    department: 'Design',
    activeTasks: 10,
    status: 'Active',
    joinedDate: 'Dec 2022'
  }
];

// Preset Document Data representing files in our storage
export const DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Project-brief.pdf',
    size: '4.2 MB',
    extension: 'pdf',
    department: 'Product & Design',
    uploaderName: 'Joshua Orlando',
    uploaderAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80',
    lastUpdated: '2 hours ago',
    isStarred: true
  },
  {
    id: 'doc-2',
    name: 'Annual-report-2026.docx',
    size: '12.8 MB',
    extension: 'docx',
    department: 'Finance & Accounts',
    uploaderName: 'John Roberts',
    uploaderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    lastUpdated: '1 day ago'
  },
  {
    id: 'doc-3',
    name: 'Design-system-v2.fig',
    size: '85.3 MB',
    extension: 'fig',
    department: 'Brand Design',
    uploaderName: 'Angela Brown',
    uploaderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastUpdated: '3 days ago',
    isStarred: true
  },
  {
    id: 'doc-4',
    name: 'Employee-handbook_v4.pdf',
    size: '2.1 MB',
    extension: 'pdf',
    department: 'People & Culture',
    uploaderName: 'Kenneth Smith',
    uploaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastUpdated: '5 days ago'
  },
  {
    id: 'doc-5',
    name: 'Roadmap_2026_final.xlsx',
    size: '1.5 MB',
    extension: 'xlsx',
    department: 'Product Board',
    uploaderName: 'Sharon Anderson',
    uploaderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastUpdated: '1 week ago'
  },
  {
    id: 'doc-6',
    name: 'Infrastructure_security.zip',
    size: '145.2 MB',
    extension: 'zip',
    department: 'IT Security',
    uploaderName: 'Raymond Diaz',
    uploaderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    lastUpdated: '1 week ago'
  }
];

// Direct Message Contacts from the Sidebar, along with preset interactive message data
export const DIRECT_MESSAGES_CONTACTS: MessageContact[] = [
  {
    id: 'dm-jerry',
    name: 'Jerry Moore',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    badgeCount: 2,
    isOnline: true,
    messages: [
      { sender: 'contact', text: 'Hi, can you review the new dashboard layout design?', time: '11:42 AM' },
      { sender: 'contact', text: 'I added the responsive tables we discussed yesterday!', time: '11:43 AM' },
      { sender: 'user', text: 'Hello Jerry! Let me take a look at it right away.', time: '12:05 PM' },
      { sender: 'contact', text: 'Awesome! Let me know if you spots any styling bugs.', time: '12:10 PM' }
    ]
  },
  {
    id: 'dm-kenneth',
    name: 'Kenneth Smith',
    role: 'HR Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    messages: [
      { sender: 'user', text: 'Hi Kenneth, is the onboarding folder ready in directories?', time: '09:12 AM' },
      { sender: 'contact', text: 'Yes! It is located in directories under Spotlight as Project-brief.', time: '09:30 AM' }
    ]
  },
  {
    id: 'dm-angela',
    name: 'Angela Brown',
    role: 'Lead UX Designer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    messages: [
      { sender: 'contact', text: 'We updated the brand assets to version 2!', time: 'Yesterday' },
      { sender: 'user', text: 'Perfect, downloading the .fig file from Documents.', time: 'Yesterday' }
    ]
  },
  {
    id: 'dm-amanda',
    name: 'Amanda Hall',
    role: 'Content Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badgeCount: 1,
    isOnline: false,
    messages: [
      { sender: 'contact', text: 'Can we schedule a meeting next week to align on the press release?', time: 'Friday' }
    ]
  },
  {
    id: 'dm-ryan',
    name: 'Ryan Miller',
    role: 'Sales Recruiter',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    badgeCount: 6,
    isOnline: true,
    messages: [
      { sender: 'contact', text: 'We have 6 new candidates who just passed the HR screening round!', time: 'Monday' }
    ]
  },
  {
    id: 'dm-ashley',
    name: 'Ashley Stewart',
    role: 'Marketing Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    messages: [
      { sender: 'user', text: 'Great work on the campaigns, Ashley!', time: 'Last Week' }
    ]
  },
  {
    id: 'dm-raymond',
    name: 'Raymond Diaz',
    role: 'SysOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    isOnline: false,
    messages: [
      { sender: 'contact', text: 'Production build checks are positive. Live on Cloud Run in port 3000.', time: 'May 30' }
    ]
  }
];
