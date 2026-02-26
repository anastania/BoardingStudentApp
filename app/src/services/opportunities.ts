import apiClient, { type PaginatedResponse } from './api';
import type {
  Opportunity,
  OpportunitySearchFilters,
  StudentOpportunity,
  StudentOpportunityStatus,
  ApplicationRequest,
  ApplicationResponse,
  Company,
} from '@/types/api';

export class OpportunitiesService {
  // Search opportunities with filters
  static async searchOpportunities(
    filters: OpportunitySearchFilters = {},
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResponse<Opportunity>> {
    const response = await apiClient.get<PaginatedResponse<Opportunity>>('/opportunities', {
      params: {
        ...filters,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  }

  // Get opportunity by ID
  static async getOpportunity(id: string): Promise<Opportunity> {
    const response = await apiClient.get<Opportunity>(`/opportunities/${id}`);
    return response.data;
  }

  // Get all companies
  static async getCompanies(
    page: number = 1,
    perPage: number = 50
  ): Promise<PaginatedResponse<Company>> {
    const response = await apiClient.get<PaginatedResponse<Company>>('/companies', {
      params: { page, per_page: perPage },
    });
    return response.data;
  }

  // Get company by ID
  static async getCompany(id: string): Promise<Company> {
    const response = await apiClient.get<Company>(`/companies/${id}`);
    return response.data;
  }

  // Get student's opportunities (saved/applied/etc)
  static async getStudentOpportunities(
    status?: StudentOpportunityStatus
  ): Promise<StudentOpportunity[]> {
    const params = status ? { status } : {};
    const response = await apiClient.get<StudentOpportunity[]>('/students/opportunities', {
      params,
    });
    return response.data;
  }

  // Save opportunity
  static async saveOpportunity(opportunityId: string, notes?: string): Promise<StudentOpportunity> {
    const response = await apiClient.post<StudentOpportunity>('/students/opportunities/save', {
      opportunity_id: opportunityId,
      notes,
    });
    return response.data;
  }

  // Unsave opportunity
  static async unsaveOpportunity(opportunityId: string): Promise<void> {
    await apiClient.delete(`/students/opportunities/${opportunityId}/save`);
  }

  // Apply to opportunity
  static async applyToOpportunity(
    opportunityId: string,
    applicationData: Omit<ApplicationRequest, 'opportunity_id'>
  ): Promise<ApplicationResponse> {
    const response = await apiClient.post<ApplicationResponse>('/students/applications', {
      opportunity_id: opportunityId,
      ...applicationData,
    });
    return response.data;
  }

  // Withdraw application
  static async withdrawApplication(opportunityId: string, reason?: string): Promise<StudentOpportunity> {
    const response = await apiClient.post<StudentOpportunity>(
      `/students/opportunities/${opportunityId}/withdraw`,
      { reason }
    );
    return response.data;
  }

  // Dismiss opportunity (not interested)
  static async dismissOpportunity(opportunityId: string, reason?: string): Promise<void> {
    await apiClient.post(`/students/opportunities/${opportunityId}/dismiss`, { reason });
  }

  // Get application details
  static async getApplication(opportunityId: string): Promise<StudentOpportunity> {
    const response = await apiClient.get<StudentOpportunity>(
      `/students/opportunities/${opportunityId}`
    );
    return response.data;
  }

  // Update application notes
  static async updateApplicationNotes(
    opportunityId: string,
    notes: string
  ): Promise<StudentOpportunity> {
    const response = await apiClient.patch<StudentOpportunity>(
      `/students/opportunities/${opportunityId}/notes`,
      { notes }
    );
    return response.data;
  }

  // Get recommended opportunities (AI-powered)
  static async getRecommendedOpportunities(limit: number = 10): Promise<Opportunity[]> {
    const response = await apiClient.get<Opportunity[]>('/opportunities/recommended', {
      params: { limit },
    });
    return response.data;
  }

  // Get trending opportunities
  static async getTrendingOpportunities(limit: number = 10): Promise<Opportunity[]> {
    const response = await apiClient.get<Opportunity[]>('/opportunities/trending', {
      params: { limit },
    });
    return response.data;
  }
}

export default OpportunitiesService;
