import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './Routes';
import { DemoProvider } from './DemoProvider';
import { DemoNotice } from '../ui/DemoNotice';
export function App() {
  return <HashRouter><DemoProvider><DemoNotice /><AppRoutes /></DemoProvider></HashRouter>;
}
