import { useState } from "react";
import {
  Highlighter,
  X,
  Calendar,
  BookOpen,
  Tag,
  MessageCircle,
  Code,
  Image as ImageIcon,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Edit2,
  Check,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavigateToContent } from "./NavigateToContent";
import { CommentIndicator } from "./CommentIndicator";
import { SyntaxHighlighter } from "./SyntaxHighlighter";

interface HighlightedItem {
  id: string;
  text: string;
  lessonId: string;
  lessonTitle: string;
  timestamp: string;
  color: string;
}

interface SavedContentItem {
  id: string;
  type: "code" | "image" | "quiz";
  content: string;
  title: string;
  lessonId: string;
  lessonTitle: string;
  timestamp: string;
}

interface Annotation {
  id: string;
  text: string;
  tags: string[];
  comment: string;
  lessonId: string;
  timestamp: string;
  position: { start: number; end: number };
}

interface HighlightedContentProps {
  highlights: HighlightedItem[];
  onRemoveHighlight: (id: string) => void;
  savedContent?: SavedContentItem[];
  annotations?: Annotation[];
  onRemoveSavedContent?: (id: string) => void;
  onRemoveAnnotation?: (id: string) => void;
  onUpdateAnnotation?: (annotation: Annotation) => void;
  onNavigateToLesson?: (lessonId: string) => void;
}

