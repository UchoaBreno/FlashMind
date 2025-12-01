export interface Flashcard {
  id: string;
  pergunta: string;
  resposta: string;
  tag: string;
  createdAt: number;
  lastReviewed?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudySession {
  total: number;
  remembered: number;
  needsReinforcement: number;
  cards: {
    id: string;
    remembered: boolean;
  }[];
}

export type FlashcardStyle = 'definition' | 'question' | 'example' | 'analogy';
