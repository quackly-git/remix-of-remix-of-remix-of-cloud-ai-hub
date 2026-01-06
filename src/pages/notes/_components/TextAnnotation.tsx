import { useState } from "react";
import { MessageCircle, Tag, X, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Annotation {
  id: string;
  text: string;
  tags: string[];
  comment: string;
  lessonId: string;
  timestamp: string;
  position: { start: number; end: number };
}

interface TextAnnotationProps {
  annotation: Annotation;
  onUpdateAnnotation: (annotation: Annotation) => void;
  onRemoveAnnotation: (id: string) => void;
}

const TAG_COLORS = {
  "important": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "revise again":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "done": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "question": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "example":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const PREDEFINED_TAGS = [
  "important",
  "revise again",
  "done",
  "question",
  "example",
];

export function TextAnnotation({
  annotation,
  onUpdateAnnotation,
  onRemoveAnnotation,
}: TextAnnotationProps) {
  // Component disabled - no annotation triggers will be rendered
  return null;
}
