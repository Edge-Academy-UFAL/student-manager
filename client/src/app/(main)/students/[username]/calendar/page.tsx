import { CalendarPage } from '@/features/calendar/calendar-page';
import { SimpleBreadcrumbs } from '@/shared/components/custom/simple-breadcrumbs';

export default async function StudentCalendar({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  return (
    <div className="space-y-6">
      <SimpleBreadcrumbs
        items={[
          { label: 'Alunos', href: '/students' },
          { label: username, href: `/students/${username}` },
          { label: 'Calendário' },
        ]}
      />
      <CalendarPage />
    </div>
  );
}
