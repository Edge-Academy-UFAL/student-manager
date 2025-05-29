import { Activity } from '@/features/student-profile/models';

function orderActitivtiesByDateDesc(activities: Activity[]): Activity[] {
  return activities.sort((a: Activity, b: Activity) => {
    return Number(new Date(b.startDate)) - Number(new Date(a.startDate));
  });
}

export function orderActivities(activities: Activity[]): Activity[] {
  const done = orderActitivtiesByDateDesc(
    activities.filter((act) => !act.onGoing),
  );
  const onGoing = orderActitivtiesByDateDesc(
    activities.filter((act) => act.onGoing),
  );
  return [...onGoing, ...done];
}
