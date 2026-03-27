
export type Screen = 'home' | 'play' | 'explore' | 'profile';

export interface UserProfile {
  name: string;
  tamilName: string;
  level: number;
  xp: number;
  streak: number;
  accuracy: number;
  days: number;
  avatar: string;
}

export interface WordMastery {
  word: string;
  transliteration: string;
  percentage: number;
  color: 'primary' | 'secondary';
}

export interface Activity {
  id: string;
  type: 'game' | 'badge';
  title: string;
  detail: string;
  time: string;
  xp?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  word: string;
  type: string;
}

export interface Question {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WordDetail {
  word: string;
  transliteration: string;
  meaning: string;
  exampleTamil: string;
  exampleEnglish: string;
  morphology: { label: string; value: string }[];
  frequency: 'High' | 'Medium' | 'Low';
  reliance: string;
}
