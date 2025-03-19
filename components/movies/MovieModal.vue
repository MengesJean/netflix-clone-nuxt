<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <!-- Animated Backdrop -->
    <div
      class="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fadeIn"
      @click="close"
    ></div>

    <!-- Modal Content with Animation -->
    <div
      class="relative bg-netflix-dark w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl animate-scaleIn"
      style="max-height: 90vh"
    >
      <!-- Enhanced Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 z-10 bg-netflix-dark/80 backdrop-blur-sm rounded-full p-2 hover:bg-netflix-red hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div class="overflow-y-auto scrollbar-thin" style="max-height: 90vh">
        <!-- Enhanced Loading State -->
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center h-96"
        >
          <div class="netflix-loader">
            <div class="netflix-loader-inner"></div>
          </div>
          <p class="mt-6 text-white font-medium animate-pulse">Loading...</p>
        </div>

        <!-- Media Content -->
        <div v-else-if="media">
          <!-- Hero Banner with Enhanced Gradients -->
          <div class="relative aspect-video">
            <img
              :src="media.backdropUrl"
              :alt="media.title"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/70 to-transparent"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-netflix-dark/80 via-transparent to-transparent"
            ></div>
            <div class="absolute bottom-0 left-0 p-8 w-full z-10">
              <h1 class="text-4xl md:text-5xl font-bold mb-3 text-shadow">
                {{ media.title }}
              </h1>
              <div class="flex flex-wrap items-center gap-4 text-sm">
                <span
                  v-if="media.match"
                  class="text-green-500 font-semibold bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-sm"
                  >{{ media.match }}% Match</span
                >
                <span v-if="media.year" class="text-white/90">{{
                  media.year
                }}</span>
                <span
                  v-if="media.rating"
                  class="border border-netflix-gray/50 px-2 py-0.5 rounded-sm"
                  >{{ media.rating }}</span
                >
                <span v-if="media.duration" class="text-white/90">{{
                  media.duration
                }}</span>
              </div>
            </div>
          </div>

          <!-- Details Section with Improved Layout -->
          <div class="p-8">
            <!-- Description with Better Typography -->
            <p class="text-netflix-lightGray mb-8 leading-relaxed max-w-3xl">
              {{ media.description }}
            </p>

            <!-- Enhanced Action Buttons -->
            <div class="flex flex-wrap gap-4 mb-10">
              <button
                class="bg-white text-black py-3 px-6 rounded-md flex items-center gap-2 font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-white/20 transform hover:-translate-y-1"
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
                class="bg-netflix-gray/30 backdrop-blur-sm text-white py-3 px-6 rounded-md flex items-center gap-2 hover:bg-netflix-gray/50 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
                My List
              </button>
              <button
                class="bg-netflix-gray/30 backdrop-blur-sm text-white py-3 px-6 rounded-md flex items-center gap-2 hover:bg-netflix-gray/50 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"
                  />
                </svg>
                Like
              </button>
            </div>

            <!-- Cast/Production Info with Improved Styling -->
            <div
              class="mb-8 p-4 bg-netflix-black/30 rounded-md border border-netflix-gray/10"
            >
              <p
                class="text-sm text-netflix-lightGray flex flex-wrap gap-2 items-center"
              >
                <span class="text-white font-medium">Cast:</span>
                <span class="netflix-tag">Actor 1</span>
                <span class="netflix-tag">Actor 2</span>
                <span class="netflix-tag">Actor 3</span>
              </p>
              <p
                class="text-sm text-netflix-lightGray mt-3 flex flex-wrap gap-2 items-center"
              >
                <span class="text-white font-medium">Genres:</span>
                <span class="netflix-tag">Action</span>
                <span class="netflix-tag">Adventure</span>
                <span class="netflix-tag">Thriller</span>
              </p>
            </div>

            <!-- Similar Content with Better Styling -->
            <div>
              <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="w-1 h-6 bg-netflix-red rounded-full"></div>
                More Like This
              </h3>
              <div class="bg-netflix-black/30 p-6 rounded-md text-center">
                <p class="text-netflix-gray">
                  Similar content would be displayed here in a production app.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Error State -->
        <div
          v-else
          class="p-10 flex flex-col items-center justify-center min-h-[300px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-netflix-red mb-4 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p class="text-netflix-gray text-lg">
            Failed to load content details.
          </p>
          <button
            class="mt-4 py-2 px-4 bg-netflix-red hover:bg-netflix-red/80 text-white rounded-md transition-colors duration-300"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  mediaId: {
    type: Number,
    default: null,
  },
  mediaType: {
    type: String,
    default: "movie",
  },
});

// Event emitter
const emit = defineEmits(["close"]);

// Instantiate TMDb API service
const tmdbApi = useTmdbApi();

// Media state
const media = ref(null);
const isLoading = ref(false);

// Close the modal
const close = () => {
  emit("close");
};

// Fetch movie details when ID changes or modal becomes visible
watch(
  [() => props.mediaId, () => props.isVisible],
  async ([newId, newVisible]) => {
    if (newId && newVisible) {
      isLoading.value = true;
      media.value = null;

      try {
        if (props.mediaType === "movie") {
          media.value = await tmdbApi.getMovieDetails(newId);
        } else if (props.mediaType === "tv") {
          media.value = await tmdbApi.getTvShowDetails(newId);
        }
      } catch (error) {
        console.error("Error fetching media details:", error);
      } finally {
        isLoading.value = false;
      }
    }
  },
  { immediate: true }
);

// Prevent body scrolling when modal is open
watch(
  () => props.isVisible,
  (newVisible) => {
    if (newVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

// Cleanup on component unmount
onUnmounted(() => {
  document.body.style.overflow = "";
});

// Listen for escape key to close modal
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape" && props.isVisible) {
      close();
    }
  };

  window.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    window.removeEventListener("keydown", handleEscape);
  });
});
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

/* Netflix-style loader */
.netflix-loader {
  width: 60px;
  height: 60px;
  position: relative;
}

.netflix-loader-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #e50914;
  animation: spin 1.5s linear infinite;
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.3);
}

.netflix-loader-inner:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #e50914;
  animation: spin 2s linear infinite;
}

.netflix-loader-inner:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #e50914;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease forwards;
}

.animate-scaleIn {
  animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #e50914;
  border-radius: 10px;
}
</style>
