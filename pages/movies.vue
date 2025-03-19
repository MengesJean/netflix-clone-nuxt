<template>
  <NuxtLayout name="default">
    <div>
      <MoviesHeroBanner :movie="featuredMovie" v-if="featuredMovie" />
      <div v-else class="h-[80vh] flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4">
            <svg
              class="animate-spin h-full w-full text-netflix-red"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p class="text-netflix-lightGray">Loading...</p>
        </div>
      </div>

      <div class="mt-10 space-y-8">
        <MoviesMovieRow
          v-if="popularMovies.length"
          title="Popular Movies"
          :movies="popularMovies"
        />

        <MoviesMovieRow
          v-if="topRatedMovies.length"
          title="Top Rated Movies"
          :movies="topRatedMovies"
        />

        <MoviesMovieRow
          v-if="trendingMovies.length"
          title="Trending Movies"
          :movies="trendingMovies"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const tmdbApi = useTmdbApi();

// Initialize data with empty arrays
const popularMovies = ref([]);
const topRatedMovies = ref([]);
const trendingMovies = ref([]);
const featuredMovie = ref(null);

// Function to convert TMDb data to our app format
const formatMovieData = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    match: Math.round(movie.voteAverage * 10),
    year: movie.year || new Date().getFullYear(),
    rating: movie.voteAverage > 7 ? "R" : "PG-13",
    duration: "2h 15m",
    description: movie.overview,
    backdropUrl: movie.backdropUrl,
    thumbnailUrl: movie.thumbnailUrl,
  };
};

// Fetch all data when component mounts
onMounted(async () => {
  try {
    // Fetch popular movies
    const movies = await tmdbApi.getPopularMovies();
    popularMovies.value = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      thumbnailUrl: movie.thumbnailUrl,
    }));

    // Set featured movie
    if (movies.length > 0) {
      featuredMovie.value = formatMovieData(movies[0]);
    }

    // Fetch top rated movies
    const topRated = await tmdbApi.getTopRatedMovies();
    topRatedMovies.value = topRated.map((movie) => ({
      id: movie.id,
      title: movie.title,
      thumbnailUrl: movie.thumbnailUrl,
    }));

    // Fetch trending movies
    const trending = await tmdbApi.getTrending("movie", "week");
    trendingMovies.value = trending.map((movie) => ({
      id: movie.id,
      title: movie.title,
      thumbnailUrl: movie.thumbnailUrl,
    }));
  } catch (error) {
    console.error("Error fetching movies data:", error);
  }
});
</script>
