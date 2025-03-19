<template>
  <div class="container mx-auto px-4 md:px-6 py-4">
    <!-- Category header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-youtube-white mb-4">Explore</h1>

      <!-- Category tabs -->
      <div class="flex overflow-x-auto pb-2 gap-2 mb-4 no-scrollbar">
        <button
          v-for="(category, index) in categories"
          :key="index"
          @click="activeCategory = category.id"
          class="youtube-chip min-w-max"
          :class="
            activeCategory === category.id
              ? 'bg-youtube-white text-youtube-black'
              : ''
          "
        >
          <span v-if="category.icon" class="mr-2">{{ category.icon }}</span>
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="w-16 h-16 relative mb-4">
        <div
          class="absolute inset-0 border-4 border-youtube-hover rounded-full"
        ></div>
        <div
          class="absolute inset-0 border-4 border-t-youtube-red rounded-full animate-spin"
        ></div>
      </div>
      <p class="text-youtube-gray text-lg animate-pulse">
        Loading amazing content...
      </p>
    </div>

    <!-- Content sections -->
    <div v-else>
      <!-- "Trending" section -->
      <div v-if="activeCategory === 'trending' || activeCategory === 'all'">
        <h2 class="text-xl font-bold text-youtube-white mb-4">Trending Now</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          <videos-video-card
            v-for="video in trendingContent"
            :key="video.id"
            :video="video"
          />
        </div>
      </div>

      <!-- "Movies" section -->
      <div v-if="activeCategory === 'movies' || activeCategory === 'all'">
        <h2 class="text-xl font-bold text-youtube-white mb-4">
          Popular Movies
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          <videos-video-card
            v-for="video in popularMovies"
            :key="video.id"
            :video="video"
          />
        </div>
      </div>

      <!-- "TV Shows" section -->
      <div v-if="activeCategory === 'tv' || activeCategory === 'all'">
        <h2 class="text-xl font-bold text-youtube-white mb-4">
          Popular TV Shows
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          <videos-video-card
            v-for="video in popularTvShows"
            :key="video.id"
            :video="video"
          />
        </div>
      </div>

      <!-- "Action" section -->
      <div v-if="activeCategory === 'action' || activeCategory === 'all'">
        <h2 class="text-xl font-bold text-youtube-white mb-4">
          Action & Adventure
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          <videos-video-card
            v-for="video in genreFilteredContent('action')"
            :key="video.id"
            :video="video"
          />
        </div>
      </div>

      <!-- "Comedy" section -->
      <div v-if="activeCategory === 'comedy' || activeCategory === 'all'">
        <h2 class="text-xl font-bold text-youtube-white mb-4">Comedy</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          <videos-video-card
            v-for="video in genreFilteredContent('comedy')"
            :key="video.id"
            :video="video"
          />
        </div>
      </div>

      <!-- "Drama" section -->
      <div v-if="activeCategory === 'drama' || activeCategory === 'all'">
        <h2 class="text-xl font-bold text-youtube-white mb-4">Drama</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          <videos-video-card
            v-for="video in genreFilteredContent('drama')"
            :key="video.id"
            :video="video"
          />
        </div>
      </div>

      <!-- Load more button -->
      <div class="flex justify-center my-8">
        <button
          class="bg-youtube-hover hover:bg-youtube-border text-youtube-white px-4 py-2 rounded-full transition-colors"
          @click="loadMoreContent"
        >
          <span v-if="loadingMore" class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            Loading...
          </span>
          <span v-else>Load more</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const tmdbApi = useTmdbApi();
const route = useRoute();
const router = useRouter();

// Category listing
const categories = [
  { id: "all", name: "All", icon: "🏠" },
  { id: "trending", name: "Trending", icon: "🔥" },
  { id: "movies", name: "Movies", icon: "🎬" },
  { id: "tv", name: "TV Shows", icon: "📺" },
  { id: "action", name: "Action", icon: "💥" },
  { id: "comedy", name: "Comedy", icon: "😂" },
  { id: "drama", name: "Drama", icon: "🎭" },
  { id: "documentary", name: "Documentary", icon: "🎥" },
  { id: "animation", name: "Animation", icon: "🎨" },
  { id: "horror", name: "Horror", icon: "👻" },
  { id: "scifi", name: "Sci-Fi", icon: "🚀" },
  { id: "fantasy", name: "Fantasy", icon: "🧙‍♂️" },
  { id: "romance", name: "Romance", icon: "❤️" },
  { id: "mystery", name: "Mystery", icon: "🕵️‍♂️" },
  { id: "thriller", name: "Thriller", icon: "😱" },
];

