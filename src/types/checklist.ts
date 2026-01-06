export interface Tag {
  id: string;
  label: string;
  color: string;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: number;
}

export interface Objective {
  id: string;
  text: string;
  completed: boolean;
  emojiStatus?: "happy" | "neutral" | "sad" | null;
  tags: Tag[];
  comments: Comment[];
  hidden: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  objectives: Objective[];
  collapsed: boolean;
  hidden: boolean;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  collapsed: boolean;
  hidden: boolean;
}

export interface ChecklistSettings {
  strikeThrough: boolean;
  expandAll: boolean;
  collapseAll: boolean;
  emojiMode: boolean;
}

export interface ChecklistState {
  topics: Topic[];
  settings: ChecklistSettings;
}
