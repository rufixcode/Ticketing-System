import type { MallTixEvent, ReservationStep } from '@/types/ticketing';

export const featuredEvents: MallTixEvent[] = [
  {
    id: 'cinema-01',
    title: 'Midnight Skyline',
    type: 'cinema',
    venue: 'Cinema 1',
    schedule: 'Today, 7:30 PM',
    price: 'PHP 320',
    availableSlots: 42,
    status: 'Now Showing',
  },
  {
    id: 'event-01',
    title: 'Mall Tech Expo',
    type: 'event',
    venue: 'Convention Hall A',
    schedule: 'Aug 28, 10:00 AM',
    price: 'PHP 499',
    availableSlots: 120,
    status: 'Upcoming',
  },
  {
    id: 'cinema-02',
    title: 'The Last Orbit',
    type: 'cinema',
    venue: 'Cinema 3',
    schedule: 'Tonight, 9:15 PM',
    price: 'PHP 350',
    availableSlots: 11,
    status: 'Few Seats Left',
  },
];

export const reservationSteps: ReservationStep[] = [
  { id: 'browse', title: 'Browse', description: 'Choose a movie screening or venue event.' },
  { id: 'reserve', title: 'Reserve', description: 'Pick seats or ticket quantity.' },
  { id: 'ticket', title: 'Ticket', description: 'Use the generated QR ticket on entry.' },
];
