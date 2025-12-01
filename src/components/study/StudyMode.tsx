import { useState, useEffect } from 'react';
import { Flashcard, StudySession } from '@/types/flashcard';
import { FlashcardDisplay } from '@/components/flashcard/FlashcardDisplay';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, RotateCcw, Trophy, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudyModeProps {
  flashcards: Flashcard[];
  onComplete: (session: StudySession) => void;
}

export function StudyMode({ flashcards, onComplete }: StudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [session, setSession] = useState<StudySession>({
    total: flashcards.length,
    remembered: 0,
    needsReinforcement: 0,
    cards: [],
  });
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex) / flashcards.length) * 100;

  const handleAnswer = (remembered: boolean) => {
    const newSession = {
      ...session,
      remembered: session.remembered + (remembered ? 1 : 0),
      needsReinforcement: session.needsReinforcement + (remembered ? 0 : 1),
      cards: [...session.cards, { id: currentCard.id, remembered }],
    };
    setSession(newSession);

    if (currentIndex + 1 >= flashcards.length) {
      setIsComplete(true);
      onComplete(newSession);
    } else {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setIsComplete(false);
    setSession({
      total: flashcards.length,
      remembered: 0,
      needsReinforcement: 0,
      cards: [],
    });
  };

  if (isComplete) {
    const percentage = Math.round((session.remembered / session.total) * 100);
    const isGood = percentage >= 70;

    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
        <Card className="w-full max-w-md text-center shadow-card-hover">
          <CardHeader>
            <div
              className={cn(
                'mx-auto mb-4 h-20 w-20 rounded-full flex items-center justify-center',
                isGood ? 'bg-accent/20' : 'bg-muted'
              )}
            >
              {isGood ? (
                <Trophy className="h-10 w-10 text-accent" />
              ) : (
                <Brain className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <CardTitle className="text-2xl font-heading">
              {isGood ? 'Excelente!' : 'Continue praticando!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-5xl font-heading font-bold text-primary">
              {percentage}%
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-accent/10">
                <div className="text-2xl font-bold text-accent">{session.remembered}</div>
                <div className="text-muted-foreground">Lembrados</div>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10">
                <div className="text-2xl font-bold text-destructive">
                  {session.needsReinforcement}
                </div>
                <div className="text-muted-foreground">Para reforçar</div>
              </div>
            </div>
            <Button onClick={handleRestart} variant="gradient" size="lg" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Estudar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Progress */}
      <div className="w-full max-w-lg space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progresso</span>
          <span>
            {currentIndex + 1} de {flashcards.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Card */}
      <FlashcardDisplay
        card={currentCard}
        showAnswer={showAnswer}
        onFlip={() => setShowAnswer(!showAnswer)}
      />

      {/* Actions */}
      <div className="flex gap-4">
        {!showAnswer ? (
          <Button
            variant="gradient"
            size="lg"
            onClick={() => setShowAnswer(true)}
            className="min-w-[200px]"
          >
            Mostrar Resposta
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleAnswer(false)}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="mr-2 h-4 w-4" />
              Preciso reforçar
            </Button>
            <Button
              variant="accent"
              size="lg"
              onClick={() => handleAnswer(true)}
            >
              <Check className="mr-2 h-4 w-4" />
              Lembrei!
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
