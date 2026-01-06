import { useState } from 'react';
import EmojiPickerReact, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KawaiiMascot, kawaiiCharacters, KawaiiCharacter } from "./KawaiiMascot";
import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AvatarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
  onSelectKawaii: (character: KawaiiCharacter) => void;
  currentEmoji?: string | null;
  currentKawaii?: string | null;
}

export const AvatarPicker = ({ 
  isOpen, 
  onClose, 
  onSelectEmoji, 
  onSelectKawaii,
  currentEmoji,
  currentKawaii
}: AvatarPickerProps) => {
  const [selectedTab, setSelectedTab] = useState<'emoji' | 'kawaii'>('emoji');

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onSelectEmoji(emojiData.emoji);
    onClose();
  };

  const handleKawaiiClick = (character: KawaiiCharacter) => {
    onSelectKawaii(character);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Avatar</DialogTitle>
        </DialogHeader>
        
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'emoji' | 'kawaii')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="emoji">Emoji</TabsTrigger>
            <TabsTrigger value="kawaii">Kawaii</TabsTrigger>
          </TabsList>
          
          <TabsContent value="emoji" className="mt-4">
            <EmojiPickerReact
              onEmojiClick={handleEmojiClick}
              theme={Theme.AUTO}
              width="100%"
              height={350}
            />
          </TabsContent>
          
          <TabsContent value="kawaii" className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {kawaiiCharacters.map((character) => (
                <button
                  key={character}
                  onClick={() => handleKawaiiClick(character)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105
                    ${currentKawaii === character ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
                >
                  <KawaiiMascot character={character} size={60} mood="happy" />
                  <p className="text-xs text-center mt-2 capitalize">{character}</p>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Inline emoji picker button for posts/comments
interface EmojiPickerButtonProps {
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPickerButton = ({ onEmojiSelect }: EmojiPickerButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Smile className="h-4 w-4 mr-2" />
          Emoji
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <EmojiPickerReact
          onEmojiClick={handleEmojiClick}
          theme={Theme.AUTO}
          width={300}
          height={350}
        />
      </PopoverContent>
    </Popover>
  );
};
