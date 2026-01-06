import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SaveableContentProps {
  children: React.ReactNode;
  contentType:
    | "video"
    | "tip"
    | "flashcard"
    | "link"
    | "chart"
    | "table"
    | "image";
  contentData: {
    title: string;
    content: string;
    lessonId: string;
    lessonTitle: string;
  };
  onSave?: (data: any) => void;
}

export function SaveableContent({
  children,
  contentType,
  contentData,
  onSave,
}: SaveableContentProps) {
  const { toast } = useToast();

  const handleSave = () => {
    const savedItem = {
      id: Date.now().toString(),
      type: contentType,
      title: contentData.title,
      content: contentData.content,
      lessonId: contentData.lessonId,
      lessonTitle: contentData.lessonTitle,
      timestamp: new Date().toISOString(),
    };

    // Get existing saved content
    const existingSaved = JSON.parse(
      localStorage.getItem("saved-content") || "[]"
    );

    // Check if already saved
    const alreadySaved = existingSaved.some(
      (item: any) =>
        item.content === contentData.content && item.type === contentType
    );

    if (alreadySaved) {
      toast({
        title: "Already saved",
        description: "This content is already in your saved items.",
      });
      return;
    }

    // Add to saved content
    const updatedSaved = [...existingSaved, savedItem];
    localStorage.setItem("saved-content", JSON.stringify(updatedSaved));

    if (onSave) {
      onSave(savedItem);
    }

    toast({
      title: "Content saved",
      description: `${contentType} has been saved to your collection.`,
    });
  };

  return (
    <div className="relative group">
      {children}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 hover:bg-background border border-border h-8 w-8 p-0"
        title={`Save ${contentType}`}
      >
        <Save className="h-3 w-3" />
      </Button>
    </div>
  );
}
