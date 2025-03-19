import MovieCard from "../components/MovieCard"
import { useState ,useEffect } from "react"
import "../css/home.css"

import { searchMovies, getPopularMovies } from "../services/Api"
function Home () { 

    const [search , setSearch] = useState ('')
    const [error, seterror]= useState (null)
    const  [movies, setmovies] = useState([])
    const [loading , setloading ] = useState(true)
    useEffect(() => {
      const loadPopularMovies = async () => {
        try {
          const PopularMovies = await getPopularMovies()
          setmovies(PopularMovies.results) // Don't forget the .results!
        } catch (error) {
          console.log(error)
          seterror("Failed to load movies...")
        } finally {
          setloading(false)
        }
      }
    
      loadPopularMovies() // 🛑 You forgot this call!
    }, [])
    
    

const handleSearch = async (e) => {
    e.preventDefault()
    if(!search.trim()) return 
    if (loading) return
    setloading (true)
    try { const searchResults = await searchMovies(search)
      setmovies(searchResults)
      seterror(null)


    } catch (error) {console.log (error) ; "failed to search movie"}  finally { setloading (false)}
    setSearch ("")
}
    return (
  <div className="home">
  <form onSubmit={handleSearch} className="search-form">
    <input
      type="text"
      placeholder="Search for a movie"
      className="search-input"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button type="submit" className="search-button">Search</button>
  </form>
  {error && <div className="error-message">{error}</div>}
  {loading ? (<div className="loading">loading... </div>) : (  <div className="movies-grid">
    {movies.map((movie) =>
      movie.title.toLowerCase().startsWith(search.toLowerCase()) && (
        <MovieCard key={movie.id} movie={movie} />
      )
    )}
  </div>)}


</div>

)}

export default Home