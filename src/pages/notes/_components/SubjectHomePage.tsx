import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Clock,
  ExternalLink,
  FileText,
  Send,
  MessageCircle,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Subject, Chapter } from "@/types";

interface SubjectHomePageProps {
  subject: Subject;
  chapters: Chapter[];
  onLessonSelect: (chapterId: string, lessonId: string) => void;
}

export function SubjectHomePage({
  subject,
  chapters,
  onLessonSelect,
}: SubjectHomePageProps) {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isExp, setisExp] = useState(false);
  const toggleChapter = (chapterId: string) => {
    setisExp(!isExp);
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      // In a real app, this would send feedback to a server
      console.log("Feedback submitted:", feedback);
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setFeedback("");
        setFeedbackSubmitted(false);
      }, 3000);
    }
  };

  const actualChapters = chapters.filter((ch) => ch.id !== "highlights");
  const chapterCount = actualChapters.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Subject Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="p-4 rounded-xl text-4xl"
            style={{ backgroundColor: `${subject.color}20` }}
          >
            {subject.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">{subject.name}</h1>
            <Badge variant="outline" className="mt-2">
              {subject.code}
            </Badge>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subject.description}
        </p>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{chapterCount}</p>
            <p className="text-sm text-muted-foreground">Chapters</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{subject.estimatedHours}</p>
            <p className="text-sm text-muted-foreground">Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">
              {actualChapters.reduce((acc, ch) => acc + ch.lessons.length, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Lessons</p>
          </CardContent>
        </Card>
      </div>

      {/* Syllabus Introduction */}
      {subject.syllabus && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Topic Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {subject.syllabus.introduction}
                </p>
              </div>
              {subject.syllabus.image && (
                <div className="flex justify-center">
                  <img
                    src={subject.syllabus.image}
                    alt={`${subject.name} overview`}
                    className="rounded-lg shadow-md max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chapters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">
          Subject Chapters
        </h2>
        <div className="space-y-3 overflow-hidden rounded-lg">
          {actualChapters.map((chapter, index) => (
            <Card
              key={chapter.id}
              className={`transition-all duration-200 hover:shadow-md`}
            >
              <Collapsible
                open={expandedChapters.includes(chapter.id)}
                onOpenChange={() => toggleChapter(chapter.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader
                    className={`cursor-pointer  ${
                      isExp ? "hover:bg-accent/20" : "hover:bg-accent/50"
                    }  transition-colors`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {chapter.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {chapter.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                      {expandedChapters.includes(chapter.id) ? (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                      {chapter.lessons.map((lesson) => (
                        <Button
                          key={lesson.id}
                          variant="outline"
                          className="h-auto p-3 justify-start text-left"
                          onClick={() => onLessonSelect(chapter.id, lesson.id)}
                        >
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {lesson.sections.length} sections
                            </p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>

      {/* Syllabus Links */}
      {subject.syllabus && subject.syllabus.links.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Course Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {subject.syllabus.links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-between"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <span>{link.title}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Share Your Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Help us improve this course! Share your thoughts, suggestions, or
            report any issues you encounter.
          </p>
          {!feedbackSubmitted ? (
            <div className="space-y-3">
              <Textarea
                placeholder="Tell us what you think about this course content, structure, or any improvements you'd like to see..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
              />
              <Button
                onClick={handleFeedbackSubmit}
                disabled={!feedback.trim()}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Send Feedback
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-green-600 mb-2">
                <MessageCircle className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-green-600 font-medium">
                Thank you for your feedback!
              </p>
              <p className="text-sm text-muted-foreground">
                Your input helps us make the course better.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes Attribution */}
      <div className="text-center pt-8 border-t">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>Notes curated by Quackly.</span>
        </div>
      </div>
    </div>
  );
}
