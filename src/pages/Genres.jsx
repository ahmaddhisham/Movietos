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
  const [sortBy, setSortBy] = useState("popularity.desc");

  // Sort options
  const sortOptions = [
    { value: "popularity.desc", label: "Popularity (High to Low)" },
    { value: "popularity.asc", label: "Popularity (Low to High)" },
    { value: "vote_average.desc", label: "Rating (High to Low)" },
    { value: "vote_average.asc", label: "Rating (Low to High)" },
    { value: "release_date.desc", label: "Release Date (Newest)" },
    { value: "release_date.asc", label: "Release Date (Oldest)" },
    { value: "revenue.desc", label: "Revenue (High to Low)" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

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
      loadMovies(selectedGenre.id, 1, true, sortBy);
    }
  }, [selectedGenre]);

  const loadMovies = useCallback(async (genreId, pageNum = 1, reset = false, sortParam = sortBy) => {
    try {
      setLoading(true);
      const data = await getMoviesByGenre(genreId, pageNum, sortParam);
      
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
  }, [selectedGenre, sortBy]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
    setMovies([]);
    setSortBy("popularity.desc");
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setPage(1);
    setMovies([]);
    if (selectedGenre) {
      loadMovies(selectedGenre.id, 1, true, newSortBy);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(selectedGenre.id, nextPage, false, sortBy);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 flex items-center justify-center">
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
      <div className="fixed top-20 left-4 md:left-10 text-4xl opacity-10 animate-float hidden md:block">🎭</div>
      <div className="fixed bottom-40 right-4 md:right-10 text-4xl opacity-10 animate-float-delayed hidden md:block">🎪</div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <span className="text-5xl sm:text-6xl">🎭</span>
              <div className="absolute -top-2 -right-2 bg-purple-500 text-xs px-2 py-1 rounded-full animate-pulse">
                GENRES
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Browse by <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">Genre</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover movies from every genre. From action-packed thrillers to heartwarming dramas.
          </p>
        </div>

{/* Genre Dropdown */}
<div className="mb-8 sm:mb-12 max-w-md">
  <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
    <span className="text-2xl">🏷️</span>
    Select a Genre
  </h2>

  <select
    value={selectedGenre?.id || ""}
    onChange={(e) => {
      const genre = genres.find(
        (g) => g.id === Number(e.target.value)
      );
      if (genre) handleGenreClick(genre);
    }}
    disabled={loading || genres.length === 0}
    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-purple-600
               disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <option value="" disabled>
      -- Choose a genre --
    </option>

    {genres.map((genre) => (
      <option key={genre.id} value={genre.id}>
        {getGenreIcon(genre.name)} {genre.name}
      </option>
    ))}
  </select>
</div>


        {/* Selected Genre Section */}
        {selectedGenre && (
          <div className="mt-8 sm:mt-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className={`${getGenreColor(selectedGenre.id)} p-3 rounded-xl`}>
                  <span className="text-2xl">{getGenreIcon(selectedGenre.name)}</span>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{selectedGenre.name} Movies</h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {movies.length} {movies.length === 1 ? 'movie' : 'movies'} loaded
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm sm:text-base whitespace-nowrap">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={handleSortChange}
                  disabled={loading || movies.length === 0}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full lg:w-auto"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Movies Grid - NOW 4 PER ROW ON LARGE SCREENS */}
            {loading && movies.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 h-[380px] sm:h-[420px] rounded-xl animate-pulse"></div>
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
                {/* Movies Grid: 
                  - 1 column on mobile (100%)
                  - 2 columns on sm (640px)
                  - 3 columns on md (768px)  
                  - 4 columns on lg (1024px) - THIS IS THE KEY CHANGE
                */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8 sm:mt-12">
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
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-gray-800">
          <h3 className="text-2xl font-bold mb-8 text-center">Explore All Genres</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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

/* Improve MovieCard grid spacing */
.grid-cols-1 > * {
  max-width: 100%;
}

.grid-cols-2 > * {
  max-width: 100%;
}

.grid-cols-3 > * {
  max-width: 100%;
}

.grid-cols-4 > * {
  max-width: 100%;
}

/* Ensure MovieCards maintain proper aspect ratio */
.grid-cols-4 .relative {
  aspect-ratio: 2/3;
}

/* Better mobile touch targets */
@media (max-width: 640px) {
  button, select {
    min-height: 44px;
  }
  
  .grid-cols-2 {
    gap: 0.75rem;
  }
}

/* Tablet optimization */
@media (min-width: 640px) and (max-width: 1023px) {
  .grid-cols-2, .grid-cols-3 {
    gap: 1rem;
  }
}

/* Desktop optimization for 4 columns */
@media (min-width: 1024px) {
  .grid-cols-4 {
    gap: 1.5rem;
  }
}

/* Hide floating elements on small screens */
@media (max-width: 768px) {
  .fixed {
    display: none;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Genres;