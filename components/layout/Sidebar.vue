<template>
  <aside
    class="fixed left-0 top-14 h-[calc(100vh-56px)] bg-youtube-black border-r border-youtube-border z-40 transition-all duration-300"
    :class="{ 'w-64': expanded, 'w-20': !expanded }"
  >
    <div class="h-full overflow-y-auto overflow-x-hidden youtube-scrollbar">
      <!-- Main Navigation -->
      <nav class="py-2">
        <!-- For expanded sidebar -->
        <div v-if="expanded" class="space-y-1">
          <NuxtLink
            v-for="item in mainNavItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-2 hover:bg-youtube-hover text-youtube-white"
            :class="{
              'bg-youtube-hover font-medium': isActiveRoute(item.path),
            }"
          >
            <component :is="item.icon" class="h-6 w-6 mr-6" />
            <span>{{ item.name }}</span>
          </NuxtLink>
        </div>

        <!-- For collapsed sidebar -->
        <div v-else class="space-y-1">
          <NuxtLink
            v-for="item in mainNavItems"
            :key="item.path"
            :to="item.path"
            class="flex flex-col items-center justify-center px-2 py-4 hover:bg-youtube-hover text-youtube-white text-xs"
            :class="{
              'bg-youtube-hover font-medium': isActiveRoute(item.path),
            }"
          >
            <component :is="item.icon" class="h-6 w-6 mb-1" />
            <span class="text-[10px] mt-1">{{ item.name }}</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Divider -->
      <div class="my-2 border-b border-youtube-border"></div>

      <!-- Subscriptions -->
      <div v-if="expanded" class="py-2">
        <h3 class="px-4 py-1 text-sm font-medium uppercase text-youtube-gray">
          Subscriptions
        </h3>
        <div class="mt-2 space-y-1">
          <a
            v-for="channel in subscriptions"
            :key="channel.id"
            href="#"
            class="flex items-center px-4 py-2 hover:bg-youtube-hover text-youtube-white"
          >
            <div
              class="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-6 flex-shrink-0 overflow-hidden"
            >
              <span class="sr-only">{{ channel.name }}</span>
            </div>
            <span class="truncate">{{ channel.name }}</span>
          </a>
        </div>
      </div>

      <!-- Library section -->
      <div v-if="expanded" class="py-2">
        <div class="my-2 border-b border-youtube-border"></div>
        <h3 class="px-4 py-1 text-sm font-medium uppercase text-youtube-gray">
          Library
        </h3>
        <div class="mt-2 space-y-1">
          <NuxtLink
            v-for="item in libraryItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-2 hover:bg-youtube-hover text-youtube-white"
          >
            <component :is="item.icon" class="h-6 w-6 mr-6" />
            <span>{{ item.name }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Footer -->
      <div
        v-if="expanded"
        class="px-4 py-4 text-youtube-gray text-xs space-y-4"
      >
        <div class="space-x-2">
          <a href="#" class="hover:text-youtube-white">About</a>
          <a href="#" class="hover:text-youtube-white">Press</a>
          <a href="#" class="hover:text-youtube-white">Copyright</a>
        </div>
        <div class="space-x-2">
          <a href="#" class="hover:text-youtube-white">Terms</a>
          <a href="#" class="hover:text-youtube-white">Privacy</a>
          <a href="#" class="hover:text-youtube-white">Policy & Safety</a>
        </div>
        <p>© 2023 YouTube</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
const route = useRoute();
const expanded = defineProps({
  expanded: {
    type: Boolean,
    default: true,
  },
});

// Get the isActive function from the parent component
const isActive = inject("isActive", (path) => route.path === path);

// SVG Icon Components
const HomeIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M12 4.33l7 6.12V20h-4v-6H9v6H5v-9.55l7-6.12M12 3 4 10v11h6v-6h4v6h6V10l-8-7z"/></svg>`,
});

const ExploreIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M9.8 9.8l-3.83 8.23 8.23-3.83 3.83-8.23-8.23 3.83zm3.28.55c-.44.44-1.15.44-1.59 0-.44-.44-.44-1.15 0-1.59.44-.44 1.15-.44 1.59 0 .44.44.44 1.15 0 1.59zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
});

const ShortsIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"/></svg>`,
});

const SubscriptionsIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"/></svg>`,
});

const LibraryIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M11 7l6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"/></svg>`,
});

const HistoryIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"/></svg>`,
});

const YourVideosIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="m10 8 6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"/></svg>`,
});

const WatchLaterIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/></svg>`,
});

const LikedVideosIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6c.27-1.24-.78-2.39-2.19-2.39zM7 20H4v-8h3v8zm12.98-6.83-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.13-.15.32-.22.53-.22.5 0 .8.4.66.79L12.77 11H20c.58 0 .98.49.91 1 0 .06-.01.12-.02.17z"/></svg>`,
});

const MoviesIcon = defineComponent({
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
});

// Navigation items
const mainNavItems = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Explore", path: "/explore", icon: ExploreIcon },
  { name: "Movies", path: "/explore?category=movies", icon: MoviesIcon },
  { name: "TV Shows", path: "/explore?category=tv", icon: SubscriptionsIcon },
  { name: "Trending", path: "/explore?category=trending", icon: ShortsIcon },
  { name: "Library", path: "/library", icon: LibraryIcon },
];

const libraryItems = [
  { name: "History", path: "/history", icon: HistoryIcon },
  { name: "Watch Later", path: "/playlist?list=WL", icon: WatchLaterIcon },
  { name: "Liked Movies", path: "/playlist?list=LL", icon: LikedVideosIcon },
  {
    name: "Action & Adventure",
    path: "/explore?category=action",
    icon: YourVideosIcon,
  },
  { name: "Comedy", path: "/explore?category=comedy", icon: YourVideosIcon },
  { name: "Drama", path: "/explore?category=drama", icon: YourVideosIcon },
];

// Sample subscriptions data - replaced with genre channels
const subscriptions = [
  { id: 1, name: "Action Channel" },
  { id: 2, name: "Comedy Central" },
  { id: 3, name: "Drama Productions" },
  { id: 4, name: "Sci-Fi Universe" },
  { id: 5, name: "Horror Films" },
];

// Check if the current route matches the nav item, handling query params
function isActiveRoute(path) {
  // Check for query parameters in the path
  if (path.includes("?")) {
    const [basePath, queryString] = path.split("?");
    const params = new URLSearchParams(queryString);
    const query = {};

    for (const [key, value] of params.entries()) {
      query[key] = value;
    }

    // If we're on the right path and have matching query params
    if (route.path === basePath) {
      if (Object.keys(query).length > 0) {
        const queryKey = Object.keys(query)[0];
        return route.query[queryKey] === query[queryKey];
      }
      return true;
    }
    return false;
  }

  // Simple path matching
  return route.path === path;
}
</script>

<style scoped>
.youtube-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.youtube-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.youtube-scrollbar::-webkit-scrollbar-thumb {
  background: #717171;
  border-radius: 4px;
}

.youtube-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #888;
}
</style>
