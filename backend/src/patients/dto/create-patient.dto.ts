export class CreatePatientDto {
  firstName!: string;
  lastName!: string;
  dateOfBirth!: string;
  gender!: 'male' | 'female' | 'other';
  phone?: string;
}

