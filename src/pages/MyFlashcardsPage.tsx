import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { FlashcardList } from '@/components/flashcard/FlashcardList';
import { FlashcardForm } from '@/components/flashcard/FlashcardForm';
import { useFlashcards } from '@/contexts/FlashcardContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Library, Plus, Download, Upload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function MyFlashcardsPage() {
  const {
    flashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    exportFlashcards,
    importFlashcards,
    clearAllFlashcards,
  } = useFlashcards();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = (card: Parameters<typeof addFlashcard>[0]) => {
    addFlashcard(card);
    setIsCreateOpen(false);
    toast({
      title: 'Flashcard criado!',
      description: 'Seu novo flashcard foi adicionado.',
    });
  };

  const handleDelete = (id: string) => {
    deleteFlashcard(id);
    toast({
      title: 'Flashcard excluído',
      description: 'O flashcard foi removido da sua coleção.',
    });
  };

  const handleExport = () => {
    const data = exportFlashcards();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flashcards-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Exportação concluída',
      description: `${flashcards.length} flashcards exportados.`,
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importFlashcards(content);
      if (success) {
        toast({
          title: 'Importação concluída',
          description: 'Flashcards importados com sucesso.',
        });
      } else {
        toast({
          title: 'Erro na importação',
          description: 'O arquivo não contém flashcards válidos.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearAll = () => {
    clearAllFlashcards();
    toast({
      title: 'Coleção limpa',
      description: 'Todos os flashcards foram removidos.',
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Library className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold">
                Meus Flashcards
              </h1>
              <p className="text-muted-foreground">
                {flashcards.length} {flashcards.length === 1 ? 'flashcard' : 'flashcards'} na sua coleção
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={handleImportClick}>
              <Upload className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={flashcards.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            {flashcards.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar todos os flashcards?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Todos os seus flashcards serão
                      permanentemente removidos.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearAll}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Limpar tudo
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Flashcard
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Flashcard</DialogTitle>
                </DialogHeader>
                <FlashcardForm onSubmit={handleCreate} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Empty State */}
        {flashcards.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <Library className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-heading font-semibold mb-2">
              Nenhum flashcard ainda
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Crie seu primeiro flashcard manualmente ou use a IA para gerar uma coleção
              completa sobre qualquer tema.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="gradient" onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar manualmente
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Gerar com IA</a>
              </Button>
            </div>
          </div>
        ) : (
          <FlashcardList
            flashcards={flashcards}
            onUpdate={updateFlashcard}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Layout>
  );
}
