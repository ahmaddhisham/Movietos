import "./css/index.css"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { MovieProvider } from "./contexts/MovieContext"
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import About from "./pages/About"
import Footer from "./components/Footer"
import Genres from "./pages/Genres"
import MovieDetails from "./pages/MovieDetails"
import ScrollToTop from "./components/scrolltoTop"

function App() {
  return (
    <MovieProvider>
      <ScrollToTop />
      <NavBar />
      <div className="flex flex-col min-h-screen pt-16 sm:pt-16 md:pt-16 bg-gray-900">
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path="/about" element={<About/>} />
            <Route path="/genres" element={<Genres/>}/>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  )
}

export default App