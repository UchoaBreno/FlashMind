import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AiGeneratorForm } from '@/components/ai/AiGeneratorForm';
import { GeneratedCardsPreview } from '@/components/ai/GeneratedCardsPreview';
import { useFlashcards } from '@/contexts/FlashcardContext';
import { generateFlashcards } from '@/services/ai';
import { FlashcardStyle, Flashcard } from '@/types/flashcard';
import { Sparkles, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<Omit<Flashcard, 'id' | 'createdAt'>[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [lastTopic, setLastTopic] = useState('');
  const [lastQuantity, setLastQuantity] = useState(5);
  const [lastStyle, setLastStyle] = useState<FlashcardStyle>('question');
  const { addMultipleFlashcards } = useFlashcards();
  const { toast } = useToast();

  const handleGenerate = async (topic: string, quantity: number, style: FlashcardStyle) => {
    setIsLoading(true);
    setIsSaved(false);
    setLastTopic(topic);
    setLastQuantity(quantity);
    setLastStyle(style);

    try {
      const cards = await generateFlashcards(topic, quantity, style);
      setGeneratedCards(cards);
      toast({
        title: 'Flashcards gerados!',
        description: `${cards.length} flashcards sobre "${topic}" foram criados.`,
      });
    } catch (error) {
      toast({
        title: 'Erro ao gerar',
        description: 'Não foi possível gerar os flashcards. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAll = () => {
    addMultipleFlashcards(generatedCards);
    setIsSaved(true);
    toast({
      title: 'Salvos com sucesso!',
      description: `${generatedCards.length} flashcards foram adicionados à sua coleção.`,
    });
  };

  const handleRegenerate = () => {
    if (lastTopic) {
      handleGenerate(lastTopic, lastQuantity, lastStyle);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-primary shadow-glow mx-auto">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Gerar Flashcards com IA
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Digite o tema que deseja estudar e deixe a inteligência artificial criar
            flashcards otimizados para memorização.
          </p>
        </div>

        {/* Generator Form */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
          <AiGeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-muted animate-pulse-soft"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        )}

        {/* Generated Cards Preview */}
        {!isLoading && generatedCards.length > 0 && (
          <GeneratedCardsPreview
            cards={generatedCards}
            onSaveAll={handleSaveAll}
            onRegenerate={handleRegenerate}
            isSaved={isSaved}
          />
        )}

        {/* Tips */}
        {!isLoading && generatedCards.length === 0 && (
          <div className="bg-secondary/50 rounded-2xl p-6 flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-2">Dicas para melhores resultados</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Seja específico no tema (ex: "Funções em Python" ao invés de "Python")</li>
                <li>• Escolha o estilo que melhor se adapta ao conteúdo</li>
                <li>• Comece com menos flashcards e adicione mais depois</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
