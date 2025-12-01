import { Flashcard } from '@/types/flashcard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, RefreshCw, Check } from 'lucide-react';

interface GeneratedCardsPreviewProps {
  cards: Omit<Flashcard, 'id' | 'createdAt'>[];
  onSaveAll: () => void;
  onRegenerate: () => void;
  isSaved: boolean;
}

export function GeneratedCardsPreview({
  cards,
  onSaveAll,
  onRegenerate,
  isSaved,
}: GeneratedCardsPreviewProps) {
  if (cards.length === 0) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-heading font-semibold">
            {cards.length} flashcards gerados
          </h3>
          <p className="text-sm text-muted-foreground">
            Revise os flashcards antes de salvar
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onRegenerate}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Gerar novamente
          </Button>
          <Button
            variant={isSaved ? 'secondary' : 'accent'}
            onClick={onSaveAll}
            disabled={isSaved}
          >
            {isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Salvos
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar todos
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="animate-slide-up shadow-card"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="pb-2">
              <Badge variant="secondary" className="self-start mb-2">
                {card.tag}
              </Badge>
              <CardTitle className="text-base font-heading leading-snug">
                {card.pergunta}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.resposta}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
