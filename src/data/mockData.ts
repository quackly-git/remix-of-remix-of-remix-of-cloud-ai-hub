import { Subject, Chapter, Lesson, Section } from "@/types";

export const mockSubjects: Subject[] = [
  {
    id: "bio-t5",
    name: "T5: Energy Flow, Ecosystems & Environment",
    code: "WBI4",
    icon: "🌿",
    color: "#16a34a",
    description:
      "Core biological principles on energy transfer, ecosystems and environmental interactions.",
    totalChapters: 3,
    progress: 0,
    estimatedHours: 12,
    syllabus: {
      introduction:
        "This course explores energy flow in biological systems, ecological relationships, and human impact on environmental stability, including climate-linked biological responses.",
      image:
        "https://easydrawingguides.com/wp-content/uploads/2023/01/how-to-draw-biodiversity-featured-image-1200.png",
      links: [
        {
          title: "Specification PDF",
          url: "https://drive.google.com/file/u/0/d/1sGtM7dLBFpcdtX1liaWrEvTJYMhXoX5n/view?usp=sharing&pli=1",
        },
      ],
    },
  },
  {
    id: "bio-t6",
    name: "T6: Microbiology, Immunity & Forensics",
    code: "WBI4",
    icon: "🧬",
    color: "#f97316",
    description:
      "Explores microbiology techniques, human immunity, antibiotic usage, decomposition, and forensics.",
    totalChapters: 5,
    progress: 0,
    estimatedHours: 15,
    syllabus: {
      introduction:
        "This course covers culturing and measuring microbial growth, bacterial vs viral biology, immune system responses, antibiotics and antibodies, decomposition by microbes, and forensic techniques including DNA profiling and PCR.",
      image:
        "https://healthnewshub.org/wp-content/uploads/2021/09/NewsCovidantibodies.jpg",
      links: [
        {
          title: "Specification PDF",
          url: "https://drive.google.com/file/d/1sGtM7dLBFpcdtX1liaWrEvTJYMhXoX5n/view?pli=1",
        },
      ],
    },
  },
];

