import React from "react";
import { useAudio } from "../context/AudioContext"; // adjust path if needed

/**
 * PersistentAudioPlayer
 * Global audio player fixed at the bottom of the screen.
 * Uses audio state from AudioContext.
 */
export default function PersistentAudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    togglePlayPause,
    audioRef,
  } = useAudio();

  if (!currentEpisode) return null;

  return (
    <div style={styles.playerContainer}>
      <div style={styles.info}>
        <strong>{currentEpisode.title || "Untitled Episode"}</strong>
      </div>

      {/* Hidden audio element controlled via ref */}
      <audio ref={audioRef} src={currentEpisode.file} style={{ display: "none" }} />

      <button style={styles.playPauseBtn} onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

const styles = {
  playerContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#222",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
  },
  info: {
    fontSize: "1rem",
  },
  playPauseBtn: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
  },
};
