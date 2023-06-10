import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import HomePage from './components/Home/HomePage';
import SignIn from './components/SignIn/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/sign-in',
        element: <SignIn />
      }
    ]
  }
])
export default router;
