import { CalendarDays, Clock3, Heart, Info } from 'lucide-react';
import { visitLabels } from '../../demo/appointments';
import { formatDate } from '../../demo/dates';
import { exampleChild } from '../../demo/seed';
import type { BookingInput } from '../../demo/types';
export function BookingSummary({ input }: { input: BookingInput }) {
  return <aside className="booking-summary"><span className="eyebrow">Seu encontro, com calma</span><h3>Dra. Dayse Mary</h3><span className="summary-specialty">Pediatria · demonstração</span><div className="summary-items"><p><Heart size={17} />{visitLabels[input.kind]}</p><p><CalendarDays size={17} />{input.date ? formatDate(input.date) : 'Escolha uma data'}</p><p><Clock3 size={17} />{input.time || 'Escolha um horário'}</p></div><div className="summary-child"><span className="avatar small">{exampleChild.initials}</span><span>{exampleChild.name}<small>{exampleChild.age} · perfil de exemplo</small></span></div><p className="info-note"><Info size={15} />Você está explorando uma demonstração. Nenhum horário real será reservado.</p></aside>;
}
