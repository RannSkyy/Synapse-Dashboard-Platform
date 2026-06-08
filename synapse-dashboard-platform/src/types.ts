/**
 * Types & Interfaces for the Synapse Collaborative Platform
 */

export interface Department {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  headName: string;
  headUsername: string;
  membersCount: number;
  activeProjects: number;
  budgetUsedPercent: number;
  status: 'Active' | 'Inactive';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  activeTasks: number;
  status: 'Active' | 'Away' | 'Offline';
  joinedDate: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  extension: 'pdf' | 'docx' | 'fig' | 'xlsx' | 'zip';
  department: string;
  uploaderName: string;
  uploaderAvatar: string;
  lastUpdated: string;
  isStarred?: boolean;
}

export interface MessageContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  badgeCount?: number;
  isOnline: boolean;
  messages: Array<{
    sender: 'user' | 'contact';
    text: string;
    time: string;
  }>;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
