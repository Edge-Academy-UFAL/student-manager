import { CalendarPage } from '@/features/calendar/calendar-page';
import { SimpleBreadcrumbs } from '@/shared/components/custom/simple-breadcrumbs';

export default function StudentCalendar({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div className="space-y-6">
      <SimpleBreadcrumbs
        items={[
          { label: 'Alunos', href: '/students' },
          { label: params.username, href: `/students/${params.username}` },
          { label: 'Calendário' },
        ]}
      />
      <CalendarPage />
    </div>
  );
}
