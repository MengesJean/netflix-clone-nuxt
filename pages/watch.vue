<template>
  <div class="container mx-auto px-4 md:px-6 py-4">
    <div class="flex flex-col lg:flex-row">
      <!-- Video player and details section -->
      <div class="flex-1 lg:pl-0 lg:pr-6">
        <!-- Video player -->
        <div
          class="w-full aspect-video bg-black mb-3 rounded-lg overflow-hidden"
        >
          <div
            v-if="loading"
            class="w-full h-full flex items-center justify-center"
          >
            <div class="w-16 h-16 relative">
              <div
                class="absolute inset-0 border-4 border-youtube-hover rounded-full"
              ></div>
              <div
                class="absolute inset-0 border-4 border-t-youtube-red rounded-full animate-spin"
              ></div>
            </div>
          </div>
          <div v-else class="w-full h-full relative">
            <img
              :src="currentContent.backdropUrl || currentContent.thumbnailUrl"
              :alt="currentContent.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <button
                class="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center group transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-10 h-10 fill-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Video info -->
        <div v-if="currentContent" class="mb-6">
          <h1 class="text-xl font-medium text-youtube-white mb-2">
            {{ currentContent.title }}
          </h1>

          <!-- Stats -->
          <div
            class="flex flex-wrap items-center text-sm text-youtube-gray mb-4"
          >
            <span>{{ formatViewCount(currentContent.views || 2500000) }}</span>
            <span class="mx-1">&bull;</span>
            <span>{{ formatPublishDate(currentContent.year) }}</span>
            <span class="mx-1">&bull;</span>
            <span>{{ currentContent.rating }} Rating</span>
          </div>

          <!-- Action buttons -->
          <div
            class="flex flex-wrap gap-2 border-y border-youtube-border py-2 mb-4"
          >
            <button class="youtube-action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6c.27-1.24-.78-2.39-2.19-2.39zM7 20H4v-8h3v8zm12.98-6.83-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.13-.15.32-.22.53-.22.5 0 .8.4.66.79L12.77 11H20c.58 0 .98.49.91 1 0 .06-.01.12-.02.17z"
                />
              </svg>
              <span>{{ formatNumber(24500) }}</span>
            </button>

            <button class="youtube-action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M4 11h4.23l-1.52-4.94A2 2 0 0 1 9.67 3c.58 0 1.14.24 1.52.65L17 11h4v10h-4h-1H6.57a2 2 0 0 1-2.19-1.61l-1.34-6a2.25 2.25 0 0 1 .17-1.58A2.37 2.37 0 0 1 5.36 11H4zm14 0v8h3v-8h-3zm-6.78 0-5.6-6.06A.59.59 0 0 0 5.09 5c-.5 0-.8.4-.66.79L6.45 11h4.77z"
                  transform="rotate(180 12 12)"
                />
              </svg>
              <span>Dislike</span>
            </button>

            <button class="youtube-action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M15 5.63L20.66 12 15 18.37V15v-1H14c-1.31 0-2.8-.55-3.19-2.79a8.3 8.3 0 0 1 0-3.42V7h3a3 3 0 0 1 1.2.27V5.63M14 3a1 1 0 0 0-.51.13A5 5 0 0 0 11 3H9a1 1 0 0 0-1 1v3.8a9.91 9.91 0 0 0 .05 1.2A5 5 0 0 0 9 10v1a9.91 9.91 0 0 0-.05 1.2 5 5 0 0 0 .77 2.8A5 5 0 0 0 14 17v2a1 1 0 0 0 1.6.8l7-6a1 1 0 0 0 0-1.6l-7-6A1 1 0 0 0 15 7v2a3 3 0 0 1-1.2.27A3 3 0 0 1 14 5V3z"
                />
              </svg>
              <span>Share</span>
            </button>

            <button class="youtube-action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"
                />
              </svg>
              <span>Save</span>
            </button>

            <button class="youtube-action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
                />
              </svg>
            </button>
          </div>

          <!-- Channel info -->
          <div
            class="flex items-start justify-between border-b border-youtube-border pb-4"
          >
            <div class="flex">
              <div class="mr-3">
                <div
                  class="w-12 h-12 rounded-full overflow-hidden bg-youtube-hover"
                >
                  <div
                    class="w-full h-full flex items-center justify-center bg-youtube-red text-youtube-white text-xl font-medium"
                  >
                    {{ getContentTypeInitial() }}
                  </div>
                </div>
              </div>
              <div>
                <div class="flex items-center">
                  <h3 class="font-medium text-youtube-white">
                    {{ getContentType() }}
                  </h3>
                  <span v-if="currentContent.verified" class="ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-4 h-4 fill-youtube-gray"
                    >
                      <path
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-3.8-3.8L7.8 11.4l2.3 2.3 5.9-5.9 1.5 1.5-7.4 7.4z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="text-sm text-youtube-gray">
                  {{ formatNumber(2540000) }} subscribers
                </div>
              </div>
            </div>
            <button
              class="bg-youtube-red hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium transition-colors"
            >
              Subscribe
            </button>
          </div>

          <!-- Description -->
          <div class="mt-4 bg-youtube-hover p-3 rounded-lg text-sm">
            <p class="text-youtube-white whitespace-pre-line">
              {{ currentContent.description }}
            </p>
            <button class="mt-2 text-youtube-blue font-medium">
              Show more
            </button>
          </div>

          <!-- Comments section -->
          <div class="mt-6">
            <div class="flex items-center mb-4">
              <h3 class="text-lg font-medium text-youtube-white mr-2">
                Comments
              </h3>
              <span class="text-youtube-gray text-sm">{{
                formatNumber(1253)
              }}</span>
            </div>

            <!-- Comment input -->
            <div class="flex mb-6">
              <div
                class="w-10 h-10 rounded-full bg-youtube-blue text-youtube-white flex items-center justify-center mr-3 flex-shrink-0"
              >
                Y
              </div>
              <div class="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  class="w-full bg-transparent border-b border-youtube-border focus:border-youtube-white pb-1 outline-none text-youtube-white"
                />
              </div>
            </div>

            <!-- Sample comments -->
            <div class="space-y-4">
              <div
                v-for="(comment, index) in sampleComments"
                :key="index"
                class="flex"
              >
                <div
                  class="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0"
                >
                  <img
                    :src="comment.avatar"
                    :alt="comment.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="flex items-center">
                    <span class="font-medium text-youtube-white text-sm">{{
                      comment.name
                    }}</span>
                    <span class="text-youtube-gray text-xs ml-2">{{
                      comment.time
                    }}</span>
                  </div>
                  <p class="text-youtube-white text-sm mt-1">
                    {{ comment.text }}
                  </p>
                  <div class="flex items-center mt-2 text-youtube-gray text-sm">
                    <button class="flex items-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 mr-1 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6c.27-1.24-.78-2.39-2.19-2.39zM7 20H4v-8h3v8zm12.98-6.83-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.13-.15.32-.22.53-.22.5 0 .8.4.66.79L12.77 11H20c.58 0 .98.49.91 1 0 .06-.01.12-.02.17z"
                        />
                      </svg>
                      {{ comment.likes }}
                    </button>
                    <button class="mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M4 11h4.23l-1.52-4.94A2 2 0 0 1 9.67 3c.58 0 1.14.24 1.52.65L17 11h4v10h-4h-1H6.57a2 2 0 0 1-2.19-1.61l-1.34-6a2.25 2.25 0 0 1 .17-1.58A2.37 2.37 0 0 1 5.36 11H4zm14 0v8h3v-8h-3zm-6.78 0-5.6-6.06A.59.59 0 0 0 5.09 5c-.5 0-.8.4-.66.79L6.45 11h4.77z"
                          transform="rotate(180 12 12)"
                        />
                      </svg>
                    </button>
                    <button>Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related videos section -->
      <div class="w-full lg:w-96 lg:flex-shrink-0">
        <div class="flex mb-4 items-center">
          <button class="youtube-chip bg-youtube-white text-youtube-black">
            All
          </button>
          <button class="youtube-chip ml-2">Related</button>
          <button class="youtube-chip ml-2">From this channel</button>
        </div>

        <!-- Related videos list -->
        <div class="space-y-3">
          <div
            v-for="item in relatedContent"
            :key="item.id"
            class="flex cursor-pointer hover:bg-youtube-hover rounded-lg transition-all p-1"
            @click="navigateToContent(item.id, item.mediaType)"
          >
            <!-- Thumbnail -->
            <div class="w-40 flex-shrink-0 relative">
              <div class="aspect-video rounded overflow-hidden">
                <img
                  :src="item.thumbnailUrl || item.backdropUrl"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="absolute bottom-1 right-1 px-1 text-xs bg-black/80 text-white rounded"
              >
                {{ formatDuration(item.duration || 120) }}
              </div>
            </div>

            <!-- Video details -->
            <div class="ml-2 flex-1">
              <h3 class="text-sm font-medium text-youtube-white line-clamp-2">
                {{ item.title }}
              </h3>
              <div class="mt-1 text-xs text-youtube-gray">
                <div>{{ getContentTypeForItem(item) }}</div>
                <div class="flex items-center mt-1">
                  <span>{{ formatViewCount(item.views || 500000) }}</span>
                  <span class="mx-1">&bull;</span>
                  <span>{{ formatRelativeDate(item.year) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";

const route = useRoute();
const tmdbApi = useTmdbApi();

const contentId = computed(() => route.query.v);
const contentType = computed(() => route.query.type || "movie");
const loading = ref(true);
const currentContent = ref(null);
const relatedContent = ref([]);

// Sample comments
const sampleComments = [
  {
    name: "Movie Critic",
    avatar: "https://i.pravatar.cc/100?u=critic",
    time: "2 days ago",
    text: "This is one of the best films I've seen this year! The cinematography is absolutely stunning and the performances are incredible.",
    likes: 243,
  },
  {
    name: "Film Buff",
    avatar: "https://i.pravatar.cc/100?u=filmbuff",
    time: "1 week ago",
    text: "I loved the themes explored in this movie. The director really knows how to craft a compelling narrative that stays with you long after watching.",
    likes: 128,
  },
  {
    name: "Casual Viewer",
    avatar: "https://i.pravatar.cc/100?u=casual",
    time: "3 days ago",
    text: "Really entertaining! I was hooked from start to finish. Would definitely recommend to anyone looking for a good watch this weekend.",
    likes: 89,
  },
];

// Function to load content based on ID and type
async function loadContent() {
  loading.value = true;

  try {
    // Fetch content details based on type
    if (contentType.value === "movie") {
      currentContent.value = await tmdbApi.getMovieDetails(contentId.value);
    } else if (contentType.value === "tv") {
      currentContent.value = await tmdbApi.getTvShowDetails(contentId.value);
    }

    // Add random duration and views for demo
    if (currentContent.value) {
      currentContent.value.duration = Math.floor(Math.random() * 900) + 120;
      currentContent.value.views =
        Math.floor(Math.random() * 10000000) + 100000;
    }

    // Fetch related content - since TMDB doesn't have a direct "related" API
    // we'll use trending for now as a substitute
    const trending = await tmdbApi.getTrending(contentType.value, "week");

    // Exclude current content from related
    relatedContent.value = trending
      .filter((item) => item.id !== parseInt(contentId.value))
      .slice(0, 10);

    // Add random durations for demo
    relatedContent.value.forEach((item) => {
      item.duration = Math.floor(Math.random() * 900) + 60;
      item.views = Math.floor(Math.random() * 5000000) + 10000;
    });

    loading.value = false;
  } catch (error) {
    console.error("Error fetching content details:", error);
    loading.value = false;
  }
}

// Watch for route changes to reload content when navigating between videos
watch(
  () => route.fullPath,
  () => {
    loadContent();
  }
);

// Load content data on mount
onMounted(() => {
  loadContent();
});

// Format view count (e.g. 1.2M, 4.5K)
function formatViewCount(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M views";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K views";
  } else {
    return views + " views";
  }
}

// Format publish date
function formatPublishDate(year) {
  return `Released: ${year}`;
}

// Format relative date for related content
function formatRelativeDate(year) {
  // This is a simplified version since we don't have actual publish dates
  // In reality, you would use a proper date to calculate "X years ago"
  const currentYear = new Date().getFullYear();
  const yearDiff = currentYear - year;

  if (yearDiff <= 0) {
    return "This year";
  } else if (yearDiff === 1) {
    return "Last year";
  } else {
    return `${yearDiff} years ago`;
  }
}

// Format subscriber count
function formatSubscriberCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return count;
  }
}

// Format general numbers
function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

// Format duration (e.g. 10:30)
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }
}

// Get content type for display
function getContentType() {
  if (contentType.value === "movie") {
    return "Movie Channel";
  } else {
    return "TV Show Channel";
  }
}

// Get content type initial for avatar
function getContentTypeInitial() {
  if (contentType.value === "movie") {
    return "M";
  } else {
    return "T";
  }
}

// Get content type for related items
function getContentTypeForItem(item) {
  if (item.mediaType === "movie") {
    return "Movie Channel";
  } else {
    return "TV Show Channel";
  }
}

// Navigate to content
function navigateToContent(id, type) {
  navigateTo(`/watch?v=${id}&type=${type}`);
}
</script>

<style scoped>
.youtube-chip {
  @apply px-3 py-1.5 rounded-full text-sm whitespace-nowrap bg-youtube-hover text-youtube-white hover:bg-youtube-border transition-colors;
}

.youtube-action-btn {
  @apply flex items-center space-x-2 px-3 py-2 rounded-full text-youtube-white hover:bg-youtube-hover transition-colors;
}
</style>
