import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StudyMode } from '@/components/study/StudyMode';
import { useFlashcards } from '@/contexts/FlashcardContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Shuffle, Play, Library } from 'lucide-react';
import { StudySession } from '@/types/flashcard';

export default function StudyPage() {
  const { flashcards, updateFlashcard } = useFlashcards();
  const [isStudying, setIsStudying] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [shuffled, setShuffled] = useState(false);

  const tags = useMemo(() => [...new Set(flashcards.map((c) => c.tag))], [flashcards]);

  const studyCards = useMemo(() => {
    let cards = selectedTag
      ? flashcards.filter((c) => c.tag === selectedTag)
      : flashcards;

    if (shuffled) {
      cards = [...cards].sort(() => Math.random() - 0.5);
    }

    return cards;
  }, [flashcards, selectedTag, shuffled]);

  const handleComplete = (session: StudySession) => {
    // Update last reviewed timestamp for studied cards
    session.cards.forEach(({ id, remembered }) => {
      updateFlashcard(id, {
        lastReviewed: Date.now(),
        difficulty: remembered ? 'easy' : 'hard',
      });
    });
  };

  const handleStartStudy = () => {
    setIsStudying(true);
  };

  const handleBack = () => {
    setIsStudying(false);
  };

  if (flashcards.length === 0) {
    return (
      <Layout>
        <div className="text-center py-16 px-4">
          <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold mb-2">
            Nenhum flashcard para estudar
          </h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Adicione flashcards à sua coleção para começar a estudar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="gradient" asChild>
              <a href="/">Gerar com IA</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/flashcards">
                <Library className="mr-2 h-4 w-4" />
                Minha coleção
              </a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isStudying) {
    return (
      <Layout>
        <div className="space-y-6">
          <Button variant="ghost" onClick={handleBack}>
            ← Voltar para seleção
          </Button>
          <StudyMode flashcards={studyCards} onComplete={handleComplete} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-primary shadow-glow mx-auto">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Modo de Estudo
          </h1>
          <p className="text-muted-foreground">
            Revise seus flashcards e teste sua memória
          </p>
        </div>

        {/* Settings Card */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-6">
          {/* Tag Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Filtrar por tag</label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!selectedTag ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedTag(null)}
              >
                Todos ({flashcards.length})
              </Badge>
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag} ({flashcards.filter((c) => c.tag === tag).length})
                </Badge>
              ))}
            </div>
          </div>

          {/* Shuffle Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <Shuffle className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Embaralhar cards</p>
                <p className="text-sm text-muted-foreground">
                  Ordem aleatória para melhor memorização
                </p>
              </div>
            </div>
            <Button
              variant={shuffled ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShuffled(!shuffled)}
            >
              {shuffled ? 'Ativado' : 'Desativado'}
            </Button>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-center">
              <span className="text-2xl font-bold text-primary">{studyCards.length}</span>
              <span className="text-muted-foreground ml-2">
                {studyCards.length === 1 ? 'flashcard selecionado' : 'flashcards selecionados'}
              </span>
            </p>
          </div>

          {/* Start Button */}
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            onClick={handleStartStudy}
            disabled={studyCards.length === 0}
          >
            <Play className="mr-2 h-5 w-5" />
            Começar Estudo
          </Button>
        </div>
      </div>
    </Layout>
  );
}
