import { Injectable, Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import {
  UpdateUserStatusDto,
  VerifyProviderDto,
  UpdateJobStatusDto,
  ProcessPayoutDto,
  ToggleFeatureFlagDto,
} from "./admin.dto";
import { PayoutStatus, UserStatus, VerificationStatus, JobStatus, ProfileStatus, BookingStatus } from "@kajlagbe/database";

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  private async logAudit(
    actorId: string | null,
    action: string,
    entityType: string,
    entityId?: string | null,
    metadata?: Record<string, any>,
  ) {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId: actorId,
          action,
          entityType,
          entityId,
          metadata,
        },
      });
    } catch (err: any) {
      this.logger.error(`Failed to record audit log: ${err.message}`);
    }
  }

  async getDashboardStats() {
    this.logger.log("Aggregating real operational dashboard statistics");

    const [
      totalUsers,
      activeProviders,
      pendingProviders,
      suspendedUsers,
      totalJobs,
      publishedJobs,
      inProgressJobs,
      completedJobs,
      activeBookings,
      payoutStats,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.providerProfile.count({ where: { status: ProfileStatus.ACTIVE } }),
      this.prisma.providerProfile.count({ where: { status: ProfileStatus.PENDING_REVIEW } }),
      this.prisma.user.count({ where: { status: UserStatus.SUSPENDED } }),
      this.prisma.job.count(),
      this.prisma.job.count({ where: { status: JobStatus.PUBLISHED } }),
      this.prisma.job.count({ where: { status: JobStatus.IN_PROGRESS } }),
      this.prisma.job.count({ where: { status: JobStatus.COMPLETED } }),
      this.prisma.booking.count({
        where: {
          status: {
            in: [BookingStatus.PENDING_CONFIRMATION, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS],
          },
        },
      }),
      this.prisma.payoutRequest.aggregate({
        where: { status: PayoutStatus.PENDING },
        _count: { _all: true },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalUsers,
      newUsersToday: 0,
      activeProviders,
      pendingProviders,
      suspendedUsers,
      totalJobs,
      publishedJobs,
      inProgressJobs,
      completedJobs,
      activeBookings,
      totalPaymentVolume: 0,
      platformRevenue: 0,
      pendingPayoutsCount: payoutStats._count._all || 0,
      pendingPayoutsAmount: Number(payoutStats._sum.amount || 0),
    };
  }

  async getUsers(search?: string, role?: string, status?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status) {
      where.status = status as UserStatus;
    }

    const users = await this.prisma.user.findMany({
      where,
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        profile: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return users.map((u) => ({
      id: u.id,
      email: u.email,
      phone: u.phone,
      status: u.status,
      onboardingStatus: u.onboardingStatus,
      isEmailVerified: u.isEmailVerified,
      isPhoneVerified: u.isPhoneVerified,
      roles: u.userRoles.map((ur) => ur.role.name),
      createdAt: u.createdAt.toISOString(),
      profile: u.profile
        ? {
            firstName: u.profile.firstName,
            lastName: u.profile.lastName,
            avatarUrl: u.profile.avatarUrl,
          }
        : null,
    }));
  }

  async updateUserStatus(id: string, dto: UpdateUserStatusDto, adminUserId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { status: dto.status },
    });

    await this.logAudit(adminUserId, "USER_STATUS_UPDATED", "User", id, {
      oldStatus: user.status,
      newStatus: dto.status,
      reason: dto.reason,
    });

    return { success: true, user: updated };
  }

  async getProviders(search?: string, verificationStatus?: string) {
    const where: any = {};
    if (verificationStatus && verificationStatus !== "ALL") {
      where.status = verificationStatus as ProfileStatus;
    }

    const providers = await this.prisma.providerProfile.findMany({
      where,
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    return providers.map((p) => ({
      id: p.id,
      userId: p.userId,
      userEmail: p.user.email,
      fullName: p.user.profile ? `${p.user.profile.firstName} ${p.user.profile.lastName}` : p.user.email,
      phone: p.user.phone,
      bio: p.bio,
      experienceYears: p.experienceYears,
      serviceCategories: [p.primaryCategory, ...(p.secondaryCategories || [])],
      verificationStatus: p.status,
      submittedAt: p.createdAt.toISOString(),
    }));
  }

  async verifyProvider(id: string, dto: VerifyProviderDto, adminUserId: string): Promise<{ success: boolean; provider: any }> {
    const provider = await this.prisma.providerProfile.findUnique({ where: { id } });
    if (!provider) {
      throw new NotFoundException(`Provider profile with ID ${id} not found`);
    }

    const targetStatus = dto.status === VerificationStatus.APPROVED ? ProfileStatus.ACTIVE : ProfileStatus.REJECTED;

    const updated = await this.prisma.providerProfile.update({
      where: { id },
      data: {
        status: targetStatus,
      },
    });

    await this.logAudit(adminUserId, "PROVIDER_VERIFICATION_UPDATED", "ProviderProfile", id, {
      oldStatus: provider.status,
      newStatus: targetStatus,
      rejectionReason: dto.rejectionReason,
    });

    return { success: true, provider: updated };
  }

  async getJobs(search?: string, status?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status) {
      where.status = status as JobStatus;
    }

    const jobs = await this.prisma.job.findMany({
      where,
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: { email: true, phone: true },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    return jobs.map((j) => ({
      id: j.id,
      title: j.title,
      description: j.description,
      categorySlug: j.categorySlug,
      status: j.status,
      generalArea: j.generalArea,
      budgetMin: j.budgetMin ? Number(j.budgetMin) : null,
      budgetMax: j.budgetMax ? Number(j.budgetMax) : null,
      customerEmail: j.customer.email,
      applicationsCount: j._count.applications,
      createdAt: j.createdAt.toISOString(),
    }));
  }

  async updateJobStatus(id: string, dto: UpdateJobStatusDto, adminUserId: string): Promise<{ success: boolean; job: any }> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    const updated = await this.prisma.job.update({
      where: { id },
      data: {
        status: dto.status,
        cancellationReason: dto.reason || job.cancellationReason,
      },
    });

    await this.logAudit(adminUserId, "JOB_STATUS_UPDATED", "Job", id, {
      oldStatus: job.status,
      newStatus: dto.status,
      reason: dto.reason,
    });

    return { success: true, job: updated };
  }

  async getBookings(search?: string, status?: string) {
    const where: any = {};
    if (status) {
      where.status = status as BookingStatus;
    }

    const bookings = await this.prisma.booking.findMany({
      where,
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { email: true } },
        provider: { select: { email: true } },
      },
    });

    return bookings.map((b) => ({
      id: b.id,
      bookingNumber: b.bookingReference,
      status: b.status,
      totalAmount: Number(b.agreedPrice),
      customerEmail: b.customer.email,
      providerEmail: b.provider.email,
      scheduledDate: b.scheduledDate,
      scheduledTime: b.scheduledTime,
      createdAt: b.createdAt.toISOString(),
    }));
  }

  async getPayoutRequests(status?: string) {
    const where: any = {};
    if (status) {
      where.status = status as PayoutStatus;
    }

    const payouts = await this.prisma.payoutRequest.findMany({
      where,
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        provider: {
          select: { email: true, profile: true },
        },
      },
    });

    return payouts.map((p) => ({
      id: p.id,
      walletAccountId: p.providerId,
      userId: p.providerId,
      userName: p.provider.profile
        ? `${p.provider.profile.firstName} ${p.provider.profile.lastName}`
        : p.provider.email,
      amount: Number(p.amount),
      currency: "BDT",
      payoutMethod: p.paymentMethod,
      accountNumberMasked: p.accountDetails,
      accountName: p.provider.email,
      status: p.status,
      referenceCode: `PAY-${p.id.slice(0, 8)}`,
      requestedAt: p.createdAt.toISOString(),
      processedAt: p.updatedAt.toISOString(),
      failureReason: p.notes,
    }));
  }

  async processPayout(id: string, dto: ProcessPayoutDto, adminUserId: string): Promise<{ success: boolean; payout: any }> {
    const payout = await this.prisma.payoutRequest.findUnique({
      where: { id },
    });

    if (!payout) {
      throw new NotFoundException(`Payout request with ID ${id} not found`);
    }

    if (payout.status !== PayoutStatus.PENDING) {
      throw new BadRequestException(`Payout request is already ${payout.status}`);
    }

    const targetStatus = dto.action === "APPROVE" ? PayoutStatus.APPROVED : PayoutStatus.REJECTED;

    const updated = await this.prisma.payoutRequest.update({
      where: { id },
      data: {
        status: targetStatus,
        notes: dto.failureReason || payout.notes,
      },
    });

    await this.logAudit(adminUserId, `PAYOUT_${dto.action}`, "PayoutRequest", id, {
      amount: Number(payout.amount),
      payoutMethod: payout.paymentMethod,
      accountDetails: payout.accountDetails,
      reason: dto.failureReason,
    });

    return { success: true, payout: updated };
  }

  async getFeatureFlags(): Promise<any[]> {
    const flags = await this.prisma.featureFlag.findMany({
      orderBy: { key: "asc" },
    });

    if (flags.length === 0) {
      const defaultFlags = [
        { key: "CHAT_ENABLED", name: "Realtime Chat", description: "Enable real-time messaging between users", isEnabled: true },
        { key: "PAYMENT_ENABLED", name: "Online Payments", description: "Enable digital payment gateways and wallet", isEnabled: true },
        { key: "PROVIDER_REGISTRATION_ENABLED", name: "Provider Registration", description: "Allow new service providers to sign up", isEnabled: true },
        { key: "MAINTENANCE_MODE", name: "Maintenance Mode", description: "Restrict platform access during updates", isEnabled: false },
      ];

      for (const df of defaultFlags) {
        await this.prisma.featureFlag.create({ data: df });
      }

      return this.prisma.featureFlag.findMany({ orderBy: { key: "asc" } });
    }

    return flags;
  }

  async toggleFeatureFlag(id: string, dto: ToggleFeatureFlagDto, adminUserId: string): Promise<{ success: boolean; featureFlag: any }> {
    const flag = await this.prisma.featureFlag.findUnique({ where: { id } });
    if (!flag) {
      throw new NotFoundException(`Feature flag with ID ${id} not found`);
    }

    const updated = await this.prisma.featureFlag.update({
      where: { id },
      data: {
        isEnabled: dto.isEnabled,
        rolloutPercentage: dto.rolloutPercentage ?? flag.rolloutPercentage,
      },
    });

    await this.logAudit(adminUserId, "FEATURE_FLAG_TOGGLED", "FeatureFlag", id, {
      key: flag.key,
      oldState: flag.isEnabled,
      newState: dto.isEnabled,
    });

    return { success: true, featureFlag: updated };
  }

  async getAuditLogs(action?: string, entityType?: string): Promise<any[]> {
    const where: any = {};
    if (action) where.action = action;
    if (entityType) where.entityType = entityType;

    const logs = await this.prisma.auditLog.findMany({
      where,
      take: 100,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true } },
      },
    });

    return logs.map((l) => ({
      id: l.id,
      userId: l.userId,
      userName: l.user?.email || "System",
      action: l.action,
      entityType: l.entityType,
      entityId: l.entityId,
      metadata: l.metadata,
      createdAt: l.createdAt.toISOString(),
    }));
  }
}
