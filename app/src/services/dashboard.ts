import apiClient from './api';
import type {
  DashboardStats,
  ActivityItem,
  AIInsight,
  ExportRequest,
  ExportResponse,
} from '@/types/api';

export class DashboardService {
  // Get dashboard statistics
  static async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/students/dashboard/stats');
    return response.data;
  }

  // Get recent activity
  static async getRecentActivity(limit: number = 10): Promise<ActivityItem[]> {
    const response = await apiClient.get<ActivityItem[]>('/students/dashboard/activity', {
      params: { limit },
    });
    return response.data;
  }

  // Get AI insights
  static async getAIInsights(): Promise<AIInsight[]> {
    const response = await apiClient.get<AIInsight[]>('/students/dashboard/insights');
    return response.data;
  }

  // Get upcoming deadlines
  static async getUpcomingDeadlines(): Promise<
    Array<{
      id: string;
      title: string;
      description: string;
      due_date: string;
      days_remaining: number;
      type: string;
      url?: string;
    }>
  > {
    const response = await apiClient.get('/students/dashboard/deadlines');
    return response.data;
  }

  // Get quick actions
  static async getQuickActions(): Promise<
    Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      action_url: string;
      priority: 'high' | 'medium' | 'low';
    }>
  > {
    const response = await apiClient.get('/students/dashboard/actions');
    return response.data;
  }
}

export class ExportService {
  // Request export
  static async requestExport(request: ExportRequest): Promise<ExportResponse> {
    const response = await apiClient.post<ExportResponse>('/students/exports', request);
    return response.data;
  }

  // Get export status
  static async getExportStatus(exportId: string): Promise<ExportResponse> {
    const response = await apiClient.get<ExportResponse>(`/exports/${exportId}`);
    return response.data;
  }

  // Download export
  static downloadExport(downloadUrl: string): void {
    window.open(downloadUrl, '_blank');
  }

  // Get export history
  static async getExportHistory(): Promise<ExportResponse[]> {
    const response = await apiClient.get<ExportResponse[]>('/students/exports');
    return response.data;
  }
}

export default { DashboardService, ExportService };
