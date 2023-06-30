import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authSuccess } from 'redux/authSlice';
import './App.css';

function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
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
