export interface FreelancerProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  skills: string[];
  bio: string;
  workHistory: string;
  jobPreferences: string;
  rate: number;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  description: string;
  requiredSkills: string[];
  budget: number;
}
