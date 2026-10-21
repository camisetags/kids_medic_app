import { useDemo } from '../../app/useDemo';
import { getAvailableTimes } from '../../demo/dates';
import type { BookingModel } from './useBooking';
export function TimeChoice({ model }: { model: BookingModel }) {
  const { state } = useDemo();
  const options = getAvailableTimes(state, model.input.date, new Date());
  return <div className="time-choice"><h3>Selecione o horário</h3>{!model.input.date ? <p>Escolha um dia para ver os horários.</p> : <div className="time-grid">{options.map((time) => <button className={`time-button ${model.input.time === time ? 'selected' : ''}`} key={time} aria-pressed={model.input.time === time} onClick={() => model.change({ time })}>{time}</button>)}</div>}</div>;
}
