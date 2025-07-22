import React from "react";
import { useAudio } from "../context/AudioContext"; 

/**
 * FavoriteHeart shows a heart icon that toggles favorite status for an episode.
 * @param {Object} props
 * @param {Object} props.episode - The episode object to favorite/unfavorite
 */
function FavoriteHeart({ episode }) {
  const { favourites, toggleFavourite } = useAudio();
  const isFavorite = favourites.some(
  fav => fav.title === episode.title && fav.description === episode.description
);

//const isFavorite = favourites.some(fav => fav.id === episode.id);
  //const isFavorite = favourites.some(fav => fav.file === episode.file);
console.log("Rendering heart for:", episode.file, "isFavorite:", isFavorite);
  return (
    <button
      onClick={() => toggleFavourite(episode)}
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
