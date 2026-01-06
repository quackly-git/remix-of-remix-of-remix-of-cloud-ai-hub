import { useState } from "react";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FlashcardSettings } from "@/pages/Flashcards";
import type { Flashcard } from "@/pages/Flashcards";

interface FlashcardComponentProps {
  flashcard: Flashcard;
  settings: FlashcardSettings;
  isEditing: boolean;
  onEdit: (id: string, front: string, back: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  showDelete: boolean;
}

export const FlashcardComponent = ({
  flashcard,
  settings,
  isEditing,
  onEdit,
  onDelete,
  onStartEdit,
  onCancelEdit,
  showDelete,
}: FlashcardComponentProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [editFront, setEditFront] = useState(flashcard.front);
  const [editBack, setEditBack] = useState(flashcard.back);

  const handleFlip = (e: React.MouseEvent) => {
    if (!isEditing && !(e.target as HTMLElement).closest("button")) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleSave = () => {
    onEdit(flashcard.id, editFront, editBack);
  };

  const handleCancel = () => {
    setEditFront(flashcard.front);
    setEditBack(flashcard.back);
    onCancelEdit();
  };

  const fontFamilyClass = `font-${settings.fontFamily}`;

  return (
    <div className="relative w-full h-full perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          !isEditing ? "cursor-pointer" : ""
        } ${isFlipped ? "rotate-y-180" : ""}`}
        onClick={handleFlip}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute w-full h-full backface-hidden shadow-xl ${fontFamilyClass}`}
          style={{
            backgroundColor: settings.backgroundColor,
            color: settings.textColor,
            borderRadius: `${settings.borderRadius}px`,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="relative w-full h-full p-6 flex flex-col">
            {settings.showEditButton && (
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {!isEditing ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartEdit();
                      }}
                      className="h-8 w-8 bg-background/80 hover:bg-background"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {showDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(flashcard.id);
                        }}
                        className="h-8 w-8 bg-background/80 hover:bg-background text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave();
                      }}
                      className="h-8 w-8 bg-background/80 hover:bg-background text-green-500"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel();
                      }}
                      className="h-8 w-8 bg-background/80 hover:bg-background"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            )}

            <Badge className="mb-4 w-fit">{flashcard.lesson}</Badge>

            <div className="flex-1 flex items-center justify-center">
              {isEditing ? (
                <Textarea
                  value={editFront}
                  onChange={(e) => setEditFront(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xl font-semibold text-center resize-none border-2 border-primary/50 focus:border-primary min-h-[120px]"
                  style={{
                    backgroundColor: settings.backgroundColor,
                    color: settings.textColor,
                    fontSize: `${settings.fontSize + 4}px`,
                  }}
                />
              ) : (
                <p
                  className="text-xl font-semibold text-center break-words"
                  style={{ fontSize: `${settings.fontSize + 4}px` }}
                >
                  {flashcard.front}
                </p>
              )}
            </div>

            <p className="text-sm opacity-60 text-center mt-4">Click to flip</p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute w-full h-full backface-hidden shadow-xl rotate-y-180 ${fontFamilyClass}`}
          style={{
            backgroundColor: settings.backgroundColor,
            color: settings.textColor,
            borderRadius: `${settings.borderRadius}px`,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-full p-6 flex flex-col">
            <Badge className="mb-4 w-fit">{flashcard.lesson}</Badge>

            <div className="flex-1 flex items-center justify-center">
              {isEditing ? (
                <Textarea
                  value={editBack}
                  onChange={(e) => setEditBack(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="text-lg text-center resize-none border-2 border-primary/50 focus:border-primary min-h-[120px]"
                  style={{
                    backgroundColor: settings.backgroundColor,
                    color: settings.textColor,
                    fontSize: `${settings.fontSize}px`,
                  }}
                />
              ) : (
                <p
                  className="text-lg text-center"
                  style={{ fontSize: `${settings.fontSize}px` }}
                >
                  {flashcard.back}
                </p>
              )}
            </div>

            <p className="text-sm opacity-60 text-center mt-4">Click to flip</p>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
