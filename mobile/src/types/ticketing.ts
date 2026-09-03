export type VenueType = 'cinema' | 'event';

export type MallTixEvent = {
  id: string;
  title: string;
  type: VenueType;
  venue: string;
  schedule: string;
  price: string;
  availableSlots: number;
  status: 'Now Showing' | 'Upcoming' | 'Few Seats Left';
};

export type ReservationStep = {
  id: string;
  title: string;
  description: string;
};
