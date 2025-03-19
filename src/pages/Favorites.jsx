import "../css/favorites.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard  from "../components/MovieCard";
function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }


    return ( <div>
        <h1>No favorite movies yet</h1>
  <p>add your movies to favorites and they will appear here</p>
    </div>
    )}

    export default Favorites;