<template>
  <div class="container mx-auto px-4 md:px-6 py-4">
    <!-- Loading State -->
    <div v-if="isSearching" class="flex justify-center py-16">
      <div class="w-16 h-16 relative">
        <div
          class="absolute inset-0 border-4 border-youtube-hover rounded-full"
        ></div>
        <div
          class="absolute inset-0 border-4 border-t-youtube-red rounded-full animate-spin"
        ></div>
      </div>
      <p class="mt-4 text-youtube-gray">Searching...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!lastQuery" class="text-center py-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-youtube-gray mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h2 class="text-2xl font-bold text-youtube-white mb-2">
        Search for Movies & TV Shows
      </h2>
      <p class="text-youtube-gray">Find your next favorite show or movie</p>
    </div>

    <!-- No Results -->
    <div
      v-else-if="searchResults.length === 0 && !isSearching"
      class="text-center py-16"
    >
      <h2 class="text-2xl font-bold text-youtube-white mb-2">
        No results found for "{{ lastQuery }}"
      </h2>
      <p class="text-youtube-gray mb-8">
        Try different keywords or check for typos
      </p>
      <button @click="clearSearch" class="text-youtube-red hover:underline">
        Clear search
      </button>
    </div>

    <!-- Search Results -->
    <div v-else>
      <h2 class="text-2xl font-bold text-youtube-white mb-6">
        Search Results for "{{ lastQuery }}"
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <VideosVideoCard
          v-for="item in searchResults"
          :key="item.id"
          :video="formatVideoData(item)"
          @click="navigateToVideo(item.id, item.mediaType)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const tmdbApi = useTmdbApi();
const route = useRoute();
const router = useRouter();

// State
const searchResults = ref([]);
const isSearching = ref(false);
const lastQuery = ref("");

// Search for content
const performSearch = async (query) => {
  if (!query) return;

  isSearching.value = true;
  searchResults.value = [];

  try {
    const results = await tmdbApi.searchMulti(query);
    console.log("Search results from API:", results); // Debug log

    // Make sure each item has mediaType set
    searchResults.value = results.map((item) => ({
      ...item,
      mediaType: item.mediaType || item.media_type || "movie", // Ensure mediaType is set
    }));

    console.log("Processed search results:", searchResults.value); // Debug log
  } catch (error) {
    console.error("Error searching:", error);
  } finally {
    isSearching.value = false;
  }
};

// Clear search results
const clearSearch = () => {
  router.push({ query: {} });
  lastQuery.value = "";
  searchResults.value = [];
};

// Perform search when query changes
watch(
  () => route.query.q,
  async (newQuery) => {
    if (newQuery) {
      lastQuery.value = newQuery;
      await performSearch(newQuery);
    } else {
      clearSearch();
    }
  },
  { immediate: true }
);

// Format TMDB data for our VideoCard component
function formatVideoData(tmdbItem) {
  // Generate a random duration for demo purposes
  const duration = Math.floor(Math.random() * 900) + 120; // 2-15 minutes

  // Generate random view count for demo purposes
  const views = Math.floor(Math.random() * 10000000) + 10000;

  // Random progress for some videos
  const progress =
    Math.random() > 0.7 ? Math.floor(Math.random() * 90) + 10 : null;

  return {
    id: tmdbItem.id,
    title: tmdbItem.title,
    thumbnailUrl: tmdbItem.thumbnailUrl || tmdbItem.backdropUrl,
    duration,
    views,
    year: tmdbItem.year,
    progress,
    mediaType: tmdbItem.mediaType,
    rating: tmdbItem.rating,
    description: tmdbItem.description,
  };
}

// Navigate to video page
function navigateToVideo(id, mediaType) {
  navigateTo(`/watch?v=${id}&type=${mediaType}`);
}
</script>
