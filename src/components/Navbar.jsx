import { FaPlus } from 'react-icons/fa6';
import { IoPerson } from 'react-icons/io5';
import { MdLink } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router';

export default function Navbar() {
  const session = useSelector(
    (state) => state.session?.session || state.auth?.auth
  );

  return (
    <header className="fixed top-0 left-0 w-full h-16 border-b border-black/5 bg-secondary px-6 md:px-10 flex items-center justify-between z-50">
      <section className="flex items-center gap-8 h-full">
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="p-1.5 bg-primary/10 text-primary rounded-xl">
            <MdLink className="text-xl" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-dark">
            ShortLink
          </span>
        </Link>

        <nav className="h-full hidden md:flex">
          <ul className="flex items-center h-full gap-6 text-xs font-medium text-dark-gray">
            <li className="h-full flex items-center">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `h-full flex items-center border-b-2 transition-colors px-1 ${
                    isActive
                      ? 'border-primary text-primary font-semibold'
                      : 'border-transparent hover:text-dark'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="h-full flex items-center">
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `h-full flex items-center border-b-2 transition-colors px-1 ${
                    isActive
                      ? 'border-primary text-primary font-semibold'
                      : 'border-transparent hover:text-dark'
                  }`
                }
              >
                Analytics
              </NavLink>
            </li>

            <li className="h-full flex items-center">
              <NavLink
                to="/my-links"
                className={({ isActive }) =>
                  `h-full flex items-center border-b-2 transition-colors px-1 ${
                    isActive
                      ? 'border-primary text-primary font-semibold'
                      : 'border-transparent hover:text-dark'
                  }`
                }
              >
                Links
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>

      {!session ? (
        <section className="flex items-center gap-4 text-xs font-medium">
          <Link
            to="/auth/login"
            className="text-dark hover:text-primary transition-colors px-3 py-2"
          >
            Log in
          </Link>
          <Link
            to="/auth/register"
            className="bg-primary hover:opacity-90 text-secondary px-4 py-2 rounded-xl transition-all font-semibold shadow-xs"
          >
            Sign Up
          </Link>
        </section>
      ) : (
        <section className="flex items-center gap-4 text-xs font-medium">
          <Link
            to="/create-link"
            className="bg-primary hover:opacity-90 text-secondary px-4 py-2 rounded-xl transition-all font-semibold flex items-center gap-2 shadow-xs"
          >
            <FaPlus className="text-xs" />
            <span>Custom Link</span>
          </Link>

          <Link
            to="/profile"
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-dark-gray transition-colors border border-black/5"
            title="Profile"
          >
            <IoPerson className="text-base text-dark-gray" />
          </Link>
        </section>
      )}
    </header>
  );
}
