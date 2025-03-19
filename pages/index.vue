<template>
  <div class="container mx-auto px-4 md:px-6 py-4">
    <!-- Category filters -->
    <div class="flex overflow-x-auto pb-4 youtube-scrollbar mb-6 -mx-2">
      <div class="flex space-x-2 px-2">
        <button
          @click="setCategory('all')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black': selectedCategory === 'all',
          }"
        >
          All
        </button>
        <button
          @click="setCategory('movies')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black':
              selectedCategory === 'movies',
          }"
        >
          Movies
        </button>
        <button
          @click="setCategory('tv')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black': selectedCategory === 'tv',
          }"
        >
          TV Shows
        </button>
        <button
          @click="setCategory('action')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black':
              selectedCategory === 'action',
          }"
        >
          Action
        </button>
        <button
          @click="setCategory('comedy')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black':
              selectedCategory === 'comedy',
          }"
        >
          Comedy
        </button>
        <button
          @click="setCategory('drama')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black': selectedCategory === 'drama',
          }"
        >
          Drama
        </button>
        <button
          @click="setCategory('scifi')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black': selectedCategory === 'scifi',
          }"
        >
          Sci-Fi
        </button>
        <button
          @click="setCategory('fantasy')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black':
              selectedCategory === 'fantasy',
          }"
        >
          Fantasy
        </button>
        <button
          @click="setCategory('horror')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black':
              selectedCategory === 'horror',
          }"
        >
          Horror
        </button>
        <button
          @click="setCategory('romance')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black':
              selectedCategory === 'romance',
          }"
        >
          Romance
        </button>
        <button
          @click="setCategory('animation')"
          class="youtube-chip"
          :class="{
            'bg-youtube-white text-youtube-black':
              selectedCategory === 'animation',
          }"
        >
          Animation
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="w-16 h-16 relative">
        <div
          class="absolute inset-0 border-4 border-youtube-hover rounded-full"
        ></div>
        <div
          class="absolute inset-0 border-4 border-t-youtube-red rounded-full animate-spin"
        ></div>
      </div>
      <p class="mt-4 text-youtube-gray animate-pulse">Loading content...</p>
    </div>

    <!-- Videos grid -->
    <div v-else>
      <!-- Trending Section -->
      <div v-if="filteredTrendingMovies.length > 0" class="mb-10">
        <h2 class="text-xl font-medium text-youtube-white mb-4">
          Trending Now
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <VideosVideoCard
            v-for="movie in filteredTrendingMovies.slice(0, 4)"
            :key="movie.id"
            :video="formatVideoData(movie)"
            @click="navigateToVideo(movie.id, movie.mediaType)"
          />
        </div>
      </div>

      <!-- Popular Movies Section -->
      <div v-if="filteredPopularMovies.length > 0" class="mb-10">
        <h2 class="text-xl font-medium text-youtube-white mb-4">
          Popular Movies
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <VideosVideoCard
            v-for="movie in filteredPopularMovies.slice(0, 4)"
            :key="movie.id"
            :video="formatVideoData(movie, 'movie')"
            @click="navigateToVideo(movie.id, 'movie')"
          />
        </div>
      </div>

      <!-- Popular TV Shows Section -->
      <div v-if="filteredPopularTvShows.length > 0" class="mb-10">
        <h2 class="text-xl font-medium text-youtube-white mb-4">
          Popular TV Shows
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <VideosVideoCard
            v-for="show in filteredPopularTvShows.slice(0, 4)"
            :key="show.id"
            :video="formatVideoData(show, 'tv')"
            @click="navigateToVideo(show.id, 'tv')"
          />
        </div>
      </div>

      <!-- Top Rated Movies Section -->
      <div v-if="filteredTopRatedMovies.length > 0" class="mb-10">
        <h2 class="text-xl font-medium text-youtube-white mb-4">
          Top Rated Movies
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <VideosVideoCard
            v-for="movie in filteredTopRatedMovies.slice(0, 4)"
            :key="movie.id"
            :video="formatVideoData(movie, 'movie')"
            @click="navigateToVideo(movie.id, 'movie')"
          />
        </div>
      </div>

      <!-- No results message -->
      <div
        v-if="
          filteredTrendingMovies.length === 0 &&
          filteredPopularMovies.length === 0 &&
          filteredPopularTvShows.length === 0 &&
          filteredTopRatedMovies.length === 0
        "
        class="py-10 text-center"
      >
        <p class="text-youtube-white text-lg">
          No content found for this filter.
        </p>
        <button
          @click="setCategory('all')"
          class="mt-4 px-4 py-2 bg-youtube-red hover:bg-red-700 text-white rounded-full"
        >
          Show All Content
        </button>
      </div>

      <!-- Load more button -->
      <div v-if="hasFilteredContent" class="flex justify-center mt-8">
        <button
          @click="loadMoreContent"
          class="px-6 py-2.5 rounded-full bg-youtube-hover text-youtube-white hover:bg-youtube-border transition-colors"
        >
          Load more
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const tmdbApi = useTmdbApi();
const loading = ref(true);

