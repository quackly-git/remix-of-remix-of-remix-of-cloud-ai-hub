import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StyleProvider } from "./contexts/StyleContext";
import { DiscussionAuthProvider } from "./contexts/DiscussionAuthContext";
import Index from "./pages/Index";
import Checklist from "./pages/Checklist";
import PastPapersChecklist from "./pages/PastPapersChecklist";
import Threads from "./pages/Threads";
import Community from "./pages/Community";
import ThreadDetail from "./pages/ThreadDetail";
import NotFound from "./pages/NotFound";
import NoOldSyllabus from "./pages/NoOldSyllabus";
import Planner from "./pages/Timer";
import ResultsTimer from "./pages/ResultsTimer";
import NotesRouter from "./pages/NotesRouter";
import { ThemeProviderer } from "./hooks/useTheme";
import CrispChat from "./components/CrispChat";
import Chat from "./pages/Chat";
import Whatsapp from "./pages/Whatsapp";
import KeywordsLibrary from "./pages/KeywordsLibrary";
import Flashcards from "./pages/Flashcards";
import Game from "./pages/Game";
import DiscussionsLayout from "./pages/discussions/DiscussionsLayout";
import DiscussionsHome from "./pages/discussions/DiscussionsHome";
import DiscussionsLeaderboard from "./pages/discussions/DiscussionsLeaderboard";
import DiscussionsSettings from "./pages/discussions/DiscussionsSettings";
import PublicProfile from "./pages/discussions/PublicProfile";
import PaperThread from "./pages/discussions/PaperThread";
import PostDetail from "./pages/discussions/PostDetail";
import { DraftsManager } from "./pages/discussions/DraftsManager";
import UniversityThread from "./pages/discussions/UniversityThread";
import CustomThread from "./pages/discussions/CustomThread";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ThemeProviderer>
        <StyleProvider>
          <DiscussionAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <CrispChat />

              <BrowserRouter>
                <Routes>
                  <Route path="/notes/*" element={<NotesRouter />} />
                  <Route path="/" element={<Index />} />
                  <Route path="/checklist" element={<Checklist />} />
                  <Route path="/timer" element={<Planner />} />
                  <Route path="/timer/results" element={<ResultsTimer />} />
                  <Route path="/no-old-syllabus" element={<NoOldSyllabus />} />
                  <Route
                    path="/pastpapers-checklist"
                    element={<PastPapersChecklist />}
                  />
                  <Route
                    path="/keywords-library"
                    element={<KeywordsLibrary />}
                  />
                  <Route path="/flashcards" element={<Flashcards />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/whatsapp" element={<Whatsapp />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/threads" element={<Threads />} />
                  <Route path="/threads/:slug" element={<ThreadDetail />} />
                  <Route path="/community/:slug" element={<Community />} />
                  
                  {/* Discussion Routes */}
                  <Route path="/discussions" element={<DiscussionsLayout />}>
                    <Route index element={<DiscussionsHome />} />
                    <Route path="leaderboard" element={<DiscussionsLeaderboard />} />
                    <Route path="settings" element={<DiscussionsSettings />} />
                    <Route path="drafts" element={<DraftsManager />} />
                  </Route>
                  
                  {/* Paper Thread Routes */}
                  <Route path="/discussion/:paperId" element={<DiscussionsLayout />}>
                    <Route index element={<PaperThread />} />
                  </Route>
                  <Route path="/discussion/:paperId/post/:postId" element={<DiscussionsLayout />}>
                    <Route index element={<PostDetail />} />
                  </Route>
                  
                  {/* University Thread Routes */}
                  <Route path="/discussions/universities/:slug" element={<DiscussionsLayout />}>
                    <Route index element={<UniversityThread />} />
                  </Route>
                  
                  {/* Custom Discussion Routes */}
                  <Route path="/discussion/:slug" element={<DiscussionsLayout />}>
                    <Route index element={<CustomThread />} />
                  </Route>
                  
                  <Route path="/p/:username" element={<PublicProfile />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </DiscussionAuthProvider>
        </StyleProvider>
      </ThemeProviderer>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
