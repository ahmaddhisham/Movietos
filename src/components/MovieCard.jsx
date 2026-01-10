import { useCallback, memo, useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import PropTypes from "prop-types";
import "../css/index.css";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false); // Local hover state

  const isMovieFavorite = isFavorite(movie.id);

  const showTemporaryFeedback = useCallback((message) => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  }, []);

  const handleFavoriteClick = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isProcessing) return;

      setIsProcessing(true);

      try {
        if (isMovieFavorite) {
          removeFromFavorites(movie.id);
          showTemporaryFeedback(`Removed "${movie.title}" from favorites`);
        } else {
          addToFavorites(movie);
          showTemporaryFeedback(`Added "${movie.title}" to favorites`);
        }
      } catch (error) {
        console.error("Failed to update favorites:", error);
        showTemporaryFeedback("Failed to update favorites. Please try again.");
      } finally {
        setTimeout(() => setIsProcessing(false), 300);
      }
    },
    [
      isMovieFavorite,
      movie,
      addToFavorites,
      removeFromFavorites,
      isProcessing,
      showTemporaryFeedback,
    ]
  );

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleImageError = useCallback((e) => {
    const fallbackImage = "/movie-poster-placeholder.png";
    if (e.target.src !== fallbackImage) {
      e.target.src = fallbackImage;
      e.target.className += " opacity-80";
    }
  }, []);

  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block"
      style={{ touchAction: "manipulation" }}
    >
      <article
        style={{
          boxShadow: isHovered
            ? "0 10px 20px -5px rgba(128,0,255,0.4), 0 20px 40px -10px rgba(148,0,255,0.3), 0 30px 60px -15px rgba(168,0,255,0.2)"
            : "0 4px 6px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.3s ease-in-out",
        }}
        className="relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Poster with lazy loading */}
        <div className="relative h-[360px] w-full overflow-hidden bg-gray-900">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster for ${movie.title}`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            width={500}
            height={750}
            onError={handleImageError}
          />

          {/* Loading skeleton */}
          <div className="absolute inset-0" />
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3
            className="truncate text-base font-semibold text-white"
            title={movie.title}
          >
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <p
              className="text-sm text-gray-400"
              aria-label={`Released in ${releaseYear}`}
            >
              {releaseYear}
            </p>

            {movie.vote_average > 0 && (
              <div
                className="flex items-center gap-1 rounded-full bg-gray-700/80 px-2 py-1 text-xs text-gray-300"
                aria-label={`Rating: ${movie.vote_average.toFixed(
                  1
                )} out of 10`}
              >
                <span className="text-yellow-400" aria-hidden="true">
                  ★
                </span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isProcessing}
          className={`absolute right-3 top-3 rounded-full p-3 transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-offset-gray-800
          ${isProcessing ? "cursor-not-allowed opacity-80" : ""}
          ${
            isMovieFavorite
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30 focus:ring-red-500 hover:bg-red-700 hover:shadow-red-600/50"
              : "bg-black/80 text-gray-300 hover:bg-red-600 hover:text-white focus:ring-red-600 hover:shadow-lg hover:shadow-red-600/20"
          }`}
          aria-label={
            isMovieFavorite
              ? `Remove "${movie.title}" from favorites`
              : `Add "${movie.title}" to favorites`
          }
          title={isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-busy={isProcessing}
        >
          <span className="sr-only">
            {isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
          <span
            aria-hidden="true"
            className={`block transition-all duration-300 ${
              isProcessing
                ? "animate-spin"
                : isMovieFavorite
                ? "scale-125"
                : "scale-100"
            }`}
          >
            {isProcessing ? (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <span
                className={`transition-colors ${
                  isMovieFavorite
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {isMovieFavorite ? "❤️" : "🤍"}
              </span>
            )}
          </span>
        </button>

        {/* Feedback Toast */}
        {showFeedback && (
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 animate-fade-in-up">
            <div className="rounded-lg bg-gray-900/95 px-4 py-2 text-sm text-white shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span
                  className={
                    isMovieFavorite ? "text-red-500" : "text-green-500"
                  }
                >
                  {isMovieFavorite ? "✓" : "❤️"}
                </span>
                <span>{feedbackMessage}</span>
              </div>
            </div>
          </div>
        )}

        {/* Overlay on hover for more info - using local hover state */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-gray-800/90 px-3 py-1 text-xs font-medium text-white">
                {movie.original_language?.toUpperCase() || "EN"}
              </span>
              {movie.vote_count > 0 && (
                <span className="text-xs text-gray-300">
                  {movie.vote_count.toLocaleString()} votes
                </span>
              )}
            </div>
            <p className="line-clamp-3 text-sm text-gray-200">
              {movie.overview || "No description available."}
            </p>
          </div>
        </div>

        {/* Favorite indicator ribbon */}
        {isMovieFavorite && (
          <div
            className="absolute left-0 top-4 z-20 rounded-r-md bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md"
            aria-hidden="true"
          >
            FAVORITE
          </div>
        )}
      </article>
    </Link>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    original_language: PropTypes.string,
    vote_count: PropTypes.number,
  }).isRequired,
};

// Custom animation for feedback toast
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.3s ease-out;
  }
  
  /* Allow vertical scrolling through movie cards on mobile */
  a[href*="/movie/"] {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  
  @media (max-width: 768px) {
    a[href*="/movie/"] {
      touch-action: pan-y;
    }
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default memo(MovieCard);
