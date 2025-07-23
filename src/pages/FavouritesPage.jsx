import React from "react";
import { useAudio } from "../context/AudioContext";
import FavoriteHeart from "../components/FavoriteHeart";
import FavouriteEpisode from "../components/FavouriteEpisode";
import { formatDateTime } from "../utils/formatDate";

/**
 * FavouritesPage Component
 * Displays a list of the user's favourited podcast episodes, with options to play or unfavourite.
 *
 * @component
 * @returns {JSX.Element} A list of favourite episodes or a message if none exist.
 */
 
 /** 
 * @typedef {Object} Episode
 * @property {string} title - Title of the episode
 * @property {string} file - URL to the audio file
 * @property {string} [description] - Optional description
 * @property {string} [addedAt] - ISO date string of when the episode was added to favourites
*/

export default function FavouritesPage() {
  const { favourites, playEpisode } = useAudio();

  // `favourites`: array of favourited episode objects
  // `playEpisode`: function to start playing a selected episode

  // If there are no favourited episodes, show a message
  if (favourites.length === 0) {
    return <p>You have no favourited episodes yet.</p>;
  }
 // Group favourites by show title
  const groupedByShow = favourites.reduce((acc, ep) => {
    const show = ep.showTitle || "Unknown Show";// Fallback if show title is missing
    if (!acc[show]) acc[show] = [];// Create array for this show if not already present
    acc[show].push(ep);// Add the episode under this show's group
    return acc;
  }, {});

  return (
    <div>
      <h2>Your Favourited Episodes</h2>
        {/* Iterate through each show group */}
       {Object.entries(groupedByShow).map(([showTitle, episodes]) => (
      <div key={showTitle} className="show-group" style={{ marginBottom: "2rem" }}>
        <h3>{showTitle}</h3>
        <ul>
           {/* Render each episode under the show title */}
          {episodes.map((ep, i) => {
            console.log("Episode addedAt:", ep.addedAt);
            return (
              <li key={ep.file || i} style={{ marginBottom: "1rem" }}>
                 {/* Display season and episode number if available */}
                {(ep.season || ep.episode) && (
                  <p style={{ fontWeight: "bold", margin: "0.25rem 0" }}>
                    Season {ep.season || "?"}, Episode {ep.episode || "?"}
                  </p>
                )}
                 {/* Episode title and description */}
                <h4>{ep.title || "Untitled Episode"}</h4>
                <p>{ep.description || "No description available."}</p>
                  {/* Display when this was favourited */}
                <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#666" }}>
                  Added on: {ep.addedAt ? formatDateTime(ep.addedAt) : "Unknown date"}
                </p>
                   {/* Button to play the episode */}
                <button onClick={() => playEpisode(ep)}>▶️ Play</button>
                 {/* FavoriteHeart component allows toggling favourite state */}
                <FavoriteHeart 
                  episode={ep}
                  showTitle={ep.showTitle}
                  seasonNumber={ep.season}
                  episodeNumber={ep.episode}
                />
              </li>
            );
          })}
        </ul>
      {/*<ul>
        {favourites.map((ep, i) => {
           console.log("Episode addedAt:", ep.addedAt);
            return(
          <li key={ep.file || i} style={{ marginBottom: "1rem" }}>
             {/*Show Title */}
            {/*{ep.showTitle && <h3 style={{ margin: 0 }}>{ep.showTitle}</h3>}
             {/* Season + Episode Number */}
           {/* {(ep.season || ep.episode) && (
              <p style={{ fontWeight: "bold", margin: "0.25rem 0" }}>
                Season {ep.season || "?"}, Episode {ep.episode || "?"}
              </p>
            )}
            <h3>{ep.title || "Untitled Episode"}</h3>
            <p>{ep.description || "No description available."}</p>
            <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#666" }}>
  Added on: {ep.addedAt ? formatDateTime(ep.addedAt) : "Unknown date"}
</p>
            <button onClick={() => playEpisode(ep)}>▶️ Play</button>
            <FavoriteHeart 
            episode={ep}
            showTitle={ep.showTitle}
            seasonNumber={ep.season}
            episodeNumber={ep.episode} />
          </li>
        );
        })}
      </ul>*/}
    </div>
  ))}
    </div>
  );
}
