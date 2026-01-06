import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EyeOff, Check, X, BookOpen } from "lucide-react";

interface Keyword {
  id: string;
  word: string;
  definition?: string;
}

interface KeywordsProps {
  keywords: Keyword[];
  title?: string;
  className?: string;
}

export function Keywords({
  keywords,
  title = "Key Terms",
  className = "",
}: KeywordsProps) {
  const [hiddenKeywords, setHiddenKeywords] = useState<Set<string>>(new Set());
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());

  const hideKeyword = (keywordId: string) => {
    setHiddenKeywords((prev) => new Set([...prev, keywordId]));
    setInputValues((prev) => ({ ...prev, [keywordId]: "" }));
    setCorrectAnswers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(keywordId);
      return newSet;
    });
  };

  const getInputColorClass = (keywordId: string, correctWord: string) => {
    const inputValue = inputValues[keywordId] || "";

    if (inputValue === "") {
      return "border-primary/60 bg-primary/20 dark:bg-primary/30 dark:border-primary/60";
    }

    if (inputValue.toLowerCase().trim() === correctWord.toLowerCase().trim()) {
      return "border-green-500 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300";
    }

    const isValidPrefix = correctWord
      .toLowerCase()
      .startsWith(inputValue.toLowerCase());

    if (isValidPrefix) {
      return "border-primary/60 bg-primary/10 dark:bg-primary/40 dark:border-primary/60";
    } else {
      return "border-red-500 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    }
  };

  const handleInputChange = (
    keywordId: string,
    value: string,
    correctWord: string
  ) => {
    setInputValues((prev) => ({ ...prev, [keywordId]: value }));

    if (value.toLowerCase().trim() === correctWord.toLowerCase().trim()) {
      setCorrectAnswers((prev) => new Set([...prev, keywordId]));
    } else {
      setCorrectAnswers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(keywordId);
        return newSet;
      });
    }
  };

  const resetKeyword = (keywordId: string) => {
    setHiddenKeywords((prev) => {
      const newSet = new Set(prev);
      newSet.delete(keywordId);
      return newSet;
    });
    setInputValues((prev) => {
      const newInputs = { ...prev };
      delete newInputs[keywordId];
      return newInputs;
    });
    setCorrectAnswers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(keywordId);
      return newSet;
    });
  };

  const cancelInput = (keywordId: string) => {
    resetKeyword(keywordId);
  };

  if (keywords.length === 0) return null;

  return (
    <div
      className={`keywords-section p-6 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-background dark:to-background rounded-lg border-l-4 border-primary ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {keywords.map((keyword, index) => {
          const isHidden = hiddenKeywords.has(keyword.id);
          const isCorrect = correctAnswers.has(keyword.id);
          const inputValue = inputValues[keyword.id] || "";

          if (isHidden) {
            return (
              <div key={keyword.id} className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    value={inputValue}
                    onChange={(e) =>
                      handleInputChange(
                        keyword.id,
                        e.target.value,
                        keyword.word
                      )
                    }
                    placeholder="Enter the term..."
                    className={`min-w-32 h-8 text-sm transition-colors ${getInputColorClass(
                      keyword.id,
                      keyword.word
                    )}`}
                    autoFocus
                  />
                </div>
                <div className="flex gap-1">
                  {isCorrect && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => resetKeyword(keyword.id)}
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900"
                      title="Confirm and reset"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelInput(keyword.id)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                    title="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          }

          const KeywordContent = (
            <Badge
              variant="secondary"
              className="relative group px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 dark:bg-primary/20 dark:hover:bg-primary/30 dark:border-primary/30"
            >
              {keyword.word}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => hideKeyword(keyword.id)}
                className={`ml-2 h-5 w-5 p-0 ${
                  index === 0 ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100 transition-opacity text-primary/70 hover:text-primary hover:bg-primary/20 dark:hover:bg-primary/30`}
                title="Hide term for practice"
              >
                <EyeOff className="h-3 w-3" />
              </Button>
            </Badge>
          );

          if (keyword.definition) {
            return (
              <HoverCard key={keyword.id}>
                <HoverCardTrigger asChild>{KeywordContent}</HoverCardTrigger>
                <HoverCardContent
                  className="w-80 p-4 dark:bg-muted dark:text-muted-foreground"
                  side="top"
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">
                      {keyword.word}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {keyword.definition}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          }

          return <div key={keyword.id}>{KeywordContent}</div>;
        })}
      </div>

      {hiddenKeywords.size > 0 && (
        <div className="mt-4 text-xs text-muted-foreground">
          💡 Type the hidden terms to practice. Green means correct, red means
          wrong input! Hover keywords to show the hide button :D
        </div>
      )}
    </div>
  );
}
