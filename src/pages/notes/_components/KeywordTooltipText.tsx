import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Keyword } from "@/types";

interface KeywordTooltipTextProps {
  content: string;
  keywords?: Keyword[];
  className?: string;
}

export function KeywordTooltipText({
  content,
  keywords = [],
  className = "",
}: KeywordTooltipTextProps) {
  if (!keywords || keywords.length === 0) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Create a map of keywords with definitions for quick lookup
  const keywordMap = new Map(
    keywords
      .filter((k) => k.definition) // Only include keywords with definitions
      .map((k) => [k.word.toLowerCase(), k])
  );

  if (keywordMap.size === 0) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Split content into parts and identify keywords
  const parts: Array<{ text: string; isKeyword: boolean; keyword?: Keyword }> =
    [];
  let currentIndex = 0;

  // Sort keywords by length (longest first) to avoid partial matches
  const sortedKeywords = Array.from(keywordMap.keys()).sort(
    (a, b) => b.length - a.length
  );

  while (currentIndex < content.length) {
    let foundKeyword = false;

    // Check for keywords starting at current position
    for (const keyword of sortedKeywords) {
      const remainingText = content.slice(currentIndex);
      const keywordRegex = new RegExp(`^${keyword}(?=\\s|[.,!?;:]|$)`, "i");
      const match = remainingText.match(keywordRegex);

      if (match) {
        const matchedText = match[0];
        parts.push({
          text: matchedText,
          isKeyword: true,
          keyword: keywordMap.get(keyword.toLowerCase()),
        });
        currentIndex += matchedText.length;
        foundKeyword = true;
        break;
      }
    }

    if (!foundKeyword) {
      // Find the next keyword or end of string
      let nextKeywordIndex = content.length;

      for (const keyword of sortedKeywords) {
        const keywordRegex = new RegExp(`\\b${keyword}(?=\\s|[.,!?;:]|$)`, "i");
        const match = keywordRegex.exec(content.slice(currentIndex));
        if (match && match.index !== undefined) {
          const absoluteIndex = currentIndex + match.index;
          if (absoluteIndex < nextKeywordIndex) {
            nextKeywordIndex = absoluteIndex;
          }
        }
      }

      const textPart = content.slice(currentIndex, nextKeywordIndex);
      if (textPart) {
        parts.push({
          text: textPart,
          isKeyword: false,
        });
      }
      currentIndex = nextKeywordIndex;
    }
  }

  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.isKeyword && part.keyword && part.keyword.definition) {
          return (
            <span key={index} className="inline-flex items-center gap-1">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span
                    className="underline decoration-dotted decoration-2 decoration-primary/70 underline-offset-4 cursor-help text-primary hover:text-primary/80 hover:decoration-primary/90 transition-all duration-200 font-medium"
                    style={{
                      textDecorationLine: "underline",
                      textDecorationStyle: "dotted",
                      textDecorationColor: "primary",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    {part.text}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4 shadow-lg border-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">
                      {part.text}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {part.keyword.definition}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </span>
          );
        }
        return (
          <span key={index} dangerouslySetInnerHTML={{ __html: part.text }} />
        );
      })}
    </div>
  );
}
