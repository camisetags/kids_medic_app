import { Outlet } from 'react-router-dom';
import { AppLayout } from '../../app/AppLayout';
import { ResetDemo } from '../family/ResetDemo';
export function AdminLayout() {
  return <AppLayout admin><Outlet /><ResetDemo /></AppLayout>;
}
