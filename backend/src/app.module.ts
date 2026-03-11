import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { RealtimeModule } from './realtime/realtime.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, PatientsModule, RealtimeModule],
})
export class AppModule {}
