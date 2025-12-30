import MovieCard from "./MovieCard";

function MovieSection({
  title,
  movies = [],
  loading = false,
  onViewAll,
}) {
  return (
    <section className="mb-20">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="relative text-2xl font-semibold text-white">
          <span className="absolute -left-3 top-1 h-6 w-1 rounded bg-blue-500" />
          {title}
        </h2>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            View all →
          </button>
        )}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[360px] w-[240px] flex-shrink-0 rounded-xl bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        /* Movies Row */
        <div className="group relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="w-[240px] flex-shrink-0"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-900 to-transparent" />
        </div>
      )}
    </section>
  );
}

export default MovieSection;
