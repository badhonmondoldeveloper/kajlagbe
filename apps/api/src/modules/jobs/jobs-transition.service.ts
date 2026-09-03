import { Injectable, BadRequestException } from '@nestjs/common';
import { JobStatus } from '@kajlagbe/types';

@Injectable()
export class JobStatusTransitionService {
  private readonly allowedTransitions: Record<JobStatus, JobStatus[]> = {
    DRAFT: [JobStatus.PUBLISHED, JobStatus.CANCELLED, JobStatus.ARCHIVED],
    PUBLISHED: [
      JobStatus.PAUSED,
      JobStatus.PROVIDER_SELECTED,
      JobStatus.UNDER_REVIEW,
      JobStatus.CANCELLED,
      JobStatus.EXPIRED,
    ],
    PAUSED: [JobStatus.PUBLISHED, JobStatus.CANCELLED],
    UNDER_REVIEW: [JobStatus.PUBLISHED, JobStatus.CANCELLED],
    PROVIDER_SELECTED: [
      JobStatus.IN_PROGRESS,
      JobStatus.PUBLISHED,
      JobStatus.CANCELLED,
    ],
    IN_PROGRESS: [JobStatus.COMPLETED, JobStatus.CANCELLED],
    COMPLETED: [JobStatus.ARCHIVED],
    CANCELLED: [JobStatus.ARCHIVED],
    EXPIRED: [JobStatus.PUBLISHED, JobStatus.ARCHIVED],
    ARCHIVED: [],
  };

  validateTransition(currentStatus: JobStatus, targetStatus: JobStatus): boolean {
    if (currentStatus === targetStatus) return true;

    const allowed = this.allowedTransitions[currentStatus] || [];
    if (!allowed.includes(targetStatus)) {
      throw new BadRequestException(
        `অবৈধ স্ট্যাটাস পরিবর্তন: '${currentStatus}' থেকে '${targetStatus}' এ রূপান্তর অনুমোদিত নয়।`
      );
    }

    return true;
  }
}
