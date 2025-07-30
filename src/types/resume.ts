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
    customFields?: Array<{
    label: string;
    value: string;
    key?: string;
  }>;
  };
  profiles: Array<{
    platform: string;
    username: string;
    url: string;
    iconSlug?: string;
}
    >;
  education: Array<{
    school: string;
    location: string;
    degree: string;
    startDate: string;
    endDate: string;
    url?: string;
    summary?: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    url?: string;
    description: string;
    highlights?: string[];
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
  certifications?: Array<{
    name: string;
    date?: string; // ISO string
  }>;
  awards?: Array<{
    title: string;
    issuer?: string;
    date?: string;
    description?: string;
  }>;
  references?: Array<{
    name: string;
    position: string;
    contact: string;
  }>;
  customFields? : Array<{
    label: string;
    value: string;
  }>;
  customSections?: Array<{
    title: string;
    content: string;
  }>;
  publications?: Array<{
    title: string;
    publisher?: string;
    date?: string;
    url?: string;
    description?: string;
  }>;
  volunteering?: Array<{
    organization: string;
    role: string;
    startDate?: string;
    endDate?: string;
    url?: string;
    description?: string;
  }>;
}
