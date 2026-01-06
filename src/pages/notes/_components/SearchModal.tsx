import { useState, useEffect } from "react";
import { Search, FileText, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockChapters } from "@/data/mockData";

interface SearchResult {
  id: string;
  title: string;
  chapterTitle: string;
  chapterId: string;
  lessonId: string;
  content: string;
  matchedText: string;
  type: "lesson" | "chapter";
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
  onNavigateToResult: (chapterId: string, lessonId?: string) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  subjectId,
  onNavigateToResult,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const getSnippet = (text: string, term: string, snippetLength = 100) => {
    const idx = text.indexOf(term);
    if (idx === -1) return text.slice(0, snippetLength);
    const start = Math.max(0, idx - snippetLength / 2);
    const end = Math.min(text.length, idx + term.length + snippetLength / 2);
    return text.slice(start, end);
  };

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const chapters = mockChapters.filter((ch) => ch.subjectId === subjectId);
    const lowerQuery = query.toLowerCase();
    const searchTerms = lowerQuery.split(" ");

    const resultsFullMatch: SearchResult[] = [];
    const resultsPartialMatch: SearchResult[] = [];

    chapters.forEach((chapter) => {
      const chapterTitle = (chapter.title || "").toLowerCase();

      // 1) Full phrase match for chapter title
      if (chapterTitle.includes(lowerQuery)) {
        resultsFullMatch.push({
          id: `chapter-${chapter.id}`,
          title: chapter.title,
          chapterTitle: chapter.title,
          chapterId: chapter.id,
          lessonId: "",
          content: `Chapter: ${chapter.title}`,
          matchedText: chapter.title,
          type: "chapter",
        });
      } else {
        // 2) Partial term match for chapter title
        if (searchTerms.some((term) => chapterTitle.includes(term))) {
          resultsPartialMatch.push({
            id: `chapter-${chapter.id}`,
            title: chapter.title,
            chapterTitle: chapter.title,
            chapterId: chapter.id,
            lessonId: "",
            content: `Chapter: ${chapter.title}`,
            matchedText: chapter.title,
            type: "chapter",
          });
        }
      }

      // Lessons
      chapter.lessons.forEach((lesson) => {
        const lessonTitle = (lesson.title || "").toLowerCase();

        // Full phrase match in lesson title
        const lessonTitleFullMatch = lessonTitle.includes(lowerQuery);

        // We'll check each section for full or partial matches
        lesson.sections.forEach((section) => {
          const sectionTitle = (section.title || "").toLowerCase();
          const sectionContent = (section.content || "").toLowerCase();

          const fullMatchFound =
            sectionTitle.includes(lowerQuery) ||
            sectionContent.includes(lowerQuery);

          const partialMatchFound =
            searchTerms.some(
              (term) =>
                sectionTitle.includes(term) || sectionContent.includes(term)
            ) || searchTerms.some((term) => lessonTitle.includes(term));

          if (fullMatchFound || lessonTitleFullMatch) {
            resultsFullMatch.push({
              id: `lesson-${lesson.id}-section-${section.id}`,
              title: lesson.title,
              chapterTitle: chapter.title,
              chapterId: chapter.id,
              lessonId: lesson.id,
              content: section.title,
              matchedText: sectionContent.includes(lowerQuery)
                ? getSnippet(sectionContent, lowerQuery)
                : section.title,
              type: "lesson",
            });
          } else if (partialMatchFound) {
            // Find first matching term for snippet
            const firstTerm =
              searchTerms.find(
                (term) =>
                  sectionContent.includes(term) || sectionTitle.includes(term)
              ) || "";

            resultsPartialMatch.push({
              id: `lesson-${lesson.id}-section-${section.id}`,
              title: lesson.title,
              chapterTitle: chapter.title,
              chapterId: chapter.id,
              lessonId: lesson.id,
              content: section.title,
              matchedText: getSnippet(sectionContent, firstTerm),
              type: "lesson",
            });
          }
        });
      });
    });

