import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from '../domain/entities';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  private patients = new Map<string, Patient>();

  findAll(): Patient[] {
    return Array.from(this.patients.values());
  }

  findOne(id: string): Patient {
    const found = this.patients.get(id);
    if (!found) {
      throw new NotFoundException(`Patient ${id} not found`);
    }
    return found;
  }

  create(dto: CreatePatientDto): Patient {
    const id = crypto.randomUUID();
    const patient: Patient = {
      id,
      createdAt: new Date().toISOString(),
      ...dto,
    };
    this.patients.set(id, patient);
    return patient;
  }

  update(id: string, dto: UpdatePatientDto): Patient {
    const existing = this.findOne(id);
    const updated: Patient = { ...existing, ...dto };
    this.patients.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    if (!this.patients.delete(id)) {
      throw new NotFoundException(`Patient ${id} not found`);
    }
  }
}

