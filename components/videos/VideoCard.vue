<template>
  <div
    class="youtube-card overflow-hidden cursor-pointer hover:bg-youtube-hover rounded-lg transition-all duration-300"
    @click="navigateToVideo"
  >
    <!-- Thumbnail with duration -->
    <div class="relative aspect-video rounded-lg overflow-hidden group">
      <img
        :src="video.thumbnailUrl || video.backdropUrl"
        :alt="video.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <!-- Duration badge -->
      <div
        class="absolute bottom-1 right-1 px-1 py-0.5 text-xs font-medium bg-black/80 text-white rounded"
      >
        {{ formatDuration(video.duration || 120) }}
      </div>
      <!-- Progress bar (if watched) -->
      <div
        v-if="video.progress"
        class="absolute bottom-0 left-0 right-0 h-1 bg-youtube-red"
      >
        <div
          class="h-full bg-youtube-red"
          :style="`width: ${video.progress}%`"
        ></div>
      </div>
      <!-- Hover overlay -->
      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <button
          class="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-6 h-6 fill-white"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Video info -->
    <div class="flex p-3 gap-3">
      <!-- Channel avatar -->
      <div class="flex-shrink-0">
        <div class="w-9 h-9 rounded-full overflow-hidden bg-youtube-hover">
          <div
            class="w-full h-full flex items-center justify-center bg-youtube-red text-white"
          >
            {{ getContentTypeInitial() }}
          </div>
        </div>
      </div>

      <!-- Video details -->
      <div class="flex-1">
        <!-- Title -->
        <h3 class="text-sm font-medium text-youtube-white line-clamp-2 mb-1">
          {{ video.title }}
        </h3>

        <!-- Channel and stats -->
        <div class="text-xs text-youtube-gray">
          <div class="flex items-center">
            <span>{{ getContentType() }}</span>
            <span class="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-3.5 h-3.5 fill-youtube-gray"
              >
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-3.8-3.8L7.8 11.4l2.3 2.3 5.9-5.9 1.5 1.5-7.4 7.4z"
                />
              </svg>
            </span>
          </div>
          <div class="flex items-center gap-1">
            <span>{{ formatViewCount(video.views || 500000) }}</span>
            <span>&bull;</span>
            <span>{{ formatRelativeDate(video.year) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
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

// Format relative date based on year
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

// Get content type for display
function getContentType() {
  return props.video.mediaType === "movie"
    ? "Movie Channel"
    : "TV Show Channel";
}

// Get content type initial for avatar
function getContentTypeInitial() {
  return props.video.mediaType === "movie" ? "M" : "T";
}

// Navigate to video page
function navigateToVideo() {
  navigateTo(`/watch?v=${props.video.id}&type=${props.video.mediaType}`);
}
</script>
