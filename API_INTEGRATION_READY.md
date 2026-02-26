# API Integration Guide - Ready for Backend

## Overview

The frontend is currently using **mock data** for all features. All the API infrastructure is prepared and ready to connect to your backend when it's ready.

## ✅ What's Already Prepared

### 1. Complete API Infrastructure (`src/services/`)
- ✅ HTTP client with axios
- ✅ JWT authentication handling
- ✅ Token refresh mechanism
- ✅ Error handling
- ✅ All API service functions

### 2. TypeScript Types (`src/types/api.ts`)
- ✅ All API response types
- ✅ Request types
- ✅ Complete type safety

### 3. React Hooks (`src/hooks/useApi.ts`)
- ✅ Data fetching hooks
- ✅ Mutation hooks
- ✅ Loading/error states

## 🔄 How to Switch to Real API

When your backend is ready, you have two options:

### Option 1: Toggle Mode (Recommended for gradual migration)

Create a feature flag to toggle between mock and real API:

```typescript
// src/config/api.config.ts
export const API_CONFIG = {
  // Set to true when backend is ready
  USE_REAL_API: false,
  
  // Your backend URL
  BASE_URL: 'http://localhost:8000/api/v1',
};
```

Then in components:

```typescript
import { API_CONFIG } from '@/config/api.config';
import { DashboardService } from '@/services';
import { mockDashboardStats } from '@/data/mockData';

// In your component
const loadData = async () => {
  if (API_CONFIG.USE_REAL_API) {
    // Use real API
    const stats = await DashboardService.getStats();
    setStats(stats);
  } else {
    // Use mock data
    setStats(mockDashboardStats);
  }
};
```

### Option 2: Replace Components (Full migration)

Replace the components with API-connected versions. I've already created these in the git history:

1. **Dashboard with API** (see previous version)
   - Replace `src/sections/Dashboard.tsx`
   - Uses `DashboardService.getStats()`

2. **Profile with API** (see previous version)
   - Replace `src/sections/Profile.tsx`
   - Uses `ProfileService.getProfile()`

3. **Matching with API** (see previous version)
   - Replace `src/sections/Matching.tsx`
   - Uses `OpportunitiesService` and `MatchingService`

4. **Login with API** (see previous version)
   - Replace `src/sections/Login.tsx`
   - Uses `AuthService.login()`

5. **App with Auth** (see previous version)
   - Replace `src/App.tsx`
   - Adds `AuthProvider` context

6. **main with Auth** (see previous version)
   - Replace `src/main.tsx`
   - Wraps app with `AuthProvider`

## 📋 Backend Requirements

Your backend should implement these endpoints:

### Authentication
```
POST /auth/login
POST /auth/register
POST /auth/logout
POST /auth/refresh
```

### Profile
```
GET    /students/profile
PATCH  /students/profile
POST   /students/cv
GET    /students/cv
GET    /students/profile/analysis
GET    /students/profile/recommendations
```

### Opportunities
```
GET /opportunities
GET /opportunities/{id}
GET /opportunities/recommended
POST /students/opportunities/save
POST /students/applications
GET /students/opportunities
```

### Matching
```
GET /students/matching/scores
GET /students/matching/top
```

### Dashboard
```
GET /students/dashboard/stats
GET /students/dashboard/insights
```

### Notifications
```
GET /notifications
GET /notifications/unread-count
```

### Appointments
```
GET /students/appointments
POST /students/appointments
GET /advisors
```

### Messaging
```
GET /students/conversations
POST /messages
```

### Journey
```
GET /students/journey
```

## 🔧 Configuration

1. Update `.env` file:
```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

2. Ensure CORS is enabled on backend for your frontend URL

3. JWT tokens should be returned as:
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": { ... }
}
```

## 🚀 Quick Migration Steps

When backend is ready:

1. **Update environment variables** in `.env`
2. **Enable API mode** by setting `USE_REAL_API: true`
3. **Replace component files** with API versions
4. **Update main.tsx** to include AuthProvider
5. **Update App.tsx** to use auth context
6. **Test authentication flow**
7. **Test all features**

## 📝 Note

The complete API integration code is preserved in the git history. If you need to restore it:

```bash
# View previous commits
git log --oneline

# Restore specific file from previous commit
git checkout <commit-hash> -- src/sections/Dashboard.tsx
```

Or simply ask me to restore any specific file with API integration!

## ✅ Current State

- ✅ All features working with mock data
- ✅ API infrastructure ready
- ✅ Types defined
- ✅ Services implemented
- ✅ Easy migration path prepared

Your frontend is **production-ready** with mock data and **backend-ready** for when your API is complete!
