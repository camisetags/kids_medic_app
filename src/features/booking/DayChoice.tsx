import { useDemo } from '../../app/useDemo';
import { formatDate, getDemoDays, getAvailableTimes } from '../../demo/dates';
import type { BookingModel } from './useBooking';
function DayButton({ date, model }: { date: string; model: BookingModel }) {
  const { state } = useDemo();
  const available = getAvailableTimes(state, date, new Date()).length > 0;
  const label = formatDate(date);
  return <button disabled={!available} data-testid={available ? 'available-day' : undefined} data-label={label} aria-label={formatDate(date, { weekday: 'long', day: 'numeric', month: 'long' })} aria-pressed={model.input.date === date} className={`day-button ${model.input.date === date ? 'selected' : ''}`} onClick={() => model.change({ date, time: '' })}><small>{formatDate(date, { weekday: 'short' }).replace('.', '')}</small><strong>{formatDate(date, { day: '2-digit' })}</strong><span>{formatDate(date, { month: 'short' }).replace('.', '')}</span></button>;
}
export function DayChoice({ model }: { model: BookingModel }) {
  return <div className="day-choice"><h3>Qual dia fica melhor?</h3><p>Próximos 14 dias · disponibilidade de exemplo</p><div className="day-grid">{getDemoDays(new Date()).map((date) => <DayButton key={date} date={date} model={model} />)}</div><small className="field-help">Dias sem disponibilidade ficam desabilitados.</small></div>;
}
