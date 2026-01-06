import React from "react";

interface SyntaxHighlighterProps {
  code: string;
  language?: string;
}

export function SyntaxHighlighter({
  code,
  language = "javascript",
}: SyntaxHighlighterProps) {
  const highlightCode = (code: string) => {
    let highlighted = code;

    // Keywords
    const keywords = [
      "function",
      "const",
      "let",
      "var",
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "default",
      "break",
      "continue",
      "return",
      "try",
      "catch",
      "finally",
      "throw",
      "new",
      "this",
      "super",
      "class",
      "extends",
      "import",
      "export",
      "from",
      "as",
      "async",
      "await",
      "true",
      "false",
      "null",
      "undefined",
      "typeof",
      "instanceof",
      "in",
      "of",
      "delete",
      "void",
      "yield",
    ];

    // Replace keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: #0066cc; font-weight: bold;">${keyword}</span>`
      );
    });

    // Strings
    highlighted = highlighted.replace(
      /(['"`])(?:(?!\1)[^\\]|\\.)*\1/g,
      '<span style="color: #008000;">$&</span>'
    );

    // Numbers
    highlighted = highlighted.replace(
      /\b\d+(\.\d+)?\b/g,
      '<span style="color: #ff6600;">$&</span>'
    );

    // Comments
    highlighted = highlighted.replace(
      /\/\/.*$/gm,
      '<span style="color: #808080; font-style: italic;">$&</span>'
    );

    highlighted = highlighted.replace(
      /\/\*[\s\S]*?\*\//g,
      '<span style="color: #808080; font-style: italic;">$&</span>'
    );

    // Functions
    highlighted = highlighted.replace(
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      '<span style="color: #9900cc;">$1</span>'
    );

    return highlighted;
  };

  return (
    <div
      className="text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
    />
  );
}
