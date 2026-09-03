import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  SyncAuthDto,
  CustomerOnboardingDto,
  ProviderOnboardingDto,
  BusinessOnboardingDto,
} from './auth.dto';
import {
  RoleType,
  ALLOWED_PUBLIC_REGISTRATION_ROLES,
  UserStatus,
  OnboardingStatus,
  ProfileStatus,
} from '@kajlagbe/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Sync user from Supabase Auth into PostgreSQL database
   */
  async syncUser(dto: SyncAuthDto, ipAddress?: string, userAgent?: string): Promise<Record<string, any>> {
    // 1. Role Validation: Reject unauthorized privileged role registration
    if (!ALLOWED_PUBLIC_REGISTRATION_ROLES.includes(dto.role as RoleType)) {
      this.logger.warn(`Security alert: Attempted registration with unauthorized role: ${dto.role}`);
      throw new ForbiddenException('অননুমোদিত অ্যাকাউন্ট রোল। পাবলিক রেজিস্ট্রেশন শুধুমাত্র কাস্টমার, প্রোভাইডার ও বিজনেস অ্যাকাউন্টের জন্য অনুমোদিত।');
    }

    // 2. Find or create Role in database
    let roleRecord = await this.prisma.role.findUnique({
      where: { name: dto.role },
    });

    if (!roleRecord) {
      roleRecord = await this.prisma.role.create({
        data: {
          name: dto.role,
          displayName:
            dto.role === RoleType.CUSTOMER
              ? 'কাস্টমার'
              : dto.role === RoleType.INDIVIDUAL_PROVIDER
              ? 'প্রোভাইডার'
              : 'সার্ভিস বিজনেস',
          isSystem: true,
        },
      });
    }

    // 3. Find existing user or create new user
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          ...(dto.id ? [{ id: dto.id }] : []),
          { email: dto.email },
        ],
      },
      include: {
        userRoles: {
          include: { role: true },
        },
        profile: true,
        customerProfile: true,
        providerProfile: true,
        businessProfile: true,
      },
    });

    const isNewUser = !user;

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          ...(dto.id ? { id: dto.id } : {}),
          email: dto.email,
          phone: dto.phone || null,
          status: UserStatus.PENDING_EMAIL_VERIFICATION as any,
          onboardingStatus: OnboardingStatus.NOT_STARTED as any,
          profile: {
            create: {
              firstName: dto.firstName,
              lastName: dto.lastName || '',
            },
          },
          userRoles: {
            create: {
              roleId: roleRecord.id,
            },
          },
        },
        include: {
          userRoles: {
            include: { role: true },
          },
          profile: true,
          customerProfile: true,
          providerProfile: true,
          businessProfile: true,
        },
      });

      // Create role-specific empty profile container
      if (dto.role === RoleType.CUSTOMER) {
        await this.prisma.customerProfile.create({
          data: {
            userId: user.id,
            preferredLocations: dto.metadata?.location ? [dto.metadata.location] : [],
          },
        });
      } else if (dto.role === RoleType.INDIVIDUAL_PROVIDER) {
        await this.prisma.providerProfile.create({
          data: {
            userId: user.id,
            primaryCategory: dto.metadata?.primaryCategory || 'electrician',
            experienceYears: 1,
            status: ProfileStatus.DRAFT as any,
          },
        });
      } else if (dto.role === RoleType.BUSINESS) {
        await this.prisma.businessProfile.create({
          data: {
            userId: user.id,
            businessName: dto.metadata?.businessName || dto.firstName,
            categories: dto.metadata?.primaryCategory ? [dto.metadata.primaryCategory] : [],
            teamSize: '1-5',
            status: ProfileStatus.DRAFT as any,
          },
        });
      }
    }

    // 4. Log Audit Event
    await this.logAudit({
      userId: user.id,
      action: isNewUser ? 'SIGNUP_SUCCESS' : 'LOGIN_SUCCESS',
      entityType: 'User',
      entityId: user.id,
      metadata: {
        role: dto.role,
        email: dto.email,
      },
      ipAddress,
      userAgent,
    });

    return this.getMe(user.id);
  }

  /**
   * Get Current User Profile & Roles
   */
  async getMe(userId: string): Promise<Record<string, any>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: { role: true },
        },
        profile: true,
        customerProfile: true,
        providerProfile: true,
        businessProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('ইউজার একাউন্ট পাওয়া যায়নি');
    }

    const primaryRole = user.userRoles[0]?.role?.name || RoleType.CUSTOMER;

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      status: user.status,
      onboardingStatus: user.onboardingStatus,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      roles: user.userRoles.map((ur) => ur.role.name),
      primaryRole,
      profile: user.profile,
      customerProfile: user.customerProfile,
      providerProfile: user.providerProfile,
      businessProfile: user.businessProfile,
    };
  }

  /**
   * Customer Onboarding
   */
  async onboardCustomer(userId: string, dto: CustomerOnboardingDto): Promise<Record<string, any>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, customerProfile: true },
    });

    if (!user) {
      throw new NotFoundException('ইউজার একাউন্ট পাওয়া যায়নি');
    }

    // Update profile
    if (dto.firstName || dto.lastName || dto.avatarUrl) {
      await this.prisma.userProfile.upsert({
        where: { userId },
        create: {
          userId,
          firstName: dto.firstName || 'Customer',
          lastName: dto.lastName || '',
          avatarUrl: dto.avatarUrl,
        },
        update: {
          ...(dto.firstName ? { firstName: dto.firstName } : {}),
          ...(dto.lastName !== undefined ? { lastName: dto.lastName } : {}),
          ...(dto.avatarUrl ? { avatarUrl: dto.avatarUrl } : {}),
        },
      });
    }

    // Update customer profile
    await this.prisma.customerProfile.upsert({
      where: { userId },
      create: {
        userId,
        preferredLocations: dto.preferredLocations || [],
        serviceInterests: dto.serviceInterests || [],
        allowNotifications: dto.allowNotifications ?? true,
      },
      update: {
        ...(dto.preferredLocations ? { preferredLocations: dto.preferredLocations } : {}),
        ...(dto.serviceInterests ? { serviceInterests: dto.serviceInterests } : {}),
        ...(dto.allowNotifications !== undefined ? { allowNotifications: dto.allowNotifications } : {}),
      },
    });

    // Mark onboarding completed
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStatus: OnboardingStatus.COMPLETED as any,
        status: UserStatus.ACTIVE as any,
      },
    });

    await this.logAudit({
      userId,
      action: 'ONBOARDING_COMPLETED',
      entityType: 'CustomerProfile',
      entityId: userId,
    });

    return this.getMe(userId);
  }

  /**
   * Provider Onboarding
   */
  async onboardProvider(userId: string, dto: ProviderOnboardingDto): Promise<Record<string, any>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('ইউজার একাউন্ট পাওয়া যায়নি');
    }

    await this.prisma.providerProfile.upsert({
      where: { userId },
      create: {
        userId,
        primaryCategory: dto.primaryCategory,
        secondaryCategories: dto.secondaryCategories || [],
        experienceYears: dto.experienceYears || 1,
        bio: dto.bio,
        serviceLocation: dto.serviceLocation,
        divisionId: dto.divisionId,
        districtId: dto.districtId,
        skills: dto.skills || [],
        servicesOffered: dto.servicesOffered || {},
        availabilityStatus: dto.availabilityStatus || 'available',
        status: ProfileStatus.PENDING_REVIEW as any,
      },
      update: {
        primaryCategory: dto.primaryCategory,
        secondaryCategories: dto.secondaryCategories || [],
        experienceYears: dto.experienceYears,
        bio: dto.bio,
        serviceLocation: dto.serviceLocation,
        divisionId: dto.divisionId,
        districtId: dto.districtId,
        skills: dto.skills || [],
        servicesOffered: dto.servicesOffered || {},
        availabilityStatus: dto.availabilityStatus || 'available',
        status: ProfileStatus.PENDING_REVIEW as any,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStatus: OnboardingStatus.PENDING_REVIEW as any,
        status: UserStatus.PENDING_REVIEW as any,
      },
    });

    await this.logAudit({
      userId,
      action: 'PROVIDER_ONBOARDING_SUBMITTED',
      entityType: 'ProviderProfile',
      entityId: userId,
    });

    return this.getMe(userId);
  }

  /**
   * Business Onboarding
   */
  async onboardBusiness(userId: string, dto: BusinessOnboardingDto): Promise<Record<string, any>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('ইউজার একাউন্ট পাওয়া যায়নি');
    }

    await this.prisma.businessProfile.upsert({
      where: { userId },
      create: {
        userId,
        businessName: dto.businessName,
        tradeLicenseNumber: dto.tradeLicenseNumber,
        description: dto.description,
        categories: dto.categories || [],
        teamSize: dto.teamSize || '1-5',
        contactPhone: dto.contactPhone,
        contactEmail: dto.contactEmail,
        businessAddress: dto.businessAddress,
        divisionId: dto.divisionId,
        districtId: dto.districtId,
        status: ProfileStatus.PENDING_REVIEW as any,
      },
      update: {
        businessName: dto.businessName,
        tradeLicenseNumber: dto.tradeLicenseNumber,
        description: dto.description,
        categories: dto.categories || [],
        teamSize: dto.teamSize || '1-5',
        contactPhone: dto.contactPhone,
        contactEmail: dto.contactEmail,
        businessAddress: dto.businessAddress,
        divisionId: dto.divisionId,
        districtId: dto.districtId,
        status: ProfileStatus.PENDING_REVIEW as any,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStatus: OnboardingStatus.PENDING_REVIEW as any,
        status: UserStatus.PENDING_REVIEW as any,
      },
    });

    await this.logAudit({
      userId,
      action: 'BUSINESS_ONBOARDING_SUBMITTED',
      entityType: 'BusinessProfile',
      entityId: userId,
    });

    return this.getMe(userId);
  }

  /**
   * Security Audit Logger
   */
  async logAudit(params: {
    userId?: string;
    action: string;
    entityType: string;
    entityId?: string;
    oldValues?: any;
    newValues?: any;
    metadata?: any;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId: params.userId || null,
          action: params.action,
          entityType: params.entityType,
          entityId: params.entityId || null,
          oldValues: params.oldValues || null,
          newValues: params.newValues || null,
          metadata: params.metadata || null,
          ipAddress: params.ipAddress || null,
          userAgent: params.userAgent || null,
        },
      });
    } catch (err: any) {
      this.logger.warn(`Failed to write audit log: ${err.message}`);
    }
  }
}
