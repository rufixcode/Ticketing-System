import { EventCard } from '../components/EventCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { dashboardStats, featuredEvents, reservationSteps } from '../data/mockCatalog';

export function Dashboard() {
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="MallTix navigation">
        <div className="brand-mark">MT</div>
        <nav>
          <a href="#overview">Overview</a>
          <a href="#catalog">Catalog</a>
          <a href="#reservations">Reservations</a>
          <a href="#validation">QR Validation</a>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">MallTix Admin</span>
            <h1>Ticket reservation command center</h1>
          </div>
          <button type="button">New schedule</button>
        </header>

        <section className="stats-grid" id="overview" aria-label="Dashboard stats">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </section>

        <section className="content-band" id="catalog">
          <SectionHeader
            eyebrow="Catalog"
            title="Movies and events"
            description="Starter cards for venue schedules, ticket availability, and reservation entry points."
          />
          <div className="event-grid">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section className="content-band" id="reservations">
          <SectionHeader
            eyebrow="Reservation flow"
            title="From browsing to QR validation"
            description="A shared workflow skeleton for cinema seats and convention tickets."
          />
          <div className="steps-grid">
            {reservationSteps.map((step, index) => (
              <article className="step-item" key={step.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
