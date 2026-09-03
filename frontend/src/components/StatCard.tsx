import type { DashboardStat } from '../types/ticketing';

type StatCardProps = {
  stat: DashboardStat;
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="stat-card">
      <span>{stat.label}</span>
      <strong>{stat.value}</strong>
      <small>{stat.helper}</small>
    </article>
  );
}
