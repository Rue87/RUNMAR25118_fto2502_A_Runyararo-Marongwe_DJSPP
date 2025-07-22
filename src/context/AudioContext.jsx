import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect
} from "react";
import { mockFavorites } from "../utils/mockFavorites"; 


/**
 * @typedef {Object} Episode
 * @property {string} title - Title of the episode
 * @property {string} file - URL to the audio file
 * @property {string} [description] - Optional description
 */

// Create a context to share audio state globally
const AudioContext = createContext();

/**
 * AudioProvider component
 * Wraps around your app to provide audio playback state and controls globally.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The components wrapped by this provider
 * @returns {JSX.Element}
 */
// AudioProvider component wraps around the app and provides context values
export function AudioProvider({ children }) {
  // Ref to the HTML5 audio element
  const audioRef = useRef(new Audio());

  // The currently playing episode
  const [currentEpisode, setCurrentEpisode] = useState(null);// This holds the episode

  // Whether audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

   // Initialize favourites from localStorage or fallback to mockFavorites
  const [favourites, setFavourites] = useState(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem("favourites");
     // If found, parse and use it, otherwise use empty array
    return stored ? JSON.parse(stored) :  mockFavorites;
  });

   //  Sync favourites to localStorage every time it changes
  useEffect(() => {
    // Save the latest favourites to localStorage as a string
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]); // This runs every time 'favourites' changes


  // Toggle favourite: Add if not present, remove if already favourited
const toggleFavourite = (episode) => {
  setFavourites(prev => {
    // Check if episode is already in favourites (based on title & description)
    const isFav = prev.some(
      f => f.title === episode.title && f.description === episode.description
    );

    const updated = isFav
      ? prev.filter(f => !(f.title === episode.title && f.description === episode.description))
      : [...prev, episode];

   // localStorage.setItem("favourites", JSON.stringify(updated));
    return updated;
  });
};
// 👇 ADD THIS useEffect block inside your provider
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome and modern browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]); // Dependency to re-run only if isPlaying changes



  /**
   * Play a given episode.
   * If it's a new episode, load and play it. If same episode, just resume.
   *
   * @param {Episode} episode - The episode object to play
   */
 
  const playEpisode = (episode, playlistArray = [], index = -1) => {
  if (!audioRef.current) return;

  if (currentEpisode?.file !== episode.file) {
    // It's a new episode
    audioRef.current.src = episode.file;
    audioRef.current.play();
    setCurrentEpisode(episode);
    setIsPlaying(true);

    if (playlistArray.length > 0) {
      setPlaylist(playlistArray);
      setCurrentIndex(index);
    }

    console.log("🎧 Playing new episode:", episode.title);
  } else {
    // Same episode, resume play
    audioRef.current.play();
    setIsPlaying(true);

    console.log("▶️ Resuming episode:", episode.title);
  }
};

/**
   * Pause the currently playing audio
   */
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  /**
   * Toggle between play and pause
   */
  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  //  Increase volume in steps (up to 1.0)
  const increaseVolume = () => {
    const newVolume = Math.min(audioRef.current.volume + 0.1, 1);
    audioRef.current.volume = newVolume;
    console.log("Volume increased to:", newVolume.toFixed(2));
  };

   //  Decrease volume in steps (down to 0.0)
  const decreaseVolume = () => {
    const newVolume = Math.max(audioRef.current.volume - 0.1, 0);
    audioRef.current.volume = newVolume;
    console.log("Volume decreased to:", newVolume.toFixed(2));
  };

    const playNext = () => {
    console.log("playNext called", { currentIndex, playlistLength: playlist.length });
    if (playlist.length === 0 || currentIndex < 0) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < playlist.length) {
      const nextEpisode = playlist[nextIndex];
      setCurrentIndex(nextIndex);
      playEpisode(nextEpisode, playlist, nextIndex);
    } else {
      console.log(" End of playlist.");
    }
  };

  const playPrevious = () => {
     console.log("playPrevious called", { currentIndex, playlistLength: playlist.length });

    if (playlist.length === 0 || currentIndex <= 0) {
         console.log("No playlist or at start, skipping playPrevious");
        return;
    }
    const prevIndex = currentIndex - 1;
    const prevEpisode = playlist[prevIndex];
     console.log("Playing previous episode:", prevEpisode.title, "at index", prevIndex);
    setCurrentIndex(prevIndex);
    playEpisode(prevEpisode, playlist, prevIndex);
  };

  // Provide all audio-related state and functions to the rest of the app
  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        playEpisode,
        pause,
        togglePlayPause,
        audioRef,
        increaseVolume, 
        decreaseVolume,
        playNext,
        playPrevious,
        playlist,
        currentIndex,
        favourites,
        toggleFavourite
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

/**
 * Custom hook to access the audio context
 * @returns {Object} Audio state and controls
 */
//export const useAudio = () => useContext(AudioContext);
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
export { AudioContext };