import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import PropTypes from "prop-types";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/index.css";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const isMovieFavorite = isFavorite(movie.id);
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  const showTemporaryFeedback = useCallback((message) => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  }, []);

  const handleFavoriteClick = useCallback(
    (e) => {
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
      } catch (err) {
        console.error("Favorite update failed:", err);
        showTemporaryFeedback("Something went wrong. Try again.");
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

  const handleImageError = useCallback((e) => {
    const fallback = "/movie-poster-placeholder.png";
    if (e.target.src !== fallback) {
      e.target.src = fallback;
      e.target.classList.add("opacity-80");
    }
  }, []);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block"
      style={{ touchAction: "manipulation" }}
    >
      <article
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative overflow-hidden rounded-2xl bg-gray-800
                   transition-all duration-300 hover:-translate-y-1
                   shadow-md hover:shadow-xl"
      >
        {/* Poster */}
        <div className="relative h-[360px] w-full overflow-hidden bg-gray-900">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster for ${movie.title}`}
            loading="lazy"
            width={500}
            height={750}
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform
                       duration-700 group-hover:scale-[1.03]"
          />
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3
            className="truncate text-base font-semibold text-white"
            title={movie.title}
          >
            {movie.title}
          </h3>

          <div className="mt-1 flex items-center justify-between">
            <p className="text-sm text-gray-400">{releaseYear}</p>

            {movie.vote_average > 0 && (
              <div className="flex items-center gap-1 rounded-full
                              bg-gray-700/80 px-2 py-1 text-xs text-gray-300">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isProcessing}
          aria-label={
            isMovieFavorite
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
          className={`absolute right-3 top-3 z-30 flex h-9 w-9
            items-center justify-center rounded-full
            bg-black/60 backdrop-blur-md transition-all duration-300
            hover:bg-black/80 focus:outline-none focus:ring-2
            focus:ring-red-500
            ${isMovieFavorite ? "ring-1 ring-red-500/60" : ""}
            ${isProcessing ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isProcessing ? (
            <span className="h-4 w-4 animate-spin rounded-full
                             border-2 border-white border-t-transparent" />
          ) : (
            <Heart
              size={18}
              className={`transition-all duration-300 ${
                isMovieFavorite
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-300 hover:text-white"
              }`}
            />
          )}
        </button>

        {/* Hover Overlay */}
        <div
          className={`pointer-events-none absolute inset-0
            bg-gradient-to-t from-black/95 via-black/60 to-black/10
            transition-opacity duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute bottom-0 w-full p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-gray-800/90 px-3 py-1
                               text-xs font-medium text-white">
                {movie.original_language?.toUpperCase() || "EN"}
              </span>

              {movie.vote_count > 0 && (
                <span className="text-xs text-gray-300">
                  {movie.vote_count.toLocaleString()} votes
                </span>
              )}
            </div>

            <p className="line-clamp-3 text-sm text-gray-300 leading-relaxed">
              {movie.overview || "No description available."}
            </p>
          </div>
        </div>

        {/* Feedback Toast */}
        {showFeedback && (
          <div className="absolute left-1/2 top-4 z-40
                          -translate-x-1/2 animate-fade-in-up">
            <div className="rounded-lg bg-gray-900/95 px-4 py-2
                            text-sm text-white shadow-xl backdrop-blur-sm">
              {feedbackMessage}
            </div>
          </div>
        )}

        {/* Favorite Ribbon */}
        {isMovieFavorite && (
          <div className="absolute left-0 top-4 z-30
                          rounded-r-md bg-red-600 px-3 py-1
                          text-xs font-semibold text-white shadow-md">
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

export default memo(MovieCard);
