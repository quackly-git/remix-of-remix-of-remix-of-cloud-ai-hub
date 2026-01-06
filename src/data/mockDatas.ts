import { Subject, Chapter, Lesson, Section } from "@/types";

export const mockSubjects: Subject[] = [
  {
    id: "bio-u4-t5",
    name: "U4 - Topic 5: Energy Flow, Ecosystems & Environment",
    code: "U4-T5",
    icon: "🌿",
    color: "#10b981",
    description:
      "Covers photosynthesis, ecosystems, and environmental biology (3 CPs, 26 lessons).",
    totalChapters: 3,
    progress: 0,
    estimatedHours: 40,
    syllabus: {
      introduction:
        "Includes Photosynthesis, Ecosystems, and Environmental Biology with Core Practicals 1–3.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      links: [
        { title: "Unit 4 Topic 5 Resources", url: "#" },
        { title: "Official Pearson Materials", url: "#" },
      ],
    },
  },
  {
    id: "bio-u4-t6",
    name: "U4 - Topic 6: Microbiology, Immunity & Forensics",
    code: "U4-T6",
    icon: "🧫",
    color: "#8b5cf6",
    description:
      "Covers microbiology, immunity, antibiotics, and forensics (2 CPs, 20 lessons).",
    totalChapters: 5,
    progress: 0,
    estimatedHours: 35,
    syllabus: {
      introduction:
        "Includes Microbiology, Immunity, Antibiotics, Decomposition & Decay, and Forensics with Core Practicals 4–5.",
      image:
        "https://images.unsplash.com/photo-1581091012184-5c7b9a927e9d?w=800&h=400&fit=crop",
      links: [
        { title: "Unit 4 Topic 6 Resources", url: "#" },
        { title: "Official Pearson Materials", url: "#" },
      ],
    },
  },
];

