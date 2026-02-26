// API Configuration
export { default as apiClient, type ApiResponse, type PaginatedResponse, type ApiError, handleApiError } from './api';

// Services
export { AuthService } from './auth';
export { ProfileService } from './profile';
export { OpportunitiesService } from './opportunities';
export { MatchingService, RiskService } from './matching';
export { JourneyService } from './journey';
export { NotificationsService } from './notifications';
export { AppointmentsService } from './appointments';
export { MessagingService } from './messaging';
export { ResourcesService } from './resources';
export { DashboardService, ExportService } from './dashboard';
