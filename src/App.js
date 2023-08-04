import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useDispatch } from 'react-redux';
import { authSuccess } from 'redux/authSlice';
import './App.css';

function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      dispatch(authSuccess(token));
    }
  }, [dispatch])

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
