<template>
  <div class="movie-row mb-12">
    <!-- Enhanced Section Title -->
    <h2
      class="text-xl md:text-2xl font-bold mb-5 pl-1 border-l-4 border-netflix-red pl-3 transform hover:translate-x-1 transition-transform duration-300"
    >
      {{ title }}
    </h2>

    <div class="relative group">
      <!-- Enhanced Left Navigation Arrow -->
      <button
        v-if="canScrollLeft"
        @click="scrollLeft"
        class="hidden md:flex absolute left-0 top-0 bottom-0 z-10 items-center justify-center w-16 bg-gradient-to-r from-netflix-dark to-transparent hover:from-netflix-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
      >
        <div
          class="w-10 h-10 rounded-full bg-netflix-dark/80 flex items-center justify-center hover:bg-netflix-dark transition-colors duration-200 border border-white/10 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </button>

      <!-- Content Slider with Improved Spacing -->
      <div
        ref="sliderRef"
        class="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
      >
        <MoviesMovieCard
          v-for="(movie, index) in movies"
          :key="index"
          :movie="movie"
          @click="handleMovieClick"
        />
      </div>

      <!-- Enhanced Right Navigation Arrow -->
      <button
        v-if="canScrollRight"
        @click="scrollRight"
        class="hidden md:flex absolute right-0 top-0 bottom-0 z-10 items-center justify-center w-16 bg-gradient-to-l from-netflix-dark to-transparent hover:from-netflix-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
      >
        <div
          class="w-10 h-10 rounded-full bg-netflix-dark/80 flex items-center justify-center hover:bg-netflix-dark transition-colors duration-200 border border-white/10 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>
    </div>

    <!-- Movie Modal -->
    <MoviesMovieModal
      :is-visible="isModalVisible"
      :media-id="selectedMovieId"
      :media-type="selectedMovieType"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
    required: true,
  },
});

// Slider state and refs
const sliderRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

// Modal state
const isModalVisible = ref(false);
const selectedMovieId = ref(null);
const selectedMovieType = ref("movie");

// Handle movie card click
const handleMovieClick = (data) => {
  selectedMovieId.value = data.id;
  selectedMovieType.value = data.mediaType;
  isModalVisible.value = true;
};

// Close modal
const closeModal = () => {
  isModalVisible.value = false;
};

// Improved Scroll functions for the slider with smoother animation
const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({
      left: -sliderRef.value.offsetWidth * 0.8,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({
      left: sliderRef.value.offsetWidth * 0.8,
      behavior: "smooth",
    });
  }
};

// Check scroll position to show/hide arrows
const checkScrollPosition = () => {
  if (!sliderRef.value) return;

  canScrollLeft.value = sliderRef.value.scrollLeft > 10;
  canScrollRight.value =
    sliderRef.value.scrollLeft <
    sliderRef.value.scrollWidth - sliderRef.value.offsetWidth - 10; // Small buffer
};

// Set up scroll event listener with debounce
let debounceTimer;
const debouncedCheckScroll = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(checkScrollPosition, 50);
};

// Set up scroll event listener
onMounted(() => {
  if (sliderRef.value) {
    sliderRef.value.addEventListener("scroll", debouncedCheckScroll);
    checkScrollPosition(); // Initial check

    // Recheck after images might have loaded
    setTimeout(checkScrollPosition, 500);
  }

  // Check again after 1.5s for safety
  setTimeout(checkScrollPosition, 1500);
});

onBeforeUnmount(() => {
  if (sliderRef.value) {
    sliderRef.value.removeEventListener("scroll", debouncedCheckScroll);
  }
  clearTimeout(debounceTimer);
});
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
