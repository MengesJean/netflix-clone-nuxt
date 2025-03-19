<template>
  <div class="min-h-screen bg-youtube-black">
    <!-- YouTube-style navbar -->
    <LayoutNavbar @toggle-sidebar="toggleSidebar" />

    <!-- YouTube-style sidebar -->
    <LayoutSidebar :expanded="sidebarExpanded" />

    <!-- Main content -->
    <main
      class="pt-14 min-h-screen transition-all duration-300"
      :class="{
        'md:pl-64': sidebarExpanded,
        'md:pl-20': !sidebarExpanded,
        'pl-0': true,
      }"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
const sidebarExpanded = ref(true);

function toggleSidebar() {
  sidebarExpanded.value = !sidebarExpanded.value;
}

// Helper to check if route is active, considering query params
function isActive(path, query) {
  // For simple path matches
  if (!query && route.path === path) {
    return true;
  }

  // For path with query parameters
  if (query && route.path === path) {
    const queryParam = Object.keys(query)[0];
    const queryValue = query[queryParam];
    return route.query[queryParam] === queryValue;
  }

  return false;
}

// Provide isActive function to child components
provide("isActive", isActive);
</script>

<style scoped>
.page-transition {
  animation: fadeInPage 0.5s ease-out;
}

@keyframes fadeInPage {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Subtle noise background for texture */
.bg-noise {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=");
  background-repeat: repeat;
}
</style>
