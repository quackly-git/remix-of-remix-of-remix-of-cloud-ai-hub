import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
  title?: string;
  className?: string;
}

export function Flashcards({ cards, title, className = "" }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setCompletedCards((prev) => new Set(prev).add(currentIndex));
    }
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedCards(new Set());
  };

  if (!cards || cards.length === 0) {
    return (
      <div
        className={`bg-muted/30 border rounded-lg p-6 text-center ${className}`}
      >
        <p className="text-muted-foreground">No flashcards available</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-br from-primary/5 to-primary/10 border rounded-lg p-6 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-primary">{title}</h4>
          <Badge variant="secondary" className="whitespace-nowrap">
            {currentIndex + 1} of {cards.length}
          </Badge>
        </div>
      )}

      <div className="space-y-4">
        {/* Card */}
        <div className="relative h-64 cursor-pointer" onClick={flipCard}>
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 w-full h-full bg-white dark:bg-card border-2 border-primary/20 rounded-lg p-6 flex items-center justify-center text-center backface-hidden">
              <div>
                <div className="text-xs text-muted-foreground mb-2 flex items-center justify-center gap-1">
                  <Eye className="h-3 w-3" />
                  Question
                </div>
                <p className="text-lg font-medium">{currentCard.front}</p>
                <p className="text-xs text-muted-foreground mt-4">
                  Click to reveal answer
                </p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 w-full h-full bg-primary/5 dark:bg-primary/10 border-2 border-primary/30 rounded-lg p-6 flex items-center justify-center text-center backface-hidden rotate-y-180">
              <div>
                <div className="text-xs text-primary mb-2 flex items-center justify-center gap-1">
                  <EyeOff className="h-3 w-3" />
                  Answer
                </div>
                <p className="text-lg font-medium text-primary">
                  {currentCard.back}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Click to see question
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedCards.size / cards.length) * 100}%` }}
          />
        </div>

        {/* Controls */}
        {/* Controls */}
        <div className="space-y-2">
          {/* Top row: Centered Reset and Reveal */}
          <div className="flex justify-center gap-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetProgress}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            <Button
              variant={isFlipped ? "default" : "outline"}
              size="sm"
              onClick={flipCard}
              className="gap-2"
            >
              {isFlipped ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {isFlipped ? "Hide" : "Reveal"}
            </Button>
          </div>

          {/* Bottom row: Prev left, Next right */}
          <div className="flex justify-between flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={prevCard}
              disabled={currentIndex === 0}
              className="gap-2 flex-shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={nextCard}
              disabled={currentIndex === cards.length - 1}
              className="gap-2 flex-shrink-0"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Progress: {completedCards.size}/{cards.length} cards reviewed
        </div>
      </div>
    </div>
  );
}
