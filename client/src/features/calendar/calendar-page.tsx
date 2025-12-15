import { CalendarView } from './components/calendar-view';

export function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-action-950 text-heading-md leading-tight font-semibold">
            Calendário de Horários
          </span>
          <span className="text-body-md leading-tight text-neutral-950">
            Visualize e gerencie seus horários semanais
          </span>
        </div>
      </div>
      <CalendarView />
    </div>
  );
}
