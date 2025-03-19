<template>
  <div
    class="netflix-card group relative cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10"
    @click="handleClick"
  >
    <!-- Card Container with Shadow -->
    <div
      class="rounded-md overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300"
    >
      <!-- Thumbnail -->
      <img
        :src="movie.thumbnailUrl"
        :alt="movie.title"
        class="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Overlay Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
      ></div>

      <!-- Play Button Overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div
          class="w-12 h-12 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-white ml-1"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Movie Info -->
    <div
      class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-md"
    >
      <h3 class="font-medium text-sm truncate">{{ movie.title }}</h3>
      <div class="flex items-center text-xs mt-1 gap-2">
        <span v-if="movie.match" class="text-green-500 font-semibold"
          >{{ movie.match }}%</span
        >
        <span v-if="movie.year" class="text-netflix-lightGray">{{
          movie.year
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click", {
    id: props.movie.id,
    mediaType: props.movie.mediaType || "movie",
  });
};
</script>
