import { Outlet } from 'react-router-dom';
import { AppLayout } from '../../app/AppLayout';
import { ResetDemo } from './ResetDemo';
export function FamilyLayout() {
  return <AppLayout><Outlet /><ResetDemo /></AppLayout>;
}
