import apiClient from './api';
import type {
  Appointment,
  AppointmentBookingRequest,
  AppointmentRescheduleRequest,
  TimeSlot,
  Advisor,
} from '@/types/api';

export class AppointmentsService {
  // Get student's appointments
  static async getAppointments(
    status?: 'scheduled' | 'completed' | 'cancelled' | 'all'
  ): Promise<Appointment[]> {
    const params = status && status !== 'all' ? { status } : {};
    const response = await apiClient.get<Appointment[]>('/students/appointments', {
      params,
    });
    return response.data;
  }

  // Get appointment by ID
  static async getAppointment(appointmentId: string): Promise<Appointment> {
    const response = await apiClient.get<Appointment>(`/appointments/${appointmentId}`);
    return response.data;
  }

  // Book appointment
  static async bookAppointment(data: AppointmentBookingRequest): Promise<Appointment> {
    const response = await apiClient.post<Appointment>('/students/appointments', data);
    return response.data;
  }

  // Reschedule appointment
  static async rescheduleAppointment(
    appointmentId: string,
    data: AppointmentRescheduleRequest
  ): Promise<Appointment> {
    const response = await apiClient.patch<Appointment>(
      `/appointments/${appointmentId}/reschedule`,
      data
    );
    return response.data;
  }

  // Cancel appointment
  static async cancelAppointment(
    appointmentId: string,
    reason?: string
  ): Promise<Appointment> {
    const response = await apiClient.post<Appointment>(
      `/appointments/${appointmentId}/cancel`,
      { reason }
    );
    return response.data;
  }

  // Get available time slots for advisor
  static async getAvailableSlots(
    advisorId: string,
    date: string
  ): Promise<TimeSlot[]> {
    const response = await apiClient.get<TimeSlot[]>(`/advisors/${advisorId}/slots`, {
      params: { date },
    });
    return response.data;
  }

  // Get all advisors
  static async getAdvisors(): Promise<Advisor[]> {
    const response = await apiClient.get<Advisor[]>('/advisors');
    return response.data;
  }

  // Get advisor by ID
  static async getAdvisor(advisorId: string): Promise<Advisor> {
    const response = await apiClient.get<Advisor>(`/advisors/${advisorId}`);
    return response.data;
  }

  // Get my advisor
  static async getMyAdvisor(): Promise<Advisor> {
    const response = await apiClient.get<Advisor>('/students/advisor');
    return response.data;
  }

  // Add notes to appointment
  static async addNotes(
    appointmentId: string,
    notes: string
  ): Promise<Appointment> {
    const response = await apiClient.patch<Appointment>(
      `/appointments/${appointmentId}/notes`,
      { notes }
    );
    return response.data;
  }

  // Get meeting URL
  static async getMeetingUrl(appointmentId: string): Promise<{ url: string }> {
    const response = await apiClient.get<{ url: string }>(
      `/appointments/${appointmentId}/meeting-url`
    );
    return response.data;
  }
}

export default AppointmentsService;
