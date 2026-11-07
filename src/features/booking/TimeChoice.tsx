import { useDemo } from '../../app/useDemo';
import { getAvailableTimes } from '../../demo/dates';
import type { ScheduleModel } from './useBooking';
export function TimeChoice({ model }: { model: ScheduleModel }) {
  const { state } = useDemo();
  const options = getAvailableTimes(state, model.input.date, new Date(), model.excludeId);
  return <div className="time-choice"><h3>Selecione o horário</h3>{!model.input.date ? <p>Escolha um dia para ver os horários.</p> : <div className="time-grid">{options.map((time) => <button type="button" className={`time-button ${model.input.time === time ? 'selected' : ''}`} key={time} aria-pressed={model.input.time === time} onClick={() => model.change({ time })}>{time}</button>)}</div>}</div>;
}
