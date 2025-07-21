// components/AudioPlayerBar.jsx

import React, { useEffect, useState } from "react";
import { useAudio } from "../context/AudioContext";
import "./AudioPlayerBar.css";

/**
 * AudioPlayerBar Component
 * A global audio player that appears fixed at the bottom of the screen.
 * Shows currently playing episode, play/pause controls, progress, and volume.
 *
 * @component
 * @returns {JSX.Element|null} The audio player bar, or null if no episode is selected.
 */
const AudioPlayerBar = () => {
    

  const {
    currentEpisode,   // Object representing the currently selected episode
    isPlaying,        // Boolean indicating whether the audio is playing
    togglePlayPause,
    playNext,
    playPrevious,  // Function to toggle play/pause state
    audioRef          // Ref to the underlying <audio> element
  } = useAudio();

  const [progress, setProgress] = useState(0);     // Current time in seconds
  const [duration, setDuration] = useState(0);     // Total duration of the audio

  useEffect(() => {
    const audio = audioRef.current;

    /**
     * Updates current playback progress.
     */
    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    /**
     * Sets duration when audio metadata is loaded.
     */
    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [audioRef]);

  if (!currentEpisode) return null;

  /**
   * Formats a number of seconds into mm:ss format.
   *
   * @param {number} time - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (time) =>
    isNaN(time)
      ? "0:00"
      : `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`;

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="audio-player-bar">
      {/* Left section: Episode art and titles */}
      <div className="episode-info">
        <img src="/cover.jpg" alt="Episode Art" className="cover" />
        <div>
          <h4>{currentEpisode.title}</h4>
          <p>Podcast Title</p>
        </div>
      </div>

      {/* Middle section: Play/Pause and progress bar */}
      <div className="player-controls">
        <div className="player-controls-buttons">
         <button onClick={playPrevious} className="prevBtn">⏮</button>

        <button onClick={togglePlayPause}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>

         <button onClick={playNext} className="nextBtn">⏭</button>
       </div>
        <div className="progress-container">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            value={progress}
            max={duration}
            onChange={(e) => {
              const newTime = Number(e.target.value);
              audioRef.current.currentTime = newTime;
              setProgress(newTime);
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right section: Volume icon (add slider later if needed) */}
      <div className="volume">
        🔊
      </div>
    </div>
  );
};

export default AudioPlayerBar;
