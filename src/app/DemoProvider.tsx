import { useState, type ReactNode } from 'react';
import { DemoContext } from './demoContext';
import { demoActions } from './demoActions';
import { browserStorage, loadDemo, persistDemo } from '../demo/storage';
import type { DemoState } from '../demo/types';
function useDemoModel() {
  const [snapshot, setSnapshot] = useState(() => loadDemo(browserStorage(), new Date()));
  const commit = (state: DemoState) => setSnapshot({ state, notice: persistDemo(browserStorage(), state) ? null : 'As mudanças estão nesta sessão. Seu navegador não permitiu salvá-las para a próxima visita.' });
  return { ...snapshot, ...demoActions(snapshot.state, commit) };
}
export function DemoProvider({ children }: { children: ReactNode }) {
  const value = useDemoModel();
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
