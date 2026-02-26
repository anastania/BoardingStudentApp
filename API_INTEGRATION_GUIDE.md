# Boarding Agency Frontend - Backend API Integration

## Overview

This document describes the API integration between the Boarding Student App frontend and the Boarding Agency IA Backoffice backend.

## Completed Integration

### 1. API Infrastructure ✅

#### HTTP Client (`src/services/api.ts`)
- **Axios-based HTTP client** with automatic JSON handling
- **Request interceptors** to automatically add JWT auth tokens
- **Response interceptors** for automatic token refresh on 401 errors
- **Error handling** with standardized error format
- **Configurable base URL** via environment variables

#### Key Features:
```typescript
// Automatic token attachment
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Automatic token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Attempt token refresh
      const newToken = await refreshToken();
      // Retry original request
    }
  }
);
```

### 2. TypeScript Types ✅

#### API Types (`src/types/api.ts`)
Comprehensive TypeScript types matching the backend API contracts:

- **Authentication Types**: LoginRequest, LoginResponse, User, RegisterRequest
- **Student Profile Types**: StudentProfile, CVDocument, CVParseResult
- **AI Analysis Types**: ProfileAnalysis, Recommendation, ExtractedSkill, ExtractedExperience
- **Matching Types**: MatchingScore, MatchingExplanation, OpportunityMatch
- **Risk Assessment Types**: RiskFlag, RiskAssessment, RiskAlert
- **Opportunity Types**: Opportunity, Company, StudentOpportunity
- **Journey Types**: Journey, JourneyStep, RequiredAction
- **Communication Types**: Notification, Appointment, Conversation, Message
- **Resource Types**: Resource, ResourceCategory
- **Dashboard Types**: DashboardStats, ActivityItem, AIInsight

### 3. Authentication System ✅

#### Auth Service (`src/services/auth.ts`)
Complete authentication management:

```typescript
// Login
await AuthService.login({ email, password });

// Token management (automatic)
AuthService.getToken();
AuthService.getRefreshToken();
AuthService.setToken(token);

// Logout
await AuthService.logout();

// Social login
window.location.href = AuthService.getGoogleLoginUrl();
```

#### Auth Context (`src/contexts/AuthContext.tsx`)
React Context for global auth state:

```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### 4. API Services ✅

All services follow the same pattern and provide full CRUD operations:

#### Profile Service (`src/services/profile.ts`)
```typescript
// Profile management
ProfileService.getProfile();
ProfileService.updateProfile(data);
ProfileService.updateStatus('published');

// CV operations
ProfileService.uploadCV(file);
ProfileService.getCVDocs();
ProfileService.getCVParseResult(cvId);

// AI features
ProfileService.getProfileAnalysis();
ProfileService.getRecommendations();

// Skills/Languages
ProfileService.addSkill(skill);
ProfileService.removeSkill(skill);
```

#### Opportunities Service (`src/services/opportunities.ts`)
```typescript
// Browse opportunities
OpportunitiesService.searchOpportunities(filters);
OpportunitiesService.getOpportunity(id);

// Student interactions
OpportunitiesService.saveOpportunity(id);
OpportunitiesService.applyToOpportunity(id, applicationData);
OpportunitiesService.getStudentOpportunities(status);

// AI recommendations
OpportunitiesService.getRecommendedOpportunities(limit);
```

#### Matching & Risk Service (`src/services/matching.ts`)
```typescript
// AI matching
MatchingService.getMatchingScores();
MatchingService.getOpportunityMatchingScore(oppId);
MatchingService.getTopMatches(limit);
MatchingService.getMatchExplanation(oppId);

// Risk assessment
RiskService.getRiskAssessment();
RiskService.getRiskAlerts();
RiskService.getMitigationStrategies(riskType);
```

#### Other Services:
- **Journey Service** (`journey.ts`): Track application progress
- **Notifications Service** (`notifications.ts`): Manage notifications
- **Appointments Service** (`appointments.ts`): Book advisor meetings
- **Messaging Service** (`messaging.ts`): Chat with advisors
- **Resources Service** (`resources.ts`): Access guides and documents
- **Dashboard Service** (`dashboard.ts`): Get dashboard statistics

### 5. React Hooks ✅

#### Custom Hooks (`src/hooks/useApi.ts`)

```typescript
// Data fetching with loading/error states
const { data, loading, error, refetch } = useApi(
  () => ProfileService.getProfile(),
  []
);

// Mutations (POST, PATCH, DELETE)
const { mutate, loading, error, data } = useMutation(
  (params) => OpportunitiesService.applyToOpportunity(params.id, params.data)
);

