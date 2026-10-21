import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LandingPage } from '../features/landing/LandingPage';
import { BookingPage } from '../features/booking/BookingPage';
import { FamilyLayout } from '../features/family/FamilyLayout';
import { OverviewPage } from '../features/family/OverviewPage';
import { AppointmentsPage } from '../features/family/AppointmentsPage';
const titles: Record<string, string> = { '/': 'Pediatria', '/agendar': 'Agendar consulta', '/familia': 'Área da família', '/familia/consultas': 'Consultas', '/familia/fases': 'Fases da criança', '/familia/anotacoes': 'Anotações' };
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => { document.title = `${titles[pathname] ?? 'Página não encontrada'} · Dra. Dayse Mary`; window.scrollTo(0, 0); document.querySelector<HTMLElement>('main')?.focus(); }, [pathname]);
  return null;
}
export function AppRoutes() {
  return <><RouteEffects /><Routes><Route path="/" element={<LandingPage />} /><Route path="/agendar" element={<BookingPage />} /><Route path="/familia" element={<FamilyLayout />}><Route index element={<OverviewPage />} /><Route path="consultas" element={<AppointmentsPage />} /></Route><Route path="*" element={<LandingPage />} /></Routes></>;
}
