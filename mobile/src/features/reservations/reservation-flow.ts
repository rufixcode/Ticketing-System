import type { ReservationStep } from '@/types/ticketing';

export function getNextReservationStep(steps: ReservationStep[], completedStepId?: string) {
  if (!completedStepId) {
    return steps[0];
  }

  const completedIndex = steps.findIndex((step) => step.id === completedStepId);
  return steps[completedIndex + 1] ?? steps[steps.length - 1];
}
