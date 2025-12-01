import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FlashcardProvider } from "@/contexts/FlashcardContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import MyFlashcardsPage from "./pages/MyFlashcardsPage";
import StudyPage from "./pages/StudyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <FlashcardProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/flashcards" element={<MyFlashcardsPage />} />
              <Route path="/study" element={<StudyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FlashcardProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
