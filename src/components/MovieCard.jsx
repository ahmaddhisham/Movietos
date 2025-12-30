import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-md transition hover:scale-[1.02] hover:shadow-xl">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="h-[360px] w-full object-cover transition group-hover:opacity-90"
      />

      {/* Info */}
      <div className="p-4">
        <h3 className="truncate text-base font-semibold text-white">
          {movie.title}
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>

      {/* Favorite Button */}
      <button
        onClick={onFavoriteClick}
        className={`absolute right-3 top-3 rounded-full px-2.5 py-1.5 text-lg transition
          ${
            favorite
              ? "bg-red-600 text-white"
              : "bg-black/60 text-gray-300 hover:bg-red-600 hover:text-white"
          }`}
        aria-label="Add to favorites"
      >
        ❤️
      </button>
    </div>
  );
}

export default MovieCard;
