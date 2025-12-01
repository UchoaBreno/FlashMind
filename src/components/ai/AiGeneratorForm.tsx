import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { FlashcardStyle } from '@/types/flashcard';

interface AiGeneratorFormProps {
  onGenerate: (topic: string, quantity: number, style: FlashcardStyle) => Promise<void>;
  isLoading: boolean;
}

const styles: { value: FlashcardStyle; label: string }[] = [
  { value: 'definition', label: 'Definição direta' },
  { value: 'question', label: 'Pergunta e resposta' },
  { value: 'example', label: 'Exemplos práticos' },
  { value: 'analogy', label: 'Analogias' },
];

export function AiGeneratorForm({ onGenerate, isLoading }: AiGeneratorFormProps) {
  const [topic, setTopic] = useState('');
  const [quantity, setQuantity] = useState('5');
  const [style, setStyle] = useState<FlashcardStyle>('question');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    await onGenerate(topic.trim(), parseInt(quantity), style);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="topic" className="text-base font-medium">
          Tema do estudo
        </Label>
        <Input
          id="topic"
          placeholder="Ex: Revolução Francesa, Programação em Python, Anatomia Humana..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantidade de flashcards</Label>
          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger id="quantity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 flashcards</SelectItem>
              <SelectItem value="10">10 flashcards</SelectItem>
              <SelectItem value="15">15 flashcards</SelectItem>
              <SelectItem value="20">20 flashcards</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Estilo</Label>
          <Select value={style} onValueChange={(v) => setStyle(v as FlashcardStyle)}>
            <SelectTrigger id="style">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {styles.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="xl"
        className="w-full"
        disabled={isLoading || !topic.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gerando flashcards...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Gerar com IA
          </>
        )}
      </Button>
    </form>
  );
}
