import type { DashboardStat, MallTixEvent, ReservationStep } from '../types/ticketing';

export const dashboardStats: DashboardStat[] = [
  { label: 'Active venues', value: '5', helper: '3 cinemas, 2 event halls' },
  { label: 'Today reservations', value: '128', helper: 'Cinema and event tickets' },
  { label: 'Pending scans', value: '34', helper: 'For entrance validation' },
];

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
  { id: 'browse', title: 'Browse', description: 'Find movies, events, schedules, and venue details.' },
  { id: 'reserve', title: 'Reserve', description: 'Select seats or ticket quantity and confirm the booking.' },
  { id: 'validate', title: 'Validate', description: 'Generate a QR ticket for gate or cinema entrance scanning.' },
];
