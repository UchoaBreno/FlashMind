import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Save } from 'lucide-react';
import { Flashcard } from '@/types/flashcard';

interface FlashcardFormProps {
  onSubmit: (card: Omit<Flashcard, 'id' | 'createdAt'>) => void;
  initialData?: Partial<Flashcard>;
  submitLabel?: string;
}

export function FlashcardForm({ onSubmit, initialData, submitLabel = 'Criar Flashcard' }: FlashcardFormProps) {
  const [pergunta, setPergunta] = useState(initialData?.pergunta || '');
  const [resposta, setResposta] = useState(initialData?.resposta || '');
  const [tag, setTag] = useState(initialData?.tag || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pergunta.trim() || !resposta.trim()) return;

    onSubmit({
      pergunta: pergunta.trim(),
      resposta: resposta.trim(),
      tag: tag.trim() || 'geral',
    });

    if (!initialData) {
      setPergunta('');
      setResposta('');
      setTag('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pergunta">Pergunta</Label>
        <Textarea
          id="pergunta"
          placeholder="Digite a pergunta ou conceito..."
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          className="min-h-[80px] resize-none"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resposta">Resposta</Label>
        <Textarea
          id="resposta"
          placeholder="Digite a resposta ou definição..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          className="min-h-[100px] resize-none"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tag">Tag (opcional)</Label>
        <Input
          id="tag"
          placeholder="Ex: matemática, história, programação..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        {initialData ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
        {submitLabel}
      </Button>
    </form>
  );
}
