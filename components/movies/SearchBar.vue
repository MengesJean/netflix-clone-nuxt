<template>
  <div class="search-container">
    <div class="relative">
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Movies, TV shows, genres"
        class="w-full py-2 pl-10 pr-4 bg-netflix-dark rounded border border-netflix-gray focus:outline-none focus:border-netflix-red text-white"
      />
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-netflix-gray"
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
      </div>
      <button
        v-if="searchQuery.length > 0"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-netflix-gray hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const emit = defineEmits(["search", "clear"]);

const handleSearch = () => {
  if (searchQuery.value.trim().length > 0) {
    emit("search", searchQuery.value.trim());
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  emit("clear");
};
</script>
