import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { JobStatusTransitionService } from './jobs-transition.service';
import {
  CreateJobApiDto,
  UpdateJobApiDto,
  SelectProviderApiDto,
  CancelJobApiDto,
  PublicJobQueryDto,
} from './jobs.dto';
import {
  JobStatus,
  JobUrgency,
  BudgetType,
  ApplicationStatus,
  NotificationType,
  ActivityType,
} from '@kajlagbe/types';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly transitionService: JobStatusTransitionService,
  ) {}

  /**
   * Create a new job post (Draft or Published)
   */
  async createJob(userId: string, dto: CreateJobApiDto): Promise<any> {
    const isDraft = dto.isDraft ?? false;
    const initialStatus: JobStatus = isDraft ? JobStatus.DRAFT : JobStatus.PUBLISHED;

    const job = await this.prisma.job.create({
      data: {
        customerId: userId,
        title: dto.title,
        description: dto.description,
        categorySlug: dto.categorySlug,
        serviceSlug: dto.serviceSlug,
        requirements: dto.requirements || [],
        urgency: (dto.urgency as JobUrgency) || JobUrgency.FLEXIBLE,
        budgetType: (dto.budgetType as BudgetType) || BudgetType.BUDGET_RANGE,
        budgetMin: dto.budgetMin,
        budgetMax: dto.budgetMax,
        status: initialStatus,
        divisionId: dto.divisionId,
        districtId: dto.districtId,
        generalArea: dto.generalArea,
        privateAddress: dto.privateAddress,
        preferredDate: dto.preferredDate,
        preferredTime: dto.preferredTime,
        publishedAt: isDraft ? null : new Date(),
        statusHistories: {
          create: {
            fromStatus: JobStatus.DRAFT,
            toStatus: initialStatus,
            changedById: userId,
            reason: isDraft ? 'ড্রাফট হিসেবে সংরক্ষণ করা হয়েছে।' : 'কাজের বিজ্ঞাপন সফলভাবে প্রকাশ করা হয়েছে।',
          },
        },
      },
    });

    // Record user activity
    await this.prisma.userActivity.create({
      data: {
        userId,
        type: ActivityType.JOB_CREATED,
        description: `নতুন কাজের বিজ্ঞাপন (${job.title}) ${isDraft ? 'ড্রাফট করা হয়েছে' : 'প্রকাশ করা হয়েছে'}।`,
        metadata: { jobId: job.id, status: job.status },
      },
    });

    return job;
  }

  /**
   * Update an existing job (Customer Owner only)
   */
  async updateJob(userId: string, jobId: string, dto: UpdateJobApiDto): Promise<any> {
    const existing = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existing) {
      throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');
    }

    if (existing.customerId !== userId) {
      throw new ForbiddenException('এই কাজটি সম্পাদনার অনুমতি আপনার নেই।');
    }

    if (existing.status === JobStatus.COMPLETED || existing.status === JobStatus.CANCELLED) {
      throw new BadRequestException('সমাপ্ত বা বাতিল করা কাজ পুনরায় সম্পাদনা করা যাবে না।');
    }

    const updated = await this.prisma.job.update({
      where: { id: jobId },
      data: {
        title: dto.title ?? existing.title,
        description: dto.description ?? existing.description,
        categorySlug: dto.categorySlug ?? existing.categorySlug,
        serviceSlug: dto.serviceSlug ?? existing.serviceSlug,
        requirements: dto.requirements ?? existing.requirements,
        urgency: (dto.urgency as JobUrgency) ?? existing.urgency,
        budgetType: (dto.budgetType as BudgetType) ?? existing.budgetType,
        budgetMin: dto.budgetMin ?? existing.budgetMin,
        budgetMax: dto.budgetMax ?? existing.budgetMax,
        generalArea: dto.generalArea ?? existing.generalArea,
        privateAddress: dto.privateAddress ?? existing.privateAddress,
        preferredDate: dto.preferredDate ?? existing.preferredDate,
        preferredTime: dto.preferredTime ?? existing.preferredTime,
      },
    });

    return updated;
  }

  /**
   * Publish a draft job
   */
  async publishJob(userId: string, jobId: string): Promise<any> {
    const existing = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!existing) throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');
    if (existing.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    this.transitionService.validateTransition(existing.status, JobStatus.PUBLISHED);

    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: JobStatus.PUBLISHED,
        publishedAt: new Date(),
        statusHistories: {
          create: {
            fromStatus: existing.status,
            toStatus: JobStatus.PUBLISHED,
            changedById: userId,
            reason: 'ড্রাফট থেকে প্রকাশ করা হয়েছে।',
          },
        },
      },
    });
  }

  /**
   * Pause a published job
   */
  async pauseJob(userId: string, jobId: string): Promise<any> {
    const existing = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!existing) throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');
    if (existing.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    this.transitionService.validateTransition(existing.status, JobStatus.PAUSED);

    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: JobStatus.PAUSED,
        statusHistories: {
          create: {
            fromStatus: existing.status,
            toStatus: JobStatus.PAUSED,
            changedById: userId,
            reason: 'গ্রাহক কর্তৃক সাময়িক স্থগিত করা হয়েছে।',
          },
        },
      },
    });
  }

  /**
   * Cancel a job
   */
  async cancelJob(userId: string, jobId: string, dto: CancelJobApiDto): Promise<any> {
    const existing = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!existing) throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');
    if (existing.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    this.transitionService.validateTransition(existing.status, JobStatus.CANCELLED);

    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: JobStatus.CANCELLED,
        cancellationReason: dto.reason || 'গ্রাহক দ্বারা বাতিলকৃত',
        statusHistories: {
          create: {
            fromStatus: existing.status,
            toStatus: JobStatus.CANCELLED,
            changedById: userId,
            reason: dto.reason || 'গ্রাহক দ্বারা বাতিলকৃত',
          },
        },
      },
    });
  }

  /**
   * Select a provider (Atomic transaction with race condition protection)
   */
  async selectProvider(userId: string, jobId: string, dto: SelectProviderApiDto): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const job = await tx.job.findUnique({
        where: { id: jobId },
        include: { applications: true },
      });

      if (!job) throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি।');
      if (job.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

      this.transitionService.validateTransition(job.status, JobStatus.PROVIDER_SELECTED);

      const targetApp = job.applications.find((a) => a.id === dto.applicationId);
      if (!targetApp) {
        throw new NotFoundException('নির্বাচিত আবেদনপত্রটি পাওয়া যায়নি।');
      }

      if (targetApp.status === ApplicationStatus.WITHDRAWN) {
        throw new BadRequestException('প্রোভাইডার ইতিমধ্যে এই আবেদনটি প্রত্যাহার করে নিয়েছেন।');
      }

      // Update Job status
      const updatedJob = await tx.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.PROVIDER_SELECTED,
          selectedApplicationId: targetApp.id,
          selectedProviderId: targetApp.providerId,
          statusHistories: {
            create: {
              fromStatus: job.status,
              toStatus: JobStatus.PROVIDER_SELECTED,
              changedById: userId,
              reason: dto.notes || 'প্রোভাইডার নির্বাচন সম্পন্ন হয়েছে।',
            },
          },
        },
      });

      // Update selected application to ACCEPTED
      await tx.jobApplication.update({
        where: { id: targetApp.id },
        data: { status: ApplicationStatus.ACCEPTED },
      });

      // Create in-app notification for the selected provider
      await tx.notification.create({
        data: {
          userId: targetApp.providerId,
          type: NotificationType.JOB,
          title: 'অভিনন্দন! আপনার কাজের আবেদনটি গৃহীত হয়েছে',
          message: `গ্রাহক আপনাকে "${job.title}" কাজের জন্য নির্বাচিত করেছেন।`,
          link: `/provider/applications/${targetApp.id}`,
        },
      });

      return updatedJob;
    });
  }

  /**
   * Get all customer's jobs (Owner Dashboard)
   */
  async getCustomerJobs(userId: string): Promise<any> {
    const jobs = await this.prisma.job.findMany({
      where: { customerId: userId },
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return jobs.map((job) => ({
      ...job,
      totalApplications: job._count.applications,
    }));
  }

  /**
   * Get single job details for owner (with private address & histories)
   */
  async getCustomerJobDetails(userId: string, jobId: string): Promise<any> {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        statusHistories: {
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!job) throw new NotFoundException('কাজের বিবরণ পাওয়া যায়নি।');
    if (job.customerId !== userId) throw new ForbiddenException('অনুমতি নেই।');

    return {
      ...job,
      totalApplications: job._count.applications,
    };
  }

  /**
   * Public Job Board Search & Pagination (Privacy-Aware)
   */
  async getPublicJobs(query: PublicJobQueryDto): Promise<any> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
    const skip = (page - 1) * limit;

    const where: any = {
      status: JobStatus.PUBLISHED,
      isPublic: true,
    };

    if (query.category && query.category !== 'all') {
      where.categorySlug = query.category;
    }

    if (query.urgency && query.urgency !== 'all') {
      where.urgency = query.urgency as JobUrgency;
    }

    if (query.query && query.query.trim()) {
      const q = query.query.trim();
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { generalArea: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [total, jobs] = await Promise.all([
      this.prisma.job.count({ where }),
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          categorySlug: true,
          serviceSlug: true,
          requirements: true,
          urgency: true,
          budgetType: true,
          budgetMin: true,
          budgetMax: true,
          status: true,
          generalArea: true,
          preferredDate: true,
          preferredTime: true,
          createdAt: true,
          publishedAt: true,
          customer: {
            select: {
              profile: {
                select: {
                  firstName: true,
                  verificationStatus: true,
                },
              },
            },
          },
          _count: {
            select: { applications: true },
          },
        },
      }),
    ]);

    const items = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      categorySlug: job.categorySlug,
      serviceSlug: job.serviceSlug,
      requirements: job.requirements,
      urgency: job.urgency,
      budgetType: job.budgetType,
      budgetMin: job.budgetMin ? Number(job.budgetMin) : null,
      budgetMax: job.budgetMax ? Number(job.budgetMax) : null,
      status: job.status,
      generalArea: job.generalArea,
      preferredDate: job.preferredDate,
      preferredTime: job.preferredTime,
      createdAt: job.createdAt,
      publishedAt: job.publishedAt,
      totalApplications: job._count.applications,
      customerName: job.customer?.profile?.firstName || 'গ্রাহক',
      customerVerified: job.customer?.profile?.verificationStatus === 'APPROVED',
    }));

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Public Single Job Details (Privacy-Safe)
   */
  async getPublicJobById(jobId: string, currentUserId?: string): Promise<any> {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        customerId: true,
        title: true,
        description: true,
        categorySlug: true,
        serviceSlug: true,
        requirements: true,
        urgency: true,
        budgetType: true,
        budgetMin: true,
        budgetMax: true,
        status: true,
        generalArea: true,
        preferredDate: true,
        preferredTime: true,
        createdAt: true,
        publishedAt: true,
        customer: {
          select: {
            profile: {
              select: {
                firstName: true,
                verificationStatus: true,
              },
            },
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job || (job.status !== JobStatus.PUBLISHED && job.customerId !== currentUserId)) {
      throw new NotFoundException('কাজের বিজ্ঞাপনটি পাওয়া যায়নি বা সক্রিয় নয়।');
    }

    let hasApplied = false;
    let isSaved = false;

    if (currentUserId) {
      const [app, saved] = await Promise.all([
        this.prisma.jobApplication.findUnique({
          where: { jobId_providerId: { jobId, providerId: currentUserId } },
        }),
        this.prisma.savedJob.findUnique({
          where: { userId_jobId: { userId: currentUserId, jobId } },
        }),
      ]);
      hasApplied = !!app;
      isSaved = !!saved;
    }

    return {
      id: job.id,
      title: job.title,
      description: job.description,
      categorySlug: job.categorySlug,
      serviceSlug: job.serviceSlug,
      requirements: job.requirements,
      urgency: job.urgency,
      budgetType: job.budgetType,
      budgetMin: job.budgetMin ? Number(job.budgetMin) : null,
      budgetMax: job.budgetMax ? Number(job.budgetMax) : null,
      status: job.status,
      generalArea: job.generalArea,
      preferredDate: job.preferredDate,
      preferredTime: job.preferredTime,
      createdAt: job.createdAt,
      publishedAt: job.publishedAt,
      totalApplications: job._count.applications,
      customerName: job.customer?.profile?.firstName || 'গ্রাহক',
      customerVerified: job.customer?.profile?.verificationStatus === 'APPROVED',
      hasApplied,
      isSaved,
    };
  }
}
