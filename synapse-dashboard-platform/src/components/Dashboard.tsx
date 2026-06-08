import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Video, CheckSquare, FolderOpen, Archive, FileText, Plus, Bell, 
  Search, Grid, List, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, 
  Calendar, Clock, MessageCircle, UserCheck, Target, Expand, LogOut, 
  Check, MoreHorizontal, Sparkles, Hash, Paperclip, Send, X, Menu, Settings, FolderKanban
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DEPARTMENTS_PAGE_1, DEPARTMENTS_PAGE_2, DEPARTMENTS_PAGE_3, 
  EMPLOYEES, DOCUMENTS, DIRECT_MESSAGES_CONTACTS 
} from '../data';
import { Department, Employee, DocumentItem, MessageContact } from '../types';

// Absolute path of our generated scenic background
const BACKGROUND_IMAGE_PATH = "/src/assets/images/lush_green_hills_1780929034971.png";

export default function Dashboard() {
  // Page Navigation State
  const [activeTab, setActiveTab] = useState<'Departments' | 'Employees' | 'Documents'>('Departments');
  const [currentPage, setCurrentPage] = useState<number>(2); // Default to page 2 like reference!
  
  // Real App States supporting interactive logic
  const [p1Depts, setP1Depts] = useState<Department[]>(DEPARTMENTS_PAGE_1);
  const [p2Depts, setP2Depts] = useState<Department[]>(DEPARTMENTS_PAGE_2);
  const [p3Depts, setP3Depts] = useState<Department[]>(DEPARTMENTS_PAGE_3);
  
  const [employeesList, setEmployeesList] = useState<Employee[]>(EMPLOYEES);
  const [documentsList, setDocumentsList] = useState<DocumentItem[]>(DOCUMENTS);
  const [dmContacts, setDmContacts] = useState<MessageContact[]>(DIRECT_MESSAGES_CONTACTS);
  
  // Interaction and Selection States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptIds, setSelectedDeptIds] = useState<string[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatMessageText, setChatMessageText] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptSub, setNewDeptSub] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');
  const [newDeptHeadUser, setNewDeptHeadUser] = useState('');
  const [newDeptMembers, setNewDeptMembers] = useState(10);
  const [newDeptProjects, setNewDeptProjects] = useState(4);
  const [newDeptBudget, setNewDeptBudget] = useState(50);

  // Mobile navigation drawer toggle
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Helper mapping pages to current department arrays
  const getCurrentPageDepts = () => {
    if (currentPage === 1) return p1Depts;
    if (currentPage === 2) return p2Depts;
    return p3Depts;
  };

  const updateCurrentPageDepts = (updated: Department[]) => {
    if (currentPage === 1) setP1Depts(updated);
    else if (currentPage === 2) setP2Depts(updated);
    else setP3Depts(updated);
  };

  // Filtered Lists based on search query
  const filteredDepartments = useMemo(() => {
    const list = getCurrentPageDepts();
    if (!searchQuery.trim()) return list;
    return list.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.headUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentPage, p1Depts, p2Depts, p3Depts, searchQuery]);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employeesList;
    return employeesList.filter(e => 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employeesList, searchQuery]);

  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documentsList;
    return documentsList.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.uploaderName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documentsList, searchQuery]);

  const activeChatContact = useMemo(() => {
    return dmContacts.find(c => c.id === activeChatId) || null;
  }, [dmContacts, activeChatId]);

  // Actions
  const handleSelectAllDepts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = filteredDepartments.map(d => d.id);
      setSelectedDeptIds(allIds);
    } else {
      setSelectedDeptIds([]);
    }
  };

  const handleSelectDept = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedDeptIds(prev => [...prev, id]);
    } else {
      setSelectedDeptIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName || !newDeptCode || !newDeptHead) return;

    const newDept: Department = {
      id: `dept-custom-${Date.now()}`,
      code: newDeptCode.toUpperCase().slice(0, 3),
      name: newDeptName,
      subtitle: newDeptSub || 'General Support',
      headName: newDeptHead,
      headUsername: newDeptHeadUser ? (newDeptHeadUser.startsWith('@') ? newDeptHeadUser : `@${newDeptHeadUser}`) : '@head',
      membersCount: Number(newDeptMembers) || 1,
      activeProjects: Number(newDeptProjects) || 0,
      budgetUsedPercent: Number(newDeptBudget) || 10,
      status: 'Active'
    };

    // Prepend to current active page list
    const currentList = getCurrentPageDepts();
    updateCurrentPageDepts([newDept, ...currentList]);

    // Reset Form & Close Modal
    setNewDeptCode('');
    setNewDeptName('');
    setNewDeptSub('');
    setNewDeptHead('');
    setNewDeptHeadUser('');
    setNewDeptMembers(10);
    setNewDeptProjects(4);
    setNewDeptBudget(50);
    setIsCreateModalOpen(false);
  };

  const handleSendMessage = () => {
    if (!chatMessageText.trim() || !activeChatId) return;

    const updatedContacts = dmContacts.map(contact => {
      if (contact.id === activeChatId) {
        return {
          ...contact,
          badgeCount: undefined, // Clear unread on interact
          messages: [
            ...contact.messages,
            { sender: 'user' as const, text: chatMessageText, time: 'Just now' }
          ]
        };
      }
      return contact;
    });

    setDmContacts(updatedContacts);
    setChatMessageText('');

    // Trigger simulated response
    setTimeout(() => {
      setDmContacts(prev => prev.map(contact => {
        if (contact.id === activeChatId) {
          return {
            ...contact,
            messages: [
              ...contact.messages,
              { sender: 'contact' as const, text: `Sistem Synapse menerima pesan Anda! Terima kasih, kami akan segera merespons secara real-time.`, time: 'Just now' }
            ]
          };
        }
        return contact;
      }));
    }, 1200);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 bg-[#F4F6F4]"
      style={{ minHeight: '680px' }}
    >
      {/* Dynamic Background matching screenshot style */}
      <div className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${BACKGROUND_IMAGE_PATH})` }} />
      
      {/* Blurred decorative layer to provide beautiful workspace look */}
      <div className="absolute inset-0 z-0 bg-slate-900/10 backdrop-blur-[2px]" />

      {/* Floating App Container inside Hero Frame */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row p-2 md:p-4 lg:p-6 select-none" style={{ minHeight: '650px' }}>
        
        {/* ================= SIDEBAR (LEFT) ================= */}
        {/* Desktop Sidebar: hidden on mobile, visible on desktop */}
        <aside className="hidden md:flex flex-col w-52 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg p-4 shrink-0 transition-all duration-300">
          {/* Sidebar App Launcher Header */}
          <div className="flex items-center gap-2 mb-6" id="sidebar-launcher">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white shadow-md">
              <Sparkles size={16} className="animate-pulse" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-800 tracking-wide font-display">SYNAPSE</h4>
              <p className="text-[10px] text-emerald-600 font-medium">Workspace Active</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-5 pr-1" style={{ maxHeight: '480px' }}>
            {/* General Section */}
            <div>
              <span className="text-[10px] font-bold text-slate-600 tracking-wider">General</span>
              <ul className="mt-2 space-y-1">
                <li>
                  <button 
                    onClick={() => setActiveTab('Departments')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'Departments' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <LayoutDashboard size={14} className="text-slate-600" />
                    <span>Overview</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('Employees'); }}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'Employees' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <Video size={14} className="text-slate-600" />
                    <span>Meeting Space</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <CheckSquare size={14} className="text-slate-600" />
                    <span>My Task</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('Documents')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'Documents' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <FolderOpen size={14} className="text-slate-600" />
                    <span>Directories</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <Archive size={14} className="text-slate-600" />
                    <span>Archived</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Spotlight Section */}
            <div>
              <span className="text-[10px] font-bold text-slate-600 tracking-wider">Spotlight</span>
              <ul className="mt-2 space-y-1.5">
                <li>
                  <a 
                    href="#live-demo" 
                    onClick={() => setActiveTab('Documents')}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-md bg-red-100 text-red-700 text-[9px] font-bold">PDF</span>
                    <span className="truncate text-[11px] text-slate-700 font-semibold">Project-brief.pdf</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 px-3 py-1">
                  <img 
                    src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format&fit=crop&q=80" 
                    alt="Uploader" 
                    className="w-5 h-5 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-semibold text-slate-800 truncate leading-none">Joshua Orlando</span>
                    <span className="text-[9px] text-slate-500 leading-none mt-0.5">Contributor</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Group Section */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-600 tracking-wider">Group</span>
                <button className="p-0.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100">
                  <Plus size={12} />
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                <li>
                  <button className="w-full flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <Hash size={13} className="text-slate-600" />
                    <span>General</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <Hash size={13} className="text-slate-600" />
                    <span>Designer Spot</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <Hash size={13} className="text-slate-600" />
                    <span>Report Only</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Messages Section */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-600 tracking-wider">Direct Messages</span>
                <button className="p-0.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100">
                  <Plus size={12} />
                </button>
              </div>
              <ul className="mt-2 space-y-1.5">
                {dmContacts.map((contact) => (
                  <li key={contact.id}>
                    <button 
                      onClick={() => setActiveChatId(contact.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${activeChatId === contact.id ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="relative shrink-0">
                          <img 
                            src={contact.avatar} 
                            alt={contact.name} 
                            className="w-4.5 h-4.5 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-white ${contact.isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        </div>
                        <span className="truncate text-[11px] text-slate-700 font-semibold">{contact.name}</span>
                      </div>
                      
                      {contact.badgeCount && contact.badgeCount > 0 && (
                        <span className="flex items-center justify-center h-4 px-1.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold leading-none shrink-0 scale-90">
                          {contact.badgeCount}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Sidebar Drawer Component (Sliding overlay) */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-slate-900 md:hidden"
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 z-50 w-60 bg-white p-5 flex flex-col md:hidden shadow-2xl overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white shadow-md">
                      <Sparkles size={16} />
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 tracking-wide font-display">SYNAPSE</h4>
                  </div>
                  <button 
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-900"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 space-y-6">
                  {/* System Sections identical to desktop */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">General</span>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <button 
                          onClick={() => { setActiveTab('Departments'); setIsMobileSidebarOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'Departments' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                        >
                          <LayoutDashboard size={14} />
                          <span>Overview</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => { setActiveTab('Employees'); setIsMobileSidebarOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'Employees' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                        >
                          <Video size={14} />
                          <span>Meeting Space</span>
                        </button>
                      </li>
                      <li>
                        <button onClick={() => setIsMobileSidebarOpen(false)} className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600">
                          <CheckSquare size={14} />
                          <span>My Task</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => { setActiveTab('Documents'); setIsMobileSidebarOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'Documents' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                        >
                          <FolderOpen size={14} />
                          <span>Directories</span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">Direct Messages</span>
                    <ul className="mt-2 space-y-2">
                      {dmContacts.map((contact) => (
                        <li key={contact.id}>
                          <button 
                            onClick={() => { setActiveChatId(contact.id); setIsMobileSidebarOpen(false); }}
                            className="w-full flex items-center gap-2.5 px-2 py-1 rounded-lg text-xs text-slate-700 font-semibold hover:bg-slate-50"
                          >
                            <img src={contact.avatar} alt={contact.name} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
                            <span>{contact.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ================= CENTER WORKSPACE PANEL ================= */}
        <main className="flex-1 flex flex-col md:mx-3 min-w-0 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-4 md:p-5 overflow-hidden transition-all duration-300">
          
          {/* Main Top Header Navigation */}
          <header className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              {/* Mobile Sidebar Toggle Button */}
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <Menu size={18} />
              </button>
              
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
              >
                <Plus size={14} />
                <span>Create</span>
              </button>

              <button 
                onClick={() => { setNotificationCount(0); }}
                className="relative p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
              >
                <Bell size={14} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                )}
              </button>
            </div>

            {/* Custom Interactive Search Bar */}
            <div className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <Search size={14} />
              </span>
              <input 
                type="text" 
                placeholder="Search departments, employees..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 pl-9 pr-4 py-1.5 rounded-lg text-xs border border-slate-200 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all text-slate-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Right Profile Circle */}
            <div className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
                alt="Account User" 
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                referrerPolicy="no-referrer"
              />
            </div>
          </header>

          {/* ================= THREE CORE ANALYTICS CARDS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4">
            
            {/* Card 1: Total Employees (Green Area Chart) */}
            <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 tracking-wider">Total Employees</span>
                <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded-md hover:bg-slate-100 bg-slate-50 font-semibold cursor-pointer">···</span>
              </div>
              
              <div className="mt-2.5 flex items-baseline justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight font-display">2,398</h3>
                  <p className="text-[9px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5 whitespace-nowrap">
                    <span>+5% growth</span>
                    <span className="text-slate-400 font-normal">compared to last month</span>
                  </p>
                </div>

                {/* Sparkling SVG Sparkline area graph and pulse effect on interactive */}
                <div className="w-20 h-10 shrink-0 select-none pb-1 relative">
                  <svg viewBox="0 0 100 50" className="w-full h-full h-5 text-emerald-600" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3"></stop>
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 0 40 Q 20 20, 35 30 T 70 20 T 100 5 L 100 50 L 0 50 Z" 
                      fill="url(#area-gradient)" 
                    />
                    <path 
                      d="M 0 40 Q 20 20, 35 30 T 70 20 T 100 5" 
                      fill="none" 
                      stroke="#059669" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      className="transition-all duration-1000"
                    />
                    <circle cx="100" cy="5" r="3.5" fill="#059669" className="animate-pulse" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Total Departments (Bar Chart & Active indicator) */}
            <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 tracking-wider">Total Departments</span>
                <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded-md hover:bg-slate-100 bg-slate-50 font-semibold cursor-pointer">···</span>
              </div>
              
              <div className="mt-2.5 flex items-baseline justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight font-display">
                    {p1Depts.length + p2Depts.length + p3Depts.length}
                  </h3>
                  <p className="text-[9px] font-semibold text-orange-600 mt-0.5">
                    1 new department <span className="text-slate-400 font-normal">added this quarter</span>
                  </p>
                </div>

                {/* Animated Minimal bar charts with Orange highlighted index */}
                <div className="flex items-end gap-1 h-9 select-none shrink-0 pb-0.5">
                  <div className="w-3 rounded-t-sm bg-slate-100 h-4 hover:bg-slate-200 transition-all duration-300" />
                  <div className="w-3 rounded-t-sm bg-slate-100 h-6 hover:bg-slate-200" />
                  <div className="w-3 rounded-t-sm bg-slate-100 h-5 hover:bg-slate-200" />
                  <div className="w-3 rounded-t-sm bg-slate-100 h-3 hover:bg-slate-200" />
                  <div className="w-3 rounded-t-sm bg-slate-100 h-4 hover:bg-slate-200" />
                  <div className="w-3 rounded-t-sm bg-orange-500 h-7 animate-pulse hover:bg-orange-600" />
                </div>
              </div>
            </div>

            {/* Card 3: Total Documents (Visual storage progress blocks) */}
            <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 tracking-wider">Total Documents</span>
                <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded-md hover:bg-slate-100 bg-slate-50 font-semibold cursor-pointer">···</span>
              </div>
              
              <div className="mt-2.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight font-display">39,291</h3>
                  <span className="text-[9px] text-slate-400 font-mono">2GB available out of 20GB</span>
                </div>
                
                {/* Horizontal Grid Blocks representing document meter from screenshot */}
                <div className="mt-2 flex items-center gap-0.5 h-3">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 h-full rounded-[1px] transition-all duration-300 ${i < 27 ? 'bg-indigo-600/90' : 'bg-slate-100 hover:bg-indigo-300'}`} 
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[9px] font-semibold text-slate-500">90% of storage capacity already used</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= TAB CONTROLLER SWITCHER ================= */}
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5">
            <div className="flex gap-2 p-0.5 bg-slate-100 rounded-lg self-start">
              {(['Departments', 'Employees', 'Documents'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Layout controls */}
            <div className="flex items-center gap-1.5 justify-end">
              <button className="p-1.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200">
                <Grid size={13} />
              </button>
              <button className="p-1.5 rounded-md bg-white text-slate-800 border border-slate-200">
                <List size={13} />
              </button>
            </div>
          </section>

          {/* ================= DYNAMIC LIST / TABLES PANEL ================= */}
          <section className="flex-1 overflow-x-auto mt-4 pr-1 scrollbar-thin" style={{ maxHeight: '315px' }}>
            
            {/* 1. DEPARTMENTS ACTIVE TAB VIEW */}
            {activeTab === 'Departments' && (
              <table className="w-full text-left border-collapse min-w-[650px] relative">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-2.5 px-3">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAllDepts}
                        checked={filteredDepartments.length > 0 && selectedDeptIds.length === filteredDepartments.length}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-3">Department Name</th>
                    <th className="py-2.5 px-3">Head</th>
                    <th className="py-2.5 px-3 text-center">Members</th>
                    <th className="py-2.5 px-3 text-center">Active Project</th>
                    <th className="py-2.5 px-3">Budget Used</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
                  {filteredDepartments.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                        Tidak ada departemen yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  ) : (
                    filteredDepartments.map((dept) => {
                      const isRowSelected = selectedDeptIds.includes(dept.id);
                      return (
                        <tr 
                          key={dept.id} 
                          className={`hover:bg-slate-50/70 transition-all ${isRowSelected ? 'bg-slate-50/90' : ''}`}
                        >
                          <td className="py-3 px-3">
                            <input 
                              type="checkbox" 
                              checked={isRowSelected}
                              onChange={(e) => handleSelectDept(dept.id, e.target.checked)}
                              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              {/* Circle logo abbreviation matching screenshot */}
                              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                dept.code === 'HR' ? 'bg-purple-100 text-purple-700' :
                                dept.code === 'FI' ? 'bg-emerald-100 text-emerald-700' :
                                dept.code === 'SA' ? 'bg-amber-100 text-amber-700' :
                                dept.code === 'IT' ? 'bg-blue-100 text-blue-700' :
                                dept.code === 'OP' ? 'bg-rose-100 text-rose-700' :
                                dept.code === 'PR' ? 'bg-indigo-100 text-indigo-700' :
                                'bg-teal-100 text-teal-700'
                              }`}>
                                {dept.code}
                              </span>
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-slate-800 leading-none">{dept.name}</span>
                                <span className="text-[10px] text-slate-500 leading-none mt-1 truncate">{dept.subtitle}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-col min-w-0">
                              <span className="text-slate-800 font-semibold leading-none">{dept.headName}</span>
                              <span className="text-[10px] text-slate-400 leading-none mt-1">{dept.headUsername}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center text-slate-600">{dept.membersCount} Members</td>
                          <td className="py-3 px-3 text-center text-slate-600 font-semibold">{dept.activeProjects}</td>
                          <td className="py-3 px-3 min-w-[120px]">
                            {/* Horizontal green-teal progress bar representing budget */}
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-600 shrink-0 font-mono text-right w-8">{dept.budgetUsedPercent}%</span>
                              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-1000 bg-teal-600" 
                                  style={{ width: `${dept.budgetUsedPercent}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              dept.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {dept.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100">
                              <MoreHorizontal size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}

            {/* 2. EMPLOYEES ACTIVE TAB VIEW */}
            {activeTab === 'Employees' && (
              <table className="w-full text-left border-collapse min-w-[650px] relative">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-600 uppercase bg-slate-50/50">
                    <th className="py-2.5 px-3">Employee Name</th>
                    <th className="py-2.5 px-3">Contact Email</th>
                    <th className="py-2.5 px-3">Department Role</th>
                    <th className="py-2.5 px-3 text-center">Pending Tasks</th>
                    <th className="py-2.5 px-3 text-center">Work Status</th>
                    <th className="py-2.5 px-3">Joined Period</th>
                    <th className="py-2.5 px-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        Tidak ada karyawan yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0" referrerPolicy="no-referrer" />
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 leading-none">{emp.name}</span>
                              <span className="text-[10px] text-slate-400 mt-1 leading-none">Synapse Team Member</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">{emp.email}</td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            <span className="text-slate-800 font-semibold leading-none">{emp.role}</span>
                            <span className="text-[10px] text-slate-500 mt-1 leading-none">{emp.department}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-600 font-semibold">{emp.activeTasks}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                            emp.status === 'Away' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                            'bg-slate-50 text-slate-500 border border-slate-200'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500">{emp.joinedDate}</td>
                        <td className="py-3 px-3">
                          <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100">
                            <MoreHorizontal size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* 3. DOCUMENTS ACTIVE TAB VIEW */}
            {activeTab === 'Documents' && (
              <table className="w-full text-left border-collapse min-w-[650px] relative">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-600 uppercase bg-slate-50/50">
                    <th className="py-2.5 px-3 font-semibold">Document Name</th>
                    <th className="py-2.5 px-3 text-center">Size</th>
                    <th className="py-2.5 px-3">Category Group</th>
                    <th className="py-2.5 px-3">Uploaded By</th>
                    <th className="py-2.5 px-3">Last Updated</th>
                    <th className="py-2.5 px-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 animate-pulse">
                        Tidak ada dokumen yang ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              doc.extension === 'pdf' ? 'bg-red-50 text-red-600 border border-red-150' : 
                              doc.extension === 'docx' ? 'bg-blue-50 text-blue-600 border border-blue-150' : 
                              doc.extension === 'fig' ? 'bg-purple-50 text-purple-600 border border-purple-150' : 
                              doc.extension === 'xlsx' ? 'bg-emerald-50 text-emerald-600 border border-emerald-150' : 
                              'bg-indigo-50 text-indigo-600'
                            }`}>
                              {doc.extension.toUpperCase()}
                            </span>
                            <span className="font-bold text-slate-800 truncate">{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-slate-500">{doc.size}</td>
                        <td className="py-3 px-3 text-slate-600 font-semibold">{doc.department}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <img src={doc.uploaderAvatar} alt={doc.uploaderName} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
                            <span className="text-slate-800 text-[11px] font-medium truncate">{doc.uploaderName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-400">{doc.lastUpdated}</td>
                        <td className="py-3 px-3">
                          <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100">
                            <MoreHorizontal size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </section>

          {/* ================= PAGINATION CONTROLLER (FOOTER) ================= */}
          <footer className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-auto">
            <span className="text-[11px] font-extrabold text-slate-500 font-mono tracking-tight">
              Page {currentPage} of 23
            </span>
            
            <div className="flex items-center gap-1.5 select-none font-mono">
              <button 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1 px-1.5 rounded bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-[10px]"
              >
                <ChevronsLeft size={10} className="inline mr-0.5" />
              </button>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 px-1.5 rounded bg-slate-50 border border-slate-200 text-slate-1000 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-[10px]"
              >
                <ChevronLeft size={10} className="inline mr-0.5" />
              </button>

              <button 
                onClick={() => setCurrentPage(1)}
                className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${currentPage === 1 ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'}`}
              >
                1
              </button>
              
              <button 
                onClick={() => setCurrentPage(2)} 
                className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${currentPage === 2 ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'}`}
              >
                2
              </button>
              
              <button 
                onClick={() => setCurrentPage(3)}
                className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${currentPage === 3 ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'}`}
              >
                3
              </button>

              <span className="px-1 text-slate-400 text-xs">...</span>

              {Array.from({ length: 3 }, (_, i) => 21 + i).map((pageNum) => (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${currentPage === pageNum ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'}`}
                >
                  {pageNum}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(23, prev + 1))}
                disabled={currentPage === 23}
                className="p-1 px-1.5 rounded bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-[10px]"
              >
                <ChevronRight size={10} className="inline ml-0.5" />
              </button>

              <button 
                onClick={() => setCurrentPage(23)}
                disabled={currentPage === 23}
                className="p-1 px-1.5 rounded bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-[10px]"
              >
                <ChevronsRight size={10} className="inline ml-0.5" />
              </button>
            </div>
          </footer>
        </main>

        {/* ================= RIGHT TOOLBAR CONTAINER (VERTICAL ICON TRAIL) ================= */}
        <aside className="hidden lg:flex flex-col w-12 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg p-2 shrink-0 justify-between items-center z-10 transition-all duration-300">
          
          <div className="flex flex-col items-center gap-3">
            {/* Top plus teal rounded */}
            <button className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow hover:bg-emerald-900 shrink-0 cursor-pointer">
              <Plus size={16} />
            </button>

            {/* Icons divider */}
            <div className="w-6 h-[1px] bg-slate-100" />

            <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg shrink-0">
              <Calendar size={14} />
            </button>

            <button 
              onClick={() => setActiveTab('Documents')}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg shrink-0"
            >
              <FolderKanban size={14} />
            </button>

            <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg shrink-0">
              <Clock size={14} />
            </button>

            <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg shrink-0">
              <MessageCircle size={14} />
            </button>

            <button 
              onClick={() => setActiveTab('Employees')}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg shrink-0"
            >
              <UserCheck size={14} />
            </button>

            <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg shrink-0">
              <Target size={14} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={toggleFullscreen}
              className={`p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg shrink-0 transition-colors ${isFullscreen ? 'text-emerald-700 bg-slate-100' : ''}`}
            >
              <Expand size={14} />
            </button>
            
            <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg shrink-0">
              <LogOut size={14} />
            </button>
          </div>
        </aside>

      </div>

      {/* ================= FLOATING ACTION MESSAGES CHAT DIALOUGE PANEL ================= */}
      <AnimatePresence>
        {activeChatId && activeChatContact && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            className="fixed bottom-4 right-4 z-50 w-72 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <header className="px-4 py-3 bg-emerald-800 text-white flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img src={activeChatContact.avatar} alt={activeChatContact.name} className="w-7 h-7 rounded-full object-cover border border-white/20" referrerPolicy="no-referrer" />
                  <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${activeChatContact.isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight font-display">{activeChatContact.name}</h4>
                  <span className="text-[9px] text-white/70 block leading-none mt-0.5">{activeChatContact.role}</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveChatId(null)}
                className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
              >
                <X size={14} />
              </button>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/50">
              {activeChatContact.messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs shadow-sm shadow-black/1 ${
                      msg.sender === 'user' ? 'bg-emerald-700 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <span className={`text-[8px] mt-1 block text-right font-medium ${
                      msg.sender === 'user' ? 'text-white/60' : 'text-slate-400'
                    }`}>{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Field */}
            <div className="p-2 border-t border-slate-100 flex items-center gap-1.5 shrink-0 bg-white">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50">
                <Paperclip size={14} />
              </button>
              <input 
                type="text" 
                placeholder="Message..." 
                value={chatMessageText}
                onChange={(e) => setChatMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 text-xs bg-slate-50 rounded-full px-3 py-1.5 border border-slate-200 focus:outline-none focus:border-emerald-700 focus:bg-white text-slate-800"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatMessageText.trim()}
                className="p-1.5 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Send size={12} className="mr-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL FOR CREATING A NEW DEPARTMENT / DATA WORKSPACE ================= */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
            {/* Modal Overlay background blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            {/* Form modal container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 z-10 flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1 font-display uppercase tracking-wider">
                  <Sparkles size={13} className="text-emerald-700" />
                  <span>Tambah Departemen Baru</span>
                </h3>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-900"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={handleCreateDepartment} className="mt-3.5 space-y-3.5 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Kode Dept</label>
                    <input 
                      type="text" 
                      maxLength={3}
                      placeholder="e.g. MK"
                      required
                      value={newDeptCode}
                      onChange={(e) => setNewDeptCode(e.target.value.toUpperCase())}
                      className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 font-bold focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Departemen</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Marketing"
                      required
                      value={newDeptName}
                      onChange={(e) => setNewDeptName(e.target.value)}
                      className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Detail Sub/Fokus</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Brand & Social Media"
                    value={newDeptSub}
                    onChange={(e) => setNewDeptSub(e.target.value)}
                    className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Kepala Dept</label>
                    <input 
                      type="text" 
                      placeholder="Kenneth"
                      required
                      value={newDeptHead}
                      onChange={(e) => setNewDeptHead(e.target.value)}
                      className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Username Kepala</label>
                    <input 
                      type="text" 
                      placeholder="@kennethsm"
                      value={newDeptHeadUser}
                      onChange={(e) => setNewDeptHeadUser(e.target.value)}
                      className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Jumlah Anggota</label>
                    <input 
                      type="number" 
                      min={1} 
                      value={newDeptMembers}
                      onChange={(e) => setNewDeptMembers(Number(e.target.value))}
                      className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Proyek Aktif</label>
                    <input 
                      type="number" 
                      min={0}
                      value={newDeptProjects}
                      onChange={(e) => setNewDeptProjects(Number(e.target.value))}
                      className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Persen Budget%</label>
                    <input 
                      type="number" 
                      min={0} 
                      max={100}
                      value={newDeptBudget}
                      onChange={(e) => setNewDeptBudget(Number(e.target.value))}
                      className="mt-1 w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700 animate-pulse font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow transition-colors cursor-pointer"
                >
                  Tambahkan Departemen
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
