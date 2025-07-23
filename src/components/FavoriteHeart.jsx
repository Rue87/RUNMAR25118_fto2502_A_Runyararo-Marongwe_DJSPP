import React from "react";
import { useAudio } from "../context/AudioContext"; 

/**
 * FavoriteHeart shows a heart icon that toggles favorite status for an episode.
 * @param {Object} props
 * @param {Object} props.episode - The episode object to favorite/unfavorite
 *  @param {string} props.showTitle - Title of the podcast show
 * @param {number|string} props.seasonNumber - Season number
 * @param {number|string} props.episodeNumber - Episode number
 */
 
function FavoriteHeart({ episode, showTitle = "", seasonNumber = "", episodeNumber = ""  }) {
  const { favourites, toggleFavourite } = useAudio();

  
  const isFavorite = favourites.some(
    fav =>
      fav.title === episode.title &&
      fav.description === episode.description &&
      fav.season === seasonNumber &&
      fav.episode === episodeNumber &&
      fav.showTitle === showTitle
  );
   const handleClick = () => {
    toggleFavourite(episode, showTitle, seasonNumber, episodeNumber);
  };

 {/*} const isFavorite = favourites.some(
  fav => fav.title === episode.title && fav.description === episode.description
);*/}

//const isFavorite = favourites.some(fav => fav.id === episode.id);
  //const isFavorite = favourites.some(fav => fav.file === episode.file);
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
