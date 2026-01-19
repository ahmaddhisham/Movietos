// pages/MovieDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/Api";
import { FaStar, FaCalendarAlt, FaClock, FaPlay, FaArrowLeft, FaImdb, FaHeart, FaShareAlt } from "react-icons/fa";
import { useMovieContext } from "../contexts/MovieContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        
        // Find trailer in videos
        if (data.videos?.results) {
          const trailer = data.videos.results.find(
            video => video.type === "Trailer" && video.site === "YouTube"
          );
          setSelectedVideo(trailer || data.videos.results[0]);
        }
      } catch (err) {
        setError("Failed to load movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleFavoriteClick = () => {
    if (movie) {
      toggleFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-500 to-black py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-12 w-32 bg-gray-800 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-800 h-[500px] rounded-xl"></div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-10 bg-gray-800 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-800 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-4">Movie Not Found</h2>
          <p className="text-gray-400 mb-8">The movie you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-800 to-black text-white">
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <div className="relative h-64 md:h-96 lg:h-120 overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 btn bg-gray-700 px-4 rounded-xl text-gray-300 hover:text-white transition hover:bg-gray-800"
          >
            <FaArrowLeft /> Back to Movies
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Poster & Basic Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Movie Poster */}
              <div className="relative group">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  {movie.adult ? "18+" : "PG"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleFavoriteClick}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition ${
                    isMovieFavorite
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <FaHeart className={isMovieFavorite ? "text-white" : ""} />
                  {isMovieFavorite ? "Remove Favorite" : "Add to Favorites"}
                </button>
                
                {selectedVideo && (
                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.key}`, '_blank')}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
                  >
                    <FaPlay /> Watch Trailer
                  </button>
                )}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 bg-gray-800/50 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold">{movie.vote_average?.toFixed(1)}/10</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Release Date</span>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Runtime</span>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Budget</span>
                  <span>{formatCurrency(movie.budget)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Revenue</span>
                  <span>{formatCurrency(movie.revenue)}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="mt-6">
                <h4 className="font-bold mb-3">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map(genre => (
                    <span
                      key={genre.id}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-sm transition"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            {/* Title & Tagline */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic">"{movie.tagline}"</p>
              )}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-gray-400">({movie.vote_count?.toLocaleString()} votes)</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">
                  {movie.production_countries?.[0]?.iso_3166_1 || "US"}
                </span>
                {movie.imdb_id && (
                  <>
                    <span className="text-gray-400">•</span>
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-yellow-500 hover:text-yellow-400 transition"
                    >
                      <FaImdb className="text-xl" />
                      IMDB
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <div className="flex space-x-8">
                {["overview", "cast", "similar"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 font-medium transition ${
                      activeTab === tab
                        ? "text-white border-b-2 border-red-600"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Overview</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
                  
                  {/* Production Companies */}
                  {movie.production_companies?.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-bold mb-3">Production Companies</h4>
                      <div className="flex flex-wrap gap-4">
                        {movie.production_companies.map(company => (
                          <div key={company.id} className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-lg">
                            {company.logo_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                alt={company.name}
                                className="h-8 object-contain"
                              />
                            ) : (
                              <span className="text-gray-300">{company.name}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "cast" && movie.credits?.cast && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Cast</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movie.credits.cast.slice(0, 10).map(person => (
                      <div key={person.id} className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition">
                        <img
                          src={person.profile_path 
                            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                            : "/actor-placeholder.png"
                          }
                          alt={person.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-3">
                          <h5 className="font-bold truncate">{person.name}</h5>
                          <p className="text-sm text-gray-400 truncate">{person.character}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "similar" && movie.similar?.results && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Similar Movies</h3>
                  {movie.similar.results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {movie.similar.results.slice(0, 8).map(similarMovie => (
                        <Link
                          key={similarMovie.id}
                          to={`/movie/${similarMovie.id}`}
                          className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition group"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                            alt={similarMovie.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="p-3">
                            <h5 className="font-bold truncate">{similarMovie.title}</h5>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-yellow-400">⭐ {similarMovie.vote_average?.toFixed(1)}</span>
                              <span className="text-xs text-gray-400">
                                {new Date(similarMovie.release_date).getFullYear()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No similar movies found.</p>
                  )}
                </div>
              )}
            </div>

            {/* Videos Section */}
            {movie.videos?.results && movie.videos.results.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Videos & Trailers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.videos.results.slice(0, 4).map(video => (
                    <div key={video.id} className="bg-gray-800/50 rounded-xl overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank')}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition"
                        >
                          <div className="bg-red-600 hover:bg-red-700 w-16 h-16 rounded-full flex items-center justify-center">
                            <FaPlay className="text-white text-xl ml-1" />
                          </div>
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold truncate">{video.name}</h4>
                        <p className="text-sm text-gray-400">{video.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;