export const mockChapters: Chapter[] = [
  //   {
  //     id: "1-1",
  //     title: "Introduction to Calculus",
  //     subjectId: "math-101",
  //     progress: 70,
  //     lessons: [
  //       {
  //         id: "lesson-1-1",
  //         title: "Limits and Continuity",
  //         chapterId: "1-1",
  //         completed: false,
  //         keywords: [
  //           {
  //             id: "kw-1",
  //             word: "Variable",
  //           },
  //           {
  //             id: "kw-2",
  //             word: "Coefficient",
  //           },
  //           {
  //             id: "kw-3",
  //             word: "linear equation",
  //           },
  //           {
  //             id: "kw-4",
  //             word: "algebraic expression",
  //           },
  //           {
  //             id: "kw-5",
  //             word: "inverse operations",
  //           },
  //           {
  //             id: "kw-6",
  //             word: "equation",
  //           },
  //           {
  //             id: "kw-7",
  //             word: "term",
  //           },
  //         ],
  //         kw: [
  //           {
  //             id: "kw-1",
  //             word: "Calculus",
  //             definition:
  //               "A symbol (usually a letter) that represents an unknown number or value in mathematical expressions and equations.",
  //           },
  //         ],
  //         learningObjectives: [
  //           {
  //             id: "obj-1",
  //             text: "Understand the fundamental concepts of photosynthesis and its importance in plant biology",
  //           },
  //           {
  //             id: "obj-2",
  //             text: "Identify the key components required for photosynthesis (light, water, carbon dioxide, chlorophyll)",
  //           },
  //           {
  //             id: "obj-3",
  //             text: "Explain the two main stages of photosynthesis: light-dependent and light-independent reactions",
  //           },
  //           {
  //             id: "obj-4",
  //             text: "Analyze how environmental factors affect the rate of photosynthesis",
  //           },
  //         ],
  //         sections: [
  //           {
  //             id: "section-1-1-1",
  //             title: "Understanding Limits",
  //             type: "text" as const,
  //             content: `**Limits** are fundamental to Variable. A limit describes the value that a function approaches as the input approaches some value.
  // For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.
  // **Key Properties of Limits:**
  // - The limit of a sum is the sum of limits
  // - The limit of a product is the product of limits
  // - **Important:** These properties only hold when the individual limits exist
  // [Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
  // [MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
  //             completed: false,
  //             links: [
  //               {
  //                 title: "Interactive Limit Calculator",
  //                 url: "https://www.desmos.com/calculator",
  //               },
  //               {
  //                 title: "Limit Examples",
  //                 url: "https://www.wolfram.com/mathematica/",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-2",
  //             title: "Limit Visualization",
  //             type: "image" as const,
  //             content:
  //               "https://images.unsplash.com/photo-1743397015934-3aa9c6199baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-2-1",
  //             title: "Understanding Limits",
  //             type: "text" as const,
  //             content: `**Limits** are fundamental to calculus. A limit describes the value that a function approaches as the input approaches some value.
  // For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.
  // **Key Properties of Limits:**
  // - The limit of a sum is the sum of limits
  // - The limit of a product is the product of limits
  // - **Important:** These properties only hold when the individual limits exist
  // [Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
  // [MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-3",
  //             title: "Calculus Video Lecture",
  //             type: "video" as const,
  //             content: "/Periodi.mp4",
  //             poster:
  //               "https://i.ytimg.com/vi/7cEtOHLZQ2A/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgWShlMA8=&rs=AOn4CLAUp4UdwxwqIdhubFIWmqPMbLT7PQ",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-4",
  //             title: "Audio Explanation",
  //             type: "audio" as const,
  //             content: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-5",
  //             title: "Limit Calculation Code",
  //             type: "code" as const,
  //             content: `def calculate_limit(func, x, approach_value, epsilon=0.0001):
  //     """
  //     Calculate the limit of a function as x approaches a value
  //     """
  //     left_values = []
  //     right_values = []
  //     for i in range(1, 1000):
  //         h = epsilon / i
  //         left_val = func(approach_value - h)
  //         right_val = func(approach_value + h)
  //         left_values.append(left_val)
  //         right_values.append(right_val)
  //     return {
  //         'left_limit': left_values[-1],
  //         'right_limit': right_values[-1],
  //         'limit_exists': abs(left_values[-1] - right_values[-1]) < epsilon
  //     }
  // # Example usage
  // def f(x):
  //     return x**2
  // result = calculate_limit(f, 0, 2)
  // print(f"Limit as x approaches 2: {result}")`,
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-6",
  //             title: "Limits Quiz",
  //             type: "quiz" as const,
  //             completed: false,
  //             quiz: {
  //               title: "Limits and Continuity Quiz",
  //               questions: [
  //                 {
  //                   id: "q1",
  //                   question: "What is the limit of f(x) = x² as x approaches 3?",
  //                   options: ["6", "9", "12", "15"],
  //                   correctAnswer: 1,
  //                   explanation: "When x approaches 3, x² approaches 3² = 9",
  //                 },
  //                 {
  //                   id: "q2",
  //                   question: "A function is continuous at x = a if:",
  //                   options: [
  //                     "The function is defined at x = a",
  //                     "The limit exists at x = a",
  //                     "The limit equals the function value at x = a",
  //                     "All of the above",
  //                   ],
  //                   correctAnswer: 3,
  //                   explanation:
  //                     "Continuity requires the function to be defined, the limit to exist, and both to be equal",
  //                 },
  //               ],
  //             },
  //           },
  //           {
  //             id: "section-1-1-7",
  //             title: "Key Concepts Flashcards",
  //             type: "flashcard" as const,
  //             completed: false,
  //             flashcards: [
  //               {
  //                 id: "fc1",
  //                 front: "What is a limit?",
  //                 back: "A  describes the value that a function approaches as the input approaches some value",
  //               },
  //               {
  //                 id: "fc2",
  //                 front: "What does continuity mean?",
  //                 back: "A function is continuous at a point if the limit exists and equals the function value at that point",
  //               },
  //               {
  //                 id: "fc3",
  //                 front: "Limit of a constant",
  //                 back: "The limit of a constant function is the constant itself",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-8",
  //             title: "Examiner Tips",
  //             type: "examiner-tips" as const,
  //             completed: false,
  //             tips: [
  //               {
  //                 id: "tip1",
  //                 type: "tip",
  //                 title: "Common Mistake",
  //                 content:
  //                   "Remember that a limit can exist even if the function is not defined at that point!",
  //               },
  //               {
  //                 id: "tip2",
  //                 type: "warning",
  //                 title: "Division by Zero",
  //                 content:
  //                   "When you encounter 0/0, don't panic! This is an indeterminate form that requires special techniques.",
  //               },
  //               {
  //                 id: "tip3",
  //                 type: "success",
  //                 title: "Quick Check",
  //                 content:
  //                   "Always verify your limit by approaching from both left and right sides.",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-9",
  //             title: "Limit Values Comparison",
  //             type: "table" as const,
  //             completed: false,
  //             tableData: {
  //               columns: [
  //                 { key: "function", label: "Function", sortable: true },
  //                 { key: "approach", label: "x approaches", sortable: true },
  //                 { key: "limit", label: "Limit Value", sortable: true },
  //                 { key: "method", label: "Method Used", sortable: false },
  //               ],
  //               data: [
  //                 {
  //                   function: "x²",
  //                   approach: "2",
  //                   limit: "4",
  //                   method: "Direct substitution",
  //                 },
  //                 {
  //                   function: "(x²-1)/(x-1)",
  //                   approach: "1",
  //                   limit: "2",
  //                   method: "Factoring",
  //                 },
  //                 {
  //                   function: "sin(x)/x",
  //                   approach: "0",
  //                   limit: "1",
  //                   method: "L'Hôpital's rule",
  //                 },
  //                 {
  //                   function: "1/x",
  //                   approach: "∞",
  //                   limit: "0",
  //                   method: "Infinite limits",
  //                 },
  //               ],
  //               searchable: true,
  //             },
  //           },
  //           {
  //             id: "section-1-1-10",
  //             title: "Function Behavior Chart",
  //             type: "chart" as const,
  //             completed: false,
  //             chartData: {
  //               type: "line",
  //               data: [
  //                 { x: -2, y: 4, function: "x²" },
  //                 { x: -1, y: 1, function: "x²" },
  //                 { x: 0, y: 0, function: "x²" },
  //                 { x: 1, y: 1, function: "x²" },
  //                 { x: 2, y: 4, function: "x²" },
  //                 { x: 3, y: 9, function: "x²" },
  //               ],
  //               xKey: "x",
  //               yKey: "y",
  //               allowTypeSwitch: true,
  //               colors: [
  //                 "hsl(var(--primary))",
  //                 "#3b82f6",
  //                 "#10b981",
  //                 "#f59e0b",
  //                 "#ef4444",
  //                 "#8b5cf6",
  //               ],
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         id: "lesson-1-2",
  //         title: "Limits Basics",
  //         chapterId: "1-1",
  //         completed: false,
  //         keywords: [
  //           {
  //             id: "kw-1",
  //             word: "Variable",
  //           },
  //           {
  //             id: "kw-2",
  //             word: "Coefficient",
  //           },
  //           {
  //             id: "kw-3",
  //             word: "linear equation",
  //           },
  //           {
  //             id: "kw-4",
  //             word: "algebraic expression",
  //           },
  //           {
  //             id: "kw-5",
  //             word: "inverse operations",
  //           },
  //           {
  //             id: "kw-6",
  //             word: "equation",
  //           },
  //           {
  //             id: "kw-7",
  //             word: "term",
  //           },
  //         ],
  //         kw: [
  //           {
  //             id: "kw-1",
  //             word: "Calculus",
  //             definition:
  //               "A symbol (usually a letter) that represents an unknown number or value in mathematical expressions and equations.",
  //           },
  //         ],
  //         learningObjectives: [],
  //         sections: [
  //           {
  //             id: "section-1-1-1",
  //             title: "Understanding Limits",
  //             type: "text" as const,
  //             content: `**Limits** are fundamental to Variable. A limit describes the value that a function approaches as the input approaches some value.
  // For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.
  // **Key Properties of Limits:**
  // - The limit of a sum is the sum of limits
  // - The limit of a product is the product of limits
  // - **Important:** These properties only hold when the individual limits exist
  // [Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
  // [MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
  //             completed: false,
  //             links: [
  //               {
  //                 title: "Interactive Limit Calculator",
  //                 url: "https://www.desmos.com/calculator",
  //               },
  //               {
  //                 title: "Limit Examples",
  //                 url: "https://www.wolfram.com/mathematica/",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-2",
  //             title: "Limit Visualization",
  //             type: "image" as const,
  //             content:
  //               "https://images.unsplash.com/photo-1743397015934-3aa9c6199baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-2-1",
  //             title: "Understanding Limits",
  //             type: "text" as const,
  //             content: `**Limits** are fundamental to calculus. A limit describes the value that a function approaches as the input approaches some value.
  // For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.
  // **Key Properties of Limits:**
  // - The limit of a sum is the sum of limits
  // - The limit of a product is the product of limits
  // - **Important:** These properties only hold when the individual limits exist
  // [Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
  // [MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-3",
  //             title: "Calculus Video Lecture",
  //             type: "video" as const,
  //             content: "/Periodi.mp4",
  //             poster:
  //               "https://i.ytimg.com/vi/7cEtOHLZQ2A/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgWShlMA8=&rs=AOn4CLAUp4UdwxwqIdhubFIWmqPMbLT7PQ",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-4",
  //             title: "Audio Explanation",
  //             type: "audio" as const,
  //             content: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-5",
  //             title: "Limit Calculation Code",
  //             type: "code" as const,
  //             content: `def calculate_limit(func, x, approach_value, epsilon=0.0001):
  //     """
  //     Calculate the limit of a function as x approaches a value
  //     """
  //     left_values = []
  //     right_values = []
  //     for i in range(1, 1000):
  //         h = epsilon / i
  //         left_val = func(approach_value - h)
  //         right_val = func(approach_value + h)
  //         left_values.append(left_val)
  //         right_values.append(right_val)
  //     return {
  //         'left_limit': left_values[-1],
  //         'right_limit': right_values[-1],
  //         'limit_exists': abs(left_values[-1] - right_values[-1]) < epsilon
  //     }
  // # Example usage
  // def f(x):
  //     return x**2
  // result = calculate_limit(f, 0, 2)
  // print(f"Limit as x approaches 2: {result}")`,
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-6",
  //             title: "Limits Quiz",
  //             type: "quiz" as const,
  //             completed: false,
  //             quiz: {
  //               title: "Limits and Continuity Quiz",
  //               questions: [
  //                 {
  //                   id: "q1",
  //                   question: "What is the limit of f(x) = x² as x approaches 3?",
  //                   options: ["6", "9", "12", "15"],
  //                   correctAnswer: 1,
  //                   explanation: "When x approaches 3, x² approaches 3² = 9",
  //                 },
  //                 {
  //                   id: "q2",
  //                   question: "A function is continuous at x = a if:",
  //                   options: [
  //                     "The function is defined at x = a",
  //                     "The limit exists at x = a",
  //                     "The limit equals the function value at x = a",
  //                     "All of the above",
  //                   ],
  //                   correctAnswer: 3,
  //                   explanation:
  //                     "Continuity requires the function to be defined, the limit to exist, and both to be equal",
  //                 },
  //               ],
  //             },
  //           },
  //           {
  //             id: "section-1-1-7",
  //             title: "Key Concepts Flashcards",
  //             type: "flashcard" as const,
  //             completed: false,
  //             flashcards: [
  //               {
  //                 id: "fc1",
  //                 front: "What is a limit?",
  //                 back: "A  describes the value that a function approaches as the input approaches some value",
  //               },
  //               {
  //                 id: "fc2",
  //                 front: "What does continuity mean?",
  //                 back: "A function is continuous at a point if the limit exists and equals the function value at that point",
  //               },
  //               {
  //                 id: "fc3",
  //                 front: "Limit of a constant",
  //                 back: "The limit of a constant function is the constant itself",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-8",
  //             title: "Examiner Tips",
  //             type: "examiner-tips" as const,
  //             completed: false,
  //             tips: [
  //               {
  //                 id: "tip1",
  //                 type: "tip",
  //                 title: "Common Mistake",
  //                 content:
  //                   "Remember that a limit can exist even if the function is not defined at that point!",
  //               },
  //               {
  //                 id: "tip2",
  //                 type: "warning",
  //                 title: "Division by Zero",
  //                 content:
  //                   "When you encounter 0/0, don't panic! This is an indeterminate form that requires special techniques.",
  //               },
  //               {
  //                 id: "tip3",
  //                 type: "success",
  //                 title: "Quick Check",
  //                 content:
  //                   "Always verify your limit by approaching from both left and right sides.",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-9",
  //             title: "Limit Values Comparison",
  //             type: "table" as const,
  //             completed: false,
  //             tableData: {
  //               columns: [
  //                 { key: "function", label: "Function", sortable: true },
  //                 { key: "approach", label: "x approaches", sortable: true },
  //                 { key: "limit", label: "Limit Value", sortable: true },
  //                 { key: "method", label: "Method Used", sortable: false },
  //               ],
  //               data: [
  //                 {
  //                   function: "x²",
  //                   approach: "2",
  //                   limit: "4",
  //                   method: "Direct substitution",
  //                 },
  //                 {
  //                   function: "(x²-1)/(x-1)",
  //                   approach: "1",
  //                   limit: "2",
  //                   method: "Factoring",
  //                 },
  //                 {
  //                   function: "sin(x)/x",
  //                   approach: "0",
  //                   limit: "1",
  //                   method: "L'Hôpital's rule",
  //                 },
  //                 {
  //                   function: "1/x",
  //                   approach: "∞",
  //                   limit: "0",
  //                   method: "Infinite limits",
  //                 },
  //               ],
  //               searchable: true,
  //             },
  //           },
  //           {
  //             id: "section-1-1-10",
  //             title: "Function Behavior Chart",
  //             type: "chart" as const,
  //             completed: false,
  //             chartData: {
  //               type: "line",
  //               data: [
  //                 { x: -2, y: 4, function: "x²" },
  //                 { x: -1, y: 1, function: "x²" },
  //                 { x: 0, y: 0, function: "x²" },
  //                 { x: 1, y: 1, function: "x²" },
  //                 { x: 2, y: 4, function: "x²" },
  //                 { x: 3, y: 9, function: "x²" },
  //               ],
  //               xKey: "x",
  //               yKey: "y",
  //               allowTypeSwitch: true,
  //               colors: [
  //                 "hsl(var(--primary))",
  //                 "#3b82f6",
  //                 "#10b981",
  //                 "#f59e0b",
  //                 "#ef4444",
  //                 "#8b5cf6",
  //               ],
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: "1-2",
  //     title: "Calculus Basics",
  //     subjectId: "math-101",
  //     progress: 70,
  //     lessons: [
  //       {
  //         id: "lesson-2-1",
  //         title: "Important terms",
  //         chapterId: "1-1",
  //         completed: false,
  //         keywords: [
  //           {
  //             id: "kw-1",
  //             word: "Variable",
  //           },
  //           {
  //             id: "kw-2",
  //             word: "Coefficient",
  //           },
  //           {
  //             id: "kw-3",
  //             word: "linear equation",
  //           },
  //           {
  //             id: "kw-4",
  //             word: "algebraic expression",
  //           },
  //           {
  //             id: "kw-5",
  //             word: "inverse operations",
  //           },
  //           {
  //             id: "kw-6",
  //             word: "equation",
  //           },
  //           {
  //             id: "kw-7",
  //             word: "term",
  //           },
  //         ],
  //         kw: [
  //           {
  //             id: "kw-1",
  //             word: "Calculus",
  //             definition:
  //               "A symbol (usually a letter) that represents an unknown number or value in mathematical expressions and equations.",
  //           },
  //         ],
  //         learningObjectives: [],
  //         sections: [
  //           {
  //             id: "section-1-1-1",
  //             title: "Understanding Limits",
  //             type: "text" as const,
  //             content: `**Limits** are fundamental to Variable. A limit describes the value that a function approaches as the input approaches some value.
  // For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.
  // **Key Properties of Limits:**
  // - The limit of a sum is the sum of limits
  // - The limit of a product is the product of limits
  // - **Important:** These properties only hold when the individual limits exist
  // [Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
  // [MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
  //             completed: false,
  //             links: [
  //               {
  //                 title: "Interactive Limit Calculator",
  //                 url: "https://www.desmos.com/calculator",
  //               },
  //               {
  //                 title: "Limit Examples",
  //                 url: "https://www.wolfram.com/mathematica/",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-2",
  //             title: "Limit Visualization",
  //             type: "image" as const,
  //             content:
  //               "https://images.unsplash.com/photo-1743397015934-3aa9c6199baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-2-1",
  //             title: "Understanding Limits",
  //             type: "text" as const,
  //             content: `**Limits** are fundamental to calculus. A limit describes the value that a function approaches as the input approaches some value.
  // For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.
  // **Key Properties of Limits:**
  // - The limit of a sum is the sum of limits
  // - The limit of a product is the product of limits
  // - **Important:** These properties only hold when the individual limits exist
  // [Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
  // [MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-3",
  //             title: "Calculus Video Lecture",
  //             type: "video" as const,
  //             content: "/Periodi.mp4",
  //             poster:
  //               "https://i.ytimg.com/vi/7cEtOHLZQ2A/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgWShlMA8=&rs=AOn4CLAUp4UdwxwqIdhubFIWmqPMbLT7PQ",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-4",
  //             title: "Audio Explanation",
  //             type: "audio" as const,
  //             content: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-5",
  //             title: "Limit Calculation Code",
  //             type: "code" as const,
  //             content: `def calculate_limit(func, x, approach_value, epsilon=0.0001):
  //     """
  //     Calculate the limit of a function as x approaches a value
  //     """
  //     left_values = []
  //     right_values = []
  //     for i in range(1, 1000):
  //         h = epsilon / i
  //         left_val = func(approach_value - h)
  //         right_val = func(approach_value + h)
  //         left_values.append(left_val)
  //         right_values.append(right_val)
  //     return {
  //         'left_limit': left_values[-1],
  //         'right_limit': right_values[-1],
  //         'limit_exists': abs(left_values[-1] - right_values[-1]) < epsilon
  //     }
  // # Example usage
  // def f(x):
  //     return x**2
  // result = calculate_limit(f, 0, 2)
  // print(f"Limit as x approaches 2: {result}")`,
  //             completed: false,
  //           },
  //           {
  //             id: "section-1-1-6",
  //             title: "Limits Quiz",
  //             type: "quiz" as const,
  //             completed: false,
  //             quiz: {
  //               title: "Limits and Continuity Quiz",
  //               questions: [
  //                 {
  //                   id: "q1",
  //                   question: "What is the limit of f(x) = x² as x approaches 3?",
  //                   options: ["6", "9", "12", "15"],
  //                   correctAnswer: 1,
  //                   explanation: "When x approaches 3, x² approaches 3² = 9",
  //                 },
  //                 {
  //                   id: "q2",
  //                   question: "A function is continuous at x = a if:",
  //                   options: [
  //                     "The function is defined at x = a",
  //                     "The limit exists at x = a",
  //                     "The limit equals the function value at x = a",
  //                     "All of the above",
  //                   ],
  //                   correctAnswer: 3,
  //                   explanation:
  //                     "Continuity requires the function to be defined, the limit to exist, and both to be equal",
  //                 },
  //               ],
  //             },
  //           },
  //           {
  //             id: "section-1-1-7",
  //             title: "Key Concepts Flashcards",
  //             type: "flashcard" as const,
  //             completed: false,
  //             flashcards: [
  //               {
  //                 id: "fc1",
  //                 front: "What is a limit?",
  //                 back: "A  describes the value that a function approaches as the input approaches some value",
  //               },
  //               {
  //                 id: "fc2",
  //                 front: "What does continuity mean?",
  //                 back: "A function is continuous at a point if the limit exists and equals the function value at that point",
  //               },
  //               {
  //                 id: "fc3",
  //                 front: "Limit of a constant",
  //                 back: "The limit of a constant function is the constant itself",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-8",
  //             title: "Examiner Tips",
  //             type: "examiner-tips" as const,
  //             completed: false,
  //             tips: [
  //               {
  //                 id: "tip1",
  //                 type: "tip",
  //                 title: "Common Mistake",
  //                 content:
  //                   "Remember that a limit can exist even if the function is not defined at that point!",
  //               },
  //               {
  //                 id: "tip2",
  //                 type: "warning",
  //                 title: "Division by Zero",
  //                 content:
  //                   "When you encounter 0/0, don't panic! This is an indeterminate form that requires special techniques.",
  //               },
  //               {
  //                 id: "tip3",
  //                 type: "success",
  //                 title: "Quick Check",
  //                 content:
  //                   "Always verify your limit by approaching from both left and right sides.",
  //               },
  //             ],
  //           },
  //           {
  //             id: "section-1-1-9",
  //             title: "Limit Values Comparison",
  //             type: "table" as const,
  //             completed: false,
  //             tableData: {
  //               columns: [
  //                 { key: "function", label: "Function", sortable: true },
  //                 { key: "approach", label: "x approaches", sortable: true },
  //                 { key: "limit", label: "Limit Value", sortable: true },
  //                 { key: "method", label: "Method Used", sortable: false },
  //               ],
  //               data: [
  //                 {
  //                   function: "x²",
  //                   approach: "2",
  //                   limit: "4",
  //                   method: "Direct substitution",
  //                 },
  //                 {
  //                   function: "(x²-1)/(x-1)",
  //                   approach: "1",
  //                   limit: "2",
  //                   method: "Factoring",
  //                 },
  //                 {
  //                   function: "sin(x)/x",
  //                   approach: "0",
  //                   limit: "1",
  //                   method: "L'Hôpital's rule",
  //                 },
  //                 {
  //                   function: "1/x",
  //                   approach: "∞",
  //                   limit: "0",
  //                   method: "Infinite limits",
  //                 },
  //               ],
  //               searchable: true,
  //             },
  //           },
  //           {
  //             id: "section-1-1-10",
  //             title: "Function Behavior Chart",
  //             type: "chart" as const,
  //             completed: false,
  //             chartData: {
  //               type: "line",
  //               data: [
  //                 { x: -2, y: 4, function: "x²" },
  //                 { x: -1, y: 1, function: "x²" },
  //                 { x: 0, y: 0, function: "x²" },
  //                 { x: 1, y: 1, function: "x²" },
  //                 { x: 2, y: 4, function: "x²" },
  //                 { x: 3, y: 9, function: "x²" },
  //               ],
  //               xKey: "x",
  //               yKey: "y",
  //               allowTypeSwitch: true,
  //               colors: [
  //                 "hsl(var(--primary))",
  //                 "#3b82f6",
  //                 "#10b981",
  //                 "#f59e0b",
  //                 "#ef4444",
  //                 "#8b5cf6",
  //               ],
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // {
  //   id: "2-1",
  //   title: "Characteristics and Classification of Living Organisms",
  //   subjectId: "0970/0610",
  //   progress: 0,
  //   lessons: [
  //     {
  //       id: "lesson-2-1",
  //       title: "Characteristics and Classification",
  //       chapterId: "2-1",
  //       completed: false,
  //       keywords: [
  //         { id: "bio-kw-1", word: "MRS GREN" },
  //         { id: "bio-kw-2", word: "Binomial System" },
  //         { id: "bio-kw-3", word: "Classification" },
  //         { id: "bio-kw-4", word: "Species" },
  //         { id: "bio-kw-5", word: "DNA Sequencing" },
  //       ],
  //       kw: [],
  //       learningObjectives: [
  //         {
  //           id: "bio-obj-1",
  //           text: "Understand the 7 characteristics of living organisms (MRS GREN)",
  //         },
  //         {
  //           id: "bio-obj-2",
  //           text: "Define a species and describe how organisms are classified",
  //         },
  //         { id: "bio-obj-3", text: "Explain the binomial naming system" },
  //         {
  //           id: "bio-obj-4",
  //           text: "Describe how DNA sequencing is used in classification (🔷 Extended Tier Only)",
  //         },
  //       ],
  //       sections: [
  //         {
  //           id: "section-2-1-1",
  //           title: "Characteristics of Living Organisms",
  //           type: "text",
  //           completed: false,
  //           content: `Living organisms share 7 fundamental characteristics remembered by the acronym **MRS GREN**:
  // - **Movement**: action by an organism causing a change of position
  // - **Respiration**: chemical reactions that release energy from nutrients
  // - **Sensitivity**: detecting and responding to stimuli
  // - **Growth**: permanent increase in size and mass
  // - **Reproduction**: producing offspring
  // - **Excretion**: removal of toxic waste products
  // - **Nutrition**: taking in materials for energy and growth`,
  //         },
  //         {
  //           id: "section-2-1-2",
  //           title: "How Organisms Are Classified",
  //           type: "text",
  //           completed: false,
  //           content: `Organisms are grouped based on shared features. A **species** is a group that can reproduce to produce fertile offspring.
  // We classify organisms using the following hierarchy:
  // **Kingdom → Phylum → Class → Order → Family → Genus → Species**
  // Use this mnemonic: **KING PHILIP CAME OVER FOR GRAN’S SPAGHETTI**.`,
  //         },
  //         {
  //           id: "section-2-1-3",
  //           title: "The Binomial System",
  //           type: "text",
  //           completed: false,
  //           content: `Devised by **Linnaeus**, this naming system gives each species a Latin name:
  // - First part: **Genus** (capitalized)
  // - Second part: **species** (lowercase)
  // Example: *Homo sapiens*
  // This system is universal to prevent naming confusion.`,
  //         },
  //         {
  //           id: "section-2-1-4",
  //           title: "Reflecting Evolutionary Relationships",
  //           type: "text",
  //           completed: false,
  //           content: `**🔷 Extended Tier Only**
  // Traditional classification used physical features to group species.
  // However, this can be misleading — two unrelated species might look similar due to convergent evolution.
  // Modern classification includes evidence from:
  // - **DNA sequencing**
  // - **Protein structure**
  // - **Embryology**
  // - **Fossil records**
  // This helps reflect **evolutionary relationships** more accurately.`,
  //         },
  //       ],
  //     },
  //     {
  //       id: "lesson-2-2",
  //       title: "Features of Organisms",
  //       chapterId: "2-1",
  //       completed: false,
  //       keywords: [
  //         { id: "bio-kw-6", word: "Kingdom" },
  //         { id: "bio-kw-7", word: "Vertebrate" },
  //         { id: "bio-kw-8", word: "Invertebrate" },
  //         { id: "bio-kw-9", word: "Arthropod" },
  //         { id: "bio-kw-10", word: "Monocotyledon" },
  //         { id: "bio-kw-11", word: "Dicotyledon" },
  //         { id: "bio-kw-12", word: "Virus" },
  //       ],
  //       kw: [],
  //       learningObjectives: [],
  //       sections: [
  //         {
  //           id: "section-2-1-5",
  //           title: "The Five Kingdoms",
  //           type: "text",
  //           completed: false,
  //           content: `Living organisms are first classified into **five kingdoms**:
  //     - **Animals** – Multicellular, no chloroplasts, feed on organic substances
  //     - **Plants** – Multicellular, chloroplasts, photosynthesis
  //     - **Fungi** – Usually multicellular, saprophytic/parasitic feeding
  //     - **Protoctists** – Mostly unicellular, some photosynthesize, others feed
  //     - **Prokaryotes** – Unicellular, no nucleus
  //     Each kingdom has distinct **cell structures** and **nutrition methods**.`,
  //         },
  //         {
  //           id: "section-2-1-6",
  //           title: "Vertebrates and Invertebrates",
  //           type: "text",
  //           completed: false,
  //           content: `Animals can be divided into:
  //     - **Vertebrates** – Have a backbone
  //       - 5 classes: mammals, birds, reptiles, amphibians, fish
  //     - **Invertebrates** – No backbone
  //       - Most with jointed legs are **arthropods**
  //     **Arthropods** include:
  //     - Insects – 3 body parts, 6 legs
  //     - Arachnids – 8 legs, 2 body parts
  //     - Crustaceans – 2 pairs of antennae
  //     - Myriapods – Many legs
  //     Arthropods have **segmented bodies** and **exoskeletons**.`,
  //         },
  //         {
  //           id: "section-2-1-7",
  //           title: "Examiner Tip: Group Features vs Defining Features",
  //           type: "examiner-tips",
  //           completed: false,
  //           tips: [
  //             {
  //               id: "tip4",
  //               type: "tip",
  //               title: "Feature Types",
  //               content:
  //                 "Be clear on whether a question asks for a *main feature* (common across the group) or a *defining feature* (unique to that group).",
  //             },
  //             {
  //               id: "tip5",
  //               type: "success",
  //               title: "Examples Help",
  //               content:
  //                 "Example: All arthropods have segmented bodies — but only crustaceans have 2 pairs of antennae.",
  //             },
  //           ],
  //         },
  //         {
  //           id: "section-2-1-8",
  //           title: "Plant Kingdom – Extended",
  //           type: "text",
  //           completed: false,
  //           content: `The plant kingdom includes **ferns** and **flowering plants**:
  //     - **Ferns** – Have fronds, reproduce by spores
  //     - **Flowering plants** – Reproduce by flowers/seeds
  //     Flowering plants can be:
  //     - **Monocotyledons** – Narrow leaves, parallel veins, petals in 3s (e.g. wheat)
  //     - **Dicotyledons** – Broad leaves, reticulated veins, petals in 4s or 5s (e.g. sunflowers)`,
  //         },
  //         {
  //           id: "section-2-1-9",
  //           title: "Viruses – Extended",
  //           type: "text",
  //           completed: false,
  //           content: `Viruses are **not classified** in the five kingdoms because they are **not living**.
  //     - Cannot perform life processes independently
  //     - Reproduce only inside host cells
  //     - Made of genetic material in a protein coat
  //     Examples: HIV, Influenza, Tobacco Mosaic Virus`,
  //         },
  //       ],
  //     },
  //   ],
  // },
];
