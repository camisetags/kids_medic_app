import type { Appointment, BookingInput } from '../../demo/types';
import { useDemo } from '../../app/useDemo';
import { useDraft, type DraftModel } from '../../app/useDraft';
import { DraftDialog } from '../../ui/DraftDialog';
import { SelectField } from '../../ui/SelectField';
import { getDemoDays, getAvailableTimes, isWeekday } from '../../demo/dates';
import type { ScheduleModel } from '../booking/useBooking';
import { DayChoice } from '../booking/DayChoice';
import { TimeChoice } from '../booking/TimeChoice';
function ScheduleFields({ model, schedule }: { model: DraftModel<BookingInput>; schedule: ScheduleModel }) {
  const { state } = useDemo();
  const invalidDate = !getDemoDays(new Date()).includes(model.input.date) || !isWeekday(model.input.date);
  const invalidTime = !getAvailableTimes(state, model.input.date, new Date(), schedule.excludeId).includes(model.input.time);
  return <><div role="group" aria-label="Dia" tabIndex={-1} aria-invalid={Boolean(model.error && invalidDate)} aria-describedby="admin-error"><DayChoice model={schedule} /></div><div role="group" aria-label="Horário" tabIndex={-1} aria-invalid={Boolean(model.error && !invalidDate && invalidTime)} aria-describedby="admin-error"><TimeChoice model={schedule} /></div></>;
}
function VisitFields({ model, visit }: { model: DraftModel<BookingInput>; visit?: Appointment }) {
  const { state } = useDemo();
  const schedule = { input: model.input, change: (patch: Partial<BookingInput>) => model.change({ ...model.input, ...patch }), excludeId: visit?.id };
  return <><div className="admin-form-row"><SelectField autoFocus label="Criança" disabled={Boolean(visit)} value={model.input.childId} aria-invalid={Boolean(model.error && !model.input.childId)} aria-describedby="admin-error" onChange={(event) => schedule.change({ childId: event.target.value })}><option value="">Selecione uma criança</option>{state.children.map((child) => <option key={child.id} value={child.id}>{child.name}</option>)}</SelectField><SelectField label="Atendimento" disabled={Boolean(visit)} value={model.input.kind} onChange={(event) => schedule.change({ kind: event.target.value as BookingInput['kind'] })}><option value="first">Primeira consulta</option><option value="follow-up">Acompanhamento</option></SelectField></div><ScheduleFields model={model} schedule={schedule} /><p className="info-note admin-form-help">Simulação · nenhum horário real será reservado.</p></>;
}
export function VisitEditor({ visit, onClose, onSaved }: { visit?: Appointment; onClose: () => void; onSaved: () => void }) {
  const { book, reschedule } = useDemo();
  const initial: BookingInput = { childId: visit?.childId ?? '', kind: visit?.kind ?? 'first', date: visit?.date ?? '', time: visit?.time ?? '' };
  const model = useDraft(initial, (input) => { if (visit) reschedule(visit.id, input); else book(input); onSaved(); }, onClose);
  return <DraftDialog title={visit ? 'Remarcar consulta' : 'Nova consulta'} model={model} saveLabel={visit ? 'Salvar alteração' : 'Salvar consulta'}><VisitFields model={model} visit={visit} /></DraftDialog>;
}
