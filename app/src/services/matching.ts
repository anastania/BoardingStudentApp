import apiClient from './api';
import type {
  MatchingScore,
  OpportunityMatch,
  MatchingRequest,
  MatchingListResponse,
  RiskAssessment,
  RiskFlag,
  RiskAlert,
} from '@/types/api';

export class MatchingService {
  // Get AI matching scores for all opportunities
  static async getMatchingScores(): Promise<MatchingScore[]> {
    const response = await apiClient.get<MatchingScore[]>('/students/matching/scores');
    return response.data;
  }

  // Get matching score for specific opportunity
  static async getOpportunityMatchingScore(opportunityId: string): Promise<MatchingScore> {
    const response = await apiClient.get<MatchingScore>(
      `/students/matching/scores/${opportunityId}`
    );
    return response.data;
  }

  // Get AI-powered opportunity matches
  static async getMatches(request: MatchingRequest): Promise<MatchingListResponse> {
    const response = await apiClient.post<MatchingListResponse>('/students/matching', request);
    return response.data;
  }

  // Get top matches (simplified)
  static async getTopMatches(limit: number = 10): Promise<OpportunityMatch[]> {
    const response = await apiClient.get<OpportunityMatch[]>('/students/matching/top', {
      params: { limit },
    });
    return response.data;
  }

  // Get match explanation
  static async getMatchExplanation(opportunityId: string): Promise<MatchingScore['explanation']> {
    const response = await apiClient.get<MatchingScore['explanation']>(
      `/students/matching/scores/${opportunityId}/explanation`
    );
    return response.data;
  }

  // Recalculate matches (after profile update)
  static async recalculateMatches(): Promise<void> {
    await apiClient.post('/students/matching/recalculate');
  }

  // Get compatibility factors
  static async getCompatibilityFactors(opportunityId: string): Promise<{
    factors: Array<{
      name: string;
      score: number;
      weight: number;
      description: string;
    }>;
    overall_score: number;
  }> {
    const response = await apiClient.get(`/students/matching/compatibility/${opportunityId}`);
    return response.data;
  }
}

export class RiskService {
  // Get risk assessment for student
  static async getRiskAssessment(): Promise<RiskAssessment> {
    const response = await apiClient.get<RiskAssessment>('/students/risk-assessment');
    return response.data;
  }

  // Get risk assessment for specific opportunity
  static async getOpportunityRiskAssessment(opportunityId: string): Promise<RiskAssessment> {
    const response = await apiClient.get<RiskAssessment>(
      `/students/opportunities/${opportunityId}/risk-assessment`
    );
    return response.data;
  }

  // Get active risk alerts
  static async getRiskAlerts(): Promise<RiskAlert[]> {
    const response = await apiClient.get<RiskAlert[]>('/students/risk-alerts');
    return response.data;
  }

  // Acknowledge risk alert
  static async acknowledgeRiskAlert(alertId: string): Promise<RiskAlert> {
    const response = await apiClient.post<RiskAlert>(`/risk-alerts/${alertId}/acknowledge`);
    return response.data;
  }

  // Resolve risk alert
  static async resolveRiskAlert(alertId: string, resolution?: string): Promise<RiskAlert> {
    const response = await apiClient.post<RiskAlert>(`/risk-alerts/${alertId}/resolve`, {
      resolution,
    });
    return response.data;
  }

  // Dismiss risk alert
  static async dismissRiskAlert(alertId: string, reason?: string): Promise<RiskAlert> {
    const response = await apiClient.post<RiskAlert>(`/risk-alerts/${alertId}/dismiss`, {
      reason,
    });
    return response.data;
  }

  // Get risk mitigation strategies
  static async getMitigationStrategies(riskType: RiskFlag['type']): Promise<{
    strategies: string[];
    resources: Array<{
      title: string;
      url: string;
      type: string;
    }>;
  }> {
    const response = await apiClient.get(`/risk-mitigation/${riskType}`);
    return response.data;
  }
}

export default { MatchingService, RiskService };