    // Deduplicate results by id (in case of overlap)
    const map = new Map<string, SearchResult>();
    resultsFullMatch.forEach((res) => map.set(res.id, res));
    resultsPartialMatch.forEach((res) => {
      if (!map.has(res.id)) {
        map.set(res.id, res);
      }
    });

    // Combine full matches first, then partial matches
    const combinedResults = [
      ...resultsFullMatch,
      ...resultsPartialMatch.filter(
        (res) => !resultsFullMatch.some((r) => r.id === res.id)
      ),
    ];

    setSearchResults(combinedResults);
    setIsSearching(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, subjectId]);

  const handleResultClick = (result: SearchResult) => {
    onNavigateToResult(result.chapterId, result.lessonId);
    onClose();
    setSearchQuery("");
    setSearchResults([]);
  };
  function convertMarkdownToHtmlWithHighlight(md: string, query: string) {
    // 1) Convert markdown to HTML (your original function logic)
    let html = md.replace(/\r\n/g, "\n");

    // Fenced code blocks
    html = html.replace(
      /```([\s\S]*?)```/g,
      (_, p1) =>
        `<pre class="dark:bg-[#0e0e0e] dark:text-white text-black bg-[#ffffffcd] p-4 rounded overflow-x-auto"><code>${p1.trim()}</code></pre>`
    );

    // Headings
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

    // Horizontal rules
    html = html.replace(
      /^\s*-{3,}\s*$/gm,
      '<hr class="my-4 border-muted/40" />'
    );

    // Blockquotes
    html = html.replace(/^(?:> (.*)(\n|$))+?/gm, (match) => {
      const content = match
        .split("\n")
        .map((line) => line.replace(/^> /, "").trim())
        .join("<br/>");
      return `<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">${content}</blockquote>`;
    });

    // Lists
    html = html.replace(/(^- .+(?:\n- .+)*)/gm, (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((item) => `<li>${item.replace(/^- /, "").trim()}</li>`)
        .join("");
      return `<ul class="list-disc list-inside mb-4">${items}</ul>`;
    });

    // Inline code
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-1 rounded">$1</code>'
    );

    // Bold
    html = html.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold text-primary">$1</strong>'
    );

    // Italic
    html = html.replace(
      /\*(.*?)\*/g,
      '<em class="italic text-muted-foreground">$1</em>'
    );

    // Superscripts
    html = html.replace(/(\d+)\^(\d+)/g, "$1<sup>$2</sup>");

    // Links with icon
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

    // 2) Highlight search terms (case-insensitive) inside resulting HTML
    if (!query.trim()) return html;

    const terms = query.toLowerCase().split(" ").filter(Boolean);

    // Avoid highlighting inside tags or code blocks by replacing text nodes only
    // For simplicity, here we do a global replace on HTML string with regex.
    // Note: This can highlight inside tags if they contain the text, so a proper parser is better.
    // But for quick usage, this works fine.

    terms.forEach((term) => {
      if (!term) return;
      const regex = new RegExp(
        `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi"
      );
      html = html.replace(
        regex,
        '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>'
      );
    });

    return html;
  }

  const highlightSearchTerms = (text: string, query: string) => {
    if (!query.trim()) return text;

    const terms = query.toLowerCase().split(" ");
    let highlightedText = text;

    terms.forEach((term) => {
      const regex = new RegExp(`(${term})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>'
      );
    });

    return highlightedText;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search Notes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for topics, lessons, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {isSearching ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                <p>Searching...</p>
              </div>
            ) : searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm mt-1">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    {searchResults.length} result
                    {searchResults.length === 1 ? "" : "s"} found
                  </span>
                </div>
                <Separator />
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {result.title}
                          </span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {result.chapterTitle}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: convertMarkdownToHtmlWithHighlight(
                                result.matchedText,
                                searchQuery
                              ),
                            }}
                          />
                        </div>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {result.type === "chapter" ? "Chapter" : "Lesson"}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            ) : searchQuery ? null : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Start typing to search through all notes</p>
                <p className="text-sm mt-1">
                  Search by topics, lessons, or specific content
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
