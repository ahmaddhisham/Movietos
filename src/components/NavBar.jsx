import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `
      flex items-center justify-center
      w-full md:w-auto
      px-4 py-3 md:px-0 md:py-0
      transition-colors duration-300
      ${
        isActive
          ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
          : "text-gray-300 hover:bg-gray-700 hover:text-purple-600 md:hover:bg-transparent md:hover:text-transparent md:hover:bg-clip-text md:hover:bg-gradient-to-r md:hover:from-pink-500 md:hover:to-violet-500"
      }
    `;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-800 bg-gray-900">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="Go to homepage"
          onClick={() => setOpen(false)}
        >
          <div className="rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <img
              src="/movietos-logo.png"
              alt="Movietos logo"
              className="h-9 w-9 rounded-full bg-gray-900 object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <span className="hidden md:inline-block font-semibold leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Movietos
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`
            ${open ? "block" : "hidden"}
            absolute left-0 right-0 top-full
            md:static md:block
          `}
        >
          <ul
            className="
              m-0 list-none
              flex flex-col items-center
              bg-gray-900 border-t border-gray-800
              md:flex-row md:gap-8 md:border-0 md:bg-transparent
            "
          >
            {[
              { to: "/", label: "Home", end: true },
              { to: "/favorites", label: "Favorites" },
              { to: "/about", label: "About" },
              { to: "/genres", label: "Genres" },
            ].map(({ to, label, end }) => (
              <li key={label} className="w-full md:w-auto">
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={navLinkClasses}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
