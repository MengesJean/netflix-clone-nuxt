import axios from "axios";

export default function useTmdbApi() {
  const config = useRuntimeConfig();
  const API_KEY = config.public.tmdbApiKey;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

  const api = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
  });

  const getImageUrl = (path, size) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${size}${path}`;
  };

  const getBackdropUrl = (path) => getImageUrl(path, "original");
  const getPosterUrl = (path) => getImageUrl(path, "w500");

  const formatMovieData = (movie) => {
    return {
      id: movie.id,
      title: movie.title || movie.name,
      match: Math.floor(Math.random() * 30 + 70), // Random match percentage between 70-99
      year:
        new Date(
          movie.release_date || movie.first_air_date || ""
        ).getFullYear() || "N/A",
      rating: movie.vote_average
        ? Math.round(movie.vote_average * 10) / 10
        : "N/A",
      duration: movie.runtime ? `${movie.runtime}m` : "N/A",
      description: movie.overview || "No description available",
      backdropUrl: movie.backdrop_path
        ? getBackdropUrl(movie.backdrop_path)
        : null,
      thumbnailUrl: movie.poster_path ? getPosterUrl(movie.poster_path) : null,
      mediaType: movie.media_type || (movie.title ? "movie" : "tv"),
    };
  };

  const getTrending = async (mediaType = "all", timeWindow = "day") => {
    try {
      const response = await api.get(`/trending/${mediaType}/${timeWindow}`);
      return response.data.results.map(formatMovieData);
    } catch (error) {
      console.error("Error fetching trending:", error);
      return [];
    }
  };

  const getPopularMovies = async () => {
    try {
      const response = await api.get("/movie/popular");
      return response.data.results.map((item) => ({
        id: item.id,
        title: item.title,
        match: Math.floor(Math.random() * 30 + 70),
        year: new Date(item.release_date || "").getFullYear() || "N/A",
        rating: item.vote_average
          ? Math.round(item.vote_average * 10) / 10
          : "N/A",
        description: item.overview || "No description available",
        backdropUrl: getBackdropUrl(item.backdrop_path),
        thumbnailUrl: getPosterUrl(item.poster_path),
      }));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      return [];
    }
  };

  const getPopularTvShows = async () => {
    try {
      const response = await api.get("/tv/popular");
      return response.data.results.map((item) => ({
        id: item.id,
        title: item.name,
        match: Math.floor(Math.random() * 30 + 70),
        year: new Date(item.first_air_date || "").getFullYear() || "N/A",
        rating: item.vote_average
          ? Math.round(item.vote_average * 10) / 10
          : "N/A",
        description: item.overview || "No description available",
        backdropUrl: getBackdropUrl(item.backdrop_path),
        thumbnailUrl: getPosterUrl(item.poster_path),
      }));
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
      return [];
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await api.get("/movie/top_rated");
      return response.data.results.map((item) => ({
        id: item.id,
        title: item.title,
        match: Math.floor(Math.random() * 30 + 70),
        year: new Date(item.release_date || "").getFullYear() || "N/A",
        rating: item.vote_average
          ? Math.round(item.vote_average * 10) / 10
          : "N/A",
        description: item.overview || "No description available",
        backdropUrl: getBackdropUrl(item.backdrop_path),
        thumbnailUrl: getPosterUrl(item.poster_path),
      }));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
      return [];
    }
  };

  // Search for movies and TV shows
  const searchMulti = async (query) => {
    try {
      const response = await api.get("/search/multi", {
        params: {
          query: query,
          include_adult: false,
        },
      });
      console.log("Raw search response:", response.data); // Debug log

      // Filter out people and only return movies and TV shows
      const results = response.data.results
        .filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        )
        .map((item) => {
          // Ensure we explicitly set the media_type on the item before formatting
          const formattedItem = formatMovieData(item);

          // For search results, ensure thumbnailUrl exists (fallback to backdrop or placeholder)
          if (!formattedItem.thumbnailUrl && !formattedItem.backdropUrl) {
            // If both are null, use a placeholder
            formattedItem.thumbnailUrl = `https://placehold.co/500x750/3f3f3f/ffffff?text=${encodeURIComponent(
              formattedItem.title
            )}`;
          } else if (!formattedItem.thumbnailUrl && formattedItem.backdropUrl) {
            // If only thumbnailUrl is missing, use backdrop as fallback
            formattedItem.thumbnailUrl = formattedItem.backdropUrl;
          }

          return formattedItem;
        });

      console.log("Formatted search results:", results); // Debug log
      return results;
    } catch (error) {
      console.error("Error searching:", error);
      return [];
    }
  };

  // Get movie details
  const getMovieDetails = async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`);
      return formatMovieData(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  // Get TV show details
  const getTvShowDetails = async (tvShowId) => {
    try {
      const response = await api.get(`/tv/${tvShowId}`);
      return formatMovieData(response.data);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
      return null;
    }
  };

  return {
    getTrending,
    getPopularMovies,
    getPopularTvShows,
    getTopRatedMovies,
    searchMulti,
    getMovieDetails,
    getTvShowDetails,
  };
}
