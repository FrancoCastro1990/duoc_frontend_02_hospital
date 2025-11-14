import type { Patient, IPatientsService } from '../types';

/**
 * PatientsService Class
 * Handles patient data operations via HTTP requests
 * In development: MSW intercepts requests and returns mock data
 * In production: Real API endpoints will be called
 */
export class PatientsService implements IPatientsService {
  /**
   * Retrieves all patients from the API
   * Makes a real HTTP GET request to /api/patients
   * MSW will intercept this in development mode
   */
  async getAllPatients(): Promise<Patient[]> {
    const response = await fetch('/api/patients');

    if (!response.ok) {
      throw new Error(`Failed to fetch patients: ${response.statusText}`);
    }

    return response.json();
  }
}

export default PatientsService;
