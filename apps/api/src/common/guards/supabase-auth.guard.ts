import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../constants';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authentication token missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const supabase = this.supabaseService.getClient();

    if (!supabase) {
      this.logger.warn('Supabase client not initialized, skipping JWT verification in fallback mode');
      // In dev fallback if Supabase is offline
      request.user = {
        id: 'dev-user',
        email: 'dev@kajlagbe.com',
        roles: ['CUSTOMER'],
      };
      return true;
    }

    try {
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data.user) {
        throw new UnauthorizedException(error?.message || 'Invalid or expired authentication session');
      }

      const authUser = data.user;

      // Find user in Prisma PostgreSQL
      const dbUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ id: authUser.id }, { email: authUser.email || '' }],
        },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
          profile: true,
          customerProfile: true,
          providerProfile: true,
          businessProfile: true,
        },
      });

      if (dbUser) {
        request.user = {
          id: dbUser.id,
          email: dbUser.email,
          phone: dbUser.phone,
          status: dbUser.status,
          onboardingStatus: dbUser.onboardingStatus,
          isEmailVerified: dbUser.isEmailVerified || !!authUser.email_confirmed_at,
          isPhoneVerified: dbUser.isPhoneVerified || !!authUser.phone_confirmed_at,
          roles: dbUser.userRoles.map((ur) => ur.role.name),
          profile: dbUser.profile,
          customerProfile: dbUser.customerProfile,
          providerProfile: dbUser.providerProfile,
          businessProfile: dbUser.businessProfile,
          supabaseAuthUser: authUser,
        };
      } else {
        const metadataRole = authUser.user_metadata?.role || 'CUSTOMER';
        request.user = {
          id: authUser.id,
          email: authUser.email || '',
          phone: authUser.phone || null,
          status: 'PENDING_EMAIL_VERIFICATION',
          onboardingStatus: 'NOT_STARTED',
          isEmailVerified: !!authUser.email_confirmed_at,
          isPhoneVerified: !!authUser.phone_confirmed_at,
          roles: [metadataRole],
          profile: null,
          supabaseAuthUser: authUser,
        };
      }

      return true;
    } catch (err: any) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      this.logger.error(`Authentication error: ${err.message}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
