import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateApplicationApiDto } from './applications.dto';
import {
  JobStatus,
  ApplicationStatus,
  PricingType,
  NotificationType,
  ActivityType,
} from '@kajlagbe/types';

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Provider applies to a job with a proposal quote
   */
  async applyToJob(userId: string, jobId: string, dto: CreateApplicationApiDto): Promise<any> {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { customer: true },
    });

    if (!job) {
      throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');
    }

    if (job.status !== JobStatus.PUBLISHED) {
      throw new BadRequestException('এই কাজটি বর্তমানে সক্রিয় নেই বা বন্ধ হয়ে গেছে।');
    }

    if (job.customerId === userId) {
      throw new ForbiddenException('নিজের পোস্ট করা কাজে আবেদন করা যাবে না।');
    }

    // Check duplicate application
    const existing = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_providerId: {
          jobId,
          providerId: userId,
        },
      },
    });

    if (existing) {
      if (existing.status === ApplicationStatus.WITHDRAWN) {
        // Reactivate
        return this.prisma.jobApplication.update({
          where: { id: existing.id },
          data: {
            coverLetter: dto.coverLetter,
            proposedPrice: dto.proposedPrice,
            pricingType: (dto.pricingType as PricingType) || PricingType.FIXED,
            estimatedDays: dto.estimatedDays || 1,
            availabilityNote: dto.availabilityNote,
            status: ApplicationStatus.SUBMITTED,
          },
        });
      }
      throw new ConflictException('আপনি ইতিপূর্বে এই কাজে আবেদন করেছেন।');
    }

    // Create application
    const application = await this.prisma.jobApplication.create({
      data: {
        jobId,
        providerId: userId,
        coverLetter: dto.coverLetter,
        proposedPrice: dto.proposedPrice,
        pricingType: (dto.pricingType as PricingType) || PricingType.FIXED,
        estimatedDays: dto.estimatedDays || 1,
        availabilityNote: dto.availabilityNote,
        status: ApplicationStatus.SUBMITTED,
      },
    });

    // Notify customer
    await this.prisma.notification.create({
      data: {
        userId: job.customerId,
        type: NotificationType.JOB,
        title: 'নতুন কাজের আবেদন জমা হয়েছে',
        message: `আপনার "${job.title}" কাজের জন্য একজন প্রোভাইডার ৳${dto.proposedPrice} কোটেশনসহ আবেদন করেছেন।`,
        link: `/customer/jobs/${job.id}`,
      },
    });

    return application;
  }

  /**
   * Customer views all applications for a job (with quote comparison metrics)
   */
  async getJobApplications(userId: string, jobId: string): Promise<any> {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');
    if (job.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    const applications = await this.prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        provider: {
          select: {
            id: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                verificationStatus: true,
              },
            },
            providerProfile: {
              select: {
                primaryCategory: true,
                experienceYears: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return applications.map((app) => ({
      id: app.id,
      jobId: app.jobId,
      providerId: app.providerId,
      providerName: app.provider.profile
        ? `${app.provider.profile.firstName} ${app.provider.profile.lastName}`.trim()
        : 'প্রোভাইডার',
      providerRating: 5.0,
      providerReviewsCount: 2,
      providerExperienceYears: app.provider.providerProfile?.experienceYears || 1,
      providerPrimaryCategory: app.provider.providerProfile?.primaryCategory || 'electrician',
      isProviderVerified: app.provider.profile?.verificationStatus === 'APPROVED',
      coverLetter: app.coverLetter,
      proposedPrice: Number(app.proposedPrice),
      pricingType: app.pricingType,
      estimatedDays: app.estimatedDays,
      availabilityNote: app.availabilityNote,
      status: app.status,
      isShortlisted: app.isShortlisted,
      createdAt: app.createdAt,
    }));
  }

  /**
   * Provider views all their submitted applications
   */
  async getProviderApplications(userId: string): Promise<any> {
    const applications = await this.prisma.jobApplication.findMany({
      where: { providerId: userId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            categorySlug: true,
            generalArea: true,
            urgency: true,
            budgetType: true,
            budgetMin: true,
            budgetMax: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return applications.map((app) => ({
      id: app.id,
      jobId: app.jobId,
      jobTitle: app.job.title,
      categorySlug: app.job.categorySlug,
      generalArea: app.job.generalArea,
      jobStatus: app.job.status,
      jobUrgency: app.job.urgency,
      proposedPrice: Number(app.proposedPrice),
      pricingType: app.pricingType,
      estimatedDays: app.estimatedDays,
      coverLetter: app.coverLetter,
      status: app.status,
      isShortlisted: app.isShortlisted,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    }));
  }

  /**
   * Provider single application details
   */
  async getProviderApplicationDetails(userId: string, applicationId: string): Promise<any> {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: {
        job: true,
      },
    });

    if (!application) throw new NotFoundException('আবেদনপত্রটি পাওয়া যায়নি।');
    if (application.providerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    return {
      ...application,
      proposedPrice: Number(application.proposedPrice),
      job: {
        ...application.job,
        budgetMin: application.job.budgetMin ? Number(application.job.budgetMin) : null,
        budgetMax: application.job.budgetMax ? Number(application.job.budgetMax) : null,
      },
    };
  }

  /**
   * Customer shortlists an application
   */
  async shortlistApplication(userId: string, applicationId: string): Promise<any> {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });

    if (!app) throw new NotFoundException('আবেদনপত্র পাওয়া যায়নি।');
    if (app.job.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    const updated = await this.prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        isShortlisted: true,
        status: app.status === ApplicationStatus.SUBMITTED ? ApplicationStatus.SHORTLISTED : app.status,
      },
    });

    // Notify provider
    await this.prisma.notification.create({
      data: {
        userId: app.providerId,
        type: NotificationType.JOB,
        title: 'আপনার আবেদনটি শর্টলিস্ট করা হয়েছে',
        message: `গ্রাহক "${app.job.title}" কাজের জন্য আপনার আবেদন শর্টলিস্টে রেখেছেন।`,
        link: `/provider/applications/${app.id}`,
      },
    });

    return updated;
  }

  /**
   * Customer rejects an application
   */
  async rejectApplication(userId: string, applicationId: string): Promise<any> {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });

    if (!app) throw new NotFoundException('আবেদনপত্র পাওয়া যায়নি।');
    if (app.job.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    return this.prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        status: ApplicationStatus.REJECTED,
      },
    });
  }

  /**
   * Provider withdraws their application
   */
  async withdrawApplication(userId: string, applicationId: string): Promise<any> {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
    });

    if (!app) throw new NotFoundException('আবেদনপত্র পাওয়া যায়নি।');
    if (app.providerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    if (app.status === ApplicationStatus.ACCEPTED) {
      throw new BadRequestException('গৃহীত আবেদনপত্র প্রত্যাহার করতে হলে সাপোর্ট সেন্টারে যোগাযোগ করুন।');
    }

    return this.prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status: ApplicationStatus.WITHDRAWN },
    });
  }

  /**
   * Save a job (Bookmark)
   */
  async saveJob(userId: string, jobId: string): Promise<any> {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');

    return this.prisma.savedJob.upsert({
      where: { userId_jobId: { userId, jobId } },
      create: { userId, jobId },
      update: {},
    });
  }

  /**
   * Unsave a job
   */
  async unsaveJob(userId: string, jobId: string): Promise<any> {
    return this.prisma.savedJob.deleteMany({
      where: { userId, jobId },
    });
  }

  /**
   * Get provider saved jobs
   */
  async getSavedJobs(userId: string): Promise<any> {
    const list = await this.prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            categorySlug: true,
            generalArea: true,
            urgency: true,
            budgetMin: true,
            budgetMax: true,
            status: true,
            createdAt: true,
            _count: { select: { applications: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return list.map((item) => ({
      id: item.id,
      jobId: item.jobId,
      title: item.job.title,
      categorySlug: item.job.categorySlug,
      generalArea: item.job.generalArea,
      urgency: item.job.urgency,
      budgetMin: item.job.budgetMin ? Number(item.job.budgetMin) : null,
      budgetMax: item.job.budgetMax ? Number(item.job.budgetMax) : null,
      status: item.job.status,
      applicationsCount: item.job._count.applications,
      savedAt: item.createdAt,
    }));
  }
}