// Map of genre names to TMDB genre IDs
const genreMap = {
  action: [28, 12], // Action, Adventure
  comedy: [35], // Comedy
  drama: [18], // Drama
  documentary: [99], // Documentary
  animation: [16], // Animation
  horror: [27], // Horror
  scifi: [878], // Science Fiction
  fantasy: [14], // Fantasy
  romance: [10749], // Romance
  mystery: [9648], // Mystery
  thriller: [53], // Thriller
};

// Reactive state
const activeCategory = ref(route.query.category || "all");
const loading = ref(true);
const loadingMore = ref(false);
const trendingContent = ref([]);
const popularMovies = ref([]);
const popularTvShows = ref([]);
const allContent = ref([]);

// Track page for pagination
const page = {
  trending: 1,
  movies: 1,
  tv: 1,
};

// Watch for route changes to update active category
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      activeCategory.value = newCategory;
    } else {
      activeCategory.value = "all";
    }
  }
);

// Watch for active category changes to update URL
watch(activeCategory, (newCategory) => {
  if (newCategory !== route.query.category) {
    router.push({ query: { category: newCategory } });
  }
});

// Add random progress and duration to content items
function enhanceContentItems(items) {
  return items.map((item) => {
    // Add random progress for some items (30% chance)
    if (Math.random() < 0.3) {
      item.progress = Math.floor(Math.random() * 90) + 10;
    }

    // Add random duration (2-15 minutes)
    item.duration = Math.floor(Math.random() * 780) + 120;

    // Add random views
    item.views = Math.floor(Math.random() * 10000000) + 100000;

    return item;
  });
}

// Filter content by genre
function genreFilteredContent(genreKey) {
  // Use a pseudo-random but consistent selection based on genre
  const genreIds = genreMap[genreKey] || [];
  // In a real app, you'd filter by actual genre IDs from TMDB API
  // Here we just use a consistent subset
  const hash = genreKey
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const shuffled = [...allContent.value].sort(
    (a, b) => ((a.id * hash) % 100) - ((b.id * hash) % 100)
  );
  return shuffled.slice(0, 8);
}

// Load more content
async function loadMoreContent() {
  loadingMore.value = true;

  try {
    // Increment pages
    page.trending++;
    page.movies++;
    page.tv++;

    // Load more trending
    const newTrending = await tmdbApi.getTrending("all", "week", page.trending);
    trendingContent.value = [
      ...trendingContent.value,
      ...enhanceContentItems(newTrending),
    ];

    // Load more movies
    const newMovies = await tmdbApi.getPopularMovies(page.movies);
    popularMovies.value = [
      ...popularMovies.value,
      ...enhanceContentItems(newMovies),
    ];

    // Load more TV shows
    const newTv = await tmdbApi.getPopularTvShows(page.tv);
    popularTvShows.value = [
      ...popularTvShows.value,
      ...enhanceContentItems(newTv),
    ];

    // Update all content
    allContent.value = [
      ...trendingContent.value,
      ...popularMovies.value,
      ...popularTvShows.value,
    ];
  } catch (error) {
    console.error("Error loading more content:", error);
  } finally {
    loadingMore.value = false;
  }
}

// Initial data load
onMounted(async () => {
  loading.value = true;

  try {
    // Load trending
    const trending = await tmdbApi.getTrending("all", "week");
    trendingContent.value = enhanceContentItems(trending);

    // Load popular movies
    const movies = await tmdbApi.getPopularMovies();
    popularMovies.value = enhanceContentItems(movies);

    // Load popular TV shows
    const tvShows = await tmdbApi.getPopularTvShows();
    popularTvShows.value = enhanceContentItems(tvShows);

    // Combine all content for genre filtering
    allContent.value = [
      ...trendingContent.value,
      ...popularMovies.value,
      ...popularTvShows.value,
    ];

    loading.value = false;
  } catch (error) {
    console.error("Error loading data:", error);
    loading.value = false;
  }
});
</script>

<style scoped>
.youtube-chip {
  @apply px-3 py-1.5 rounded-full text-sm whitespace-nowrap bg-youtube-hover text-youtube-white hover:bg-youtube-border transition-colors;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
