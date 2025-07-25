# Podcast Discovery Web App

## Overview

This project is a portfolio-level technical assessment focused on a podcast browsing and listening experience. It demonstrates key front-end skills such as component architecture, global state management, persistent localStorage behavior, UI/UX polish, theme toggling, audio playback across routes, and deployability via Vercel.

##  Features

- **Global Audio Player**
  - Persistent audio player across all routes
  - Continues playback across page navigation
  - Supports play, pause, seek, and progress bar
  - Prompts user before reloading while playing audio

- **Favourites System**
  - Users can favourite/unfavourite episodes
  - Favourite state is persisted via localStorage
  - Favourites grouped by show
  - Shows associated season, episode, and added date
  - Sorting options by title(A-Z, Z-A)
 
- **Show Carousel**
  - Interactive horizontally scrolling carousel
  - Displays title, image, and genre tags
  - Loops continuously
  - Clicking a show navigates to its details page

- **Dark/Light Theme Toggle**
  - Toggle switch for theme selection
  - Theme state saved to localStorage
  - Smooth visual transition between modes
  - Theme is applied globally and consistently
  - Icon (sun/moon) reflects current mode

- **Routing & Refresh Resilience**
  - Fully functional react-router-dom setup
  - No crashes on route refresh (e.g., /shows/3)
  - Lazy loading and suspense for optimization

## Technologies Used
  - React (with Hooks)
  - React Router v6
  - CSS Modules for scoped styling
  - HTML5 <audio> + Ref for player control
  - LocalStorage for persistent UI preferences and state
  - Vercel for deployment
  - **metatags.io** for SEO & rich previews

## Getting Started

### Prerequisites
  - Node.js (v16 or higher)
  - npm or yarn

### Installation
git clone https://github.com/Rue87/RUNMAR25118_fto2502_A_Runyararo-Marongwe_DJSPP
cd RUNMAR25118_fto2502_A_Runyararo-Marongwe_DJSPP
npm install

### Run locally
npm run dev


##  Project Structure
```
.
├── public/
│   └── favicon.png
├── src/
│   ├── api/
│   │   ├── fetchPodcasts.js
│   │   └── fetchShowById.js
│   ├── components/
│   │   ├── AudioPlayerBar.css
│   │   ├── AudioPlayerBar.jsx
│   │   ├── AudioPlayer.jsx
│   │   ├── CarouselSlide.jsx
│   │   ├── CarouselSlide.module.css
│   │   ├── FavoriteHeart.jsx
│   │   ├── FavouriteEpisode.jsx
│   │   ├── GenreFilter.jsx
│   │   ├── GenreFilter.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── Pagination.jsx
│   │   ├── Pagination.module.css
│   │   ├── PersistentAudioPlayer.jsx
│   │   ├── PodcastCard.jsx
│   │   ├── Searchbar.jsx
│   │   ├── Searchbar.module.css
│   │   ├── ShowCarousel.jsx
│   │   ├── ShowCarousel.module.css
│   │   ├── SortSelect.jsx
│   │   └── SortSelect.module.css
│   ├── context/
│   │   ├── AudioContext.jsx
│   │   └── PodcastContext.jsx
│   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   ├── FavouritesPage.jsx
│   │   └── ShowDetailPage.jsx // Corrected to ShowDetailPage.jsx
│   ├── utils/
│   │   ├── formatDateTime.js    
│   │   ├── genreMap.js          
│   │   ├── mockFavorites.js     
│   │   └── truncateText.js      
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```
## How It Works
 - On initial load, the app fetches all podcast show data from the public API.
 - The fetched data is accessed throughout the app via state and passed into   various components.
 - react-router-dom handles navigation and deep linking across pages like /shows/:id and /favourites.
 - The theme toggle updates a class on <body>, with the selected mode saved to localStorage and applied on reload.
 - The audio player is controlled via useRef and React state, ensuring seamless playback across routes.
 - Favourites are stored and retrieved from localStorage, and episodes are grouped, displayed, and sorted on a dedicated page.

## Challenges Encountered
1. Persisting Audio Playback Across Routes
- **Challenge:** Maintaining a consistent audio experience when navigating between routes without restarting playback.
- **Solution:** Implemented a global <AudioContext> with a persistent <audio> element controlled via useRef, ensuring playback state survived route changes.

2. Routing and Deep Linking
- **Challenge:** Ensuring no crashes or 404s when refreshing direct URLs like /shows/3.
- **Solution:** Carefully configured react-router-dom and hosted on Vercel with rewrite rules to support client-side routing.

3. Favourites Persistence
- **Challenge:** Saving and retrieving favourited episodes reliably across sessions.
- **Solution:** Used localStorage to store favourites, and structured them by show and episode metadata for grouped display.

6. State Sync with UI Elements
- **Challenge:** Keeping global state (audio, theme, favourites) in sync with individual components (buttons, progress bars, icons).
- **Solution:** Leveraged custom hooks and context consumers with modular updates to avoid prop drilling and keep UI reactive.

PS:This project is open for collaboration.My contacts are just below.

## Contact
- **Name**: Runyararo Marongwe  
- **Email**: mrunya87@gmail.com  
- **GitHub**: [Rue87](https://github.com/Rue87)  
- **LinkedIn**: [Runyararo Marongwe](https://www.linkedin.com/in/runyararo-marongwe-24835279)

