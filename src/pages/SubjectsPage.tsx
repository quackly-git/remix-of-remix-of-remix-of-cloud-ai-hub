import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  BookOpen,
  ChevronDown,
  Bookmark,
  Plus,
  Heart,
  SquareStack,
  FileStack,
} from "lucide-react";
import { VscSymbolKeyword } from "react-icons/vsc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Navbar } from "./notes/_components/Navbar";
import { SubjectCard } from "./notes/_components/SubjectCard";
import { Subject } from "@/types";
import { mockSubjects, mockChapters } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FaInfo } from "react-icons/fa";
import { GiStack } from "react-icons/gi";

interface SubjectsPageProps {
  onSubjectSelect: (subject: Subject) => void;
  onSubmitNotesClick?: () => void;
}

export function SubjectsPage({
  onSubjectSelect,
  onSubmitNotesClick,
}: SubjectsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks] = useLocalStorage("bookmarked-lessons", []);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimateIn(true);
  }, []);

  // Calculate progress for each subject
  const subjectsWithProgress = mockSubjects.map((subject) => {
    const subjectChapters = mockChapters.filter(
      (ch) => ch.subjectId === subject.id
    );
    const totalSections = subjectChapters.reduce(
      (acc, ch) =>
        acc + ch.lessons.reduce((lacc, l) => lacc + l.sections.length, 0),
      0
    );

    let completedSections = 0;
    subjectChapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        lesson.sections.forEach((section) => {
          const progressData = localStorage.getItem(`progress-${subject.id}`);
          const progress = progressData
            ? JSON.parse(progressData)
            : { completedSections: [] };
          if (
            progress.completedSections &&
            progress.completedSections.includes(section.id)
          ) {
            completedSections++;
          }
        });
      });
    });

    const totalLessons = subjectChapters.reduce(
      (acc, ch) => acc + ch.lessons.length,
      0
    );

    let completedLessons = 0;
    subjectChapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        const progressData = localStorage.getItem(`progress-${subject.id}`);
        const progress = progressData
          ? JSON.parse(progressData)
          : { completedLessons: [] };
        if (
          progress.completedLessons &&
          progress.completedLessons.includes(lesson.id)
        ) {
          completedLessons++;
        }
      });
    });

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      ...subject,
      progress: progressPercentage,
    };
  });

  const filteredSubjects = subjectsWithProgress.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterBy === "completed")
      return matchesSearch && subject.progress === 100;
    if (filterBy === "in-progress")
      return matchesSearch && subject.progress > 0 && subject.progress < 100;
    if (filterBy === "not-started")
      return matchesSearch && subject.progress === 0;

    return matchesSearch;
  });

  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "code") return a.code.localeCompare(b.code);
    if (sortBy === "progress") return b.progress - a.progress;
    return 0;
  });

  const bookmarkedLessons = bookmarks.map((bookmark) => ({
    ...bookmark,
    subject: mockSubjects.find((s) => s.id === bookmark.subjectId),
  }));

  const handleBookmarkClick = (bookmark: any) => {
    const subject = mockSubjects.find((s) => s.id === bookmark.subjectId);
    if (subject) {
      // Store the bookmark navigation info in localStorage
      localStorage.setItem(
        `navigate-to-${subject.id}`,
        JSON.stringify({
          chapterId: bookmark.chapterId,
          lessonId: bookmark.lessonId,
          timestamp: new Date().toISOString(),
        })
      );
      onSubjectSelect(subject);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main
        className={`container mx-auto px-4 py-8  transition-transform duration-700 ease-out
          ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Unit 4 <span className="text-[hsl(var(--primary))]">Notes</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Covers all specification points, very Summarized & Syllabus-specific{" "}
          </p>
        </div>

        {/* Bookmarks Section */}
        <Collapsible
          open={showBookmarks}
          onOpenChange={setShowBookmarks}
          className="mb-8"
        >
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Bookmarked Lessons ({bookmarkedLessons.length})
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showBookmarks ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            {bookmarkedLessons.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No bookmarked lessons yet. Bookmark lessons while studying to
                  create quick shortcuts here.
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedLessons.map((bookmark) => (
                  <Card
                    key={bookmark.id}
                    className="
                    // hover:shadow-md transition-shadow 
                    cursor-pointer"
                    onClick={() => handleBookmarkClick(bookmark)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: bookmark.subject?.color }}
                        />
                        <Badge variant="outline" className="text-xs">
                          {bookmark.subject?.icon}
                          {"  "}
                          {bookmark.subject?.name}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-medium">
                        {bookmark.lessonTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-2">
                        {bookmark.chapterTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Bookmarked{" "}
                        {new Date(bookmark.dateBookmarked).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => onSubjectSelect(subject)}
            />
          ))}
          {/* Submit Notes Card - Always visible at the end */}
          <Card className="card-hover cursor-pointer group h-full transition-all duration-300 border-dashed border-2 hover:border-primary">
            <CardContent className="flex flex-col items-center justify-center h-full p-6 min-h-[200px] space-y-4">
              <button
                onClick={() => (window.location.href = "/keywords-library")}
                className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20  font-medium rounded-md transition-colors duration-300"
              >
                Definitions
              </button>{" "}
              <button
                onClick={() => (window.location.href = "/flashcards")}
                className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20  font-medium rounded-md transition-colors duration-300"
              >
                Flashcards+
              </button>
              <button
                onClick={() => (window.location.href = "/equations")}
                className="w-full py-2 px-4 bg-primary/5 text-muted-foreground hover:bg-primary/20 pointer-events-none  font-medium rounded-md transition-colors duration-300"
                disabled
              >
                Equations
              </button>
            </CardContent>
          </Card>

          <Card
            className="card-hover cursor-pointer group h-full transition-all duration-300 border-dashed border-2 hover:border-primary"
            onClick={onSubmitNotesClick}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-6 min-h-[200px]">
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
                <Plus className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-lg text-center group-hover:text-primary transition-colors">
                Submit Notes
              </h3>
              <p className="text-muted-foreground text-sm text-center mt-2">
                Share your notes with other students
              </p>
            </CardContent>
          </Card>
        </div>

        {sortedSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No subjects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
