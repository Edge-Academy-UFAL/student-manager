'use client';

import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import defaultEvents, { CalendarEvent } from '../data/default-events';

moment.locale('pt-br');
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const messages = {
  allDay: 'Dia inteiro',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  showMore: (total: number) => `+ (${total}) eventos`,
};

export function CalendarView() {
  const [eventos, setEventos] = useState<CalendarEvent[]>(defaultEvents);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="h-[75vh]">
        <DragAndDropCalendar
          culture="pt-BR"
          defaultDate={moment().toDate()}
          defaultView="week"
          events={eventos}
          localizer={localizer}
          messages={messages}
          views={['month', 'week', 'day', 'agenda']}
          resizable
          min={new Date(2025, 10, 21, 7, 30)}
          max={new Date(2025, 10, 21, 19, 0)}
        />
      </div>
    </div>
  );
}
