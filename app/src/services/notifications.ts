import apiClient from './api';
import type {
  Notification,
  NotificationPreferences,
  NotificationType,
} from '@/types/api';

export class NotificationsService {
  // Get notifications
  static async getNotifications(
    options: {
      unreadOnly?: boolean;
      type?: NotificationType;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>('/notifications', {
      params: options,
    });
    return response.data;
  }

  // Get unread count
  static async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>('/notifications/unread-count');
    return response.data.count;
  }

  // Mark notification as read
  static async markAsRead(notificationId: string): Promise<Notification> {
    const response = await apiClient.post<Notification>(
      `/notifications/${notificationId}/read`
    );
    return response.data;
  }

  // Mark all notifications as read
  static async markAllAsRead(): Promise<void> {
    await apiClient.post('/notifications/read-all');
  }

  // Archive notification
  static async archiveNotification(notificationId: string): Promise<Notification> {
    const response = await apiClient.post<Notification>(
      `/notifications/${notificationId}/archive`
    );
    return response.data;
  }

  // Delete notification
  static async deleteNotification(notificationId: string): Promise<void> {
    await apiClient.delete(`/notifications/${notificationId}`);
  }

  // Get notification preferences
  static async getPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<NotificationPreferences>('/notifications/preferences');
    return response.data;
  }

  // Update notification preferences
  static async updatePreferences(
    preferences: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    const response = await apiClient.patch<NotificationPreferences>(
      '/notifications/preferences',
      preferences
    );
    return response.data;
  }

  // Subscribe to push notifications
  static async subscribePush(subscription: PushSubscription): Promise<void> {
    await apiClient.post('/notifications/push/subscribe', {
      subscription: subscription.toJSON(),
    });
  }

  // Unsubscribe from push notifications
  static async unsubscribePush(): Promise<void> {
    await apiClient.post('/notifications/push/unsubscribe');
  }
}

export default NotificationsService;
