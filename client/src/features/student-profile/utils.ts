import { Activity } from '@/features/student-profile/models';

export function getNameInitials(name: string) {
  const names = name.split(' ');
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
}

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
