import { useState } from "react";
import { Bookmark, BookmarkMinus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface BookmarkedLesson {
  id: string;
  lessonId: string;
  lessonTitle: string;
  chapterTitle: string;
  chapterId: string; // Add chapterId for navigation
  subjectName: string;
  subjectId: string;
  dateBookmarked: string;
}

interface BookmarksManagerProps {
  onNavigateToLesson?: (subjectId: string, lessonId: string) => void;
}

export function BookmarksManager({
  onNavigateToLesson,
}: BookmarksManagerProps) {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkedLesson[]>(
    "bookmarked-lessons",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const removeBookmark = (bookmarkId: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
  };

  const handleNavigateToLesson = (bookmark: BookmarkedLesson) => {
    if (onNavigateToLesson) {
      onNavigateToLesson(bookmark.subjectId, bookmark.lessonId);
      setIsOpen(false); // Close dialog after navigation
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 relative">
          <Star className="h-4 w-4" />
          <span className="hidden sm:inline">Bookmarks</span>
          {bookmarks.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {bookmarks.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bookmarked Lessons</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No bookmarked lessons yet</p>
              <p className="text-sm">
                Bookmark lessons to quickly access them later
              </p>
            </div>
          ) : (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">
                    {bookmark.lessonTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {bookmark.chapterTitle}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {bookmark.subjectName}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(bookmark.dateBookmarked).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigateToLesson(bookmark)}
                    disabled={!onNavigateToLesson}
                  >
                    Open
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmark(bookmark.id)}
                  >
                    <BookmarkMinus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
