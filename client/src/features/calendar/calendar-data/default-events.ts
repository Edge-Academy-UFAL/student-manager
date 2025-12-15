export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  tipo: string;
}

// Interface para definir o template de horário semanal
interface WeeklyScheduleTemplate {
  id: number;
  title: string;
  dayOfWeek: number; // 0 = domingo, 1 = segunda, 2 = terça, etc.
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  tipo: string;
}

// Template dos horários semanais (será repetido para todas as semanas)
const weeklyScheduleTemplate: WeeklyScheduleTemplate[] = [
  // Segunda-feira (1)
  { id: 1, title: 'COMP015', dayOfWeek: 1, startHour: 9, startMinute: 20, endHour: 10, endMinute: 10, tipo: 'aula' },
  { id: 2, title: 'COMP015', dayOfWeek: 1, startHour: 10, startMinute: 10, endHour: 11, endMinute: 0, tipo: 'aula' },
  { id: 3, title: 'COMP379', dayOfWeek: 1, startHour: 13, startMinute: 30, endHour: 14, endMinute: 20, tipo: 'aula' },
  { id: 4, title: 'COMP379', dayOfWeek: 1, startHour: 14, startMinute: 20, endHour: 15, endMinute: 10, tipo: 'aula' },
  
  // Terça-feira (2)
  { id: 5, title: 'ECOM017', dayOfWeek: 2, startHour: 7, startMinute: 30, endHour: 8, endMinute: 20, tipo: 'aula' },
  { id: 6, title: 'ECOM017', dayOfWeek: 2, startHour: 8, startMinute: 20, endHour: 9, endMinute: 10, tipo: 'aula' },
  { id: 7, title: 'COMP014', dayOfWeek: 2, startHour: 15, startMinute: 20, endHour: 16, endMinute: 10, tipo: 'aula' },
  { id: 8, title: 'COMP014', dayOfWeek: 2, startHour: 16, startMinute: 10, endHour: 17, endMinute: 0, tipo: 'aula' },
  { id: 9, title: 'COMP014', dayOfWeek: 2, startHour: 17, startMinute: 10, endHour: 18, endMinute: 0, tipo: 'aula' },
  { id: 10, title: 'COMP014', dayOfWeek: 2, startHour: 18, startMinute: 0, endHour: 18, endMinute: 50, tipo: 'aula' },
  
  // Quarta-feira (3)
  { id: 11, title: 'COMP390', dayOfWeek: 3, startHour: 11, startMinute: 10, endHour: 12, endMinute: 0, tipo: 'aula' },
  { id: 12, title: 'COMP390', dayOfWeek: 3, startHour: 12, startMinute: 0, endHour: 12, endMinute: 50, tipo: 'aula' },
  
  // Quinta-feira (4)
  { id: 13, title: 'COMP015', dayOfWeek: 4, startHour: 9, startMinute: 20, endHour: 10, endMinute: 10, tipo: 'aula' },
  { id: 14, title: 'COMP015', dayOfWeek: 4, startHour: 10, startMinute: 10, endHour: 11, endMinute: 0, tipo: 'aula' },
  { id: 15, title: 'COMP390', dayOfWeek: 4, startHour: 11, startMinute: 10, endHour: 12, endMinute: 0, tipo: 'aula' },
  { id: 16, title: 'COMP390', dayOfWeek: 4, startHour: 12, startMinute: 0, endHour: 12, endMinute: 50, tipo: 'aula' },
  { id: 17, title: 'COMP379', dayOfWeek: 4, startHour: 13, startMinute: 30, endHour: 14, endMinute: 20, tipo: 'aula' },
  { id: 18, title: 'COMP379', dayOfWeek: 4, startHour: 14, startMinute: 20, endHour: 15, endMinute: 10, tipo: 'aula' },
  
  // Sexta-feira (5)
  { id: 19, title: 'ECOM017', dayOfWeek: 5, startHour: 7, startMinute: 30, endHour: 8, endMinute: 20, tipo: 'aula' },
  { id: 20, title: 'ECOM017', dayOfWeek: 5, startHour: 8, startMinute: 20, endHour: 9, endMinute: 10, tipo: 'aula' },
  { id: 21, title: 'COMP014', dayOfWeek: 5, startHour: 15, startMinute: 20, endHour: 16, endMinute: 10, tipo: 'aula' },
  { id: 22, title: 'COMP014', dayOfWeek: 5, startHour: 16, startMinute: 10, endHour: 17, endMinute: 0, tipo: 'aula' },
  { id: 23, title: 'COMP014', dayOfWeek: 5, startHour: 17, startMinute: 10, endHour: 18, endMinute: 0, tipo: 'aula' },
  { id: 24, title: 'COMP014', dayOfWeek: 5, startHour: 18, startMinute: 0, endHour: 18, endMinute: 50, tipo: 'aula' },
];

// Função para gerar eventos recorrentes baseados no template
function generateRecurringEvents(weeksToGenerate: number = 52): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const today = new Date();
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay()); // Começo da semana atual (domingo)
  
  // Gerar eventos para as próximas semanas
  for (let week = -4; week < weeksToGenerate; week++) {
    weeklyScheduleTemplate.forEach((template, index) => {
      const eventDate = new Date(currentWeekStart);
      eventDate.setDate(currentWeekStart.getDate() + (week * 7) + template.dayOfWeek);
      
      const startDate = new Date(eventDate);
      startDate.setHours(template.startHour, template.startMinute, 0, 0);
      
      const endDate = new Date(eventDate);
      endDate.setHours(template.endHour, template.endMinute, 0, 0);
      
      events.push({
        id: week * 1000 + template.id, // ID único para cada ocorrência
        title: template.title,
        start: startDate,
        end: endDate,
        tipo: template.tipo,
      });
    });
  }
  
  return events;
}

// Gerar eventos para 1 ano (52 semanas)
const defaultEvents = generateRecurringEvents(52);

export default defaultEvents;
