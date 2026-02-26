import apiClient from './api';
import type {
  Conversation,
  Message,
  SendMessageRequest,
} from '@/types/api';

export class MessagingService {
  // Get conversations
  static async getConversations(): Promise<Conversation[]> {
    const response = await apiClient.get<Conversation[]>('/students/conversations');
    return response.data;
  }

  // Get conversation by ID
  static async getConversation(conversationId: string): Promise<Conversation> {
    const response = await apiClient.get<Conversation>(`/conversations/${conversationId}`);
    return response.data;
  }

  // Get messages in conversation
  static async getMessages(
    conversationId: string,
    options: {
      limit?: number;
      before?: string;
    } = {}
  ): Promise<Message[]> {
    const response = await apiClient.get<Message[]>(
      `/conversations/${conversationId}/messages`,
      { params: options }
    );
    return response.data;
  }

  // Send message
  static async sendMessage(data: SendMessageRequest): Promise<Message> {
    const formData = new FormData();
    formData.append('content', data.content);
    
    if (data.conversation_id) {
      formData.append('conversation_id', data.conversation_id);
    }

    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    const response = await apiClient.post<Message>('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Start new conversation with advisor
  static async startConversation(
    advisorId: string,
    initialMessage: string
  ): Promise<Conversation> {
    const response = await apiClient.post<Conversation>('/students/conversations', {
      advisor_id: advisorId,
      initial_message: initialMessage,
    });
    return response.data;
  }

  // Mark messages as read
  static async markAsRead(conversationId: string): Promise<void> {
    await apiClient.post(`/conversations/${conversationId}/read`);
  }

  // Get unread message count
  static async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>('/messages/unread-count');
    return response.data.count;
  }

  // Archive conversation
  static async archiveConversation(conversationId: string): Promise<Conversation> {
    const response = await apiClient.post<Conversation>(
      `/conversations/${conversationId}/archive`
    );
    return response.data;
  }
}

export default MessagingService;
