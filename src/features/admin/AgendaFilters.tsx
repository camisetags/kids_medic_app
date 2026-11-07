import { SearchField } from '../../ui/SearchField';
import { SelectField } from '../../ui/SelectField';
import { formatDate } from '../../demo/dates';
import type { useAdminFilters } from './filters';
type Filters = ReturnType<typeof useAdminFilters>;
export function AgendaFilters({ model, dates }: { model: Filters; dates: string[] }) {
  return <div className="admin-filters"><SearchField value={model.q} onChange={(value) => model.set('q', value)} /><SelectField label="Data" value={model.date} onChange={(event) => model.set('date', event.target.value)}><option value="">Todas as datas</option>{dates.map((date) => <option key={date} value={date}>{formatDate(date)}</option>)}</SelectField><SelectField label="Situação" value={model.status} onChange={(event) => model.set('status', event.target.value)}><option value="">Todas</option><option value="scheduled">Agendadas</option><option value="cancelled">Canceladas</option></SelectField></div>;
}
