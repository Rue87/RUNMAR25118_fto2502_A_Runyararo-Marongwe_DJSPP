import React from "react";
import { useAudio } from "../context/AudioContext";
import FavoriteHeart from "../components/FavoriteHeart";
//import { usePodcast } from "../context/PodcastContext";
/**
 * FavouritesPage Component
 * Displays a list of the user's favourited podcast episodes, with options to play or unfavourite.
 *
 * @component
 * @returns {JSX.Element} A list of favourite episodes or a message if none exist.
 */

export default function FavouritesPage() {
  const { favourites, playEpisode } = useAudio();

   // `favourites`: array of favourited episode objects
  // `playEpisode`: function to start playing a selected episode

  // If there are no favourited episodes, show a message
  if (favourites.length === 0) {
    return <p>You have no favourited episodes yet.</p>;
  }

  return (
    <div>
      <h2>Your Favourited Episodes</h2>
      <ul>
        {favourites.map((ep, i) => (
          <li key={ep.file || i} style={{ marginBottom: "1rem" }}>
            <h3>{ep.title || "Untitled Episode"}</h3>
            <p>{ep.description || "No description available."}</p>
            <button onClick={() => playEpisode(ep)}>▶️ Play</button>
            <FavoriteHeart episode={ep} />
          </li>
        ))}
      </ul>
    </div>
  );
}
