import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useState, useMemo } from "react";

function Favorites() {
  const { favorites, isLoading, error, clearFavorites, getFavoriteCount } = useMovieContext();
  const [sortBy, setSortBy] = useState("added"); // added, title, year, rating
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort favorites
  const filteredAndSortedFavorites = useMemo(() => {
    let result = [...favorites];
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title?.toLowerCase().includes(query) ||
        movie.overview?.toLowerCase().includes(query)
      );
    }
    
    // Sort based on selected option
    switch (sortBy) {
      case "title":
        return result.sort((a, b) => a.title?.localeCompare(b.title || ""));
      case "year":
        return result.sort((a, b) => {
          const yearA = a.release_date?.split("-")[0] || "0";
          const yearB = b.release_date?.split("-")[0] || "0";
          return yearB.localeCompare(yearA); // newest first
        });
      case "rating":
        return result.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
      case "added":
      default:
        // Keep in the order they were added (newest first)
        return result.reverse();
    }
  }, [favorites, sortBy, searchQuery]);

  const totalCount = getFavoriteCount?.() || favorites.length;
  const showingCount = filteredAndSortedFavorites.length;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-[420px]"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state with no favorites
  if (totalCount === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-6 text-gray-600">🎬</div>
            <h1 className="text-3xl font-bold text-white mb-4">No favorite movies yet</h1>
            <p className="text-gray-400 mb-8 text-lg">
              Start adding movies to your favorites and they will appear here!
            </p>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold mb-3">How to add favorites:</h3>
              <ul className="text-gray-400 text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❤️</span>
                  Click the heart icon on any movie card
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⭐</span>
                  Browse movies and add the ones you love
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">📱</span>
                  Your favorites are saved across devices
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No results after filtering
  if (searchQuery && showingCount === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-6 text-gray-600">🔍</div>
            <h1 className="text-3xl font-bold text-white mb-4">No matches found</h1>
            <p className="text-gray-400 mb-6">
              No favorites match "{searchQuery}". Try a different search term.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Favorite Movies</h1>
            <p className="text-gray-400 mt-2">
              You have {totalCount} favorite {totalCount === 1 ? 'movie' : 'movies'}
              {searchQuery && ` • Showing ${showingCount} result${showingCount === 1 ? '' : 's'}`}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Search Input */}
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="added">Recently Added</option>
              <option value="title">Title (A-Z)</option>
              <option value="year">Release Year</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            {/* Clear All Button */}
            {totalCount > 0 && (
              <button
                onClick={clearFavorites}
                className="bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-red-600 transition flex items-center gap-2"
              >
                <span>🗑️</span>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedFavorites.map((movie) => (
            <MovieCard movie={movie} key={`fav-${movie.id}`} />
          ))}
        </div>

        {/* Pagination or Load More (optional) */}
        {totalCount > 20 && (
          <div className="mt-12 text-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition">
              Load More Movies
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Your Favorites Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">{totalCount}</div>
              <div className="text-gray-400 text-sm">Total Movies</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {favorites.length > 0 
                  ? Math.round(favorites.reduce((sum, movie) => sum + (movie.vote_average || 0), 0) / favorites.length * 10) / 10
                  : 0}
              </div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {favorites.length > 0 
                  ? new Set(favorites.map(m => m.release_date?.split("-")[0]).filter(Boolean)).size
                  : 0}
              </div>
              <div className="text-gray-400 text-sm">Different Years</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {favorites.filter(m => (m.vote_average || 0) >= 8).length}
              </div>
              <div className="text-gray-400 text-sm">Highly Rated (8+)</div>
            </div>
          </div>
        </div>

        {/* Empty Search Results Note */}
        {searchQuery && showingCount === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Try clearing your search or browse all {totalCount} favorites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;