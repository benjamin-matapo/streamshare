export interface Session {
  id: string;
  name: string;
  currentSlideIndex: number;
  slides: Slide[];
}

export type SlideType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'IFRAME';

export interface Slide {
  id: string;
  type: SlideType;
  content: string;
  order: number;
}

export interface Reaction {
  id: string;
  emoji: string;
  sessionId: string;
}

export interface Question {
  id: string;
  text: string;
  upvotes: number;
  answered: boolean;
}
