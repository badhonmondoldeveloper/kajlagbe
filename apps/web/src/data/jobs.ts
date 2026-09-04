export interface JobPost {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  division: string;
  district: string;
  area: string;
  budgetMin: number;
  budgetMax: number;
  budgetType: 'fixed' | 'negotiable' | 'hourly';
  urgency: 'emergency' | 'today' | 'flexible';
  preferredDate: string;
  postedAt: string;
  customerName: string;
  customerVerified: boolean;
  totalProposals: number;
  description: string;
  requirements: string[];
}

export const JOBS: JobPost[] = [];
