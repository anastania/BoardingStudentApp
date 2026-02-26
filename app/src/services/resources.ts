import apiClient from './api';
import type {
  Resource,
  ResourceCategory,
} from '@/types/api';

export class ResourcesService {
  // Get all resources
  static async getResources(
    options: {
      category?: ResourceCategory;
      search?: string;
      tags?: string[];
    } = {}
  ): Promise<Resource[]> {
    const response = await apiClient.get<Resource[]>('/resources', {
      params: options,
    });
    return response.data;
  }

  // Get resource by ID
  static async getResource(resourceId: string): Promise<Resource> {
    const response = await apiClient.get<Resource>(`/resources/${resourceId}`);
    return response.data;
  }

  // Get resources by category
  static async getResourcesByCategory(category: ResourceCategory): Promise<Resource[]> {
    const response = await apiClient.get<Resource[]>(`/resources/category/${category}`);
    return response.data;
  }

  // Search resources
  static async searchResources(query: string): Promise<Resource[]> {
    const response = await apiClient.get<Resource[]>('/resources/search', {
      params: { q: query },
    });
    return response.data;
  }

  // Mark resource as helpful
  static async markHelpful(resourceId: string): Promise<void> {
    await apiClient.post(`/resources/${resourceId}/helpful`);
  }

  // Get related resources
  static async getRelatedResources(resourceId: string): Promise<Resource[]> {
    const response = await apiClient.get<Resource[]>(
      `/resources/${resourceId}/related`
    );
    return response.data;
  }

  // Get resource categories
  static async getCategories(): Promise<
    Array<{
      category: ResourceCategory;
      count: number;
      icon: string;
    }>
  > {
    const response = await apiClient.get('/resources/categories');
    return response.data;
  }

  // Track resource view
  static async trackView(resourceId: string): Promise<void> {
    await apiClient.post(`/resources/${resourceId}/view`);
  }
}

export default ResourcesService;
