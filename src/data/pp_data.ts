// pp_data.ts
export interface PastPaperData {
  id: string;
  year?: number;
  season?: string;
  question_paper_url?: string;
  mark_scheme_url?: string;
  examiner_report_url?: string;
  title?: string;
  type?: "standard" | "other";
}

export const pp_data: PastPaperData[] = [
  // 2013–2018 (Jan & June only)
  ...[2013, 2014, 2015, 2016, 2017, 2018].flatMap((year) => [
    {
      id: `${year}-jan`,
      year,
      season: "jan",
      question_paper_url: "/no-old-syllabus",
      mark_scheme_url: "/no-old-syllabus",
    },
    {
      id: `${year}-june`,
      year,
      season: "june",
      question_paper_url: "/no-old-syllabus",
      mark_scheme_url: "/no-old-syllabus",
    },
  ]),

  // 2019 (Jan, June, Oct)
  {
    id: "2019-jan",
    year: 2019,
    season: "jan",
    question_paper_url: "/no-old-syllabus",
    mark_scheme_url: "/no-old-syllabus",
  },
  {
    id: "2019-june",
    year: 2019,
    season: "june",
    question_paper_url: "/no-old-syllabus",
    mark_scheme_url: "/no-old-syllabus",
  },
  {
    id: "2019-october",
    year: 2019,
    season: "october",
    question_paper_url: "/no-old-syllabus",
    mark_scheme_url: "/no-old-syllabus",
  },

  // 2020 (Jan & June)
  {
    id: "2020-jan",
    year: 2020,
    season: "jan",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_que_20200305.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_rms_20200305.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_pef_20200305.pdf",
  },
  {
    id: "2020-june",
    year: 2020,
    season: "june",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_que_20201017.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_msc_20210113.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_pef_20210113.pdf",
  },

  // 2021 (Jan, June, Oct)
  {
    id: "2021-jan",
    year: 2021,
    season: "jan",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_que_20210304.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_msc_20210304.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_pef_20210304.pdf",
  },
  {
    id: "2021-june",
    year: 2021,
    season: "june",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_que_20210419.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_rms_20210604.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-pef-20220113.pdf",
  },
  {
    id: "2021-october",
    year: 2021,
    season: "october",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_que_20211016.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_rms_20220113.pdf",
  },

  // 2022 (Jan, June, Oct)
  {
    id: "2022-jan",
    year: 2022,
    season: "jan",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_que_20220112.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_rms_20220303.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/WBI14_01_pef_20220303.pdf",
  },
  {
    id: "2022-june",
    year: 2022,
    season: "june",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-que-20220528.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-rms-20220818.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-pef-20220818.pdf",
  },
  {
    id: "2022-october",
    year: 2022,
    season: "october",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-que-20221021.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-rms-20230112.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-pef-20230112.pdf",
  },

  // 2023 (Jan, June, Oct)
  {
    id: "2023-jan",
    year: 2023,
    season: "jan",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-que-20230315.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-rms-20230302.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Exam-materials/wbi14-01-pef-20230302.pdf",
  },
  {
    id: "2023-june",
    year: 2023,
    season: "june",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-que-20230602.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-rms-20230817.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-pef-20230817.pdf",
  },
  {
    id: "2023-october",
    year: 2023,
    season: "october",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-que-20231020.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-rms-20240118.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-pef-20240118.pdf",
  },

  // 2024 (Jan, June, Oct)
  {
    id: "2024-jan",
    year: 2024,
    season: "jan",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-que-20240112.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-rms-20240307.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-pef-20240307.pdf",
  },
  {
    id: "2024-june",
    year: 2024,
    season: "june",
    question_paper_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-que-20240529.pdf",
    mark_scheme_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-rms-20240815.pdf",
    examiner_report_url:
      "https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi14-01-pef-20240815.pdf",
  },
  {
    id: "2024-october",
    year: 2024,
    season: "october",
    question_paper_url:
      "https://drive.google.com/file/d/1B8SQqT7BZT6kdpbDkzIVkaCvj1BpFpcx/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1zfCXSWf48eodBtqele0jVIYDzJqELBCA/view?usp=sharing",
  },

  // 2025 (Jan & June)
  {
    id: "2025-jan",
    year: 2025,
    season: "jan",
    question_paper_url:
      "https://drive.google.com/file/d/1-scAR882xvzBJ5VY1gg4KJyd08wNyjtD/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1inRovone8frHT3iKCgAoJ3o-kXXAOp7F/view?usp=sharing",
  },
  {
    id: "2025-june",
    year: 2025,
    season: "june",
    question_paper_url:
      "https://drive.google.com/file/d/1CLJNsbq_ae4o9U_lCN11JizCV0JrcsIj/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1kaDso60fXg2eM3WJXF4nvT4GkLBewMvh/view?usp=sharing",
  },

  // Other Papers
  {
    id: "sample-paper",
    type: "other",
    title: "Sample Paper",
    question_paper_url:
      "https://drive.google.com/file/d/1ZT4eyts2qKM09z2eiTYJ3eq4GY5Rp9TX/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1ZT4eyts2qKM09z2eiTYJ3eq4GY5Rp9TX/view?usp=sharing",
  },
  {
    id: "common-questions",
    type: "other",
    title: "Common Questions",
    question_paper_url:
      "https://drive.google.com/file/d/10qG9qXi65-1awwh1MmBIwhHtQD51klX6/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/10qG9qXi65-1awwh1MmBIwhHtQD51klX6/view?usp=sharing",
  },
  {
    id: "test-yourself-quicklu",
    type: "other",
    title: "Quick Test",
    question_paper_url:
      "https://docs.google.com/presentation/d/11NJbyrIofVwttEPs9vQn8-yjw_iEbt8J/edit",
    mark_scheme_url:
      "https://docs.google.com/presentation/d/11NJbyrIofVwttEPs9vQn8-yjw_iEbt8J/edit",
  },
  {
    id: "nutshell",
    type: "other",
    title: "Nutshell",
    question_paper_url:
      "https://drive.google.com/file/d/10rpet1L-_V_JqyAxYPFg9vAylZ0na8a7/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/10rpet1L-_V_JqyAxYPFg9vAylZ0na8a7/view?usp=sharing",
  },
  {
    id: "important-qs",
    type: "other",
    title: "Important Questions",
    question_paper_url:
      "https://drive.google.com/file/d/113rPgBN2Sq7MD7wLXaPekAsEZnULJqyj/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/113rPgBN2Sq7MD7wLXaPekAsEZnULJqyj/view?usp=sharing",
  },
  {
    id: "definitions",
    type: "other",
    title: "Definitions",
    question_paper_url:
      "https://drive.google.com/file/d/10xTa1B5WIVE3iN5W1CKByEmuho6d22e7/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/10xTa1B5WIVE3iN5W1CKByEmuho6d22e7/view?usp=sharing",
  },
  {
    id: "common-challenging",
    type: "other",
    title: "Common & Challenging",
    question_paper_url:
      "https://drive.google.com/file/d/111M2Nd81W6REfDH18G2LfsXdCU1Kxubv/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/111M2Nd81W6REfDH18G2LfsXdCU1Kxubv/view?usp=sharing",
  },
  {
    id: "summary-notes",
    type: "other",
    title: "Summary Notes",
    question_paper_url:
      "https://drive.google.com/file/d/1r7yAsAYdQP8usGl_Z0p-sYaNLyk-Tqxb/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1r7yAsAYdQP8usGl_Z0p-sYaNLyk-Tqxb/view?usp=sharing",
  },
  {
    id: "make-sure",
    type: "other",
    title: "Make Sure yk",
    question_paper_url:
      "https://drive.google.com/file/d/111W1WOEVTNrlwi6JPA-HEuPcC72h8A7A/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/111W1WOEVTNrlwi6JPA-HEuPcC72h8A7A/view?usp=sharing",
  },
  {
    id: "as-topics",
    type: "other",
    title: "AS required info",
    question_paper_url: "/as-topics.pdf",
    mark_scheme_url: "/as-topics.pdf",
  },
  {
    id: "model-qs",
    type: "other",
    title: "Model QA",
    question_paper_url: "/model-qs.pdf",
    mark_scheme_url: "/model-qs.pdf",
  },
  {
    id: "U4-Calculations",
    type: "other",
    title: "U4 Calculations",
    question_paper_url: "/calc.pdf",
    mark_scheme_url: "/calc.pdf",
  },
  {
    id: "more-notes",
    type: "other",
    title: "Great Notes",
    question_paper_url:
      "https://drive.google.com/drive/folders/1GLtIdP3ypdKOd_w9SIcHU0eO45NGhlZp",
    mark_scheme_url:
      "https://drive.google.com/drive/folders/1GLtIdP3ypdKOd_w9SIcHU0eO45NGhlZp",
  },
  {
    id: "spec-notes",
    type: "other",
    title: "Spec Notes",
    question_paper_url: "/specnotes.pdf",
    mark_scheme_url: "/specnotes.pdf",
  },
  {
    id: "MS-notes",
    type: "other",
    title: "MS Notes",
    question_paper_url:
      "https://drive.google.com/drive/folders/10ELOWr-breaYB-1t_R_R_lGlPjvOka2B",
    mark_scheme_url:
      "https://drive.google.com/drive/folders/10ELOWr-breaYB-1t_R_R_lGlPjvOka2B",
  },
  {
    id: "40-imgs",
    type: "other",
    title: "Forty images Summary",
    question_paper_url:
      "https://drive.google.com/drive/folders/1kKnnp2TNVcw3noJqvRSLcm4gfbDfehdd",
    mark_scheme_url:
      "https://drive.google.com/drive/folders/1kKnnp2TNVcw3noJqvRSLcm4gfbDfehdd",
  },
  {
    id: "cps",
    type: "other",
    title: "All Practicals",
    question_paper_url:
      "https://drive.google.com/file/d/1P8Nv-6dprvUIjUsoSOaoLbRgdnItK6oR/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1P8Nv-6dprvUIjUsoSOaoLbRgdnItK6oR/view?usp=sharing",
  },
  {
    id: "t6",
    type: "other",
    title: "All T6",
    question_paper_url:
      "https://drive.google.com/file/d/1s9W-s2iU_urNUjSN7pDEO5rKFzsSdZ2F/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1s9W-s2iU_urNUjSN7pDEO5rKFzsSdZ2F/view?usp=sharing",
  },
  {
    id: "t5",
    type: "other",
    title: "All T5",
    question_paper_url:
      "https://drive.google.com/file/d/1X4yWISqnj_Ki1Hww_5FzjyjLGKPHgLoh/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1X4yWISqnj_Ki1Hww_5FzjyjLGKPHgLoh/view?usp=sharing",
  },
  {
    id: "MS00notes",
    type: "other",
    title: "MS notes 2",
    question_paper_url:
      "https://drive.google.com/file/d/1FmYe-6NKW3aN_xvAkVJdy0mVRSjFPlEV/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1FmYe-6NKW3aN_xvAkVJdy0mVRSjFPlEV/view?usp=sharing",
  },
  {
    id: "Vaccine-cheatsheet",
    type: "other",
    title: "Vaccine Cheatsheet",
    question_paper_url:
      "https://drive.google.com/file/d/1FmYe-6NKW3aN_xvAkVJdy0mVRSjFPlEV/view?usp=sharing",
    mark_scheme_url:
      "https://drive.google.com/file/d/1FmYe-6NKW3aN_xvAkVJdy0mVRSjFPlEV/view?usp=sharing",
  },
];
