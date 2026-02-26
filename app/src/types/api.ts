// ============================================
// API Types - Matching Boarding IA Backoffice API Contracts
// ============================================

// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  expires_in: number;
  user: User;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'advisor' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  university?: string;
  major?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  new_password: string;
}

// ============================================
// STUDENT PROFILE AI AGENT TYPES
// ============================================

export interface StudentProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  nationality?: string;
  university?: string;
  major?: string;
  graduation_year?: string;
  preferred_locations: string[];
  preferred_roles: string[];
  availability_date?: string;
  skills: string[];
  languages: string[];
  about?: string;
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  ai_score?: number;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileCreateRequest {
  first_name: string;
  last_name: string;
  phone?: string;
  nationality?: string;
  university?: string;
  major?: string;
  graduation_year?: string;
  preferred_locations?: string[];
  preferred_roles?: string[];
  availability_date?: string;
  skills?: string[];
  languages?: string[];
  about?: string;
}

export interface ProfileUpdateRequest extends Partial<ProfileCreateRequest> {
  status?: 'draft' | 'pending_review' | 'published' | 'archived';
}

// CV Document Types
export interface CVDocument {
  id: string;
  student_id: string;
  filename: string;
  url: string;
  file_type: 'pdf' | 'doc' | 'docx';
  file_size: number;
  version: number;
  is_current: boolean;
  uploaded_at: string;
  ai_parsed?: CVParseResult;
}

