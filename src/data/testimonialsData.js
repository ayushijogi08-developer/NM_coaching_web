/**
 * ==============================================================================
 * SAMPLE - replace before launch
 * ==============================================================================
 * 
 * Student & Parent Testimonials Data.
 * 
 * CRITICAL PRE-LAUNCH CHECKLIST TO ENABLE THIS SECTION:
 * 1. Written Consent: Secure written authorization from the student and/or parent
 *    before publishing their feedback on the public web.
 * 2. Authenticity: Use genuine quotes directly transcribed from feedback forms or WhatsApp.
 *    NEVER invent fictional testimonials, inflated percentile numbers, or fake star ratings.
 * 3. Identity & Verification: Include real student initials or first name, verified class
 *    (e.g., Class 10 CBSE / Class 12 State), and academic year.
 * 4. Toggle: Once at least 2-3 genuine, verified reviews are populated below, change
 *    `SHOW_TESTIMONIALS = true`.
 * ==============================================================================
 */

export const SHOW_TESTIMONIALS = false; // Must remain false until genuine feedback with written consent is added

export const TESTIMONIALS_DATA = [
  {
    id: 'sample-review-1',
    isSample: true,
    quote: 'The small batch size and daily doubt clearing made a noticeable difference in my understanding of Mathematics and Science. Mentors take time to explain each formula from the fundamentals.',
    author: 'Class 10 CBSE Student',
    detail: 'Mathematics & Science Foundation Batch',
    location: 'Alsi Plot, Akola',
    initials: 'AS',
  },
  {
    id: 'sample-review-2',
    isSample: true,
    quote: 'Clear board exam answer-sheet formatting guidance and weekly paper evaluations helped me understand exactly how to approach critical appreciation and writing questions.',
    author: 'Class 12 State Board Student',
    detail: 'Higher Secondary English Batch',
    location: 'Akola Centre',
    initials: 'RS',
  },
  {
    id: 'sample-review-3',
    isSample: true,
    quote: 'The study atmosphere is quiet and disciplined. The flexible batch timings made it convenient to balance regular school hours with dedicated revision drills.',
    author: 'Parent of Class 8 Student',
    detail: 'School Foundation Batch',
    location: 'Akola',
    initials: 'PK',
  },
];
