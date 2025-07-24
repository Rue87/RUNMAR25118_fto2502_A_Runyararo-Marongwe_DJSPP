import React from "react";
import { useAudio } from "../context/AudioContext";//Pulls in custom context for audio and favourites
 
/**
 * FavoriteHeart shows a heart icon that toggles favorite status for an episode.
 * @param {Object} props
 * @param {Object} props.episode - The episode object to favorite/unfavorite
 * @param {string} props.showTitle - Title of the podcast show
 * @param {number|string} props.seasonNumber - Season number
 * @param {number|string} props.episodeNumber - Episode number
 */
 
function FavoriteHeart({ episode, showTitle = "", seasonNumber = "", episodeNumber = ""  }) {
  //Access the favourites state and toggle function from the AudioContext
  const { favourites, toggleFavourite } = useAudio();

  //Check if this specific episode is already marked as favorite
  const isFavorite = favourites.some(
    fav =>
      fav.title === episode.title &&
      fav.description === episode.description &&
      fav.season === seasonNumber &&
      fav.episode === episodeNumber &&
      fav.showTitle === showTitle
  );

  /**
   * Handle click on heart icon to toggle favorite status.
   */
   const handleClick = () => {
    toggleFavourite(episode, showTitle, seasonNumber, episodeNumber);
  };

console.log("Rendering heart for:", episode.file, "isFavorite:", isFavorite);
  return (
    <button
      //onClick={() => toggleFavourite(episode, show.title, season.number, episodeIndex + 1)}
      onClick={handleClick}
      aria-label={isFavorite ? "Unmark favorite" : "Mark as favorite"}
      style={{
        cursor: "pointer",
        color: isFavorite ? "red" : "gray",
        border: "none",
        background: "none",
        fontSize: "1.5rem",
        padding: 0,
        marginLeft: "0.5rem",
      }}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteHeart;
