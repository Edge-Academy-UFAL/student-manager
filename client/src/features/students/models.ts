export interface FilterData {
  csCheckbox: boolean;
  ceCheckbox: boolean;
  admissionSemester?: string;
  admissionSemestreFilterOption?: NumberFilteringOption;
  currentSemester?: number | '';
  currentSemesterFilterOption?: NumberFilteringOption;
  ira?: number | '';
  iraFilterOption?: NumberFilteringOption;
  studentGroups?: Array<{ label: string; value: string; group: string }>;
}

export enum NumberFilteringOption {
  GreaterThan = 'Maior que',
  LessThan = 'Menor que',
  EqualTo = 'Igual a',
  GreaterOrEqualTo = 'Maior ou igual a',
  LessOrEqualTo = 'Menor ou igual a',
}

export type Student = {
  [x: string]: string;
  id: string;
  email: string;
  name: string;
  studentGroup: string;
  foto: string;
  course: string;
  period: string;
  entryPeriod: string;
  ira: string;
};
