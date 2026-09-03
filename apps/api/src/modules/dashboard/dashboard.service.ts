import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateProviderServiceDto,
  UpdateProviderAvailabilityDto,
  CreatePortfolioDto,
  SaveProviderDto,
  CreateBusinessServiceDto,
  CreateBusinessLocationDto,
  CreateBusinessTeamMemberDto,
} from './dashboard.dto';
import { ActivityType } from '@kajlagbe/types';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  // -------------------------------------------------------------
  // 1. STATS & PROFILE COMPLETION
  // -------------------------------------------------------------

  async getCustomerStats(userId: string): Promise<Record<string, any>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        customerProfile: true,
        savedProviders: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const savedCount = user.savedProviders.length;
    const profile = user.profile;
    const customerProfile = user.customerProfile;

    // Truthful profile completion calculation
    const missing: { field: string; label: string; actionUrl: string }[] = [];
    let completed = 0;
    const totalFields = 4;

    if (profile?.firstName && profile?.lastName) completed++;
    else missing.push({ field: 'name', label: 'পুরো নাম', actionUrl: '/customer/profile' });

    if (user.phone) completed++;
    else missing.push({ field: 'phone', label: 'মোবাইল নম্বর', actionUrl: '/customer/profile' });

    if (profile?.divisionId || profile?.address) completed++;
    else missing.push({ field: 'location', label: 'এলাকা / ঠিকানা', actionUrl: '/customer/profile' });

    if (customerProfile?.serviceInterests && customerProfile.serviceInterests.length > 0) completed++;
    else missing.push({ field: 'interests', label: 'সার্ভিস পছন্দসমূহ', actionUrl: '/customer/profile' });

    const percentage = Math.round((completed / totalFields) * 100);

    return {
      activeRequestsCount: 0,
      upcomingBookingsCount: 0,
      completedServicesCount: 0,
      savedProvidersCount: savedCount,
      profileCompletion: {
        percentage,
        isComplete: percentage === 100,
        missingFields: missing,
      },
    };
  }

  async getProviderStats(userId: string): Promise<Record<string, any>> {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { userId },
      include: {
        user: { include: { profile: true } },
        services: true,
        portfolios: true,
        availability: true,
      },
    });

    if (!provider) throw new NotFoundException('Provider profile not found');

    const profile = provider.user.profile;
    const missing: { field: string; label: string; actionUrl: string }[] = [];
    let completed = 0;
    const totalFields = 6;

    if (profile?.firstName && profile?.lastName) completed++;
    else missing.push({ field: 'name', label: 'পুরো নাম', actionUrl: '/provider/profile' });

    if (provider.bio) completed++;
    else missing.push({ field: 'bio', label: 'পেশাদার পরিচিতি (Bio)', actionUrl: '/provider/profile' });

    if (provider.services.length > 0) completed++;
    else missing.push({ field: 'services', label: 'সার্ভিস তালিকা যোগ করুন', actionUrl: '/provider/services' });

    if (provider.skills.length > 0) completed++;
    else missing.push({ field: 'skills', label: 'দক্ষতাসমূহ', actionUrl: '/provider/profile' });

    if (provider.serviceLocation || provider.divisionId) completed++;
    else missing.push({ field: 'location', label: 'কাজের এলাকা', actionUrl: '/provider/profile' });

    if (provider.portfolios.length > 0) completed++;
    else missing.push({ field: 'portfolio', label: 'কাজের পোর্টফোলিও', actionUrl: '/provider/portfolio' });

    const percentage = Math.round((completed / totalFields) * 100);

    return {
      activeOpportunitiesCount: 0,
      activeBookingsCount: 0,
      completedJobsCount: 0,
      averageRating: 0,
      totalReviewsCount: 0,
      availabilityStatus: provider.availability?.status || provider.availabilityStatus || 'available',
      profileCompletion: {
        percentage,
        isComplete: percentage === 100,
        missingFields: missing,
      },
    };
  }

  async getBusinessStats(userId: string): Promise<Record<string, any>> {
    const business = await this.prisma.businessProfile.findUnique({
      where: { userId },
      include: {
        services: true,
        locations: true,
        teamMembers: true,
      },
    });

    if (!business) throw new NotFoundException('Business profile not found');

    const missing: { field: string; label: string; actionUrl: string }[] = [];
    let completed = 0;
    const totalFields = 5;

    if (business.businessName) completed++;
    else missing.push({ field: 'name', label: 'প্রতিষ্ঠানের নাম', actionUrl: '/business/profile' });

    if (business.description) completed++;
    else missing.push({ field: 'description', label: 'কোম্পানি বিবরণ', actionUrl: '/business/profile' });

    if (business.services.length > 0) completed++;
    else missing.push({ field: 'services', label: 'সার্ভিস ক্যাটালগ', actionUrl: '/business/services' });

    if (business.locations.length > 0 || business.businessAddress) completed++;
    else missing.push({ field: 'location', label: 'হেড অফিস / ঠিকানা', actionUrl: '/business/locations' });

    if (business.teamMembers.length > 0) completed++;
    else missing.push({ field: 'team', label: 'টিম মেম্বার যোগ করুন', actionUrl: '/business/team' });

    const percentage = Math.round((completed / totalFields) * 100);

    return {
      activeTeamMembersCount: business.teamMembers.length,
      activeServicesCount: business.services.length,
      activeLocationsCount: business.locations.length,
      customerRequestsCount: 0,
      profileCompletion: {
        percentage,
        isComplete: percentage === 100,
        missingFields: missing,
      },
    };
  }

  // -------------------------------------------------------------
  // 2. NOTIFICATIONS & ACTIVITIES
  // -------------------------------------------------------------

  async getNotifications(userId: string): Promise<Record<string, any>[]> {
    const list = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return list;
  }

  async markNotificationAsRead(userId: string, id: string): Promise<Record<string, any>> {
    const notif = await this.prisma.notification.findUnique({ where: { id } });
    if (!notif) throw new NotFoundException('Notification not found');
    if (notif.userId !== userId) throw new ForbiddenException('Access denied');

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async markAllNotificationsAsRead(userId: string): Promise<{ success: boolean }> {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
    return { success: true };
  }

  async getActivities(userId: string): Promise<Record<string, any>[]> {
    return this.prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async logActivity(params: {
    userId: string;
    type: ActivityType;
    description: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
  }): Promise<void> {
    try {
      await this.prisma.userActivity.create({
        data: {
          userId: params.userId,
          type: params.type as any,
          description: params.description,
          metadata: params.metadata,
          ipAddress: params.ipAddress,
        },
      });
    } catch {
      // Non-blocking
    }
  }

  // -------------------------------------------------------------
  // 3. SAVED PROVIDERS (CUSTOMER)
  // -------------------------------------------------------------

  async getSavedProviders(userId: string): Promise<Record<string, any>[]> {
    return this.prisma.savedProvider.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async saveProvider(userId: string, dto: SaveProviderDto): Promise<Record<string, any>> {
    return this.prisma.savedProvider.upsert({
      where: {
        userId_providerSlug: {
          userId,
          providerSlug: dto.providerSlug,
        },
      },
      update: { notes: dto.notes },
      create: {
        userId,
        providerSlug: dto.providerSlug,
        notes: dto.notes,
      },
    });
  }

  async removeSavedProvider(userId: string, providerSlug: string): Promise<{ success: boolean }> {
    await this.prisma.savedProvider.deleteMany({
      where: { userId, providerSlug },
    });
    return { success: true };
  }

  // -------------------------------------------------------------
  // 4. PROVIDER MANAGEMENT (SERVICES, AVAILABILITY, PORTFOLIO)
  // -------------------------------------------------------------

  async getProviderServices(userId: string): Promise<Record<string, any>[]> {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { userId },
    });
    if (!provider) return [];

    return this.prisma.providerService.findMany({
      where: { providerProfileId: provider.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createProviderService(userId: string, dto: CreateProviderServiceDto): Promise<Record<string, any>> {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { userId },
    });
    if (!provider) throw new NotFoundException('Provider profile not found');

    const created = await this.prisma.providerService.create({
      data: {
        providerProfileId: provider.id,
        name: dto.name,
        categorySlug: dto.categorySlug,
        description: dto.description,
        pricingType: dto.pricingType || 'fixed',
        startingPrice: dto.startingPrice || 0,
      },
    });

    await this.logActivity({
      userId,
      type: ActivityType.SERVICE_ADDED,
      description: `নতুন সার্ভিস '${dto.name}' যোগ করা হয়েছে।`,
    });

    return created;
  }

  async deleteProviderService(userId: string, id: string): Promise<{ success: boolean }> {
    const service = await this.prisma.providerService.findUnique({
      where: { id },
      include: { providerProfile: true },
    });
    if (!service) throw new NotFoundException('Service not found');
    if (service.providerProfile.userId !== userId) throw new ForbiddenException('Access denied');

    await this.prisma.providerService.delete({ where: { id } });
    return { success: true };
  }

  async getProviderAvailability(userId: string): Promise<Record<string, any>> {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { userId },
      include: { availability: true },
    });
    if (!provider) throw new NotFoundException('Provider profile not found');

    return provider.availability || {
      status: provider.availabilityStatus || 'available',
      isAutoAccept: false,
    };
  }

  async updateProviderAvailability(userId: string, dto: UpdateProviderAvailabilityDto): Promise<Record<string, any>> {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { userId },
    });
    if (!provider) throw new NotFoundException('Provider profile not found');

    const updated = await this.prisma.providerAvailability.upsert({
      where: { providerProfileId: provider.id },
      update: {
        status: dto.status,
        isAutoAccept: dto.isAutoAccept ?? false,
        workingHoursNote: dto.workingHoursNote,
        customNotice: dto.customNotice,
      },
      create: {
        providerProfileId: provider.id,
        status: dto.status,
        isAutoAccept: dto.isAutoAccept ?? false,
        workingHoursNote: dto.workingHoursNote,
        customNotice: dto.customNotice,
      },
    });

    await this.prisma.providerProfile.update({
      where: { id: provider.id },
      data: { availabilityStatus: dto.status },
    });

    await this.logActivity({
      userId,
      type: ActivityType.AVAILABILITY_CHANGED,
      description: `প্রোভাইডার কাজের স্ট্যাটাস '${dto.status}' এ পরিবর্তন করা হয়েছে।`,
    });

    return updated;
  }

  async getProviderPortfolios(userId: string): Promise<Record<string, any>[]> {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { userId },
    });
    if (!provider) return [];

    return this.prisma.providerPortfolio.findMany({
      where: { providerProfileId: provider.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createProviderPortfolio(userId: string, dto: CreatePortfolioDto): Promise<Record<string, any>> {
    const provider = await this.prisma.providerProfile.findUnique({
      where: { userId },
    });
    if (!provider) throw new NotFoundException('Provider profile not found');

    return this.prisma.providerPortfolio.create({
      data: {
        providerProfileId: provider.id,
        title: dto.title,
        description: dto.description,
        categorySlug: dto.categorySlug,
        images: dto.images || [],
      },
    });
  }

  async deleteProviderPortfolio(userId: string, id: string): Promise<{ success: boolean }> {
    const item = await this.prisma.providerPortfolio.findUnique({
      where: { id },
      include: { providerProfile: true },
    });
    if (!item) throw new NotFoundException('Portfolio item not found');
    if (item.providerProfile.userId !== userId) throw new ForbiddenException('Access denied');

    await this.prisma.providerPortfolio.delete({ where: { id } });
    return { success: true };
  }

  // -------------------------------------------------------------
  // 5. BUSINESS MANAGEMENT (SERVICES, LOCATIONS, TEAM)
  // -------------------------------------------------------------

  async getBusinessServices(userId: string): Promise<Record<string, any>[]> {
    const business = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!business) return [];

    return this.prisma.businessService.findMany({
      where: { businessProfileId: business.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createBusinessService(userId: string, dto: CreateBusinessServiceDto): Promise<Record<string, any>> {
    const business = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!business) throw new NotFoundException('Business profile not found');

    return this.prisma.businessService.create({
      data: {
        businessProfileId: business.id,
        name: dto.name,
        categorySlug: dto.categorySlug,
        description: dto.description,
        pricingModel: dto.pricingModel || 'quote',
        startingPrice: dto.startingPrice,
      },
    });
  }

  async deleteBusinessService(userId: string, id: string): Promise<{ success: boolean }> {
    const service = await this.prisma.businessService.findUnique({
      where: { id },
      include: { businessProfile: true },
    });
    if (!service) throw new NotFoundException('Service not found');
    if (service.businessProfile.userId !== userId) throw new ForbiddenException('Access denied');

    await this.prisma.businessService.delete({ where: { id } });
    return { success: true };
  }

  async getBusinessLocations(userId: string): Promise<Record<string, any>[]> {
    const business = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!business) return [];

    return this.prisma.businessLocation.findMany({
      where: { businessProfileId: business.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createBusinessLocation(userId: string, dto: CreateBusinessLocationDto): Promise<Record<string, any>> {
    const business = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!business) throw new NotFoundException('Business profile not found');

    return this.prisma.businessLocation.create({
      data: {
        businessProfileId: business.id,
        title: dto.title,
        address: dto.address,
        divisionId: dto.divisionId,
        districtId: dto.districtId,
        isPrimary: dto.isPrimary || false,
      },
    });
  }

  async deleteBusinessLocation(userId: string, id: string): Promise<{ success: boolean }> {
    const loc = await this.prisma.businessLocation.findUnique({
      where: { id },
      include: { businessProfile: true },
    });
    if (!loc) throw new NotFoundException('Location not found');
    if (loc.businessProfile.userId !== userId) throw new ForbiddenException('Access denied');

    await this.prisma.businessLocation.delete({ where: { id } });
    return { success: true };
  }

  async getBusinessTeam(userId: string): Promise<Record<string, any>[]> {
    const business = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!business) return [];

    return this.prisma.businessTeamMember.findMany({
      where: { businessProfileId: business.id },
      orderBy: { joinedAt: 'desc' },
    });
  }

  async createBusinessTeamMember(userId: string, dto: CreateBusinessTeamMemberDto): Promise<Record<string, any>> {
    const business = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!business) throw new NotFoundException('Business profile not found');

    return this.prisma.businessTeamMember.create({
      data: {
        businessProfileId: business.id,
        name: dto.name,
        role: dto.role || 'TECHNICIAN',
        phone: dto.phone,
        email: dto.email,
      },
    });
  }

  async deleteBusinessTeamMember(userId: string, id: string): Promise<{ success: boolean }> {
    const member = await this.prisma.businessTeamMember.findUnique({
      where: { id },
      include: { businessProfile: true },
    });
    if (!member) throw new NotFoundException('Team member not found');
    if (member.businessProfile.userId !== userId) throw new ForbiddenException('Access denied');

    await this.prisma.businessTeamMember.delete({ where: { id } });
    return { success: true };
  }
}
