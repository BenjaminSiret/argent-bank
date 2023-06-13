import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import HomePage from './components/Pages/Home/HomePage';
import SignInPage from './components/Pages/SignIn/SignInPage';
import UserPage from './components/Pages/User/UserPage';

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
        element: <SignInPage />
      },
      {
        path: '/user',
        element: <UserPage />
      }
    ]
  }
])
export default router;
