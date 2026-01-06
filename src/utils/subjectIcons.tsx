import {
  BookOpen,
  Calculator,
  Atom,
  Globe,
  Palette,
  Music,
  Activity,
  Code,
  PenTool,
  Languages,
  LucideIcon,
  Leaf,
  Dna,
} from "lucide-react";

// Map subject names to icons
const subjectIconMap: Record<string, LucideIcon> = {
  Mathematics: Calculator,
  Math: Calculator,
  Physics: Atom,
  Science: Atom,
  Chemistry: Atom,
  Biology: Activity,
  History: Globe,
  Geography: Globe,
  Art: Palette,
  Music: Music,
  Programming: Code,
  "IGCSE Computer Science": Code,
  "IGCSE Biology": Leaf,
  English: PenTool,
  Literature: BookOpen,
  Language: Languages,
  Languages: Languages,
  "T5: Energy Flow, Ecosystems & Environment": Leaf, // T5 topic
  "T6: Microbiology, Immunity & Forensics": Dna, // T6 topic
};

// Map subject names to colors
const subjectColorMap: Record<string, string> = {
  Mathematics: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
  Math: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
  Physics: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
  Science: "text-green-600 bg-green-100 dark:bg-green-900/30",
  Chemistry: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
  Biology: "text-teal-600 bg-teal-100 dark:bg-teal-900/30",
  History: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
  Geography: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30",
  Art: "text-pink-600 bg-pink-100 dark:bg-pink-900/30",
  Music: "text-violet-600 bg-violet-100 dark:bg-violet-900/30",
  Programming: "text-gray-600 bg-gray-100 dark:bg-gray-900/30",
  "IGCSE Computer Science": "text-slate-600 bg-slate-100 dark:bg-slate-900/30",
  English: "text-orange-600 bg-orange-100 dark:bg-orange-900/30",
  Literature: "text-red-600 bg-red-100 dark:bg-red-900/30",
  Language: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30",
  Languages: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30",
  "T5: Energy Flow, Ecosystems & Environment":
    "text-teal-600 bg-teal-100 dark:bg-teal-900/30", // T5 color
  "T6: Microbiology, Immunity & Forensics":
    "text-orange-500 bg-orange-100 dark:bg-orange-900/30", // T6 color
};

export function getSubjectIcon(subjectName: string): LucideIcon {
  if (subjectIconMap[subjectName]) {
    return subjectIconMap[subjectName];
  }
  const lowerName = subjectName.toLowerCase();
  for (const [key, icon] of Object.entries(subjectIconMap)) {
    if (
      lowerName.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lowerName)
    ) {
      return icon;
    }
  }
  return BookOpen;
}

export function getSubjectIconColor(subjectName: string): string {
  if (subjectColorMap[subjectName]) {
    return subjectColorMap[subjectName];
  }
  const lowerName = subjectName.toLowerCase();
  for (const [key, color] of Object.entries(subjectColorMap)) {
    if (
      lowerName.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lowerName)
    ) {
      return color;
    }
  }
  return "text-gray-600 bg-gray-100 dark:bg-gray-900/30";
}
