import { Search, X } from 'lucide-react';
export function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="search-field"><Search size={18} aria-hidden="true" /><label className="sr-only" htmlFor="admin-search">Buscar criança ou responsável</label><input id="admin-search" type="text" value={value} placeholder="Buscar criança ou responsável" onChange={(event) => onChange(event.target.value)} />{value && <button className="icon-button" aria-label="Limpar busca" onClick={() => { onChange(''); document.getElementById('admin-search')?.focus(); }}><X size={16} /></button>}</div>;
}
