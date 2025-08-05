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

export interface StudentInfo {
  name: string;
  photoUrl: string;
  birthDate: string;
  course: string;
  registration: string;
  phone: string;
  secondaryPhone: string | null; // Pode ser null caso não tenha sido fornecido
  period: number;
  entryPeriod: string;
  dtype: string;
  email: string;
  entryDate: string;
  studentGroup: number;
  about: string;
}

export const ACTIVITY_TYPES = [
  { code: 'RESEARCH', name: 'Pesquisa' },
  { code: 'TUTORING', name: 'Monitoria' },
  { code: 'INTERNSHIP', name: 'Estágio' },
  { code: 'OTHERS', name: 'Outro' },
];
