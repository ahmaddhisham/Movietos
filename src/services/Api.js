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
