function Hero({ movie }) {
  return (
    <section className="relative mb-24 h-[65vh] overflow-hidden rounded-2xl">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-8">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          {movie.title}
        </h1>
        <p className="mb-6 text-gray-300 line-clamp-3">
          {movie.overview}
        </p>
        <span className="text-sm text-gray-400">
          ⭐ {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </section>
  );
}

export default Hero;
