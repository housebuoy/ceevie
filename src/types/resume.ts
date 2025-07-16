// types/resume.ts
export interface Resume {
  name: string;
  title: string;
  avatar: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  profiles: Array<{
    platform: string;
    username: string;
    url: string;
}
    >;
  education: Array<{
    school: string;
    location: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    url?: string;
    description: string;
    highlights: string[];
    location?: string;
  }>;
  skills: Array<{
    category: string;
    level: string;
    items: string[];
}>;

  projects?: Array<{
    title: string;
    description: string;
    role: string;
    url?: string;
  }>;
  languages?: Array<{
    name: string;  
    proficiency: "Advanced" | "Native" | "Intermediate" | "Fluent" | "Beginner";
  }>;
  hobbies?: string[];
  certifications?: string[];
  references?: Array<{
    name: string;
    position: string;
    contact: string;
  }>;
}
