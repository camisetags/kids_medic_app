import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './Routes';
import { DemoNotice } from '../ui/DemoNotice';
export function App() {
  return <HashRouter><DemoNotice /><AppRoutes /></HashRouter>;
}
