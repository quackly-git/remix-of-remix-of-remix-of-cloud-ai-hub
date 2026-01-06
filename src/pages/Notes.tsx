import { useState, useEffect } from "react";
import { Subject, Chapter, Lesson } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FontSettingsModal } from "./notes/_components/FontSettingsModal";
import { BookmarksManager } from "./notes/_components/BookmarksManager";
import { QuizComponent } from "./notes/_components/QuizComponent";
import { HighlightedContent } from "./notes/_components/HighlightedContent";
import { ExportModal } from "./notes/_components/ExportModal";
import { TextToSpeech } from "./notes/_components/TextToSpeech";
import { VideoPlayer } from "./notes/_components/VideoPlayer";
import { AudioPlayer } from "./notes/_components/AudioPlayer";
import { Flashcards } from "./notes/_components/Flashcards";
import { ExaminerTips } from "./notes/_components/ExaminerTips";
import { InteractiveTable } from "./notes/_components/InteractiveTable";
import { InteractiveChart } from "./notes/_components/InteractiveChart";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Download,
  CheckCircle2,
  Circle,
  BookmarkPlus,
  Bookmark,
  Highlighter,
  ArrowRight,
  ArrowLeftIcon,
  FileText,
  Image as ImageIcon,
  Video,
  Code,
  HelpCircle,
  Zap,
  Info,
  Search,
  Copy,
  Save,
  Volume2,
  ExternalLink,
  Link,
  ChevronUp,
  Plug,
  Lightbulb,
  AlertTriangle,
  Car,
} from "lucide-react";
import { mockChapters } from "@/data/mockData";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { SubjectHomePage } from "./notes/_components/SubjectHomePage";
import { EmptySubjectPage } from "./notes/_components/EmptySubjectPage";
import { SearchModal } from "./notes/_components/SearchModal";
import { TextAnnotation, Annotation } from "./notes/_components/TextAnnotation";
import { AnnotationForm } from "./notes/_components/AnnotationForm";
import { ActionFeedback } from "./notes/_components/ActionFeedback";
import { SyntaxHighlighter } from "./notes/_components/SyntaxHighlighter";
import { ColorThemeSelector } from "./notes/_components/ColorThemeSelector";
import { ThemeToggle } from "./notes/ThemeToggle";
import { getSubjectIcon, getSubjectIconColor } from "@/utils/subjectIcons";
import { KeywordTooltipText } from "./notes/_components/KeywordTooltipText";
import { Keywords } from "./notes/_components/Keywords";
import { LearningObjectives } from "./notes/_components/LearningObjectives";
import { useParams } from "react-router-dom";

interface NotesPageProps {
  subject: Subject;
  onBack: () => void;
}

interface SavedContent {
  id: string;
  type: "code" | "image" | "quiz";
  content: string;
  title: string;
  lessonId: string;
  lessonTitle: string;
  timestamp: string;
}

