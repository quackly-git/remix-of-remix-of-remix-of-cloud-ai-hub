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
];

export const mockChapters: Chapter[] = [
  {
    id: "bio-u4-t5-ch1",
    title: "Photosynthesis",
    subjectId: "bio-u4-t5",
    progress: 0,
    lessons: [
      {
        id: "bio-u4-t5-ch1-les1",
        title: "Introduction to Photosynthesis",
        chapterId: "bio-u4-t5-ch1",
        completed: false,
        keywords: [
          { id: "kw1", word: "Photosynthesis" },
          { id: "kw2", word: "Chlorophyll" },
          { id: "kw3", word: "Light-dependent reaction" },
          { id: "kw4", word: "Light-independent reaction" },
          { id: "kw5", word: "ATP" },
        ],
        kw: [
          {
            id: "kw1",
            word: "Photosynthesis",
            definition:
              "Process by which plants convert light energy into chemical energy stored in glucose.",
          },
        ],
        learningObjectives: [
          {
            id: "obj1",
            text: "Understand the fundamental concepts of photosynthesis and its importance in plant biology.",
          },
          {
            id: "obj2",
            text: "Identify the key components required for photosynthesis (light, water, CO2, chlorophyll).",
          },
          {
            id: "obj3",
            text: "Explain the two main stages of photosynthesis: light-dependent and light-independent reactions.",
          },
        ],
        sections: [
          {
            id: "bio-u4-t5-ch1-les1-sec1",
            title: "Photosynthesis Overview",
            type: "text" as const,
            content: `Photosynthesis is the process by which green plants capture light energy and convert it into chemical energy stored in glucose molecules. 
**Key Concepts:**
- Chlorophyll absorbs light
- Water is split to release oxygen
- ATP and NADPH are produced
- Calvin cycle fixes carbon dioxide into sugars`,
            completed: false,
            links: [
              {
                title: "Khan Academy Photosynthesis",
                url: "https://www.khanacademy.org/science/biology/photosynthesis-in-plants",
              },
              {
                title: "Photosynthesis Video",
                url: "https://www.youtube.com/watch?v=UPBMG5EYydo",
              },
            ],
          },
          {
            id: "bio-u4-t5-ch1-les1-sec2",
            title: "Photosynthesis Diagram",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Photosynthesis_simple.svg/800px-Photosynthesis_simple.svg.png",
            completed: false,
          },
          {
            id: "bio-u4-t5-ch1-les1-sec3",
            title: "Photosynthesis Video Explanation",
            type: "video" as const,
            content: "/videos/photosynthesis_intro.mp4",
            poster: "https://i.ytimg.com/vi/UPBMG5EYydo/hqdefault.jpg",
            completed: false,
          },
          {
            id: "bio-u4-t5-ch1-les1-sec4",
            title: "Photosynthesis Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Photosynthesis Basics Quiz",
              questions: [
                {
                  id: "q1",
                  question: "What pigment absorbs light in photosynthesis?",
                  options: [
                    "Carotene",
                    "Chlorophyll",
                    "Xanthophyll",
                    "Melanin",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Chlorophyll is the primary pigment that absorbs light.",
                },
                {
                  id: "q2",
                  question: "Where does the Calvin cycle take place?",
                  options: ["Thylakoid", "Stroma", "Mitochondria", "Cytoplasm"],
                  correctAnswer: 1,
                  explanation:
                    "The Calvin cycle occurs in the stroma of chloroplasts.",
                },
              ],
            },
          },
          {
            id: "bio-u4-t5-ch1-les1-sec5",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "Photosynthesis",
                back: "Process converting light energy to chemical energy.",
              },
              {
                id: "fc2",
                front: "ATP",
                back: "Energy currency produced during light-dependent reactions.",
              },
              {
                id: "fc3",
                front: "Calvin Cycle",
                back: "Light-independent reactions that fix carbon into glucose.",
              },
            ],
          },
        ],
      },
    ],
  },
];
