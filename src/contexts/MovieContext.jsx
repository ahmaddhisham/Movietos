import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        setIsLoading(true);
        setError(null);
        const storedFavs = localStorage.getItem("movie-favorites");
        if (storedFavs) {
          const parsed = JSON.parse(storedFavs);
          // Validate that parsed data is an array
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          } else {
            console.warn("Invalid favorites data in localStorage, resetting...");
            localStorage.removeItem("movie-favorites");
          }
        }
      } catch (err) {
        console.error("Failed to load favorites from localStorage:", err);
        setError("Failed to load favorites");
        // Clear corrupted data
        localStorage.removeItem("movie-favorites");
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to localStorage with error handling
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("movie-favorites", JSON.stringify(favorites));
      } catch (err) {
        console.error("Failed to save favorites to localStorage:", err);
        setError("Failed to save favorites");
      }
    }
  }, [favorites, isLoading]);

  // Memoized functions to prevent unnecessary re-renders
  const addToFavorites = useCallback((movie) => {
    if (!movie?.id) {
      console.error("Invalid movie object provided to addToFavorites");
      return;
    }
    
    setFavorites((prev) => {
      // Check if already in favorites
      if (prev.some(fav => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  }, []);

  const removeFromFavorites = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }, []);

  const toggleFavorite = useCallback((movie) => {
    if (!movie?.id) {
      console.error("Invalid movie object provided to toggleFavorite");
      return;
    }
    
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some(fav => fav.id === movie.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  }, []);

  const isFavorite = useCallback((movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      setFavorites([]);
    }
  }, []);

  const getFavoriteCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoriteCount,
  }), [favorites, isLoading, error, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite, clearFavorites, getFavoriteCount]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

// Optional: Custom hook for favorite status with memoization
export const useFavoriteStatus = (movieId) => {
  const { isFavorite } = useMovieContext();
  return useMemo(() => isFavorite(movieId), [isFavorite, movieId]);
};

// Optional: Custom hook for toggling specific movie
export const useToggleFavorite = (movie) => {
  const { toggleFavorite } = useMovieContext();
  return useCallback(() => {
    toggleFavorite(movie);
  }, [toggleFavorite, movie]);
};