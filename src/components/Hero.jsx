import { useState, useEffect } from "react";
import { Play, Info, Star, Calendar, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero({ movie }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const handleWatchTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await res.json();

      const trailer = data.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.error("Failed to load trailer", error);
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    setImageError(false);
  }, [movie]);

  // Format runtime from minutes to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format release date
  const formatDate = (dateString) => {
    if (!dateString) return "Coming Soon";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate gradient based on rating
  const getRatingColor = (rating) => {
    if (rating >= 8) return "from-green-500 to-emerald-600";
    if (rating >= 6.5) return "from-yellow-500 to-amber-600";
    return "from-red-500 to-rose-600";
  };

  // Fallback image in case backdrop_path is not available
  const getImageUrl = () => {
    if (!movie.backdrop_path || imageError) {
      return "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
    }
    return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  };

  return (
    <section className="relative mb-24 mt-0 h-[85vh] pt-0 min-h-[600px] overflow-hidden rounded-b-3xl shadow-2xl">
      {/* Background Image with Loading State */}
      <div className="absolute inset-0 mt-0">
        {/* Main Background Image */}
        <img
          src={getImageUrl()}
          alt={movie.title || "Movie backdrop"}
          className={`absolute inset-0 h-full w-full object-cover pt-0 transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.error("Failed to load image:", movie.backdrop_path);
            setImageError(true);
            setIsLoaded(true); // Still show the fallback
          }}
        />

        {/* Fallback/Loading Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 transition-opacity duration-700 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Loading Skeleton */}
        {!isLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>
        )}

        {/* Blurred Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 scale-110"
          style={{
            backgroundImage: `url(${getImageUrl()})`,
          }}
        />
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl">
          {/* Movie Metadata Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1 rounded-full bg-gradient-to-r ${getRatingColor(
                  movie.vote_average
                )} px-4 py-2 font-semibold text-white`}
              >
                <Star className="h-4 w-4 fill-current" />
                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
              </div>
              <span className="text-sm text-gray-300">/10</span>
            </div>

            {movie.release_date && (
              <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-300">
                  {formatDate(movie.release_date)}
                </span>
              </div>
            )}

            {movie.runtime && (
              <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm">
                <Clock className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-300">
                  {formatRuntime(movie.runtime)}
                </span>
              </div>
            )}

            {movie.vote_count && (
              <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm">
                <Users className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-300">
                  {movie.vote_count.toLocaleString()} votes
                </span>
              </div>
            )}
          </div>

          {/* Movie Title */}
          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {movie.title || "Untitled Movie"}
            </span>
          </h1>

          {/* Tagline */}
          {movie.tagline && (
            <p className="mb-6 text-xl font-light text-gray-300 italic">
              "{movie.tagline}"
            </p>
          )}

          {/* Overview */}
          <p className="mb-8 max-w-2xl text-lg text-gray-200 leading-relaxed line-clamp-4">
            {movie.overview || "No description available."}
          </p>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 ? (
            <div className="mb-8 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          ) : movie.genre_ids ? (
            <div className="mb-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                Movie
              </span>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleWatchTrailer}
              className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95"
            >
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>Watch Trailer</span>
            </button>

            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="group flex items-center gap-3 rounded-full border border-white/30 bg-black/40 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:border-white/50"
            >
              <Info className="h-5 w-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

export default Hero;
