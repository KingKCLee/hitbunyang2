export type UserRole = 'agent' | 'company';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
  phone?: string;
  companyName?: string;
  photoURL?: string;
  scrappedJobs?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface JobPosting {
  id: string;
  title: string;
  oneLiner: string;
  startDate: string;
  locationAddr: string;
  locationDetail: string;
  siteName: string;
  siteAddr: string;
  siteDetail: string;
  developer: string;
  constructor: string;
  trustee: string;
  agency: string;
  category: string;
  jobType: string;
  gender: string;
  age: string;
  experience: string;
  personnel: string;
  salaryType: string;
  salaryInfo: string;
  meal: string;
  dorm: string;
  dailyExp: string;
  transport: string;
  salesExp: string;
  content: string;
  siteUrl: string;
  youtubeUrl: string;
  managerName: string;
  managerPhone: string;
  authorUid: string;
  createdAt: any;
  updatedAt: any;
  views: number;
  status: 'open' | 'closed';
  commission?: string;
  location?: string;
  companyName?: string;
  // Hit Bunyang Specifics
  hitIndex: number; // 0-100
  adTier: 'hit' | 'premium' | 'standard' | 'free';
  isHot?: boolean;
  isNew?: boolean;
  isUrgent?: boolean;
  inquiryCount?: number;
  shareCount?: number;
  reviewRating?: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantUid: string;
  applicantName: string;
  applicantPhone: string;
  appliedAt: any;
  createdAt: any;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export interface RecruitmentPost {
  id: string;
  title: string;
  oneLiner: string;
  location: string;
  siteName: string;
  isAd?: boolean;
  category?: string;
  createdAt: string;
}

export interface Stats {
  todayNewSites: number;
  totalSites: number;
  nowConnected: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorUid: string;
  authorName: string;
  category: 'review' | 'free' | 'tip' | 'qna';
  createdAt: any;
  views: number;
  commentCount: number;
  likes: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  url: string;
  createdAt: any;
}