export function NotesPage({ subject, onBack }: NotesPageProps) {
  const [progress, setProgress] = useLocalStorage(`progress-${subject.id}`, {
    completedSections: [],
    completedLessons: [],
    currentChapter: "home",
    currentLesson: null,
  });

  useEffect(() => {
    const handleFontSettingsChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newColor = customEvent.detail?.highlightColor;

      if (newColor) {
        setHighlightColor(newColor);
      }
    };

    window.addEventListener("fontSettingsChanged", handleFontSettingsChange);
    return () => {
      window.removeEventListener(
        "fontSettingsChanged",
        handleFontSettingsChange
      );
    };
  }, []);
  const [fontSettings, setFontSettings] = useLocalStorage("font-settings", {
    size: 16,
    family: "Inter",
    color: "default",
    enableAnnotationPopover: true,
    highlightColor: "#fef08a",
  });

  useEffect(() => {
    const handleFontSettingsChanged = (customEvent: CustomEvent) => {
      // Only react if `enableAnnotationPopover` is present in the event
      if (customEvent.detail?.hasOwnProperty("enableAnnotationPopover")) {
        // If the value for `enableAnnotationPopover` has changed
        if (
          customEvent.detail.enableAnnotationPopover !==
          fontSettings.enableAnnotationPopover
        ) {
          // Update the fontSettings only for enableAnnotationPopover
          setFontSettings((prevSettings) => ({
            ...prevSettings,
            enableAnnotationPopover: customEvent.detail.enableAnnotationPopover,
          }));

          // Trigger any other updates here, like a re-render, etc.
          console.log("Annotation Popover setting has changed.");
        }
      }
    };

    // Add the event listener for the custom event
    window.addEventListener("fontSettingsChanged", handleFontSettingsChanged);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener(
        "fontSettingsChanged",
        handleFontSettingsChanged
      );
    };
  }, [fontSettings.enableAnnotationPopover]); // Add this dependency to track only enableAnnotationPopover changes

  const [highlightColor, setHighlightColor] = useState("#fef08a");
  const [eb, setEb] = useState(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("font-settings") || "{}");
      if (stored.highlightColor) {
        setHighlightColor(stored.highlightColor);
      }
    } catch (e) {
      console.warn("Could not load highlight color:", e);
    }
  }, []); // <- empty dependency array = run once on mount

  function handleHiddenClick(e) {
    const span = e.currentTarget;
    const step = 2;

    if (step === 2) {
      span.classList.remove("hidden-text");

      // Reset: replace with original HTML
      const originalHTML = span.getAttribute("data-original-html");
      if (!originalHTML) return;

      const temp = document.createElement("div");
      temp.innerHTML = originalHTML;
      const nodes = Array.from(temp.childNodes);
      const parent = span.parentNode;

      nodes.forEach((node) => parent.insertBefore(node, span));
      parent.removeChild(span);

      // Remove from localStorage
    }
  }

  function wrapSelectedTextAsHidden() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0).cloneRange();
    const selectedContent = range.cloneContents();
    const selectedText = selection.toString();

    // Create a span to wrap hidden content
    const span = document.createElement("span");
    const hiddenId = `hidden-${Date.now()}`;
    span.setAttribute("data-hidden-id", hiddenId);
    span.setAttribute("data-step", "1"); // 1: hidden
    span.className = "hidden-text";

    // Save original HTML structure
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(selectedContent.cloneNode(true));
    span.setAttribute("data-original-html", tempDiv.innerHTML);

    // Add text and click handler
    span.textContent = selectedText;
    span.addEventListener("click", handleHiddenClick);
    setPopoverPosition(null);
    // Replace selected text with the span
    range.deleteContents();
    range.insertNode(span);
    selection.removeAllRanges();
  }

  // Enhanced highlight interface to store color
  interface EnhancedHighlight {
    id: string;
    text: string;
    lessonId: string;
    lessonTitle: string;
    timestamp: string;
    color: string; // Store the color used when highlighting
  }
  const [annotations, setAnnotations] = useLocalStorage<Annotation[]>(
    `annotations-${subject.id}`,
    []
  );

  const [highlights, setHighlights] = useLocalStorage<EnhancedHighlight[]>(
    `highlights-${subject.id}`,
    []
  );
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarked-lessons", []);
  const [enabledmode, setEnabledmode] = useState(true);

  const [highlightMode, setHighlightMode] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState(["1-1"]);
  const [contentKey, setContentKey] = useState(0); // Force re-render for font changes
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  useEffect(() => {
    const handleSettingsChange = (e: Event) => {
      const { highlightColor } = (e as CustomEvent).detail || {};
      if (highlightColor) setHighlightColor(highlightColor);
    };

    window.addEventListener("fontSettingsChanged", handleSettingsChange);
    return () =>
      window.removeEventListener("fontSettingsChanged", handleSettingsChange);
  }, []);
  //

  //

  //

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.dataset.hidden === "true") {
        // Toggle reveal class
        if (target.classList.contains("revealed")) {
          target.classList.remove("revealed");
          // Hide again: restore styles
          target.style.color = "transparent";
          target.style.userSelect = "none";
          target.style.backgroundColor = "#f5f5f5";
        } else {
          target.classList.add("revealed");
          // Reveal text: reset styles to normal
          target.style.color = "inherit";
          target.style.userSelect = "text";
          target.style.backgroundColor = "transparent";
        }
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [savedContent, setSavedContent] = useLocalStorage<SavedContent[]>(
    `saved-content-${subject.id}`,
    []
  );
  const [editTags, setEditTags] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editingAnnotation, setEditingAnnotation] = useState<string | null>(
    null
  );

  const [showExportModal, setShowExportModal] = useState(false);

  // Track saved content to prevent duplicates
  const [savedContentIds, setSavedContentIds] = useLocalStorage<Set<string>>(
    `saved-content-ids-${subject.id}`,
    new Set()
  );

  // Force content re-render when font settings change
  useEffect(() => {
    setContentKey((prev) => prev + 1);
  }, [fontSettings]);

  // Listen for font settings changes and apply them dynamically
  useEffect(() => {
    const handleFontChange = (event: CustomEvent) => {
      const settings = event.detail;
      const contentElements = document.querySelectorAll(".content-text");
      contentElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.fontSize = `${settings.size}px`;
        el.style.fontFamily = settings.family;
        el.style.color =
          settings.color === "default" ? "inherit" : settings.color;
      });
    };

    window.addEventListener(
      "fontSettingsChanged",
      handleFontChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "fontSettingsChanged",
        handleFontChange as EventListener
      );
  }, []);

  // Check if subject has any content
  const chapters: Chapter[] = mockChapters.filter(
    (ch: any) => ch.subjectId === subject.id
  );
  const hasContent = chapters.length > 0;

  // Add home and highlighted content as virtual chapters
  const chaptersWithExtras = hasContent
    ? [
        {
          id: "home",
          title: "Home",
          subjectId: subject.id,
          lessons: [] as Lesson[],
          progress: 0,
        },
        ...chapters,
        {
          id: "highlights",
          title: "Saved & Highlights",
          subjectId: subject.id,
          lessons: [] as Lesson[],
          progress: 0,
        },
      ]
    : [];

  const currentChapter =
    chaptersWithExtras.find((ch) => ch.id === progress.currentChapter) ||
    chapters[0];
  const currentLesson = currentChapter?.lessons.find(
    (l: Lesson) => l.id === progress.currentLesson
  );

  // Get all lessons for navigation
  const allLessons = chapters.flatMap((ch: Chapter) => ch.lessons);
  const currentLessonIndex = allLessons.findIndex(
    (l: Lesson) => l.id === progress.currentLesson
  );
  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < allLessons.length - 1;

  // Check for navigation from bookmark on component mount
  useEffect(() => {
    const navigationData = localStorage.getItem(`navigate-to-${subject.id}`);
    if (navigationData) {
      const { chapterId, lessonId } = JSON.parse(navigationData);
      setProgress((prev) => ({
        ...prev,
        currentChapter: chapterId,
        currentLesson: lessonId,
      }));
      localStorage.removeItem(`navigate-to-${subject.id}`);
    }
  }, [subject.id, setProgress]);

  const saveContent = (
    type: "code" | "image" | "quiz",
    content: string,
    title: string
  ) => {
    if (!currentLesson) return;

    // Create unique content ID
    const contentId = `${type}-${currentLesson.id}-${btoa(content).slice(
      0,
      10
    )}`;

    // Check if already saved

    const savedItem: SavedContent = {
      id: `saved-${type}-${Date.now()}`,
      type,
      content,
      title,
      lessonId: currentLesson.id,
      lessonTitle: currentLesson.title,
      timestamp: new Date().toISOString(),
    };

    setSavedContent([...savedContent, savedItem]);
    setSavedContentIds(new Set([...savedContentIds, contentId]));
    console.log(`Saved ${type}:`, title);
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      console.log("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const saveImage = (imageSrc: string, imageTitle: string) => {
    saveContent("image", imageSrc, imageTitle);
  };

  const saveQuiz = (quizTitle: string, sectionId: string) => {
    const quizLink = `${subject.id}/${progress.currentChapter}/${progress.currentLesson}#${sectionId}`;
    saveContent("quiz", quizLink, quizTitle);
  };

  // Get lesson content as text for text-to-speech
  const getLessonText = () => {
    if (!currentLesson) return "";

    return currentLesson.sections
      .filter((section) => section.type === "text")
      .map((section) => section.content || "")
      .join(" ")
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/\n/g, " "); // Replace newlines with spaces
  };

  const handleHideText = () => {
    wrapSelectedTextAsHidden();
  };

  // Get darker color for text based on background highlight color
  const getDarkerColor = (bgColor: string) => {
    // Simple color darkening logic
    if (bgColor.includes("yellow") || bgColor.includes("#fef08a"))
      return "#92400e";
    if (bgColor.includes("blue") || bgColor.includes("#93c5fd"))
      return "#1e40af";
    if (bgColor.includes("green") || bgColor.includes("#86efac"))
      return "#166534";
    if (bgColor.includes("red") || bgColor.includes("#fca5a5"))
      return "#991b1b";
    if (bgColor.includes("purple") || bgColor.includes("#c4b5fd"))
      return "#6b21a8";
    return "#374151"; // Default dark gray
  };

  const restoreHighlights = () => {
    highlights.forEach((highlight) => {
      const textNodes = getTextNodes(document.querySelector(".content-text"));

      for (const node of textNodes) {
        const nodeText = node.textContent || "";
        const highlightIndex = nodeText.indexOf(highlight.text);

        if (highlightIndex !== -1) {
          const range = document.createRange();
          range.setStart(node, highlightIndex);
          range.setEnd(node, highlightIndex + highlight.text.length);

          // Check if already highlighted
          const existingHighlight = document.querySelector(
            `[data-highlight-id="${highlight.id}"]`
          );
          if (!existingHighlight) {
            applyHighlight(
              range,
              highlight.id,
              highlight.text,
              highlight.color
            );
          }
          break;
        }
      }
    });

    // Restore annotation indicators
    annotations
      .filter((ann) => ann.lessonId === progress.currentLesson)
      .forEach((annotation) => {
        const existingIndicator = document.querySelector(
          `[data-annotation-id="${annotation.id}"]`
        );
        if (!existingIndicator) {
          // Find and mark the annotated text
          const textNodes = getTextNodes(
            document.querySelector(".content-text")
          );
          for (const node of textNodes) {
            const nodeText = node.textContent || "";
            const annotationIndex = nodeText.indexOf(annotation.text);

            if (annotationIndex !== -1) {
              const range = document.createRange();
              range.setStart(node, annotationIndex + annotation.text.length);
              range.setEnd(node, annotationIndex + annotation.text.length);

              const indicatorSpan = document.createElement("span");
              indicatorSpan.setAttribute("data-annotation-id", annotation.id);
              indicatorSpan.className = "inline-annotation-indicator ml-1";
              indicatorSpan.innerHTML = `<span class="inline-flex items-center justify-center w-3 h-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors cursor-pointer" title="View annotation"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span></span>`;

              range.insertNode(indicatorSpan);
              break;
            }
          }
        }
      });
  };

  const getTextNodes = (element: Element | null): Text[] => {
    if (!element) return [];

    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent?.trim()) {
        textNodes.push(node as Text);
      }
    }
    return textNodes;
  };

  const applyHighlight = (
    range: Range,
    highlightId: string,
    text: string,
    color: string
  ) => {
    try {
      // Check if we're trying to highlight already highlighted content
      const contents = range.cloneContents();
      const hasHighlight = contents.querySelector(".highlighted-text");

      if (hasHighlight && highlightMode) {
        // Don't allow highlighting already highlighted content
        return;
      }

      const extractedContents = range.extractContents();
      const highlightSpan = document.createElement("span");
      highlightSpan.style.backgroundColor = color;
      highlightSpan.style.color = getDarkerColor(color); // Set text color to darker version
      highlightSpan.style.borderRadius = "3px";
      highlightSpan.style.padding = "1px 2px";
      highlightSpan.style.cursor = "auto";
      highlightSpan.setAttribute("data-highlight-id", highlightId);
      highlightSpan.className = "highlighted-text transition-all duration-200 ";
      highlightSpan.title =
        "Double-click to remove highlight (in highlight mode)";

      // Preserve original formatting
      highlightSpan.appendChild(extractedContents);

      // Add double-click handler for removing highlight (only in highlight mode)
      highlightSpan.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        if (highlightMode) {
          removeHighlight(highlightId);
        }
      });

      range.insertNode(highlightSpan);
    } catch (e) {
      console.log("Could not highlight selection:", e);
    }
  };

  const findOverlappingHighlight = (
    selectedText: string,
    selection: Selection
  ): { id: string; exactMatch: boolean } | null => {
    const range = selection.getRangeAt(0);

    // Check if selection overlaps with existing highlights
    const highlightElements = document.querySelectorAll(".highlighted-text");
    for (const highlight of highlightElements) {
      const highlightId = highlight.getAttribute("data-highlight-id");
      if (!highlightId) continue;

      // Check for exact match (toggle highlight)
      if (highlight.textContent === selectedText) {
        return { id: highlightId, exactMatch: true };
      }

      // Check for overlap (extend highlight)
      if (range.intersectsNode(highlight)) {
        return { id: highlightId, exactMatch: false };
      }
    }

    return null;
  };

  const removeHighlight = (highlightId: string) => {
    setHighlights(highlights.filter((h) => h.id !== highlightId));
    // Remove from DOM
    const highlightElement = document.querySelector(
      `[data-highlight-id="${highlightId}"]`
    );
    if (highlightElement) {
      const parent = highlightElement.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(highlightElement.textContent || ""),
          highlightElement
        );
        parent.normalize(); // Merge adjacent text nodes
      }
    }
  };
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const text = selection.toString().trim();

      if (highlightMode) {
        // Check for overlapping highlights
        const overlappingHighlight = findOverlappingHighlight(text, selection);

        if (overlappingHighlight) {
          if (overlappingHighlight.exactMatch) {
            // Exact match - toggle (remove) highlight
            removeHighlight(overlappingHighlight.id);
            selection.removeAllRanges();
            return;
          } else {
            // Overlap - extend highlight by creating new one and removing old
            const existingHighlight = highlights.find(
              (h) => h.id === overlappingHighlight.id
            );
            if (existingHighlight) {
              const range = selection.getRangeAt(0);
              const newHighlight: EnhancedHighlight = {
                id: `highlight-${Date.now()}`,
                text,
                lessonId: currentLesson?.id || "",
                lessonTitle: currentLesson?.title || "",
                timestamp: new Date().toISOString(),
                color: existingHighlight.color, // Use same color as existing highlight
              };

              // Remove old highlight and add extended one
              removeHighlight(overlappingHighlight.id);
              setHighlights([
                ...highlights.filter((h) => h.id !== overlappingHighlight.id),
                newHighlight,
              ]);
              applyHighlight(range, newHighlight.id, text, newHighlight.color);
              selection.removeAllRanges();
              return;
            }
          }
        }

        // No overlap - create new highlight
        const highlightId = `highlight-${Date.now()}`;
        const highlight: EnhancedHighlight = {
          id: highlightId,
          text,
          lessonId: currentLesson?.id || "",
          lessonTitle: currentLesson?.title || "",
          timestamp: new Date().toISOString(),
          color: highlightColor,
        };

        setHighlights([...highlights, highlight]);

        const range = selection.getRangeAt(0);
        applyHighlight(range, highlightId, text, highlight.color);
        selection.removeAllRanges();
      } else if (fontSettings.enableAnnotationPopover) {
        // Annotation mode - check if text is already annotated
        const existingAnnotation = annotations.find(
          (ann) => ann.text === text && ann.lessonId === currentLesson?.id
        );

        if (existingAnnotation) {
          // Pre-fill form with existing tags and comments
          setSelectedText(text);
          setEditTags(existingAnnotation.tags.join(", "));
          setEditComment(existingAnnotation.comment);
        } else {
          setSelectedText(text);
          setEditTags("");
          setEditComment("");
        }

        const range = selection.getRangeAt(0);
        setSelectionRange({
          start: range.startOffset,
          end: range.endOffset,
        });

        const rect = range.getBoundingClientRect();
        setPopoverPosition({
          x: rect.left + window.scrollX,
          y: rect.bottom + window.scrollY + 5,
        });

        setShowAnnotationForm(true);
      }
    }
  };

  const toggleHighlightMode = () => {
    const newHighlightMode = !highlightMode;
    setHighlightMode(newHighlightMode);

    // Auto-disable annotation popover when highlighting is enabled
    if (newHighlightMode && fontSettings.enableAnnotationPopover) {
      setFontSettings({
        ...fontSettings,
        enableAnnotationPopover: false,
      });
    } else if (!newHighlightMode) {
      // Re-enable annotation popover when highlighting is disabled
      setFontSettings({
        ...fontSettings,
        enableAnnotationPopover: true,
      });
    }
  };

  const handleCreateAnnotation = (tags: string[], comment: string) => {
    if (!currentLesson || !selectedText || !selectionRange) return;

    // Check if annotation already exists for this text
    const existingAnnotation = annotations.find(
      (ann) => ann.text === selectedText && ann.lessonId === currentLesson.id
    );

    if (existingAnnotation) {
      // Update existing annotation
      const updatedAnnotation = {
        ...existingAnnotation,
        tags,
        comment,
        timestamp: new Date().toISOString(),
      };
      handleUpdateAnnotation(updatedAnnotation);
    } else {
      // Create new annotation
      const annotationId = `annotation-${Date.now()}`;
      const newAnnotation: Annotation = {
        id: annotationId,
        text: selectedText,
        tags,
        comment,
        lessonId: currentLesson.id,
        timestamp: new Date().toISOString(),
        position: selectionRange,
      };

      setAnnotations([...annotations, newAnnotation]);

      // Create inline annotation indicator at the end of selection
      setTimeout(() => {
        const textNodes = getTextNodes(document.querySelector(".content-text"));
        for (const node of textNodes) {
          const nodeText = node.textContent || "";
          const annotationIndex = nodeText.indexOf(selectedText);

          if (annotationIndex !== -1) {
            const range = document.createRange();
            range.setStart(node, annotationIndex + selectedText.length);
            range.setEnd(node, annotationIndex + selectedText.length);

            const indicatorSpan = document.createElement("span");
            indicatorSpan.setAttribute("data-annotation-id", annotationId);
            indicatorSpan.className = "inline-annotation-indicator ml-1";
            indicatorSpan.innerHTML = `<span class="inline-flex items-center justify-center w-3 h-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors cursor-pointer" title="View annotation"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span></span>`;

            range.insertNode(indicatorSpan);
            break;
          }
        }
      }, 100);
    }

    setSelectedText("");
    setSelectionRange(null);
    setShowAnnotationForm(false);
    setPopoverPosition(null);
    setEditTags("");
    setEditComment("");
  };

  const handleCancelAnnotation = () => {
    setSelectedText("");
    setSelectionRange(null);
    setShowAnnotationForm(false);
    setPopoverPosition(null);
    setEditTags("");
    setEditComment("");
  };

  const handleUpdateAnnotation = (updatedAnnotation: Annotation) => {
    setAnnotations(
      annotations.map((ann) =>
        ann.id === updatedAnnotation.id ? updatedAnnotation : ann
      )
    );
  };

  const handleRemoveAnnotation = (annotationId: string) => {
    setAnnotations(annotations.filter((ann) => ann.id !== annotationId));
  };

  const handleSearchNavigation = (chapterId: string, lessonId?: string) => {
    if (lessonId) {
      setProgress({
        ...progress,
        currentLesson: lessonId,
        currentChapter: chapterId,
      });
    } else {
      setProgress({
        ...progress,
        currentChapter: chapterId,
        currentLesson: null,
      });
    }
  };

  const toggleBookmark = () => {
    if (!currentLesson || !currentChapter) return;

    const existingBookmark = bookmarks.find(
      (b) => b.lessonId === currentLesson.id
    );

    if (existingBookmark) {
      // Remove bookmark
      setBookmarks(bookmarks.filter((b) => b.lessonId !== currentLesson.id));
    } else {
      // Add bookmark
      const bookmarkId = `bookmark-${Date.now()}`;
      const bookmark = {
        id: bookmarkId,
        lessonId: currentLesson.id,
        lessonTitle: currentLesson.title,
        chapterTitle: currentChapter.title,
        subjectName: subject.name,
        subjectId: subject.id,
        dateBookmarked: new Date().toISOString(),
      };

      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const isLessonBookmarked = () => {
    return bookmarks.some((b) => b.lessonId === progress.currentLesson);
  };

  const navigateToLesson = (direction: "next" | "prev") => {
    if (direction === "next" && hasNext) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      const nextChapter = chapters.find((ch) =>
        ch.lessons.some((l) => l.id === nextLesson.id)
      );
      setProgress({
        ...progress,
        currentLesson: nextLesson.id,
        currentChapter: nextChapter?.id || progress.currentChapter,
      });
    } else if (direction === "prev" && hasPrevious) {
      const prevLesson = allLessons[currentLessonIndex - 1];
      const prevChapter = chapters.find((ch) =>
        ch.lessons.some((l) => l.id === prevLesson.id)
      );
      setProgress({
        ...progress,
        currentLesson: prevLesson.id,
        currentChapter: prevChapter?.id || progress.currentChapter,
      });
    }
  };
  function convertMarkdownToHtml(md: string) {
    // Normalize line endings
    let html = md.replace(/\r\n/g, "\n");

    // Replace fenced code blocks (```code```) with styled <pre><code>
    html = html.replace(
      /```([\s\S]*?)```/g,
      (_, p1) =>
        `<pre class="dark:bg-[#0e0e0e] dark:text-white text-black bg-[#ffffffcd] p-4 rounded overflow-x-auto"><code>${p1.trim()}</code></pre>`
    );

    // Headings (from h6 to h1) - supports leading spaces
    html = html
      .replace(
        /^\s*###### (.*)$/gm,
        '<h6 class="text-xs font-semibold mt-4 mb-2">$1</h6>'
      )
      .replace(
        /^\s*##### (.*)$/gm,
        '<h5 class="text-sm font-semibold mt-4 mb-2">$1</h5>'
      )
      .replace(
        /^\s*#### (.*)$/gm,
        '<h4 class="text-base font-semibold mt-4 mb-2">$1</h4>'
      )
      .replace(
        /^\s*### (.*)$/gm,
        '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
      )
      .replace(
        /^\s*## (.*)$/gm,
        '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>'
      )
      .replace(
        /^\s*# (.*)$/gm,
        '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>'
      );

    // Horizontal rules (---)
    html = html.replace(
      /^\s*-{3,}\s*$/gm,
      '<hr class="my-4 border-muted/40" />'
    );

    // Blockquotes (lines starting with "> ")
    // Wrap blockquote paragraphs, allow multiline blockquotes
    html = html.replace(/^(?:> (.*)(\n|$))+?/gm, (match) => {
      const content = match
        .split("\n")
        .map((line) => line.replace(/^> /, "").trim())
        .join("<br/>");
      return `<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">${content}</blockquote>`;
    });

    // Lists: convert consecutive lines starting with "- " to <ul><li>...</li></ul>
    // Handle multiple lists independently
    html = html.replace(/(^- .+(?:\n- .+)*)/gm, (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((item) => `<li>${item.replace(/^- /, "").trim()}</li>`)
        .join("");
      return `<ul class="list-disc list-inside mb-4">${items}</ul>`;
    });

    // Inline code `code`
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-1 rounded">$1</code>'
    );

    // Bold **text**
    html = html.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold text-primary">$1</strong>'
    );

    // Italic *text*
    html = html.replace(
      /\*(.*?)\*/g,
      '<em class="italic text-muted-foreground">$1</em>'
    );

    // Superscripts: 10^3 → 10<sup>3</sup>
    html = html.replace(/(\d+)\^(\d+)/g, "$1<sup>$2</sup>");

    // Links [text](url) with icon
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-primary hover:underline">
        <span>$1</span>
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>`
    );

    // Newlines to <br/>
    html = html.replace(/\n/g, "<br/>");

    return html;
  }
  function replaceEmojisWithLucideIcons(html: string): string {
    const iconMap: Record<string, string> = {
      "🔌": `<svg class="inline-block w-6 h-6 align-text-bottom" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 3v8a3 3 0 006 0V3h-3v8"/></svg>`,
      "💾": `<svg class="inline-block w-6 h-6 align-text-bottom" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/></svg>`,
      "💡": `<svg class="inline-block w-6 h-6 align-text-bottom text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M12 3a7 7 0 00-7 7c0 4 7 9 7 9s7-5 7-9a7 7 0 00-7-7z"/></svg>`,
      "⚠️": `<svg class="inline-block w-6 h-6 align-text-bottom text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.7-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
      "🚗": `<svg class="inline-block w-6 h-6 align-text-bottom" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h18l-1-5H4l-1 5z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg>`,
    };

    // Replace emojis with SVG strings
    const emojiPattern = new RegExp(
      Object.keys(iconMap)
        .map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|"),
      "g"
    );

    return html.replace(emojiPattern, (match) => iconMap[match] || match);
  }

  const navigateToBookmarkedLesson = (subjectId: string, lessonId: string) => {
    if (subjectId !== subject.id) return; // Can't navigate to different subject

    const lesson = allLessons.find((l) => l.id === lessonId);
    if (lesson) {
      const chapter = chapters.find((ch) =>
        ch.lessons.some((l) => l.id === lessonId)
      );
      setProgress({
        ...progress,
        currentLesson: lessonId,
        currentChapter: chapter?.id || progress.currentChapter,
      });
    }
  };

  const removeSavedContent = (contentId: string) => {
    setSavedContent(savedContent.filter((c) => c.id !== contentId));
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4 text-primary" />;
      case "image":
        return <ImageIcon className="h-4 w-4 text-primary" />;
      case "video":
        return <Video className="h-4 w-4 text-primary" />;
      case "code":
        return <Code className="h-4 w-4 text-primary" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4 text-primary" />;
      case "flashcard":
        return <Zap className="h-4 w-4 text-primary" />;
      case "activity":
        return <Zap className="h-4 w-4 text-primary" />;
      case "audio":
        return <Volume2 className="h-4 w-4 text-primary" />;
      case "examiner-tips":
        return <Info className="h-4 w-4 text-primary" />;
      case "table":
        return <FileText className="h-4 w-4 text-primary" />;
      case "chart":
        return <Zap className="h-4 w-4 text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };
  const [collapseLevel, setCollapseLevel] = useState<0 | 1 | 2>(0);
  const toggleCollapse = () => {
    setCollapseLevel((prev) => (prev === 1 ? 0 : prev === 2 ? 0 : 1));
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const toggleLessonComplete = () => {
    if (!currentLesson) return;

    const newCompleted = progress.completedLessons.includes(currentLesson.id)
      ? progress.completedLessons.filter((id) => id !== currentLesson.id)
      : [...progress.completedLessons, currentLesson.id];

    setProgress({
      ...progress,
      completedLessons: newCompleted,
    });
  };

  // Calculate actual progress (excluding home and highlights chapters)
  const actualChapters = chapters;
  const totalLessons = actualChapters.reduce(
    (acc: number, ch: Chapter) => acc + ch.lessons.length,
    0
  );
  const completedCount = progress.completedLessons.length;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // If no content, show empty state
  if (!hasContent) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-4 p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Subjects</span>
            </Button>
          </div>
        </header>
        <main className="p-4 sm:p-6">
          <EmptySubjectPage subject={subject} />
        </main>
      </div>
    );
  }

  const handleLessonSelect = (chapterId: string, lessonId: string) => {
    setProgress({
      ...progress,
      currentChapter: chapterId,
      currentLesson: lessonId,
    });
  };

  const navigateToHome = () => {
    setProgress({
      ...progress,
      currentChapter: "home",
      currentLesson: null,
    });
  };

  // Get annotations for current lesson
  const currentLessonAnnotations = annotations.filter(
    (ann) => ann.lessonId === progress.currentLesson
  );

  const handleNavigateToHighlightedContent = (lessonId: string) => {
    navigateToBookmarkedLesson(subject.id, lessonId);
  };
  const IconComponent = getSubjectIcon(subject.name);
  const iconColor = getSubjectIconColor(subject.name);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Sidebar */}
          <Sidebar className="border-r z-50">
            <SidebarHeader className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${iconColor}`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate text-gradient">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {subject.code}
                  </p>
                </div>
              </div>
              {progressPercentage > 0 && (
                <Progress value={progressPercentage} className="mt-3 h-2" />
              )}
            </SidebarHeader>

            <SidebarContent className="p-2">
              <SidebarMenu>
                {/* Add Search Option */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="w-full p-3 mb-2"
                    onClick={() => setSearchModalOpen(true)}
                  >
                    <Search className="h-4 w-4 text-primary" />
                    <span className="text-primary">Search Notes</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {chaptersWithExtras.map((chapter) => (
                  <SidebarMenuItem key={chapter.id}>
                    <Collapsible
                      open={expandedChapters.includes(chapter.id)}
                      onOpenChange={() => toggleChapter(chapter.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`w-full justify-between p-3 ${
                            chapter.id === "home" ? "py-6" : "py-5"
                          }`}
                          onClick={
                            chapter.id === "home" ? navigateToHome : undefined
                          }
                        >
                          <div className="flex items-center gap-3">
                            {chapter.id === "highlights" ? (
                              <Highlighter className="h-4 w-4 text-primary" />
                            ) : chapter.id === "home" ? (
                              <BookOpen className="h-4 w-4 text-primary" />
                            ) : (
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  chapter.lessons.every((l) =>
                                    progress.completedLessons.includes(l.id)
                                  )
                                    ? "bg-green-500"
                                    : chapter.lessons.some((l) =>
                                        progress.completedLessons.includes(l.id)
                                      )
                                    ? "bg-yellow-500"
                                    : "bg-gray-300"
                                }`}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate text-primary">
                                {chapter.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {chapter.id === "highlights"
                                  ? `${
                                      highlights.length + savedContent.length
                                    } saved items`
                                  : chapter.id === "home"
                                  ? "Topic overview"
                                  : `${chapter.lessons.length} lessons`}
                              </p>
                            </div>
                          </div>
                          {chapter.id !== "home" &&
                            chapter.lessons.length > 0 && (
                              <ChevronDown
                                className={`h-4 w-4 transition-transform text-primary ${
                                  expandedChapters.includes(chapter.id)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      {chapter.id !== "home" && (
                        <CollapsibleContent className="ml-6 mt-2 space-y-1">
                          {chapter.id === "highlights" ? (
                            <button
                              className="w-full text-left p-2 rounded text-sm transition-colors hover:bg-accent/30 text-primary"
                              onClick={() =>
                                setProgress({
                                  ...progress,
                                  currentChapter: "highlights",
                                })
                              }
                            >
                              View all saved content
                            </button>
                          ) : (
                            chapter.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                className={`w-full text-left p-2 rounded text-sm transition-colors hover:bg-accent/30 ${
                                  lesson.id === progress.currentLesson
                                    ? "bg-accent"
                                    : ""
                                }`}
                                onClick={() =>
                                  setProgress({
                                    ...progress,
                                    currentLesson: lesson.id,
                                    currentChapter: chapter.id,
                                  })
                                }
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex-shrink-0 flex items-center justify-center h-4 w-4">
                                    {progress.completedLessons.includes(
                                      lesson.id
                                    ) ? (
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <Circle className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </div>
                                  <span className="truncate">
                                    {lesson.title}
                                  </span>
                                </div>
                              </button>
                            ))
                          )}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div
            className="flex-1 flex flex-col bg-background"
            id="export-content"
          >
            {/* Header */}

            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 p-4 header-controls">
                {collapseLevel > 0 ? (
                  // Collapsed or Semi-collapsed
                  <div className="flex w-full items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                      <SidebarTrigger />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back to Topics</span>
                      </Button>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                      {collapseLevel === 1 && (
                        <>
                          <ColorThemeSelector />
                          <ThemeToggle />
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleCollapse}
                        title="Cycle collapse state"
                        className="gap-2"
                      >
                        {collapseLevel === 2 ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : collapseLevel === 1 ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronUp className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Fully Expanded
                  <>
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <SidebarTrigger />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back to Topics</span>
                      </Button>
                    </div>

                    <div className="flex-1" />

                    {/* Right */}
                    <div className="flex flex-wrap items-center gap-2">
                      <FontSettingsModal />
                      <BookmarksManager
                        onNavigateToLesson={navigateToBookmarkedLesson}
                      />
                      <TextToSpeech
                        text={getLessonText()}
                        disabled={
                          !currentLesson ||
                          progress.currentChapter === "home" ||
                          progress.currentChapter === "highlights"
                        }
                      />
                      <Button
                        variant={highlightMode ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                        onClick={toggleHighlightMode}
                        title={
                          highlightMode
                            ? "Exit highlight mode"
                            : "Enter highlight mode"
                        }
                      >
                        <Highlighter className="h-4 w-4" />
                        <span className="hidden sm:inline">
                          {highlightMode ? "Highlighting" : "Highlight"}
                        </span>
                      </Button>
                      <Button
                        variant={isLessonBookmarked() ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                        onClick={toggleBookmark}
                        disabled={!currentLesson}
                        title={
                          isLessonBookmarked()
                            ? "Remove bookmark"
                            : "Add bookmark"
                        }
                      >
                        {isLessonBookmarked() ? (
                          <Bookmark className="h-4 w-4" />
                        ) : (
                          <BookmarkPlus className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">
                          {isLessonBookmarked() ? "Bookmarked" : "Bookmark"}
                        </span>
                      </Button>
                      {currentLesson && (
                        <Button
                          variant={
                            progress.completedLessons.includes(
                              currentLesson?.id
                            )
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="gap-2"
                          onClick={toggleLessonComplete}
                          title={
                            progress.completedLessons.includes(
                              currentLesson?.id
                            )
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        >
                          {progress.completedLessons.includes(
                            currentLesson?.id
                          ) ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                          <span className="hidden sm:inline">
                            {progress.completedLessons.includes(
                              currentLesson?.id
                            )
                              ? "Completed"
                              : "Complete"}
                          </span>
                        </Button>
                      )}
                      <Badge
                        variant="secondary"
                        className="hidden sm:inline-flex"
                      >
                        {completedCount}/{totalLessons}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        title="Export notes"
                        onClick={() => setShowExportModal(true)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
                      </Button>
                      {/* Theme controls */}
                      <div className="flex items-center gap-4">
                        <ColorThemeSelector />
                        <ThemeToggle />
                      </div>
                      <Button
                        variant="outline"
                        onClick={toggleCollapse}
                        className="px-6 gap-2"
                        title="Collapse controls"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </header>
            {/* Content Area */}
            <main className="flex-1 p-4 sm:p-6 pr-2 max-w-4xl mx-auto w-full mt-4">
              {progress.currentChapter === "home" ? (
                <SubjectHomePage
                  subject={subject}
                  chapters={actualChapters}
                  onLessonSelect={handleLessonSelect}
                />
              ) : progress.currentChapter === "highlights" ? (
                <div className="animate-fade-in space-y-6">
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      Review all your saved content, highlights, and annotations
                      from {subject.name}
                    </p>
                  </div>

                  {/* Show Saved Content */}

                  {/* Show Highlights */}
                  <HighlightedContent
                    highlights={highlights}
                    onRemoveHighlight={removeHighlight}
                    savedContent={savedContent}
                    annotations={annotations}
                    onRemoveSavedContent={removeSavedContent}
                    onRemoveAnnotation={handleRemoveAnnotation}
                    onUpdateAnnotation={handleUpdateAnnotation}
                    onNavigateToLesson={handleNavigateToHighlightedContent}
                  />
                </div>
              ) : currentChapter && currentLesson ? (
                <div key={contentKey} className="animate-fade-in space-y-6">
                  <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gradient">
                      {currentLesson.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge variant="outline">{subject.code}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {currentChapter.title}
                      </span>
                      {highlightMode && (
                        <Badge className="bg-yellow-100 text-yellow-800 animate-pulse">
                          Highlight Mode Active
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Lesson Content */}
                  {/* Learning Objectives Section */}
                  {currentLesson.learningObjectives.length > 0 && (
                    <LearningObjectives
                      objectives={currentLesson.learningObjectives}
                      lessonId={currentLesson.id}
                      className="mb-6"
                    />
                  )}

                  <div
                    style={{
                      maxWidth: "90vw",
                      overflowX: "hidden",
                      width: "100%",
                    }}
                  >
                    <div
                      className="prose prose-slate dark:prose-invert space-y-6 content-text"
                      style={{
                        fontSize: `var(--content-font-size, ${fontSettings.size}px)`,
                        fontFamily: `var(--content-font-family, ${fontSettings.family})`,
                        color: `var(--content-text-color, ${
                          fontSettings.color === "default"
                            ? "inherit"
                            : fontSettings.color
                        })`,
                        lineHeight: 1.6,
                      }}
                      onMouseUp={handleTextSelection}
                    >
                      {currentLesson.sections.map((section, index) => (
                        <div key={section.id} className="space-y-4">
                          <div className="flex items-center gap-2">
                            {getSectionIcon(section.type)}
                            <h3 className="text-lg sm:text-xl font-semibold border-l-4 border-primary pl-4 text-primary">
                              {section.title}
                            </h3>
                          </div>
                          {/* `<pre class="dark:bg-[#0e0e0e] dark:text-white text-black bg-[#ffffffcd] p-4 rounded overflow-x-auto"><code>${p1.trim()}</code></pre>` */}

                          {section.type === "text" && (
                            <>
                              <KeywordTooltipText
                                content={(section.content || "")
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    '<strong class="font-bold text-primary">$1</strong>'
                                  )
                                  .replace(
                                    /\[([^\]]+)\]\(([^)]+)\)/g,
                                    '<a href="$2" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-primary hover:underline"><span>$1</span><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>'
                                  )
                                  .replace(/\n/g, "<br/>")}
                                keywords={currentLesson.kw}
                                className="prose-content"
                              />

                              <div
                                className="leading-relaxed relative"
                                dangerouslySetInnerHTML={{
                                  __html: convertMarkdownToHtml(
                                    section.content || ""
                                  ),
                                }}
                              />

                              {section.links && section.links.length > 0 && (
                                <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Link className="h-4 w-4 text-primary" />
                                    <h4 className="font-semibold text-primary">
                                      Related Links
                                    </h4>
                                  </div>
                                  <div className="space-y-2">
                                    {section.links.map((link, i) => (
                                      <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                                      >
                                        <ExternalLink className="h-3 w-3" />
                                        {link.title}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          {section.type === "image" && (
                            <div className="my-6 image-with-caption relative group">
                              <PhotoProvider>
                                <PhotoView src={section.content}>
                                  <img
                                    src={section.content}
                                    alt={section.title}
                                    className="rounded-lg shadow-md max-w-full h-auto"
                                    title="Click to view full size"
                                  />
                                </PhotoView>
                              </PhotoProvider>

                              <ActionFeedback
                                onAction={() => {
                                  return new Promise<void>((resolve) => {
                                    saveImage(
                                      section.content || "",
                                      section.title
                                    );
                                    resolve(); // Let ActionFeedback know it completed
                                  });
                                }}
                                actionType="save"
                                title="Save image"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                              <div className="image-caption">
                                <Info className="h-3 w-3 inline mr-1" />
                                {section.title} - Educational content image
                              </div>
                            </div>
                          )}

                          {section.type === "video" && (
                            <div className="my-6">
                              <VideoPlayer
                                src={section.content || ""}
                                title={section.title}
                                poster={section.poster}
                                className="w-full"
                              />
                            </div>
                          )}

                          {section.type === "audio" && (
                            <div className="my-6">
                              <AudioPlayer
                                src={section.content || ""}
                                title={section.title}
                                className="w-full"
                              />
                            </div>
                          )}

                          {section.type === "flashcard" &&
                            section.flashcards && (
                              <div className="my-6 ">
                                <Flashcards
                                  cards={section.flashcards}
                                  title={section.title}
                                  className="w-full"
                                />
                              </div>
                            )}

                          {section.type === "examiner-tips" && section.tips && (
                            <div className="my-6">
                              <ExaminerTips
                                tips={section.tips}
                                title={section.title}
                                className="w-full"
                              />
                            </div>
                          )}

                          {section.type === "table" && section.tableData && (
                            <div className="my-6">
                              <InteractiveTable
                                columns={section.tableData.columns}
                                data={section.tableData.data}
                                title={section.title}
                                searchable={section.tableData.searchable}
                                className="w-full"
                              />
                            </div>
                          )}

                          {section.type === "chart" && section.chartData && (
                            <div className="my-6">
                              <InteractiveChart
                                data={section.chartData.data}
                                title={section.title}
                                type={section.chartData.type}
                                xKey={section.chartData.xKey}
                                yKey={section.chartData.yKey}
                                allowTypeSwitch={
                                  section.chartData.allowTypeSwitch
                                }
                                colors={section.chartData.colors}
                                className="w-full"
                              />
                            </div>
                          )}

                          {section.type === "code" && (
                            <div className="relative group max-w-full">
                              <pre
                                className="bg-muted  p-4 rounded-lg overflow-x-auto text-sm border"
                                style={{ maxWidth: "100%", whiteSpace: "pre" }}
                              >
                                <SyntaxHighlighter
                                  code={section.content || ""}
                                />
                              </pre>
                              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ActionFeedback
                                  onAction={() =>
                                    copyCode(section.content || "")
                                  }
                                  actionType="copy"
                                  title="Copy code"
                                />
                                <ActionFeedback
                                  onAction={() => {
                                    return new Promise<void>((resolve) => {
                                      saveContent(
                                        "code",
                                        section.content || "",
                                        section.title
                                      );
                                      resolve(); // Let ActionFeedback know it completed
                                    });
                                  }}
                                  actionType="save"
                                  title="Save code"
                                />
                              </div>
                            </div>
                          )}

                          {section.type === "quiz" && section.quiz && (
                            <div className="relative group">
                              <QuizComponent
                                questions={section.quiz.questions}
                                title={section.quiz.title}
                              />
                              <ActionFeedback
                                onAction={() => {
                                  return new Promise<void>((resolve) => {
                                    saveQuiz(
                                      section.quiz?.title || "Quiz",
                                      section.id
                                    );
                                    resolve(); // Let ActionFeedback know it completed
                                  });
                                }}
                                actionType="save"
                                title="Save quiz link"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              />{" "}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {currentLesson.keywords &&
                    currentLesson.keywords.length > 0 && (
                      <Keywords
                        keywords={currentLesson.keywords}
                        title="Keywords"
                        className="mb-6"
                      />
                    )}
                  {/* Navigation */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t gap-4 navigation-buttons">
                    {hasPrevious ? (
                      <Button
                        variant="outline"
                        onClick={() => navigateToLesson("prev")}
                        className="gap-2 w-full sm:w-auto"
                        title="Go to previous lesson"
                      >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Previous Lesson
                      </Button>
                    ) : (
                      <div className="w-full sm:w-auto" />
                    )}

                    {hasNext ? (
                      <Button
                        variant="outline"
                        onClick={() => navigateToLesson("next")}
                        className="gap-2 w-full sm:w-auto"
                        title="Go to next lesson"
                      >
                        Next Lesson
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="w-full sm:w-auto" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    No lesson selected
                  </h3>
                  <p className="text-muted-foreground">
                    Select a lesson from the sidebar to start learning.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </SidebarProvider>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        subjectId={subject.id}
        onNavigateToResult={handleSearchNavigation}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        subjectName={subject.name}
        highlights={highlights}
        annotations={annotations}
        savedContent={savedContent}
      />

      {/* Compact Annotation Popover */}
      {showAnnotationForm &&
        popoverPosition &&
        fontSettings.enableAnnotationPopover && (
          <AnnotationForm
            selectedText={selectedText}
            onSave={handleCreateAnnotation}
            onCancel={handleCancelAnnotation}
            onHide={handleHideText}
            isOpen={showAnnotationForm}
            position={popoverPosition}
            initialTags={editTags}
            initialComment={editComment}
            onTagsChange={setEditTags}
            onCommentChange={setEditComment}
            editingAnnotationId={editingAnnotation}
            onEditingAnnotationChange={setEditingAnnotation}
          />
        )}
    </div>
  );
}
