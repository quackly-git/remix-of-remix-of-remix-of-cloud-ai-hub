import { useEffect, useRef } from "react";
import { useHighlights, HighlightData } from "@/hooks/useHighlights";

interface HighlightManagerProps {
  lessonId: string;
  lessonTitle: string;
  contentSelector?: string;
}

export function HighlightManager({
  lessonId,
  lessonTitle,
  contentSelector = ".lesson-content",
}: HighlightManagerProps) {
  const {
    activeHighlights,
    loadHighlightsForLesson,
    addHighlight,
    removeHighlight,
  } = useHighlights();
  const contentRef = useRef<HTMLElement | null>(null);
  const isSelecting = useRef(false);

  useEffect(() => {
    // Load highlights for the current lesson
    loadHighlightsForLesson(lessonId);

    // Get the content container
    contentRef.current = document.querySelector(contentSelector) as HTMLElement;

    if (!contentRef.current) return;

    // Apply existing highlights
    applyHighlights();

    // Add event listeners for text selection
    const handleMouseUp = (event: MouseEvent) => {
      if (!isSelecting.current) return;

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      if (selectedText.length < 3) {
        selection.removeAllRanges();
        return;
      }

      // Create highlight
      createHighlight(range, selectedText);
      selection.removeAllRanges();
      isSelecting.current = false;
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (
        event.target &&
        (event.target as Element).closest(".highlight-wrapper")
      ) {
        return; // Don't start selection on existing highlights
      }
      isSelecting.current = true;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Remove highlight on Delete/Backspace when highlight is selected
      if (event.key === "Delete" || event.key === "Backspace") {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const highlightElement =
            range.commonAncestorContainer.parentElement?.closest(
              ".highlight-wrapper"
            );
          if (highlightElement) {
            const highlightId =
              highlightElement.getAttribute("data-highlight-id");
            if (highlightId) {
              removeHighlight(highlightId);
              applyHighlights();
            }
          }
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lessonId, activeHighlights]);

  const createHighlight = (range: Range, text: string) => {
    const colors = [
      "#fff59d",
      "#ffcc80",
      "#a5d6a7",
      "#90caf9",
      "#f8bbd9",
      "#d1c4e9",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Get element path for persistence
    const elementPath = getElementPath(range.commonAncestorContainer);

    const highlight: Omit<HighlightData, "id" | "timestamp"> = {
      text,
      lessonId,
      lessonTitle,
      color: randomColor,
      position: {
        start: range.startOffset,
        end: range.endOffset,
      },
      elementPath,
    };

    addHighlight(highlight);

    // Reapply all highlights to refresh the display
    setTimeout(() => applyHighlights(), 100);
  };

  const applyHighlights = () => {
    if (!contentRef.current) return;

    // Remove existing highlight wrappers
    const existingHighlights =
      contentRef.current.querySelectorAll(".highlight-wrapper");
    existingHighlights.forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize(); // Merge adjacent text nodes
      }
    });

    // Apply current highlights
    Array.from(activeHighlights.values()).forEach((highlight) => {
      try {
        applyHighlightToDOM(highlight);
      } catch (error) {
        console.warn("Failed to apply highlight:", highlight.id, error);
      }
    });
  };

  const applyHighlightToDOM = (highlight: HighlightData) => {
    if (!contentRef.current) return;

    // Find the target element using the stored path
    const targetElement = findElementByPath(highlight.elementPath);
    if (!targetElement) return;

    // Find text nodes that contain the highlighted text
    const walker = document.createTreeWalker(
      targetElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    // Find the text node that contains our highlight
    for (const textNode of textNodes) {
      const content = textNode.textContent || "";
      const index = content.indexOf(highlight.text);

      if (index !== -1) {
        // Split the text node and wrap the highlighted part
        const beforeText = content.substring(0, index);
        const highlightText = content.substring(
          index,
          index + highlight.text.length
        );
        const afterText = content.substring(index + highlight.text.length);

        const parent = textNode.parentNode;
        if (!parent) continue;

        // Create highlight wrapper
        const highlightSpan = document.createElement("span");
        highlightSpan.className = "highlight-wrapper ";
        highlightSpan.setAttribute("data-highlight-id", highlight.id);
        highlightSpan.style.backgroundColor = highlight.color;
        highlightSpan.style.padding = "2px 1px";
        highlightSpan.style.borderRadius = "2px";
        highlightSpan.textContent = highlightText;

        // Add click handler to remove highlight
        highlightSpan.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (confirm("Remove this highlight?")) {
            removeHighlight(highlight.id);
            applyHighlights();
          }
        });

        // Replace the original text node with the new structure
        if (beforeText) {
          parent.insertBefore(document.createTextNode(beforeText), textNode);
        }
        parent.insertBefore(highlightSpan, textNode);
        if (afterText) {
          parent.insertBefore(document.createTextNode(afterText), textNode);
        }
        parent.removeChild(textNode);

        break; // Only highlight first occurrence
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

  const findElementByPath = (path: string): Element | null => {
    if (!contentRef.current) return null;

    try {
      return contentRef.current.querySelector(path);
    } catch {
      return null;
    }
  };

  // This component doesn't render anything visible
  return null;
}
