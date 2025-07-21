import React from "react";// Import React to define the functional component

/**
 * AudioPlayer Component
 * Plays a podcast episode using HTML5 audio.
 * Falls back to placeholder audio if no valid episode file is available.
 *
 * @param {Object} props
 * @param {string} props.src - URL of the audio file to play.
 * @returns JSX.Element
 */
const AudioPlayer = ({ src }) => {
     // Check if the provided src is the default placeholder audio
  const isPlaceholder =
    src === "https://podcast-api.netlify.app/placeholder-audio.mp3";

  return (
    <div className="audioPlayer">
         {/* HTML5 audio element with browser-native controls */}
      <audio controls>
        <source src={src} type="audio/mpeg" />
         {/* Fallback text if audio element isn't supported */}
        Your browser does not support the audio element.
      </audio>
       {/* Optional message shown when using the placeholder audio */}
      {isPlaceholder && (
        <p className="note">This is a sample placeholder audio.</p>
      )}
    </div>
  );
};

export default AudioPlayer;// Export component for use in other parts of the app
