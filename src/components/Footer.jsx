import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    }
  };

  const socialLinks = [
    { icon: "🐦", name: "Twitter", url: "https://twitter.com" },
    { icon: "📘", name: "Facebook", url: "https://facebook.com" },
    { icon: "📷", name: "Instagram", url: "https://instagram.com" },
    { icon: "▶️", name: "YouTube", url: "https://youtube.com" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Favorites", path: "/favorites" },
    { name: "Trending", path: "/trending" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand/Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎬</span>
              <span className="text-2xl font-bold text-white">MovieHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover your next favorite movie. Browse thousands of films, track your favorites, and stay updated with the latest releases.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest movie releases and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-linear-to-b from-blue-600 to-purple-700 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-700">Movietos.</span> All rights reserved.
          </div>
          
          <div className="text-gray-400 text-sm">
            <span className="mr-4">Data provided by</span>
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-purple-500 transition-colors font-semibold"
            >
              TMDB
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Available on:</span>
            <div className="flex gap-2">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition">
                iOS
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition">
                Android
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Back to top"
      >
        <span className="block transform -translate-y-0.5">↑</span>
      </button>
    </footer>
  );
};

export default Footer;