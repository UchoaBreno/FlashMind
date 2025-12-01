import { useState } from 'react';
import { Flashcard } from '@/types/flashcard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FlashcardForm } from './FlashcardForm';
import { Edit, Trash2, Search, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardListProps {
  flashcards: Flashcard[];
  onUpdate: (id: string, card: Partial<Flashcard>) => void;
  onDelete: (id: string) => void;
}

export function FlashcardList({ flashcards, onUpdate, onDelete }: FlashcardListProps) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  const tags = [...new Set(flashcards.map((c) => c.tag))];

  const filtered = flashcards.filter((card) => {
    const matchesSearch =
      card.pergunta.toLowerCase().includes(search.toLowerCase()) ||
      card.resposta.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !selectedTag || card.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const handleEdit = (card: Omit<Flashcard, 'id' | 'createdAt'>) => {
    if (editingCard) {
      onUpdate(editingCard.id, card);
      setEditingCard(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar flashcards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={!selectedTag ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedTag(null)}
          >
            Todos ({flashcards.length})
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag)}
            >
              {tag} ({flashcards.filter((c) => c.tag === tag).length})
            </Badge>
          ))}
        </div>
      )}

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Nenhum flashcard encontrado.</p>
        </div>
      ) : (
        <div
          className={cn(
            viewMode === 'grid'
              ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
              : 'space-y-3'
          )}
        >
          {filtered.map((card, index) => (
            <Card
              key={card.id}
              className="group animate-slide-up shadow-card hover:shadow-card-hover transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {card.tag}
                  </Badge>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingCard(card)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Flashcard</DialogTitle>
                        </DialogHeader>
                        <FlashcardForm
                          initialData={card}
                          onSubmit={handleEdit}
                          submitLabel="Salvar alterações"
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete(card.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-base font-heading line-clamp-2">
                  {card.pergunta}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {card.resposta}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
