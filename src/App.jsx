import { useEffect, useState } from "react";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import GenreFilter from "./components/GenreFilter";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import styles from "./App.module.css";
import ShowDetailPage from "./pages/ShowDetailPage";
import { Routes, Route } from "react-router-dom";
//import AudioPlayer from "./components/AudioPlayer";
import AudioPlayerBar from "./components/AudioPlayerBar";
import { AudioProvider } from './context/AudioContext'; 

/**
 * Root component of the Podcast Explorer app.
 * Handles data fetching and layout composition.
 */
export default function App() {

    /**
   * State to hold podcast list, loading status, and errors.
   */
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function load() {
    setLoading(true);
    const { data, error } = await fetchPodcasts();
    if (data) setPodcasts(data);
    if (error) setError(error);
    setLoading(false);
  }
  load();
}, []);


  //useEffect(() => {
  //  fetchPodcasts(setPodcasts, setError, setLoading);
  //}, []);
useEffect(() => {
  if (podcasts.length) {
    console.log("Podcasts updated:", podcasts);
  }
}, [podcasts]);
  return (
    <AudioProvider>
    
      <Header />

      <PodcastProvider initialPodcasts={podcasts}>
 <main className={styles.main}>
          {/* Show loading spinner */}
          {loading && (
            <div className={styles.messageContainer}>
              <div className={styles.spinner}></div>
              <p>Loading podcasts...</p>
            </div>
          )}

          {/* Show error message */}
          {error && (
            <div className={styles.message}>
              <div className={styles.error}>
                Error occurred while fetching podcasts: {error}
              </div>
            </div>
          )}

          {/* Only show routes when not loading and no error */}
          {!loading && !error && (
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <section className={styles.controls}>
                      <SearchBar />
                      <GenreFilter genres={genres} />
                      <SortSelect />
                    </section>
                    <PodcastGrid />
                    <Pagination />
                  </>
                }
              />
              <Route path="/shows/:id" element={<ShowDetailPage />} />
            </Routes>
          )}
        </main>
        

        {/*<main className={styles.main}>
          <section className={styles.controls}>
            <SearchBar />
            <GenreFilter genres={genres} />
            <SortSelect />
          </section>

          {loading && (
            <div className={styles.messageContainer}>
              <div className={styles.spinner}></div>
              <p>Loading podcasts...</p>
            </div>
          )}

          {error && (
            <div className={styles.message}>
              <div className={styles.error}>
                Error occurred while fetching podcasts: {error}
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              <PodcastGrid genres={genres} />
              <Pagination />
            </>
          )}
        </main>*/}
        <AudioPlayerBar />
        </PodcastProvider>
          </AudioProvider>
    
  );
}
