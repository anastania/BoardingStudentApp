// Student Profile Types
export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  university: string;
  major: string;
  graduationYear: string;
  preferredLocation: string[];
  preferredRole: string[];
  availability: string;
  skills: string[];
  languages: string[];
  about: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

// CV Types
export interface CVDocument {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
  version: number;
}

// Company/Opportunity Types
export interface Company {
  id: string;
  name: string;
  logo: string;
  location: string;
  country: string;
  industry: string;
  size: string;
  description: string;
  website: string;
}

export interface Opportunity {
  id: string;
  companyId: string;
  company: Company;
  title: string;
  department: string;
  type: 'internship' | 'traineeship';
  duration: string;
  startDate: string;
  stipend: {
    amount: number;
    currency: string;
    period: 'month' | 'week';
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  status: 'open' | 'closed';
  createdAt: string;
}

export interface StudentOpportunity {
  id: string;
  opportunityId: string;
  opportunity: Opportunity;
  studentId: string;
  status: 'saved' | 'applied' | 'under_review' | 'interview_requested' | 'interview_scheduled' | 'offer_received' | 'accepted' | 'rejected' | 'dismissed';
  appliedAt?: string;
  notes?: string;
}

// Journey/Timeline Types
export type JourneyStage = 'profile' | 'matching' | 'interviews' | 'placement' | 'visa' | 'departure';

export interface JourneyStep {
  id: string;
  stage: JourneyStage;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  completedAt?: string;
  dueDate?: string;
  icon: string;
}

export interface Journey {
  studentId: string;
  currentStage: JourneyStage;
  steps: JourneyStep[];
  overallProgress: number;
}

// Notification Types
export interface Notification {
  id: string;
  studentId: string;
  type: 'opportunity' | 'interview' | 'message' | 'status_update' | 'deadline';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  studentId: string;
  advisorId: string;
  advisorName: string;
  advisorAvatar?: string;
  type: 'video' | 'phone' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled';
  scheduledAt: string;
  duration: number;
  notes?: string;
  meetingUrl?: string;
}

export interface TimeSlot {
  id: string;
  advisorId: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

// Resource Types
export interface Resource {
  id: string;
  category: 'housing' | 'visa' | 'local_life' | 'career' | 'preparation';
  title: string;
  description: string;
  content: string;
  icon: string;
  order: number;
}

// Message Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'student' | 'advisor';
  content: string;
  attachments?: string[];
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  studentId: string;
  advisorId: string;
  advisorName: string;
  advisorAvatar?: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  profileCompletion: number;
  savedOpportunities: number;
  appliedOpportunities: number;
  upcomingInterviews: number;
  unreadNotifications: number;
  overallProgress: number;
}
