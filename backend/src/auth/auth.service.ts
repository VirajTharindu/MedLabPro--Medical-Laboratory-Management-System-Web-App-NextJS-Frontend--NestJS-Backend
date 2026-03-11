import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../domain/entities';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface Session {
  token: string;
  userId: string;
  createdAt: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];
  private sessions = new Map<string, Session>();

  constructor() {
    void this.bootstrapUsers();
  }

  private async bootstrapUsers() {
    const seed = [
      {
        id: 'u-admin',
        email: 'admin@lab.local',
        name: 'Admin User',
        role: 'admin' as const,
        password: 'admin123',
      },
      {
        id: 'u-tech',
        email: 'tech@lab.local',
        name: 'Lab Technician',
        role: 'technician' as const,
        password: 'tech123',
      },
      {
        id: 'u-doctor',
        email: 'doctor@lab.local',
        name: 'Doctor',
        role: 'doctor' as const,
        password: 'doctor123',
      },
    ];
    this.users = await Promise.all(
      seed.map(async (u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        passwordHash: await bcrypt.hash(u.password, 10),
      })),
    );
  }

  async validateUser(email: string, password: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { passwordHash, ...safe } = user;
    return safe;
  }

  createSession(userId: string): string {
    const token = crypto.randomUUID();
    const session: Session = {
      token,
      userId,
      createdAt: new Date().toISOString(),
    };
    this.sessions.set(token, session);
    return token;
  }

  getUserBySession(token: string | undefined) {
    if (!token) return null;
    const session = this.sessions.get(token);
    if (!session) return null;
    const user = this.users.find((u) => u.id === session.userId);
    if (!user) return null;
    const { passwordHash, ...safe } = user;
    return safe;
  }

  revokeSession(token: string | undefined) {
    if (token) {
      this.sessions.delete(token);
    }
  }
}

