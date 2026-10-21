import { RouterProvider } from 'react-router-dom';
import { appRouter } from './Routes';
export function App() {
  return <RouterProvider router={appRouter} />;
}
