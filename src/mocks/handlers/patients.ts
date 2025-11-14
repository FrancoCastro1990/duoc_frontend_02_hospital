import { http, HttpResponse } from 'msw';
import type { Patient } from '@/features/patients/types';

/**
 * Mock Patients Data
 * This data will be used to respond to API requests for patients
 */
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    dni: '12345678-9',
    age: 45,
    diagnostic: 'Hypertension',
    entryDate: '2025-01-10T08:30:00Z',
    departureDate: '2025-01-12T14:00:00Z',
  },
  {
    id: '2',
    name: 'John Smith',
    dni: '98765432-1',
    age: 62,
    diagnostic: 'Type 2 Diabetes',
    entryDate: '2025-01-08T10:15:00Z',
    departureDate: null,
  },
  {
    id: '3',
    name: 'Ana Martinez',
    dni: '23456789-0',
    age: 34,
    diagnostic: 'Pneumonia',
    entryDate: '2025-01-11T16:45:00Z',
    departureDate: null,
  },
  {
    id: '4',
    name: 'Robert Johnson',
    dni: '34567890-1',
    age: 58,
    diagnostic: 'Cardiac Arrhythmia',
    entryDate: '2025-01-05T09:20:00Z',
    departureDate: '2025-01-10T11:30:00Z',
  },
  {
    id: '5',
    name: 'Carmen Lopez',
    dni: '45678901-2',
    age: 71,
    diagnostic: 'Hip Fracture',
    entryDate: '2025-01-09T13:00:00Z',
    departureDate: null,
  },
  {
    id: '6',
    name: 'Michael Brown',
    dni: '56789012-3',
    age: 29,
    diagnostic: 'Appendicitis',
    entryDate: '2025-01-12T22:30:00Z',
    departureDate: '2025-01-13T18:00:00Z',
  },
  {
    id: '7',
    name: 'Sofia Garcia',
    dni: '67890123-4',
    age: 52,
    diagnostic: 'Gastritis',
    entryDate: '2025-01-13T07:15:00Z',
    departureDate: null,
  },
  {
    id: '8',
    name: 'David Wilson',
    dni: '78901234-5',
    age: 67,
    diagnostic: 'Chronic Obstructive Pulmonary Disease',
    entryDate: '2025-01-07T15:45:00Z',
    departureDate: null,
  },
  {
    id: '9',
    name: 'Isabella Fernandez',
    dni: '89012345-6',
    age: 41,
    diagnostic: 'Migraine',
    entryDate: '2025-01-11T11:20:00Z',
    departureDate: '2025-01-12T09:45:00Z',
  },
  {
    id: '10',
    name: 'James Anderson',
    dni: '90123456-7',
    age: 55,
    diagnostic: 'Kidney Stones',
    entryDate: '2025-01-10T19:30:00Z',
    departureDate: null,
  },
];

/**
 * Patients API Handlers
 * Defines mock endpoints for patient-related requests
 */
export const patientsHandlers = [
  // GET /api/patients - Get all patients
  http.get('/api/patients', async () => {
    // Simulate network delay (like the current service)
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json<Patient[]>(mockPatients);
  }),

  // GET /api/patients/:id - Get single patient by ID
  http.get<{ id: string }>('/api/patients/:id', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const patient = mockPatients.find((p) => p.id === params.id);

    if (!patient) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Patient not found'
      });
    }

    return HttpResponse.json<Patient>(patient);
  }),
];
