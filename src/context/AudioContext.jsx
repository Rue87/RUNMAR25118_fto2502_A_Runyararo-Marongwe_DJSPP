import React, {
  createContext,
  useState,
  useRef,
  useContext
} from "react";

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
export function AudioProvider({ children }) {
  // Ref to the HTML5 audio element
  const audioRef = useRef(new Audio());

  // The currently playing episode
  const [currentEpisode, setCurrentEpisode] = useState(null);

  // Whether audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Play a given episode.
   * If it's a new episode, load and play it. If same episode, just resume.
   *
   * @param {Episode} episode - The episode object to play
   */
  const playEpisode = (episode) => {
    if (!episode?.file) return; // Guard clause if no valid episode

    // If it's a different episode, load new source and play
    if (currentEpisode?.file !== episode.file) {
      setCurrentEpisode(episode);
      audioRef.current.src = episode.file;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // Same episode, just resume
      audioRef.current.play();
      setIsPlaying(true);
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

  // Provide all audio-related state and functions to the rest of the app
  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        playEpisode,
        pause,
        togglePlayPause,
        audioRef
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