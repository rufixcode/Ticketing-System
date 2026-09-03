import type { MallTixEvent } from '../types/ticketing';

type EventCardProps = {
  event: MallTixEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card">
      <div>
        <span className={`pill ${event.type}`}>{event.type}</span>
        <h3>{event.title}</h3>
        <p>{event.venue}</p>
      </div>
      <dl>
        <div>
          <dt>Schedule</dt>
          <dd>{event.schedule}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{event.price}</dd>
        </div>
        <div>
          <dt>Slots</dt>
          <dd>{event.availableSlots}</dd>
        </div>
      </dl>
      <footer>
        <span>{event.status}</span>
        <button type="button">Manage</button>
      </footer>
    </article>
  );
}
