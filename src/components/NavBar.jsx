import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-gray-800 bg-gray-900" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, width: '100%', display: 'block' }}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Go to homepage">
          <div className="rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <img
              src="/movietos-logo.png"
              className="h-9 w-9 rounded-full bg-gray-900 object-cover transition-transform duration-200 transform group-hover:scale-105"
              alt="Movietos logo"
            />
          </div>
          <span className="hidden md:inline-block ml-2 font-semibold text-white">Movietos</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
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
          className={`w-full md:block md:w-auto ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-800 bg-gray-800 p-4 md:mt-0 md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0">
            <li>
              <Link
                to="/"
                className="block rounded px-3 py-2 text-gray-300 md:p-0"
              >
                Home
              </Link>
            </li> 
            <li>
              <Link
                to="/favorites"
                className="block rounded px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white md:p-0 md:hover:bg-transparent"
              >
                Favorites
              </Link>
            </li> 
            <li>
              <Link
                to="/about"
                className="block rounded px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white md:p-0 md:hover:bg-transparent"
              >
                About
              </Link>
            </li> 
            <li>
              <Link
                to="/genres"
                className="block rounded px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white md:p-0 md:hover:bg-transparent"
              >
                Genres
              </Link>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

// Ensure navbar is always visible on mobile
if (typeof document !== 'undefined' && !document.getElementById('navbar-fix-style')) {
  const style = document.createElement('style');
  style.id = 'navbar-fix-style';
  style.textContent = `
    nav {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 100 !important;
      width: 100% !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      background-color: #111827 !important;
    }
    @media (max-width: 768px) {
      nav {
        z-index: 100 !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      /* Ensure pages don't cover navbar */
      body > div > div {
        position: relative;
      }
    }
  `;
  document.head.appendChild(style);
}
