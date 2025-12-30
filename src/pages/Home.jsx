import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MovieSection from "../components/MovieSection";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from "../services/Api.js";

function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [featured, setFeatured] = useState(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Initial load */
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [popularRes, topRatedRes, upcomingRes] =
          await Promise.all([
            getPopularMovies(),
            getTopRatedMovies(),
            getUpcomingMovies(),
          ]);

        setPopular(popularRes.results);
        setTopRated(topRatedRes.results);
        setUpcoming(upcomingRes.results);

        // Pick a random popular movie for hero
        setFeatured(
          popularRes.results[
            Math.floor(Math.random() * popularRes.results.length)
          ]
        );
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  /* Search */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    try {
      const data = await searchMovies(search);
      setSearchResults(data.results);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }

    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 pt-24 text-white">
      {/* Hero */}
      {featured && <Hero movie={featured} />}

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="mx-auto mb-20 flex max-w-xl gap-3"
      >
        <input
          type="text"
          placeholder="Search for a movie..."
          className="flex-1 rounded-lg bg-gray-800 px-4 py-3 text-sm text-white outline-none ring-1 ring-gray-700 focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700">
          Search
        </button>
      </form>

      {error && (
        <p className="mb-10 text-center text-red-400">
          {error}
        </p>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <MovieSection
          title="Search Results"
          movies={searchResults}
          loading={loading}
        />
      )}

      {/* Categories */}
      <MovieSection
        title="Popular Movies"
        movies={popular}
        loading={loading}
      />

      <MovieSection
        title="Top Rated Movies"
        movies={topRated}
        loading={loading}
      />

      <MovieSection
        title="Upcoming Movies"
        movies={upcoming}
        loading={loading}
      />
    </div>
  );
}

export default Home;
