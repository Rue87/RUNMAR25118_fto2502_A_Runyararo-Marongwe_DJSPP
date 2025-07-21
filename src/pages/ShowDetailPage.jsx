import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchShowById } from "../api/fetchShowById";
import { formatDate } from "../utils/formatDate";
import "../index.css"; 
import { genreMap } from "../utils/genreMap";
import { truncateText } from "../utils/truncateText";
//import AudioPlayer from "../components/AudioPlayer";
import { useAudio } from "../context/AudioContext"; //Import the hook



/**
 * ShowDetailPage Component
 *
 * Fetches and displays detailed podcast information for a selected show.
 * - Uses the podcast `id` from the URL params.
 * - Displays general show metadata (title, description, image, genres).
 * - Renders each season with collapsible episodes.
 * - Only displays valid release dates/durations (hides 'Unknown').
 * 
 * Functionalities added for current project:
 * - Toggle season details on click.
 * - Remove fallback "Unknown" if metadata is missing.
 * - Truncate long episode descriptions for a cleaner UI.
 * Data is loaded via the show ID from the URL.
 * Uses the `useAudio` hook to manage audio playback.
 * 
 */

export default function ShowDetailPage() {
  const { playEpisode } = useAudio(); // 💡 useAudio gives access to playback controller
  // Get podcast ID from URL
  const { id } = useParams();// Get show ID from route like /show/:id
   // Component state
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSeasonIndex, setExpandedSeasonIndex] = useState(null);

  
  // Toggle logic for expanding/collapsing season details
  const toggleSeason = (index) => {
  setExpandedSeasonIndex((prevIndex) => (prevIndex === index ? null : index));
};
 // Fetch show data by ID when component mounts
  useEffect(() => {
    fetchShowById(id, setShow, setError, setLoading);
  }, [id]);

  
  // Debugging utility – exposes seasons globally and logs fetched show
  useEffect(() => {
  if (show) {
    console.log("Show Data:", show);
      window._showSeasons = show.seasons;
  }
}, [show]);

 // Handle loading and error states
  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!show) return <p>Podcast not found.</p>;

  // Clean up genre list
    // Filter out generic tags like "All" or "Featured"
  const filteredGenres = (show.genres || []).filter(
    (genre) => genre !== "All" && genre !== "Featured"
  );

  // Handle genre formatting (can be numeric or string)
  const getGenreTitle = (genre) => {
    if (typeof genre === "number") return genreMap[genre] || "Unknown";
    if (typeof genre === "string") return genre;
    return "Unknown";
  };

  return (
    <div className="showDetailContainer">
         {/* Header section with show cover image and metadata */}
      <div className="headerSection">
        <img src={show.image} alt={show.title} className="coverImage" />

        <div className="meta">
             {/* Show title and description */}
          <h1>{show.title}</h1>
          <p>{show.description}</p>

       {/*  {filteredGenres.length > 0 ? (
        <div className="genre-tags">
          <strong>Genres:</strong>{" "}
          {filteredGenres.map((genre, index) => (
            <span key={index} className="genre-tag">
              {getGenreTitle(genre)}
            </span>
              ))}
            </div>
          ) : (
            <div>
              <strong>Genres:</strong> <span className="genre-tag">Unknown</span>
            </div>
          )}*/}

          
        {/* GENRES and LAST UPDATED section */}
<div className="info-row">
      {/* Genres block (left aligned) */}
  <div className="info-col">
    <strong>GENRES</strong>
    <div className="genre-tags">
      {filteredGenres.length > 0 ? (
        filteredGenres.map((genre, index) => (
          <span key={index} className="genre-tag">
            {getGenreTitle(genre)}
          </span>
        ))
      ) : (
        <span className="genre-tag">Unknown</span>
      )}
    </div>
  </div>
     {/* Last updated block (right aligned) */}
  <div className="info-col align-right">
    <strong>LAST UPDATED</strong>
    <p>{formatDate(show.updated)}</p>
  </div>
</div>


        {/*  <div className="metadataRow">
            <div>
              <strong>Total Seasons:</strong> {show.seasons?.length ?? 0}
            </div>

            <div className="updatedDate">
              <strong>Last Updated</strong>
              <span>{formatDate(show.updated)}</span>
            </div>

            <div>
              <strong>Total Episodes:</strong>{" "}
              {show.seasons
                ? show.seasons.reduce(
                    (acc, season) => acc + (season.episodes?.length ?? 0),
                    0
                  )
                : 0}
            </div>
          </div>*/}

    {/* TOTAL SEASONS + TOTAL EPISODES */}
<div className="info-row">
    {/* Total seasons */}
  <div className="info-col">
    <strong>TOTAL SEASONS</strong>
    <p>{show.seasons?.length || 0} Seasons</p>
  </div>
 {/* Total episodes across all seasons */}
  <div className="info-col align-right">
    <strong>TOTAL EPISODES</strong>
    <p>
      {show.seasons
        ? show.seasons.reduce(
            (acc, season) => acc + (season.episodes?.length ?? 0),
            0
          )
        : 0}{" "}
      Episodes
    </p>
  </div>
</div>
</div>
</div>

          {/* Seasons section */}
      <div className="seasonsSection">
        <h2>Current Season</h2>

         {/* Check if any seasons are available */}
        {show.seasons?.length > 0 ? (
          show.seasons.map((season, index) => (

              
            <div key={index} className="seasonBlock">
                {/* Clickable season header to toggle visibility of episode list */}
              <div className="seasonHeader"
               onClick={() => toggleSeason(index)} //line to toggle
               style={{ cursor: "pointer" }}       //Makes it look clickable
        >
                  {/* Season image fallback to show image */}
                <img
                  src={season.image || show.image}
                  alt={`Season ${index + 1} cover`}
                  className="seasonCover"
                />

                  {/* Season metadata */}
                <div className="seasonInfo">
                  <h3>
                    Season {index + 1}: {season.title || "Untitled Season"}
                  </h3>
                  {/*<p>{season.description || "No description available."}</p>
                  <p className="seasonMeta">
                    {season.episodes?.length ?? 0} episodes · Released{" "}
                    {season.episodes?.[0]?.date
                      ? new Date(season.episodes[0].date).getFullYear()
                      : "Unknown"}
                  </p>*/}

                  {/* Episode count and first episode release year if available */}
                  <p className="seasonMeta">
  {season.episodes?.length ?? 0} episodes
  {season.episodes?.[0]?.date && (
    <>
      {" · Released "}
      {new Date(season.episodes[0].date).getFullYear()}
    </>
  )}
</p>

                </div>
              </div>

            
               {/* Episodes list toggle — only show if this season is expanded */}
              {expandedSeasonIndex === index && (
              <ul className="episodeList">

                 {/* Render each episode */}
                {season.episodes?.length > 0 ? (
                  season.episodes.map((ep, epIndex) => {
                      console.log("Episode file:", ep.file);
                      return(
                    <li key={epIndex} className="episodeItem">

                        
                        {/* Season Image */}
                    
        <img
          src={season.image || show.image}
          alt={`Season ${index + 1} cover`}
          style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
        />
          {/* Episode details */}
        <div className="episodeDetails">
          {/* 
  Episode Title 
  - Displays episode index and title.
  - Defaults to "Untitled Episode" if no title exists.
*/}
                      <h4>
                        Episode {epIndex + 1}: {ep.title || "Untitled Episode"}
                      </h4>
                      {/*
  Play Button
  - Calls the global `playEpisode(ep)` function from AudioContext.
  - Triggers playback in the persistent audio player.
*/}
                      {/*<button onClick={() => playEpisode(ep)} className="playBtn"
                        disabled={!ep.file}>
                      ▶️ Play Episode
                       </button>*/}
                       <div
  onClick={() => playEpisode(ep)}
  className="playBtn"
  style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "6px" }}
>
  ▶️ Play Episode
</div>

                       {/*
  Episode Description
  - Truncates long descriptions to 100 characters.
  - Falls back to placeholder text if missing.
*/}

                      <p>{truncateText(ep.description || "No description available.",100)}</p>
                      
{/*
  Episode Meta Info
  - Displays duration and release date if available.
  - Separates values with a dot if both exist.
*/}
                      <span className="episodeMeta">
                        {ep.duration && ep.duration}
                        {ep.duration && ep.date && " · "}
                        {ep.date && formatDate(ep.date)}
                      </span>
                        
  </div>
                      
                    </li>
                  );
                })
                ) : (
                  <li>No episodes in this season.</li>
                )}
              </ul>
              )}
            </div>
          ))
        ) : (
          <p>No seasons available.</p>
        )}
      </div>
    </div>
  );
}

