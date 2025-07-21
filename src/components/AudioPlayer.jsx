{/*import React, { useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import "./AudioPlayer.css";



const AudioPlayer = () => {
  const {
    audioRef,
    isPlaying,
    togglePlayPause,
    currentEpisode,
    currentTime,
    duration,
    handleTimeUpdate,
    handleVolumeChange,
  } = useContext(AudioContext);

  if (!currentEpisode) return null;

  return (
    <div className="audioPlayer">
      {/* Left: Cover Art + Titles */}
    {/*<div className="audioLeft">
        <img
          src={currentEpisode.image || "/default-cover.jpg"}
          alt="cover"
          className="coverArt"
        />
        <div className="titles">
          <div className="episodeTitle">{currentEpisode.title}</div>
          <div className="podcastTitle">{currentEpisode.podcastTitle}</div>
        </div>
      </div>

      {/* Center: Play + Progress + Time */}
     {/* <div className="audioCenter">
        <button className="playBtn" onClick={togglePlayPause}>
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <div className="progressWrapper">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleTimeUpdate}
            className="progressBar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume */}
    {/* <div className="audioRight">
        <span className="speakerIcon">🔊</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
        />
      </div>

      <audio ref={audioRef} src={currentEpisode.file} />
    </div>
  );
};

{/*function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

//export default AudioPlayer;*/}
