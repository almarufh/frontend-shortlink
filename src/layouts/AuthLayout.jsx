import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <main className="flex w-full h-screen justify-center items-center">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
