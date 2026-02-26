import apiClient from './api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  PasswordResetRequest,
  PasswordResetConfirm,
} from '@/types/api';

export class AuthService {
  private static TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';
  private static USER_KEY = 'user';

  // Login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    const { access_token, refresh_token, user } = response.data;
    
    // Store tokens
    this.setToken(access_token);
    this.setRefreshToken(refresh_token);
    this.setUser(user);
    
    return response.data;
  }

  // Register
  static async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/register', data);
    const { access_token, refresh_token, user } = response.data;
    
    // Store tokens
    this.setToken(access_token);
    this.setRefreshToken(refresh_token);
    this.setUser(user);
    
    return response.data;
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all stored data
      this.clearAuth();
    }
  }

  // Request password reset
  static async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    await apiClient.post('/auth/password-reset', data);
  }

  // Confirm password reset
  static async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    await apiClient.post('/auth/password-reset/confirm', data);
  }

  // Get current user
  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    this.setUser(response.data);
    return response.data;
  }

  // Refresh token
  static async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ access_token: string; refresh_token: string }>(
      '/auth/refresh',
      { refresh_token: refreshToken }
    );

    this.setToken(response.data.access_token);
    this.setRefreshToken(response.data.refresh_token);
    
    return response.data.access_token;
  }

  // Verify token
  static async verifyToken(): Promise<boolean> {
    try {
      await apiClient.get('/auth/verify');
      return true;
    } catch {
      return false;
    }
  }

  // Token management
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  // User management
  static getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Clear all auth data
  static clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Update user profile
  static async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>('/auth/profile', data);
    this.setUser(response.data);
    return response.data;
  }

  // Change password
  static async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  }

  // Social login URLs
  static getGoogleLoginUrl(): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    return `${baseUrl}/auth/google`;
  }

  static getFacebookLoginUrl(): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    return `${baseUrl}/auth/facebook`;
  }
}

export default AuthService;
