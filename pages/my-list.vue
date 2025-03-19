<template>
  <NuxtLayout name="default">
    <div class="min-h-screen pt-20">
      <div class="container mx-auto px-8 md:px-16">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <h1 class="text-3xl md:text-4xl font-bold">My List</h1>

          <!-- Search Form -->
          <div class="flex items-center">
            <div class="relative w-full md:w-80">
              <input
                v-model="searchQuery"
                @keyup.enter="searchContent"
                type="text"
                placeholder="Search for movies or TV shows"
                class="bg-netflix-dark text-white w-full py-2 pl-10 pr-4 rounded border border-netflix-gray focus:outline-none focus:border-netflix-red"
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-netflix-gray"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <button
              @click="searchContent"
              class="ml-2 bg-netflix-red hover:bg-opacity-80 text-white p-2 rounded"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="showSearchResults" class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Search Results</h2>
            <button
              @click="showSearchResults = false"
              class="text-netflix-gray hover:text-white"
            >
              Close
            </button>
          </div>

          <div v-if="isSearching" class="flex justify-center py-10">
            <div class="w-10 h-10">
              <svg
                class="animate-spin h-full w-full text-netflix-red"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>

          <div v-else-if="searchResults.length === 0" class="text-center py-8">
            <p class="text-netflix-gray">
              No results found. Try different keywords.
            </p>
          </div>

          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <div
              v-for="(item, index) in searchResults"
              :key="index"
              class="netflix-card relative"
            >
              <img
                :src="item.thumbnailUrl"
                :alt="item.title"
                class="w-full h-auto object-cover"
              />
              <div class="p-2">
                <h3 class="text-sm font-medium truncate">{{ item.title }}</h3>
                <div
                  class="flex items-center text-xs text-netflix-lightGray mt-1"
                >
                  <span>{{ item.year }}</span>
                  <span class="mx-1">•</span>
                  <span>{{
                    item.mediaType === "movie" ? "Movie" : "TV Show"
                  }}</span>
                </div>
              </div>
              <button
                @click="addToMyList(item)"
                class="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1 hover:bg-netflix-red transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- My List Content -->
        <div v-if="myList.length === 0" class="text-center py-16">
          <p class="text-netflix-gray text-xl mb-4">Your list is empty</p>
          <p class="text-netflix-lightGray mb-8">
            Search for movies and shows to add them to your list
          </p>
        </div>

        <div v-else>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <div
              v-for="(item, index) in myList"
              :key="index"
              class="netflix-card relative"
            >
              <img
                :src="item.thumbnailUrl"
                :alt="item.title"
                class="w-full h-auto object-cover"
              />
              <div class="p-2">
                <h3 class="text-sm font-medium truncate">{{ item.title }}</h3>
                <div
                  class="flex items-center text-xs text-netflix-lightGray mt-1"
                >
                  <span>{{ item.year }}</span>
                  <span class="mx-1">•</span>
                  <span>{{ item.type }}</span>
                </div>
              </div>
              <button
                @click="removeFromMyList(index)"
                class="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1 hover:bg-netflix-red transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const tmdbApi = useTmdbApi();

// Search state
const searchQuery = ref("");
const searchResults = ref([]);
const isSearching = ref(false);
const showSearchResults = ref(false);

// My list state (using localStorage in a real app)
const myList = ref([
  {
    title: "Stranger Things",
    thumbnailUrl:
      "https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABf2JfL0KO049JlNtRS7XvRtUQvas0RHwohNHHs-wrYFYe1jjzJ-4kA4saINUwJBR7_3AZw1VSbOu92JxsOwsT1tjO01M1lf3zC1a.jpg?r=93f",
    year: 2022,
    type: "Series",
  },
  {
    title: "The Witcher",
    thumbnailUrl:
      "https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABdpHnOnGkwMazQQFET2YULJOuCUtGZ-jo6bXN2-QYVNQUZcBUjZ-kpbWzEWUUCi6Y-YhPyxW6LfaHG7Q269druO1jc1C0gU4vKI.jpg?r=df1",
    year: 2023,
    type: "Series",
  },
  {
    title: "The Irishman",
    thumbnailUrl:
      "https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABaUyF3kexjPto1IHIhDpmIYadqvYLEIQIyDx7IVyl7YtRDkBX2sBP1jAGkCtDWJrHR4oWB8vTB-Uq7-tmNlmCDVAYR-A4Ro1hkRLaY8Z4JnCPP0aBIqM0aCJKmiU.jpg?r=a89",
    year: 2019,
    type: "Movie",
  },
]);

// Search for content
const searchContent = async () => {
  if (!searchQuery.value.trim()) return;

  isSearching.value = true;
  showSearchResults.value = true;
  searchResults.value = [];

  try {
    const results = await tmdbApi.searchMulti(searchQuery.value);
    searchResults.value = results.map((item) => ({
      id: item.id,
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
      year: item.year,
      mediaType: item.mediaType,
    }));
  } catch (error) {
    console.error("Error searching content:", error);
  } finally {
    isSearching.value = false;
  }
};

// Add item to my list
const addToMyList = (item) => {
  // Check if already in list
  const existingItem = myList.value.find(
    (listItem) => listItem.title === item.title
  );

  if (!existingItem) {
    myList.value.push({
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
      year: item.year,
      type: item.mediaType === "movie" ? "Movie" : "Series",
    });

    // In a real app, you would save to a backend or localStorage
    // localStorage.setItem('myList', JSON.stringify(myList.value));
  }
};

// Remove item from my list
const removeFromMyList = (index) => {
  myList.value.splice(index, 1);

  // In a real app, you would save to a backend or localStorage
  // localStorage.setItem('myList', JSON.stringify(myList.value));
};

// In a real app, load from localStorage on component mount
// onMounted(() => {
//   const savedList = localStorage.getItem('myList');
//   if (savedList) {
//     myList.value = JSON.parse(savedList);
//   }
// });
</script>