// Optimistic updates
const { data, update, revert, commit } = useOptimistic(initialData);
```

### 6. Updated Components ✅

#### Login Component
- Real authentication with email/password
- JWT token storage
- Social login (Google, Facebook)
- Error handling with toast notifications

#### Dashboard Component
- Real-time statistics from API
- AI insights display
- Recent notifications
- Upcoming appointments
- Saved opportunities
- Next deadline tracking

#### Profile Component
- Complete profile management
- CV upload with drag-and-drop
- AI CV parsing display
- Profile scoring
- AI recommendations
- Skills/languages management

#### Matching Component
- Opportunity browsing with filters
- AI-powered matching scores
- Matching explanation
- Save/Apply functionality
- AI Matches tab
- Applied opportunities tracking

## API Endpoints Mapping

### Authentication
```
POST   /auth/login
POST   /auth/register
POST   /auth/logout
POST   /auth/refresh
POST   /auth/password-reset
GET    /auth/me
GET    /auth/verify
```

### Profile
```
GET    /students/profile
POST   /students/profile
PATCH  /students/profile
GET    /students/profile/analysis
GET    /students/profile/recommendations
POST   /students/cv
GET    /students/cv
GET    /students/cv/{id}/parse
```

### Opportunities
```
GET    /opportunities
GET    /opportunities/{id}
GET    /opportunities/recommended
POST   /students/opportunities/save
POST   /students/applications
GET    /students/opportunities
```

### Matching
```
GET    /students/matching/scores
GET    /students/matching/scores/{id}
GET    /students/matching/top
POST   /students/matching
GET    /students/matching/compatibility/{id}
```

### Risk Assessment
```
GET    /students/risk-assessment
GET    /students/risk-alerts
POST   /risk-alerts/{id}/acknowledge
```

### Journey
```
GET    /students/journey
PATCH  /students/journey/steps/{id}
POST   /students/journey/steps/{id}/complete
```

### Notifications
```
GET    /notifications
POST   /notifications/{id}/read
GET    /notifications/unread-count
```

### Appointments
```
GET    /students/appointments
POST   /students/appointments
GET    /advisors/{id}/slots
GET    /advisors
```

### Messaging
```
GET    /students/conversations
POST   /messages
GET    /conversations/{id}/messages
```

## Environment Configuration

### Required Variables (`.env`)
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=Boarding
VITE_APP_VERSION=2.0.0
```

### Usage Example
```typescript
// All API calls automatically use the base URL
const response = await apiClient.get('/students/profile');
// Results in: GET http://localhost:8000/api/v1/students/profile
```

## Backend Compatibility

### AI Components Integration

#### 1. Student Profile AI Agent
- CV upload and automatic parsing
- Skills extraction with confidence scores
- Experience and education extraction
- Profile scoring (overall, skills, experience, education)
- AI recommendations for improvement

#### 2. AI Matching Engine
- Real-time compatibility scoring
- Multi-factor scoring (skills, experience, preferences, culture)
- Matching explanations
- Top matches ranking
- AI-recommended opportunities

#### 3. Predictive Risk Models
- Risk assessment per student/opportunity
- Risk flag detection (placement, integration, visa, cultural)
- Mitigation strategies
- Advisor alerts

#### 4. Augmented Advisor Assistant
- Appointment booking with AI scheduling
- Automated conversation summaries
- AI-generated recommendations in chat
- Profile synthesis before meetings

## Security Features

1. **JWT Token Management**
   - Automatic token attachment to requests
   - Automatic refresh on expiration
   - Secure storage in localStorage

2. **Error Handling**
   - Standardized error format
   - Automatic logout on auth failure
   - User-friendly error messages

3. **File Upload Security**
   - File type validation (PDF only)
   - File size limits (5MB)
   - Virus scanning (backend responsibility)

## Usage Examples

### Basic API Call
```typescript
import { ProfileService } from '@/services';

// Get profile
const profile = await ProfileService.getProfile();

// Upload CV
const file = event.target.files[0];
const result = await ProfileService.uploadCV(file);
```

### With React Hook
```typescript
import { useApi } from '@/hooks/useApi';
import { DashboardService } from '@/services';

function Dashboard() {
  const { data: stats, loading, error } = useApi(
    () => DashboardService.getStats(),
    []
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return <StatsDisplay stats={stats} />;
}
```

### With Mutation
```typescript
import { useMutation } from '@/hooks/useApi';

function OpportunityCard({ opportunity }) {
  const { mutate: apply, loading } = useMutation(
    () => OpportunitiesService.applyToOpportunity(opportunity.id, { availability_confirmed: true })
  );

  return (
    <Button onClick={apply} disabled={loading}>
      {loading ? 'Applying...' : 'Apply'}
    </Button>
  );
}
```

## Testing the Integration

1. **Start the backend server** on `http://localhost:8000`
2. **Configure the frontend** `.env` with the correct API URL
3. **Run the frontend**: `npm run dev`
4. **Test authentication**: Login with valid credentials
5. **Test API calls**: Navigate through Dashboard, Profile, Matching sections

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend allows requests from frontend origin
   - Check `Access-Control-Allow-Origin` header

2. **401 Unauthorized**
   - Check if JWT token is valid
   - Verify token refresh is working
   - Try logging out and back in

3. **API Not Found (404)**
   - Verify API base URL is correct
   - Check if backend routes match frontend expectations

4. **Type Errors**
   - Ensure backend response format matches TypeScript types
   - Check for missing fields in API responses

## Next Steps

1. **Backend Setup**: Ensure all API endpoints are implemented on the backend
2. **Testing**: Test all features with real data
3. **Error Handling**: Add more specific error messages
4. **Loading States**: Add skeleton screens for better UX
5. **Optimistic Updates**: Implement optimistic updates for better perceived performance
6. **Caching**: Add React Query or SWR for advanced caching
7. **Real-time**: Add WebSocket support for real-time notifications and chat

## Support

For issues or questions:
- Check the browser console for detailed error messages
- Verify network requests in browser DevTools
- Ensure backend API is accessible and returning expected formats
