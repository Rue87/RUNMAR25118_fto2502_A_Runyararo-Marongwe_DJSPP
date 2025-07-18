import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchShowById } from "../api/fetchShowById";
import { formatDate } from "../utils/formatDate";
import "../index.css"; 
import { genreMap } from "../utils/genreMap";
import { truncateText } from "../utils/truncateText";



/**
 * ShowDetailPage - Fetches and displays a detailed view of a single podcast show.
 * Data is loaded via the show ID from the URL.
 */
export default function ShowDetailPage() {
  // Get podcast ID from URL
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSeasonIndex, setExpandedSeasonIndex] = useState(null);

  const toggleSeason = (index) => {
  setExpandedSeasonIndex((prevIndex) => (prevIndex === index ? null : index));
};

  useEffect(() => {
    fetchShowById(id, setShow, setError, setLoading);
  }, [id]);

  useEffect(() => {
  if (show) {
    console.log("Show Data:", show);
      window._showSeasons = show.seasons;
  }
}, [show]);

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!show) return <p>Podcast not found.</p>;

  // Clean up genre list
  const filteredGenres = (show.genres || []).filter(
    (genre) => genre !== "All" && genre !== "Featured"
  );

  // Handle both string and numeric genres
  const getGenreTitle = (genre) => {
    if (typeof genre === "number") return genreMap[genre] || "Unknown";
    if (typeof genre === "string") return genre;
    return "Unknown";
  };

  return (
    <div className="showDetailContainer">
      <div className="headerSection">
        <img src={show.image} alt={show.title} className="coverImage" />

        <div className="meta">
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

          {/* GENRES + LAST UPDATED */}
<div className="info-row">
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
  <div className="info-col">
    <strong>TOTAL SEASONS</strong>
    <p>{show.seasons?.length || 0} Seasons</p>
  </div>

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

      <div className="seasonsSection">
        <h2>Current Season</h2>
        {show.seasons?.length > 0 ? (
          show.seasons.map((season, index) => (
              
            <div key={index} className="seasonBlock">
              <div className="seasonHeader"
               onClick={() => toggleSeason(index)} //line to toggle
               style={{ cursor: "pointer" }}       //Makes it look clickable
        >
                <img
                  src={season.image || show.image}
                  alt={`Season ${index + 1} cover`}
                  className="seasonCover"
                />
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

              {/* Episodes List */}
              {expandedSeasonIndex === index && (
              <ul className="episodeList">
                {season.episodes?.length > 0 ? (
                  season.episodes.map((ep, epIndex) => (
                    <li key={epIndex} className="episodeItem">
                        
                        {/* Season Image */}
        <img
          src={season.image || show.image}
          alt={`Season ${index + 1} cover`}
          style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
        />
        <div className="episodeDetails">
                      <h4>
                        Episode {epIndex + 1}: {ep.title || "Untitled Episode"}
                      </h4>
                      <p>{truncateText(ep.description || "No description available.",100)}</p>
                      <span className="episodeMeta">
                        {ep.duration && ep.duration}
                        {ep.duration && ep.date && " · "}
                        {ep.date && formatDate(ep.date)}
                      </span>
                      </div>
                    </li>
                  ))
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

