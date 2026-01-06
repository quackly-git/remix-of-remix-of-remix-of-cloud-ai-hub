export interface Subject {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  description: string;
  totalChapters: number;
  progress: number;
  estimatedHours: number;
  syllabus?: {
    introduction: string;
    image?: string;
    links: Array<{
      title: string;
      url: string;
    }>;
  };
}

export interface Chapter {
  id: string;
  title: string;
  subjectId: string;
  lessons: Lesson[];
  progress: number;
}
export interface Keyword {
  id: string;
  word: string;
  definition?: string;
  tags?: string[];
  comment?: string;
}
export interface Kw {
  id: string;
  word: string;
}
export interface LearningObjective {
  id: string;
  text: string;
}

export interface Lesson {
  id: string;
  title: string;
  chapterId: string;
  sections: Section[];
  completed: boolean;
  learningObjectives?: LearningObjective[];
  keywords?: Kw[];
  kw?: Keyword[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface ExaminerTip {
  id: string;
  type: "tip" | "warning" | "success" | "info";
  title: string;
  content: string;
}

export interface TableData {
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
  }>;
  data: Array<Record<string, any>>;
  searchable?: boolean;
}

export interface ChartData {
  type: "line" | "bar" | "area" | "pie";
  data: Array<Record<string, any>>;
  xKey: string;
  yKey: string;
  allowTypeSwitch?: boolean;
  colors?: string[];
}

export interface Quiz {
  title: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }>;
}

export interface Section {
  id: string;
  title: string;
  type:
    | "text"
    | "image"
    | "video"
    | "code"
    | "quiz"
    | "flashcard"
    | "activity"
    | "audio"
    | "examiner-tips"
    | "table"
    | "chart";
  content?: string;
  completed: boolean;
  links?: Array<{
    title: string;
    url: string;
  }>;
  poster?: string;
  flashcards?: Flashcard[];
  tips?: ExaminerTip[];
  quiz?: Quiz;
  tableData?: TableData;
  chartData?: ChartData;
}

export interface UserProgress {
  subjectId: string;
  chapterId: string;
  lessonId: string;
  sectionId: string;
  completedSections: string[];
  completedLessons: string[];
  lastAccessed: string;
}
