/**
 * SAMPLE - replace before launch
 * 
 * Batch Timings and Capacity Data for Ninamore Knowledge Academy.
 * Sourced from official operational hours (11:00 AM to 8:00 PM, Monday - Sunday).
 * NOTE: Seat availability statuses are sample indicators; verify with academy administration before launch.
 * DO NOT invent fee amounts. Official policy: transparent fee quotes provided directly upon inquiry.
 */

export const BATCH_TIMINGS_DATA = [
  {
    id: 'midday-batch',
    name: 'Midday School Batch',
    slot: 'Midday',
    time: '11:30 AM – 02:00 PM',
    targetAudience: 'Classes 5 to 8 (CBSE & State Board)',
    status: 'Seats open',
    statusType: 'open', // open | limited
    days: 'Monday to Saturday',
    highlight: 'Textbook concept foundations & homework review',
  },
  {
    id: 'afternoon-batch',
    name: 'Afternoon Secondary Batch',
    slot: 'Afternoon',
    time: '02:30 PM – 05:00 PM',
    targetAudience: 'Classes 9 & 10 (Board Exam Focus)',
    status: 'Few seats left',
    statusType: 'limited',
    days: 'Monday to Saturday',
    highlight: 'Formula drills, numericals & weekly chapter tests',
  },
  {
    id: 'evening-batch',
    name: 'Evening Jr. College Batch',
    slot: 'Evening',
    time: '05:30 PM – 08:00 PM',
    targetAudience: 'Class 12th English & Board Scoring',
    status: 'Seats open',
    statusType: 'open',
    days: 'Monday to Saturday',
    highlight: 'Answer presentation, grammar & board paper solving',
  },
  {
    id: 'weekend-batch',
    name: 'Weekend Doubt & Remedial Track',
    slot: 'Weekend',
    time: 'Flexible (11:00 AM – 06:00 PM)',
    targetAudience: 'All Batches (Custom Pace Mapping)',
    status: 'Few seats left',
    statusType: 'limited',
    days: 'Saturday & Sunday',
    highlight: '1-on-1 pace mapping & parent review desk',
  },
];
