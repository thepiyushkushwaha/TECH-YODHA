/**
 * DRISHTI REST API Client Service
 * Connects the React Frontend to the FastAPI Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('drishti_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[DRISHTI API Fallback] ${endpoint} request error:`, error);
    throw error;
  }
}

export const apiService = {
  // Auth
  login: (email: string, password: string) => 
    fetchAPI<any>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  // Patients
  getPatientProfile: (id = 'PAT-9842') => 
    fetchAPI<any>(`/patients/profile?patient_id=${id}`),
  
  updatePatientProfile: (profile: any) => 
    fetchAPI<any>('/patients/profile', { method: 'PUT', body: JSON.stringify(profile) }),

  // Hospitals & QR
  getHospitalInfo: () => 
    fetchAPI<any>('/hospitals'),
  
  getDepartments: () => 
    fetchAPI<any>('/hospitals/departments'),
  
  scanQR: (hospitalCode: string) => 
    fetchAPI<any>('/qr-session/scan', { method: 'POST', body: JSON.stringify({ hospitalCode }) }),

  // AI Case Taking & Red Flags
  sendChatMessage: (text: string, language = 'English') => 
    fetchAPI<any>('/case-taking/chat', { method: 'POST', body: JSON.stringify({ text, language }) }),
  
  assessRedFlags: (symptoms: string) => 
    fetchAPI<any>('/red-flag/assess', { method: 'POST', body: JSON.stringify({ symptoms }) }),

  // Documents & OCR
  getDocuments: () => 
    fetchAPI<any>('/documents'),

  // Clinical Summary
  getClinicalSummary: () => 
    fetchAPI<any>('/clinical-summary'),
  
  updateClinicalSummary: (summary: any) => 
    fetchAPI<any>('/clinical-summary', { method: 'PUT', body: JSON.stringify(summary) }),

  // Department Recommendations
  getRecommendedDepartments: (chiefComplaint: string) => 
    fetchAPI<any>('/recommendations/departments', { method: 'POST', body: JSON.stringify({ chiefComplaint }) }),

  // Doctors & Appointments
  getDoctors: (departmentId?: string) => 
    fetchAPI<any>(`/doctors${departmentId ? `?department_id=${departmentId}` : ''}`),
  
  getAppointments: () => 
    fetchAPI<any>('/appointments'),
  
  bookAppointment: (bookingData: any) => 
    fetchAPI<any>('/appointments/book', { method: 'POST', body: JSON.stringify(bookingData) }),
  
  updateAppointmentStatus: (id: string, status: string) => 
    fetchAPI<any>(`/appointments/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // AYUSH
  getAyushAssessment: (patientId = 'PAT-9842') => 
    fetchAPI<any>(`/ayush/assessment/${patientId}`),
};
