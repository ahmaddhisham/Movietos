import "./css/index.css"
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { MovieProvider } from "./contexts/MovieContext"
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import About from "./pages/About"
import Footer from "./components/Footer"

function App() {
  return (
    <MovieProvider>
      <div className="flex flex-col min-h-screen pt-24 bg-gray-900"> {/* Add this wrapper */}
        <NavBar />
        <main className='flex-grow'> {/* Change from 'main-content' to 'flex-grow' */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  )
}

export default App