import { useState, useEffect, useCallback } from "react";
import { getMoviesByGenre, getGenres } from "../services/Api.js";
import MovieCard from "../components/MovieCard";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load all genres on component mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true);
        const data = await getGenres();
        setGenres(data.genres || []);
        
        // Select first genre by default
        if (data.genres && data.genres.length > 0) {
          setSelectedGenre(data.genres[0]);
        }
      } catch (err) {
        setError("Failed to load genres");
        console.error("Error loading genres:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  // Load movies when genre changes
  useEffect(() => {
    if (selectedGenre) {
      loadMovies(selectedGenre.id, 1, true);
    }
  }, [selectedGenre]);

  const loadMovies = useCallback(async (genreId, pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      const data = await getMoviesByGenre(genreId, pageNum);
      
      if (reset) {
        setMovies(data.results || []);
      } else {
        setMovies(prev => [...prev, ...(data.results || [])]);
      }
      
      setHasMore(pageNum < data.total_pages);
    } catch (err) {
      setError(`Failed to load ${selectedGenre?.name} movies`);
      console.error("Error loading movies:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedGenre]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
    setMovies([]);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(selectedGenre.id, nextPage, false);
  };

  const getGenreColor = (genreId) => {
    const colors = [
      'bg-gradient-to-r from-red-500 to-pink-600',
      'bg-gradient-to-r from-blue-500 to-cyan-600',
      'bg-gradient-to-r from-green-500 to-emerald-600',
      'bg-gradient-to-r from-purple-500 to-indigo-600',
      'bg-gradient-to-r from-yellow-500 to-orange-600',
      'bg-gradient-to-r from-pink-500 to-rose-600',
      'bg-gradient-to-r from-indigo-500 to-blue-600',
      'bg-gradient-to-r from-emerald-500 to-green-600',
      'bg-gradient-to-r from-orange-500 to-red-600',
      'bg-gradient-to-r from-cyan-500 to-blue-600',
    ];
    return colors[genreId % colors.length];
  };

  const getGenreIcon = (genreName) => {
    const icons = {
      'Action': '💥',
      'Adventure': '🏔️',
      'Animation': '🎨',
      'Comedy': '😂',
      'Crime': '🔫',
      'Documentary': '📽️',
      'Drama': '🎭',
      'Family': '👨‍👩‍👧‍👦',
      'Fantasy': '🐉',
      'History': '📜',
      'Horror': '👻',
      'Music': '🎵',
      'Mystery': '🕵️',
      'Romance': '💖',
      'Science Fiction': '🚀',
      'TV Movie': '📺',
      'Thriller': '😱',
      'War': '⚔️',
      'Western': '🤠'
    };
    return icons[genreName] || '🎬';
  };

  if (error && !selectedGenre) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-4">Oops!</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Floating decorations */}
      <div className="fixed top-20 left-4 md:left-10 text-4xl opacity-10 animate-float">🎭</div>
      <div className="fixed bottom-40 right-4 md:right-10 text-4xl opacity-10 animate-float-delayed">🎪</div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <span className="text-6xl">🎭</span>
              <div className="absolute -top-2 -right-2 bg-purple-500 text-xs px-2 py-1 rounded-full animate-pulse">
                GENRES
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse by <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">Genre</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover movies from every genre. From action-packed thrillers to heartwarming dramas.
          </p>
        </div>

        {/* Genres Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🏷️</span>
            Select a Genre
          </h2>
          
          {loading && !selectedGenre ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 h-24 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre)}
                  className={`relative overflow-hidden rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-[1.02] group ${
                    selectedGenre?.id === genre.id
                      ? `${getGenreColor(genre.id)} text-white scale-[1.02] shadow-lg`
                      : 'bg-gray-800/50 hover:bg-gray-700/70 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {getGenreIcon(genre.name)}
                  </div>
                  <h3 className="font-semibold text-lg">{genre.name}</h3>
                  
                  {selectedGenre?.id === genre.id && (
                    <div className="absolute inset-0 border-2 border-white/20 rounded-xl"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Genre Section */}
        {selectedGenre && (
          <div className="mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className={`${getGenreColor(selectedGenre.id)} p-3 rounded-xl`}>
                  <span className="text-2xl">{getGenreIcon(selectedGenre.name)}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedGenre.name} Movies</h2>
                  <p className="text-gray-400">
                    {movies.length} {movies.length === 1 ? 'movie' : 'movies'} loaded
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Sorted by:</span>
                <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700">
                  <option>Popularity</option>
                  <option>Release Date</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {/* Movies Grid */}
            {loading && movies.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 h-[420px] rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : movies.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-6 text-gray-600">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-4">No movies found</h3>
                <p className="text-gray-400">
                  No {selectedGenre.name.toLowerCase()} movies available at the moment.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Loading...' : 'Load More Movies'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Genre Stats */}
        <div className="mt-20 pt-12 border-t border-gray-800">
          <h3 className="text-2xl font-bold mb-8 text-center">Explore All Genres</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Genres', value: genres.length, icon: '🏷️' },
              { label: 'Action Movies', value: genres.find(g => g.name === 'Action')?.id ? '1000+' : 'Popular', icon: '💥' },
              { label: 'Highest Rated', value: 'Drama', icon: '⭐' },
              { label: 'Most Popular', value: 'Action', icon: '🔥' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-800/30 rounded-xl p-6 text-center border border-gray-700"
              >
                <div className="text-3xl mb-4">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add styles for animations
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Genres;