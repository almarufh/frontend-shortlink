import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="login"
            replace
          />
        ),
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
