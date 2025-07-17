import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchShowById } from "../api/fetchShowById";
import { genreMap } from "../utils/genreMap";
import { formatDate } from "../utils/formatDate";
import "../index.css"; 

/**
 * ShowDetailPage - Fetches and displays a detailed view of a single podcast show.
 * Data is loaded via the show ID from the URL.
 */
export default function ShowDetailPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShowById(id, setShow, setError, setLoading);
  }, [id]);

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!show) return <p>Podcast not found.</p>;

  return (
    <div className="showDetailContainer">
      <div className="headerSection">
        <img src={show.image} alt={show.title} className="coverImage" />

        <div className="meta">
          <h1>{show.title}</h1>
          <p>{show.description}</p>

          <div className="metadataRow">
            {/*<div>
              <strong>Genres:</strong>{" "}
              {show.genres.map((id) => (
                <span key={id} className="tag">
                  {genreMap[id] || id}
                </span>
              ))}
            </div>*/}
            {Array.isArray(show.genres) && show.genres.length > 0 ? (
  <div>
    <strong>Genres:</strong>{" "}
    {show.genres.map((id) => (
      <span key={id} className="tag">
        {genreMap[id] || id}
      </span>
    ))}
  </div>
) : (
  <div>
    <strong>Genres:</strong> <span className="tag">Unknown</span>
  </div>
)}


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
          </div>
        </div>
      </div>

      <div className="seasonsSection">
        <h2>Seasons & Episodes</h2>
        {show.seasons?.length > 0 ? (
          show.seasons.map((season, index) => (
            <div key={index} className="seasonBlock">
              <h3>
                Season {index + 1}: {season.title || "Untitled Season"}
              </h3>
              <ul>
                {season.episodes?.length > 0 ? (
                  season.episodes.map((ep, epIndex) => (
                    <li key={epIndex}>
                      Episode {epIndex + 1}: {ep.title || "Untitled Episode"}
                    </li>
                  ))
                ) : (
                  <li>No episodes in this season.</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p>No seasons available.</p>
        )}
      </div>
    </div>
  );
}
