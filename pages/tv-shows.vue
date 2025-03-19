<template>
  <NuxtLayout name="default">
    <div>
      <MoviesHeroBanner :movie="featuredShow" v-if="featuredShow" />
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
          v-if="popularTvShows.length"
          title="Popular TV Shows"
          :movies="popularTvShows"
        />

        <MoviesMovieRow
          v-if="trendingTvShows.length"
          title="Trending TV Shows"
          :movies="trendingTvShows"
        />

        <MoviesMovieRow
          v-if="topRatedTvShows.length"
          title="Top Rated TV Shows"
          :movies="topRatedTvShows"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const tmdbApi = useTmdbApi();

// Initialize data with empty arrays
const popularTvShows = ref([]);
const trendingTvShows = ref([]);
const topRatedTvShows = ref([]);
const featuredShow = ref(null);

// Function to convert TMDb data to our app format
const formatTvShowData = (show) => {
  return {
    id: show.id,
    title: show.title,
    match: Math.round(show.voteAverage * 10),
    year: show.year || new Date().getFullYear(),
    rating: show.voteAverage > 7 ? "TV-MA" : "TV-14",
    duration: "3 Seasons",
    description: show.overview,
    backdropUrl: show.backdropUrl,
    thumbnailUrl: show.thumbnailUrl,
  };
};

// Fetch all data when component mounts
onMounted(async () => {
  try {
    // Fetch popular TV shows
    const tvShows = await tmdbApi.getPopularTvShows();
    popularTvShows.value = tvShows.map((show) => ({
      id: show.id,
      title: show.title,
      thumbnailUrl: show.thumbnailUrl,
    }));

    // Set featured show
    if (tvShows.length > 0) {
      featuredShow.value = formatTvShowData(tvShows[0]);
    }

    // Fetch trending TV shows
    const trending = await tmdbApi.getTrending("tv", "week");
    trendingTvShows.value = trending.map((show) => ({
      id: show.id,
      title: show.title,
      thumbnailUrl: show.thumbnailUrl,
    }));

    // Using popular TV shows for now as there's no direct top-rated TV endpoint
    // In a real app, we'd use a more appropriate endpoint
    const topRated = await tmdbApi.getTrending("tv", "day");
    topRatedTvShows.value = topRated.map((show) => ({
      id: show.id,
      title: show.title,
      thumbnailUrl: show.thumbnailUrl,
    }));
  } catch (error) {
    console.error("Error fetching TV shows data:", error);
  }
});
</script>
