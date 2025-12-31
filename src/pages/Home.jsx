import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MovieSection from "../components/MovieSection";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from "../services/Api.js";
import { FaSearch, FaFire, FaStar, FaCalendarAlt, FaHeart, FaRocket, FaUsers, FaFilm } from "react-icons/fa";

function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [featured, setFeatured] = useState(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const features = [
    {
      icon: <FaFire className="text-orange-400" />,
      title: "Trending Now",
      description: "Discover what's hot and trending worldwide"
    },
    {
      icon: <FaStar className="text-yellow-400" />,
      title: "Top Rated",
      description: "Highest rated movies by critics and audiences"
    },
    {
      icon: <FaCalendarAlt className="text-blue-400" />,
      title: "Upcoming",
      description: "Get excited for soon-to-be-released movies"
    },
    {
      icon: <FaHeart className="text-red-400" />,
      title: "Personalized",
      description: "Save your favorites and build your collection"
    }
  ];

  /* Initial load */
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [popularRes, topRatedRes, upcomingRes] =
          await Promise.all([
            getPopularMovies(),
            getTopRatedMovies(),
            getUpcomingMovies(),
          ]);

        setPopular(popularRes.results);
        setTopRated(topRatedRes.results);
        setUpcoming(upcomingRes.results);

        // Pick a random popular movie for hero
        setFeatured(
          popularRes.results[
            Math.floor(Math.random() * popularRes.results.length)
          ]
        );
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  /* Search */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    try {
      const data = await searchMovies(search);
      setSearchResults(data.results);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }

    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 text-4xl opacity-10 animate-float">🎥</div>
      <div className="fixed bottom-40 right-10 text-4xl opacity-10 animate-float-delayed">🍿</div>
      <div className="fixed top-1/3 right-20 text-4xl opacity-10 animate-float">🎞️</div>
      <div className="fixed bottom-1/4 left-20 text-4xl opacity-10 animate-float-delayed">📽️</div>

      {/* Hero Section */}
      {featured && <Hero movie={featured} />}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <span className="text-6xl">🎬</span>
              <div className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full animate-pulse">
                LIVE
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">MovieHub</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Your ultimate destination for discovering, exploring, and tracking movies from around the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all hover:scale-[1.02] group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <FaSearch className="text-red-500 text-xl" />
              <h2 className="text-2xl font-bold">Find Your Next Favorite Movie</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Search across thousands of movies, actors, and directors
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search movies by title, actor, or genre..."
                className="flex-1 rounded-xl bg-gray-800/70 px-6 py-4 text-white outline-none border border-gray-700 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button 
                type="submit"
                className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-semibold hover:from-red-700 hover:to-red-800 transition-all hover:scale-105 whitespace-nowrap flex items-center gap-2"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mb-10 text-center">
            <p className="text-red-400 bg-red-900/20 inline-block px-6 py-3 rounded-lg border border-red-800">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <FaRocket className="text-red-500 text-2xl" />
              <h2 className="text-3xl font-bold">Search Results</h2>
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                {searchResults.length} movies
              </span>
            </div>
            <MovieSection movies={searchResults} loading={loading} />
          </div>
        )}

        {/* Categories */}
        <div className="space-y-20">
          {/* Popular Movies */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <FaFire className="text-orange-500 text-2xl" />
              <h2 className="text-3xl font-bold">Popular Movies</h2>
              <span className="bg-gradient-to-r from-orange-900/30 to-red-900/30 px-3 py-1 rounded-full text-sm border border-orange-800/30">
                Trending Now
              </span>
            </div>
            <MovieSection movies={popular} loading={loading} />
          </div>

          {/* Top Rated Movies */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <FaStar className="text-yellow-500 text-2xl" />
              <h2 className="text-3xl font-bold">Top Rated Movies</h2>
              <span className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 px-3 py-1 rounded-full text-sm border border-yellow-800/30">
                Critically Acclaimed
              </span>
            </div>
            <MovieSection movies={topRated} loading={loading} />
          </div>

          {/* Upcoming Movies */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <FaCalendarAlt className="text-blue-500 text-2xl" />
              <h2 className="text-3xl font-bold">Upcoming Movies</h2>
              <span className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 px-3 py-1 rounded-full text-sm border border-blue-800/30">
                Coming Soon
              </span>
            </div>
            <MovieSection movies={upcoming} loading={loading} />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-700">
            <div className="inline-flex items-center gap-3 mb-6">
              <FaUsers className="text-3xl text-red-500" />
              <h3 className="text-2xl font-bold">Join Our Community</h3>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start building your personal movie collection today. Save favorites, get personalized recommendations, and never miss a great film.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:scale-105">
                Get Started Free
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:scale-105 border border-gray-700">
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add styles to global CSS (or include in your existing styles)
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

export default Home;