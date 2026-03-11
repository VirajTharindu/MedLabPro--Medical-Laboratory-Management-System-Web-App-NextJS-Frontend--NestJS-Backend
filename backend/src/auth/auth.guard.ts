import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.['auth_token'];
    const user = this.authService.getUserBySession(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = user;
    return true;
  }
}

