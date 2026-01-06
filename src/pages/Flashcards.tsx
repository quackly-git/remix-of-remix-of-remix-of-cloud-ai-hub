import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Settings,
  Maximize,
  Grid3x3,
  Play,
  ArrowLeftIcon,
  FlagTriangleLeft,
  ChevronLeft,
  ChevronRight,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlashcardComponent } from "@/components/FlashcardComponent";
import { FlashcardSettingsModal } from "@/components/FlashcardSettingsModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import ThemeControls from "@/components/ThemeControls";
import { defaultFlashcards } from "@/data/flashcards";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  lesson: string;
}

export interface FlashcardSettings {
  borderRadius: number;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  showModalOnClick: boolean;
  showEditButton: boolean;
}

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [settings, setSettings] = useState<FlashcardSettings>({
    borderRadius: 16,
    backgroundColor:
      "color-mix(in srgb, hsl(var(--primary)) 15%, hsl(var(--background)))",
    textColor: "foreground",
    fontFamily: "sora",
    fontSize: 16,
    showModalOnClick: false,
    showEditButton: false,
  });
  const [viewMode, setViewMode] = useState<"grid" | "play" | "fullscreen">(
    "grid"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [lessonFilter, setLessonFilter] = useState<string>("all");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalFlashcard, setModalFlashcard] = useState<Flashcard | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({
    front: "",
    back: "",
    lesson: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("flashcards-data");
    const storedSettings = localStorage.getItem("flashcard-settings");

    // setFlashcards(defaultFlashcards);

    if (stored) {
      setFlashcards(JSON.parse(stored));
    } else {
      setFlashcards(defaultFlashcards);
    }

    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    if (flashcards.length > 0) {
      localStorage.setItem("flashcards-data", JSON.stringify(flashcards));
    }
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem("flashcard-settings", JSON.stringify(settings));
  }, [settings]);

  const filteredFlashcards = flashcards.filter((card) => {
    const matchesSearch =
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLesson =
      lessonFilter === "all" || card.lesson === lessonFilter;
    return matchesSearch && matchesLesson;
  });

  const lessons = Array.from(new Set(flashcards.map((card) => card.lesson)));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === "fullscreen" || viewMode === "play") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, filteredFlashcards.length, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredFlashcards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length
    );
  };

  const handleEdit = (id: string, front: string, back: string) => {
    setFlashcards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, front, back } : card))
    );
    setEditingId(null);
  };

  const handleAdd = () => {
    if (newFlashcard.front && newFlashcard.back && newFlashcard.lesson) {
      const newCard: Flashcard = {
        id: Date.now().toString(),
        ...newFlashcard,
      };
      setFlashcards((prev) => [...prev, newCard]);
      setNewFlashcard({ front: "", back: "", lesson: "" });
      setShowAddDialog(false);
    }
  };

  const handleDelete = (id: string) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  const isCustomFlashcard = (id: string) => {
    return !defaultFlashcards.some((card) => card.id === id);
  };

  if (viewMode === "fullscreen" && filteredFlashcards.length > 0) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => setViewMode("grid")}
        >
          <Minimize className="h-5 w-5" />
        </Button>
        <div className="w-full max-w-5xl flex-1 flex flex-col justify-center">
          <div className="h-[70vh]">
            <FlashcardComponent
              key={filteredFlashcards[currentIndex].id}
              flashcard={filteredFlashcards[currentIndex]}
              settings={settings}
              isEditing={editingId === filteredFlashcards[currentIndex].id}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStartEdit={() =>
                setEditingId(filteredFlashcards[currentIndex].id)
              }
              onCancelEdit={() => setEditingId(null)}
              showDelete={isCustomFlashcard(
                filteredFlashcards[currentIndex].id
              )}
            />
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button onClick={handlePrev}>
              <ChevronLeft />
            </Button>
            <span className="text-muted-foreground">
              {currentIndex + 1} / {filteredFlashcards.length}
            </span>
            <Button onClick={handleNext}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "play" && filteredFlashcards.length > 0) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Play Mode</h1>
            <Button variant="outline" onClick={() => setViewMode("grid")}>
              Exit Play Mode
            </Button>
          </div>

          <div className="h-[60vh] min-h-[400px]">
            <FlashcardComponent
              key={filteredFlashcards[currentIndex].id}
              flashcard={filteredFlashcards[currentIndex]}
              settings={settings}
              isEditing={false}
              onEdit={() => {}}
              onDelete={() => {}}
              onStartEdit={() => {}}
              onCancelEdit={() => {}}
              showDelete={false}
            />
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button onClick={handlePrev}>
              <ChevronLeft />
            </Button>
            <span className="text-muted-foreground">
              {currentIndex + 1} / {filteredFlashcards.length}
            </span>
            <Button onClick={handleNext}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {" "}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Link to="/notes">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Flashcards</h1>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-start sm:justify-end">
            <ThemeControls />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("play")}
            >
              <Play className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("fullscreen")}
            >
              <Maximize className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Flashcard
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flashcards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={lessonFilter} onValueChange={setLessonFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by lesson" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tags</SelectItem>
              {lessons.map((lesson) => (
                <SelectItem key={lesson} value={lesson}>
                  {lesson}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFlashcards.map((flashcard) => (
            <div
              key={flashcard.id}
              onClick={() =>
                settings.showModalOnClick && setModalFlashcard(flashcard)
              }
              className={`min-h-[320px] min-w-[250px] ${
                settings.showModalOnClick ? "cursor-pointer" : ""
              }`}
            >
              <FlashcardComponent
                key={flashcard.id}
                flashcard={flashcard}
                settings={settings}
                isEditing={editingId === flashcard.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStartEdit={() => setEditingId(flashcard.id)}
                onCancelEdit={() => setEditingId(null)}
                showDelete={isCustomFlashcard(flashcard.id)}
              />
            </div>
          ))}
        </div>
        <FlashcardSettingsModal
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          settings={settings}
          onSettingsChange={setSettings}
        />
        <Dialog
          open={!!modalFlashcard}
          onOpenChange={(open) => !open && setModalFlashcard(null)}
        >
          <DialogContent className="max-w-4xl">
            {modalFlashcard && (
              <div className="min-h-[400px] min-w-[300px]">
                <FlashcardComponent
                  flashcard={modalFlashcard}
                  settings={settings}
                  isEditing={false}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onStartEdit={() => {}}
                  onCancelEdit={() => {}}
                  showDelete={false}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <h2 className="text-2xl font-bold mb-4">Add New Flashcard</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Front</label>
                <Input
                  placeholder="Question or term"
                  value={newFlashcard.front}
                  onChange={(e) =>
                    setNewFlashcard((prev) => ({
                      ...prev,
                      front: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Back</label>
                <Input
                  placeholder="Answer or definition"
                  value={newFlashcard.back}
                  onChange={(e) =>
                    setNewFlashcard((prev) => ({
                      ...prev,
                      back: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tag</label>
                <Select
                  value={newFlashcard.lesson}
                  onValueChange={(value) =>
                    setNewFlashcard((prev) => ({ ...prev, tag: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons.map((lesson) => (
                      <SelectItem key={lesson} value={lesson}>
                        {lesson}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add Flashcard</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