export function HighlightedContent({
  highlights,
  onRemoveHighlight,
  savedContent = [],
  annotations = [],
  onRemoveSavedContent,
  onRemoveAnnotation,
  onUpdateAnnotation,
  onNavigateToLesson,
}: HighlightedContentProps) {
  const [expandedSections, setExpandedSections] = useState({
    highlights: true,
    savedContent: true,
    annotations: true,
  });
  const [editingAnnotation, setEditingAnnotation] = useState<string | null>(
    null
  );
  const [editTags, setEditTags] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");

  const totalItems =
    highlights.length + savedContent.length + annotations.length;

  if (totalItems === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Highlighter className="h-12 w-12 mx-auto mb-4 opacity-50 text-primary" />
        <h3 className="text-lg font-medium mb-2">No saved content yet</h3>
        <h1 className="text-sm">
          Highlight text, save content, or add annotations while studying to
          review them here
        </h1>
        <p className="text-xs mt-1">
          Your content will be organized by type for easy review
        </p>
      </div>
    );
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const startEditingAnnotation = (annotation: Annotation) => {
    setEditingAnnotation(annotation.id);
    setEditTags(annotation.tags.join(", "));
    setEditComment(annotation.comment);
  };

  const saveAnnotationEdit = (annotation: Annotation) => {
    if (onUpdateAnnotation) {
      const updatedAnnotation = {
        ...annotation,
        tags: editTags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        comment: editComment,
      };
      onUpdateAnnotation(updatedAnnotation);
    }
    setEditingAnnotation(null);
    setEditTags("");
    setEditComment("");
  };

  const cancelEdit = () => {
    setEditingAnnotation(null);
    setEditTags("");
    setEditComment("");
  };

  const getQuizNavigationLink = (content: string, lessonId: string) => {
    // Parse the content to extract lesson and section info
    const parts = content.split("/");
    const sectionId = content.split("#")[1];

    return () => {
      if (onNavigateToLesson) {
        onNavigateToLesson(lessonId);
        // If there's a section ID, scroll to it after navigation
        if (sectionId) {
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }
    };
  };

  const getTagColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    ];
    return colors[index % colors.length];
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code className="h-4 w-4 text-emerald-600" />;
      case "image":
        return <ImageIcon className="h-4 w-4 text-purple-600" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4 text-orange-600" />;
      case "highlight":
        return <Highlighter className="h-4 w-4 text-yellow-600" />;
      case "annotation":
        return <MessageCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case "code":
        return "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/30";
      case "image":
        return "border-l-purple-500 bg-purple-50 dark:bg-purple-950/30";
      case "quiz":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-950/30";
      case "highlight":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30";
      case "annotation":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/30";
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/30";
    }
  };
  const getDarkerColor = (color: string): string => {
    // Convert hex to RGB
    const rgb = hexToRgb(color);
    if (!rgb) return "#000000"; // Default to black if invalid color

    // Darken the color by reducing the RGB values significantly
    const darkenedRgb = rgb.map((value) => Math.max(value - 150, 0)); // Darken by 150 for more contrast

    // Convert back to hex
    return rgbToHex(darkenedRgb);
  };

  // Convert hex color to RGB array [r, g, b]
  const hexToRgb = (hex: string): number[] | null => {
    const regex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
    const result = regex.exec(hex);
    if (!result) return null;

    let r: number, g: number, b: number;
    if (result[1].length === 6) {
      r = parseInt(result[1].substr(0, 2), 16);
      g = parseInt(result[1].substr(2, 2), 16);
      b = parseInt(result[1].substr(4, 2), 16);
    } else {
      r = parseInt(result[1].substr(0, 1) + result[1].substr(0, 1), 16);
      g = parseInt(result[1].substr(1, 1) + result[1].substr(1, 1), 16);
      b = parseInt(result[1].substr(2, 1) + result[1].substr(2, 1), 16);
    }

    return [r, g, b];
  };

  // Convert RGB array [r, g, b] back to hex color
  const rgbToHex = (rgb: number[]): string => {
    return `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Highlighter className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-semibold text-primary">
            Saved Content & Highlights
          </h1>
        </div>
        <p className="text-muted-foreground">
          {totalItems} saved item{totalItems === 1 ? "" : "s"} from your studies
        </p>
      </div>

      {/* Highlights Section */}
      {highlights.length > 0 && (
        <Card className="overflow-hidden">
          <Collapsible
            open={expandedSections.highlights}
            onOpenChange={() => toggleSection("highlights")}
          >
            <CardHeader className="bg-yellow-50 dark:bg-yellow-950/30 border-b border-yellow-200 dark:border-yellow-800">
              <CollapsibleTrigger asChild>
                <CardTitle className="flex items-center gap-3 text-lg cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 p-2 rounded transition-colors">
                  {expandedSections.highlights ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                  <Highlighter className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-800 dark:text-yellow-200">
                    Text Highlights
                  </span>
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  >
                    {highlights.length} highlight
                    {highlights.length === 1 ? "" : "s"}
                  </Badge>
                </CardTitle>
              </CollapsibleTrigger>
            </CardHeader>

            <CollapsibleContent>
              <CardContent className="p-0">
                {highlights.map((highlight, index) => {
                  const textColor = getDarkerColor(highlight.color); // Dynamically get the darker text color

                  return (
                    <div key={highlight.id}>
                      <div
                        className={`p-4 hover:bg-muted/30 transition-colors ${getContentColor(
                          "highlight"
                        )} border-l-4`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <blockquote className="pl-4 italic text-foreground font-medium">
                              <span
                                style={{
                                  backgroundColor: highlight.color,
                                  padding: "2px 4px",
                                  borderRadius: "3px",
                                  color: textColor, // Apply the darker color to the text
                                }}
                              >
                                "{highlight.text}"
                              </span>
                            </blockquote>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>From: {highlight.lessonTitle}</span>
                              <span>•</span>
                              <span>
                                {new Date(
                                  highlight.timestamp
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {onNavigateToLesson && (
                              <NavigateToContent
                                lessonId={highlight.lessonId}
                                lessonTitle={highlight.lessonTitle}
                                onNavigate={onNavigateToLesson}
                                contentType="highlight"
                              />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveHighlight(highlight.id)}
                              className="text-muted-foreground hover:text-destructive flex-shrink-0 h-6 w-6 p-0"
                              title="Remove highlight"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < highlights.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Saved Content Section */}
      {savedContent.length > 0 && (
        <Card className="overflow-hidden">
          <Collapsible
            open={expandedSections.savedContent}
            onOpenChange={() => toggleSection("savedContent")}
          >
            <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800">
              <CollapsibleTrigger asChild>
                <CardTitle className="flex items-center gap-3 text-lg cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/20 p-2 rounded transition-colors">
                  {expandedSections.savedContent ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                  <Code className="h-5 w-5 text-emerald-600" />
                  <span className="text-emerald-800 dark:text-emerald-200">
                    Saved Content
                  </span>
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    {savedContent.length} item
                    {savedContent.length === 1 ? "" : "s"}
                  </Badge>
                </CardTitle>
              </CollapsibleTrigger>
            </CardHeader>

            <CollapsibleContent>
              <CardContent className="p-0">
                {savedContent.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`p-4 hover:bg-muted/30 transition-colors ${getContentColor(
                        item.type
                      )} border-l-4`}
                    >
                      <div
                        className={`flex items-start justify-between gap-3 `}
                      >
                        <div className="flex-1 space-y-2 overflow-x-auto">
                          <div className="flex items-center gap-2 mb-2">
                            {getContentIcon(item.type)}
                            <Badge variant="secondary" className="text-xs">
                              {item.type}
                            </Badge>
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                          </div>

                          {item.type === "code" && (
                            <pre className="bg-muted/70 p-3 rounded text-xs overflow-x-auto border">
                              <SyntaxHighlighter code={item.content || ""} />
                            </pre>
                          )}
                          {item.type === "image" && (
                            <img
                              src={item.content}
                              alt={item.title}
                              className="rounded-lg shadow-sm max-w-full h-auto max-h-32 object-contain border"
                            />
                          )}
                          {item.type === "quiz" && (
                            <div className="bg-muted/50 p-2 rounded text-sm border">
                              <Button
                                variant="link"
                                onClick={getQuizNavigationLink(
                                  item.content,
                                  item.lessonId
                                )}
                                className="p-0 h-auto text-blue-600 hover:text-blue-800"
                              >
                                Go to quiz: {item.title}
                              </Button>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>From: {item.lessonTitle}</span>
                            <span>•</span>
                            <span>
                              {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {onNavigateToLesson && (
                            <NavigateToContent
                              lessonId={item.lessonId}
                              lessonTitle={item.lessonTitle}
                              onNavigate={onNavigateToLesson}
                              contentType="saved"
                            />
                          )}
                          {onRemoveSavedContent && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveSavedContent(item.id)}
                              className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
                              title="Remove saved content"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < savedContent.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Annotations Section */}
      {annotations.length > 0 && (
        <Card className="overflow-hidden">
          <Collapsible
            open={expandedSections.annotations}
            onOpenChange={() => toggleSection("annotations")}
          >
            <CardHeader className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-800">
              <CollapsibleTrigger asChild>
                <CardTitle className="flex items-center gap-3 text-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded transition-colors">
                  {expandedSections.annotations ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 dark:text-blue-200">
                    Text Annotations
                  </span>
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {annotations.length} annotation
                    {annotations.length === 1 ? "" : "s"}
                  </Badge>
                </CardTitle>
              </CollapsibleTrigger>
            </CardHeader>

            <CollapsibleContent>
              <CardContent className="p-0">
                {annotations.map((annotation, index) => (
                  <div key={annotation.id}>
                    <div
                      className={`p-4 hover:bg-muted/30 transition-colors ${getContentColor(
                        "annotation"
                      )} border-l-4`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <blockquote className="pl-4 italic text-foreground">
                            <span
                              style={{
                                // backgroundColor: "#e0f2fe",
                                padding: "2px 4px",
                                borderRadius: "3px",
                              }}
                            >
                              "{annotation.text}"
                            </span>
                            {annotation.comment && !editingAnnotation && (
                              <CommentIndicator
                                comment={annotation.comment}
                                timestamp={annotation.timestamp}
                              />
                            )}
                          </blockquote>

                          {editingAnnotation === annotation.id ? (
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">
                                  Tags
                                </label>
                                <Input
                                  value={editTags}
                                  onChange={(e) => setEditTags(e.target.value)}
                                  placeholder="Enter tags separated by commas"
                                  className="text-sm"
                                />
                                <p className="text-muted-foreground text-xs m-1 ml-2">
                                  separate with commas.
                                </p>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">
                                  Comment
                                </label>
                                <Textarea
                                  value={editComment}
                                  onChange={(e) =>
                                    setEditComment(e.target.value)
                                  }
                                  placeholder="Enter your comment"
                                  className="text-sm"
                                  rows={2}
                                />
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => saveAnnotationEdit(annotation)}
                                  className="h-6 px-2"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={cancelEdit}
                                  className="h-6 px-2"
                                >
                                  <XIcon className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {annotation.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {annotation.tags.map((tag, tagIndex) => (
                                    <Badge
                                      key={tag}
                                      className={`text-xs ${getTagColor(
                                        tagIndex
                                      )}`}
                                    >
                                      <Tag className="h-2 w-2 mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  From:{" "}
                                  {annotation.lessonId
                                    ? "Lesson content"
                                    : "Unknown"}
                                </span>
                                <span>•</span>
                                <span>
                                  {new Date(
                                    annotation.timestamp
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {editingAnnotation !== annotation.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditingAnnotation(annotation)}
                              className="text-muted-foreground hover:text-blue-600 h-6 w-6 p-0"
                              title="Edit annotation"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          )}
                          {onNavigateToLesson && (
                            <NavigateToContent
                              lessonId={annotation.lessonId}
                              lessonTitle="Annotated content"
                              onNavigate={onNavigateToLesson}
                              contentType="annotation"
                            />
                          )}
                          {onRemoveAnnotation && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveAnnotation(annotation.id)}
                              className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
                              title="Remove annotation"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < annotations.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}
    </div>
  );
}
