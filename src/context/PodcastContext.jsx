//import React, { createContext, useEffect, useState } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPodcasts } from "../api/fetchPodcasts";//fetch from api
/**
 * @typedef Podcast
 * @property {number} id - Unique identifier
 * @property {string} title - Podcast title
 * @property {string} updated - Last updated ISO date string
 * @property {number[]} genres - Array of genre IDs
 * @property {string} image - URL to podcast artwork
 * @property {number} seasons - Number of seasons
 */
/**
 * Sorting options available to the user for viewing podcasts.
 * @type {{key: string, label: string}[]}
 */
export const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" },
];

/**
 * React context for sharing podcast state across components.
 * Must be used within a <PodcastProvider>.
 */

//create context
export const PodcastContext = createContext();

//Custom hook to use podcast context easily
export function usePodcastContext() {
  return useContext(PodcastContext); 
}
/**
 * PodcastProvider component wraps children in a context with state for
 * searching, sorting, filtering, and paginating podcast data.
 *
 * @param {{children: React.ReactNode, initialPodcasts: Podcast[]}} props
 * @returns {JSX.Element}
 */
export function PodcastProvider({ children,}) {
  const [initialPodcasts, setInitialPodcasts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");
  const [genre, setGenre] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);      

   useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await fetchPodcasts();
      if (data) setInitialPodcasts(data);
      if (error) setError(error);
      setLoading(false);
    }
    load();
  }, []);

 /**
   * Dynamically calculate how many cards can fit on screen.
   * Sets a fixed 10 cards for tablet and smaller screens.
   */
  useEffect(() => {
    const calculatePageSize = () => {
      const screenW = window.innerWidth;

      // Tablet and smaller (≤ 1024px): always show 10 cards
      if (screenW <= 1024) {
        setPageSize(10);
        return;
      }

      // For larger screens, calculate based on available width and 2 rows
      const cardWidth = 260;
      const maxRows = 2;
      const columns = Math.floor(screenW / cardWidth);
      const pageSize = columns * maxRows;

      setPageSize(pageSize);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  /**
   * Applies the current search query, genre filter, and sort key
   * to the list of podcasts.
   * @returns {Podcast[]} Filtered and sorted podcasts
   */
  const applyFilters = () => {
    let data = [...initialPodcasts];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (genre !== "all") {
      data = data.filter((p) => p.genres.includes(Number(genre)));
    }

    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case "default":
      default:
        break;
    }

    return data;
  };
  /** @type {Podcast[]} */
 
  const filtered = React.useMemo(() => applyFilters(), [initialPodcasts, search, genre, sortKey]);
const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
const currentPage = Math.min(page, totalPages);
const paged = React.useMemo(() => 
  filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  [filtered, currentPage, pageSize]
);


  useEffect(() => {
    setPage(1);
  }, [search, sortKey, genre]);

  const value = {
    search,
    setSearch,
    sortKey,
    setSortKey,
    genre,
    setGenre,
    page: currentPage,
    setPage,
    totalPages,
    podcasts: paged,
    filteredPodcasts: filtered, // full filtered list 
    allPodcastsCount: filtered.length,
  };

  

//Graceful handling of API states
 if (loading) {
    return <div>Loading podcasts...</div>; //show loading UI
  }

  if (error) {
    return <div>Error loading podcasts: {error}</div>; // show error UI
  }

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
