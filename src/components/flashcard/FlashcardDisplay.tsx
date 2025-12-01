import { useState } from 'react';
import { Flashcard } from '@/types/flashcard';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface FlashcardDisplayProps {
  card: Flashcard;
  showAnswer?: boolean;
  onFlip?: () => void;
  className?: string;
}

export function FlashcardDisplay({ card, showAnswer = false, onFlip, className }: FlashcardDisplayProps) {
  const [isFlipped, setIsFlipped] = useState(showAnswer);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <div
      className={cn('flashcard-flip w-full max-w-lg cursor-pointer', className)}
      onClick={handleClick}
    >
      <div
        className={cn(
          'flashcard-inner relative h-64 w-full',
          isFlipped && 'flipped'
        )}
      >
        {/* Front */}
        <div className="flashcard-front absolute inset-0 flex flex-col rounded-2xl bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
          <Badge variant="secondary" className="self-start mb-4">
            {card.tag}
          </Badge>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl font-heading font-medium text-center text-balance leading-relaxed">
              {card.pergunta}
            </p>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Clique para ver a resposta
          </p>
        </div>

        {/* Back */}
        <div className="flashcard-back absolute inset-0 flex flex-col rounded-2xl bg-gradient-primary p-6 shadow-card-hover">
          <Badge className="self-start mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
            Resposta
          </Badge>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg font-body text-center text-balance leading-relaxed text-primary-foreground">
              {card.resposta}
            </p>
          </div>
          <p className="text-sm text-primary-foreground/70 text-center mt-4">
            Clique para ver a pergunta
          </p>
        </div>
      </div>
    </div>
  );
}
