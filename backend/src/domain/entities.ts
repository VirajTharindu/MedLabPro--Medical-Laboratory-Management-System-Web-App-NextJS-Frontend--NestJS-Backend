export type Role = 'admin' | 'technician' | 'doctor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone?: string;
  createdAt: string;
}

export type TestStatus = 'ordered' | 'in_progress' | 'completed' | 'cancelled';

export interface LabTestDefinition {
  id: string;
  code: string;
  name: string;
  description?: string;
  price: number;
  typicalTurnaroundHours?: number;
}

export interface TestOrder {
  id: string;
  patientId: string;
  testDefinitionId: string;
  orderedByUserId: string;
  status: TestStatus;
  orderedAt: string;
  completedAt?: string;
  resultSummary?: string;
  resultDetails?: string;
}

export type SampleStatus =
  | 'collected'
  | 'in_transit'
  | 'received'
  | 'processing'
  | 'stored'
  | 'disposed';

export interface Sample {
  id: string;
  patientId: string;
  testOrderId: string;
  status: SampleStatus;
  collectionTime: string;
  location?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderThreshold: number;
}

export interface BillingEntry {
  id: string;
  patientId: string;
  testOrderId: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
}

export interface ScheduleEntry {
  id: string;
  staffName: string;
  role: Role;
  start: string;
  end: string;
  location?: string;
}