// Initialize data with empty arrays
const trendingMovies = ref([]);
const popularMovies = ref([]);
const popularTvShows = ref([]);
const topRatedMovies = ref([]);

// Initialize selectedCategory state
const selectedCategory = ref("all");

// Computed property to filter content based on selected category
const filteredTrendingMovies = computed(() => {
  if (selectedCategory.value === "all") return trendingMovies.value;
  if (selectedCategory.value === "movies")
    return trendingMovies.value.filter((item) => item.mediaType === "movie");
  if (selectedCategory.value === "tv")
    return trendingMovies.value.filter((item) => item.mediaType === "tv");

  // Filter by genre - this is a simple implementation that randomly assigns genres based on ID
  // In a real app, you'd filter based on actual genre data from the API
  return trendingMovies.value.filter((item) => {
    const id = item.id;
    const genres = {
      action: [id % 10 === 0 || id % 10 === 1],
      comedy: [id % 10 === 2 || id % 10 === 3],
      drama: [id % 10 === 4 || id % 10 === 5],
      scifi: [id % 10 === 6],
      fantasy: [id % 10 === 7],
      horror: [id % 10 === 8],
      romance: [id % 10 === 9],
      animation: [id % 5 === 0],
    };
    return (
      genres[selectedCategory.value] &&
      genres[selectedCategory.value].some((val) => val)
    );
  });
});

const filteredPopularMovies = computed(() => {
  if (selectedCategory.value === "all" || selectedCategory.value === "movies")
    return popularMovies.value;

  // Filter by genre for movies
  return selectedCategory.value === "tv"
    ? []
    : popularMovies.value.filter((item) => {
        const id = item.id;
        const genres = {
          action: [id % 10 === 0 || id % 10 === 1],
          comedy: [id % 10 === 2 || id % 10 === 3],
          drama: [id % 10 === 4 || id % 10 === 5],
          scifi: [id % 10 === 6],
          fantasy: [id % 10 === 7],
          horror: [id % 10 === 8],
          romance: [id % 10 === 9],
          animation: [id % 5 === 0],
        };
        return (
          genres[selectedCategory.value] &&
          genres[selectedCategory.value].some((val) => val)
        );
      });
});

const filteredPopularTvShows = computed(() => {
  if (selectedCategory.value === "all" || selectedCategory.value === "tv")
    return popularTvShows.value;

  // Filter by genre for TV shows
  return selectedCategory.value === "movies"
    ? []
    : popularTvShows.value.filter((item) => {
        const id = item.id;
        const genres = {
          action: [id % 10 === 0 || id % 10 === 1],
          comedy: [id % 10 === 2 || id % 10 === 3],
          drama: [id % 10 === 4 || id % 10 === 5],
          scifi: [id % 10 === 6],
          fantasy: [id % 10 === 7],
          horror: [id % 10 === 8],
          romance: [id % 10 === 9],
          animation: [id % 5 === 0],
        };
        return (
          genres[selectedCategory.value] &&
          genres[selectedCategory.value].some((val) => val)
        );
      });
});

const filteredTopRatedMovies = computed(() => {
  if (selectedCategory.value === "all" || selectedCategory.value === "movies")
    return topRatedMovies.value;

  // Filter by genre for top rated movies
  return selectedCategory.value === "tv"
    ? []
    : topRatedMovies.value.filter((item) => {
        const id = item.id;
        const genres = {
          action: [id % 10 === 0 || id % 10 === 1],
          comedy: [id % 10 === 2 || id % 10 === 3],
          drama: [id % 10 === 4 || id % 10 === 5],
          scifi: [id % 10 === 6],
          fantasy: [id % 10 === 7],
          horror: [id % 10 === 8],
          romance: [id % 10 === 9],
          animation: [id % 5 === 0],
        };
        return (
          genres[selectedCategory.value] &&
          genres[selectedCategory.value].some((val) => val)
        );
      });
});

