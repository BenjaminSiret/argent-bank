import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import HomePage from './components/Home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  }
])
export default router;
