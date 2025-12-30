import "./css/index.css"
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { MovieProvider } from "./contexts/MovieContext"
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import About from "./pages/About"

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