// Fetch all data when component mounts
onMounted(async () => {
  try {
    // Fetch trending movies/shows
    trendingMovies.value = await tmdbApi.getTrending("all", "week");

    // Fetch popular movies
    popularMovies.value = await tmdbApi.getPopularMovies();

    // Fetch popular TV shows
    popularTvShows.value = await tmdbApi.getPopularTvShows();

    // Fetch top rated movies
    topRatedMovies.value = await tmdbApi.getTopRatedMovies();

    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
  }
});

// Format TMDB data for our VideoCard component
function formatVideoData(tmdbItem, forceType = null) {
  const mediaType = forceType || tmdbItem.mediaType;

  // Generate a random duration for demo purposes
  const duration = Math.floor(Math.random() * 900) + 120; // 2-15 minutes

  // Generate random view count for demo purposes
  const views = Math.floor(Math.random() * 10000000) + 10000;

  // Create a date from release date or first air date
  const date = new Date(tmdbItem.year, 0, 1); // Default to Jan 1 of the year

  // Random progress for some videos
  const progress =
    Math.random() > 0.7 ? Math.floor(Math.random() * 90) + 10 : null;

  // The channel will be the studio or network, but we don't have that data readily
  // So we'll create some fictional channels based on genre or type
  const channels = [
    { name: "MovieMasters", verified: true },
    { name: "CinemaWorld", verified: true },
    { name: "TVStation", verified: true },
    { name: "StreamHub", verified: true },
    { name: "FilmFanatics", verified: false },
    { name: "ShowBinge", verified: true },
  ];

  const channel = channels[Math.floor(Math.random() * channels.length)];

  return {
    id: tmdbItem.id,
    title: tmdbItem.title,
    thumbnailUrl: tmdbItem.thumbnailUrl || tmdbItem.backdropUrl,
    duration,
    views,
    publishedAt: date.toISOString(),
    progress,
    mediaType,
    rating: tmdbItem.rating,
    description: tmdbItem.description,
    channel: {
      name: channel.name,
      verified: channel.verified,
      avatar: `https://i.pravatar.cc/100?u=${channel.name}`,
    },
  };
}

// Navigate to video page
function navigateToVideo(id, mediaType) {
  navigateTo(`/watch?v=${id}&type=${mediaType}`);
}

// Load more content
function loadMoreContent() {
  loading.value = true;

  // Simulate loading more data with a delay
  setTimeout(async () => {
    try {
      if (
        selectedCategory.value === "all" ||
        (selectedCategory.value !== "movies" && selectedCategory.value !== "tv")
      ) {
        // Fetch more trending movies/shows and add them to existing array
        const moreTrending = await tmdbApi.getTrending("all", "week");
        trendingMovies.value = [
          ...trendingMovies.value,
          ...moreTrending.slice(0, 4),
        ];
      }

      if (
        selectedCategory.value === "all" ||
        selectedCategory.value === "movies" ||
        (selectedCategory.value !== "tv" && selectedCategory.value !== "movies")
      ) {
        // Fetch more popular movies
        const moreMovies = await tmdbApi.getPopularMovies();
        popularMovies.value = [
          ...popularMovies.value,
          ...moreMovies.slice(0, 4),
        ];

        // Fetch more top rated movies
        const moreTopRated = await tmdbApi.getTopRatedMovies();
        topRatedMovies.value = [
          ...topRatedMovies.value,
          ...moreTopRated.slice(0, 4),
        ];
      }

      if (
        selectedCategory.value === "all" ||
        selectedCategory.value === "tv" ||
        (selectedCategory.value !== "tv" && selectedCategory.value !== "movies")
      ) {
        // Fetch more popular TV shows
        const moreTvShows = await tmdbApi.getPopularTvShows();
        popularTvShows.value = [
          ...popularTvShows.value,
          ...moreTvShows.slice(0, 4),
        ];
      }

      loading.value = false;
    } catch (error) {
      console.error("Error fetching more data:", error);
      loading.value = false;
    }
  }, 1000);
}

// Set selected category
function setCategory(category) {
  selectedCategory.value = category;
}

// Check if there is filtered content
const hasFilteredContent = computed(() => {
  return (
    filteredTrendingMovies.value.length > 0 ||
    filteredPopularMovies.value.length > 0 ||
    filteredPopularTvShows.value.length > 0 ||
    filteredTopRatedMovies.value.length > 0
  );
});
</script>

<style scoped>
.youtube-chip {
  @apply px-3 py-1.5 rounded-full text-sm whitespace-nowrap bg-youtube-hover text-youtube-white hover:bg-youtube-border transition-colors;
}

.youtube-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.youtube-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.youtube-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.youtube-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
