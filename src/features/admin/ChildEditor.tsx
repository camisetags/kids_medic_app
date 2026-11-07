import type { Child, ChildInput } from '../../demo/types';
import { useDemo } from '../../app/useDemo';
import { useDraft, type DraftModel } from '../../app/useDraft';
import { DraftDialog } from '../../ui/DraftDialog';
import { Field } from '../../ui/Field';
function ChildFields({ model }: { model: DraftModel<ChildInput> }) {
  return <><Field autoFocus id="child-name" label="Nome da criança" maxLength={120} value={model.input.name} aria-invalid={Boolean(model.error && !model.input.name.trim())} aria-describedby="admin-error" onChange={(event) => model.change({ ...model.input, name: event.target.value })} /><Field id="child-age" label="Idade em meses" type="number" min={0} max={216} step={1} value={model.input.ageMonths < 0 ? '' : model.input.ageMonths} aria-invalid={Boolean(model.error && (!Number.isInteger(model.input.ageMonths) || model.input.ageMonths < 0 || model.input.ageMonths > 216))} aria-describedby="admin-error" onChange={(event) => model.change({ ...model.input, ageMonths: event.target.value === '' ? -1 : Number(event.target.value) })} /><Field id="child-guardian" label="Responsável" maxLength={120} value={model.input.guardian} aria-invalid={Boolean(model.error && !model.input.guardian.trim())} aria-describedby="admin-error" onChange={(event) => model.change({ ...model.input, guardian: event.target.value })} /><p className="info-note">Use nomes fictícios nesta demonstração.</p></>;
}
export function ChildEditor({ child, onClose, onSaved }: { child?: Child; onClose: () => void; onSaved: () => void }) {
  const { saveChild } = useDemo();
  const initial = { name: child?.name ?? '', ageMonths: child?.ageMonths ?? -1, guardian: child?.guardian ?? '' };
  const model = useDraft(initial, (input) => { saveChild(input, child?.id); onSaved(); }, onClose);
  return <DraftDialog title={child ? 'Editar criança' : 'Nova criança'} model={model} saveLabel="Salvar criança"><ChildFields model={model} /></DraftDialog>;
}
