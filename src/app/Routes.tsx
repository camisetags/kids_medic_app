import { Route, Outlet, createHashRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DemoProvider } from './DemoProvider';
import { DemoNotice } from '../ui/DemoNotice';
import { LandingPage } from '../features/landing/LandingPage';
import { BookingPage } from '../features/booking/BookingPage';
import { FamilyLayout } from '../features/family/FamilyLayout';
import { OverviewPage } from '../features/family/OverviewPage';
import { AppointmentsPage } from '../features/family/AppointmentsPage';
import { StagesPage } from '../features/family/StagesPage';
import { NotesPage } from '../features/family/NotesPage';
import { NotFoundPage } from '../ui/NotFoundPage';
const titles: Record<string, string> = { '/': 'Pediatria', '/agendar': 'Agendar consulta', '/familia': 'Área da família', '/familia/consultas': 'Consultas', '/familia/fases': 'Fases da criança', '/familia/anotacoes': 'Anotações' };
function updatePage(pathname: string) {
  document.title = `${titles[pathname] ?? 'Página não encontrada'} · Dra. Dayse Mary`;
  window.scrollTo(0, 0);
  document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
}
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => updatePage(pathname), [pathname]);
  return null;
}
function RootLayout() {
  return <DemoProvider><DemoNotice /><RouteEffects /><Outlet /></DemoProvider>;
}
export const appRouter = createHashRouter(createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/agendar" element={<BookingPage />} />
    <Route path="/familia" element={<FamilyLayout />}>
      <Route index element={<OverviewPage />} />
      <Route path="consultas" element={<AppointmentsPage />} />
      <Route path="fases" element={<StagesPage />} />
      <Route path="anotacoes" element={<NotesPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>,
));
