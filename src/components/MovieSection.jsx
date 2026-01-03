import MovieCard from "./MovieCard";

function MovieSection({
  title,
  movies = [],
  loading = false,
  onViewAll,
  showViewAll = true,
}) {
  // Calculate responsive card width
  const getCardWidthClass = () => {
    return "w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] flex-shrink-0";
  };

  return (
    <section className="mb-12 sm:mb-16 lg:mb-20 px-2 sm:px-0">
      {/* Section Header */}
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Decorative line */}
          <div className="hidden sm:block w-1 h-6 sm:h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
            {title}
            <span className="block text-xs sm:text-sm font-normal text-gray-400 mt-1">
              {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
            </span>
          </h2>
        </div>

        {showViewAll && onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 active:scale-95 transition-all"
            aria-label={`View all ${title}`}
          >
            View All <span className="hidden sm:inline">→</span>
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`${getCardWidthClass()} h-[270px] sm:h-[300px] md:h-[330px] lg:h-[360px] rounded-xl bg-gray-800/50 animate-pulse`}
            />
          ))}
        </div>
      ) : movies.length === 0 ? (
        // Empty State
        <div className="text-center py-8 sm:py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <div className="text-4xl sm:text-5xl mb-4 text-gray-600">🎬</div>
          <p className="text-gray-400 text-sm sm:text-base">
            No movies found in {title.toLowerCase()}
          </p>
        </div>
      ) : (
        /* Movies Row */
        <div className="group relative">
          {/* Mobile horizontal scroll */}
          <div 
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={getCardWidthClass()}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Gradient edges - only show when there's overflow */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Scroll indicators for mobile */}
          <div className="flex justify-center gap-1 mt-4 sm:hidden">
            {movies.slice(0, 5).map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-gray-700"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      )}

      {/* Alternative: Grid layout for tablets and up (optional) */}
      {movies.length > 0 && window.innerWidth >= 768 && (
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {movies.slice(0, 8).map((movie) => (
            <div key={`grid-${movie.id}`} className="hidden md:block">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// Add custom scrollbar hiding styles
const scrollbarStyles = `
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}


/* Mobile optimizations */
@media (max-width: 640px) {
  .movie-card-container {
    min-height: 300px;
  }
  
  /* Prevent layout shift on hover */
  .hover\\:scale-\\[1\\.02\\]:hover {
    transform: none;
  }
}

/* Tablet optimizations */
@media (min-width: 640px) and (max-width: 1024px) {
  .movie-card-container {
    min-height: 330px;
  }
}

/* Desktop optimizations */
@media (min-width: 1024px) {
  .movie-card-container {
    min-height: 360px;
  }
}

/* Ensure cards are accessible */
.movie-card-container:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
button, .movie-card-container {
  transition: all 0.2s ease-in-out;
}

/* Active state for touch devices */
@media (hover: none) and (pointer: coarse) {
  button:active,
  .movie-card-container:active {
    transform: scale(0.98);
  }
  
  .hover\\:scale-\\[1\\.02\\] {
    transform: none !important;
  }
}

/* Improve scrollbar experience */
@media (hover: hover) {
  .scrollbar-hide:hover {
    scrollbar-width: thin;
    scrollbar-color: #4b5563 transparent;
  }
  
  .scrollbar-hide:hover::-webkit-scrollbar {
    display: block;
    height: 6px;
  }
  
  .scrollbar-hide:hover::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }
  
  .scrollbar-hide:hover::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-radius: 3px;
  }
}
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = scrollbarStyles;
  document.head.appendChild(styleSheet);
}


export default MovieSection;