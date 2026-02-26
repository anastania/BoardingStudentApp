import apiClient from './api';
import type {
  Journey,
  JourneyStep,
  JourneyProgressUpdate,
  RequiredAction,
} from '@/types/api';

export class JourneyService {
  // Get student's journey
  static async getJourney(): Promise<Journey> {
    const response = await apiClient.get<Journey>('/students/journey');
    return response.data;
  }

  // Get specific step details
  static async getStep(stepId: string): Promise<JourneyStep> {
    const response = await apiClient.get<JourneyStep>(`/students/journey/steps/${stepId}`);
    return response.data;
  }

  // Update step progress
  static async updateStepProgress(
    stepId: string,
    update: JourneyProgressUpdate
  ): Promise<JourneyStep> {
    const response = await apiClient.patch<JourneyStep>(
      `/students/journey/steps/${stepId}`,
      update
    );
    return response.data;
  }

  // Mark step as completed
  static async completeStep(stepId: string, notes?: string): Promise<JourneyStep> {
    const response = await apiClient.post<JourneyStep>(
      `/students/journey/steps/${stepId}/complete`,
      { notes }
    );
    return response.data;
  }

  // Get required actions for current step
  static async getRequiredActions(): Promise<RequiredAction[]> {
    const response = await apiClient.get<RequiredAction[]>('/students/journey/actions');
    return response.data;
  }

  // Mark action as completed
  static async completeAction(actionId: string): Promise<RequiredAction> {
    const response = await apiClient.post<RequiredAction>(
      `/students/journey/actions/${actionId}/complete`
    );
    return response.data;
  }

  // Get journey timeline/history
  static async getJourneyHistory(): Promise<
    Array<{
      id: string;
      step_title: string;
      stage: string;
      status: string;
      completed_at?: string;
      notes?: string;
    }>
  > {
    const response = await apiClient.get('/students/journey/history');
    return response.data;
  }

  // Get estimated completion date
  static async getEstimatedCompletion(): Promise<{
    estimated_date: string;
    confidence: number;
    factors: string[];
  }> {
    const response = await apiClient.get('/students/journey/estimated-completion');
    return response.data;
  }
}

export default JourneyService;
