const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const request = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
};

/* Movies */
export const getPopularMovies = (page = 1) =>
  request("/movie/popular", { page });

export const getTopRatedMovies = (page = 1) =>
  request("/movie/top_rated", { page });

export const getUpcomingMovies = (page = 1) =>
  request("/movie/upcoming", { page });

export const searchMovies = (query, page = 1) =>
  request("/search/movie", {
    query,
    page,
    include_adult: false,
  });
export const getGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// services/Api.js
export const getMoviesByGenre = (genreId, page = 1, sortBy = "popularity.desc") =>
  request("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: sortBy,
    language: "en-US"
  });

// Optional: Get movie details if not already in your file
export const getMovieDetails = (movieId) =>
  request(`/movie/${movieId}`, {
    append_to_response: "credits,videos,similar,reviews"
  });
// In your Api.js file
