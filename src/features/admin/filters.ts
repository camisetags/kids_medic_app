import { useSearchParams } from 'react-router-dom';
export function useAdminFilters() {
  const [params, setParams] = useSearchParams();
  const set = (name: string, value: string) => { const next = new URLSearchParams(params); if (value) next.set(name, value); else next.delete(name); setParams(next, { replace: true }); };
  return { q: params.get('q') ?? '', date: params.get('date') ?? '', status: params.get('status') ?? '', set };
}
export function matchesSearch(name: string, guardian: string, query: string): boolean {
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  return normalize(`${name} ${guardian}`).includes(normalize(query.trim()));
}
