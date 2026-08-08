export interface TimelineItem {
  id: string;
  year: string;
  period: string;
  kanji: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techUsed: string[];
  imagePlaceholder: string;
  memoryFragmentCode: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'devops' | 'architecture' | 'database';
  commandPhrase: string;
  proficiency: number; // 0 - 100
  kanji: string;
  description: string;
  iconName: string;
  size: 'col-span-1';
  codeSnippet: string;
  bankaiForm: string;
}

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  kanjiOverlay: string;
  architectureDiagram?: string;
}

export interface ContactFormState {
  identity: string;
  spiritualFrequency: string;
  missionDetails: string;
  urgency: 'STANDARD' | 'CRITICAL_BANKAI';
}
