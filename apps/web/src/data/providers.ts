export interface ProviderReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  serviceType: string;
}

export interface ProviderPortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description: string;
  completedDate: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  avatarUrl?: string;
  title: string;
  category: string;
  categorySlug: string;
  division: string;
  district: string;
  area: string;
  fullLocation: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experienceYears: number;
  trustScore: number;
  responseRate: number;
  avgResponseTime: string;
  isAvailable: boolean;
  isNidVerified: boolean;
  isPoliceVerified: boolean;
  isTradeLicenseVerified: boolean;
  isTopRated: boolean;
  hourlyRate?: number;
  startingPrice: number;
  bio: string;
  skills: string[];
  servicesOffered: { title: string; price: string; description: string }[];
  portfolio: ProviderPortfolioItem[];
  reviews: ProviderReview[];
  emergencyAvailable: boolean;
}

export const PROVIDERS: Provider[] = [];
