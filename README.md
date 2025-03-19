# YouTube-Style Netflix Clone

A learning project that combines the content of Netflix with the interface of YouTube. This application was built solely for educational purposes to demonstrate modern web development techniques using Nuxt 3, Tailwind CSS, and The Movie Database (TMDb) API.

## ⚠️ Educational Disclaimer

**This is NOT a real application or service.** This project was created strictly as a coding exercise to:

- Learn and practice modern front-end development
- Understand API integration with third-party services
- Implement responsive design patterns
- Experiment with UI/UX concepts by combining different interface styles

The application does not stream actual content and is not intended for commercial use.

## 🌟 Features

- 📱 Fully responsive design that works on mobile, tablet, and desktop
- 🎥 YouTube-style interface for browsing Netflix-style content
- 🔍 Search functionality to find movies and TV shows
- 🏷️ Category filtering with YouTube-style chips
- 📺 Movie and TV show details in a YouTube-inspired watch page
- 👁️ Related content recommendations
- 📝 Comment section (simulated)
- 📚 Sidebar navigation with active state handling
- 🔄 Dynamic content loading

## 🔧 Tech Stack

- **Frontend Framework**: [Nuxt 3](https://nuxt.com/) (Vue.js)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content API**: [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- NPM or Yarn
- TMDb API Key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository

```bash
git clone https://github.com/MengesJean/netflix-clone.git
cd netflix-clone
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your TMDb API key

```
NUXT_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
netflix-clone-nuxt/
├── components/             # Reusable Vue components
│   ├── layout/            # Layout components (navbar, sidebar)
│   └── videos/            # Video-related components
├── composables/            # Reusable Vue composables (API services)
├── layouts/                # Application layouts
├── pages/                  # Application pages/routes
├── assets/                 # Static assets (CSS, images)
├── public/                 # Public static files
├── .env                    # Environment variables
├── nuxt.config.ts          # Nuxt configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 📚 Learning Objectives

This project was built to learn and demonstrate:

1. **Component-based architecture** using Vue 3 and Nuxt 3
2. **Responsive design** implementation with Tailwind CSS
3. **API integration** with external data sources
4. **State management** in a modern frontend application
5. **Routing** and navigation with dynamic parameters
6. **UI/UX design** principles by combining familiar interfaces
7. **Composable pattern** for reusable logic

## ⚖️ Legal Disclaimer

This project is for educational purposes only. It is not affiliated with, endorsed by, or connected to Netflix or YouTube in any way. All content displayed is sourced from The Movie Database (TMDb) API under fair use for educational demonstration.

All product names, logos, and brands are property of their respective owners. All company, product and service names used in this project are for identification and educational purposes only.
