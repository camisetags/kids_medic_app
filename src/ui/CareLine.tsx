import { CalendarDays, NotebookPen, Sprout } from 'lucide-react';
const milestones = [{ icon: Sprout, name: 'Cada fase', description: 'Um olhar para o agora' }, { icon: CalendarDays, name: 'Cada encontro', description: 'Tempo para conversar' }, { icon: NotebookPen, name: 'Cada descoberta', description: 'O que vale guardar' }];
function Milestone({ item }: { item: typeof milestones[number] }) {
  return <div className="milestone"><span className="milestone-icon"><item.icon size={21} strokeWidth={1.5} /></span><div><strong>{item.name}</strong><small>{item.description}</small></div></div>;
}
export function CareLine({ compact = false }: { compact?: boolean }) {
  return <div className={`care-line ${compact ? 'compact' : ''}`}>{milestones.map((item) => <Milestone key={item.name} item={item} />)}</div>;
}
