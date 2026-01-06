import { useEffect, useRef, useState } from "react";
import { useHighlights, HighlightData } from "@/hooks/useHighlights";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ImprovedHighlightManagerProps {
  lessonId: string;
  lessonTitle: string;
  contentSelector?: string;
}

export function ImprovedHighlightManager({
  lessonId,
  lessonTitle,
  contentSelector = ".lesson-content",
}: ImprovedHighlightManagerProps) {
  const {
    activeHighlights,
    loadHighlightsForLesson,
    addHighlight,
    removeHighlight,
    clearAllHighlights,
  } = useHighlights();
  const contentRef = useRef<HTMLElement | null>(null);
  const [hasHighlights, setHasHighlights] = useState(false);

  useEffect(() => {
    loadHighlightsForLesson(lessonId);
    contentRef.current = document.querySelector(contentSelector) as HTMLElement;

    if (!contentRef.current) return;

    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const selectedText = selection.toString().trim();
      if (selectedText.length < 2) return;

      // Create highlight for exact selection
      const range = selection.getRangeAt(0);
      createHighlight(range, selectedText);
      selection.removeAllRanges();
    };

    contentRef.current.addEventListener("mouseup", handleSelection);

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("mouseup", handleSelection);
      }
    };
  }, [lessonId]);

  useEffect(() => {
    setHasHighlights(activeHighlights.size > 0);
    applyHighlights();
  }, [activeHighlights]);

  const createHighlight = (range: Range, text: string) => {
    const colors = ["#fff59d", "#ffcc80", "#a5d6a7", "#90caf9", "#f8bbd9"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const highlight: Omit<HighlightData, "id" | "timestamp"> = {
      text,
      lessonId,
      lessonTitle,
      color: randomColor,
      position: {
        start: range.startOffset,
        end: range.endOffset,
      },
      elementPath: getElementPath(range.startContainer),
    };

    addHighlight(highlight);
  };

  const applyHighlights = () => {
    if (!contentRef.current) return;

    // Remove existing highlights
    const existingHighlights =
      contentRef.current.querySelectorAll(".highlight-span");
    existingHighlights.forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });

    // Apply current highlights
    Array.from(activeHighlights.values()).forEach((highlight) => {
      highlightText(highlight);
    });
  };

  const highlightText = (highlight: HighlightData) => {
    if (!contentRef.current) return;

    const walker = document.createTreeWalker(
      contentRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    for (const textNode of textNodes) {
      const content = textNode.textContent || "";
      const index = content.indexOf(highlight.text);

      if (index !== -1) {
        const beforeText = content.substring(0, index);
        const highlightText = content.substring(
          index,
          index + highlight.text.length
        );
        const afterText = content.substring(index + highlight.text.length);

        const parent = textNode.parentNode;
        if (!parent) continue;

        const highlightSpan = document.createElement("span");
        highlightSpan.className =
          "highlight-span  transition-all duration-200 hover:opacity-80";
        highlightSpan.style.backgroundColor = highlight.color;
        highlightSpan.style.padding = "2px 1px";
        highlightSpan.style.borderRadius = "3px";
        highlightSpan.textContent = highlightText;

        highlightSpan.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          removeHighlight(highlight.id);
        });

        if (beforeText) {
          parent.insertBefore(document.createTextNode(beforeText), textNode);
        }
        parent.insertBefore(highlightSpan, textNode);
        if (afterText) {
          parent.insertBefore(document.createTextNode(afterText), textNode);
        }
        parent.removeChild(textNode);
        break;
      }
    }
  };

  const getElementPath = (node: Node): string => {
    const path: string[] = [];
    let current =
      node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element);

    while (current && current !== contentRef.current) {
      if (current.id) {
        path.unshift(`#${current.id}`);
        break;
      } else {
        const siblings = Array.from(current.parentElement?.children || []);
        const index = siblings.indexOf(current);
        path.unshift(
          `${current.tagName.toLowerCase()}:nth-child(${index + 1})`
        );
        current = current.parentElement;
      }
    }

    return path.join(" > ");
  };

  const handleResetHighlights = () => {
    clearAllHighlights(lessonId);
  };

  return (
    <>
      {hasHighlights && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={handleResetHighlights}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border-border shadow-lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Highlights
          </Button>
        </div>
      )}
    </>
  );
}
