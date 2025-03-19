<template>
  <div class="hero-banner relative">
    <!-- Backdrop Image with Animation -->
    <div
      class="relative aspect-video md:aspect-[2.2] lg:aspect-[2.5] overflow-hidden"
    >
      <img
        :src="movie.backdropUrl"
        :alt="movie.title"
        class="w-full h-full object-cover animate-slowZoom"
      />

      <!-- Enhanced Gradient Overlays -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/60 to-transparent opacity-100"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-netflix-dark via-netflix-dark/50 to-transparent opacity-80"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-50"
      ></div>
    </div>

    <!-- Content with Animation -->
    <div
      class="absolute top-1/2 -translate-y-1/2 left-0 px-8 md:px-16 max-w-3xl animate-fadeIn"
    >
      <h1
        class="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-shadow tracking-wide leading-tight"
      >
        {{ movie.title }}
      </h1>

      <!-- Metadata with Improved Spacing -->
      <div class="flex flex-wrap items-center gap-4 text-sm mb-5">
        <span
          v-if="movie.match"
          class="text-green-500 font-semibold px-2 py-1 bg-black/20 backdrop-blur-sm rounded-sm"
          >{{ movie.match }}% Match</span
        >
        <span v-if="movie.year" class="text-netflix-lightGray">{{
          movie.year
        }}</span>
        <span
          v-if="movie.rating"
          class="border border-netflix-gray px-2 py-0.5 text-netflix-lightGray"
          >{{ movie.rating }}</span
        >
        <span v-if="movie.duration" class="text-netflix-lightGray">{{
          movie.duration
        }}</span>
      </div>

      <!-- Description with Improved Typography -->
      <p
        class="text-sm md:text-base lg:text-lg text-shadow mb-8 line-clamp-3 md:line-clamp-4 text-netflix-lightGray leading-relaxed max-w-2xl"
      >
        {{ movie.description }}
      </p>

      <!-- Enhanced Buttons -->
      <div class="flex flex-wrap gap-4">
        <button
          class="py-3 px-8 rounded-md font-medium transition-all duration-300 bg-white text-black hover:bg-opacity-80 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clip-rule="evenodd"
            />
          </svg>
          Play
        </button>
        <button
          @click="showDetails"
          class="py-3 px-8 rounded-md font-medium transition-all duration-300 bg-netflix-gray/60 backdrop-blur-sm hover:bg-netflix-gray/40 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
          </svg>
          More Info
        </button>
      </div>
    </div>

    <!-- Movie Modal -->
    <MoviesMovieModal
      :is-visible="isModalVisible"
      :media-id="movie.id"
      :media-type="movie.mediaType || 'movie'"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

// Modal state
const isModalVisible = ref(false);

// Open modal with movie details
const showDetails = () => {
  isModalVisible.value = true;
};

// Close modal
const closeModal = () => {
  isModalVisible.value = false;
};
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes slowZoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translate(0, calc(-50% + 20px));
  }
  100% {
    opacity: 1;
    transform: translate(0, -50%);
  }
}

.animate-slowZoom {
  animation: slowZoom 15s ease-in-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 1.2s ease-out forwards;
}
</style>
