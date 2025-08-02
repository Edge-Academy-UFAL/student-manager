export interface Activity {
  name: string;
  activityType: 'RESEARCH' | 'OTHERS' | 'TUTORING' | 'INTERNSHIP';
  description: string;
  startDate: string;
  conclusionDate: string | null;
  workShift: string;
  paid: boolean;
  onGoing: boolean;
  activityId: string;
}

export const ACTIVITY_TYPES = [
  { code: 'RESEARCH', name: 'Pesquisa' },
  { code: 'TUTORING', name: 'Monitoria' },
  { code: 'INTERNSHIP', name: 'Estágio' },
  { code: 'OTHERS', name: 'Outro' },
];
