import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import HomePage from './components/Pages/Home/HomePage';
import SignInPage from './components/Pages/SignIn/SignInPage';
import ProfilePage from './components/Pages/User/ProfilePage';

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
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
])
export default router;
