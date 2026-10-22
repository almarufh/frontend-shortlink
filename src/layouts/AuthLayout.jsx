import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray text-dark">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
