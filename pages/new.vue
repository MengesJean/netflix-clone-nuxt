<template>
  <NuxtLayout name="default">
    <div>
      <MoviesHeroBanner :movie="featuredNew" v-if="featuredNew" />
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
          v-if="trendingToday.length"
          title="Trending Today"
          :movies="trendingToday"
        />

        <MoviesMovieRow
          v-if="trendingThisWeek.length"
          title="Trending This Week"
          :movies="trendingThisWeek"
        />

        <MoviesMovieRow
          v-if="popularMovies.length"
          title="Popular Movies"
          :movies="popularMovies"
        />

        <MoviesMovieRow
          v-if="popularTvShows.length"
          title="Popular TV Shows"
          :movies="popularTvShows"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const tmdbApi = useTmdbApi();

// Initialize data with empty arrays
const trendingToday = ref([]);
const trendingThisWeek = ref([]);
const popularMovies = ref([]);
const popularTvShows = ref([]);
const featuredNew = ref(null);

// Function to convert TMDb data to our app format
const formatNewContentData = (item) => {
  return {
    id: item.id,
    title: item.title,
    match: Math.round(item.voteAverage * 10),
    year: item.year || new Date().getFullYear(),
    rating: item.voteAverage > 7 ? "TV-MA" : "TV-14",
    duration: item.mediaType === "movie" ? "2h 15m" : "1 Season",
    description: item.overview,
    backdropUrl: item.backdropUrl,
    thumbnailUrl: item.thumbnailUrl,
  };
};

// Fetch all data when component mounts
onMounted(async () => {
  try {
    // Fetch trending content for today
    const trendingTodayData = await tmdbApi.getTrending("all", "day");
    trendingToday.value = trendingTodayData.map((item) => ({
      id: item.id,
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
    }));

    // Set featured content
    if (trendingTodayData.length > 0) {
      featuredNew.value = formatNewContentData(trendingTodayData[0]);
    }

    // Fetch trending content for the week
    const trendingWeekData = await tmdbApi.getTrending("all", "week");
    trendingThisWeek.value = trendingWeekData.map((item) => ({
      id: item.id,
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
    }));

    // Fetch popular movies
    const movies = await tmdbApi.getPopularMovies();
    popularMovies.value = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      thumbnailUrl: movie.thumbnailUrl,
    }));

    // Fetch popular TV shows
    const tvShows = await tmdbApi.getPopularTvShows();
    popularTvShows.value = tvShows.map((show) => ({
      id: show.id,
      title: show.title,
      thumbnailUrl: show.thumbnailUrl,
    }));
  } catch (error) {
    console.error("Error fetching new & popular data:", error);
  }
});
</script>
