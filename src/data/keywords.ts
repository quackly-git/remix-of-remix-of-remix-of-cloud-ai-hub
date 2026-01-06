export interface Keyword {
  term: string;
  definition: string;
}

export const keywordsData: Keyword[] = [
  // HTML
  {
    term: "Chemiosmosis",
    definition:
      "The Diffusion of Hydrogen ions (protons) across a membrane, down electrochemical/concentration gradient to drive synthesis of ATP.",
  },
  {
    term: "Absorption Spectrum",
    definition: "Absorption of light at different wavelengths.",
  },
  {
    term: "Action Spectrum",
    definition: "Rate of Photosynthesis at different wavelengths of light.",
  },
  {
    term: "Gene Pool",
    definition: "All the alleles in a population.",
  },
  {
    term: "Allele Frequency",
    definition:
      "The relative frequency (proportion of occurence) of one allele (variant of a gene) in a gene pool.",
  },

  // CSS
  {
    term: "Biomass",
    definition: "Mass of organic matter in an organism.",
  },
  {
    term: "Biodiversity",
    definition:
      "Combination of Species richness (number of different species) and evenness and genetic diversity within a species.",
  },
  {
    term: "Population",
    definition:
      "Group of organisms of same species in a particular area at the same time.",
  },
  {
    term: "Community",
    definition:
      "Group of organisms/populations of different species interacting with each other in a particular area.",
  },
  {
    term: "Ecosystem",
    definition:
      "Group of organisms interacting with each others, and with abiotic non living env.",
  },
  {
    term: "Abiotic Factor",
    definition:
      "Concerned with/caused by non living forces/factors. eg. Light, Temperature",
  },
  {
    term: "Biotic Factor",
    definition:
      "Concerned with/caused by living forces/factors. eg. Predation, Disease",
  },

  // JavaScript
  {
    term: "Edophic Factor",
    definition:
      "biological, physical, chemical properties of soil that affects plants and other organisms on it.",
  },
  {
    term: "Habitat",
    definition:
      "Place that meets conditions (food, shelter) for an organism, or place where an orgamism lives.",
  },
  {
    term: "Niche",
    definition:
      "The role of an organism in its habitat, and how it interacts with its environment.",
  },
  {
    term: "Abundance",
    definition: "Total number of individuals of a particular species.",
  },
  {
    term: "Distribution",
    definition: "Where organisms are found.",
  },
  {
    term: "Ecological Succession",
    definition:
      "The sequence of changes in type of species in an area over a period of time.",
  },
  {
    term: "Climax Community",
    definition:
      "The final stage of succession, when a stable community is reached.",
  },
  {
    term: "Pioneer Species",
    definition:
      "The first species to colonize an area and are adapted to harsh conditions and lack of soil, nutrients and shade.",
  },
  {
    term: "Trophic Level",
    definition: "Energy level of an organism in a food chain.",
  },
  {
    term: "GPP",
    definition:
      "Total amount of chemical energy converted from light energy by producers in photosynthesis in a given area in a given time.",
  },

  // React
  {
    term: "NPP",
    definition:
      "Total amount of chemical energy or biomass stored in producers / available to the next trophic level (primary consumers) after respiratory losses to the environment in a given area in a given period of time.",
  },
  {
    term: "Global Warming",
    definition:
      "Increase in the average global temperature of the earths surface.",
  },
  {
    term: "Anthropogenic Climate Change",
    definition:
      "Long term changes to weather patterns / changes to average global temperature, caused by effects of humans / by human activities.",
  },
  {
    term: "Climate",
    definition:
      "Long-term average weather pattern over a large area and a long time.",
  },
  {
    term: "Weather",
    definition: "Conditions of the atmosphere at a particular time.",
  },
  {
    term: "Dendrochronology",
    definition:
      "The study of / the dating of tree rings, where size of ring depends on size of xylem vessels depending on env conditions like temperature and rainfall, to understand past env conditions and events.",
  },
  {
    term: "Correlation",
    definition:
      "One variable change reflects another, as one changes the other variable changes, correlation is a statistical measure describing the extent of linear relation between two variables. Quantifying direction and strength of relationship.",
  },

  // Git & GitHub
  {
    term: "Causation",
    definition:
      "Change in one variable directly results in change of another, proven by tests.",
  },
  {
    term: "Temperature Coefficient (Q10)",
    definition: "Measures effect of temperature on rate of reaction.",
  },
  {
    term: "Antibiotic",
    definition:
      "Chemicals/substances that kill or inhibit growth of bacteria (causing no or slight damage to human tissue, and can be produced by other microorganisms).",
  },
  {
    term: "Aseptic Technique",
    definition:
      "Methods used to prevent contamination of culture and infection of person with other micro-organisms.",
  },
  {
    term: "Infection",
    definition: "Presence of a pathogen inside cell/tissue.",
  },
  {
    term: "Bacteriocidial Antibiotic",
    definition: "Chemical substance that destroys bacteria.",
  },
  {
    term: "Bacteriostatic Antibiotic",
    definition:
      "Chemical substance that prevents growth and reproduction of bacteria (by inhibiting processes like protein synthesis).",
  },
  {
    term: "Vaccination",
    definition:
      "The injection of attenuated pathogen or its antigen to stimulate artificial active immunity.",
  },
  {
    term: "PCR",
    definition:
      "Laboratory technique used to make large numbers of copies (millions to billions) of a specific segment of DNA (amplification).",
  },

  // Tools & Misc
  {
    term: "Gel Electrophoresis",
    definition:
      "Laboratory technique used to separate mixtures of DNA, RNA fragments, protein according to size/mass and electric charge.",
  },
  {
    term: "Forensic Succession",
    definition:
      "Use of ecological succession principles to estimate time of death based on sequence of stages of decomposition, and sequence of stages of life cycle of insects present on the body.",
  },
  {
    term: "Forensic Entomology",
    definition:
      "The study of insects and their development stages to estimate time of death in a legal investigation.",
  },
  {
    term: "Equation-1: Q10",
    definition:
      "Q10 = Rt+10 / Rt. Rt = rate of reaction at temperature t. Rt+10 = rate of reaction at temperature t + 10 degrees Celsius.",
  },
  {
    term: "Equation-2: Efficiency",
    definition:
      "Energy available in one trophic level (to next) / Energy available in previous trophic level (to next) × 100. mnemonic: This over previous",
  },
  {
    term: "Equation-3: Expo constant of growth (K)",
    definition:
      "K = (log10Nt - log10N0) / (0.301 × t). Nt = population size at time t. N0 = initial population size. t = time interval, and Nt = N0 × 2^(K×t).",
  },
];
