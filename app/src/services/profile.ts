import apiClient, { type PaginatedResponse } from './api';
import type {
  StudentProfile,
  ProfileCreateRequest,
  ProfileUpdateRequest,
  CVDocument,
  CVUploadResponse,
  CVParseResult,
  ProfileAnalysis,
  Recommendation,
} from '@/types/api';

export class ProfileService {
  // Get current student's profile
  static async getProfile(): Promise<StudentProfile> {
    const response = await apiClient.get<StudentProfile>('/students/profile');
    return response.data;
  }

  // Create profile
  static async createProfile(data: ProfileCreateRequest): Promise<StudentProfile> {
    const response = await apiClient.post<StudentProfile>('/students/profile', data);
    return response.data;
  }

  // Update profile
  static async updateProfile(data: ProfileUpdateRequest): Promise<StudentProfile> {
    const response = await apiClient.patch<StudentProfile>('/students/profile', data);
    return response.data;
  }

  // Update profile status
  static async updateStatus(status: StudentProfile['status']): Promise<StudentProfile> {
    const response = await apiClient.patch<StudentProfile>('/students/profile/status', { status });
    return response.data;
  }

  // Upload CV
  static async uploadCV(file: File): Promise<CVUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<CVUploadResponse>('/students/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Get all CV documents
  static async getCVDocs(): Promise<CVDocument[]> {
    const response = await apiClient.get<CVDocument[]>('/students/cv');
    return response.data;
  }

  // Get specific CV document
  static async getCVDoc(cvId: string): Promise<CVDocument> {
    const response = await apiClient.get<CVDocument>(`/students/cv/${cvId}`);
    return response.data;
  }

  // Get CV parse result
  static async getCVParseResult(cvId: string): Promise<CVParseResult> {
    const response = await apiClient.get<CVParseResult>(`/students/cv/${cvId}/parse`);
    return response.data;
  }

  // Set current CV
  static async setCurrentCV(cvId: string): Promise<CVDocument> {
    const response = await apiClient.post<CVDocument>(`/students/cv/${cvId}/set-current`);
    return response.data;
  }

  // Delete CV
  static async deleteCV(cvId: string): Promise<void> {
    await apiClient.delete(`/students/cv/${cvId}`);
  }

  // Get AI profile analysis
  static async getProfileAnalysis(): Promise<ProfileAnalysis> {
    const response = await apiClient.get<ProfileAnalysis>('/students/profile/analysis');
    return response.data;
  }

  // Get AI recommendations
  static async getRecommendations(): Promise<Recommendation[]> {
    const response = await apiClient.get<Recommendation[]>('/students/profile/recommendations');
    return response.data;
  }

  // Add skill
  static async addSkill(skill: string): Promise<StudentProfile> {
    const response = await apiClient.post<StudentProfile>('/students/profile/skills', { skill });
    return response.data;
  }

  // Remove skill
  static async removeSkill(skill: string): Promise<StudentProfile> {
    const response = await apiClient.delete<StudentProfile>('/students/profile/skills', {
      data: { skill },
    });
    return response.data;
  }

  // Add language
  static async addLanguage(language: string): Promise<StudentProfile> {
    const response = await apiClient.post<StudentProfile>('/students/profile/languages', { language });
    return response.data;
  }

  // Remove language
  static async removeLanguage(language: string): Promise<StudentProfile> {
    const response = await apiClient.delete<StudentProfile>('/students/profile/languages', {
      data: { language },
    });
    return response.data;
  }

  // Add preferred location
  static async addPreferredLocation(location: string): Promise<StudentProfile> {
    const response = await apiClient.post<StudentProfile>('/students/profile/locations', { location });
    return response.data;
  }

  // Remove preferred location
  static async removePreferredLocation(location: string): Promise<StudentProfile> {
    const response = await apiClient.delete<StudentProfile>('/students/profile/locations', {
      data: { location },
    });
    return response.data;
  }

  // Add preferred role
  static async addPreferredRole(role: string): Promise<StudentProfile> {
    const response = await apiClient.post<StudentProfile>('/students/profile/roles', { role });
    return response.data;
  }

  // Remove preferred role
  static async removePreferredRole(role: string): Promise<StudentProfile> {
    const response = await apiClient.delete<StudentProfile>('/students/profile/roles', {
      data: { role },
    });
    return response.data;
  }
}

export default ProfileService;
