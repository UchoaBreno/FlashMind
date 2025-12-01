import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Flashcard, StudySession } from '@/types/flashcard';

interface FlashcardContextType {
  flashcards: Flashcard[];
  addFlashcard: (card: Omit<Flashcard, 'id' | 'createdAt'>) => void;
  addMultipleFlashcards: (cards: Omit<Flashcard, 'id' | 'createdAt'>[]) => void;
  updateFlashcard: (id: string, card: Partial<Flashcard>) => void;
  deleteFlashcard: (id: string) => void;
  exportFlashcards: () => string;
  importFlashcards: (json: string) => boolean;
  clearAllFlashcards: () => void;
}

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

const STORAGE_KEY = 'flashcards-app-data';

function loadFlashcards(): Flashcard[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveFlashcards(cards: Flashcard[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function FlashcardProvider({ children }: { children: ReactNode }) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    setFlashcards(loadFlashcards());
  }, []);

  useEffect(() => {
    saveFlashcards(flashcards);
  }, [flashcards]);

  const addFlashcard = (card: Omit<Flashcard, 'id' | 'createdAt'>) => {
    const newCard: Flashcard = {
      ...card,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setFlashcards((prev) => [newCard, ...prev]);
  };

  const addMultipleFlashcards = (cards: Omit<Flashcard, 'id' | 'createdAt'>[]) => {
    const newCards: Flashcard[] = cards.map((card) => ({
      ...card,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }));
    setFlashcards((prev) => [...newCards, ...prev]);
  };

  const updateFlashcard = (id: string, updates: Partial<Flashcard>) => {
    setFlashcards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const deleteFlashcard = (id: string) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  const exportFlashcards = (): string => {
    return JSON.stringify(flashcards, null, 2);
  };

  const importFlashcards = (json: string): boolean => {
    try {
      const imported = JSON.parse(json);
      if (!Array.isArray(imported)) return false;
      
      const validCards = imported.filter(
        (card: any) => card.pergunta && card.resposta
      ).map((card: any) => ({
        id: card.id || crypto.randomUUID(),
        pergunta: card.pergunta,
        resposta: card.resposta,
        tag: card.tag || 'importado',
        createdAt: card.createdAt || Date.now(),
        lastReviewed: card.lastReviewed,
        difficulty: card.difficulty,
      }));
      
      setFlashcards((prev) => [...validCards, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  const clearAllFlashcards = () => {
    setFlashcards([]);
  };

  return (
    <FlashcardContext.Provider
      value={{
        flashcards,
        addFlashcard,
        addMultipleFlashcards,
        updateFlashcard,
        deleteFlashcard,
        exportFlashcards,
        importFlashcards,
        clearAllFlashcards,
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
}

export function useFlashcards() {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcards must be used within FlashcardProvider');
  }
  return context;
}
