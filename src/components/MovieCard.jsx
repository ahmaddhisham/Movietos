import "../css/moviecard.css"
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
  const favorite = isFavorite (movie.id)

  function onFavoriteClick(e) {
    e.preventDefault();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  }
  

  return (
    <div className="movie-card">
      <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
      <button className={`favorite-btn ${favorite ? "active": ""}`} onClick={onFavoriteClick}>
        ❤️
      </button>
    </div>
  );
}

export default MovieCard;