export interface CVUploadResponse {
  document: CVDocument;
  parse_status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface CVParseResult {
  raw_text: string;
  extracted_skills: ExtractedSkill[];
  extracted_experience: ExtractedExperience[];
  extracted_education: ExtractedEducation[];
  contact_info: ContactInfo;
  confidence_score: number;
  parsed_at: string;
}

export interface ExtractedSkill {
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  confidence: number;
}

export interface ExtractedExperience {
  company: string;
  title: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  current: boolean;
  description?: string;
  skills_used: string[];
}

export interface ExtractedEducation {
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  gpa?: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

// AI Profile Analysis
export interface ProfileAnalysis {
  student_id: string;
  overall_score: number;
  skill_score: number;
  experience_score: number;
  education_score: number;
  completeness_score: number;
  strengths: string[];
  gaps: string[];
  recommendations: Recommendation[];
  generated_at: string;
}

export interface Recommendation {
  type: 'skill' | 'experience' | 'education' | 'profile' | 'opportunity';
  priority: 'high' | 'medium' | 'low';
  message: string;
  actionable: boolean;
  action?: {
    type: string;
    label: string;
    url?: string;
  };
}

// ============================================
// AI MATCHING ENGINE TYPES
// ============================================

export interface MatchingScore {
  student_id: string;
  opportunity_id: string;
  overall_score: number;
  skill_match_score: number;
  experience_match_score: number;
  preference_match_score: number;
  cultural_fit_score: number;
  explanation: MatchingExplanation;
  calculated_at: string;
}

export interface MatchingExplanation {
  summary: string;
  matching_skills: string[];
  missing_skills: string[];
  skill_gaps: SkillGap[];
  location_match: boolean;
  role_match: boolean;
  key_reasons: string[];
}

export interface SkillGap {
  skill: string;
  importance: 'required' | 'preferred' | 'nice_to_have';
  student_has: boolean;
  alternative_skills?: string[];
}

export interface OpportunityMatch {
  opportunity: Opportunity;
  matching_score: MatchingScore;
  rank: number;
  ai_recommended: boolean;
}

export interface MatchingRequest {
  student_id: string;
  filters?: {
    locations?: string[];
    industries?: string[];
    min_stipend?: number;
    max_duration?: number;
    skills?: string[];
  };
  limit?: number;
}

export interface MatchingListResponse {
  matches: OpportunityMatch[];
  total_available: number;
  filters_applied: MatchingRequest['filters'];
}

// ============================================
// OPPORTUNITY TYPES
// ============================================

export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  location: string;
  country: string;
  industry: string;
  size: string;
  description: string;
  website?: string;
  created_at: string;
}

export interface Opportunity {
  id: string;
  company_id: string;
  company: Company;
  title: string;
  department: string;
  type: 'internship' | 'traineeship' | 'working_student';
  duration_months: number;
  start_date?: string;
  end_date?: string;
  stipend: {
    amount: number;
    currency: string;
    period: 'month' | 'week' | 'total';
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  required_skills: string[];
  preferred_skills: string[];
  status: 'draft' | 'open' | 'paused' | 'closed' | 'filled';
  ai_risk_score?: number;
  created_at: string;
  updated_at: string;
}

export interface OpportunitySearchFilters {
  query?: string;
  locations?: string[];
  industries?: string[];
  skills?: string[];
  min_stipend?: number;
  max_duration?: number;
  type?: ('internship' | 'traineeship' | 'working_student')[];
  status?: 'open' | 'all';
}

// Student Opportunity Interaction
export interface StudentOpportunity {
  id: string;
  student_id: string;
  opportunity_id: string;
  opportunity: Opportunity;
  status: StudentOpportunityStatus;
  saved_at?: string;
  applied_at?: string;
  application_notes?: string;
  advisor_notes?: string;
  ai_recommendation_score?: number;
  ai_risk_flags?: RiskFlag[];
  created_at: string;
  updated_at: string;
}

export type StudentOpportunityStatus =
  | 'saved'
  | 'applied'
  | 'under_review'
  | 'interview_requested'
  | 'interview_scheduled'
  | 'offer_received'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'
  | 'dismissed';

export interface ApplicationRequest {
  opportunity_id: string;
  cover_letter?: string;
  notes?: string;
  availability_confirmed: boolean;
}

export interface ApplicationResponse {
  student_opportunity: StudentOpportunity;
  next_steps: string[];
  estimated_response_time: string;
}

// ============================================
// PREDICTIVE RISK MODEL TYPES
// ============================================

export interface RiskFlag {
  type: 'placement' | 'integration' | 'performance' | 'retention' | 'visa' | 'cultural';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  factors: string[];
  recommendations: string[];
  detected_at: string;
}

export interface RiskAssessment {
  student_id: string;
  opportunity_id?: string;
  overall_risk_level: 'low' | 'medium' | 'high' | 'critical';
  risk_score: number;
  risk_flags: RiskFlag[];
  success_probability: number;
  key_concerns: string[];
  mitigation_strategies: string[];
  assessed_at: string;
  valid_until: string;
}

export interface RiskAlert {
  id: string;
  student_id: string;
  advisor_id?: string;
  type: RiskFlag['type'];
  severity: RiskFlag['severity'];
  title: string;
  message: string;
  status: 'new' | 'acknowledged' | 'in_progress' | 'resolved' | 'dismissed';
  acknowledged_at?: string;
  resolved_at?: string;
  created_at: string;
}

// ============================================
// JOURNEY TRACKING TYPES
// ============================================

export type JourneyStage = 'profile' | 'matching' | 'interviews' | 'placement' | 'visa' | 'departure';

export interface JourneyStep {
  id: string;
  stage: JourneyStage;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'blocked';
  order: number;
  completed_at?: string;
  due_date?: string;
  blocked_reason?: string;
  required_actions?: RequiredAction[];
  documents_needed?: string[];
}

export interface RequiredAction {
  id: string;
  type: 'document_upload' | 'profile_update' | 'appointment' | 'application' | 'approval' | 'manual';
  title: string;
  description: string;
  completed: boolean;
  completed_at?: string;
  url?: string;
}

export interface Journey {
  student_id: string;
  current_stage: JourneyStage;
  steps: JourneyStep[];
  overall_progress: number;
  estimated_completion_date?: string;
  started_at: string;
  completed_at?: string;
  updated_at: string;
}

export interface JourneyProgressUpdate {
  step_id: string;
  status: JourneyStep['status'];
  completed_at?: string;
  notes?: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  read_at?: string;
  action_url?: string;
  created_at: string;
}

export type NotificationType =
  | 'opportunity_match'
  | 'application_update'
  | 'interview_scheduled'
  | 'message_received'
  | 'status_update'
  | 'deadline_reminder'
  | 'risk_alert'
  | 'profile_feedback'
  | 'appointment_reminder'
  | 'system';

export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  digest_frequency: 'immediate' | 'daily' | 'weekly' | 'none';
  types: Record<NotificationType, boolean>;
}

// ============================================
// APPOINTMENT TYPES
// ============================================

export interface Appointment {
  id: string;
  student_id: string;
  advisor_id: string;
  advisor: Advisor;
  type: 'video' | 'phone' | 'chat' | 'in_person';
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  scheduled_at: string;
  duration_minutes: number;
  timezone: string;
  notes?: string;
  student_notes?: string;
  advisor_notes?: string;
  meeting_url?: string;
  recording_url?: string;
  ai_summary?: string;
  ai_recommendations?: string[];
  created_at: string;
  updated_at: string;
}

export interface Advisor {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  title?: string;
  bio?: string;
  specialties: string[];
  languages: string[];
  rating?: number;
  total_reviews: number;
}

export interface TimeSlot {
  id: string;
  advisor_id: string;
  start_time: string;
  end_time: string;
  available: boolean;
}

export interface AppointmentBookingRequest {
  advisor_id: string;
  type: Appointment['type'];
  scheduled_at: string;
  duration_minutes: number;
  timezone: string;
  notes?: string;
}

export interface AppointmentRescheduleRequest {
  new_scheduled_at: string;
  reason?: string;
}

// ============================================
// MESSAGING TYPES
// ============================================

export interface Conversation {
  id: string;
  student_id: string;
  advisor_id: string;
  advisor: Advisor;
  last_message?: Message;
  unread_count: number;
  status: 'active' | 'archived' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: 'student' | 'advisor' | 'system';
  content: string;
  attachments?: Attachment[];
  ai_generated: boolean;
  ai_context?: string;
  read: boolean;
  read_at?: string;
  created_at: string;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  file_type: string;
  file_size: number;
}

export interface SendMessageRequest {
  conversation_id?: string;
  content: string;
  attachments?: File[];
}

// ============================================
// RESOURCE TYPES
// ============================================

export type ResourceCategory = 'housing' | 'visa' | 'local_life' | 'career' | 'preparation' | 'health' | 'finance';

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  content: string;
  content_type: 'article' | 'guide' | 'checklist' | 'video' | 'template' | 'faq';
  icon?: string;
  tags: string[];
  attachments?: ResourceAttachment[];
  related_resources?: string[];
  order: number;
  view_count: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ResourceAttachment {
  id: string;
  filename: string;
  url: string;
  file_type: string;
  file_size: number;
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface DashboardStats {
  profile_completion: number;
  profile_score?: number;
  saved_opportunities: number;
  applied_opportunities: number;
  upcoming_interviews: number;
  unread_notifications: number;
  unread_messages: number;
  overall_progress: number;
  current_stage: JourneyStage;
  next_deadline?: {
    title: string;
    due_date: string;
    days_remaining: number;
  };
  recent_activity: ActivityItem[];
  ai_insights: AIInsight[];
}

export interface ActivityItem {
  id: string;
  type: 'profile_update' | 'application' | 'interview' | 'message' | 'status_change' | 'document_upload';
  title: string;
  description: string;
  timestamp: string;
  url?: string;
}

export interface AIInsight {
  type: 'match' | 'risk' | 'recommendation' | 'achievement';
  priority: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  action?: {
    label: string;
    url: string;
  };
}

// ============================================
// EXPORT TYPES
// ============================================

export interface ExportRequest {
  type: 'profile' | 'applications' | 'journey' | 'full_report';
  format: 'pdf' | 'json';
  include_ai_analysis?: boolean;
  date_range?: {
    start: string;
    end: string;
  };
}

export interface ExportResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  download_url?: string;
  expires_at?: string;
  created_at: string;
}
