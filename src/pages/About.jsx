import React from "react";
import { FaFilm, FaHeart, FaSearch, FaStar, FaUsers, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <FaSearch />,
      title: "Smart Search",
      description: "Find movies instantly with our powerful search engine",
      color: "text-blue-400"
    },
    {
      icon: <FaHeart />,
      title: "Personal Favorites",
      description: "Save and organize your favorite movies with one click",
      color: "text-red-400"
    },
    {
      icon: <FaStar />,
      title: "Ratings & Reviews",
      description: "See ratings from millions of users worldwide",
      color: "text-yellow-400"
    },
    {
      icon: <FaFilm />,
      title: "Curated Collections",
      description: "Browse handpicked collections and genres",
      color: "text-purple-400"
    },
    {
      icon: <FaUsers />,
      title: "Community Driven",
      description: "Join a community of movie enthusiasts",
      color: "text-green-400"
    },
    {
      icon: <FaRocket />,
      title: "Always Updated",
      description: "Daily updates with latest releases and trends",
      color: "text-pink-400"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Movies" },
    { number: "500+", label: "Genres" },
    { number: "24/7", label: "Updated" },
    { number: "100%", label: "Free" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <span className="text-6xl">🎬</span>
                <div className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full animate-pulse">
                  NEW
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 ">
              About <span className=" bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">Movietos</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your ultimate destination for discovering, exploring, and tracking movies from around the world.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-red-500 transition-all hover:scale-105"
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gray-800/30 rounded-2xl p-8 md:p-12 mb-16 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-300">
                At <span className="font-bold text-red-400">Movietos</span>, we believe that cinema is more than just entertainment—it's an art form that connects people, cultures, and ideas. Our mission is to create the most comprehensive and accessible movie discovery platform for enthusiasts around the world.
              </p>
              <p className="text-lg text-gray-300">
                We combine cutting-edge technology with a deep love for film to deliver an experience that helps you find your next favorite movie, whether you're looking for the latest blockbuster or a hidden gem.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 ">Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">Movietos</span> ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all hover:scale-[1.02] group"
                >
                  <div className={`text-3xl mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 md:p-12 mb-16 border border-gray-700">
            <h2 className="text-3xl font-bold mb-8">Powered by Modern Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['React', 'Tailwind CSS', 'TMDB API', 'Vercel'].map((tech, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/70 rounded-lg p-4 text-center hover:bg-gray-700/70 transition"
                >
                  <span className="font-semibold">{tech}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-300">
              Built with the latest web technologies to ensure fast, responsive, and reliable performance across all devices.
            </p>
          </div>

          {/* Team/CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">Movietos</span> is built by movie lovers, for movie lovers. Join thousands of users who have transformed their movie-watching experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:scale-105"
              >
                Start Exploring Movies
              </Link>
              <Link
                to="/favorites"
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:scale-105 border border-gray-700"
              >
                View Your Favorites
              </Link>
            </div>

            {/* Attribution */}
            <div className="text-gray-500 text-sm mt-16 pt-8 border-t border-gray-800">
              <p className="mb-2">
                Movie data provided by{" "}
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 transition"
                >
                  The Movie Database (TMDB)
                </a>
              </p>
              <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Movie Elements */}
      <div className="fixed top-20 left-10 text-4xl opacity-20 animate-float">🎥</div>
      <div className="fixed bottom-40 right-10 text-4xl opacity-20 animate-float-delayed">🍿</div>
      <div className="fixed top-1/3 right-20 text-4xl opacity-20 animate-float">🎞️</div>
      <div className="fixed bottom-1/4 left-20 text-4xl opacity-20 animate-float-delayed">📽️</div>
    </div>
  );
};

// Add these styles to your global CSS or as inline styles
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default About;