import React from "react";
import { useAudio } from "../context/AudioContext";
import FavoriteHeart from "../components/FavoriteHeart";
import { formatDateTime } from "../utils/formatDate";
import { usePodcastContext } from "../context/PodcastContext";

/**
 * FavouritesPage Component
 * Displays a list of the user's favourited podcast episodes,
 * grouped by show title, sortable by episode title.
 */
export default function FavouritesPage() {
  const { favourites, playEpisode } = useAudio();
  const { sortKey } = usePodcastContext();
  
  console.log("Sorted favourites with addedAt timestamps:");
favourites.forEach((ep) =>
  console.log(`${ep.title} - addedAt: ${ep.addedAt}`)
);


   console.log("Favourites list:", favourites);
  
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

      {/* Iterate over each show group */}
      {Object.entries(groupedByShow).map(([showTitle, episodes]) => {
        // Sort episodes by title according to sortKey
        const sortedEpisodes = [...episodes].sort((a, b) => {
          if (sortKey === "titleAsc" || sortKey === "title-asc") {
            return a.title.localeCompare(b.title);
          } else if (sortKey === "titleDesc" || sortKey === "title-desc") {
            return b.title.localeCompare(a.title);
          }else if (sortKey === "addedNewest") {
            return new Date(b.addedAt) - new Date(a.addedAt); // newest first
          } else if (sortKey === "addedOldest") {
            return new Date(a.addedAt) - new Date(b.addedAt); // oldest first
          }
          return 0;// Default case if no sortKey matches
        });
 
        return (
          <div key={showTitle} className="show-group" style={{ marginBottom: "2rem" }}>
            <h3>{showTitle}</h3>
            <ul>
              {sortedEpisodes.map((ep, i) => (
              // Render each episode as a list item with unique key
 <li
  key={ep.id || i}
  style={{
    border: "1px solid #ddd", // Light border for visual separation
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  }}
>
   {/* Header section with episode title and favorite button */}
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
    <h4 style={{ margin: 0 }}>{ep.title || "Untitled Episode"}</h4>
     {/* Favorite heart icon to toggle favorite status */}
    <FavoriteHeart
      episode={ep}
      showTitle={ep.showTitle}
      seasonNumber={ep.season}
      episodeNumber={ep.episode}
    />
  </div>
 {/* Conditional rendering of season and episode number if available */}
  {(ep.season || ep.episode) && (
    <p style={{ fontWeight: "bold", margin: "0.25rem 0" }}>
      Season {ep.season || "?"}, Episode {ep.episode || "?"}
    </p>
  )}


    {/* Episode description or fallback text */}
  <p>{ep.description || "No description available."}</p>

  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "0.5rem" }}>
    <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#666", margin: 0 }}>
      Added on: {ep.addedAt ? formatDateTime(ep.addedAt) : "Unknown date"}
    </p>
    <button onClick={() => playEpisode(ep)}>▶️ Play</button>
  </div>
</li>

              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