export const mockChapters: Chapter[] = [
  {
    id: "t5-1",
    title: "Photosynthesis",
    subjectId: "bio-t5",
    progress: 0,
    lessons: [
      {
        id: "t5-1-1",
        title: "Understanding Photosynthesis",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Photosynthesis" },
          { id: "kw-2", word: "Autotrophs" },
          { id: "kw-3", word: "Biomass" },
          { id: "kw-4", word: "ATP" },
          { id: "kw-5", word: "Respiration" },
          { id: "kw-6", word: "Glucose" },
          { id: "kw-7", word: "Chlorophyll" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Photosynthesis",
            definition:
              "A chemical process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose.",
          },
          {
            id: "kw-2",
            word: "Autotrophs",
            definition:
              "Organisms that can produce their own food from inorganic substances using light or chemical energy.",
          },
          {
            id: "kw-3",
            word: "Biomass",
            definition:
              "The total mass of living material in an organism or ecosystem.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain the overall reaction of photosynthesis and how light energy is used to split water molecules, store hydrogen in glucose, and release oxygen.",
          },
          {
            id: "obj-2",
            text: "Identify the role of producers (autotrophs) and the significance of biomass as stored energy.",
          },
          {
            id: "obj-3",
            text: "Understand how glucose stores chemical energy and how it can later be used in respiration.",
          },
          {
            id: "obj-4",
            text: "Describe the difference between polar and non-polar bonds in terms of energy storage.",
          },
        ],
        sections: [
          {
            id: "t5-1-1-1",
            title: "Overview of Photosynthesis",
            type: "text",
            content: `Photosynthesis is the process through which green plants, algae, and some bacteria capture light energy and convert it into chemical energy stored in glucose. These organisms, called autotrophs, build their own food using sunlight, carbon dioxide, and water. The energy from light breaks the strong hydrogen-oxygen bonds in water molecules, releasing oxygen into the atmosphere as a byproduct. The freed hydrogen atoms combine with carbon dioxide to form glucose, which stores energy in its chemical bonds. Later, this stored energy can be released through respiration to produce ATP, which powers cellular activities. In essence, hydrogen acts as a carrier of chemical energy, stored in glucose molecules through C-H and O-H bonds.`,
            completed: false,
            links: [
              {
                title: "Photosynthesis Explained (Khan Academy)",
                url: "https://www.khanacademy.org/science/biology/photosynthesis-in-plants",
              },
              {
                title: "MIT OpenCourseWare - Plant Biology",
                url: "https://ocw.mit.edu/courses/biology/",
              },
            ],
          },
          {
            id: "t5-1-1-2",
            title: "Photosynthesis Equation",
            type: "image",
            content:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Photosynthesis_equation.svg/800px-Photosynthesis_equation.svg.png",
            completed: false,
          },
          {
            id: "t5-1-1-3",
            title: "Photosynthesis Video",
            type: "video",
            content: "/videos/photosynthesis.mp4",
            poster: "https://i.ytimg.com/vi/4vM4RbJQzLE/hqdefault.jpg",
            completed: false,
          },
          {
            id: "t5-1-1-4",
            title: "Key Concepts Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is the main purpose of photosynthesis?",
                back: "To convert light energy into chemical energy stored in glucose.",
              },
              {
                id: "fc2",
                front: "What are autotrophs?",
                back: "Organisms that produce their own organic compounds from inorganic substances.",
              },
              {
                id: "fc3",
                front:
                  "Which molecule stores the hydrogen released from water?",
                back: "Glucose stores hydrogen in its chemical bonds.",
              },
              {
                id: "fc4",
                front: "What is released as a byproduct of photosynthesis?",
                back: "Oxygen is released into the atmosphere as a waste product.",
              },
            ],
          },
          {
            id: "t5-1-1-5",
            title: "Polar vs Non-Polar Bonds",
            type: "table",
            completed: false,
            tableData: {
              columns: [
                { key: "bond", label: "Bond Type" },
                { key: "energy", label: "Chemical Energy" },
                { key: "notes", label: "Comments" },
              ],
              data: [
                {
                  bond: "H-O-H (Water)",
                  energy: "Low",
                  notes:
                    "Polar bond, electrons tightly held, less chemical potential energy",
                },
                {
                  bond: "C-H (Glucose)",
                  energy: "High",
                  notes:
                    "Non-polar bond, electrons can release energy more easily",
                },
              ],
              searchable: true,
            },
          },
        ],
      },
      {
        id: "t5-1-2",
        title: "Role of ATP in Cells",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "ATP" },
          { id: "kw-2", word: "ADP" },
          { id: "kw-3", word: "Phosphorylation" },
          { id: "kw-4", word: "Hydrolysis" },
          { id: "kw-5", word: "Energy currency" },
          { id: "kw-6", word: "Mitochondria" },
          { id: "kw-7", word: "Electron Transport Chain (ETC)" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "ATP",
            definition:
              "Adenosine Triphosphate, a molecule that stores and transports chemical energy within cells. It is known as the universal energy currency.",
          },
          {
            id: "kw-2",
            word: "Phosphorylation",
            definition:
              "The process of adding an inorganic phosphate (Pi) to ADP to form ATP, storing energy in the bond.",
          },
          {
            id: "kw-3",
            word: "Hydrolysis",
            definition:
              "The breaking of the terminal phosphate bond in ATP, releasing energy and producing ADP and Pi.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain why ATP is considered the universal energy currency in all living organisms.",
          },
          {
            id: "obj-2",
            text: "Describe the processes of phosphorylation and hydrolysis and how they release or store energy.",
          },
          {
            id: "obj-3",
            text: "Identify the main cellular activities powered by ATP, including anabolic reactions, active transport, and muscle contraction.",
          },
          {
            id: "obj-4",
            text: "Understand the structure of ATP and how it is related to nucleotides in DNA/RNA.",
          },
        ],
        sections: [
          {
            id: "t5-1-2-1",
            title: "ATP: The Energy Currency of Cells",
            type: "text",
            content: `All living cells require a constant supply of energy to maintain life processes. Adenosine Triphosphate (ATP) serves as the universal energy currency in cells. It stores energy in its high-energy phosphate bonds, which can be transported to wherever energy is needed. ATP powers a wide range of cellular processes including building new molecules (anabolic reactions), muscle contraction, nerve impulse transmission, and active transport across membranes. 

Structurally, ATP resembles a nucleotide, with a sugar (ribose), adenine base, and three phosphate groups. Energy is stored in the bonds between these phosphate groups, particularly the terminal (gamma) phosphate. ATP is formed when ADP (Adenosine Diphosphate) and an inorganic phosphate (Pi) are joined in a process called phosphorylation: 

ADP + Pi → ATP (requires energy)

When ATP is hydrolyzed, energy is released to power cellular activities:

ATP → ADP + Pi (releases energy)

This cycle of ATP synthesis and hydrolysis is central to energy transfer in both photosynthesis (chloroplasts) and respiration (mitochondria), with ATP synthase catalyzing formation and ATPase catalyzing hydrolysis.`,
            completed: false,
            links: [
              {
                title: "ATP Basics - Khan Academy",
                url: "https://www.khanacademy.org/science/biology/cellular-respiration-and-fermentation",
              },
              {
                title: "MIT OpenCourseWare - Biochemistry",
                url: "https://ocw.mit.edu/courses/biology/",
              },
            ],
          },
          {
            id: "t5-1-2-2",
            title: "ATP Structure and Phosphate Bonds",
            type: "image",
            content:
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/ATP_structure.svg",
            completed: false,
          },
          {
            id: "t5-1-2-3",
            title: "ATP Production and Energy Flow",
            type: "text",
            content: `ATP is synthesized by adding a phosphate to ADP using energy derived from the electron transport chain during respiration or photosynthesis. When the terminal phosphate bond is hydrolyzed, energy is released to drive cellular processes. ATP diffuses within cells to supply energy precisely where it is needed, making it highly efficient as a universal energy carrier. This cycle ensures continuous energy availability for processes like protein synthesis, vesicle transport, and ion pumping.`,
            completed: false,
          },
          {
            id: "t5-1-2-4",
            title: "ATP Cycle Table",
            type: "table",
            completed: false,
            tableData: {
              columns: [
                { key: "reaction", label: "Reaction" },
                { key: "equation", label: "Equation" },
                { key: "energy", label: "Energy Flow" },
              ],
              data: [
                {
                  reaction: "Phosphorylation",
                  equation: "ADP + Pi → ATP",
                  energy: "Stores energy",
                },
                {
                  reaction: "Hydrolysis",
                  equation: "ATP → ADP + Pi",
                  energy: "Releases energy",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "t5-1-2-5",
            title: "Key Concepts Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is ATP?",
                back: "A molecule that stores and transfers energy in cells; known as the universal energy currency.",
              },
              {
                id: "fc2",
                front: "What is phosphorylation?",
                back: "Adding an inorganic phosphate to ADP to form ATP, storing energy in the bond.",
              },
              {
                id: "fc3",
                front: "What happens during ATP hydrolysis?",
                back: "The terminal phosphate bond is broken, releasing energy and producing ADP and Pi.",
              },
              {
                id: "fc4",
                front: "Which cellular activities require ATP?",
                back: "Anabolic reactions, muscle contraction, active transport, nerve impulses, and vesicle movement.",
              },
            ],
          },
        ],
      },
      {
        id: "t5-1-3",
        title: "The Light-Dependent Stage of Photosynthesis",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Photosynthesis" },
          { id: "kw-2", word: "Light-Dependent Reactions" },
          { id: "kw-3", word: "Thylakoid Membrane" },
          { id: "kw-4", word: "Photolysis" },
          { id: "kw-5", word: "ATP" },
          { id: "kw-6", word: "NADP+" },
          { id: "kw-7", word: "NADPH" },
          { id: "kw-8", word: "Photosystem II" },
          { id: "kw-9", word: "Chemiosmosis" },
          { id: "kw-10", word: "Electron Transport Chain (ETC)" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Photolysis",
            definition:
              "The splitting of water molecules by light energy to produce protons (H+), electrons (e-), and oxygen.",
          },
          {
            id: "kw-2",
            word: "NADP+",
            definition:
              "A coenzyme that acts as an electron and hydrogen carrier. It becomes NADPH when reduced, storing energy for the Calvin cycle.",
          },
          {
            id: "kw-3",
            word: "Photophosphorylation",
            definition:
              "The process of synthesizing ATP using light energy to add a phosphate group to ADP.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain the role of light in driving the light-dependent reactions of photosynthesis.",
          },
          {
            id: "obj-2",
            text: "Describe how water molecules are split during photolysis and how this generates electrons, protons, and oxygen.",
          },
          {
            id: "obj-3",
            text: "Explain the function of NADP+/NADPH as an energy and electron carrier.",
          },
          {
            id: "obj-4",
            text: "Compare cyclic and non-cyclic photophosphorylation and their respective products.",
          },
          {
            id: "obj-5",
            text: "Understand the role of chemiosmosis and ATP synthase in ATP production.",
          },
        ],
        sections: [
          {
            id: "t5-1-3-1",
            completed: false,

            title: "Introduction to Light-Dependent Reactions",
            type: "text",
            content: `Photosynthesis occurs in **two main stages**:
1. **Light-Dependent Reactions** – require direct light.
2. **Light-Independent Reactions (Calvin Cycle)** – do not directly depend on light but require ATP and NADPH produced in the light-dependent stage.

These reactions take place in the **chloroplast**:
- Light-Dependent: Across the **thylakoid membrane**
- Light-Independent: In the **stroma**

During the light-dependent stage, **light energy is captured and converted into chemical energy**, forming ATP and NADPH, while oxygen is released as a by-product.`,
          },
          {
            completed: false,

            id: "t5-1-3-2",
            title: "Photolysis of Water",
            type: "text",
            content: `**Photolysis** is the splitting of water molecules by light:

H2O → 2H+ + 2e- + ½ O2

- **H+ ions (protons)** are used to generate a proton gradient for ATP synthesis.
- **Electrons (e-)** replace those lost by chlorophyll in Photosystem II.
- **Oxygen (O2)** is released as a waste product into the atmosphere.`,
            links: [
              {
                title: "Khan Academy: Photosynthesis Overview",
                url: "https://www.khanacademy.org/science/biology/photosynthesis-in-plants",
              },
            ],
          },
          {
            id: "t5-1-3-3",
            title: "NADP+ and NADPH: The Energy Bus",
            type: "text",
            completed: false,
            content: `**NADP+** is a coenzyme that acts as an **electron and hydrogen carrier**:
- Accepts 2 electrons and 1 proton (H+) to become **NADPH**.
- NADPH is then used as a **reducing agent** in the Calvin cycle (light-independent reactions).
- This is an example of **reduction** (gain of electrons and hydrogen) and **oxidation** (loss of electrons/hydrogen).`,
          },
          {
            completed: false,

            id: "t5-1-3-4",
            title: "ATP Production: Photophosphorylation",
            type: "text",
            content: `**Photophosphorylation** is the process of forming ATP using light energy.

**Two types:**
- **Non-Cyclic:** Produces ATP + NADPH; electrons move from PSII → PSI → NADP+.
- **Cyclic:** Produces ATP only; electrons cycle back from PSI to ETC.

**Mechanism:**
1. Electrons excited by light move along the **Electron Transport Chain (ETC)**.
2. Energy released pumps H+ into the thylakoid lumen, creating a **proton gradient**.
3. **ATP synthase** uses this gradient (chemiosmosis) to convert ADP + Pi → ATP.
4. In non-cyclic, NADP+ accepts electrons + H+ to form NADPH.`,
          },
          {
            id: "t5-1-3-5",
            title: "Photosystems",
            type: "text",
            completed: false,

            content: `**Photosystem II (PSII):**
- First in the chain, absorbs light, excites electrons.
- Electrons replaced by photolysis of water.
- Pumps H+ to create gradient.

**Photosystem I (PSI):**
- Absorbs light, re-excites electrons from PSII.
- Transfers electrons to NADP+ forming NADPH.

**Key Point:** PSI can operate in **cyclic or non-cyclic mode**, but only one at a time.`,
          },
          {
            id: "t5-1-3-6",
            title: "Light-Dependent Reaction Diagram",
            type: "image",
            completed: false,

            content:
              "https://upload.wikimedia.org/wikipedia/commons/4/4d/Non_cyclic_photophosphorylation.png",
          },
          {
            id: "t5-1-3-7",
            title: "Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is photolysis?",
                back: "Splitting of water by light to produce H+, e-, and O2.",
              },
              {
                id: "fc2",
                front: "What does NADPH do?",
                back: "Carries electrons and hydrogen to the Calvin cycle as a reducing agent.",
              },
              {
                id: "fc3",
                front: "Where do light-dependent reactions occur?",
                back: "Across the thylakoid membrane.",
              },
              {
                id: "fc4",
                front:
                  "Difference between cyclic and non-cyclic photophosphorylation?",
                back: "Cyclic produces only ATP; non-cyclic produces ATP and NADPH.",
              },
              {
                id: "fc5",
                front: "What is chemiosmosis?",
                back: "Movement of H+ ions through ATP synthase to generate ATP.",
              },
            ],
          },
          {
            id: "t5-1-3-8",
            title: "Quiz: Light-Dependent Reactions",
            type: "quiz",
            completed: false,
            quiz: {
              title: "Light-Dependent Reactions Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Where does photolysis occur?",
                  options: [
                    "Stroma",
                    "Thylakoid lumen",
                    "Cytoplasm",
                    "Mitochondria",
                  ],
                  correctAnswer: 1,
                  explanation: "Photolysis occurs inside the thylakoid lumen.",
                },
                {
                  id: "q2",
                  question:
                    "Which molecule carries electrons to the Calvin cycle?",
                  options: ["ATP", "NADP+", "NADPH", "O2"],
                  correctAnswer: 2,
                  explanation:
                    "NADPH carries electrons and H+ to the Calvin cycle.",
                },
                {
                  id: "q3",
                  question: "Cyclic photophosphorylation produces:",
                  options: [
                    "ATP and NADPH",
                    "ATP only",
                    "NADPH only",
                    "Neither",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Cyclic produces only ATP as electrons are recycled.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "t5-1-4",
        title: "Calvin Cycle (Light-Independent Reactions)",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Calvin Cycle" },
          { id: "kw-2", word: "Carbon Fixation" },
          { id: "kw-3", word: "RuBP" },
          { id: "kw-4", word: "GP (Glycerate 3-Phosphate)" },
          { id: "kw-5", word: "GALP (Glyceraldehyde 3-Phosphate)" },
          { id: "kw-6", word: "RuBisCo" },
          { id: "kw-7", word: "Hexose Sugars" },
          { id: "kw-8", word: "Starch" },
          { id: "kw-9", word: "Cellulose" },
          { id: "kw-10", word: "ATP" },
          { id: "kw-11", word: "NADPH" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "RuBP",
            definition:
              "Ribulose 1,5-bisphosphate, a 5-carbon compound that reacts with CO2 in the Calvin cycle.",
          },
          {
            id: "kw-2",
            word: "RuBisCo",
            definition:
              "The enzyme Ribulose-1,5-bisphosphate carboxylase-oxygenase that catalyzes carbon fixation in the Calvin cycle; requires Mg2+ as a cofactor.",
          },
          {
            id: "kw-3",
            word: "GALP",
            definition:
              "Glyceraldehyde 3-phosphate, a 3-carbon sugar produced in the Calvin cycle, used to regenerate RuBP or form glucose.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Describe the steps of the Calvin Cycle and how CO2 is fixed into organic molecules.",
          },
          {
            id: "obj-2",
            text: "Explain the role of ATP and NADPH in the reduction of GP to GALP.",
          },
          {
            id: "obj-3",
            text: "Identify the fate of GALP in forming glucose and regenerating RuBP.",
          },
          {
            id: "obj-4",
            text: "Explain how sugars produced in the Calvin cycle contribute to plant biomass and consumer food chains.",
          },
          {
            id: "obj-5",
            text: "Understand the importance of RuBisCo in carbon fixation.",
          },
        ],
        sections: [
          {
            id: "t5-1-4-1",
            title: "Overview of the Calvin Cycle",
            type: "text",
            completed: false,
            content: `The Calvin Cycle, also known as the **light-independent reactions**, occurs in the **stroma of the chloroplast**.  
It converts CO2 into **complex organic compounds** like glucose, starch, and cellulose using **ATP and NADPH** from light-dependent reactions.  

**Three main stages:**
1. **Carbon Fixation:** CO2 combines with RuBP to form GP (Glycerate 3-Phosphate).  
2. **Reduction:** GP is reduced to GALP (Glyceraldehyde 3-Phosphate) using ATP & NADPH.  
3. **Regeneration:** Some GALP molecules regenerate RuBP to continue the cycle.`,
          },
          {
            id: "t5-1-4-2",
            title: "Step 1: Carbon Fixation",
            type: "text",
            completed: false,
            content: `- CO2 (1C) combines with **RuBP (5C)** to form an **unstable 6-carbon intermediate**.  
- The intermediate immediately splits into **two molecules of GP (3C each)**.  
- This reaction is called **carboxylation** and is catalyzed by **RuBisCo**, the most abundant enzyme on Earth.  
- **RuBisCo requires Mg²⁺** as a cofactor.`,
          },
          {
            id: "t5-1-4-3",
            title: "Step 2: Reduction of GP",
            type: "text",
            completed: false,
            content: `- GP is **phosphorylated by ATP** to form 1,3-bisphosphoglycerate (BPG).  
- **NADPH donates electrons** to reduce BPG to GALP (Triose Phosphate).  
- Pi (inorganic phosphate) is released.  
- GALP is a **3-carbon sugar** that can be used to form glucose or other organic molecules.`,
          },
          {
            id: "t5-1-4-4",
            title: "Step 3: Regeneration of RuBP",
            type: "text",
            completed: false,
            content: `- **5 out of 6 carbons** from two GALP molecules are used to **regenerate 3 RuBP molecules**.  
- This ensures the cycle continues.  
- **6 turns of the Calvin Cycle** produce 1 molecule of glucose (C6H12O6).`,
          },
          {
            id: "t5-1-4-5",
            title: "Fate of Calvin Cycle Products",
            type: "text",
            completed: false,
            content: `**Primary products:**  
- **Hexose sugars**: Glucose & Fructose (can form Sucrose).  
- **Polysaccharides**: Starch & Cellulose.  
- **Lipids**: Glycerol + fatty acids → triglycerides & phospholipids.  
- **Nucleic acids**: DNA & RNA using phosphate ions from soil.  
- **Amino acids**: By incorporating nitrate ions.  

These molecules contribute to **plant biomass** (cell walls, chloroplasts, starch grains, membranes) and are **passed on to consumers** in the food chain.`,
          },
          {
            id: "t5-1-4-6",
            title: "Calvin Cycle Diagram",
            type: "image",
            completed: false,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Calvin_cycle.png",
          },
          {
            id: "t5-1-4-7",
            title: "Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is the first stable product of the Calvin Cycle?",
                back: "GP (Glycerate 3-phosphate)",
              },
              {
                id: "fc2",
                front: "Which enzyme catalyzes carbon fixation?",
                back: "RuBisCo",
              },
              {
                id: "fc3",
                front: "What molecules are required to reduce GP to GALP?",
                back: "ATP and NADPH",
              },
              {
                id: "fc4",
                front:
                  "How many turns of the Calvin Cycle produce one glucose molecule?",
                back: "6 turns",
              },
              {
                id: "fc5",
                front:
                  "Name three types of molecules produced by the Calvin Cycle.",
                back: "Hexose sugars, lipids, nucleic acids",
              },
            ],
          },
          {
            id: "t5-1-4-8",
            title: "Quiz: Calvin Cycle",
            type: "quiz",
            completed: false,
            quiz: {
              title: "Calvin Cycle Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Where in the chloroplast does the Calvin Cycle occur?",
                  options: [
                    "Thylakoid membrane",
                    "Stroma",
                    "Cytoplasm",
                    "Granum",
                  ],
                  correctAnswer: 1,
                  explanation: "The Calvin Cycle occurs in the stroma.",
                },
                {
                  id: "q2",
                  question:
                    "Which molecule is regenerated to continue the cycle?",
                  options: ["GP", "GALP", "RuBP", "Glucose"],
                  correctAnswer: 2,
                  explanation: "RuBP is regenerated from GALP.",
                },
                {
                  id: "q3",
                  question:
                    "How many turns of the cycle are required to produce one glucose molecule?",
                  options: ["1", "3", "6", "12"],
                  correctAnswer: 2,
                  explanation:
                    "6 turns are needed to produce 1 glucose molecule.",
                },
              ],
            },
          },
          {
            id: "t5-1-4-9",
            title: "Tips+",
            type: "examiner-tips",
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Remember RuBisCo",
                content:
                  "RuBisCo is the enzyme that catalyzes carbon fixation and needs Mg²⁺ as a cofactor.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "Counting Carbons",
                content:
                  "Track the carbon atoms carefully; only 1/6th of GALP is used to make one glucose molecule.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Cycle Steps",
                content:
                  "Always remember the three steps: Carbon fixation → Reduction → Regeneration of RuBP.",
              },
            ],
          },
        ],
      },
      {
        id: "t5-1-0",
        title: "The Chloroplast",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Chloroplast" },
          { id: "kw-2", word: "Stroma" },
          { id: "kw-3", word: "Thylakoid" },
          { id: "kw-4", word: "Granum" },
          { id: "kw-5", word: "Lamellae" },
          { id: "kw-6", word: "Photosystem I (PSI)" },
          { id: "kw-7", word: "Photosystem II (PSII)" },
          { id: "kw-8", word: "ATP Synthase" },
          { id: "kw-9", word: "Chloroplast DNA (cpDNA)" },
          { id: "kw-10", word: "Double membrane" },
          { id: "kw-11", word: "Envelope" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Thylakoid",
            definition:
              "A flattened, membrane-bound sac inside chloroplasts where light-dependent reactions occur.",
          },
          {
            id: "kw-2",
            word: "Granum",
            definition:
              "A stack of thylakoids connected by lamellae; increases surface area for photosynthesis.",
          },
          {
            id: "kw-3",
            word: "Stroma",
            definition:
              "The fluid-filled matrix of chloroplasts that contains enzymes, sugars, ribosomes, and cpDNA; site of Calvin Cycle.",
          },
          {
            id: "kw-4",
            word: "Lamellae",
            definition:
              "Membranous channels connecting grana and allowing movement of molecules within the chloroplast.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Identify the main structures of a chloroplast and their functions.",
          },
          {
            id: "obj-2",
            text: "Explain how the structure of thylakoids and grana enhances photosynthesis efficiency.",
          },
          {
            id: "obj-3",
            text: "Understand the role of chloroplast DNA and ribosomes in protein synthesis.",
          },
          {
            id: "obj-4",
            text: "Describe the importance of the chloroplast envelope in regulating exchange with the cytoplasm.",
          },
          {
            id: "obj-5",
            text: "Explain why the stroma and thylakoid lumen are specialized for biochemical reactions.",
          },
        ],
        sections: [
          {
            id: "t5-1-0-1",
            title: "Chloroplast Structure Overview",
            type: "text",
            completed: false,
            content: `Chloroplasts are **double-membrane organelles** found in plant cells and some algae.  
They are enclosed by the **chloroplast envelope**, which controls the exchange of molecules with the cytoplasm and keeps photosynthetic components concentrated.  

Inside, chloroplasts contain:
- **Stroma**: A fluid-filled matrix containing **enzymes, 1-carbon sugars (substrates for polysaccharides), ribosomes, and chloroplast DNA (cpDNA)**.  
- **Thylakoids**: Flattened discs surrounded by **thylakoid membranes**, stacked into **grana**, connected by **lamellae**.  
- **Pigment-protein complexes**: PSI, PSII, and **ATP synthase** embedded in thylakoid membranes.  
- If photosynthesis has been active, **starch grains** and **lipid droplets** may also be present.`,
          },
          {
            id: "t5-1-0-2",
            title: "Function and Adaptations of the Chloroplast",
            type: "text",
            completed: false,
            content: `**Adaptations enhancing photosynthesis:**
1. **Envelope (double membrane)**: Keeps components enclosed and allows selective exchange with cytoplasm.  
2. **Thylakoid membranes**: Small lumen volume allows **rapid proton gradient formation** for ATP synthesis.  
3. **Grana stacks**: High surface area increases **absorption of light** and provides space for PSI, PSII, and ATP synthase.  
4. **Photosystems I & II**: Contain different pigments absorbing different wavelengths (PSI ~700nm, PSII ~680nm).  
5. **Chloroplast DNA & ribosomes**: Synthesize proteins needed for photosynthesis. Ribosomes translate only cpDNA.  
6. **Stroma**: Contains **enzymes for Calvin cycle, sugars, ribosomes, and DNA**; optimized for biochemical reactions.`,
          },
          {
            id: "t5-1-0-3",
            title: "Chloroplast Diagram",
            type: "image",
            completed: false,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Chloroplast_diagram.svg/1200px-Chloroplast_diagram.svg.png",
          },
          {
            id: "t5-1-0-4",
            title: "Tips+",
            type: "examiner-tips",
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Membrane Functions",
                content:
                  "Remember that the double membrane envelope regulates exchange and protects internal components.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "Grana vs Thylakoids",
                content:
                  "Do not confuse grana (stacks of thylakoids) with individual thylakoid discs.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Photosystem Pigments",
                content:
                  "PSI absorbs light at 700 nm, PSII at 680 nm – both work together to maximize light capture.",
              },
            ],
          },
          {
            id: "t5-1-0-5",
            title: "Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is the stroma?",
                back: "Fluid-filled matrix of chloroplast containing enzymes, sugars, ribosomes, and cpDNA.",
              },
              {
                id: "fc2",
                front: "What are thylakoids?",
                back: "Flattened discs within chloroplasts where light-dependent reactions occur.",
              },
              {
                id: "fc3",
                front: "What is a granum?",
                back: "A stack of thylakoids connected by lamellae; increases surface area for photosynthesis.",
              },
              {
                id: "fc4",
                front: "Role of chloroplast envelope?",
                back: "Controls exchange with cytoplasm and keeps photosynthetic machinery enclosed.",
              },
              {
                id: "fc5",
                front: "Function of PSI and PSII?",
                back: "Photosystems that absorb light at different wavelengths to drive electron transport.",
              },
            ],
          },
          {
            id: "t5-1-0-6",
            title: "Chloroplast Quiz",
            type: "quiz",
            completed: false,
            quiz: {
              title: "Chloroplast Structure Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Where does the Calvin cycle occur?",
                  options: [
                    "Thylakoid membrane",
                    "Stroma",
                    "Granum",
                    "Cytoplasm",
                  ],
                  correctAnswer: 1,
                  explanation: "The Calvin cycle occurs in the stroma.",
                },
                {
                  id: "q2",
                  question: "What is a granum?",
                  options: [
                    "A single thylakoid",
                    "Stack of thylakoids",
                    "Stroma compartment",
                    "Envelope membrane",
                  ],
                  correctAnswer: 1,
                  explanation: "A granum is a stack of thylakoids.",
                },
                {
                  id: "q3",
                  question: "Which pigments absorb light in PSII?",
                  options: ["680 nm", "700 nm", "550 nm", "600 nm"],
                  correctAnswer: 0,
                  explanation: "PSII absorbs light at ~680 nm.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "t5-1-6",
        title: "Absorption & Action Spectra",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Chlorophyll a" },
          { id: "kw-2", word: "Chlorophyll b" },
          { id: "kw-3", word: "Carotenoids" },
          { id: "kw-4", word: "Absorption spectrum" },
          { id: "kw-5", word: "Action spectrum" },
          { id: "kw-6", word: "Photosystem pigments" },
          { id: "kw-7", word: "Reactive oxygen species (ROS)" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Absorption spectrum",
            definition:
              "A graph showing the wavelengths of light absorbed by a pigment.",
          },
          {
            id: "kw-2",
            word: "Action spectrum",
            definition:
              "A graph showing the rate of photosynthesis at different wavelengths of light.",
          },
          {
            id: "kw-3",
            word: "Carotenoids",
            definition:
              "Accessory pigments that absorb light chlorophyll cannot and protect plants from oxidative damage.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Describe how different pigments absorb different wavelengths of light.",
          },
          {
            id: "obj-2",
            text: "Explain the role of carotenoids in photoprotection and light absorption.",
          },
          {
            id: "obj-3",
            text: "Compare absorption spectra with action spectra and relate them to photosynthesis efficiency.",
          },
        ],
        sections: [
          {
            id: "t5-1-3-1",
            title: "Introduction to Pigment Absorption",
            type: "text",
            completed: false,
            content: `Photosystems contain multiple pigments that absorb light at specific wavelengths:  
- **Chlorophyll a & b**: absorb blue, violet, and red light; reflect green.  
- **Carotenoids**: absorb blue and violet light; reflect orange/yellow.  
  - Act as antioxidants, protecting the plant from **ROS (Reactive Oxygen Species)** damage caused by excess light.  
  - Remain in leaves during winter when chlorophyll is broken down, allowing plants to recycle Mg and N.  

**Pigment Colors:**  
- Chlorophyll a: blue-green  
- Chlorophyll b: yellow-green  
- Carotenoids: orange/yellow`,
          },
          {
            id: "t5-1-3-2",
            title: "Absorption Spectra of Pigments",
            type: "image",
            completed: false,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/3/3a/Absorption_spectra.png",
          },
          {
            id: "t5-1-3-3",
            title: "Action Spectra and Photosynthesis Rates",
            type: "text",
            completed: false,
            content: `The **rate of photosynthesis** in plants depends on the wavelengths of light available.  
- The **action spectrum** shows photosynthetic rate across different wavelengths.  
- Multiple pigments broaden the absorption spectrum → broad action spectrum → increased photosynthesis efficiency.  
- **Correlation:** Action spectra closely follow absorption spectra.`,
          },
          {
            id: "t5-1-3-4",
            title: "Absorption vs Action Spectra Table",
            type: "table",
            completed: false,
            tableData: {
              columns: [
                { key: "pigment", label: "Pigment", sortable: true },
                {
                  key: "absorption_peak_nm",
                  label: "Absorption Peak (nm)",
                  sortable: true,
                },
                {
                  key: "reflected_color",
                  label: "Reflected Color",
                  sortable: false,
                },
                { key: "function", label: "Function", sortable: false },
              ],
              data: [
                {
                  pigment: "Chlorophyll a",
                  absorption_peak_nm: "430, 662",
                  reflected_color: "Blue-green",
                  function: "Primary pigment in photosystems",
                },
                {
                  pigment: "Chlorophyll b",
                  absorption_peak_nm: "453, 642",
                  reflected_color: "Yellow-green",
                  function: "Accessory pigment transferring energy to Chl a",
                },
                {
                  pigment: "Carotenoids",
                  absorption_peak_nm: "450-480",
                  reflected_color: "Orange/Yellow",
                  function: "Photoprotection, absorb light Chl cannot",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "t5-1-3-5",
            title: "Tips+",
            type: "examiner-tips",
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Pigment Colors",
                content:
                  "Remember: Chlorophyll a = blue-green, Chlorophyll b = yellow-green, carotenoids = orange/yellow.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "ROS Protection",
                content:
                  "Carotenoids are not just pigments—they protect against reactive oxygen species in strong light.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Action vs Absorption",
                content:
                  "Action spectra closely follow absorption spectra; more pigments = broader spectrum = higher photosynthesis.",
              },
            ],
          },
          {
            id: "t5-1-3-6",
            title: "Interactive Spectra Learning",
            type: "text",
            completed: false,
            content: `Explore interactive absorption and action spectra to see how photosynthesis changes with light wavelength:  
- [Interactive Absorption Spectrum](https://www.biointeractive.org/classroom-resources/plant-pigment-absorption)  
- [Photosynthesis Action Spectrum Experiment](https://www.visionlearning.com/en/library/Photosynthesis/2/Photosynthesis-Action-Spectrum/111)`,
          },
          {
            id: "t5-1-3-7",
            title: "Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What wavelengths does chlorophyll a absorb?",
                back: "Blue, violet, and red light (~430 and 662 nm).",
              },
              {
                id: "fc2",
                front: "Function of carotenoids?",
                back: "Absorb light chlorophyll cannot and protect against ROS damage.",
              },
              {
                id: "fc3",
                front: "Action spectrum definition?",
                back: "Shows rate of photosynthesis at different wavelengths of light.",
              },
            ],
          },
        ],
      },
      {
        id: "t5-1-7",
        title: "Separation of Photosynthesis Pigments (Chromatography)",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Chromatography" },
          { id: "kw-2", word: "Rf value" },
          { id: "kw-3", word: "Chlorophyll a" },
          { id: "kw-4", word: "Chlorophyll b" },
          { id: "kw-5", word: "Carotenoids" },
          { id: "kw-6", word: "Xanthophyll" },
          { id: "kw-7", word: "TLC" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Chromatography",
            definition:
              "A technique used to separate components of a mixture based on their differential movement through a medium.",
          },
          {
            id: "kw-2",
            word: "Rf value",
            definition:
              "Ratio of the distance traveled by a substance to the distance traveled by the solvent front (Rf = P/S).",
          },
          {
            id: "kw-3",
            word: "TLC (Thin Layer Chromatography)",
            definition:
              "A chromatography technique using a thin layer of adsorbent (like silica gel) for better separation.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain how chromatography separates pigments based on solubility and mass.",
          },
          { id: "obj-2", text: "Calculate Rf values for pigments." },
          {
            id: "obj-3",
            text: "Differentiate between Paper Chromatography and Thin Layer Chromatography (TLC).",
          },
          {
            id: "obj-4",
            text: "Identify common chloroplast pigments and their relative Rf values.",
          },
        ],
        sections: [
          {
            id: "t5-1-7-1",
            title: "Principle of Chromatography",
            type: "text",
            completed: false,
            content: `Chromatography separates mixtures because different components move at different speeds through a medium due to differences in **mass, charge, and solubility**.  

- **Rf value:** Ratio of distance traveled by pigment to distance traveled by solvent front:  
  **Rf = P / S**  
- Large or less soluble molecules move slower → lower Rf  
- Small or highly soluble molecules move faster → higher Rf`,
          },
          {
            id: "t5-1-7-2",
            title: "Types of Chromatography",
            type: "table",
            completed: false,
            tableData: {
              columns: [
                { key: "type", label: "Type", sortable: true },
                { key: "medium", label: "Medium", sortable: true },
                { key: "advantage", label: "Advantages", sortable: false },
              ],
              data: [
                {
                  type: "Paper Chromatography",
                  medium: "Cellulose paper",
                  advantage: "Simple, inexpensive, good for basic separation",
                },
                {
                  type: "Thin Layer Chromatography (TLC)",
                  medium: "Silica gel layer",
                  advantage:
                    "Better separation, smoother surface, more distinct bands",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "t5-1-7-3",
            title: "Materials and Tools",
            type: "text",
            completed: false,
            content: `**Tools Needed:**  
- Pencil (for baseline)  
- Acetone (to extract pigments)  
- Solvent (mobile phase)  
- Leaf sample  
- Cellulose or TLC Paper  
- Ruler  
- Pestle & Mortar  
- Boiling tube or beaker  
- Capillary tube or pipette`,
          },
          {
            id: "t5-1-7-4",
            title: "Chromatography Procedure",
            type: "text",
            completed: false,
            content: `1. Grind leaf in mortar & pestle with 20 drops acetone.  
2. Use capillary tube to transfer pigment extract to a test tube.  
3. Draw a **pencil baseline** 1 cm from bottom of paper. Place a small dot of pigment in center.  
4. Suspend paper in solvent so solvent touches paper **below the line**.  
5. Once solvent reaches near top, mark the solvent front immediately. Measure distance traveled by solvent and pigments.  
6. Calculate **Rf values**: Rf = P/S  

**Notes:**  
- Carotenoids → highest Rf (fastest)  
- Chlorophyll a → medium Rf  
- Chlorophyll b → lowest Rf  
- Xanthophyll → similar to carotenoids`,
          },
          {
            id: "t5-1-7-5",
            title: "Chromatography Image Example",
            type: "image",
            completed: false,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Plant_pigments_TLC.jpg/800px-Plant_pigments_TLC.jpg",
          },
          {
            id: "t5-1-7-6",
            title: "Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is Rf value?",
                back: "Ratio of distance traveled by pigment to distance traveled by solvent front (Rf = P/S).",
              },
              {
                id: "fc2",
                front: "Pigment with highest Rf?",
                back: "Carotenoids",
              },
              {
                id: "fc3",
                front: "Difference between Paper and TLC?",
                back: "TLC has a smooth surface for better separation; paper is simpler but less distinct.",
              },
            ],
          },
          {
            id: "t5-1-7-7",
            title: "Tips+",
            type: "examiner-tips",
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Baseline Drawing",
                content:
                  "Always use a pencil, not pen, to draw the baseline; ink may dissolve in solvent.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "Solvent Level",
                content:
                  "Make sure solvent does NOT touch the pigment dot initially, only the baseline area.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Rf Calculation",
                content:
                  "Measure distances carefully and calculate Rf immediately before solvent evaporates or pigments spread further.",
              },
            ],
          },
        ],
      },
      {
        id: "t5-1-8",
        title: "Core Practical 1: Rate of Photosynthesis",
        chapterId: "t5-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Limiting Factor" },
          { id: "kw-2", word: "Light Intensity" },
          { id: "kw-3", word: "CO2 Concentration" },
          { id: "kw-4", word: "Temperature" },
          { id: "kw-5", word: "Oxygen Production" },
          { id: "kw-6", word: "Aquatic Plants" },
          { id: "kw-7", word: "Photosynthetic Rate" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Limiting Factor",
            definition:
              "A factor which, if below its optimum, restricts the rate of a biological process, even if all other factors are at optimum.",
          },
          {
            id: "kw-2",
            word: "Light Intensity",
            definition:
              "The amount of light energy available to a plant, affecting the rate of the light-dependent stage of photosynthesis.",
          },
          {
            id: "kw-3",
            word: "Aquatic Plants",
            definition:
              "Plants that live in water, often used in photosynthesis experiments because O2 production is easily measurable underwater.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand the factors affecting the rate of photosynthesis.",
          },
          {
            id: "obj-2",
            text: "Identify limiting factors and how they influence photosynthetic rate.",
          },
          {
            id: "obj-3",
            text: "Describe a practical method to measure O2 production as a proxy for photosynthetic rate.",
          },
          {
            id: "obj-4",
            text: "Interpret graphs showing the effect of light, CO2, and temperature on photosynthesis.",
          },
          {
            id: "obj-5",
            text: "Plan an experiment controlling other factors to isolate the effect of a single variable.",
          },
        ],
        sections: [
          {
            id: "t5-1-8-1",
            title: "Factors Required for Photosynthesis",
            type: "text",
            completed: false,
            content: `Photosynthesis requires **CO2, water, light, pigments, and a suitable temperature**. A shortage of any of these factors will prevent photosynthesis from reaching its maximum rate.  

**Main limiting factors:**  
- Light intensity & wavelength  
- CO2 concentration  
- Temperature  

**Note:** Water is essential but rarely a limiting factor in these experiments since plants usually have adequate water supply.`,
          },
          {
            id: "t5-1-8-2",
            title: "Light Intensity Effect",
            type: "image",
            completed: false,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/6/6c/Photosynthesis_vs_Light_Intensity.png",
          },
          {
            id: "t5-1-8-3",
            title: "Explanation of Light Effect",
            type: "text",
            completed: false,
            content: `- As **light intensity increases**, the rate of the light-dependent reactions increases → more ATP & NADPH → faster Calvin cycle → higher overall photosynthesis rate.  
- Eventually, the graph **plateaus** because another factor (CO2 or temperature) becomes limiting.  
- The linear portion of the graph indicates when **light intensity is the limiting factor**.`,
          },
          {
            id: "t5-1-8-4",
            title: "CO2 Concentration",
            type: "text",
            completed: false,
            content: `- Increasing CO2 concentration accelerates the Calvin cycle → faster carbon fixation → higher photosynthesis rate.  
- The effect is similar to light intensity: rate increases until another factor becomes limiting.`,
          },
          {
            id: "t5-1-8-5",
            title: "Temperature Effect",
            type: "image",
            completed: false,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/3/34/Temperature_effect_on_photosynthesis_rate.png",
          },
          {
            id: "t5-1-8-6",
            title: "Explanation of Temperature Effect",
            type: "text",
            completed: false,
            content: `- Photosynthesis enzymes (ATP synthase, RuBisCo, polymerases) require optimal kinetic energy:  
  - Low temperature → insufficient collisions → slow reactions  
  - High temperature → enzyme denaturation → sharp decrease in rate  

**Graph shape:** Curved /|, rising then falling as temperature passes optimum.`,
          },
          {
            id: "t5-1-8-7",
            title: "Practical Investigation",
            type: "text",
            completed: false,
            content: `**Objective:** Measure rate of photosynthesis by quantifying O2 produced.  

**Key steps:**  
1. Use **aquatic plants** like Elodea or Cabomba.  
2. **Control factors**:  
   - Temp: water baths at different temperatures  
   - CO2: dissolve NaHCO3 in water  
   - Light intensity: adjust distance from light source  
   - Light wavelength: use color filters  
3. Ensure **water is aerated** to dissolve initial O2.  
4. Cut stem freshly to avoid airlocks.  
5. Perform in a **dark room** to avoid external light interference.  
6. Measure **O2 volume in gas syringe over set time**. Repeat each trial three times.  
7. Change one independent variable, keep others constant. Plot graph of mean O2 volume vs factor.  

**Important:** Plateau in O2 production indicates other factors are limiting.`,
          },
          {
            id: "t5-1-8-8",
            title: "Practical Setup Image",
            type: "image",
            completed: false,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/2/29/Elodea_photosynthesis_experiment.jpg",
          },
          {
            id: "t5-1-8-9",
            title: "Tips+",
            type: "examiner-tips",
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Consistent Cutting",
                content:
                  "Always cut the plant stem freshly to prevent air bubbles blocking xylem.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "External Light",
                content:
                  "Perform experiment in a dark room to isolate effect of your light source.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Replicates",
                content:
                  "Always run at least 3 replicates per condition to get reliable mean values.",
              },
            ],
          },
          {
            id: "t5-1-8-10",
            title: "Flashcards",
            type: "flashcard",
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What are the main limiting factors of photosynthesis?",
                back: "Light intensity & wavelength, CO2 concentration, temperature",
              },
              {
                id: "fc2",
                front:
                  "Why is water not considered a limiting factor in this experiment?",
                back: "Water is usually abundant; other processes are affected first before photosynthesis.",
              },
              {
                id: "fc3",
                front: "How can CO2 concentration be varied in the practical?",
                back: "By adding different concentrations of NaHCO3 to the water.",
              },
              {
                id: "fc4",
                front: "Why use aquatic plants for this experiment?",
                back: "Oxygen production is easily measurable underwater as gas bubbles.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "t5-2",
    title: "Ecology",
    subjectId: "bio-t5",
    progress: 0,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Ecological Productivity",
        chapterId: "2-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Producer" },
          { id: "kw-2", word: "Primary Productivity" },
          { id: "kw-3", word: "GPP" },
          { id: "kw-4", word: "NPP" },
          { id: "kw-5", word: "Respiratory Loss" },
          { id: "kw-6", word: "Trophic Level" },
          { id: "kw-7", word: "Energy Flow" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Producer",
            definition:
              "Organisms that convert light energy into chemical energy stored in biomolecules, e.g., plants and algae.",
          },
          {
            id: "kw-2",
            word: "Primary Productivity",
            definition:
              "Rate at which producers convert light energy into chemical energy via photosynthesis.",
          },
          {
            id: "kw-3",
            word: "GPP",
            definition:
              "Gross Primary Productivity: total chemical energy converted to carbohydrates during photosynthesis.",
          },
          {
            id: "kw-4",
            word: "NPP",
            definition:
              "Net Primary Productivity: chemical energy stored in plant biomass after subtracting respiratory losses. NPP = GPP - R.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Define GPP and NPP and distinguish between them.",
          },
          {
            id: "obj-2",
            text: "Explain how energy flows from producers to higher trophic levels.",
          },
          {
            id: "obj-3",
            text: "Calculate NPP given GPP and respiratory loss.",
          },
          {
            id: "obj-4",
            text: "Understand the ecological significance of NPP in ecosystems.",
          },
        ],
        sections: [
          {
            id: "section-2-1-1",
            title: "Introduction to Productivity",
            type: "text" as const,
            content: `**Producers** are organisms that photosynthesize by converting light energy into chemical energy stored in biomolecules.  

**Primary Productivity** is the rate at which producers convert light energy into chemical energy.  

- **GPP (Gross Primary Productivity):** Total chemical energy converted to carbohydrates.  
- **NPP (Net Primary Productivity):** Energy stored in plant biomass after respiratory losses.  

\`NPP = GPP - R\`  

Only ~10% of energy from photosynthesis is stored in biomass; ~90% is used in respiration and lost as heat. NPP represents energy available to **herbivores** and **decomposers**.`,
            completed: false,
          },
          {
            id: "section-2-1-2",
            title: "Energy Flow Diagram",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Energy_flow_in_ecosystem.png",
            completed: false,
          },
          {
            id: "section-2-1-3",
            title: "GPP vs NPP Explanation",
            type: "text" as const,
            content: `Think of **GPP** as total "income" of plants (energy captured per m² or m³ per year), while **NPP** is the "profit" after subtracting energy spent on respiration.  

- Units: kJ/m²/year (land) or kJ/m³/year (aquatic).  
- GPP = total energy captured  
- NPP = energy stored in biomass available to consumers`,
            completed: false,
          },
          {
            id: "section-2-1-4",
            title: "GPP vs NPP Table",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "parameter", label: "Parameter" },
                { key: "definition", label: "Definition" },
                { key: "notes", label: "Notes" },
              ],
              data: [
                {
                  parameter: "GPP",
                  definition: "Gross primary productivity",
                  notes: "Total energy captured in photosynthesis",
                },
                {
                  parameter: "R",
                  definition: "Respiratory loss",
                  notes: "Energy used in plant metabolism, lost as heat",
                },
                {
                  parameter: "NPP",
                  definition: "Net primary productivity",
                  notes: "Energy stored in biomass, available to consumers",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-2-1-5",
            title: "Factors Affecting NPP",
            type: "text" as const,
            content: `**NPP depends on:**  
- Light availability → more light = higher NPP  
- Water and nutrients → limiting factors decrease NPP  
- Temperature → affects enzyme activity in photosynthesis  
- Respiration → higher R decreases NPP  

**Key point:** NPP shows energy **available to herbivores and decomposers**.`,
            completed: false,
          },
          {
            id: "section-2-1-6",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Units",
                content:
                  "Always include units for productivity (kJ/m²/year or kJ/m³/year).",
              },
              {
                id: "tip2",
                type: "warning",
                title: "Energy Loss",
                content:
                  "Do not confuse GPP with NPP; NPP accounts for respiratory losses.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Application",
                content:
                  "NPP represents energy available for food chains; essential for ecological calculations.",
              },
            ],
          },
          {
            id: "section-2-1-7",
            title: "Primary Productivity Chart",
            type: "chart" as const,
            completed: false,
            chartData: {
              type: "bar",
              data: [
                { ecosystem: "Tropical Forest", GPP: 2200, NPP: 1200 },
                { ecosystem: "Desert", GPP: 800, NPP: 400 },
                { ecosystem: "Temperate Forest", GPP: 1500, NPP: 800 },
                { ecosystem: "Grassland", GPP: 1800, NPP: 900 },
              ],
              xKey: "ecosystem",
              yKey: "GPP",
              allowTypeSwitch: true,
              colors: ["#3b82f6", "#10b981"],
            },
          },
          {
            id: "section-2-1-8",
            title: "Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "Define GPP.",
                back: "Total chemical energy converted to carbohydrates during photosynthesis.",
              },
              {
                id: "fc2",
                front: "Define NPP.",
                back: "Energy stored in biomass after respiration. NPP = GPP - R.",
              },
              {
                id: "fc3",
                front: "Why is NPP important?",
                back: "Represents energy available to herbivores and decomposers.",
              },
              {
                id: "fc4",
                front: "Fraction of energy stored in biomass?",
                back: "Approximately 10%; ~90% used in respiration.",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-2-2",
        title: "Biomass and Energy Flow",
        chapterId: "2-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Trophic Level" },
          { id: "kw-2", word: "Energy Transfer" },
          { id: "kw-3", word: "Net Productivity" },
          { id: "kw-4", word: "Apex Predator" },
          { id: "kw-5", word: "Decomposers" },
          { id: "kw-6", word: "Energy Efficiency" },
          { id: "kw-7", word: "Biomass" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Trophic Level",
            definition:
              "A stage in a food chain, representing the feeding position of organisms.",
          },
          {
            id: "kw-2",
            word: "Net Productivity (NP)",
            definition:
              "Rate at which energy is converted into biomass in a consumer after subtracting losses.",
          },
          {
            id: "kw-3",
            word: "Energy Transfer Efficiency",
            definition:
              "Percentage of energy passed from one trophic level to the next. Usually ~10%.",
          },
          {
            id: "kw-4",
            word: "Apex Predator",
            definition:
              "Top predator in a food chain that is not normally preyed upon by other animals.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain how energy flows through trophic levels.",
          },
          {
            id: "obj-2",
            text: "Describe why energy transfer is not 100% efficient.",
          },
          {
            id: "obj-3",
            text: "Calculate energy transfer efficiency using biomass data.",
          },
          {
            id: "obj-4",
            text: "Explain factors limiting food chain length.",
          },
        ],
        sections: [
          {
            id: "section-2-2-1",
            title: "Energy Transfer in Food Chains",
            type: "text" as const,
            content: `When a producer is consumed by a primary consumer, the stored chemical energy is transferred to the consumer and either used for respiration or stored in tissues.  

Secondary consumers and higher trophic levels receive energy from the organisms they feed on. When an organism dies, decomposers such as fungi and bacteria recycle its biomass.  

Arrows in a food chain represent the **transfer of energy**. Trophic level = stage in a food chain.`,
            completed: false,
          },
          {
            id: "section-2-2-2",
            title: "Energy Losses",
            type: "text" as const,
            content: `Energy transfer between trophic levels is **not 100% efficient**.  

**Losses occur because:**  
- Light energy not absorbed by plants (reflected, transmitted, or hits non-photosynthetic parts)  
- Respiration in producers and consumers loses energy as heat  
- Non-edible parts (bones, roots, cellulose) are not transferred  
- Some food is indigestible and excreted  
- Metabolic waste (e.g., urea) leads to energy loss  

Typically, only ~10% of energy is transferred to the next level, limiting food chain length.`,
            completed: false,
          },
          {
            id: "section-2-2-3",
            title: "Food Chain Energy Diagram",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/1/18/Energy_flow_in_ecosystem_food_chain.png",
            completed: false,
          },
          {
            id: "section-2-2-4",
            title: "Net Productivity of Consumers",
            type: "text" as const,
            content: `**Net Productivity (NP)** = Rate at which energy is converted to biomass in a consumer.  

Energy efficiency formula:  
\`Efficiency (%) = (Energy stored / Total energy received) × 100\`  

- Useful energy = biomass transferred to higher level  
- Total energy = biomass intake by the consumer  

**Note:** Dry biomass should be used to account for variable water content.`,
            completed: false,
          },
          {
            id: "section-2-2-5",
            title: "Calculating Biomass Transfer Efficiency",
            type: "text" as const,
            content: `Steps to calculate biomass transfer efficiency:  
1. Measure **dry mass** of sample organisms (plants or animals).  
2. Scale up sample biomass to represent population size.  
3. Use the formula:  

\`Efficiency (%) = (Biomass of higher trophic level / Biomass of lower trophic level) × 100\`  

Also called UTE (Useful / Total × 100).`,
            completed: false,
          },
          {
            id: "section-2-2-6",
            title: "Energy Transfer Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Energy Flow Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "What percentage of energy is typically transferred to the next trophic level?",
                  options: ["1%", "10%", "25%", "50%"],
                  correctAnswer: 1,
                  explanation:
                    "Approximately 10% of energy is passed to the next trophic level; the rest is lost.",
                },
                {
                  id: "q2",
                  question:
                    "Why is energy transfer between trophic levels inefficient?",
                  options: [
                    "Energy is lost as heat during respiration",
                    "Not all parts of food are digestible",
                    "Some energy is excreted",
                    "All of the above",
                  ],
                  correctAnswer: 3,
                  explanation:
                    "All these factors contribute to energy loss at each trophic level.",
                },
                {
                  id: "q3",
                  question:
                    "What is the main unit used when measuring biomass for energy transfer?",
                  options: [
                    "Wet mass",
                    "Dry mass",
                    "Volume of water",
                    "Number of organisms",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Dry mass is used to standardize for variable water content in tissues.",
                },
              ],
            },
          },
          {
            id: "section-2-2-7",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Energy Loss",
                content:
                  "Always mention that energy is lost at each trophic level.",
              },
              {
                id: "tip2",
                type: "success",
                title: "Biomass Units",
                content:
                  "Use dry mass to calculate energy transfer efficiency.",
              },
            ],
          },
          {
            id: "section-2-2-8",
            title: "Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "Define trophic level.",
                back: "Stage in a food chain representing feeding position of an organism.",
              },
              {
                id: "fc2",
                front: "Define Net Productivity (NP).",
                back: "Rate at which energy is converted to biomass in a consumer.",
              },
              {
                id: "fc3",
                front: "Typical energy transfer efficiency?",
                back: "Approximately 10% from one trophic level to the next.",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-2-3",
        title: "Ecology Terms",
        chapterId: "2-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Habitat" },
          { id: "kw-2", word: "Microhabitat" },
          { id: "kw-3", word: "Specialist Species" },
          { id: "kw-4", word: "Generalist Species" },
          { id: "kw-5", word: "Population" },
          { id: "kw-6", word: "Abundance" },
          { id: "kw-7", word: "Distribution" },
          { id: "kw-8", word: "Community" },
          { id: "kw-9", word: "Ecosystem" },
          { id: "kw-10", word: "Biotic Components" },
          { id: "kw-11", word: "Abiotic Components" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Habitat",
            definition:
              "The place where an organism lives. Can be large (desert) or small (microhabitat, e.g., tree bark).",
          },
          {
            id: "kw-2",
            word: "Specialist Species",
            definition: "Species that can survive only in a specific habitat.",
          },
          {
            id: "kw-3",
            word: "Generalist Species",
            definition:
              "Species that can survive in a wide variety of habitats, often invasive.",
          },
          {
            id: "kw-4",
            word: "Population",
            definition:
              "All individuals of the same species living in a specific habitat.",
          },
          {
            id: "kw-5",
            word: "Community",
            definition:
              "Multiple populations of different species living and interacting in the same area.",
          },
          {
            id: "kw-6",
            word: "Ecosystem",
            definition:
              "A community and its interactions with the non-living environment.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Define key ecological terms like habitat, population, and community.",
          },
          {
            id: "obj-2",
            text: "Distinguish between specialist and generalist species.",
          },
          {
            id: "obj-3",
            text: "Explain how populations, communities, and ecosystems interact.",
          },
          {
            id: "obj-4",
            text: "Understand biotic and abiotic components in ecosystems.",
          },
        ],
        sections: [
          {
            id: "section-2-3-1",
            title: "Habitats and Microhabitats",
            type: "text" as const,
            content: `Organisms are adapted to the habitats they live in.  
A **habitat** is the place where an organism lives. Examples: desert, pond, forest.  

Small specialized habitats are called **microhabitats**, e.g., under a rock or in a tree bark crevice.`,
            completed: false,
          },
          {
            id: "section-2-3-2",
            title: "Specialists vs Generalists",
            type: "text" as const,
            content: `- **Specialist species** survive only in specific habitats.  
- **Generalist species** can survive in a variety of habitats.  

Generalists often become **invasive species**, taking over new habitats. Humans often introduce these species accidentally or deliberately, which can disrupt local ecosystems.`,
            completed: false,
          },
          {
            id: "section-2-3-3",
            title: "Population, Abundance, and Distribution",
            type: "text" as const,
            content: `- **Population:** All individuals of a species living in a specific habitat.  
- **Abundance:** Number of individuals in the population.  
- **Distribution:** The exact location of a population within its habitat.`,
            completed: false,
          },
          {
            id: "section-2-3-4",
            title: "Community and Ecosystem",
            type: "text" as const,
            content: `- **Community:** Multiple populations living and interacting in the same area.  
- **Ecosystem:** A community and its interactions with abiotic components (non-living environment).  

Key points about ecosystems:  
1. Flow of energy and recycling of nutrients occur.  
2. Biotic = living, Abiotic = non-living components.  
3. Ecosystem sizes vary from small (pond) to large (ocean).  
4. Complexity varies between ecosystems.  
5. Organisms can migrate; ecosystems are not entirely self-contained.`,
            completed: false,
          },
          {
            id: "section-2-3-5",
            title: "Ecology Terms Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Ecology Terms Quiz",
              questions: [
                {
                  id: "q1",
                  question: "What is a microhabitat?",
                  options: [
                    "A large forest",
                    "A small specialized habitat",
                    "Any habitat for a generalist species",
                    "A community of populations",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "A microhabitat is a small, specialized habitat such as under a rock or in tree bark.",
                },
                {
                  id: "q2",
                  question: "Which is a generalist species?",
                  options: ["Koala", "Panda", "Rat", "Koala and Panda"],
                  correctAnswer: 2,
                  explanation:
                    "Rats are generalist species that can survive in many habitats.",
                },
                {
                  id: "q3",
                  question:
                    "What is the difference between a community and an ecosystem?",
                  options: [
                    "Community includes abiotic factors, ecosystem does not",
                    "Ecosystem includes abiotic factors, community does not",
                    "They are the same",
                    "Community is smaller than a population",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "An ecosystem includes both the community and its interactions with abiotic factors.",
                },
              ],
            },
          },
          {
            id: "section-2-3-6",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Specialists vs Generalists",
                content:
                  "Give examples of each and explain why generalists can become invasive.",
              },
              {
                id: "tip2",
                type: "tip",
                title: "Population Terms",
                content:
                  "Use population, abundance, and distribution carefully—they are related but distinct.",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-2-4",
        title: "Factors Affecting Populations",
        chapterId: "2-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Biotic Factors" },
          { id: "kw-2", word: "Abiotic Factors" },
          { id: "kw-3", word: "Competition" },
          { id: "kw-4", word: "Intraspecific Competition" },
          { id: "kw-5", word: "Interspecific Competition" },
          { id: "kw-6", word: "Predation" },
          { id: "kw-7", word: "Parasites" },
          { id: "kw-8", word: "Population Size" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Biotic Factors",
            definition:
              "Living components that influence the abundance and distribution of a species, e.g., food, predators, disease.",
          },
          {
            id: "kw-2",
            word: "Abiotic Factors",
            definition:
              "Non-living environmental components that influence species, e.g., temperature, light, water, pH.",
          },
          {
            id: "kw-3",
            word: "Intraspecific Competition",
            definition:
              "Competition between individuals of the same species for resources.",
          },
          {
            id: "kw-4",
            word: "Interspecific Competition",
            definition:
              "Competition between individuals of different species for the same resources.",
          },
          {
            id: "kw-5",
            word: "Predation",
            definition:
              "Interaction where one organism (predator) eats another (prey), affecting population sizes.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Identify biotic and abiotic factors affecting population size.",
          },
          {
            id: "obj-2",
            text: "Explain how competition, predation, and disease affect population abundance.",
          },
          {
            id: "obj-3",
            text: "Understand the impact of human activities on populations.",
          },
          {
            id: "obj-4",
            text: "Describe examples of abiotic factors influencing populations.",
          },
        ],
        sections: [
          {
            id: "section-2-4-1",
            title: "Biotic Factors",
            type: "text" as const,
            content: `Biotic factors are living factors that influence populations in a habitat. They result from the activities of other organisms and include:  

1. **Food Availability:** More food increases survival and reproduction, leading to larger populations.  
2. **Predation:** Predators regulate prey populations. In balanced ecosystems, predators prevent overpopulation, but new predators can unbalance the system.  
3. **Parasites and Disease:** New pathogens can reduce populations.  
4. **Cooperation:** Some species cooperate to improve survival.  
5. **Intraspecific Competition:** Competition between individuals of the same species for resources.  
6. **Interspecific Competition:** Competition between different species.  

Human impacts: Predators can be introduced for sport, affecting native populations by predation, competition, and introducing new pathogens.`,
            completed: false,
          },
          {
            id: "section-2-4-2",
            title: "Competition",
            type: "text" as const,
            content: `Competition occurs when species compete for the same resources.  

- One species may outcompete another, reducing the population size of the less adapted species.  
- If numbers fall too low, the species may fail to reproduce effectively and may be locally extinct.`,
            completed: false,
          },
          {
            id: "section-2-4-3",
            title: "Abiotic Factors",
            type: "text" as const,
            content: `Abiotic factors are non-living components of the environment that affect populations. Examples include:  

- Temperature (affects photosynthesis and metabolic rates)  
- Turbidity or cloudiness of water  
- Humidity  
- Light intensity and wavelength (affects plant growth)  
- Soil or water pH  
- Soil or water salinity  
- Oxygen and carbon dioxide concentration  
- Soil composition`,
            completed: false,
          },
          {
            id: "section-2-4-4",
            title: "Abiotic Factor Effects Chart",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "factor", label: "Abiotic Factor", sortable: true },
                {
                  key: "effect",
                  label: "Effect on Population",
                  sortable: true,
                },
                { key: "example", label: "Example", sortable: true },
              ],
              data: [
                {
                  factor: "Temperature",
                  effect: "Affects metabolic rate and photosynthesis",
                  example: "Cold water slows growth of aquatic plants",
                },
                {
                  factor: "Light Intensity",
                  effect:
                    "Increases plant growth, affecting herbivore population",
                  example: "More sunlight → faster growth of grass",
                },
                {
                  factor: "Soil pH",
                  effect: "Limits plant species that can grow",
                  example: "Acidic soil → fewer plant species",
                },
                {
                  factor: "O2 Concentration",
                  effect: "Affects respiration of aquatic animals",
                  example: "Low oxygen → fish mortality",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-2-4-5",
            title: "Quiz: Factors Affecting Populations",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Population Factors Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which is a biotic factor?",
                  options: [
                    "Temperature",
                    "Food Availability",
                    "pH",
                    "Light Intensity",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Food availability is a living factor, making it biotic.",
                },
                {
                  id: "q2",
                  question: "What is intraspecific competition?",
                  options: [
                    "Competition between different species",
                    "Competition between the same species",
                    "Predation between species",
                    "Cooperation within a species",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Intraspecific competition occurs between members of the same species.",
                },
                {
                  id: "q3",
                  question: "How can humans affect population dynamics?",
                  options: [
                    "By introducing new predators",
                    "By altering habitat",
                    "By introducing new diseases",
                    "All of the above",
                  ],
                  correctAnswer: 3,
                  explanation:
                    "Humans can impact populations through predation, habitat change, and introducing new pathogens.",
                },
              ],
            },
          },
          {
            id: "section-2-4-6",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Abiotic vs Biotic",
                content:
                  "Remember to classify each factor correctly; some may seem confusing like light and temperature.",
              },
              {
                id: "tip2",
                type: "tip",
                title: "Competition Examples",
                content:
                  "Include both intraspecific and interspecific examples to demonstrate understanding.",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-2-5",
        title: "Niche and Species Interactions",
        chapterId: "2-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Niche" },
          { id: "kw-2", word: "Direct Competition" },
          { id: "kw-3", word: "Species Abundance" },
          { id: "kw-4", word: "Distribution" },
          { id: "kw-5", word: "Interspecific Competition" },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Niche",
            definition:
              "The role of an organism in its habitat, including what it eats, where it lives, when it is active, and its interactions with other species.",
          },
          {
            id: "kw-2",
            word: "Interspecific Competition",
            definition:
              "Competition between different species for the same resources in a habitat.",
          },
          {
            id: "kw-3",
            word: "Species Abundance",
            definition: "The number of individuals of a species in a habitat.",
          },
          {
            id: "kw-4",
            word: "Distribution",
            definition:
              "The spatial location of a population within a habitat.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Define the ecological niche and its components.",
          },
          {
            id: "obj-2",
            text: "Explain why two species cannot occupy the same niche.",
          },
          {
            id: "obj-3",
            text: "Understand how niche affects species abundance and distribution.",
          },
        ],
        sections: [
          {
            id: "section-2-5-1",
            title: "What is a Niche?",
            type: "text" as const,
            content: `A **niche** is the role of an organism in its habitat. It includes:  

1. What it eats (food source)  
2. What it is prey for (predators)  
3. Where it lives (microhabitat)  
4. Where it feeds (feeding location)  
5. When it is active (diurnal/nocturnal activity)  

Understanding a species’ niche helps explain its interactions, abundance, and distribution.`,
            completed: false,
          },
          {
            id: "section-2-5-2",
            title: "Niche Overlap and Competition",
            type: "text" as const,
            content: `Two species **cannot occupy the exact same niche** in the same habitat. If they attempt to, **direct interspecific competition** occurs, and one species will be outcompeted and eventually disappear.  

Sometimes species may appear to share a niche, but they differ in at least one of the five roles, e.g., feeding at different times of day or using slightly different microhabitats.`,
            completed: false,
          },
          {
            id: "section-2-5-3",
            title: "Niche and Species Abundance & Distribution",
            type: "text" as const,
            content: `- The more species have similar niches, the lower the abundance of each species due to competition.  
- The niche also determines **distribution**, as species move to areas where their adaptations give them a competitive advantage.  
- Movement caused by niche preference changes the spatial distribution of species within a habitat.`,
            completed: false,
          },
          {
            id: "section-2-5-4",
            title: "Niche Illustration",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Niche_Diagram.svg/1200px-Niche_Diagram.svg.png",
            completed: false,
          },
          {
            id: "section-2-5-5",
            title: "Quiz: Understanding Niches",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Niche and Competition Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Which of the following is NOT part of a species’ niche?",
                  options: [
                    "Where it lives",
                    "What it eats",
                    "Number of offspring",
                    "When it is active",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Number of offspring is part of population dynamics, not the niche.",
                },
                {
                  id: "q2",
                  question:
                    "What happens if two species occupy the same niche?",
                  options: [
                    "They coexist peacefully",
                    "Direct interspecific competition occurs",
                    "Both species benefit",
                    "The niche disappears",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Direct interspecific competition will occur, and one species may be outcompeted.",
                },
                {
                  id: "q3",
                  question: "How does niche affect distribution?",
                  options: [
                    "Species move to areas suited to their niche",
                    "Distribution is random",
                    "Only predators affect distribution",
                    "Abiotic factors have no role",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Species occupy areas that match their adaptations and niche requirements.",
                },
              ],
            },
          },
          {
            id: "section-2-5-6",
            title: "Examiner Tip",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Focus on the 5 roles",
                content:
                  "Always list all 5 components of a niche when asked for full marks.",
              },
              {
                id: "tip2",
                type: "tip",
                title: "Competition Questions",
                content:
                  "Remember to explain how niche differences reduce direct competition.",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-2-6",
        title: "Core Practical 2: Quadrats & Transects",
        chapterId: "2-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Quadrat" },
          { id: "kw-2", word: "Transect" },
          { id: "kw-3", word: "Sampling" },
          { id: "kw-4", word: "Abundance" },
          { id: "kw-5", word: "Distribution" },
          { id: "kw-6", word: "Abiotic Factors" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Understand random vs systematic sampling" },
          {
            id: "obj-2",
            text: "Use quadrats and transects to estimate abundance and distribution",
          },
          {
            id: "obj-3",
            text: "Measure relevant abiotic factors in a habitat",
          },
          { id: "obj-4", text: "Visualize data using kite diagrams" },
        ],
        sections: [
          {
            id: "section-2-6-1",
            title: "Sampling Methods",
            type: "text" as const,
            content: `Sampling is used when counting every organism is impractical.

**Random Sampling:** eliminates bias; sample points chosen randomly.  
**Systematic Sampling:** sample points at fixed intervals to study effects of gradients (Transects).  
Use random for uniform habitats, systematic for habitats with environmental gradients.`,
            completed: false,
            links: [
              {
                title: "Random vs Systematic Sampling",
                url: "https://www.biologyonline.com/dictionary/sampling",
              },
            ],
          },
          {
            id: "section-2-6-2",
            title: "Quadrats",
            type: "text" as const,
            content: `Quadrats are frames used to study sessile organisms.  

- Small quadrats (~1 m²) for herbs, limpets  
- Large quadrats (~400 m²) for trees  

**Data collection:**  
- **ACFOR scale:** Abundant, Common, Frequent, Occasional, Rare  
- **Frequency:** count species  
- **Percentage cover:** divide quadrat into smaller squares; if >50% covered, count as 1`,
            completed: false,
          },
          {
            id: "section-2-6-3",
            title: "Point Quadrats",
            type: "text" as const,
            content: `Vertical frame with pins. Each pin-touched species counted. Useful for dense vegetation where frame cannot lie flat.  

Percentage cover = (Number of pin-touches / Total pins) x 100`,
            completed: false,
          },
          {
            id: "section-2-6-4",
            title: "Transects",
            type: "text" as const,
            content: `Transects are lines across habitats to study abundance & distribution along a gradient.

**Types:**  
1. Continuous Line – count every species touching tape  
2. Interrupted Line – count species at intervals  
3. Continuous Belt – frames end-to-end along line  
4. Interrupted Belt – frames at intervals (e.g., every 1 m)`,
            completed: false,
            links: [
              {
                title: "Transects in Ecology",
                url: "https://www.britannica.com/science/transect-ecology",
              },
            ],
          },
          {
            id: "section-2-6-5",
            title: "Measuring Abiotic Factors",
            type: "text" as const,
            content: `Relevant abiotic factors affect abundance & distribution:

- Temperature: Thermometer  
- Light intensity: Light meter  
- Dissolved O₂: O₂ sensor  
- Humidity: Hygrometer  
- Rainfall: Rain gauge  
- pH: Indicator  
- Landscape relief & slope: Map contours, clinometer  
- Turbidity: Secchi disc or turbidity meter  
- Site aspect: Compass  
- Soil water content: Drying & mass measurement`,
            completed: false,
          },
          {
            id: "section-2-6-6",
            title: "Kite Diagram Visualization",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/9/94/Kite_diagram_example.png",
            completed: false,
          },
          {
            id: "section-2-6-7",
            title: "Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "Purpose of quadrat?",
                back: "Study abundance & distribution of sessile organisms",
              },
              {
                id: "fc2",
                front: "Random vs systematic sampling?",
                back: "Random eliminates bias; systematic reveals patterns along gradients",
              },
              {
                id: "fc3",
                front: "What is a transect?",
                back: "Line laid across habitat to study abundance & distribution along gradient",
              },
              {
                id: "fc4",
                front: "Percentage cover with point quadrat?",
                back: "(Number of pin-touches / Total pins) x 100",
              },
            ],
          },
          {
            id: "section-2-6-8",
            title: "Quiz: Sampling & Quadrat Techniques",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Core Practical 2 Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which sampling method eliminates bias?",
                  options: [
                    "Random",
                    "Systematic",
                    "Continuous",
                    "Interrupted",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Random sampling ensures unbiased sample selection.",
                },
                {
                  id: "q2",
                  question: "Quadrats can be used for which organisms?",
                  options: ["Mobile", "Sessile", "Predators", "All"],
                  correctAnswer: 1,
                  explanation:
                    "Quadrats are used for immobile organisms like plants or limpets.",
                },
                {
                  id: "q3",
                  question: "Continuous belt transect means?",
                  options: [
                    "Single line of pins",
                    "Frames end-to-end along tape line",
                    "Frames at intervals",
                    "Line with random points",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Frames placed end-to-end measure species along transect.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-2-7",
        title: "Ecological Succession",
        chapterId: "2-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Succession" },
          { id: "kw-2", word: "Primary Succession" },
          { id: "kw-3", word: "Secondary Succession" },
          { id: "kw-4", word: "Pioneer Species" },
          { id: "kw-5", word: "Climax Community" },
          { id: "kw-6", word: "Plagioclimax" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand the process of ecological succession",
          },
          {
            id: "obj-2",
            text: "Distinguish between primary and secondary succession",
          },
          { id: "obj-3", text: "Recognize human impact on succession" },
          {
            id: "obj-4",
            text: "Identify pioneer, intermediate, and climax species",
          },
        ],
        sections: [
          {
            id: "section-2-7-1",
            title: "Introduction to Succession",
            type: "text" as const,
            content: `Ecosystems are DYNAMIC and constantly changing.  
Succession is the **process of ecosystem change over time**, where both biotic and abiotic factors change.`,
            completed: false,
          },
          {
            id: "section-2-7-2",
            title: "Primary Succession",
            type: "text" as const,
            content: `Occurs on newly formed or exposed land (bare rock, sand dunes, ocean edges).  

**Stages:**  
1. **Colonization by pioneer species:** Lichens and mosses germinate in harsh conditions  
2. Pioneers die → form thin, nutrient-poor soil  
3. Grass and small plants arrive → stabilize soil, increase nutrients  
4. Small trees and shrubs → deeper soil formation  
5. Large trees arrive → final **climax community** forms  

**Climax community**: Most stable, may not be most biodiverse. Type depends on original land:  
- Tropics → Rainforest  
- Temperate → Deciduous woodland`,
            completed: false,
            links: [
              {
                title: "Primary Succession Video",
                url: "https://www.khanacademy.org/science/biology/ecology/primary-secondary-succession",
              },
            ],
          },
          {
            id: "section-2-7-3",
            title: "Secondary Succession",
            type: "text" as const,
            content: `Begins on previously occupied land where soil is already present.  

Causes: Wildfires, deforestation, abandoned farmland.  
Process is faster than primary succession because soil and seed bank already exist.`,
            completed: false,
          },
          {
            id: "section-2-7-4",
            title: "Human Impact on Succession",
            type: "text" as const,
            content: `Human activities can interrupt succession:

- **Mowing:** prevents woody plants in lawns  
- **Grazing:** livestock prevent establishment of new plants  

Climax communities resulting from human activity are called **Plagioclimax communities**, e.g., Heathland.`,
            completed: false,
          },
          {
            id: "section-2-7-5",
            title: "Succession Table: Pioneer → Climax",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "stage", label: "Succession Stage", sortable: true },
                { key: "species_type", label: "Species Type", sortable: true },
                { key: "soil_quality", label: "Soil Quality", sortable: true },
                { key: "notes", label: "Notes", sortable: false },
              ],
              data: [
                {
                  stage: "Pioneer",
                  species_type: "Lichens, Mosses",
                  soil_quality: "None → Very poor",
                  notes: "Can germinate on bare rock",
                },
                {
                  stage: "Intermediate",
                  species_type: "Grass, Small Plants",
                  soil_quality: "Thin, nutrient-poor",
                  notes: "Stabilizes soil, adds organic matter",
                },
                {
                  stage: "Intermediate",
                  species_type: "Shrubs, Small Trees",
                  soil_quality: "Moderate, deeper",
                  notes: "Roots anchor soil, add nutrients",
                },
                {
                  stage: "Climax",
                  species_type: "Large Trees",
                  soil_quality: "Deep, nutrient-rich",
                  notes: "Stable, final community",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-2-7-6",
            title: "Succession Growth Chart",
            type: "chart" as const,
            completed: false,
            chartData: {
              type: "line",
              data: [
                { x: 0, y: 0, species: "Bare rock" },
                { x: 1, y: 5, species: "Pioneers" },
                { x: 2, y: 15, species: "Grasses & small plants" },
                { x: 3, y: 40, species: "Shrubs & small trees" },
                { x: 4, y: 80, species: "Large trees / Climax" },
              ],
              xKey: "x",
              yKey: "y",
              allowTypeSwitch: true,
              colors: ["#10b981"],
            },
          },
          {
            id: "section-2-7-7",
            title: "Succession Image",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/2/2a/Ecological_succession_diagram.png",
            completed: false,
          },
          {
            id: "section-2-7-8",
            title: "Tips for Exams",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Sequence Matters",
                content:
                  "Always describe succession in order: Pioneer → Intermediate → Climax.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "Primary vs Secondary",
                content:
                  "Check whether soil was already present; if yes, it's secondary succession.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Human Impact",
                content:
                  "Mention Plagioclimax if humans intervene in succession.",
              },
            ],
          },
          {
            id: "section-2-7-9",
            title: "Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is primary succession?",
                back: "Succession starting on newly formed/exposed land with no soil.",
              },
              {
                id: "fc2",
                front: "What is secondary succession?",
                back: "Succession on previously occupied land where soil already exists.",
              },
              {
                id: "fc3",
                front: "Define pioneer species",
                back: "First species to colonize bare land; can survive harsh conditions.",
              },
              {
                id: "fc4",
                front: "What is a climax community?",
                back: "Final, stable community formed at the end of succession.",
              },
            ],
          },
          {
            id: "section-2-7-10",
            title: "Succession Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Ecological Succession Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which species are usually pioneers?",
                  options: [
                    "Large trees",
                    "Grasses",
                    "Lichens & Mosses",
                    "Shrubs",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Pioneers are hardy species like lichens and mosses.",
                },
                {
                  id: "q2",
                  question: "Secondary succession occurs when:",
                  options: [
                    "Bare rock is exposed",
                    "Soil is already present",
                    "Climax community is formed",
                    "Plagioclimax forms",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Secondary succession occurs on land with existing soil.",
                },
                {
                  id: "q3",
                  question: "Human intervention can create:",
                  options: [
                    "Climax community",
                    "Plagioclimax",
                    "Primary succession",
                    "Pioneer species",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Plagioclimax is a stable community caused by humans.",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "env-bio-1",
    title: "Env. Biology",
    subjectId: "bio-t5",
    progress: 0,
    lessons: [
      {
        id: "lesson-env-1",
        title: "Evidence for Climate Change",
        chapterId: "env-bio-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Climate" },
          { id: "kw-2", word: "Climate Change" },
          { id: "kw-3", word: "Global Warming" },
          { id: "kw-4", word: "Dendrochronology" },
          { id: "kw-5", word: "Peat Bogs" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand what climate change is and its causes",
          },
          { id: "obj-2", text: "Identify evidence for climate change" },
          {
            id: "obj-3",
            text: "Interpret data from ice cores, pollen, and tree rings",
          },
        ],
        sections: [
          {
            id: "section-env-1-1",
            title: "Introduction",
            type: "text" as const,
            content: `**Climate** refers to weather conditions over long periods (decades).  
**Climate Change** refers to long-term changes in climate; nowadays it usually refers to global warming.  
Scientists hypothesize that current climate change is caused mainly by human activities increasing greenhouse gas concentrations.`,
            completed: false,
          },
          {
            id: "section-env-1-2",
            title: "Evidence for Climate Change",
            type: "text" as const,
            content: `Four main types of evidence:

1. Increasing global temperature records  
2. Increasing atmospheric CO2 levels  
3. Changing plant communities (from preserved pollen in peat bogs)  
4. Tree growth changes (dendrochronology)`,
            completed: false,
          },
          {
            id: "section-env-1-3",
            title: "Atmospheric CO2 & Global Temperature",
            type: "text" as const,
            content: `**CO2 Levels:**  
- Natural fluctuations due to volcanic eruptions and weathering of limestone  
- Measured via **ancient ice cores**, which trap air bubbles from thousands of years ago  
- Industrial Revolution caused unprecedented rise: from 300ppm → 400ppm  

**Temperature:**  
- Global thermometer records show upward trend since mid-1800s  
- CO2 and temperature correlation is strong evidence of global warming`,
            completed: false,
          },
          {
            id: "section-env-1-4",
            title: "CO2 & Temperature Chart",
            type: "chart" as const,
            chartData: {
              type: "line",
              data: [
                { year: 1750, CO2: 280, temp: 13.7 },
                { year: 1800, CO2: 285, temp: 13.8 },
                { year: 1850, CO2: 290, temp: 13.9 },
                { year: 1900, CO2: 295, temp: 14.0 },
                { year: 1950, CO2: 310, temp: 14.2 },
                { year: 2000, CO2: 370, temp: 14.6 },
                { year: 2020, CO2: 400, temp: 14.8 },
              ],
              xKey: "year",
              yKey: "CO2",
              allowTypeSwitch: true,
              colors: ["#ef4444", "#3b82f6"],
            },
            completed: false,
          },
          {
            id: "section-env-1-5",
            title: "Preserved Pollen in Peat Bogs",
            type: "text" as const,
            content: `Peat bogs form under waterlogged, acidic conditions, slowing decomposition.  
- Each layer preserves pollen from plants of that era  
- Pollen identification shows which plant species existed  
- Shifts in plant types indicate warming: warm-adapted species increase while cool-adapted species decrease`,
            completed: false,
          },
          {
            id: "section-env-1-6",
            title: "Dendrochronology",
            type: "text" as const,
            content: `Tree rings represent seasonal growth:  
- **Spring/Summer:** wide, light-colored rings → fast growth → warmer conditions  
- **Autumn/Winter:** narrow, dark rings → slow growth → cooler conditions  

By analyzing old trees, we can reconstruct climate patterns for hundreds of years.`,
            completed: false,
          },
          {
            id: "section-env-1-7",
            title: "Tree Ring Diagram",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Tree_Rings.jpg",
            completed: false,
          },
          {
            id: "section-env-1-8",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is dendrochronology?",
                back: "The study of tree rings to determine past climatic conditions.",
              },
              {
                id: "fc-2",
                front: "How do peat bogs provide climate evidence?",
                back: "Peat preserves pollen layers that reveal past plant species and climates.",
              },
              {
                id: "fc-3",
                front: "What is the significance of CO2 ice core data?",
                back: "It shows historical atmospheric CO2 levels, confirming trends over time.",
              },
            ],
          },
          {
            id: "section-env-1-9",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Correlation vs Causation",
                content:
                  "Remember: correlation between CO2 and temperature does not always prove causation, but other evidence supports it.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Ice Core Analysis",
                content:
                  "Do not confuse ice core age with depth; deeper ice is older.",
              },
            ],
          },
          {
            id: "section-env-1-10",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Evidence for Climate Change Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Which of the following is direct evidence of past climate?",
                  options: [
                    "Ice cores",
                    "Thermometers",
                    "Satellites",
                    "All of the above",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Ice cores contain historical CO2 and temperature data.",
                },
                {
                  id: "q2",
                  question: "Wider tree rings indicate:",
                  options: [
                    "Cooler weather",
                    "Warmer weather",
                    "More precipitation only",
                    "Drought conditions",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Wider rings form during warm and favorable growing seasons.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-2",
        title: "Anthropogenic Climate Change",
        chapterId: "env-bio-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Greenhouse Effect" },
          { id: "kw-2", word: "Anthropogenic Climate Change" },
          { id: "kw-3", word: "Greenhouse Gases" },
          { id: "kw-4", word: "CO2" },
          { id: "kw-5", word: "Methane (CH4)" },
          { id: "kw-6", word: "Carbon Sinks" },
          { id: "kw-7", word: "Permafrost" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain the greenhouse effect and its importance for life on Earth",
          },
          {
            id: "obj-2",
            text: "Describe how human activities increase greenhouse gas concentrations",
          },
          {
            id: "obj-3",
            text: "Identify sources of anthropogenic CO2 and CH4",
          },
          {
            id: "obj-4",
            text: "Understand the link between greenhouse gases and global warming",
          },
        ],
        sections: [
          {
            id: "section-env-2-1",
            title: "Introduction to Anthropogenic Climate Change",
            type: "text" as const,
            content: `The **Greenhouse Effect** occurs when long-wave infrared radiation from Earth is absorbed and re-emitted by atmospheric greenhouse gases, trapping heat in the atmosphere.  
This natural process is crucial for maintaining temperatures suitable for life.  
Human activities have increased concentrations of **CO2, CH4, and N2O**, intensifying the greenhouse effect and causing **Anthropogenic Climate Change**.`,
            completed: false,
          },
          {
            id: "section-env-2-2",
            title: "Mechanism of Greenhouse Effect",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/3/32/Enhanced_Greenhouse_Effect.png",
            completed: false,
          },
          {
            id: "section-env-2-3",
            title: "Sources of CO2",
            type: "text" as const,
            content: `**Historical Fluctuations:** CO2 levels naturally fluctuated due to volcanic eruptions and limestone weathering.  
**Industrial Revolution:** Combustion of fossil fuels since the 1800s drastically increased atmospheric CO2.  
**Carbon Sinks** are being destroyed:  
- Trees (deforestation)  
- Oceans (warming & pollution)  
- Soil (plowing, overfarming, erosion, fertilizers)  
- Peat bogs (harvesting)  
- Fossil fuels (burning for energy)`,
            completed: false,
          },
          {
            id: "section-env-2-4",
            title: "Sources of Methane (CH4)",
            type: "text" as const,
            content: `Methane has increased over the last 150 years due to human activity:  
- **Ruminant animals:** cows, sheep – enteric fermentation releases CH4  
- **Landfills:** anaerobic decomposition of organic matter  
- **Fossil fuel extraction**  
- **Waterlogged rice paddies**  
- **Melting permafrost** releases stored CH4`,
            completed: false,
          },
          {
            id: "section-env-2-5",
            title: "Atmospheric GHG Concentration Chart",
            type: "chart" as const,
            chartData: {
              type: "line",
              data: [
                { year: 1750, CO2: 280, CH4: 700 },
                { year: 1800, CO2: 285, CH4: 750 },
                { year: 1850, CO2: 290, CH4: 800 },
                { year: 1900, CO2: 295, CH4: 900 },
                { year: 1950, CO2: 310, CH4: 1100 },
                { year: 2000, CO2: 370, CH4: 1750 },
                { year: 2020, CO2: 400, CH4: 1850 },
              ],
              xKey: "year",
              yKey: "CO2",
              allowTypeSwitch: true,
              colors: ["#ef4444", "#f59e0b"],
            },
            completed: false,
          },
          {
            id: "section-env-2-6",
            title: "Effects of Anthropogenic GHGs",
            type: "text" as const,
            content: `- Global warming: rise in average global temperature  
- Altered precipitation patterns  
- Changes in wind and ocean currents  
- Increased frequency of extreme weather events  
**Note:** Climate change is broader than just global warming; global warming contributes to it.`,
            completed: false,
          },
          {
            id: "section-env-2-7",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is the greenhouse effect?",
                back: "The trapping of heat in Earth's atmosphere by greenhouse gases.",
              },
              {
                id: "fc-2",
                front: "Name three greenhouse gases",
                back: "CO2, CH4 (Methane), N2O (Nitrous Oxide)",
              },
              {
                id: "fc-3",
                front: "What is anthropogenic climate change?",
                back: "Climate change caused by human activities that increase greenhouse gas concentrations.",
              },
            ],
          },
          {
            id: "section-env-2-8",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Focus on human sources",
                content:
                  "Be able to identify human contributions to CO2 and CH4 increases.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "CO2 vs CH4",
                content:
                  "Remember CO2 lasts thousands of years and contributes ~70% of warming effect; CH4 lasts ~10 years and contributes ~20%.",
              },
            ],
          },
          {
            id: "section-env-2-9",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Anthropogenic Climate Change Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Which human activity contributes most to CO2 increase?",
                  options: [
                    "Deforestation",
                    "Fossil fuel combustion",
                    "Rice farming",
                    "Livestock",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Combustion of fossil fuels releases large amounts of CO2.",
                },
                {
                  id: "q2",
                  question: "Which gas is released by ruminants?",
                  options: ["CO2", "CH4", "N2O", "O2"],
                  correctAnswer: 1,
                  explanation:
                    "Methane is released during enteric fermentation in the rumen.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-3",
        title: "The Global Carbon Cycle",
        chapterId: "env-bio-1",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Carbon Cycle" },
          { id: "kw-2", word: "Carbon Sinks" },
          { id: "kw-3", word: "Carbon Fluxes" },
          { id: "kw-4", word: "Photosynthesis" },
          { id: "kw-5", word: "Respiration" },
          { id: "kw-6", word: "Decomposition" },
          { id: "kw-7", word: "Fossil Fuels" },
        ],
        kw: [
          {
            id: "kwd-1",
            word: "Carbon Sinks",
            definition:
              "Natural or artificial reservoirs that store carbon, e.g., forests, oceans, soil, and peat bogs.",
          },
          {
            id: "kwd-2",
            word: "Carbon Fluxes",
            definition:
              "Processes by which carbon is transferred between carbon sinks, such as photosynthesis, respiration, and combustion.",
          },
          {
            id: "kwd-3",
            word: "Photosynthesis",
            definition:
              "The process by which producers remove CO2 from the atmosphere and convert it into organic compounds like glucose.",
          },
          {
            id: "kwd-4",
            word: "Respiration",
            definition:
              "The process by which living organisms release CO2 back into the atmosphere by breaking down organic compounds for energy.",
          },
          {
            id: "kwd-5",
            word: "Decomposition",
            definition:
              "The breakdown of dead organisms by fungi and bacteria, releasing carbon back into the atmosphere or soil.",
          },
          {
            id: "kwd-6",
            word: "Fossilization",
            definition:
              "The slow formation of fossil fuels or peat from dead organisms under anaerobic conditions over millions of years.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand how carbon is cycled between the atmosphere, organisms, and sinks",
          },
          {
            id: "obj-2",
            text: "Identify processes that transfer and store carbon",
          },
          {
            id: "obj-3",
            text: "Recognize human activities that affect the carbon cycle",
          },
          {
            id: "obj-4",
            text: "Interpret carbon fluxes and understand their impact on climate",
          },
        ],
        sections: [
          {
            id: "section-env-3-1",
            title: "Introduction",
            type: "text" as const,
            content: `The **Global Carbon Cycle** describes how carbon is transferred and stored in the environment.  
Carbon is found in living organisms as biomolecules (carbohydrates, proteins), in the atmosphere as CO2, and in oceans as HCO3- ions.  
Carbon moves between organisms through feeding, digestion, respiration, decomposition, and fossilization.`,
            completed: false,
          },
          {
            id: "section-env-3-2",
            title: "Key Processes in the Carbon Cycle",
            type: "text" as const,
            content: `**Carbon Fixation:** Producers remove CO2 from the atmosphere via photosynthesis.  
**Feeding:** Carbon is transferred to consumers when they eat producers.  
**Respiration:** Producers and consumers release CO2 back into the atmosphere.  
**Decomposition:** Fungi and bacteria decompose dead organisms, releasing CO2.  
**Fossilization:** Incomplete decomposition forms fossil fuels or peat over millions of years.  
**Combustion:** Humans release stored carbon by burning fossil fuels or biomass.`,
            completed: false,
          },
          {
            id: "section-env-3-3",
            title: "Carbon Cycle Diagram",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/8/84/Carbon_cycle.jpg",
            completed: false,
          },
          {
            id: "section-env-3-4",
            title: "Carbon Pools and Fluxes",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "pool", label: "Carbon Pool", sortable: true },
                { key: "description", label: "Description", sortable: true },
                { key: "flux", label: "Flux Process", sortable: false },
              ],
              data: [
                {
                  pool: "Atmosphere",
                  description: "CO2 gas",
                  flux: "Photosynthesis, Respiration, Combustion",
                },
                {
                  pool: "Oceans",
                  description: "Dissolved CO2, HCO3- ions",
                  flux: "Diffusion, Marine photosynthesis",
                },
                {
                  pool: "Biosphere",
                  description: "Plants, animals, microorganisms",
                  flux: "Feeding, Respiration, Decomposition",
                },
                {
                  pool: "Soil & Peat",
                  description: "Organic matter",
                  flux: "Decomposition, Fossilization",
                },
                {
                  pool: "Fossil Fuels",
                  description: "Coal, oil, gas",
                  flux: "Combustion",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-env-3-5",
            title: "Human Impacts on the Carbon Cycle",
            type: "text" as const,
            content: `Human activities affect the carbon cycle by:  
- Burning fossil fuels → releases CO2  
- Deforestation → reduces carbon stored in trees  
- Soil degradation and peat extraction → releases stored carbon  
- Reducing photosynthesis in natural sinks → decreases CO2 removal`,
            completed: false,
          },
          {
            id: "section-env-3-6",
            title: "Carbon Cycle Chart",
            type: "chart" as const,
            chartData: {
              type: "bar",
              data: [
                { pool: "Atmosphere", carbon: 750 },
                { pool: "Oceans", carbon: 38000 },
                { pool: "Biosphere", carbon: 550 },
                { pool: "Soil & Peat", carbon: 1500 },
                { pool: "Fossil Fuels", carbon: 4000 },
              ],
              xKey: "pool",
              yKey: "carbon",
              allowTypeSwitch: true,
              colors: ["#3b82f6"],
            },
            completed: false,
          },
          {
            id: "section-env-3-7",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is a carbon sink?",
                back: "A reservoir that stores carbon, such as forests, oceans, soil, and peat bogs.",
              },
              {
                id: "fc-2",
                front: "What are carbon fluxes?",
                back: "Processes that transfer carbon between pools, like photosynthesis, respiration, decomposition, and combustion.",
              },
              {
                id: "fc-3",
                front: "How does fossilization affect the carbon cycle?",
                back: "Dead organic matter that is incompletely decomposed forms fossil fuels or peat over millions of years.",
              },
            ],
          },
          {
            id: "section-env-3-8",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Draw the cycle clearly",
                content:
                  "Label carbon pools and fluxes; indicate processes with arrows.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Do not confuse pools with fluxes",
                content:
                  "Pools are storage areas, fluxes are processes transferring carbon between pools.",
              },
            ],
          },
          {
            id: "section-env-3-9",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Global Carbon Cycle Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which process removes CO2 from the atmosphere?",
                  options: [
                    "Respiration",
                    "Combustion",
                    "Photosynthesis",
                    "Decomposition",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Photosynthesis by producers removes CO2 from the atmosphere.",
                },
                {
                  id: "q2",
                  question:
                    "Which carbon pool stores the largest amount of carbon?",
                  options: [
                    "Atmosphere",
                    "Oceans",
                    "Biosphere",
                    "Fossil Fuels",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Oceans store the largest amount of carbon in the form of dissolved CO2 and bicarbonate.",
                },
                {
                  id: "q3",
                  question:
                    "Human activities that affect the carbon cycle include:",
                  options: [
                    "Deforestation",
                    "Burning fossil fuels",
                    "Peat extraction",
                    "All of the above",
                  ],
                  correctAnswer: 3,
                  explanation:
                    "All listed human activities release or prevent storage of carbon.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-4",
        title: "Models for Predicting Climate Change",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Extrapolation",
            definition: "Using existing data to predict future trends.",
          },
          {
            id: "kw-2",
            word: "IPCC",
            definition:
              "Intergovernmental Panel for Climate Change; a group of scientists predicting climate futures.",
          },
          {
            id: "kw-3",
            word: "Tipping Point",
            definition:
              "A threshold where small changes can cause a significant or sudden effect.",
          },
          {
            id: "kw-4",
            word: "Carbon Capture Technology",
            definition:
              "Technologies designed to remove CO2 from the atmosphere.",
          },
          {
            id: "kw-5",
            word: "Global Climate Model",
            definition:
              "Computer-based simulation of climate systems to predict future climate changes.",
          },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain how climate data can be used to predict future changes",
          },
          {
            id: "obj-2",
            text: "Understand the role of IPCC in climate prediction",
          },
          {
            id: "obj-3",
            text: "Identify limitations of climate prediction models",
          },
          {
            id: "obj-4",
            text: "Recognize human actions that can influence future climate scenarios",
          },
        ],
        sections: [
          {
            id: "section-env-4-1",
            title: "Introduction",
            type: "text" as const,
            content: `**Extrapolation** uses current and historical climate data to predict future trends in global warming and climate change.  
These predictions help in planning infrastructure, funding research, and raising awareness about human impact on climate.`,
            completed: false,
          },
          {
            id: "section-env-4-2",
            title: "IPCC Climate Predictions",
            type: "text" as const,
            content: `The **IPCC** uses extrapolated data to produce future climate scenarios under different levels of human activity:  
- If humans reduce fossil fuel use, global temperature rise could be limited to ~2ºC above pre-industrial levels.  
- If humans continue current practices, temperature rise may exceed 4ºC.  

IPCC data can also feed into **Global Climate Models** to predict impacts on specific regions.`,
            completed: false,
          },
          {
            id: "section-env-4-3",
            title: "Limitations of Prediction Models",
            type: "text" as const,
            content: `Limitations include:  
- Uncertainty about future human behavior and emissions reductions  
- Effectiveness of future technologies like **Carbon Capture**  
- Complexity of climate systems and interactions  
- Unknown tipping points, such as rapid permafrost melting releasing large amounts of methane  
- Influence of non-human factors, e.g., volcanic eruptions cooling the Earth temporarily`,
            completed: false,
          },
          {
            id: "section-env-4-4",
            title: "Predicted Temperature Scenarios Table",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "scenario", label: "Scenario", sortable: true },
                { key: "description", label: "Description", sortable: true },
                {
                  key: "tempRise",
                  label: "Predicted Temp Rise (ºC)",
                  sortable: true,
                },
              ],
              data: [
                {
                  scenario: "Low Emission",
                  description: "Humans drastically reduce fossil fuel use",
                  tempRise: "≈2",
                },
                {
                  scenario: "Medium Emission",
                  description: "Partial reduction in emissions",
                  tempRise: "≈3",
                },
                {
                  scenario: "High Emission",
                  description: "Continue current emissions practices",
                  tempRise: ">4",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-env-4-5",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is extrapolation in climate science?",
                back: "Using historical and current data to predict future climate trends.",
              },
              {
                id: "fc-2",
                front: "What is a tipping point in climate systems?",
                back: "A threshold where small changes can cause a sudden, large impact on the climate.",
              },
              {
                id: "fc-3",
                front: "Name one limitation of climate prediction models",
                back: "Uncertainty about future human emissions or effectiveness of carbon capture technology.",
              },
            ],
          },
          {
            id: "section-env-4-6",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Link scenarios to actions",
                content:
                  "Always connect predicted temperature rises to human behavior (emissions) in exam answers.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Tipping Points",
                content:
                  "Mention tipping points like permafrost melting or ice sheet collapse as potential rapid climate accelerators.",
              },
            ],
          },
          {
            id: "section-env-4-7",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Models for Predicting Climate Change Quiz",
              questions: [
                {
                  id: "q1",
                  question: "What does extrapolation allow scientists to do?",
                  options: [
                    "Measure past temperatures",
                    "Predict future climate trends",
                    "Reduce greenhouse gases",
                    "Stop global warming",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Extrapolation predicts future climate based on existing data.",
                },
                {
                  id: "q2",
                  question:
                    "What is a key limitation of climate prediction models?",
                  options: [
                    "Incomplete historical records",
                    "Unknown future human behavior",
                    "Tipping points",
                    "All of the above",
                  ],
                  correctAnswer: 3,
                  explanation:
                    "All these factors introduce uncertainty in model predictions.",
                },
                {
                  id: "q3",
                  question:
                    "If humans drastically reduce emissions, what is the predicted temperature rise?",
                  options: ["≈1ºC", "≈2ºC", "≈3ºC", ">4ºC"],
                  correctAnswer: 1,
                  explanation:
                    "Low emission scenario predicts ≈2ºC above pre-industrial levels.",
                },
                {
                  id: "q4",
                  question:
                    "Which organization produces climate prediction scenarios using extrapolated data?",
                  options: ["NASA", "IPCC", "NOAA", "UNEP"],
                  correctAnswer: 1,
                  explanation:
                    "The IPCC is responsible for these climate scenarios.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-5",
        title: "Effects of Global Warming",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Global Warming",
            definition:
              "Long-term increase in Earth's average surface temperature due to greenhouse gas emissions.",
          },
          {
            id: "kw-2",
            word: "Biodiversity",
            definition: "The variety of living species in an ecosystem.",
          },
          {
            id: "kw-3",
            word: "Altitude",
            definition: "Height above sea level.",
          },
          {
            id: "kw-4",
            word: "Distribution",
            definition:
              "The geographic location or range of a species within an ecosystem.",
          },
          {
            id: "kw-5",
            word: "Glacier Retreat",
            definition:
              "The melting and shrinking of glaciers due to rising temperatures.",
          },
          {
            id: "kw-6",
            word: "Sea Level Rise",
            definition:
              "Increase in the average level of the world’s oceans due to melting ice and thermal expansion.",
          },
        ],
        keywords: [
          { id: "kwd-1", word: "Temperature" },
          { id: "kwd-2", word: "Rainfall" },
          { id: "kwd-3", word: "Heatwaves" },
          { id: "kwd-4", word: "Storms" },
          { id: "kwd-5", word: "Ocean Currents" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Identify the main effects of global warming on the environment",
          },
          {
            id: "obj-2",
            text: "Explain how global warming affects biodiversity and species distribution",
          },
          {
            id: "obj-3",
            text: "Understand changes in seasonal cycles and water availability",
          },
          {
            id: "obj-4",
            text: "Recognize the risks posed by melting polar ice and sea level rise",
          },
        ],
        sections: [
          {
            id: "section-env-5-1",
            title: "Introduction",
            type: "text" as const,
            content: `**Global warming** causes a rise in Earth's average temperature, leading to:  
- More extreme weather events (heatwaves, storms)  
- Changes to ocean currents (e.g., Gulf Stream affecting UK climate)  
- Altered rainfall patterns as warmer air holds more moisture`,
            completed: false,
          },
          {
            id: "section-env-5-2",
            title: "Effects on Species and Biodiversity",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "effect", label: "Effect", sortable: true },
                { key: "description", label: "Description", sortable: true },
                {
                  key: "impact",
                  label: "Impact on Species/Humans",
                  sortable: true,
                },
              ],
              data: [
                {
                  effect: "Higher Temperatures",
                  description:
                    "Animals migrate towards poles or higher altitudes",
                  impact:
                    "Decrease in biodiversity; species may outcompete natives or go extinct",
                },
                {
                  effect: "Water Availability",
                  description: "Seasonal rainfall patterns change",
                  impact:
                    "Desert plants and animals relying on rains may go extinct or migrate",
                },
                {
                  effect: "Changes in Seasonal Cycles",
                  description:
                    "Plants flower earlier; animals reproduce earlier",
                  impact:
                    "Mismatch in food availability; migrating birds may starve",
                },
                {
                  effect: "Polar Ice Melt & Glacier Retreat",
                  description: "Arctic ice disappears; glaciers shrink",
                  impact:
                    "Water supply affected; ice-dependent animals at risk; increased flooding",
                },
                {
                  effect: "Sea Level Rise",
                  description: "Expansion of warm water & melting polar ice",
                  impact:
                    "Flooding risks; loss of habitats; danger to humans and animals",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-env-5-3",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "How does global warming affect animal migration?",
                back: "Animals move towards cooler areas (poles or higher altitudes), which may disrupt ecosystems and biodiversity.",
              },
              {
                id: "fc-2",
                front: "Why do some species go extinct due to global warming?",
                back: "They cannot migrate or adapt quickly enough to temperature and seasonal changes.",
              },
              {
                id: "fc-3",
                front: "What is the impact of glacier retreat on humans?",
                back: "Reduces water supply from mountain ranges and increases flooding risks.",
              },
              {
                id: "fc-4",
                front: "Why does sea level rise occur?",
                back: "Due to thermal expansion of warm water and melting polar ice.",
              },
            ],
          },
          {
            id: "section-env-5-4",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Connect effects to species",
                content:
                  "Always link temperature rise, water changes, and seasonal shifts to impacts on species distribution and biodiversity.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Sea Level Impacts",
                content:
                  "Mention both human and animal risks from flooding and habitat loss.",
              },
            ],
          },
          {
            id: "section-env-5-5",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Effects of Global Warming Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Why do some species migrate due to global warming?",
                  options: [
                    "To find cooler conditions",
                    "To increase competition",
                    "To avoid predators",
                    "Random movement",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Species move towards cooler areas as their habitats become too warm.",
                },
                {
                  id: "q2",
                  question:
                    "What happens if plants flower earlier but birds migrate late?",
                  options: [
                    "Birds find more food",
                    "Birds may starve due to mismatch",
                    "Nothing changes",
                    "Plants stop flowering",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Timing mismatch causes birds to miss peak food availability.",
                },
                {
                  id: "q3",
                  question: "How does glacier retreat affect humans?",
                  options: [
                    "Increases rainfall",
                    "Reduces water supply and increases flooding",
                    "Improves agriculture",
                    "No effect",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Melting glaciers reduce freshwater availability and contribute to flooding.",
                },
                {
                  id: "q4",
                  question: "Which factor contributes to sea level rise?",
                  options: [
                    "Polar ice melting",
                    "Ocean water expansion",
                    "Both A & B",
                    "None of the above",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Both melting ice and thermal expansion of water contribute to rising sea levels.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-6",
        title: "Temperature and Enzymes",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Enzyme",
            definition:
              "A biological catalyst that speeds up metabolic reactions without being consumed.",
          },
          {
            id: "kw-2",
            word: "Optimum Temperature",
            definition:
              "The specific temperature at which an enzyme catalyzes a reaction at its maximum rate.",
          },
          {
            id: "kw-3",
            word: "Denaturation",
            definition:
              "Permanent structural change in an enzyme's tertiary structure, resulting in loss of function.",
          },
          {
            id: "kw-4",
            word: "Active Site",
            definition:
              "The region on an enzyme where substrate molecules bind and undergo a chemical reaction.",
          },
          {
            id: "kw-5",
            word: "Q10 Temperature Coefficient",
            definition:
              "The factor by which the rate of a reaction increases when temperature is raised by 10ºC.",
          },
          {
            id: "kw-6",
            word: "Photorespiration",
            definition:
              "A process in plants where RuBisCO fixes oxygen instead of CO2, reducing photosynthetic efficiency.",
          },
        ],
        keywords: [
          { id: "kwd-1", word: "Metabolism" },
          { id: "kwd-2", word: "Cellular Respiration" },
          { id: "kwd-3", word: "DNA Replication" },
          { id: "kwd-4", word: "Harmful Algal Blooms" },
          { id: "kwd-5", word: "Cyanobacteria" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand the effect of temperature on enzyme-catalyzed reactions",
          },
          {
            id: "obj-2",
            text: "Explain why enzymes denature at high temperatures",
          },
          {
            id: "obj-3",
            text: "Interpret rate of reaction vs temperature graphs",
          },
          {
            id: "obj-4",
            text: "Understand ecological consequences of temperature changes on organisms",
          },
        ],
        sections: [
          {
            id: "section-env-6-1",
            title: "Introduction",
            type: "text" as const,
            content: `Temperature affects metabolism because metabolic reactions are catalyzed by **enzymes**.  
Enzymes have an **optimum temperature** where they function most efficiently.  
Lower temperatures slow reactions, while higher temperatures can speed them up until denaturation occurs.`,
            completed: false,
          },
          {
            id: "section-env-6-2",
            title: "Effect of Low Temperature on Enzymes",
            type: "text" as const,
            content: `- Less kinetic energy → slower molecular movement  
- Fewer successful enzyme-substrate collisions  
- Reactions slow or may stop  
- Bonds may not have enough energy to form or break`,
            completed: false,
          },
          {
            id: "section-env-6-3",
            title: "Effect of High Temperature on Enzymes",
            type: "text" as const,
            content: `- Increased kinetic energy → faster molecular movement  
- More enzyme-substrate collisions → faster reactions  
- Excess heat causes denaturation:  
  - Excess vibration strains hydrogen and ionic bonds  
  - Tertiary structure changes permanently  
  - Active site loses complementarity → substrate cannot bind`,
            completed: false,
          },
          {
            id: "section-env-6-4",
            title: "Mnemonic for Denaturation",
            type: "text" as const,
            content: `**TERTIARY PERMANENT COMPLEMENTARY BONDS STRAIN (TCB-S)** → reminds you that denaturation affects the 3D structure and active site.`,
            completed: false,
          },
          {
            id: "section-env-6-5",
            title: "Temperature vs Reaction Rate Graph",
            type: "image" as const,
            content:
              "https://upload.wikimedia.org/wikipedia/commons/3/3a/Enzyme_activity_vs_temperature.png",
            completed: false,
          },
          {
            id: "section-env-6-6",
            title: "Q10 Temperature Coefficient",
            type: "text" as const,
            content: `- Q10 = rate at higher temp / rate at lower temp (10ºC difference)  
- Example: Q10 = 2 → rate doubles for every 10ºC increase`,
            completed: false,
          },
          {
            id: "section-env-6-7",
            title: "Ecological Effects of Temperature",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "effect", label: "Effect", sortable: true },
                { key: "description", label: "Description", sortable: true },
                { key: "impact", label: "Impact on Organisms", sortable: true },
              ],
              data: [
                {
                  effect: "Cyanobacteria (Blue-Green Algae)",
                  description:
                    "Photosynthesis increases at higher temperatures",
                  impact: "Harmful algal blooms block light in water bodies",
                },
                {
                  effect: "Photorespiration",
                  description:
                    "RuBisCO uses oxygen instead of CO2 at higher temp",
                  impact:
                    "Photosynthetic efficiency decreases → reduced crop yields",
                },
                {
                  effect: "Fish Eggs",
                  description: "Development slows at high temperature",
                  impact: "Population growth may decrease",
                },
                {
                  effect: "Insect Eggs",
                  description:
                    "Hatching rate lowers with fluctuating temperatures",
                  impact: "Insect population dynamics are affected",
                },
                {
                  effect: "Temperature-Dependent Sex",
                  description:
                    "Sex of alligator hatchlings determined by nest temperature",
                  impact:
                    "Population sex ratios can be skewed by climate change",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-env-6-8",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front:
                  "Why do low temperatures slow enzyme-catalyzed reactions?",
                back: "Lower kinetic energy → fewer successful enzyme-substrate collisions → slower reactions.",
              },
              {
                id: "fc-2",
                front: "What happens to enzymes when they denature?",
                back: "Tertiary structure is permanently altered; active site is no longer complementary → substrate cannot bind.",
              },
              {
                id: "fc-3",
                front: "What does a Q10 of 2 indicate?",
                back: "Reaction rate doubles for every 10ºC increase in temperature.",
              },
              {
                id: "fc-4",
                front:
                  "How does high temperature affect photosynthesis in cyanobacteria?",
                back: "It can cause harmful algal blooms, blocking light and reducing oxygen availability.",
              },
            ],
          },
          {
            id: "section-env-6-9",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Always mention enzymes",
                content:
                  "Whenever temperature is discussed, explain how it affects enzyme activity and metabolism.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Temperature extremes",
                content:
                  "Distinguish between effects of low temperature, optimum temperature, and denaturation.",
              },
            ],
          },
          {
            id: "section-env-6-10",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Temperature and Enzymes Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "What happens to enzyme activity below optimum temperature?",
                  options: [
                    "Activity increases",
                    "Activity decreases",
                    "Denaturation occurs",
                    "No change",
                  ],
                  correctAnswer: 1,
                  explanation: "Lower kinetic energy slows reaction rates.",
                },
                {
                  id: "q2",
                  question:
                    "Why does enzyme activity drop sharply at high temperature?",
                  options: [
                    "Substrate disappears",
                    "Enzyme denatures",
                    "Temperature has no effect",
                    "Enzyme multiplies",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Excess heat breaks bonds, altering tertiary structure and active site.",
                },
                {
                  id: "q3",
                  question: "What does a Q10 of 2 mean?",
                  options: [
                    "Rate halves every 10ºC increase",
                    "Rate doubles every 10ºC increase",
                    "Rate stays constant",
                    "Rate triples every 10ºC increase",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Q10 measures rate change per 10ºC; a value of 2 means doubling.",
                },
                {
                  id: "q4",
                  question:
                    "How can high temperatures affect fish and insect eggs?",
                  options: [
                    "Faster development",
                    "Slower development and lower hatching rates",
                    "No effect",
                    "Eggs grow larger",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Development slows and hatching success decreases.",
                },
                {
                  id: "q5",
                  question:
                    "Why is photorespiration more at higher temperature?",
                  options: [
                    "RuBisCO fixes oxygen instead of CO2",
                    "Enzyme activity stops",
                    "Substrate disappears",
                    "Temperature does not affect it",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "High temperature favors oxygen fixation, reducing photosynthesis efficiency.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-7",
        title: "Mutations, Natural Selection and Evolution",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Evolution",
            definition:
              "Changes in heritable characteristics of organisms over generations.",
          },
          {
            id: "kw-2",
            word: "Natural Selection",
            definition:
              "Process by which organisms with advantageous traits survive and reproduce, increasing frequency of those traits in a population.",
          },
          {
            id: "kw-3",
            word: "Allele",
            definition:
              "A version of a gene that determines a specific characteristic.",
          },
          {
            id: "kw-4",
            word: "Mutation",
            definition:
              "A random change in the DNA sequence that can create new alleles.",
          },
          {
            id: "kw-5",
            word: "Heritable Characteristics",
            definition:
              "Traits that can be passed on to offspring through genes.",
          },
          {
            id: "kw-6",
            word: "Selection Pressure",
            definition:
              "Environmental factors that influence the survival and reproduction of organisms.",
          },
          {
            id: "kw-7",
            word: "Fitness",
            definition:
              "The ability of an organism to survive and reproduce in its environment.",
          },
        ],
        keywords: [
          { id: "kwd-1", word: "Meiosis" },
          { id: "kwd-2", word: "Crossing Over" },
          { id: "kwd-3", word: "Independent Assortment" },
          { id: "kwd-4", word: "Random Fertilization" },
          { id: "kwd-5", word: "Population Adaptation" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand the difference between heritable and acquired characteristics",
          },
          {
            id: "obj-2",
            text: "Explain how mutations create variation in a population",
          },
          { id: "obj-3", text: "Describe the process of natural selection" },
          {
            id: "obj-4",
            text: "Understand how advantageous traits increase in frequency over generations",
          },
          {
            id: "obj-5",
            text: "Interpret how populations become adapted to their environment",
          },
        ],
        sections: [
          {
            id: "section-env-7-1",
            title: "Introduction",
            type: "text" as const,
            content: `**Evolution** is the change in heritable characteristics of organisms over generations.  
Uninheritable changes, like leaf damage or eye injuries, do not contribute to evolution.  
Heritable traits are determined by **alleles**, which can change via **mutations**. Natural selection acts on these variations to drive evolutionary change.`,
            completed: false,
          },
          {
            id: "section-env-7-2",
            title: "Variation",
            type: "text" as const,
            content: `Variation in a population arises from:  
1. **Meiosis** (Crossing Over & Independent Assortment)  
2. **Random Fertilization**  
3. **Mutations**`,
            completed: false,
          },
          {
            id: "section-env-7-3",
            title: "Selection Pressure",
            type: "text" as const,
            content: `Environmental factors act as **selection pressures**, affecting survival chances of individuals.`,
            completed: false,
          },
          {
            id: "section-env-7-4",
            title: "Survival and Reproduction",
            type: "text" as const,
            content: `- Individuals with advantageous traits are more **fit** and survive better ("survival of the fittest")  
- They are more likely to reach adulthood and reproduce, passing **heritable traits** to offspring`,
            completed: false,
          },
          {
            id: "section-env-7-5",
            title: "Increase in Trait Frequency",
            type: "text" as const,
            content: `- Favorable alleles increase in frequency over generations  
- Less advantageous traits decrease and may disappear  
- The population becomes adapted to its environment through natural selection`,
            completed: false,
          },
          {
            id: "section-env-7-6",
            title: "Evolution Summary",
            type: "text" as const,
            content: `Evolution is driven by random variation, with natural selection increasing the frequency of advantageous traits.  
Mnemonic: **V-P-SR-P-F** → Variation → Pressure → Survival & Reproduction → Passing on → Frequency increase`,
            completed: false,
          },
          {
            id: "section-env-7-7",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is natural selection?",
                back: "The process by which organisms with advantageous traits survive and reproduce, increasing the frequency of those traits.",
              },
              {
                id: "fc-2",
                front: "What is the source of variation in a population?",
                back: "Mutations, meiosis (crossing over and independent assortment), and random fertilization.",
              },
              {
                id: "fc-3",
                front:
                  "What is the difference between heritable and acquired traits?",
                back: "Heritable traits are passed to offspring; acquired traits are not.",
              },
              {
                id: "fc-4",
                front: "What does 'fitness' mean in evolutionary terms?",
                back: "The ability of an organism to survive and reproduce in its environment.",
              },
              {
                id: "fc-5",
                front: "What is the role of selection pressure?",
                back: "Environmental factors that influence which individuals survive and reproduce.",
              },
            ],
          },
          {
            id: "section-env-7-8",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Use V-P-SR-P-F",
                content:
                  "Mnemonic helps remember the sequence: Variation → Pressure → Survival & Reproduction → Passing → Frequency increase.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Heritable traits only",
                content:
                  "Only include heritable traits when explaining natural selection; ignore acquired traits.",
              },
            ],
          },
          {
            id: "section-env-7-9",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Mutations, Natural Selection and Evolution Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Which of the following is a heritable characteristic?",
                  options: [
                    "Eye injury",
                    "Allele for fur color",
                    "Lost limb",
                    "Cut leaf",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Only traits encoded by alleles in DNA are heritable.",
                },
                {
                  id: "q2",
                  question: "What is the role of mutations in evolution?",
                  options: [
                    "Cause variation in alleles",
                    "Determine environmental selection",
                    "Guarantee survival",
                    "Change adult traits only",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Mutations create new alleles, introducing variation.",
                },
                {
                  id: "q3",
                  question: "What does 'survival of the fittest' mean?",
                  options: [
                    "Only the strongest survive",
                    "Individuals with advantageous traits survive and reproduce more",
                    "All individuals survive equally",
                    "Weak individuals reproduce more",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Fitness is based on advantageous traits, not absolute strength.",
                },
                {
                  id: "q4",
                  question:
                    "Which process ensures advantageous alleles increase in frequency?",
                  options: [
                    "Random fertilization",
                    "Mutation",
                    "Natural selection",
                    "Acquired traits",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Natural selection favors advantageous traits, increasing their frequency.",
                },
                {
                  id: "q5",
                  question:
                    "What is the correct order in evolution mnemonic V-P-SR-P-F?",
                  options: [
                    "Variation → Passing → Survival → Frequency → Pressure",
                    "Variation → Pressure → Survival & Reproduction → Passing → Frequency increase",
                    "Pressure → Variation → Survival → Frequency → Passing",
                    "Variation → Survival → Pressure → Frequency → Passing",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Mnemonic summarizes the natural selection process stepwise.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-8",
        title: "Speciation & Isolation",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Speciation",
            definition:
              "The formation of new species from pre-existing species over time.",
          },
          {
            id: "kw-2",
            word: "Gene Flow",
            definition:
              "The transfer of alleles or genes from one population to another.",
          },
          {
            id: "kw-3",
            word: "Allopatric Speciation",
            definition:
              "Speciation caused by geographical isolation between populations.",
          },
          {
            id: "kw-4",
            word: "Sympatric Speciation",
            definition:
              "Speciation that occurs within the same area due to reproductive isolation without physical barriers.",
          },
          {
            id: "kw-5",
            word: "Selection Pressure",
            definition:
              "Environmental factors that influence which traits are advantageous and affect survival and reproduction.",
          },
          {
            id: "kw-6",
            word: "Genetic Drift",
            definition:
              "Random changes in allele frequencies within a population due to chance.",
          },
          {
            id: "kw-7",
            word: "Reproductive Isolation",
            definition:
              "When populations cannot interbreed and produce fertile offspring due to behavioral, physiological, or morphological differences.",
          },
        ],
        keywords: [
          { id: "kwd-1", word: "Allele Frequency" },
          { id: "kwd-2", word: "Phenotype" },
          { id: "kwd-3", word: "Mechanical Isolation" },
          { id: "kwd-4", word: "Seasonal Isolation" },
          { id: "kwd-5", word: "Behavioral Isolation" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Explain how isolation leads to speciation" },
          {
            id: "obj-2",
            text: "Distinguish between allopatric and sympatric speciation",
          },
          {
            id: "obj-3",
            text: "Understand how selection pressures and genetic drift affect allele frequencies",
          },
          {
            id: "obj-4",
            text: "Identify examples of reproductive isolation mechanisms",
          },
          { id: "obj-5", text: "Describe the steps of allopatric speciation" },
        ],
        sections: [
          {
            id: "section-env-8-1",
            title: "Introduction to Speciation",
            type: "text" as const,
            content: `**Speciation** is the development of new species from pre-existing species over time.  
For speciation to occur, two populations must be **isolated** for a long period, preventing **gene flow** between them.  
Isolation allows populations to accumulate different alleles and adapt to their unique environments.`,
            completed: false,
          },
          {
            id: "section-env-8-2",
            title: "Types of Isolation",
            type: "text" as const,
            content: `1. **Allopatric Speciation (A = Area):** Geographical barriers separate populations, e.g., mountains, rivers, or man-made barriers.  
2. **Sympatric Speciation (S = Same Area):** Populations in the same area accumulate differences due to random mutations or behavioral changes that prevent interbreeding.`,
            completed: false,
          },
          {
            id: "section-env-8-3",
            title: "Role of Selection Pressures & Genetic Drift",
            type: "text" as const,
            content: `- Different environmental conditions exert different **selection pressures** on each population, favoring different alleles.  
- **Genetic drift** (random changes in allele frequencies) also contributes to divergence.  
- Over time, allele frequencies diverge enough that populations cannot interbreed.`,
            completed: false,
          },
          {
            id: "section-env-8-4",
            title: "Reproductive Isolation Mechanisms",
            type: "text" as const,
            content: `**Reproductive isolation** prevents populations from interbreeding:  
- **Mechanical Isolation:** Physical differences in genitalia prevent mating  
- **Seasonal Isolation:** Differences in reproductive timing prevent mating  
- **Behavioral Isolation:** Changes in courtship or mating behavior prevent interbreeding`,
            completed: false,
          },
          {
            id: "section-env-8-5",
            title: "Steps of Allopatric Speciation Example",
            type: "text" as const,
            content: `Example: Trees separated by a new mountain range  
0. Before barrier: gene flow unrestricted  
1. Mountain forms, dividing population  
2. Gene flow blocked; populations isolated  
3. Different selection pressures act on each population  
4. Advantageous alleles accumulate differently; phenotypes diverge  
5. Mutations and genetic drift further differentiate populations  
6. Reproductive isolation occurs; new species formed`,
            completed: false,
          },
          {
            id: "section-env-8-6",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is allopatric speciation?",
                back: "Speciation caused by geographical isolation between populations.",
              },
              {
                id: "fc-2",
                front: "What is sympatric speciation?",
                back: "Speciation occurring in the same area due to reproductive isolation without physical barriers.",
              },
              {
                id: "fc-3",
                front: "What is reproductive isolation?",
                back: "When populations cannot interbreed and produce fertile offspring due to behavioral, morphological, or physiological differences.",
              },
              {
                id: "fc-4",
                front: "Name three types of reproductive isolation mechanisms.",
                back: "Mechanical, seasonal, and behavioral isolation.",
              },
              {
                id: "fc-5",
                front:
                  "How do selection pressures and genetic drift affect speciation?",
                back: "They cause populations to accumulate different alleles, leading to divergence and eventual speciation.",
              },
            ],
          },
          {
            id: "section-env-8-7",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Allopatric vs Sympatric",
                content:
                  "Remember A = Area (geographical) and S = Same Area (no physical barrier).",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Focus on isolation",
                content:
                  "Speciation cannot occur without isolation; gene flow must be prevented.",
              },
            ],
          },
          {
            id: "section-env-8-8",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Speciation & Isolation Quiz",
              questions: [
                {
                  id: "q1",
                  question: "What is required for speciation to occur?",
                  options: [
                    "Mutations alone",
                    "Isolation",
                    "Gene flow",
                    "Natural disasters",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Isolation prevents gene flow, allowing divergence.",
                },
                {
                  id: "q2",
                  question: "Which is an example of allopatric speciation?",
                  options: [
                    "Two populations separated by a river",
                    "Two populations in the same pond",
                    "Mutations in a single population",
                    "Behavioral change in one area",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Geographical separation causes allopatric speciation.",
                },
                {
                  id: "q3",
                  question:
                    "Which type of isolation occurs without physical barriers?",
                  options: [
                    "Allopatric",
                    "Sympatric",
                    "Mechanical",
                    "Seasonal",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Sympatric speciation occurs in the same area due to reproductive isolation.",
                },
                {
                  id: "q4",
                  question:
                    "Which of these is a reproductive isolation mechanism?",
                  options: [
                    "Mechanical",
                    "Photosynthesis",
                    "Predation",
                    "Allele frequency",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Mechanical isolation prevents mating due to physical incompatibility.",
                },
                {
                  id: "q5",
                  question: "What role does genetic drift play in speciation?",
                  options: [
                    "It guarantees survival",
                    "Randomly changes allele frequencies",
                    "Prevents mutation",
                    "Increases gene flow",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Genetic drift causes random changes in allele frequencies that contribute to divergence.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-9",
        title: "Contentious Issues in Environmental Science",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Consensus",
            definition:
              "General agreement among scientists based on available evidence.",
          },
          {
            id: "kw-2",
            word: "Correlation",
            definition:
              "A relationship between two variables where they change together, but one does not necessarily cause the other.",
          },
          {
            id: "kw-3",
            word: "Causation",
            definition:
              "A relationship where one variable directly causes a change in another.",
          },
          {
            id: "kw-4",
            word: "Peer Review",
            definition:
              "The evaluation of scientific work by independent experts to ensure validity and reliability.",
          },
          {
            id: "kw-5",
            word: "Bias",
            definition:
              "A tendency to favor a particular outcome due to personal, financial, or political interests.",
          },
          {
            id: "kw-6",
            word: "Tipping Point",
            definition:
              "A critical threshold at which a small change can lead to a dramatic, often irreversible shift in the system.",
          },
          {
            id: "kw-7",
            word: "Uncertainty",
            definition:
              "The degree to which the outcome of a prediction or observation is unknown.",
          },
        ],
        keywords: [
          { id: "kwd-1", word: "Evidence" },
          { id: "kwd-2", word: "Complexity" },
          { id: "kwd-3", word: "Multi-factorial" },
          { id: "kwd-4", word: "Non-linear Trends" },
          { id: "kwd-5", word: "Extreme Weather" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand the scientific consensus on anthropogenic climate change",
          },
          {
            id: "obj-2",
            text: "Evaluate claims of correlation vs causation in environmental science",
          },
          {
            id: "obj-3",
            text: "Identify sources of bias and uncertainty in climate data",
          },
          {
            id: "obj-4",
            text: "Understand the complexity and multi-factorial nature of climate change",
          },
          {
            id: "obj-5",
            text: "Recognize the concept of tipping points and non-linear trends in climate systems",
          },
        ],
        sections: [
          {
            id: "section-env-9-1",
            title: "Scientific Consensus vs Skepticism",
            type: "text" as const,
            content: `- There is a **consensus** among scientists that increased greenhouse gas concentrations cause global warming, primarily due to human activity.  
- Some individuals argue that human activity only shows **correlation** with warming, not **causation**, claiming natural factors are responsible.`,
            completed: false,
          },
          {
            id: "section-env-9-2",
            title: "Evaluating Evidence",
            type: "text" as const,
            content: `To evaluate a scientific claim, consider:  
1. Does it include **all relevant evidence** or only partial data?  
2. Is the data **reliable** (consistent results, replicable experiments)?  
3. Does it come from **multiple independent studies**?  
4. Is the data **statistically significant**?  
5. Is the source **unbiased** and trustworthy? (e.g., individuals with financial stakes may be biased)`,
            completed: false,
          },
          {
            id: "section-env-9-3",
            title: "Complexity and Multi-factorial Nature",
            type: "text" as const,
            content: `- Climate change is **complex**; no single factor explains all changes.  
- Many variables contribute: CO2, methane, solar activity, volcanic eruptions, ocean currents, and human activity.  
- **Extreme weather** alone is not definitive evidence but contributes to the overall picture.  
- Past fluctuations in temperature show natural factors exist, but current warming is unprecedented.`,
            completed: false,
          },
          {
            id: "section-env-9-4",
            title: "Tipping Points and Non-linear Trends",
            type: "text" as const,
            content: `- Climate systems may reach **tipping points**, where small changes cause sudden, large-scale shifts.  
- Climate change is **non-linear**, meaning trends may accelerate unexpectedly.  
- Future predictions have high **uncertainty**, but consequences could be severe.`,
            completed: false,
          },
          {
            id: "section-env-9-5",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is scientific consensus?",
                back: "General agreement among scientists based on the preponderance of evidence.",
              },
              {
                id: "fc-2",
                front: "Difference between correlation and causation?",
                back: "Correlation is when two factors change together; causation means one directly causes the other.",
              },
              {
                id: "fc-3",
                front: "What is a tipping point in climate systems?",
                back: "A threshold where small changes lead to dramatic, often irreversible changes.",
              },
              {
                id: "fc-4",
                front: "Why is climate change multi-factorial?",
                back: "Because many natural and human factors interact to influence global climate.",
              },
              {
                id: "fc-5",
                front: "How can bias affect climate science?",
                back: "Financial or political interests may influence data interpretation or reporting.",
              },
            ],
          },
          {
            id: "section-env-9-6",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Check the full evidence",
                content:
                  "Always evaluate statements using all relevant data, not isolated events.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Beware of bias",
                content:
                  "Consider who funded or conducted the study and their possible interests.",
              },
              {
                id: "tip-3",
                type: "tip",
                title: "Understand complexity",
                content:
                  "Remember climate change involves multiple interacting factors, not a single cause.",
              },
              {
                id: "tip-4",
                type: "tip",
                title: "Non-linear and uncertain",
                content:
                  "Be aware that future trends may be unpredictable and sudden due to tipping points.",
              },
            ],
          },
          {
            id: "section-env-9-7",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Contentious Issues Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "What does scientific consensus on climate change state?",
                  options: [
                    "Humans are the primary cause of increased GHGs",
                    "Climate change is only natural",
                    "Climate change is a myth",
                    "CO2 levels have no effect",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Most scientists agree human activity increases greenhouse gases, causing warming.",
                },
                {
                  id: "q2",
                  question:
                    "Why is extreme weather alone not proof of climate change?",
                  options: [
                    "It is not real",
                    "It does not consider all evidence",
                    "It is always caused by humans",
                    "It is predictable",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Extreme weather events are part of the evidence, but must be considered in context of multiple data points.",
                },
                {
                  id: "q3",
                  question: "Which of the following is an example of bias?",
                  options: [
                    "Peer-reviewed study",
                    "Oil company-funded report minimizing human impact",
                    "IPCC report",
                    "Independent research",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Financial or political interests can bias the results of a study.",
                },
                {
                  id: "q4",
                  question:
                    "What does non-linear trend mean in climate science?",
                  options: [
                    "Change occurs gradually only",
                    "Small changes can lead to sudden large impacts",
                    "Climate never changes",
                    "Trends are perfectly predictable",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Non-linear trends indicate sudden acceleration or tipping points may occur.",
                },
                {
                  id: "q5",
                  question:
                    "What factors must be considered to evaluate climate change data?",
                  options: [
                    "Reliability, bias, statistical significance, multiple studies",
                    "Only one extreme event",
                    "Opinion articles",
                    "Predictions from a single model",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "All these factors are needed for rigorous evaluation.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-env-10",
        title: "Sustainability Examples",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Sustainability",
            definition:
              "Using the world's resources in ways that do not damage the environment and can be maintained for future generations.",
          },
          {
            id: "kw-2",
            word: "Biofuels",
            definition:
              "Fuels made from recently-living plant biomass that can be replenished relatively quickly.",
          },
          {
            id: "kw-3",
            word: "Reforestation",
            definition:
              "Planting trees in areas where forests have been cut down to restore carbon storage and biodiversity.",
          },
          {
            id: "kw-4",
            word: "Carbon Neutral",
            definition:
              "A process where the net carbon emissions are zero, often because carbon released was recently absorbed from the atmosphere.",
          },
          {
            id: "kw-5",
            word: "Renewable Energy",
            definition:
              "Energy obtained from sources that are naturally replenished, such as solar, wind, tidal, geothermal, and hydroelectric power.",
          },
          {
            id: "kw-6",
            word: "Carbon Capture",
            definition:
              "Technology that removes CO2 from the atmosphere or emission sources and stores it permanently.",
          },
        ],
        keywords: [
          { id: "kwd-1", word: "Deforestation" },
          { id: "kwd-2", word: "Carbon Emissions" },
          { id: "kwd-3", word: "Photosynthesis" },
          { id: "kwd-4", word: "Habitat Destruction" },
          { id: "kwd-5", word: "Biodiversity" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand the principles of sustainability in using resources",
          },
          {
            id: "obj-2",
            text: "Explain ways to reduce carbon emissions and increase carbon removal",
          },
          {
            id: "obj-3",
            text: "Describe advantages and disadvantages of biofuels",
          },
          {
            id: "obj-4",
            text: "Identify advantages and limitations of renewable energy sources",
          },
          {
            id: "obj-5",
            text: "Evaluate practical considerations for implementing sustainable practices",
          },
        ],
        sections: [
          {
            id: "section-env-10-1",
            title: "Introduction to Sustainability",
            type: "text" as const,
            content: `- **Sustainability** involves using Earth's resources without damaging the environment and ensuring resources are available for future generations.  
- Climate predictions show that continuing human activities causing global warming could have serious consequences for humans and global biodiversity.  
- Solutions include:  
  1. Reducing carbon emissions  
  2. Increasing carbon removal from the atmosphere`,
            completed: false,
          },
          {
            id: "section-env-10-2",
            title: "Reducing Carbon Emissions",
            type: "text" as const,
            content: `- Burning fossil fuels is the main source of carbon emissions, but modern life depends on them for:  
  - Transportation  
  - Electricity & heating in homes  
  - Food production in factories  
- Solutions include replacing fossil fuels with:  
  1. **Biofuels**  
  2. Other **renewable energy** sources (solar, wind, tidal, geothermal, hydroelectric, nuclear)`,
            completed: false,
          },
          {
            id: "section-env-10-3",
            title: "Increasing Carbon Removal",
            type: "text" as const,
            content: `- **Carbon Capture** technology is not yet capable of removing significant amounts of CO2.  
- Existing effective method: **photosynthesis**.  
- Actions:  
  1. Stop **deforestation**  
  2. Carry out **reforestation**: plant trees and allow them to grow to maturity.  
- Example: Costa Rica now plants 7 trees for every tree cut down.  
- Requires government incentives to support landowners for planting trees.`,
            completed: false,
          },
          {
            id: "section-env-10-4",
            title: "Biofuels",
            type: "text" as const,
            content: `- Made from recently-living plant biomass such as sugar cane.  
- When burned, release CO2, but it is **carbon neutral** since CO2 was recently removed from the atmosphere.  

Advantages:  
- Cheaper than fossil fuels  
- Renewable and can be replanted quickly  
- Carbon neutral  

Disadvantages:  
- Still releases CO2  
- Competes with land for food production  
- Can cause **habitat destruction** and loss of biodiversity  
- Cutting mature trees reduces carbon removal capacity`,
            completed: false,
          },
          {
            id: "section-env-10-5",
            title: "Other Renewable Energy Sources",
            type: "text" as const,
            content: `- **Wind, Solar, Tidal, Geothermal, Hydroelectric, Nuclear** are renewable and produce little to no CO2.  

Limitations:  
- Dependence on location and natural conditions:  
  - Wind → wind speed  
  - Solar → sunshine hours  
  - Tidal → coastal locations  
  - Geothermal → volcanic regions  
- Environmental drawbacks:  
  - Wind turbines → noise & visual pollution, harm birds/bats  
  - Solar farms → large land use  
  - Hydroelectric → flooding & habitat destruction  
  - Geothermal → release of underground gases  
  - Nuclear → radioactive waste lasting thousands of years`,
            completed: false,
          },
          {
            id: "section-env-10-6",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is sustainability?",
                back: "Using Earth's resources in ways that do not damage the environment and can be maintained for future generations.",
              },
              {
                id: "fc-2",
                front: "Why are biofuels considered carbon neutral?",
                back: "They release CO2 that was recently absorbed by plants, so there is no net increase in atmospheric CO2.",
              },
              {
                id: "fc-3",
                front: "Give an example of reforestation success",
                back: "Costa Rica plants 7 new trees for every tree cut down.",
              },
              {
                id: "fc-4",
                front: "List some limitations of renewable energy sources",
                back: "Location dependence, environmental impacts, intermittency, radioactive waste (nuclear), habitat destruction.",
              },
              {
                id: "fc-5",
                front:
                  "Why is stopping deforestation important for carbon removal?",
                back: "It preserves mature trees that store significant amounts of carbon via photosynthesis.",
              },
            ],
          },
          {
            id: "section-env-10-7",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Evaluate carbon strategies",
                content:
                  "Understand both emission reduction and carbon removal methods and their practical feasibility.",
              },
              {
                id: "tip-2",
                type: "tip",
                title: "Know advantages & disadvantages",
                content:
                  "Be able to list pros and cons of biofuels and each renewable energy type.",
              },
              {
                id: "tip-3",
                type: "tip",
                title: "Consider environmental trade-offs",
                content:
                  "Some renewable methods reduce CO2 but may harm biodiversity or require land/resources.",
              },
            ],
          },
          {
            id: "section-env-10-8",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Sustainability Examples Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Why are biofuels considered more sustainable than fossil fuels?",
                  options: [
                    "Release less CO2",
                    "Carbon neutral & renewable",
                    "Cheaper",
                    "All of the above",
                  ],
                  correctAnswer: 3,
                  explanation:
                    "Biofuels are renewable, carbon neutral, and often cheaper than fossil fuels.",
                },
                {
                  id: "q2",
                  question:
                    "Which action increases carbon removal effectively?",
                  options: [
                    "Cutting mature trees",
                    "Reforestation",
                    "Burning biofuels",
                    "Industrial activity",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Planting and growing trees removes CO2 via photosynthesis.",
                },
                {
                  id: "q3",
                  question: "Limitation of solar energy?",
                  options: [
                    "Requires sun",
                    "Produces radioactive waste",
                    "Destroys estuaries",
                    "Harm birds",
                  ],
                  correctAnswer: 0,
                  explanation: "Solar energy depends on sunlight availability.",
                },
                {
                  id: "q4",
                  question: "Why is stopping deforestation important?",
                  options: [
                    "Preserves biodiversity",
                    "Maintains carbon removal",
                    "Prevents habitat destruction",
                    "All of the above",
                  ],
                  correctAnswer: 3,
                  explanation:
                    "All listed reasons contribute to sustainability and carbon management.",
                },
                {
                  id: "q5",
                  question: "Which is NOT a disadvantage of biofuels?",
                  options: [
                    "Competes with food production",
                    "Requires land",
                    "Carbon neutral",
                    "Habitat loss",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Being carbon neutral is an advantage, not a disadvantage.",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "summary-t5",
    title: "Summary",
    subjectId: "bio-t5",
    progress: 0,
    lessons: [
      {
        id: "lesson-summary-1",
        title: "Comprehensive Summary of T5",
        chapterId: "env-bio-1",
        completed: false,
        kw: [
          {
            id: "kw-1",
            word: "Photosynthesis",
            definition:
              "The process by which green plants, algae, and some bacteria convert light energy into chemical energy stored in glucose, using CO2 and water.",
          },
          {
            id: "kw-2",
            word: "Chlorophyll",
            definition:
              "A green pigment in plants that absorbs light energy for photosynthesis.",
          },
          {
            id: "kw-3",
            word: "Carbon Cycle",
            definition:
              "The global movement of carbon through living organisms, the atmosphere, oceans, and geological reservoirs.",
          },
          {
            id: "kw-4",
            word: "Sustainability",
            definition:
              "Using Earth's resources in ways that do not damage the environment and can be maintained for future generations.",
          },
          {
            id: "kw-5",
            word: "Biodiversity",
            definition:
              "The variety of living species within an ecosystem, region, or the entire planet.",
          },
          {
            id: "kw-6",
            word: "Natural Selection",
            definition:
              "The process where organisms better adapted to their environment survive and reproduce, increasing the frequency of advantageous traits in the population.",
          },
          {
            id: "kw-7",
            word: "Speciation",
            definition:
              "The process by which new species arise from pre-existing species, often due to genetic isolation and selection pressures.",
          },
          {
            id: "kw-8",
            word: "Ecosystem",
            definition:
              "A community of living organisms interacting with each other and their physical environment.",
          },
          {
            id: "kw-9",
            word: "Trophic Level",
            definition:
              "A position in a food chain or ecological pyramid, indicating the organism's feeding level, from producers to top predators.",
          },
          {
            id: "kw-10",
            word: "Carbon Sink",
            definition:
              "A natural or artificial reservoir that absorbs and stores carbon from the atmosphere, e.g., forests, oceans, peat bogs.",
          },
        ],
        keywords: [
          { id: "kwd-1", word: "ATP" },
          { id: "kwd-2", word: "Glucose" },
          { id: "kwd-3", word: "Enzymes" },
          { id: "kwd-4", word: "CO2" },
          { id: "kwd-5", word: "CH4" },
          { id: "kwd-6", word: "N2O" },
          { id: "kwd-7", word: "Peat Bogs" },
          { id: "kwd-8", word: "Dendrochronology" },
          { id: "kwd-9", word: "Trophic Cascade" },
          { id: "kwd-10", word: "Photosystem" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Recall the main concepts of photosynthesis and its role in energy production.",
          },
          {
            id: "obj-2",
            text: "Understand the causes and evidence for climate change.",
          },
          {
            id: "obj-3",
            text: "Explain the global carbon cycle and human impact on greenhouse gases.",
          },
          {
            id: "obj-4",
            text: "Describe how enzymes and temperature affect metabolic reactions.",
          },
          {
            id: "obj-5",
            text: "Understand natural selection, speciation, and evolution in ecosystems.",
          },
          {
            id: "obj-6",
            text: "Identify strategies for sustainability and reducing carbon emissions.",
          },
        ],
        sections: [
          {
            id: "section-summary-1",
            title: "Photosynthesis Overview",
            type: "text" as const,
            content: `**Photosynthesis** converts light energy into chemical energy in plants, algae, and cyanobacteria.  
Light-dependent reactions occur in chloroplasts using **chlorophyll** to produce ATP and NADPH.  
Light-independent reactions (Calvin Cycle) use ATP, NADPH, and CO2 to produce glucose.  
Enzymes play a key role in catalyzing these reactions, and temperature affects enzyme activity and overall photosynthetic rate.`,
            completed: false,
          },
          {
            id: "section-summary-2",
            title: "Environmental Biology & Climate Change",
            type: "text" as const,
            content: `**Climate change** refers to long-term changes in temperature, precipitation, and weather patterns, largely driven by human activity increasing greenhouse gases (CO2, CH4, N2O).  
**Evidence:** ice cores, dendrochronology, preserved pollen, and thermometer records.  
**Anthropogenic impacts:** deforestation, fossil fuel combustion, livestock farming, and peat bog harvesting.  
Global warming affects weather patterns, sea levels, polar ice, biodiversity, and species migration.`,
            completed: false,
          },
          {
            id: "section-summary-3",
            title: "Global Carbon Cycle",
            type: "text" as const,
            content: `Carbon moves through **producers, consumers, decomposers, oceans, soil, and fossil fuels**.  
Photosynthesis removes CO2 from the atmosphere; respiration and combustion return it.  
**Carbon sinks** store carbon long-term, e.g., forests, oceans, peat bogs.  
Humans disrupt the carbon cycle by burning fossil fuels and deforestation.`,
            completed: false,
          },
          {
            id: "section-summary-4",
            title: "Enzymes & Temperature",
            type: "text" as const,
            content: `Enzyme activity is temperature-dependent:  
- Low temperature → fewer collisions → slower reactions  
- High temperature → faster reactions until denaturation occurs  
**Optimum temperature** produces maximum enzyme activity.  
Denaturation permanently alters enzyme tertiary structure, preventing substrate binding.`,
            completed: false,
          },
          {
            id: "section-summary-5",
            title: "Evolution, Natural Selection & Speciation",
            type: "text" as const,
            content: `**Evolution** is the change in heritable traits over generations.  
**Natural selection:** individuals with advantageous traits survive and reproduce more successfully, passing these alleles to offspring.  
**Speciation** occurs when populations are isolated (geographically or sympatrically), accumulating different alleles until interbreeding is no longer possible.`,
            completed: false,
          },
          {
            id: "section-summary-6",
            title: "Sustainability Strategies",
            type: "text" as const,
            content: `**Sustainability** involves using resources without harming the environment and ensuring availability for future generations.  
- Reduce emissions: biofuels, renewable energy (solar, wind, tidal, geothermal, nuclear)  
- Increase carbon removal: reforestation, protecting carbon sinks, photosynthesis  
- Plan adaptation: flood defenses, climate technologies, reducing meat consumption  
- Consider trade-offs: land use, biodiversity, reliability, and pollution impacts of renewable energy sources.`,
            completed: false,
          },
          {
            id: "section-summary-7",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is the role of chlorophyll?",
                back: "Chlorophyll absorbs light energy for photosynthesis.",
              },
              {
                id: "fc-2",
                front: "Name three greenhouse gases.",
                back: "CO2, CH4, N2O",
              },
              {
                id: "fc-3",
                front: "What is a carbon sink?",
                back: "A reservoir that absorbs and stores carbon from the atmosphere.",
              },
              {
                id: "fc-4",
                front: "Define natural selection.",
                back: "Process where advantageous traits increase in frequency due to survival and reproduction.",
              },
              {
                id: "fc-5",
                front: "What is speciation?",
                back: "Formation of new species from existing species due to isolation and accumulation of genetic differences.",
              },
            ],
          },
          {
            id: "section-summary-8",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip-1",
                type: "tip",
                title: "Connections",
                content:
                  "Always link photosynthesis, carbon cycle, and climate change together.",
              },
              {
                id: "tip-2",
                type: "warning",
                title: "Beware of Oversimplification",
                content:
                  "Do not assume one factor alone causes climate change; use multi-factorial reasoning.",
              },
              {
                id: "tip-3",
                type: "tip",
                title: "Evolution",
                content:
                  "Only heritable traits are passed on; acquired characteristics do not contribute to evolution.",
              },
            ],
          },
          {
            id: "section-summary-9",
            title: "Summary Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Comprehensive Summary Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which process removes CO2 from the atmosphere?",
                  options: [
                    "Respiration",
                    "Photosynthesis",
                    "Combustion",
                    "Decomposition",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Photosynthesis converts CO2 into glucose, removing it from the atmosphere.",
                },
                {
                  id: "q2",
                  question: "Which gas contributes most to global warming?",
                  options: ["O2", "CO2", "N2", "He"],
                  correctAnswer: 1,
                  explanation:
                    "CO2 is the primary anthropogenic greenhouse gas.",
                },
                {
                  id: "q3",
                  question: "What is the main cause of speciation?",
                  options: [
                    "Gene flow",
                    "Mutation only",
                    "Isolation and selection pressure",
                    "Climate change alone",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Isolation and different selection pressures lead to accumulation of genetic differences causing speciation.",
                },
                {
                  id: "q4",
                  question:
                    "Denaturation of an enzyme affects which structure?",
                  options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
                  correctAnswer: 2,
                  explanation:
                    "Tertiary structure is disrupted, altering the active site.",
                },
                {
                  id: "q5",
                  question: "Why are biofuels considered sustainable?",
                  options: [
                    "They release no CO2",
                    "CO2 released was recently absorbed",
                    "They require no land",
                    "They are non-renewable",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "CO2 released by biofuels was recently removed from the atmosphere, so net impact is lower than fossil fuels.",
                },
              ],
            },
          },
        ],
      },
    ],
  },

  //
  {
    id: "t6-1",
    title: "Microbiology",
    subjectId: "bio-t6",
    progress: 0,
    lessons: [
      {
        id: "lesson-microbio-1",
        title: "Culturing Microbes",
        chapterId: "t6-microbio",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Microorganisms" },
          { id: "kw-2", word: "Culture" },
          { id: "kw-3", word: "Aseptic Technique" },
          { id: "kw-4", word: "Pure Culture" },
          { id: "kw-5", word: "Inoculation" },
          { id: "kw-6", word: "Nutrient Growth Medium (NGM)" },
          { id: "kw-7", word: "Selective Medium" },
          { id: "kw-8", word: "Indicator Medium" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Understand why microbes need to be cultured" },
          {
            id: "obj-2",
            text: "Explain the requirements for microbial growth",
          },
          {
            id: "obj-3",
            text: "Apply aseptic techniques to prevent contamination",
          },
          { id: "obj-4", text: "Describe methods to isolate pure cultures" },
          {
            id: "obj-5",
            text: "Understand the use of selective and indicator media",
          },
        ],
        sections: [
          {
            id: "section-microbio-1-1",
            title: "Introduction to Culturing Microbes",
            type: "text" as const,
            content: `Microorganisms are too small to be seen by the naked eye, so we need to culture them.  
Bacteria reproduce asexually by **binary fission**, forming clones that grow into visible **colonies**.  
Culturing microbes allows us to grow enough bacteria to make measurements and perform experiments.`,
            completed: false,
          },
          {
            id: "section-microbio-1-2",
            title: "Requirements for Growth",
            type: "text" as const,
            content: `Microbes require optimal conditions for growth:  
- Nutrients (C, N, minerals)  
- Oxygen (or absence of oxygen for anaerobes)  
- Optimum pH  
- Optimum Temperature  

Failure to provide these prevents proper growth or may allow unwanted microbes to dominate.`,
            completed: false,
          },
          {
            id: "section-microbio-1-3",
            title: "Aseptic Techniques",
            type: "text" as const,
            content: `To prevent contamination:  
- Follow **aseptic procedures**  
- Sterilize equipment with heat or antimicrobials  
- Seal cultures in a plastic bag before disposal  
- Keep cultures inside the lab  

**Remember:** Mutations can occur anytime, potentially producing pathogenic strains.`,
            completed: false,
          },
          {
            id: "section-microbio-1-4",
            title: "Preparing Cultures",
            type: "text" as const,
            content: `1. Obtain bacteria from a **liquid culture flask (LCF)**.  
2. Prepare a **nutrient growth medium (NGM)** using agar (solid) or liquid broth.  
3. Ensure the medium is sterile and provides **optimal conditions** for the type of bacteria (selective medium).  
4. Use **inoculation** to transfer bacteria with a sterilized loop from LCF or broth to agar.`,
            completed: false,
          },
          {
            id: "section-microbio-1-5",
            title: "Incubation & Labeling",
            type: "text" as const,
            content: `- Label the culture with bacteria type and date  
- Incubate at ~20ºC for safe experiments (hospital or research labs may use higher temps like 37ºC)  
- Open lids at 30-45º angle only  
- Perform near a Bunsen burner and sterilize loop before and after use`,
            completed: false,
          },
          {
            id: "section-microbio-1-6",
            title: "Obtaining a Pure Culture",
            type: "text" as const,
            content: `A **pure culture** contains only one type of microbe.  
Methods to obtain it include:  
- Providing **aerobic or anaerobic conditions** depending on bacteria  
- Using a **selective medium** suitable for the desired microbe  
- Using an **indicator medium** to visually distinguish the target colony`,
            completed: false,
          },
          {
            id: "section-microbio-1-7",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "Why do we culture microbes?",
                back: "To grow enough cells for observation and experimentation, as they are too small to see directly.",
              },
              {
                id: "fc-2",
                front: "What is a pure culture?",
                back: "A culture containing only one type of microorganism.",
              },
              {
                id: "fc-3",
                front: "Why use selective media?",
                back: "To favor growth of specific microbes and suppress others.",
              },
              {
                id: "fc-4",
                front: "What is inoculation?",
                back: "The method used to transfer microbes from one medium to another using a sterilized tool.",
              },
            ],
          },
          {
            id: "section-microbio-1-8",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Culturing Microbes Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Why is aseptic technique important?",
                  options: [
                    "To prevent contamination from unwanted microbes",
                    "To increase mutation rate",
                    "To speed up growth of all microbes",
                    "To change nutrient composition",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Aseptic technique prevents contamination, ensuring that only desired microbes grow.",
                },
                {
                  id: "q2",
                  question: "What does a selective medium do?",
                  options: [
                    "Kills all microbes",
                    "Favors growth of specific microbes",
                    "Changes DNA of microbes",
                    "Identifies oxygen requirements",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Selective medium allows only certain microbes to grow based on nutrient and environmental conditions.",
                },
                {
                  id: "q3",
                  question: "How do bacteria reproduce in culture?",
                  options: [
                    "Sexually",
                    "Binary fission",
                    "Budding",
                    "Spore formation",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Bacteria reproduce asexually by binary fission, forming clones in colonies.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-microbio-2",
        title: "Measuring Growth of Microbes",
        chapterId: "t6-microbio",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Haemocytometer" },
          { id: "kw-2", word: "Cell Counts" },
          { id: "kw-3", word: "Dilution Plating" },
          { id: "kw-4", word: "Viable Cells" },
          { id: "kw-5", word: "Mycelium / Mycelia" },
          { id: "kw-6", word: "Dry Mass" },
          { id: "kw-7", word: "Turbidimetry" },
          { id: "kw-8", word: "Calibration Curve" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand why microbes cannot be counted directly by eye",
          },
          {
            id: "obj-2",
            text: "Learn four main methods to measure microbial growth (CMOD)",
          },
          {
            id: "obj-3",
            text: "Describe how to use a haemocytometer to count living cells",
          },
          {
            id: "obj-4",
            text: "Explain dilution plating to count viable cells",
          },
          {
            id: "obj-5",
            text: "Understand how fungal growth is measured by area and mass",
          },
          {
            id: "obj-6",
            text: "Learn optical methods like turbidimetry to estimate cell numbers",
          },
        ],
        sections: [
          {
            id: "section-microbio-2-1",
            title: "Introduction",
            type: "text" as const,
            content: `Microbes are too small to count directly by eye. Growth can be measured using **four main methods (CMOD)**:
- **C**ell Counts  
- **M**easuring area & mass  
- **O**ptical Methods  
- **D**ilution Plating`,
            completed: false,
          },
          {
            id: "section-microbio-2-2",
            title: "Cell Counts",
            type: "text" as const,
            content: `- Uses a **haemocytometer** and microscope.  
- Haemocytometer is a slide with a rectangular chamber holding 0.1 mm³ and grid lines for counting.  
- Add **Trypan Blue** to stain dead cells, only counting living cells.  
- Dilute broth if necessary.  
- Place a coverslip, fill chamber by capillary action, view under microscope (usually 9 squares, count 4 corners).  
- Follow consistent counting rules (count cells touching top/right edges, not bottom/left).  

**Scaling to cells/ml**:  
\`Mean count × Dilution factor × 10⁴\`  
- Each square is 0.1 mm³  
- 1 ml = 1000 mm³  
- Multiply by dilution factor if used.`,
            completed: false,
          },
          {
            id: "section-microbio-2-3",
            title: "Dilution Plating",
            type: "text" as const,
            content: `- Used to count **total viable cells** in nutrient broth.  
- Each microbe forms a **colony** on agar via cloning.  
- Colonies are counted as one viable cell.  
- To avoid merged colonies, dilute broth before plating.  
- Count colonies, multiply by dilution factor, then take the mean of multiple plates.`,
            completed: false,
          },
          {
            id: "section-microbio-2-4",
            title: "Measuring Fungal Growth",
            type: "text" as const,
            content: `- Fungi produce **mycelia**, so area and mass are measured instead of direct cell counts.  
- **Area**: Measure diameter of mycelia after inoculating agar with spores.  
- **Dry Mass**:  
  1. Inoculate liquid culture with spores.  
  2. Remove samples at intervals.  
  3. Separate mycelia by **centrifugation** or filtration.  
  4. Dry overnight in an oven, measure final mass.`,
            completed: false,
          },
          {
            id: "section-microbio-2-5",
            title: "Optical Methods",
            type: "text" as const,
            content: `- **Turbidimetry** measures cloudiness of sample.  
- More turbid = more cells.  
- Light from colorimeter passes through sample; absorbance increases with turbidity.  
- Construct a **calibration curve** with samples of known cell counts to estimate unknown samples.  
- Equipment: cuvette, detector/data logger, light source, monochromatic filter.`,
            completed: false,
          },
          {
            id: "section-microbio-2-6",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is the purpose of Trypan Blue?",
                back: "To stain dead cells so only living cells are counted in a haemocytometer.",
              },
              {
                id: "fc-2",
                front: "Why do we dilute cultures before plating?",
                back: "To avoid colonies merging so each can be counted as one viable cell.",
              },
              {
                id: "fc-3",
                front: "How is fungal growth measured?",
                back: "By measuring mycelium area or dry mass.",
              },
              {
                id: "fc-4",
                front: "What does turbidimetry measure?",
                back: "The cloudiness (turbidity) of a microbial sample to estimate cell number.",
              },
            ],
          },
          {
            id: "section-microbio-2-7",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Measuring Growth of Microbes Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which method counts only living cells?",
                  options: [
                    "Dilution plating",
                    "Cell counts with Trypan Blue",
                    "Turbidimetry",
                    "Measuring fungal dry mass",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Trypan Blue stains dead cells, so counting with a haemocytometer only includes living cells.",
                },
                {
                  id: "q2",
                  question:
                    "Why are calibration curves needed in turbidimetry?",
                  options: [
                    "To calibrate the colorimeter for wavelength",
                    "To convert turbidity to estimated cell counts",
                    "To measure dead cells",
                    "To sterilize the culture",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Calibration curves relate turbidity measurements to actual cell counts.",
                },
                {
                  id: "q3",
                  question: "Which is true about fungal growth measurement?",
                  options: [
                    "Use haemocytometer for counting cells",
                    "Measure diameter and dry mass of mycelia",
                    "Use dilution plating for mycelia",
                    "Count colonies only",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Fungal growth is measured by mycelium diameter (area) or dry mass, not by counting individual cells.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-microbio-3",
        title: "Bacterial Growth Curve",
        chapterId: "t6-microbio",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Binary Fission" },
          { id: "kw-2", word: "Lag Phase" },
          { id: "kw-3", word: "Log / Exponential Phase" },
          { id: "kw-4", word: "Stationary Phase" },
          { id: "kw-5", word: "Death / Decline Phase" },
          { id: "kw-6", word: "Exponential Growth Rate Constant (K)" },
          { id: "kw-7", word: "Logarithms / Log Scale" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand how bacteria reproduce by binary fission",
          },
          {
            id: "obj-2",
            text: "Identify the four phases of the bacterial growth curve",
          },
          {
            id: "obj-3",
            text: "Explain why logarithmic scales are used in growth curves",
          },
          {
            id: "obj-4",
            text: "Calculate population size using Nt = N0 × 2^(K×t)",
          },
          {
            id: "obj-5",
            text: "Calculate exponential growth rate constant K from population data",
          },
        ],
        sections: [
          {
            id: "section-microbio-3-1",
            title: "Binary Fission",
            type: "text" as const,
            content: `Bacteria reproduce by **binary fission**, producing identical copies:
1. Circular DNA & plasmids replicate.  
2. Cytoplasm and organelles double.  
3. Parent cell divides into two daughter cells.  
Each division increases the population exponentially.`,
            completed: false,
          },
          {
            id: "section-microbio-3-2",
            title: "Bacterial Growth Curve Phases",
            type: "table" as const,
            tableData: {
              columns: [
                { key: "phase", label: "Phase", sortable: true },
                { key: "description", label: "Description", sortable: false },
              ],
              data: [
                {
                  phase: "Lag",
                  description:
                    "Bacteria adapt to new environment, slow increase in population.",
                },
                {
                  phase: "Log / Exponential",
                  description:
                    "Rapid reproduction; population doubles each generation.",
                },
                {
                  phase: "Stationary",
                  description:
                    "Resources limited; birth rate = death rate; toxic waste accumulates.",
                },
                {
                  phase: "Death / Decline",
                  description:
                    "Toxic waste & resource depletion cause death rate > birth rate; population declines.",
                },
              ],
              searchable: true,
            },
            completed: false,
          },
          {
            id: "section-microbio-3-3",
            title: "Logarithmic Scales",
            type: "text" as const,
            content: `- Population size is plotted as **log number of living bacteria**.  
- Logarithms allow very large numbers to be represented on a manageable scale.  
- Base 10 (log10) is used: 10, 100, 1000, 10000, etc.  
- Unequal intervals indicate multiplicative increase rather than additive.`,
            completed: false,
          },
          {
            id: "section-microbio-3-4",
            title: "Exponential Growth Rate Constant (K)",
            type: "text" as const,
            content: `- **K** represents the number of times population doubles in a given time.  
- Equation for population after time t:  
  \`Nt = N0 × 2^(K×t)\`  
  Where:  
  - Nt = population at time t  
  - N0 = initial population  
  - K = exponential growth rate constant  
  - t = time  
- To find K:  
  \`K = ([log10(Nt)] - [log10(N0)]) / (0.3 × t)\`  
  (0.3 ≈ log10(2))`,
            completed: false,
          },
          {
            id: "section-microbio-3-5",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is binary fission?",
                back: "Asexual reproduction where bacteria replicate DNA, double cytoplasm, and divide into two identical cells.",
              },
              {
                id: "fc-2",
                front: "Name the four phases of bacterial growth.",
                back: "Lag, Log/Exponential, Stationary, Death/Decline",
              },
              {
                id: "fc-3",
                front: "Why use logarithmic scale for growth curves?",
                back: "Allows wide range of population numbers to be plotted easily.",
              },
              {
                id: "fc-4",
                front: "Equation to calculate bacteria population over time?",
                back: "Nt = N0 × 2^(K×t)",
              },
              {
                id: "fc-5",
                front: "How to calculate K?",
                back: "K = (log10(Nt) - log10(N0)) / (0.3 × t)",
              },
            ],
          },
          {
            id: "section-microbio-3-6",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Bacterial Growth Curve Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which phase shows rapid bacterial reproduction?",
                  options: [
                    "Lag",
                    "Log/Exponential",
                    "Stationary",
                    "Death/Decline",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "During Log/Exponential phase, bacteria reproduce rapidly.",
                },
                {
                  id: "q2",
                  question:
                    "Why are log scales used in bacterial growth graphs?",
                  options: [
                    "For aesthetic reasons",
                    "To represent large numbers conveniently",
                    "Because bacteria divide by 2",
                    "To measure time",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Log scales allow very large population numbers to be plotted in a manageable way.",
                },
                {
                  id: "q3",
                  question: "If N0 = 100, K = 2, t = 3 hours, what is Nt?",
                  options: ["200", "800", "900", "1000"],
                  correctAnswer: 1,
                  explanation:
                    "Nt = 100 × 2^(2×3) = 100 × 64 = 6400. (Choose closest or recalc with given units)",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-microbio-4",
        title: "CP-4: Rate of Microbial Growth",
        chapterId: "t6-microbio",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Turbidity" },
          { id: "kw-2", word: "Colorimeter" },
          { id: "kw-3", word: "Inoculation" },
          { id: "kw-4", word: "Dilution" },
          { id: "kw-5", word: "Field of View (FOV)" },
          { id: "kw-6", word: "Methylene Blue" },
          { id: "kw-7", word: "Calibration / Taring" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand how to set up a microbial growth experiment using yeast.",
          },
          {
            id: "obj-2",
            text: "Learn how to measure growth using turbidity and colorimetry.",
          },
          {
            id: "obj-3",
            text: "Understand how to calculate volumes and scaling for microscopic counts.",
          },
          {
            id: "obj-4",
            text: "Recognize limitations of turbidity measurements and the need for backup methods.",
          },
        ],
        sections: [
          {
            id: "section-microbio-4-1",
            title: "Setting up the Experiment",
            type: "text" as const,
            content: `1. Sterilize the work area using antimicrobials.  
2. Add 250ml of glucose solution into a conical flask (this is the liquid culture medium).  
3. Obtain dry baker yeast and add to the glucose using sterile inoculation.  
4. Seal with cotton wool stopper and loosely cover with aluminium foil to prevent evaporation.  
5. Use a magnetic stirrer to keep solution mixed and incubate at 20ºC.`,
            completed: false,
          },
          {
            id: "section-microbio-4-2",
            title: "Measuring Growth by Turbidity",
            type: "text" as const,
            content: `1. Calibrate colorimeter with plain glucose solution to zero (taring).  
2. Take 3ml of culture in a cuvette and measure absorbance at intervals over time.  
3. Turbidity indicates cell density, but note that dead cells are included.  
4. Backup with other methods (e.g., haemocytometer) to ensure accuracy.`,
            completed: false,
          },
          {
            id: "section-microbio-4-3",
            title: "Microscopic Counting using FOV",
            type: "text" as const,
            content: `1. Place acetate graph paper under x4 objective lens to find visible area.  
2. Scale to x40 lens: area is 10× smaller in height and 10× smaller in width → 1/100 of x4 area.  
3. Add methylene blue dye to stain yeast cells.  
4. Calculate volume of a single drop of dye (divide total volume of 10 drops by 10).  
5. Find volume under FOV using scale factor: (area under FOV / area of coverslip) × dye volume.  
6. Dilute sample if necessary.`,
            completed: false,
          },
          {
            id: "section-microbio-4-4",
            title: "Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "Why is turbidity used to measure microbial growth?",
                back: "It indicates how cloudy a culture is; more cells cause higher turbidity.",
              },
              {
                id: "fc-2",
                front: "Why do we calibrate the colorimeter?",
                back: "To set a baseline (zero absorbance) before measuring the culture.",
              },
              {
                id: "fc-3",
                front: "Why add methylene blue?",
                back: "To stain cells so they are visible under the microscope.",
              },
              {
                id: "fc-4",
                front: "Why scale FOV area from x4 to x40?",
                back: "To accurately calculate the number of cells in the smaller field of view.",
              },
              {
                id: "fc-5",
                front: "Why use backup methods with turbidity?",
                back: "Because turbidity cannot distinguish live from dead cells.",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-microbio-5",
        title: "Bacteria vs Viruses; Viral Pathways",
        chapterId: "t6-microbio",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Bacteria" },
          { id: "kw-2", word: "Viruses" },
          { id: "kw-3", word: "Prokaryote" },
          { id: "kw-4", word: "Capsid" },
          { id: "kw-5", word: "Capsomere" },
          { id: "kw-6", word: "Envelope" },
          { id: "kw-7", word: "Attachment Proteins" },
          { id: "kw-8", word: "Functional Proteins" },
          { id: "kw-9", word: "DNA Virus" },
          { id: "kw-10", word: "RNA Virus" },
          { id: "kw-11", word: "Retrovirus" },
          { id: "kw-12", word: "Reverse Transcriptase" },
          { id: "kw-13", word: "Integrase" },
          { id: "kw-14", word: "Lytic Pathway" },
          { id: "kw-15", word: "Lysogenic Pathway" },
          { id: "kw-16", word: "Provirus" },
          { id: "kw-17", word: "State of Latency" },
          { id: "kw-18", word: "Period of Lysogeny" },
          { id: "kw-19", word: "Vector (Plant Virus)" },
          { id: "kw-20", word: "Pathogenic" },
          { id: "kw-21", word: "Flagellum" },
          { id: "kw-22", word: "Plasmid" },
          { id: "kw-23", word: "Slime Capsule" },
          { id: "kw-24", word: "Mesosome" },
          { id: "kw-25", word: "Pili" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Differentiate between bacteria and viruses" },
          {
            id: "obj-2",
            text: "Identify key structures of bacteria and viruses",
          },
          {
            id: "obj-3",
            text: "Understand viral types: DNA, RNA, and retroviruses",
          },
          {
            id: "obj-4",
            text: "Explain viral entry mechanisms into host cells",
          },
          {
            id: "obj-5",
            text: "Describe lytic and lysogenic pathways and latency",
          },
          {
            id: "obj-6",
            text: "Identify examples of each virus type and bacterial structures",
          },
        ],
        sections: [
          {
            id: "section-microbio-5-1",
            title: "Bacteria Overview",
            type: "text" as const,
            completed: false,
            content: `Bacteria are **single-celled prokaryotes**:
- No membrane-bound organelles (e.g., mitochondria)
- No nucleus; single circular chromosome not associated with proteins
- Ribosomes are 70S (smaller than eukaryotic 80S)
- Cell walls made of **Murein/Peptidoglycan**

Additional structures:
- **Flagellum:** rotates for movement; some have multiple
- **Plasmids:** extra genes independent of chromosome
- **Pili:** attach to surfaces or other bacteria for gene transfer
- **Mesosomes:** in-foldings of membrane, possibly site for respiration
- **Slime Capsule:** protects against desiccation and host immune system

Some bacteria are **pathogenic**, others are harmless.`,
          },
          {
            id: "section-microbio-5-2",
            title: "Viruses Overview",
            type: "text" as const,
            completed: false,
            content: `Viruses are **non-cellular infectious particles**, simpler than bacteria:
- **Capsid:** protein coat made of repeating units called capsomeres
- **Nucleic Acid Core:** DNA or RNA
- **Envelope:** optional, made of host cell phospholipids (rare in plant viruses)
- **Attachment Proteins:** allow virus to bind to host cell
- **Functional Proteins:** enzymes like Reverse Transcriptase (HIV) to replicate viral genome

Viruses **cannot reproduce independently**; they require a living host cell and its machinery.`,
          },
          {
            id: "section-microbio-5-3",
            title: "Types of Viruses",
            type: "text" as const,
            completed: false,
            content: `**DNA Viruses:** Use DNA as template for replication and mRNA synthesis. Examples: Lambda phage, Adenoviruses, Smallpox.

**RNA Viruses:** Usually single-stranded RNA (ssRNA); replicate via RNA-dependent RNA polymerase; high mutation rate; do not produce DNA. Examples: Ebola virus, TMV (Tobacco Mosaic Virus).

**Retroviruses:** RNA viruses that encode **Reverse Transcriptase** and **Integrase**; RNA → DNA is integrated into host genome (provirus). Example: HIV.`,
          },
          {
            id: "section-microbio-5-4",
            title: "Viral Entry Mechanisms",
            type: "text" as const,
            completed: false,
            content: `- **Bacteriophages:** inject DNA into bacterial cell  
- **Animal viruses:** enter via endocytosis or envelope fusion  
- **Plant viruses:** usually rely on a **vector** (e.g., insect) to bypass cell wall`,
          },
          {
            id: "section-microbio-5-5",
            title: "Lysogenic Pathway",
            type: "text" as const,
            completed: false,
            content: `- Viral DNA integrates as **provirus**  
- Repressor protein stops transcription/translation  
- Virus is dormant: **state of latency**, lasting **period of lysogeny**  
- Activation (stress, nutrient deficiency, chemical trigger) → lytic pathway`,
          },
          {
            id: "section-microbio-5-6",
            title: "Lytic Pathway",
            type: "text" as const,
            completed: false,
            content: `- Viral genome is transcribed and translated into viral proteins  
- New virions assemble  
- Host cell bursts (**lysis**), releasing viruses  
- Infection spreads, causing disease`,
          },
          {
            id: "section-microbio-5-7",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "Name 3 main virus types",
                back: "DNA viruses, RNA viruses, Retroviruses",
              },
              {
                id: "fc-2",
                front: "What is a provirus?",
                back: "Dormant viral DNA integrated into host genome during lysogenic cycle",
              },
              {
                id: "fc-3",
                front: "Purpose of attachment proteins?",
                back: "Allow viruses to bind specifically to host cells",
              },
              {
                id: "fc-4",
                front: "Key difference between bacteria and viruses",
                back: "Bacteria are cellular, can reproduce independently; viruses are non-cellular and need a host",
              },
              {
                id: "fc-5",
                front: "Function of mesosomes in bacteria",
                back: "Possible site for respiration in some bacterial cells",
              },
              {
                id: "fc-6",
                front: "Function of slime capsule",
                back: "Prevents desiccation and protects from host immune system",
              },
            ],
          },
          {
            id: "section-microbio-5-8",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Bacteria vs Viruses & Viral Pathways Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Which structure allows a virus to attach to host cells?",
                  options: [
                    "Capsid",
                    "Envelope",
                    "Attachment Proteins",
                    "Mesosome",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Attachment proteins enable viruses to bind specifically to host cells.",
                },
                {
                  id: "q2",
                  question:
                    "Which virus type converts RNA into DNA for integration?",
                  options: ["DNA Virus", "RNA Virus", "Retrovirus"],
                  correctAnswer: 2,
                  explanation:
                    "Retroviruses use reverse transcriptase to convert RNA to DNA, then integrate it into host genome.",
                },
                {
                  id: "q3",
                  question:
                    "Which bacterial structure allows gene transfer between cells?",
                  options: ["Flagellum", "Plasmid", "Pili", "Slime Capsule"],
                  correctAnswer: 2,
                  explanation:
                    "Pili allow bacteria to attach and exchange genetic material during sexual reproduction.",
                },
                {
                  id: "q4",
                  question: "What happens during the lytic pathway?",
                  options: [
                    "Viral DNA stays dormant",
                    "Host cell lyses releasing viruses",
                    "Virus loses capsid",
                    "Bacteria reproduce by binary fission",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "During the lytic pathway, viral particles are made and the host cell bursts.",
                },
                {
                  id: "q5",
                  question:
                    "Plant viruses usually require what to enter host cells?",
                  options: [
                    "Endocytosis",
                    "Envelope fusion",
                    "Vector like insect",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Vectors like insects help plant viruses bypass the rigid cell wall.",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "t6-2",
    title: "Immunity",
    subjectId: "bio-t6",
    progress: 0,
    lessons: [
      {
        id: "lesson-immunity-1",
        title: "TB and HIV",
        chapterId: "t6-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Disease" },
          { id: "kw-2", word: "Infectious Disease" },
          { id: "kw-3", word: "Pathogen" },
          { id: "kw-4", word: "Tuberculosis" },
          { id: "kw-5", word: "Mycobacterium tuberculosis" },
          { id: "kw-6", word: "Tubercles" },
          { id: "kw-7", word: "Primary Infection" },
          { id: "kw-8", word: "Active TB" },
          { id: "kw-9", word: "Retrovirus" },
          { id: "kw-10", word: "HIV" },
          { id: "kw-11", word: "T-helper Cells" },
          { id: "kw-12", word: "Reverse Transcriptase" },
          { id: "kw-13", word: "Integrase" },
          { id: "kw-14", word: "Acute HIV Syndrome" },
          { id: "kw-15", word: "Chronic/Asymptomatic Stage" },
          { id: "kw-16", word: "Symptomatic Stage" },
          { id: "kw-17", word: "AIDS" },
          { id: "kw-18", word: "Opportunistic Infection" },
          { id: "kw-19", word: "Immunocompromised" },
          { id: "kw-20", word: "Transmission" },
          { id: "kw-21", word: "Bodily Fluids" },
          { id: "kw-22", word: "Cough / Sneezing" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Define disease and infectious disease" },
          { id: "obj-2", text: "Explain transmission and progression of TB" },
          {
            id: "obj-3",
            text: "Describe HIV structure, replication, and stages",
          },
          {
            id: "obj-4",
            text: "Understand role of T-helper cells in immunity",
          },
          {
            id: "obj-5",
            text: "Explain opportunistic infections and AIDS progression",
          },
          {
            id: "obj-6",
            text: "Identify factors affecting rate of HIV progression",
          },
        ],
        sections: [
          {
            id: "section-immunity-1-1",
            title: "Introduction to Disease and Pathogens",
            type: "text" as const,
            completed: false,
            content: `- **Disease:** Illness or disorder leading to poor health  
- **Signs & Symptoms:** Observable effects of a disease  
- **Infectious Disease:** Caused by **pathogens**; transmissible between individuals  
- Pathogens include: some bacteria, some fungi, all viruses (not all viruses are pathogenic to humans)  
- Example: **Mycobacterium tuberculosis** causes **Tuberculosis (TB)**`,
          },
          {
            id: "section-immunity-1-2",
            title: "Transmission and Stages of TB",
            type: "text" as const,
            completed: false,
            content: `- TB spreads via **air droplets** from coughs or sneezes  
- Droplets are inhaled into lungs of uninfected people, especially in overcrowded areas  
- Bacteria are engulfed by **phagocytes** (non-specific immune response)  
- **Lysosomes fail to fuse**, allowing bacteria to survive inside phagocytes  
- **Primary Infection:** Healthy immune system prevents disease, bacteria remain dormant  
- Infected phagocytes form **Tubercles**, bacteria remain dormant  
- Activation (e.g., HIV infection, immune suppression) → **Active TB**  
- Dormancy can last weeks to years  
- **Symptoms:** Fever, fatigue, cough, lung inflammation  
- Untreated TB can lead to **lung damage, respiratory failure, or spread to other organs**`,
          },
          {
            id: "section-immunity-1-3",
            title: "HIV Transmission",
            type: "text" as const,
            completed: false,
            content: `- HIV is a **retrovirus** with RNA  
- Transmitted via **bodily fluids**:  
  1. Sexual intercourse  
  2. Sharing needles  
  3. Blood transfusions  
  4. Across placenta  
  5. Breastfeeding  
  6. Mixing blood during birth`,
          },
          {
            id: "section-immunity-1-4",
            title: "HIV Replication Cycle",
            type: "text" as const,
            completed: false,
            content: `1. HIV attaches to **T-helper cells** (lymphocytes) via receptors  
2. Capsid enters cell, releases RNA  
3. **Reverse Transcriptase** converts RNA → ssDNA → dsDNA  
4. **Integrase** incorporates viral DNA into host genome  
5. Viral DNA may stay dormant for months/years  
6. Transcription & translation produce viral proteins; host enzymes also used  
7. New viruses assemble and **bud off** to infect other T-helper cells`,
          },
          {
            id: "section-immunity-1-5",
            title: "Stages of HIV Infection",
            type: "text" as const,
            completed: false,
            content: `- **Acute HIV Syndrome:** Flu-like symptoms during initial replication  
- **Chronic / Asymptomatic Stage:** Virus dormant, often for years  
- **Symptomatic Stage:** T-helper cells decline, B-cells less activated, antibodies drop  
- **Advanced AIDS:** T-helper cell count drops below critical level; opportunistic infections occur, e.g., TB, diarrhea, severe infections; can lead to death`,
          },
          {
            id: "section-immunity-1-6",
            title: "T-helper Cells and Immunity",
            type: "text" as const,
            completed: false,
            content: `- T-helper cells are crucial in **specific immune response**  
- Activate B-cells to produce **antibodies**  
- Antibodies increase **phagocytosis rate**  
- HIV destroys T-helper cells → immunocompromised → susceptible to **opportunistic infections** (like TB)`,
          },
          {
            id: "section-immunity-1-7",
            title: "Factors Affecting HIV Progression",
            type: "text" as const,
            completed: false,
            content: `- **Access to healthcare**  
- **Age**  
- **Strain of HIV**  
- **Existing infections / general health**  
- These influence rate of progression to AIDS and survival time`,
          },
          {
            id: "section-immunity-1-8",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is an infectious disease?",
                back: "Disease caused by a pathogen that can be transmitted between individuals.",
              },
              {
                id: "fc-2",
                front: "Primary vs Active TB",
                back: "Primary: bacteria dormant, no symptoms; Active: bacteria multiply, symptoms develop.",
              },
              {
                id: "fc-3",
                front: "Transmission routes of HIV",
                back: "Sexual contact, needles, blood transfusion, mother to child via placenta, birth, or breastmilk.",
              },
              {
                id: "fc-4",
                front: "Role of T-helper cells",
                back: "Activate B-cells to produce antibodies and enhance phagocytosis.",
              },
              {
                id: "fc-5",
                front: "Opportunistic infection",
                back: "Infections that occur in immunocompromised patients, e.g., TB in HIV patients.",
              },
              {
                id: "fc-6",
                front: "Difference between HIV and AIDS",
                back: "HIV is the virus; AIDS is the disease caused by advanced HIV infection.",
              },
            ],
          },
          {
            id: "section-immunity-1-9",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "TB and HIV Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which pathogen causes TB?",
                  options: [
                    "HIV",
                    "Mycobacterium tuberculosis",
                    "Ebola virus",
                    "Influenza virus",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "TB is caused by the bacterium Mycobacterium tuberculosis.",
                },
                {
                  id: "q2",
                  question: "How does HIV primarily affect immunity?",
                  options: [
                    "Destroys B-cells",
                    "Destroys T-helper cells",
                    "Destroys phagocytes",
                    "Destroys red blood cells",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "HIV destroys T-helper cells, weakening the immune system.",
                },
                {
                  id: "q3",
                  question: "Which is a route of TB transmission?",
                  options: [
                    "Bodily fluids",
                    "Inhalation of airborne droplets",
                    "Contaminated food",
                    "Skin contact",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "TB spreads via inhalation of droplets from coughs or sneezes.",
                },
                {
                  id: "q4",
                  question: "Stage where HIV virus is dormant for years?",
                  options: [
                    "Acute HIV syndrome",
                    "Chronic/Asymptomatic stage",
                    "Symptomatic stage",
                    "Advanced AIDS",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "During chronic/asymptomatic stage, HIV is mostly dormant.",
                },
                {
                  id: "q5",
                  question: "Opportunistic infections occur because:",
                  options: [
                    "Immune system is healthy",
                    "Patient is immunocompromised",
                    "Virus is absent",
                    "Bacteria are weak",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Opportunistic infections affect patients with weakened immune systems.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-immunity-2",
        title: "Pathogen Entry and Body Barriers",
        chapterId: "t6-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Pathogen" },
          { id: "kw-2", word: "Transmission" },
          { id: "kw-3", word: "Vector" },
          { id: "kw-4", word: "Inhalation" },
          { id: "kw-5", word: "Ingestion" },
          { id: "kw-6", word: "Direct Contact" },
          { id: "kw-7", word: "Indirect Contact" },
          { id: "kw-8", word: "Inoculation" },
          { id: "kw-9", word: "Mucous Membranes" },
          { id: "kw-10", word: "Skin Barrier" },
          { id: "kw-11", word: "Stomach Acid" },
          { id: "kw-12", word: "Gut Flora" },
          { id: "kw-13", word: "Skin Flora" },
          { id: "kw-14", word: "Lysozymes" },
          { id: "kw-15", word: "Sebum" },
          { id: "kw-16", word: "Keratin" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Describe the main routes of pathogen entry" },
          {
            id: "obj-2",
            text: "Explain examples of pathogens transmitted by each route",
          },
          {
            id: "obj-3",
            text: "Identify physical and chemical barriers against pathogens",
          },
          {
            id: "obj-4",
            text: "Explain how beneficial microorganisms protect the body",
          },
          {
            id: "obj-5",
            text: "Differentiate between lysozymes and lysosomes",
          },
        ],
        sections: [
          {
            id: "section-immunity-2-1",
            title: "Routes of Pathogen Entry (VIIIID)",
            type: "text" as const,
            completed: false,
            content: `Pathogens can enter the body via six main routes, remembered as **VIIIID**:
1. **Vectors**: Living organisms like mosquitoes or flies that carry and transmit pathogens (e.g., Malaria, Yellow Fever)  
2. **Inhalation**: Breathing in droplets from coughs, sneezes, or talking (e.g., Measles, TB, Influenza)  
3. **Ingestion**: Eating or drinking contaminated food/water (e.g., Salmonella, Cholera)  
4. **Indirect Contact**: Touching contaminated objects, then touching mouth/nose (e.g., surfaces, towels)  
5. **Direct Contact**: Direct body contact, including sexual transmission; pathogens enter via mucous membranes into bloodstream (e.g., HIV, Ebola, Syphilis)  
6. **Inoculation**: Pathogens enter through broken skin via cuts, bites, or injections (e.g., Tetanus, HIV, Hepatitis B)`,
          },
          {
            id: "section-immunity-2-2",
            title: "Physical and Chemical Barriers (SSML)",
            type: "text" as const,
            completed: false,
            content: `The body has several **first-line barriers** to prevent infection, remembered as **SSML**:
- **Skin**: Physical barrier containing **keratin**; blood clotting helps block pathogens if skin is damaged.  
- **Stomach Acid**: Gastric juice with HCl kills most ingested pathogens, though some (e.g., Cholera) survive.  
- **Microorganisms (Gut & Skin Flora)**: Harmless microbes compete with pathogens for resources, limiting infections. Includes gut flora, skin flora, vaginal flora.  
- **Lysozymes**: Enzymes in tears, saliva, and mucus that **lyse bacterial cell walls**. Note: lysosomes are cellular organelles; lysozymes are enzymes in secretions.  
- **Sebum**: Produced by sebaceous glands, kills bacteria and fungi.`,
          },
          {
            id: "section-immunity-2-3",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What does VIIIID stand for?",
                back: "Vector, Inhalation, Ingestion, Indirect Contact, Direct Contact, Inoculation – main routes of pathogen entry.",
              },
              {
                id: "fc-2",
                front: "Example of a pathogen transmitted by a vector?",
                back: "Malaria parasite transmitted by mosquitoes.",
              },
              {
                id: "fc-3",
                front: "Difference between lysozyme and lysosome?",
                back: "Lysozyme is an enzyme in secretions that damages bacterial walls; lysosomes are organelles inside cells containing enzymes.",
              },
              {
                id: "fc-4",
                front: "How do gut and skin flora protect the body?",
                back: "They compete with pathogens for resources, preventing infection.",
              },
              {
                id: "fc-5",
                front: "What is the role of sebum?",
                back: "It kills bacteria and fungi on the skin surface.",
              },
              {
                id: "fc-6",
                front: "How does stomach acid protect the body?",
                back: "Strongly acidic HCl kills most ingested pathogens before they reach the intestines.",
              },
            ],
          },
          {
            id: "section-immunity-2-4",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Pathogen Entry & Body Barriers Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which of the following is an example of a vector?",
                  options: ["Salmonella", "Mosquito", "HIV", "Tetanus"],
                  correctAnswer: 1,
                  explanation:
                    "Vectors are living organisms that transmit pathogens, e.g., mosquitoes.",
                },
                {
                  id: "q2",
                  question: "Pathogens entering through broken skin is called?",
                  options: [
                    "Inhalation",
                    "Inoculation",
                    "Direct Contact",
                    "Indirect Contact",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Inoculation occurs when pathogens enter through cuts or broken skin.",
                },
                {
                  id: "q3",
                  question: "Which body barrier uses keratin?",
                  options: ["Stomach Acid", "Skin", "Lysozyme", "Sebum"],
                  correctAnswer: 1,
                  explanation:
                    "Skin contains keratin as a physical barrier to block pathogen entry.",
                },
                {
                  id: "q4",
                  question: "How do gut flora protect against pathogens?",
                  options: [
                    "By producing stomach acid",
                    "By competing for resources and limiting pathogen growth",
                    "By directly attacking pathogens with antibodies",
                    "By producing sebum",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Gut flora compete with pathogens for nutrients, limiting their ability to infect.",
                },
                {
                  id: "q5",
                  question: "Lysozymes are found in:",
                  options: [
                    "Blood",
                    "Secretions like tears and saliva",
                    "Gut flora",
                    "Sebum",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Lysozymes are enzymes in secretions that damage bacterial cell walls.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-immunity-3",
        title: "Non-Specific Immune Response",
        chapterId: "t6-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Non-Specific Immune Response" },
          { id: "kw-2", word: "Phagocytosis" },
          { id: "kw-3", word: "Interferons" },
          { id: "kw-4", word: "Inflammation" },
          { id: "kw-5", word: "Mast Cells" },
          { id: "kw-6", word: "Histamine" },
          { id: "kw-7", word: "Cytokines" },
          { id: "kw-8", word: "Phagocyte" },
          { id: "kw-9", word: "APC" },
          { id: "kw-10", word: "Macrophages" },
          { id: "kw-11", word: "Neutrophils" },
          { id: "kw-12", word: "Dendritic Cells" },
          { id: "kw-13", word: "T-helper Cells" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Describe the main components of the non-specific immune response",
          },
          {
            id: "obj-2",
            text: "Explain the process of inflammation and its effects",
          },
          {
            id: "obj-3",
            text: "Explain the role of interferons in viral infections",
          },
          {
            id: "obj-4",
            text: "Describe phagocytosis and antigen presentation",
          },
          {
            id: "obj-5",
            text: "Identify the types of phagocytes and their functions",
          },
        ],
        sections: [
          {
            id: "section-3-1",
            title: "Overview of Non-Specific and Specific Immune Responses",
            type: "text" as const,
            completed: false,
            content: `Immune responses are divided into:
- **Non-Specific**: Same response regardless of pathogen type. Initiates immediately when tissue is invaded.
- **Specific**: Targeted response to a particular pathogen, recognizing unique **antigens** (proteins, glycoproteins, glycolipids) that label cells as self or non-self.`,
          },
          {
            id: "section-3-2",
            title: "Inflammation",
            type: "text" as const,
            completed: false,
            content: `When tissue is damaged, the non-specific immune response triggers **inflammation**, observed as:
- Redness
- Swelling
- Pain
- Heat  

**Mast cells** release **histamine**, which:
- Causes **vasodilation** (increased blood flow)
- Increases **capillary permeability** to allow fluid, plasma proteins, and phagocytes into tissues
- Stimulates cells to release **cytokines**, signaling molecules that trigger further immune response.`,
          },
          {
            id: "section-3-3",
            title: "Interferons (IFNs)",
            type: "text" as const,
            completed: false,
            content: `**Interferons** are anti-viral proteins that:
- Increase inflammation
- Inhibit viral protein production
- Activate **T-killer cells** to destroy infected cells`,
          },
          {
            id: "section-3-4",
            title: "Phagocytosis",
            type: "text" as const,
            completed: false,
            content: `**Phagocytes** (Neutrophils, Macrophages, Dendritic cells) remove pathogens by engulfing and digesting them:
1. Phagocytes leave bloodstream by squeezing out of capillaries (diapedesis).
2. Attracted by **histamines** and **cytokines** to infection site.
3. Recognize **non-self antigens** on pathogens.
4. Engulf pathogen into a **phagosome** by endocytosis.
5. **Lysosome** fuses with phagosome, releasing digestive enzymes including **lysozymes**.
6. Pathogen is digested; antigens are presented on phagocyte membrane as an **APC (Antigen Presenting Cell)** to initiate specific immune response.
- Macrophages are large (“rhino-sized”) and can engulf ~100 bacteria.
- T-helper cells re-activate macrophages.
- Each B-cell can produce ~2000 antibodies/sec.`,
          },
          {
            id: "section-3-5",
            title: "Phagocytes Comparison Table",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "type", label: "Phagocyte Type", sortable: true },
                { key: "size", label: "Relative Size", sortable: true },
                { key: "function", label: "Function", sortable: false },
                {
                  key: "antigenPresentation",
                  label: "Antigen Presentation?",
                  sortable: true,
                },
              ],
              data: [
                {
                  type: "Neutrophils",
                  size: "Smaller (cellular scale)",
                  function: "Engulf pathogens, short-lived",
                  antigenPresentation: "No",
                },
                {
                  type: "Macrophages",
                  size: "Large (rhino-sized analogy)",
                  function: "Engulf pathogens, remove dead cells",
                  antigenPresentation: "Yes",
                },
                {
                  type: "Dendritic Cells",
                  size: "Medium",
                  function: "Engulf pathogens, main antigen-presenting cells",
                  antigenPresentation: "Yes",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-3-6",
            title: "Phagocytosis Process Chart",
            type: "chart" as const,
            completed: false,
            chartData: {
              type: "line",
              data: [
                { x: 1, y: 0, step: "Pathogen approaches phagocyte" },
                {
                  x: 2,
                  y: 1,
                  step: "Phagocyte extends membrane around pathogen",
                },
                { x: 3, y: 2, step: "Engulfment into phagosome" },
                { x: 4, y: 3, step: "Lysosome fuses, enzymes digest pathogen" },
                { x: 5, y: 4, step: "Antigens presented on membrane as APC" },
              ],
              xKey: "x",
              yKey: "y",
              allowTypeSwitch: true,
              colors: ["#3b82f6"],
            },
          },
          {
            id: "section-3-7",
            title: "Examiner Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Non-Specific vs Specific",
                content:
                  "Non-specific responses act immediately and are the same for all pathogens; specific responses recognize antigens.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "APC Function",
                content:
                  "Remember: Only macrophages and dendritic cells present antigens to initiate the specific response, not neutrophils.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Quick Fact",
                content:
                  "T-helper cells re-activate macrophages and stimulate B-cells to produce antibodies (~2000/sec).",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-immunity-4",
        title: "Specific Immune Response",
        chapterId: "t6-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Antigen" },
          { id: "kw-2", word: "Self-antigen" },
          { id: "kw-3", word: "Non-self antigen" },
          { id: "kw-4", word: "APC" },
          { id: "kw-5", word: "Lymphocytes" },
          { id: "kw-6", word: "B-cell" },
          { id: "kw-7", word: "Plasma cell" },
          { id: "kw-8", word: "Antibody" },
          { id: "kw-9", word: "Antigen-binding site" },
          { id: "kw-10", word: "Variable region" },
          { id: "kw-11", word: "Constant region" },
          { id: "kw-12", word: "Hinge region" },
          { id: "kw-13", word: "Neutralization" },
          { id: "kw-14", word: "Agglutination" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Define antigens and their role in immune recognition",
          },
          { id: "obj-2", text: "Describe the structure of antibodies" },
          { id: "obj-3", text: "Explain how antibodies bind to antigens" },
          {
            id: "obj-4",
            text: "List the main actions of antibodies in immunity",
          },
          {
            id: "obj-5",
            text: "Differentiate between membrane-bound and secreted antibodies",
          },
        ],
        sections: [
          {
            id: "section-4-1",
            title: "Antigens",
            type: "text" as const,
            completed: false,
            content: `All cells in the body have **antigens** (markers) that allow cell-to-cell recognition. Antigens are found on:
- Cell membranes
- Cell walls of bacteria
- Surface of viruses  

Types of antigens:
- **Self-antigens**: Produced by body's own cells, do NOT trigger immune response
- **Non-self antigens**: Produced by pathogens or foreign tissue, trigger immune response  

After **phagocytosis**, APCs (Antigen Presenting Cells, e.g., macrophages, dendritic cells) present antigens to lymphocytes, initiating the **specific immune response**. Lymphocytes bind to these antigens via specific receptors on their membranes.`,
          },
          {
            id: "section-4-2",
            title: "Antibodies Structure",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "component", label: "Component", sortable: true },
                { key: "description", label: "Description", sortable: false },
              ],
              data: [
                {
                  component: "Polypeptide chains",
                  description:
                    "4 chains: 2 heavy (long) + 2 light (short), linked by disulfide bonds",
                },
                {
                  component: "Constant region",
                  description:
                    "Same in antibodies of the same class (IgG, IgA, IgM, IgE, IgD)",
                },
                {
                  component: "Variable region",
                  description:
                    "Binds specifically to antigen at the **antigen-binding site**",
                },
                {
                  component: "Hinge region",
                  description:
                    "Flexible joint between heavy and light chains; allows antibody to bind antigens at different angles",
                },
                {
                  component: "Membrane-bound antibodies",
                  description:
                    "Attached to B-cell membranes, have extra attachment region on heavy chain",
                },
                {
                  component: "Secreted antibodies",
                  description:
                    "Free in blood or lymph, circulate to neutralize pathogens or toxins",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-4-3",
            title: "Actions of Antibodies",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "action", label: "Action", sortable: true },
                { key: "description", label: "Description", sortable: false },
                { key: "example", label: "Example", sortable: true },
              ],
              data: [
                {
                  action: "Neutralization",
                  description:
                    "Bind to pathogen surface or toxins to prevent infection",
                  example: "Antibodies binding tetanus toxin",
                },
                {
                  action: "Antitoxin",
                  description:
                    "Bind and neutralize toxins released by pathogens",
                  example: "Cholera toxin neutralized by antibodies",
                },
                {
                  action: "Agglutination",
                  description:
                    "Clump pathogens together for easier phagocytosis",
                  example: "Bacteria clumped in blood by antibodies",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-4-4",
            title: "Antigen-Antibody Complex",
            type: "chart" as const,
            completed: false,
            chartData: {
              type: "line",
              data: [
                { x: 1, y: 0, step: "Antibody recognizes specific antigen" },
                {
                  x: 2,
                  y: 1,
                  step: "Variable region binds to antigen-binding site",
                },
                { x: 3, y: 2, step: "Antigen-Antibody complex forms" },
                {
                  x: 4,
                  y: 3,
                  step: "Triggers immune responses: neutralization, agglutination, antitoxin",
                },
              ],
              xKey: "x",
              yKey: "y",
              allowTypeSwitch: true,
              colors: ["#10b981"],
            },
          },
          {
            id: "section-4-5",
            title: "Examiner Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Antigen Recognition",
                content:
                  "Only non-self antigens trigger specific immune responses; self-antigens are ignored.",
              },
              {
                id: "tip2",
                type: "warning",
                title: "Hinge Region Function",
                content:
                  "Not all antibodies have hinge regions; remember it provides flexibility for binding antigens.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Quick Recall",
                content:
                  "Antibodies have Y-shape: 2 heavy + 2 light chains, variable regions bind antigens, constant regions determine class.",
              },
            ],
          },
        ],
      },
      {
        id: "lesson-immunity-5",
        title: "Lymphocytes and Activation",
        chapterId: "t6-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Lymphocyte" },
          { id: "kw-2", word: "T Lymphocyte" },
          { id: "kw-3", word: "B Lymphocyte" },
          { id: "kw-4", word: "T Cell Receptor (TCR)" },
          { id: "kw-5", word: "Antibody Receptor" },
          { id: "kw-6", word: "Antigen-Presenting Cell (APC)" },
          { id: "kw-7", word: "Cytokine" },
          { id: "kw-8", word: "Clonal Expansion" },
          { id: "kw-9", word: "Plasma Cell" },
          { id: "kw-10", word: "Memory Cell" },
          { id: "kw-11", word: "T Helper Cell" },
          { id: "kw-12", word: "T Killer Cell" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Describe the main types of lymphocytes" },
          {
            id: "obj-2",
            text: "Explain how T cells and B cells are activated",
          },
          {
            id: "obj-3",
            text: "Identify the roles of T helper, T killer, and T memory cells",
          },
          {
            id: "obj-4",
            text: "Explain how B cells differentiate into plasma and memory cells",
          },
          { id: "obj-5", text: "Understand the concept of clonal expansion" },
        ],
        sections: [
          {
            id: "section-immunity-5-1",
            title: "Overview of Lymphocytes",
            type: "text" as const,
            completed: false,
            content: `- **Lymphocytes** are white blood cells responsible for specific immune responses.  
- Two main types: **T lymphocytes (T cells)** and **B lymphocytes (B cells)**  
- Each lymphocyte has receptors specific to **one antigen**.  
- **T cells**: Mature in the thymus, have T cell receptors (TCRs).  
- **B cells**: Mature in bone marrow, have antibody receptors (membrane-bound antibodies).`,
          },
          {
            id: "section-immunity-5-2",
            title: "Activation of T Cells",
            type: "text" as const,
            completed: false,
            content: `- **Antigen-presenting cells (APCs)** include macrophages, dendritic cells, infected body cells, and sometimes pathogens.  
- Mature T cells bind to **specific antigens** presented by APCs via their TCRs.  
- Once activated, T cells undergo **clonal expansion** (mitosis to produce identical T cells).  
- Types of T cells:
  1. **T Helper (Th)**: release cytokines, activate B cells and T killer cells, label cells/pathogens for phagocytosis.  
  2. **T Killer / Cytotoxic (Tc)**: destroy infected cells displaying antigens.  
  3. **T Memory**: remain in the body for a faster secondary response.`,
          },
          {
            id: "section-immunity-5-3",
            title: "Activation of B Cells",
            type: "text" as const,
            completed: false,
            content: `- **B cells** circulate in blood and concentrate in **liver and spleen**.  
- Recognize **specific antigens** via their antibody receptors.  
- Activation requires:
  1. Binding to the specific antigen
  2. Cytokine signals from **T helper cells**  
- Activated B cells undergo **clonal expansion**.  
- Differentiation of B cells:
  - **Plasma (Effector) Cells**: produce antibodies  
  - **Memory B Cells**: remain for faster secondary immune response`,
          },
          {
            id: "section-immunity-5-4",
            title: "T Cells vs B Cells Comparison",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "feature", label: "Feature", sortable: true },
                { key: "t_cells", label: "T Cells", sortable: false },
                { key: "b_cells", label: "B Cells", sortable: false },
              ],
              data: [
                {
                  feature: "Maturation site",
                  t_cells: "Thymus",
                  b_cells: "Bone marrow",
                },
                {
                  feature: "Receptor",
                  t_cells: "TCR",
                  b_cells: "Antibody receptor",
                },
                {
                  feature: "Activation signal",
                  t_cells: "APC + antigen",
                  b_cells: "Antigen + cytokines from Th cells",
                },
                {
                  feature: "Function",
                  t_cells: "Helper, Killer, Memory",
                  b_cells: "Plasma (effector) & Memory",
                },
                {
                  feature: "Location",
                  t_cells: "Blood, lymphoid tissue",
                  b_cells: "Blood, liver, spleen",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-immunity-5-5",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What triggers T cell activation?",
                back: "Binding to antigen presented by an APC.",
              },
              {
                id: "fc-2",
                front: "Role of T helper cells?",
                back: "Release cytokines to activate B cells and T killer cells; label pathogens for phagocytosis.",
              },
              {
                id: "fc-3",
                front: "Difference between plasma and memory B cells?",
                back: "Plasma cells produce antibodies; memory cells remain for faster secondary response.",
              },
              {
                id: "fc-4",
                front: "What is clonal expansion?",
                back: "Mitosis of activated lymphocytes to produce identical clones.",
              },
              {
                id: "fc-5",
                front: "Where do B cells mature?",
                back: "Bone marrow.",
              },
              {
                id: "fc-6",
                front: "Where do T cells mature?",
                back: "Thymus.",
              },
            ],
          },
          {
            id: "section-immunity-5-6",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Lymphocytes & Activation Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which cell type matures in the thymus?",
                  options: ["B cell", "T cell", "Plasma cell", "Macrophage"],
                  correctAnswer: 1,
                  explanation:
                    "T cells mature in the thymus and acquire their TCRs.",
                },
                {
                  id: "q2",
                  question: "Which signal is required for B cell activation?",
                  options: [
                    "Binding to antigen only",
                    "Cytokine only",
                    "Binding to antigen + T helper cytokines",
                    "None of the above",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "B cells require both antigen binding and cytokines from T helper cells.",
                },
                {
                  id: "q3",
                  question: "Function of T killer cells?",
                  options: [
                    "Activate B cells",
                    "Destroy infected cells",
                    "Produce antibodies",
                    "Remain as memory cells",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "T killer (cytotoxic) cells destroy infected cells displaying antigens.",
                },
                {
                  id: "q4",
                  question: "What is the role of memory B cells?",
                  options: [
                    "Produce antibodies immediately",
                    "Remain in the body for faster secondary response",
                    "Activate T cells",
                    "Present antigens",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Memory B cells allow a faster and stronger response if the pathogen enters again.",
                },
                {
                  id: "q5",
                  question: "What is clonal expansion?",
                  options: [
                    "Mutation of lymphocytes",
                    "Mitosis of activated lymphocytes",
                    "Antigen presentation",
                    "Antibody production",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Clonal expansion is the mitotic division of activated lymphocytes to form identical clones.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-immunity-6",
        title: "Developing Immunity and Vaccination",
        chapterId: "t6-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Primary Immune Response" },
          { id: "kw-2", word: "Secondary Immune Response" },
          { id: "kw-3", word: "Memory Cells" },
          { id: "kw-4", word: "Active Immunity" },
          { id: "kw-5", word: "Passive Immunity" },
          { id: "kw-6", word: "Natural Active Immunity" },
          { id: "kw-7", word: "Artificial Active Immunity" },
          { id: "kw-8", word: "Natural Passive Immunity" },
          { id: "kw-9", word: "Artificial Passive Immunity" },
          { id: "kw-10", word: "Vaccination" },
          { id: "kw-11", word: "Antigenic Variation" },
          { id: "kw-12", word: "FS Response" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain primary and secondary immune responses",
          },
          { id: "obj-2", text: "Describe the roles of memory B and T cells" },
          {
            id: "obj-3",
            text: "Differentiate between active and passive immunity",
          },
          { id: "obj-4", text: "Explain natural vs artificial immunity" },
          {
            id: "obj-5",
            text: "Describe how vaccines trigger immunity and FS response",
          },
          {
            id: "obj-6",
            text: "Explain antigenic variation and its effect on vaccines",
          },
        ],
        sections: [
          {
            id: "section-immunity-6-1",
            title: "Primary and Secondary Immune Response",
            type: "text" as const,
            completed: false,
            content: `- **Primary Immune Response**: First encounter with antigen triggers non-specific then specific immune response.  
- Number of T and B cells with correct receptors is low → takes a few days for plasma cells to produce antibodies.  
- Symptoms often occur during primary infection.  

- **Secondary Immune Response**: Memory B and T cells are already present in larger quantities.  
- Detect antigen faster → higher concentration of antibodies produced in less time (FS: Faster + Stronger).  
- Usually eliminates infection before symptoms appear.`,
          },
          {
            id: "section-immunity-6-2",
            title: "Active vs Passive Immunity",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "type", label: "Immunity Type", sortable: true },
                { key: "trigger", label: "Trigger", sortable: false },
                {
                  key: "memoryCells",
                  label: "Memory Cells Produced?",
                  sortable: true,
                },
                { key: "examples", label: "Examples", sortable: false },
              ],
              data: [
                {
                  type: "Active (Natural)",
                  trigger: "Body exposed to antigen naturally",
                  memoryCells: "Yes",
                  examples: "Infection with pathogen",
                },
                {
                  type: "Active (Artificial)",
                  trigger: "Antigen introduced via vaccination",
                  memoryCells: "Yes",
                  examples: "Measles, Polio vaccines",
                },
                {
                  type: "Passive (Natural)",
                  trigger: "Antibodies received externally",
                  memoryCells: "No",
                  examples: "Placenta, Breast milk (colostrum)",
                },
                {
                  type: "Passive (Artificial)",
                  trigger: "Antibodies administered externally",
                  memoryCells: "No",
                  examples: "Tetanus antitoxin, Antibody transfusion",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-immunity-6-3",
            title: "Vaccination and FS Response",
            type: "text" as const,
            completed: false,
            content: `- **Vaccines** contain antigens: dead/altered pathogen, less harmful strain, antigen alone, or genetic material coding for antigen.  
- Administered via injection or orally.  
- Triggers **primary immune response**, producing **memory cells** → development of **artificial active immunity**.  
- On infection, FS response: faster + stronger elimination of pathogen, often preventing symptoms.`,
          },
          {
            id: "section-immunity-6-4",
            title: "Antigenic Variation",
            type: "text" as const,
            completed: false,
            content: `- **Antigenic Variation**: Changes in pathogen antigens due to mutation.  
- Vaccines may need constant updating to match altered antigens.  
- If pathogen changes antigen shape, immunity from previous vaccination or infection may be less effective or bypassed.`,
          },
          {
            id: "section-immunity-6-5",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is a primary immune response?",
                back: "First immune response to antigen; slower and weaker as memory cells are absent.",
              },
              {
                id: "fc-2",
                front: "What is a secondary immune response?",
                back: "Faster and stronger response due to memory B and T cells.",
              },
              {
                id: "fc-3",
                front: "Difference between active and passive immunity?",
                back: "Active: immune response triggered, memory cells produced; Passive: antibodies acquired externally, no memory cells.",
              },
              {
                id: "fc-4",
                front: "Examples of artificial active and passive immunity?",
                back: "Artificial Active: vaccination; Artificial Passive: antibody transfusion (e.g., tetanus antitoxin).",
              },
              {
                id: "fc-5",
                front: "What is antigenic variation?",
                back: "Change in pathogen antigen due to mutations, affecting vaccine effectiveness.",
              },
              {
                id: "fc-6",
                front: "What does FS immune response stand for?",
                back: "Faster + Stronger response upon secondary infection.",
              },
            ],
          },
          {
            id: "section-immunity-6-6",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Developing Immunity Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Why is the primary immune response slower?",
                  options: [
                    "No antigen present",
                    "Low numbers of specific lymphocytes",
                    "Memory cells block response",
                    "Antibodies are absent",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "There are few B and T cells with correct receptors, so it takes days to produce antibodies.",
                },
                {
                  id: "q2",
                  question: "What ensures a faster secondary immune response?",
                  options: [
                    "Non-specific immunity",
                    "Presence of memory cells",
                    "Active transport",
                    "Passive antibodies",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Memory B and T cells recognize the antigen faster and produce more antibodies.",
                },
                {
                  id: "q3",
                  question: "Which type of immunity produces memory cells?",
                  options: [
                    "Active immunity",
                    "Passive immunity",
                    "Both",
                    "Neither",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Only active immunity triggers an immune response that produces memory cells.",
                },
                {
                  id: "q4",
                  question: "Example of artificial passive immunity?",
                  options: [
                    "Vaccination",
                    "Tetanus antitoxin",
                    "Infection",
                    "Maternal antibodies",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Artificial passive immunity is when antibodies are given externally, e.g., tetanus antitoxin.",
                },
                {
                  id: "q5",
                  question: "Why do vaccines need updates for some pathogens?",
                  options: [
                    "Immune system weakens",
                    "Antigenic variation",
                    "B cells die",
                    "T cells mutate",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Pathogens mutate their antigens (antigenic variation), reducing vaccine effectiveness.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-immunity-7",
        title: "Pathogen vs Host Evolutionary Race",
        chapterId: "t6-2",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Evolutionary Arms Race" },
          { id: "kw-2", word: "Host-Pathogen Interaction" },
          { id: "kw-3", word: "Immune Evasion" },
          { id: "kw-4", word: "HIV" },
          { id: "kw-5", word: "TB" },
          { id: "kw-6", word: "Helper T Cells" },
          { id: "kw-7", word: "Antigenic Variation" },
          { id: "kw-8", word: "Mutation" },
          { id: "kw-9", word: "Antigen Presentation" },
          { id: "kw-10", word: "Phagosome" },
          { id: "kw-11", word: "Lysosome" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain the concept of evolutionary arms race between pathogens and hosts",
          },
          {
            id: "obj-2",
            text: "Describe the immune evasion mechanisms of HIV",
          },
          { id: "obj-3", text: "Describe the immune evasion mechanisms of TB" },
          {
            id: "obj-4",
            text: "Understand how pathogen evolution challenges immunity and vaccination",
          },
        ],
        sections: [
          {
            id: "section-immunity-7-1",
            title: "Evolutionary Arms Race",
            type: "text" as const,
            completed: false,
            content: `- Hosts (mammals) have developed diverse immune systems to detect and destroy pathogens.  
- Pathogens evolve **evasion mechanisms** to survive and replicate inside hosts.  
- This continuous struggle is called an **evolutionary arms race**: both host and pathogen evolve strategies to gain an advantage over the other.  
- Evidence: modern pathogens still show multiple mechanisms to escape immune detection and destruction.`,
          },
          {
            id: "section-immunity-7-2",
            title: "HIV Immune Evasion Mechanisms",
            type: "text" as const,
            completed: false,
            content: `1. **Kills Helper T Cells**: Weakens immune system by reducing cells that detect HIV presence.  
2. **High Antigenic Variation**: Very high mutation rate in genes coding for antigen proteins → memory cells recognize only one strain, triggering a new primary response each infection.  
3. **Prevents Antigen Presentation**: Infected cells fail to display antigens on surface → T-helper and T-killer cells cannot detect and destroy infected cells.`,
          },
          {
            id: "section-immunity-7-3",
            title: "TB Immune Evasion Mechanisms",
            type: "text" as const,
            completed: false,
            content: `1. **Prevents Antigen Presentation**: Like HIV, infected cells do not display TB antigens effectively.  
2. **Stops Phagosome-Lysosome Fusion**: Secretes substances that prevent lysosomes from fusing with phagosomes → bacteria survive and multiply inside phagocytes without being digested.`,
          },
          {
            id: "section-immunity-7-4",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is an evolutionary arms race?",
                back: "Continuous adaptation between hosts and pathogens as each evolves new ways to gain advantage over the other.",
              },
              {
                id: "fc-2",
                front: "How does HIV weaken the immune system?",
                back: "By killing helper T cells and preventing infected cells from presenting antigens.",
              },
              {
                id: "fc-3",
                front: "What is antigenic variation?",
                back: "Pathogen mutations that change antigen proteins so memory cells cannot recognize new strains.",
              },
              {
                id: "fc-4",
                front: "How does TB survive inside phagocytes?",
                back: "It prevents lysosome-phagosome fusion and inhibits antigen presentation.",
              },
              {
                id: "fc-5",
                front: "Why is antigen presentation important?",
                back: "It allows T-helper and T-killer cells to detect and destroy infected cells.",
              },
            ],
          },
          {
            id: "section-immunity-7-5",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Pathogen vs Host Quiz",
              questions: [
                {
                  id: "q1",
                  question: "What does an evolutionary arms race refer to?",
                  options: [
                    "Pathogens evolve alone",
                    "Hosts evolve alone",
                    "Continuous adaptation of hosts and pathogens",
                    "Immune system always wins",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "It is the ongoing adaptation of both hosts and pathogens trying to gain an advantage.",
                },
                {
                  id: "q2",
                  question: "One way HIV evades immunity is by:",
                  options: [
                    "Increasing phagocytosis",
                    "Killing helper T cells",
                    "Enhancing antigen presentation",
                    "Reducing mutation rate",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "HIV kills helper T cells, weakening the immune system.",
                },
                {
                  id: "q3",
                  question: "How does TB survive inside phagocytes?",
                  options: [
                    "Stimulates lysosome fusion",
                    "Prevents phagosome-lysosome fusion",
                    "Kills the phagocyte immediately",
                    "Enhances antigen presentation",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "TB secretes substances that stop lysosomes from fusing with phagosomes, allowing bacteria to survive.",
                },
                {
                  id: "q4",
                  question: "Antigenic variation is important because:",
                  options: [
                    "Pathogens remain identical",
                    "Memory cells detect new strains easily",
                    "New strains evade memory cells",
                    "Immune system is faster",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Mutation of antigens produces new strains that memory cells cannot recognize, forcing new primary responses.",
                },
                {
                  id: "q5",
                  question:
                    "Which cells fail to detect infected cells when antigen presentation is blocked?",
                  options: [
                    "B cells",
                    "T-helper and T-killer cells",
                    "Phagocytes",
                    "Red blood cells",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "T-helper and T-killer cells rely on antigen presentation to detect infected cells.",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "t6-3",
    title: "Antibiotics",
    subjectId: "bio-t6",
    progress: 0,
    lessons: [
      {
        id: "lesson-antibiotics-1",
        title: "Introduction to Antibiotics",
        chapterId: "t6-3",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Antibiotics" },
          { id: "kw-2", word: "Bactericidal" },
          { id: "kw-3", word: "Bacteriostatic" },
          { id: "kw-4", word: "Penicillin" },
          { id: "kw-5", word: "Alexander Fleming" },
          { id: "kw-6", word: "Cell Wall" },
          { id: "kw-7", word: "Ribosome" },
          { id: "kw-8", word: "Translation" },
          { id: "kw-9", word: "DNA" },
          { id: "kw-10", word: "Lysis" },
          { id: "kw-11", word: "Eukaryotic Cells" },
          { id: "kw-12", word: "Viruses" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Define antibiotics and give an example" },
          {
            id: "obj-2",
            text: "Differentiate between bactericidal and bacteriostatic antibiotics",
          },
          {
            id: "obj-3",
            text: "Explain the mechanisms by which antibiotics damage bacteria",
          },
          {
            id: "obj-4",
            text: "Understand why antibiotics do not affect eukaryotic cells or viruses",
          },
          { id: "obj-5", text: "Define lysis and its role in bacterial death" },
        ],
        sections: [
          {
            id: "section-antibiotics-1-1",
            title: "What are Antibiotics?",
            type: "text" as const,
            completed: false,
            content: `- **Antibiotics** are chemicals that damage bacterial cells with minimal or no damage to human tissues.  
- Example: **Penicillin**, discovered by **Alexander Fleming**.  
- They can be classified as:  
  - **Bactericidal**: Kill bacteria directly  
  - **Bacteriostatic**: Inhibit bacterial growth; at high enough doses, can also kill bacteria`,
          },
          {
            id: "section-antibiotics-1-2",
            title: "Mechanisms of Antibiotic Action",
            type: "text" as const,
            completed: false,
            content: `Antibiotics interfere with bacterial metabolism and growth:  
1. **Cell Wall Disruption**: Inhibit enzymes that form cell wall bonds → wall weakens → osmotic turgor pressure causes bursting  
2. **Ribosome Binding**: Bind to bacterial ribosomes → inhibit translation of proteins  
3. **Membrane Damage**: Disrupt cell membrane → uncontrolled water flow → bacterial death  
4. **DNA Interference**: Prevent bacterial DNA from coiling → DNA cannot fit into cell → replication fails  

- **Eukaryotic cells**: Have different enzymes, ribosomes, and no cell wall → mostly unaffected  
- **Viruses**: Have none of these structures → not affected by antibiotics`,
          },
          {
            id: "section-antibiotics-1-3",
            title: "Lysis",
            type: "text" as const,
            completed: false,
            content: `- **Lysis**: Bursting of a bacterial cell due to damaged or weakened cell wall or membrane  
- Leads to immediate bacterial death`,
          },
          {
            id: "section-antibiotics-1-4",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What are antibiotics?",
                back: "Chemicals that damage bacterial cells while causing minimal or no harm to human tissues.",
              },
              {
                id: "fc-2",
                front: "Difference between bactericidal and bacteriostatic?",
                back: "Bactericidal kills bacteria; bacteriostatic inhibits growth (can kill at high doses).",
              },
              {
                id: "fc-3",
                front: "Give an example of an antibiotic and its discoverer.",
                back: "Penicillin by Alexander Fleming.",
              },
              {
                id: "fc-4",
                front: "Why don’t antibiotics affect eukaryotic cells?",
                back: "Eukaryotic cells have different enzymes, ribosomes, and no cell wall.",
              },
              {
                id: "fc-5",
                front: "Define lysis.",
                back: "Bursting of bacterial cell due to weakened or damaged cell wall/membrane, causing death.",
              },
            ],
          },
          {
            id: "section-antibiotics-1-5",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Antibiotics Quiz",
              questions: [
                {
                  id: "q1",
                  question: "What type of antibiotic kills bacteria directly?",
                  options: [
                    "Bacteriostatic",
                    "Bactericidal",
                    "Penicillin",
                    "Lysis",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Bactericidal antibiotics kill bacteria directly.",
                },
                {
                  id: "q2",
                  question:
                    "Which cellular structure is targeted by antibiotics to cause lysis?",
                  options: [
                    "Nucleus",
                    "Cell Wall",
                    "Mitochondria",
                    "Golgi apparatus",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Damage to the bacterial cell wall causes osmotic pressure to burst the cell.",
                },
                {
                  id: "q3",
                  question: "Why are viruses unaffected by antibiotics?",
                  options: [
                    "They have ribosomes",
                    "They have DNA",
                    "They lack cell wall, enzymes, and ribosomes",
                    "They are eukaryotic",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Viruses lack cell wall, ribosomes, and enzymes that antibiotics target.",
                },
                {
                  id: "q4",
                  question: "Penicillin was discovered by?",
                  options: [
                    "Louis Pasteur",
                    "Alexander Fleming",
                    "Robert Koch",
                    "Joseph Lister",
                  ],
                  correctAnswer: 1,
                  explanation: "Alexander Fleming discovered Penicillin.",
                },
                {
                  id: "q5",
                  question: "What does bacteriostatic mean?",
                  options: [
                    "Kills bacteria immediately",
                    "Inhibits bacterial growth",
                    "Damages human cells",
                    "Kills viruses",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Bacteriostatic antibiotics inhibit bacterial growth; at high doses they may kill bacteria.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-antibiotics-2",
        title: "Effects of Antibiotics (CP6 Experiment)",
        chapterId: "t6-3",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Antibiotics" },
          { id: "kw-2", word: "Bacterial Lawn" },
          { id: "kw-3", word: "Sterile Equipment" },
          { id: "kw-4", word: "Sterile Environment" },
          { id: "kw-5", word: "Bunsen Burner" },
          { id: "kw-6", word: "Antimicrobial" },
          { id: "kw-7", word: "Disinfectant" },
          { id: "kw-8", word: "Control Disc" },
          { id: "kw-9", word: "Zone of Inhibition" },
          { id: "kw-10", word: "Bacterial Resistance" },
          { id: "kw-11", word: "Methicillin" },
          { id: "kw-12", word: "Tetracycline" },
          { id: "kw-13", word: "Streptomycin" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Understand how to test the effects of antibiotics on bacteria",
          },
          {
            id: "obj-2",
            text: "Explain the importance of sterile equipment and environment",
          },
          {
            id: "obj-3",
            text: "Describe how to prepare and apply antibiotic discs",
          },
          { id: "obj-4", text: "Interpret results using zones of inhibition" },
          {
            id: "obj-5",
            text: "Understand the use of a control in experiments",
          },
          {
            id: "obj-6",
            text: "Explain bacterial resistance based on experimental observations",
          },
        ],
        sections: [
          {
            id: "section-antibiotics-2-1",
            title: "Introduction",
            type: "text" as const,
            completed: false,
            content: `This experiment demonstrates the **effects of different antibiotics** on bacterial growth.  
- Antibiotics are chemicals that inhibit growth or kill bacteria.  
- By applying antibiotics to a lawn of bacteria on agar, we can observe which antibiotics are effective and which bacteria may be resistant.  
- Careful handling and sterile techniques are required to prevent contamination and ensure reliable results.`,
          },
          {
            id: "section-antibiotics-2-2",
            title: "Preparation and Sterility",
            type: "text" as const,
            completed: false,
            content: `**Maintaining sterility** is crucial:  
1. **Sterile equipment**: Use autoclaved or pre-sterilized instruments to prevent contamination.  
2. **Sterile environment**: Work near a **Bunsen burner** creating an updraft of sterile air to prevent airborne microbes from landing on your agar.  
3. **Disinfection**: Wipe work surfaces with disinfectant; wash plastic equipment and heat metal tools (loops, forceps) before use.  
4. Only handle bacterial plates carefully to minimize exposure to external contaminants.`,
          },
          {
            id: "section-antibiotics-2-3",
            title: "Preparing the Antibiotic Discs",
            type: "text" as const,
            completed: false,
            content: `- Soak small paper discs in antibiotic solutions (examples: **Methicillin, Tetracycline, Streptomycin**).  
- Alternatively, use commercially prepared discs already treated with antibiotics.  
- Prepare a **control disc** soaked in distilled water to provide a comparison point.  
- Control ensures that any observed effect is due to the antibiotic and not the paper, handling, or environment.`,
          },
          {
            id: "section-antibiotics-2-4",
            title: "Setting up the Experiment",
            type: "text" as const,
            completed: false,
            content: `1. Pour nutrient agar into petri dishes and allow it to solidify.  
2. Spread the bacterial culture evenly to form a **lawn** across the agar surface.  
3. Place antibiotic discs gently on the surface using sterile forceps.  
4. Invert the dish before incubation (lid down, agar up) to prevent **condensation from dripping** onto the agar and contaminating the lawn.  
5. Incubate at **25°C** for a set period, lightly taping the plate to avoid accidental opening.`,
          },
          {
            id: "section-antibiotics-2-5",
            title: "Observing Results",
            type: "text" as const,
            completed: false,
            content: `- After incubation, observe the **zones of inhibition**: clear areas around discs where bacterial growth has been prevented.  
- Measure diameter of each zone to compare antibiotic effectiveness.  
- No clear zone indicates **bacterial resistance** to that antibiotic.  
- Compare with control disc to ensure effects are truly due to the antibiotic.  
- Larger zones generally indicate more effective antibiotics against the bacterial strain.`,
          },
          {
            id: "section-antibiotics-2-6",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "Why is a sterile environment important?",
                back: "To prevent contamination and ensure observed effects are due to the antibiotics only.",
              },
              {
                id: "fc-2",
                front: "What is the purpose of the control disc?",
                back: "Provides a baseline to confirm that effects are caused by antibiotics, not other factors.",
              },
              {
                id: "fc-3",
                front: "Define zone of inhibition.",
                back: "Clear area around antibiotic disc where bacteria cannot grow.",
              },
              {
                id: "fc-4",
                front: "What does no zone of inhibition indicate?",
                back: "Bacteria are resistant to the antibiotic.",
              },
              {
                id: "fc-5",
                front: "Why invert the petri dish?",
                back: "To prevent condensation from dripping onto the agar and contaminating the bacterial lawn.",
              },
            ],
          },
          {
            id: "section-antibiotics-2-7",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Effects of Antibiotics Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Why is a Bunsen burner used in this experiment?",
                  options: [
                    "To heat the agar",
                    "To sterilize antibiotic discs",
                    "To create an updraft of sterile air",
                    "To kill bacteria on the disc",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "The updraft of sterile air prevents airborne contamination during setup.",
                },
                {
                  id: "q2",
                  question: "What is the purpose of a control disc?",
                  options: [
                    "To measure bacterial growth rate",
                    "To check effects of water without antibiotics",
                    "To increase bacterial lawn",
                    "To sterilize agar",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "The control disc ensures observed effects are due to antibiotics only.",
                },
                {
                  id: "q3",
                  question:
                    "What does a clear zone around an antibiotic disc indicate?",
                  options: [
                    "Bacterial resistance",
                    "Bacterial death or growth inhibition",
                    "Contamination",
                    "Condensation formation",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "A clear zone shows the antibiotic inhibited bacterial growth.",
                },
                {
                  id: "q4",
                  question: "Why invert the petri dish during incubation?",
                  options: [
                    "To prevent condensation dripping onto agar",
                    "To mix antibiotics evenly",
                    "To speed bacterial growth",
                    "To increase zone size",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Inverting prevents condensation from contaminating the bacterial lawn.",
                },
                {
                  id: "q5",
                  question:
                    "What does no clear zone around an antibiotic disc indicate?",
                  options: [
                    "Bacteria are resistant",
                    "Bacteria are sensitive",
                    "Experiment failed",
                    "Control disc issue",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "No zone indicates the bacteria can grow despite the antibiotic.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "lesson-antibiotics-3",
        title: "Hospital-Acquired Infections (HAIs) and Antibiotic Resistance",
        chapterId: "t6-3",
        completed: false,
        keywords: [
          { id: "kw-1", word: "HAI" },
          { id: "kw-2", word: "Hospital-Acquired Infection" },
          { id: "kw-3", word: "Disinfection" },
          { id: "kw-4", word: "Hand Hygiene" },
          { id: "kw-5", word: "Isolation Ward" },
          { id: "kw-6", word: "MRSA" },
          { id: "kw-7", word: "Antibiotic Resistance" },
          { id: "kw-8", word: "Narrow-Spectrum Antibiotic" },
          { id: "kw-9", word: "Broad-Spectrum Antibiotic" },
          { id: "kw-10", word: "Selection Pressure" },
          { id: "kw-11", word: "Horizontal Gene Transfer" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Define hospital-acquired infections (HAIs)" },
          {
            id: "obj-2",
            text: "Identify causes and transmission routes of HAIs",
          },
          {
            id: "obj-3",
            text: "Explain why patients in hospitals are at higher risk",
          },
          { id: "obj-4", text: "Describe prevention methods for HAIs" },
          {
            id: "obj-5",
            text: "Explain how antibiotic use in hospitals contributes to resistance",
          },
          {
            id: "obj-6",
            text: "Understand strategies to reduce antibiotic resistance",
          },
        ],
        sections: [
          {
            id: "section-antibiotics-3-1",
            title: "Introduction to HAIs",
            type: "text" as const,
            completed: false,
            content: `- **HAI (Hospital-Acquired Infection):** Infection contracted by a patient during their stay in a hospital or healthcare facility.  
- Common causes of HAIs:  
  - Not disinfecting equipment and surfaces  
  - Uncontained sneezing and coughing  
  - Staff and visitors not regularly washing hands  
- Hospital patients often have pre-existing illnesses, so their **immune systems are weakened**, making them more susceptible to infections.`,
          },
          {
            id: "section-antibiotics-3-2",
            title: "Preventing HAIs",
            type: "text" as const,
            completed: false,
            content: `- **Hand hygiene:** Staff and visitors must wash hands regularly.  
- **Screening:** Patients and visitors should be screened for infections; infected individuals should be isolated in **isolation wards**.  
- **Disinfection:** Surfaces and equipment must be disinfected after every use to remove pathogens.  
- Proper hygiene and sterilization practices reduce the risk of transmission of HAIs, including antibiotic-resistant bacteria like **MRSA (Methicillin-Resistant Staphylococcus aureus)**.`,
          },
          {
            id: "section-antibiotics-3-3",
            title: "Antibiotic Resistance and HAIs",
            type: "text" as const,
            completed: false,
            content: `- HAIs are often caused by **antibiotic-resistant bacteria**, making them difficult to treat and potentially life-threatening.  
- **Selection pressure:** Presence of antibiotics in hospitals acts as a selective force, encouraging resistant strains to develop.  
- Strategies to reduce resistance include:  
  1. **Do not use antibiotics for prevention**.  
  2. **Avoid prescribing antibiotics for viral diseases or minor infections**.  
  3. Use **narrow-spectrum antibiotics** whenever possible.  
     - Narrow-spectrum antibiotics target specific bacteria; resistance genes in non-target bacteria have no advantage.  
     - Bacteria can transfer resistance genes via **horizontal gene transfer**, so limiting selective pressure prevents unnecessary spread.  
  4. **Rotate antibiotics** to reduce risk of resistance developing to a single drug.`,
          },
          {
            id: "section-antibiotics-3-4",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is an HAI?",
                back: "An infection contracted by a patient during their stay in a hospital.",
              },
              {
                id: "fc-2",
                front: "Why are hospital patients at higher risk of infection?",
                back: "They often have weakened immune systems due to pre-existing diseases.",
              },
              {
                id: "fc-3",
                front: "Give three causes of HAIs.",
                back: "Not disinfecting equipment, uncontained coughing/sneezing, staff/visitors not washing hands.",
              },
              {
                id: "fc-4",
                front: "What is MRSA?",
                back: "Methicillin-resistant Staphylococcus aureus, a common antibiotic-resistant HAI pathogen.",
              },
              {
                id: "fc-5",
                front: "Why use narrow-spectrum antibiotics?",
                back: "They target specific bacteria, reducing unnecessary selection pressure and spread of resistance genes.",
              },
              {
                id: "fc-6",
                front: "How does rotation of antibiotics help?",
                back: "Reduces the risk of bacteria developing resistance to one specific antibiotic.",
              },
            ],
          },
          {
            id: "section-antibiotics-3-5",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "HAIs and Antibiotic Resistance Quiz",
              questions: [
                {
                  id: "q1",
                  question:
                    "Which of the following increases the risk of HAIs?",
                  options: [
                    "Proper handwashing",
                    "Disinfecting equipment",
                    "Uncontained sneezing and coughing",
                    "Screening patients",
                  ],
                  correctAnswer: 2,
                  explanation:
                    "Uncontained sneezing and coughing can spread pathogens and increase HAIs.",
                },
                {
                  id: "q2",
                  question: "MRSA is an example of:",
                  options: [
                    "A virus",
                    "Antibiotic-resistant bacteria",
                    "A disinfectant",
                    "A narrow-spectrum antibiotic",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "MRSA is Methicillin-resistant Staphylococcus aureus, an antibiotic-resistant bacteria.",
                },
                {
                  id: "q3",
                  question:
                    "Why should antibiotics not be used for viral infections?",
                  options: [
                    "Viruses are resistant",
                    "To avoid creating selection pressure for resistance in bacteria",
                    "To kill viruses faster",
                    "To disinfect surfaces",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Using antibiotics unnecessarily creates selection pressure, encouraging resistance in bacteria.",
                },
                {
                  id: "q4",
                  question:
                    "What is the purpose of isolating infected patients?",
                  options: [
                    "To allow them to rest",
                    "To prevent transmission of infection to others",
                    "To give more antibiotics",
                    "To monitor their blood pressure",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Isolation prevents infected patients from spreading pathogens to others in the hospital.",
                },
                {
                  id: "q5",
                  question: "Horizontal gene transfer in bacteria:",
                  options: [
                    "Spreads resistance genes between bacteria",
                    "Prevents mutation",
                    "Causes viruses to die",
                    "Is a type of disinfection",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Bacteria can exchange resistance genes through horizontal gene transfer, spreading resistance.",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "t6-4",
    title: "Decomposition",
    subjectId: "bio-t6",
    progress: 0,
    lessons: [
      {
        id: "lesson-decomposition-1",
        title: "Role of Decomposers",
        chapterId: "t6-4",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Decomposer" },
          { id: "kw-2", word: "Bacteria" },
          { id: "kw-3", word: "Fungi" },
          { id: "kw-4", word: "Enzymes" },
          { id: "kw-5", word: "Decomposition" },
          { id: "kw-6", word: "Respiration" },
          { id: "kw-7", word: "Nutrients" },
          { id: "kw-8", word: "Carbon Cycle" },
          { id: "kw-9", word: "CO2" },
          { id: "kw-10", word: "Methane" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Explain how dead organisms are broken down by decomposers",
          },
          {
            id: "obj-2",
            text: "Describe how decomposers recycle chemical components",
          },
          { id: "obj-3", text: "Explain the role of enzymes in decomposition" },
          {
            id: "obj-4",
            text: "Describe how decomposition contributes to nutrient availability for plants",
          },
          {
            id: "obj-5",
            text: "Understand how decomposition affects atmospheric CO2 and methane",
          },
        ],
        sections: [
          {
            id: "section-decomposition-1-1",
            title: "Introduction to Decomposition",
            type: "text" as const,
            completed: false,
            content: `- Dead organisms (plants and animals) are broken down by **microorganisms** called **decomposers**, including **bacteria** and **fungi**.  
- Decomposers recycle essential chemical components required by living organisms.`,
          },
          {
            id: "section-decomposition-1-2",
            title: "Role of Enzymes",
            type: "text" as const,
            completed: false,
            content: `- Decomposers secrete **enzymes** to break down large insoluble molecules into smaller molecules like **glucose**.  
- These smaller molecules can be used for **respiration**, releasing energy for the decomposers.`,
          },
          {
            id: "section-decomposition-1-3",
            title: "Nutrient Recycling and Carbon Cycle",
            type: "text" as const,
            completed: false,
            content: `- Decomposition releases **waste products** that are useful **nutrients for plants**.  
- Decomposers release **CO2** and **methane** into the atmosphere.  
- CO2 can be absorbed by green plants during **photosynthesis**, fixing carbon into carbohydrates and completing the **carbon cycle**.`,
          },
          {
            id: "section-decomposition-1-4",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What are decomposers?",
                back: "Microorganisms such as bacteria and fungi that break down dead organisms.",
              },
              {
                id: "fc-2",
                front: "Why do decomposers secrete enzymes?",
                back: "To break down large insoluble molecules into smaller molecules for absorption and respiration.",
              },
              {
                id: "fc-3",
                front: "How does decomposition help plants?",
                back: "It releases nutrients that plants can absorb for growth.",
              },
              {
                id: "fc-4",
                front: "Which gases do decomposers release?",
                back: "CO2 and methane.",
              },
              {
                id: "fc-5",
                front: "How is CO2 from decomposition reused?",
                back: "It is absorbed by green plants during photosynthesis to make carbohydrates.",
              },
            ],
          },
          {
            id: "section-decomposition-1-5",
            title: "Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Decomposition Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which organisms are primary decomposers?",
                  options: ["Plants", "Bacteria and fungi", "Animals", "Algae"],
                  correctAnswer: 1,
                  explanation:
                    "Bacteria and fungi are the main decomposers that break down dead organisms.",
                },
                {
                  id: "q2",
                  question: "Why are enzymes important in decomposition?",
                  options: [
                    "They provide oxygen",
                    "They break down large molecules into smaller ones",
                    "They photosynthesize",
                    "They absorb sunlight",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "Enzymes break down large insoluble molecules into smaller molecules that can be absorbed and respired.",
                },
                {
                  id: "q3",
                  question:
                    "Which nutrients do decomposers recycle for plants?",
                  options: [
                    "Minerals and chemical components",
                    "Water only",
                    "Sunlight",
                    "Oxygen only",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Decomposers release chemical components and nutrients that plants can use for growth.",
                },
                {
                  id: "q4",
                  question: "Which gases are released by decomposers?",
                  options: [
                    "CO2 and methane",
                    "Oxygen and nitrogen",
                    "Hydrogen only",
                    "Helium and neon",
                  ],
                  correctAnswer: 0,
                  explanation:
                    "Decomposers release CO2 and methane as by-products of decomposition.",
                },
                {
                  id: "q5",
                  question: "How is CO2 from decomposition used by plants?",
                  options: [
                    "Excreted as waste",
                    "Absorbed during photosynthesis to make carbohydrates",
                    "Released as oxygen",
                    "Stored in soil",
                  ],
                  correctAnswer: 1,
                  explanation:
                    "CO2 is absorbed by green plants and fixed into carbohydrates during photosynthesis.",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "t6-5",
    title: "Forensics",
    subjectId: "bio-t6",
    progress: 0,
    lessons: [
      {
        id: "lesson-forensics-1",
        title: "PCR and DNA Profiling",
        chapterId: "t6-5",
        completed: false,
        keywords: [
          { id: "kw-1", word: "PCR" },
          { id: "kw-2", word: "DNA profiling" },
          { id: "kw-3", word: "Thermal cycler" },
          { id: "kw-4", word: "Taq polymerase" },
          { id: "kw-5", word: "Primer" },
          { id: "kw-6", word: "DNA amplification" },
          { id: "kw-7", word: "Gel electrophoresis" },
          { id: "kw-8", word: "Restriction enzymes" },
          { id: "kw-9", word: "Fluorescent tags" },
          { id: "kw-10", word: "Forensics" },
        ],
        learningObjectives: [
          { id: "obj-1", text: "Understand how PCR is used in DNA profiling" },
          { id: "obj-2", text: "List the materials required for PCR" },
          {
            id: "obj-3",
            text: "Describe the three stages of PCR (Denaturation, Annealing, Elongation)",
          },
          {
            id: "obj-4",
            text: "Explain the role of primers, nucleotides, and Taq polymerase",
          },
          {
            id: "obj-5",
            text: "Understand the process of preparing DNA for gel electrophoresis",
          },
        ],
        sections: [
          {
            id: "section-pcr-1-1",
            title: "Introduction to PCR",
            type: "text" as const,
            completed: false,
            content: `- Every person (except monozygotic twins) has a unique DNA sequence, which allows the creation of a **DNA profile**.  
- DNA profiling is useful in forensics, evolutionary studies, ancestry testing, and paternity/maternity testing.  
- PCR (Polymerase Chain Reaction) is used to **produce many copies of a DNA fragment** from a small sample, even a single molecule. This is called **DNA amplification**.  
- PCR is an **in vitro DNA replication** process, meaning it happens outside the normal biological context, e.g., in a lab.`,
          },
          {
            id: "section-pcr-1-2",
            title: "Materials Needed for PCR",
            type: "text" as const,
            completed: false,
            content: `PCR requires the components known as "DPN DB":  
- **DNA (or RNA)**: the template to be amplified  
- **Primers**: short single-stranded DNA sequences that bind to the 3' end of target DNA, defining the region to amplify  
- **Free nucleotides (dNTPs)**: building blocks for new DNA strands  
- **DNA polymerase**: enzyme that synthesizes new DNA; **Taq polymerase** is commonly used because it withstands high temperatures  
- **Buffer solution**: maintains suitable pH for the reaction`,
          },
          {
            id: "section-pcr-1-3",
            title: "Stages of PCR: DAE",
            type: "text" as const,
            completed: false,
            content: `The PCR cycle has three main stages, remembered as "DAE":  
1. **Denaturation** (95ºC) – Hydrogen bonds between DNA strands break, separating the double helix into single strands.  
2. **Annealing** (50-60ºC) – Primers bind (anneal) to complementary sequences at the ends of the target DNA.  
3. **Elongation/Extension** (72ºC) – Taq polymerase synthesizes new DNA strands by adding nucleotides to the primers.  

- Each cycle doubles the amount of DNA.  
- Standard 20 cycles produce around 1 million copies.  
- Forward primer binds to 3' end of antisense strand, reverse primer binds to 3' end of sense strand.`,
          },
          {
            id: "section-pcr-1-4",
            title: "Preparing DNA for Gel Electrophoresis",
            type: "text" as const,
            completed: false,
            content: `- After PCR, DNA is treated with **restriction endonuclease enzymes** to cut it into fragments.  
- **Fluorescent tags** are added to the fragments so they can be visualized under UV light.  
- The fragments are then separated by **gel electrophoresis**, producing a pattern that can be analyzed to create a DNA profile.`,
          },
          {
            id: "section-pcr-1-5",
            title: "Applications of PCR",
            type: "text" as const,
            completed: false,
            content: `- **Forensics**: Identify individuals from biological samples.  
- **Genetic relationships**: Study evolutionary relationships between species.  
- **Ancestry kits**: Trace familial origins.  
- **Paternity/maternity testing**: Determine biological parentage.`,
          },
          {
            id: "section-pcr-1-6",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc-1",
                front: "What is PCR?",
                back: "Polymerase Chain Reaction, a method to amplify DNA fragments in vitro.",
              },
              {
                id: "fc-2",
                front: "Why is Taq polymerase used?",
                back: "It withstands high temperatures needed for denaturation in PCR.",
              },
              {
                id: "fc-3",
                front: "What is the purpose of primers?",
                back: "Primers define the region to be amplified and provide starting points for DNA synthesis.",
              },
              {
                id: "fc-4",
                front: "What happens in denaturation?",
                back: "The DNA double helix separates into single strands at 95ºC.",
              },
              {
                id: "fc-5",
                front: "What is gel electrophoresis used for?",
                back: "Separating DNA fragments by size to visualize patterns for DNA profiling.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "t6-6",
    title: "Summary",
    subjectId: "bio-t6",
    progress: 0,
    lessons: [
      {
        id: "t6-6-lesson-1",
        title: "T6 Microbiology Summary",
        chapterId: "t6-6",
        completed: false,
        keywords: [
          { id: "kw-1", word: "Microbiology" },
          { id: "kw-2", word: "Immunity" },
          { id: "kw-3", word: "HAI" },
          { id: "kw-4", word: "Antibiotics" },
          { id: "kw-5", word: "Decomposition" },
          { id: "kw-6", word: "Forensics" },
          { id: "kw-7", word: "PCR" },
          { id: "kw-8", word: "Practical techniques" },
          { id: "kw-9", word: "Measurement" },
        ],
        learningObjectives: [
          {
            id: "obj-1",
            text: "Recall the key concepts in microbiology, including immunity and pathogen-host interactions.",
          },
          {
            id: "obj-2",
            text: "Understand practical techniques for handling microorganisms and measuring microbial growth.",
          },
          {
            id: "obj-3",
            text: "Summarize the uses of antibiotics and the risk of antibiotic resistance.",
          },
          {
            id: "obj-4",
            text: "Explain decomposition and the role of microorganisms in nutrient recycling.",
          },
          {
            id: "obj-5",
            text: "Outline DNA profiling and PCR applications in forensics.",
          },
        ],
        sections: [
          {
            id: "section-summary-1",
            title: "Microbiology and Measuring Microorganisms",
            type: "text" as const,
            completed: false,
            content: `- Microorganisms include bacteria, viruses, and fungi, which can be studied using sterile techniques.  
- Practical techniques include sterilising equipment, using aseptic methods, and measuring growth via methods like streak plates, dilution plating, and haemocytometers.  
- In dilution plating, bacterial colonies originate from single viable cells, allowing estimation of total viable count.  
- Haemocytometers allow counting of cells in a known chamber volume to estimate concentration in the original sample.`,
          },
          {
            id: "section-summary-2",
            title: "Immunity",
            type: "text" as const,
            completed: false,
            content: `- The immune system responds to antigens via **primary and secondary immune responses**.  
- Primary response is slower; secondary response is faster and stronger due to memory B and T cells.  
- **Active immunity**: memory cells produced after natural infection or vaccination.  
- **Passive immunity**: antibodies acquired externally (placenta, breast milk, transfusions).  
- Vaccines trigger a primary response to produce memory cells, allowing a **faster and stronger response** upon real infection.  
- Pathogens like HIV and TB have evasion mechanisms such as killing helper T cells, preventing antigen presentation, and antigenic variation.`,
          },
          {
            id: "section-summary-3",
            title: "Antibiotics and HAIs",
            type: "text" as const,
            completed: false,
            content: `- **Antibiotics**: chemicals that damage bacteria but not human cells, e.g., penicillin.  
- Can be **bactericidal** (kill bacteria) or **bacteriostatic** (inhibit growth).  
- Mechanisms include damaging cell walls, membranes, ribosomes, or DNA.  
- **Hospital Acquired Infections (HAIs)** occur due to poor hygiene, contaminated surfaces, and weak patient immunity.  
- Some HAIs are caused by **antibiotic-resistant bacteria** like MRSA.  
- Reducing resistance: avoid unnecessary antibiotics, use narrow-spectrum drugs, rotate antibiotics, and maintain hygiene.`,
          },
          {
            id: "section-summary-4",
            title: "Decomposition",
            type: "text" as const,
            completed: false,
            content: `- Dead organisms are broken down by **decomposers** (bacteria, fungi) which recycle nutrients.  
- Decomposers secrete enzymes to break large molecules into smaller ones, which can be respired for energy.  
- Decomposition releases CO2 and methane; CO2 is then fixed by plants during photosynthesis.`,
          },
          {
            id: "section-summary-5",
            title: "Forensics and PCR",
            type: "text" as const,
            completed: false,
            content: `- Every person has a unique DNA sequence (except identical twins) used for **DNA profiling**.  
- **PCR** allows amplification of small DNA samples in vitro to produce millions of copies.  
- Steps: DNA isolation → PCR → gel electrophoresis → analysis.  
- PCR uses DNA template, primers, nucleotides, Taq polymerase, and buffer.  
- Three stages: Denaturation (95ºC), Annealing (50-60ºC), Elongation (72ºC).  
- DNA is then cut with restriction enzymes and tagged with fluorescent markers for visualization.  
- Applications: forensics, ancestry, evolutionary studies, paternity/maternity testing.`,
          },
          {
            id: "section-summary-6",
            title: "Key Practical Points",
            type: "text" as const,
            completed: false,
            content: `- Always use sterile equipment and aseptic techniques to prevent contamination.  
- Use controls in experiments to ensure validity (e.g., water disc in antibiotic testing).  
- In antibiotic testing, the size of the clear zone around a disc indicates bacterial susceptibility.  
- Safety measures: wear gloves, wash hands, disinfect surfaces, invert plates to avoid condensation.`,
          },
          {
            id: "section-summary-7",
            title: "Revision Tips",
            type: "text" as const,
            completed: false,
            content: `- **Draw diagrams**: immune response, PCR cycles, bacterial growth curves.  
- **Use tables** to compare active vs passive immunity, bactericidal vs bacteriostatic antibiotics, HAI prevention methods.  
- **Mnemonic aids**: e.g., "DAE" for PCR stages (Denaturation, Annealing, Elongation).  
- **Practice calculations**: colony counts, dilutions, haemocytometer cell concentration.  
- **Explain with examples**: link antibiotics to their mechanism, HAIs to MRSA, decomposition to CO2 recycling.  
- **Highlight keywords**: memory cells, plasmid, Taq polymerase, bacteriostatic, lysis.  
- **Test yourself**: what happens on secondary infection? why are HAIs resistant? how does PCR amplify DNA?  
- **Connect topics**: relate immunity to vaccination and pathogen evasion, link antibiotics to resistance and HAIs, connect decomposition to nutrient cycles.`,
          },
        ],
      },
    ],
  },
  {
    id: "1-2",
    title: "Calculus Basics",
    subjectId: "math-101",
    progress: 70,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Important terms",
        chapterId: "1-1",
        completed: false,
        keywords: [
          {
            id: "kw-1",
            word: "Variable",
          },
          {
            id: "kw-2",
            word: "Coefficient",
          },
          {
            id: "kw-3",
            word: "linear equation",
          },
          {
            id: "kw-4",
            word: "algebraic expression",
          },
          {
            id: "kw-5",
            word: "inverse operations",
          },
          {
            id: "kw-6",
            word: "equation",
          },
          {
            id: "kw-7",
            word: "term",
          },
        ],
        kw: [
          {
            id: "kw-1",
            word: "Calculus",
            definition:
              "A symbol (usually a letter) that represents an unknown number or value in mathematical expressions and equations.",
          },
        ],
        learningObjectives: [],
        sections: [
          {
            id: "section-1-1-1",
            title: "Understanding Limits",
            type: "text" as const,
            content: `**Limits** are fundamental to Variable. A limit describes the value that a function approaches as the input approaches some value.

For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.

**Key Properties of Limits:**
- The limit of a sum is the sum of limits
- The limit of a product is the product of limits
- **Important:** These properties only hold when the individual limits exist

[Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
[MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
            completed: false,
            links: [
              {
                title: "Interactive Limit Calculator",
                url: "https://www.desmos.com/calculator",
              },
              {
                title: "Limit Examples",
                url: "https://www.wolfram.com/mathematica/",
              },
            ],
          },
          {
            id: "section-1-1-2",
            title: "Limit Visualization",
            type: "image" as const,
            content:
              "https://images.unsplash.com/photo-1743397015934-3aa9c6199baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            completed: false,
          },
          {
            id: "section-1-1-2-1",
            title: "Understanding Limits",
            type: "text" as const,
            content: `**Limits** are fundamental to calculus. A limit describes the value that a function approaches as the input approaches some value.

For example, consider the function f(x) = x². As x approaches 2, f(x) approaches 4.

**Key Properties of Limits:**
- The limit of a sum is the sum of limits
- The limit of a product is the product of limits
- **Important:** These properties only hold when the individual limits exist

[Khan Academy Limits](https://www.khanacademy.org/math/calculus-1/limits-and-continuity)
[MIT OpenCourseWare](https://ocw.mit.edu/courses/mathematics/)`,
            completed: false,
          },
          {
            id: "section-1-1-3",
            title: "Calculus Video Lecture",
            type: "video" as const,
            content: "/Periodi.mp4",
            poster:
              "https://i.ytimg.com/vi/7cEtOHLZQ2A/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgWShlMA8=&rs=AOn4CLAUp4UdwxwqIdhubFIWmqPMbLT7PQ",
            completed: false,
          },
          {
            id: "section-1-1-4",
            title: "Audio Explanation",
            type: "audio" as const,
            content: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            completed: false,
          },
          {
            id: "section-1-1-5",
            title: "Limit Calculation Code",
            type: "code" as const,
            content: `def calculate_limit(func, x, approach_value, epsilon=0.0001):
    """
    Calculate the limit of a function as x approaches a value
    """
    left_values = []
    right_values = []
    
    for i in range(1, 1000):
        h = epsilon / i
        left_val = func(approach_value - h)
        right_val = func(approach_value + h)
        
        left_values.append(left_val)
        right_values.append(right_val)
    
    return {
        'left_limit': left_values[-1],
        'right_limit': right_values[-1],
        'limit_exists': abs(left_values[-1] - right_values[-1]) < epsilon
    }

# Example usage
def f(x):
    return x**2

result = calculate_limit(f, 0, 2)
print(f"Limit as x approaches 2: {result}")`,
            completed: false,
          },
          {
            id: "section-1-1-6",
            title: "Limits Quiz",
            type: "quiz" as const,
            completed: false,
            quiz: {
              title: "Limits and Continuity Quiz",
              questions: [
                {
                  id: "q1",
                  question: "What is the limit of f(x) = x² as x approaches 3?",
                  options: ["6", "9", "12", "15"],
                  correctAnswer: 1,
                  explanation: "When x approaches 3, x² approaches 3² = 9",
                },
                {
                  id: "q2",
                  question: "A function is continuous at x = a if:",
                  options: [
                    "The function is defined at x = a",
                    "The limit exists at x = a",
                    "The limit equals the function value at x = a",
                    "All of the above",
                  ],
                  correctAnswer: 3,
                  explanation:
                    "Continuity requires the function to be defined, the limit to exist, and both to be equal",
                },
              ],
            },
          },
          {
            id: "section-1-1-7",
            title: "Key Concepts Flashcards",
            type: "flashcard" as const,
            completed: false,
            flashcards: [
              {
                id: "fc1",
                front: "What is a limit?",
                back: "A  describes the value that a function approaches as the input approaches some value",
              },
              {
                id: "fc2",
                front: "What does continuity mean?",
                back: "A function is continuous at a point if the limit exists and equals the function value at that point",
              },
              {
                id: "fc3",
                front: "Limit of a constant",
                back: "The limit of a constant function is the constant itself",
              },
            ],
          },
          {
            id: "section-1-1-8",
            title: "Tips+",
            type: "examiner-tips" as const,
            completed: false,
            tips: [
              {
                id: "tip1",
                type: "tip",
                title: "Common Mistake",
                content:
                  "Remember that a limit can exist even if the function is not defined at that point!",
              },
              {
                id: "tip2",
                type: "warning",
                title: "Division by Zero",
                content:
                  "When you encounter 0/0, don't panic! This is an indeterminate form that requires special techniques.",
              },
              {
                id: "tip3",
                type: "success",
                title: "Quick Check",
                content:
                  "Always verify your limit by approaching from both left and right sides.",
              },
            ],
          },
          {
            id: "section-1-1-9",
            title: "Limit Values Comparison",
            type: "table" as const,
            completed: false,
            tableData: {
              columns: [
                { key: "function", label: "Function", sortable: true },
                { key: "approach", label: "x approaches", sortable: true },
                { key: "limit", label: "Limit Value", sortable: true },
                { key: "method", label: "Method Used", sortable: false },
              ],
              data: [
                {
                  function: "x²",
                  approach: "2",
                  limit: "4",
                  method: "Direct substitution",
                },
                {
                  function: "(x²-1)/(x-1)",
                  approach: "1",
                  limit: "2",
                  method: "Factoring",
                },
                {
                  function: "sin(x)/x",
                  approach: "0",
                  limit: "1",
                  method: "L'Hôpital's rule",
                },
                {
                  function: "1/x",
                  approach: "∞",
                  limit: "0",
                  method: "Infinite limits",
                },
              ],
              searchable: true,
            },
          },
          {
            id: "section-1-1-10",
            title: "Function Behavior Chart",
            type: "chart" as const,
            completed: false,
            chartData: {
              type: "line",
              data: [
                { x: -2, y: 4, function: "x²" },
                { x: -1, y: 1, function: "x²" },
                { x: 0, y: 0, function: "x²" },
                { x: 1, y: 1, function: "x²" },
                { x: 2, y: 4, function: "x²" },
                { x: 3, y: 9, function: "x²" },
              ],
              xKey: "x",
              yKey: "y",
              allowTypeSwitch: true,
              colors: [
                "hsl(var(--primary))",
                "#3b82f6",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
              ],
            },
          },
        ],
      },
    ],
  },
];
