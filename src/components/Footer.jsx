import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  ArrowUp,
  Mail,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => setSubscribed(false), 3000);
  };

  const socialLinks = [
    { icon: Twitter, name: "Twitter", url: "https://twitter.com" },
    { icon: Facebook, name: "Facebook", url: "https://facebook.com" },
    { icon: Instagram, name: "Instagram", url: "https://instagram.com" },
    { icon: Youtube, name: "YouTube", url: "https://youtube.com" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/genres" },
    { name: "Favorites", path: "/favorites" },
    { name: "About", path: "/about" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  return (
    <footer className="relative bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Movietos
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Discover, track, and explore movies from every genre. Your next
              favorite film starts here.
            </p>

            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ icon: Icon, name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-gray-400 hover:text-fuchsia-700 transition"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-fuchsia-700 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-fuchsia-700 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wide">
              Newsletter
            </h3>

            <p className="mb-4 text-sm text-gray-400">
              Get updates on new releases and trending movies.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-lg bg-gray-800 pl-10 pr-4 py-3 text-sm text-white border border-gray-700 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Subscribe
              </button>

              {subscribed && (
                <p className="text-sm text-green-400">
                  Subscription successful.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-400">
            © {currentYear} <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Movietos</span> All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-purple-400 transition"
            >
              TMDB
            </a>
          </p>
        </div>
      </div>

      {/* Back to Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 rounded-full bg-purple-600 p-3 text-white shadow-lg transition hover:bg-purple-700 hover:scale-110"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
