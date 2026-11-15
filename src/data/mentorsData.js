/**
 * SAMPLE - replace before launch
 * 
 * Mentors & Faculty Data for Ninamore Knowledge Academy.
 * NOTE: Replace these sample role profiles with authentic mentor profiles before launch.
 * Uses generic role titles only — no invented personal names, no invented degrees or years of experience.
 */

export const MENTORS_DATA = [
  {
    id: 'school-foundation-mentor',
    role: 'School Foundation Mentor',
    badge: 'Classes 5–8',
    avatarInitials: 'SF',
    gradient: 'from-[#F28C28] to-[#F6B93B]',
    teachingStyle: 'Textbook concept clarity with interactive blackboard exercises.',
    subjects: ['Arithmetic', 'General Science', 'Social Studies'],
    bio: 'Focuses on early concept clarity, eliminating math anxiety, and building strong textbook foundations through daily practice and encouraging classroom discussions.',
    focusBullets: [
      'Mathematics & Arithmetic Fundamentals',
      'Science Concept Clarity & Experiments',
      'Social Sciences Answer Structuring',
    ],
  },
  {
    id: 'secondary-math-science-mentor',
    role: 'Mathematics & Science Mentor',
    badge: 'Classes 9–10',
    avatarInitials: 'MS',
    gradient: 'from-[#6B3FA0] to-[#9B51E0]',
    teachingStyle: 'Step-by-step problem breakdown with daily formula drills.',
    subjects: ['Algebra & Geometry', 'Physics & Chemistry', 'Board Preparation'],
    bio: 'Specializes in board exam problem-solving techniques, scientific derivations, and structured answer-writing drills tailored to CBSE and Maharashtra State Board patterns.',
    focusBullets: [
      'Step-by-Step Problem Solving Drills',
      'Formula Mapping & Numerical Practice',
      'Targeted Remedial Support & Doubts',
    ],
  },
  {
    id: 'class-12-english-faculty',
    role: 'Higher Secondary English Faculty',
    badge: 'Class 12',
    avatarInitials: 'EF',
    gradient: 'from-[#3F1F6B] to-[#6B3FA0]',
    teachingStyle: 'Answer presentation and scoring strategies for board excellence.',
    subjects: ['Prose & Poetry', 'Advanced Grammar', 'Writing Skills'],
    bio: 'Guides junior college learners through critical appreciation formats, novel analysis, and advanced writing formats required for high scores in Class 12 board examinations.',
    focusBullets: [
      'Prose & Poetry Critical Appreciations',
      'Advanced Writing Skills & Formats',
      'Previous Years Board Paper Solving',
    ],
  },
  {
    id: 'academic-guidance-lead',
    role: 'Academic Guidance & Remedial Lead',
    badge: 'All Batches',
    avatarInitials: 'AG',
    gradient: 'from-[#059669] to-[#10B981]',
    teachingStyle: 'Personalized pace mapping and patient one-on-one doubt clearing.',
    subjects: ['Doubt Resolution', 'Study Roadmaps', 'Parent Counseling'],
    bio: 'Coordinates individual student learning pace, identifies specific topic gaps through diagnostic reviews, and maintains regular progress updates with parents.',
    focusBullets: [
      'Individualized Revision Schedules',
      'Chapter-Wise Diagnostic Reviews',
      'Transparent Parent Progress Updates',
    ],
  },
];
