import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";
import { Link } from "react-router-dom";// Enables navigation on click

/**
 * PodcastCard Component
 * Renders a clickable card showing podcast preview details.
 * Clicking the card navigates to a show-specific page.
 *
 * @param {Object} props
 * @param {Object} props.podcast - Podcast data object.
 * @param {string} props.podcast.id - Unique podcast ID.
 * @param {string} props.podcast.title - Podcast title.
 * @param {string} props.podcast.image - Podcast cover image URL.
 * @param {number} props.podcast.seasons - Number of seasons.
 * @param {string} props.podcast.updated - Last updated ISO date string.
 * @param {Array<{id: number, title: string}>} props.genres - Genre mapping array.
 *
 * @returns {JSX.Element}
 */
export default function PodcastCard({ podcast, genres }) {
  
  // Convert podcast.genre IDs into visual tags, using genre titles from the passed-in genre list.
  
  const genreSpans = podcast.genres?.map((id) => {
  if (!genres) return null; // Prevents error if genres not provided
  const match = genres.find((genre) => genre.id === id);
  return (
    <span key={id} className={styles.tag}>
      {match ? match.title : `Unknown (${id})`}
    </span>
  );
}) || []; // fallback: empty array if podcast.genres is undefined

 return (
    //  Entire card wrapped in <Link> to make it navigable via React Router
    // This allows users to click on a podcast and go to its dedicated detail page
  <Link to={`/shows/${podcast.id}`} className={styles.cardLink}>
    <div className={styles.card}>
      <img src={podcast.image} alt={podcast.title} />
      <h3>{podcast.title}</h3>
      <p className={styles.seasons}>{podcast.seasons} seasons</p>
      <div className={styles.tags}>{genreSpans}</div>
      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </div>
  </Link>//When clicked, navigates to route like "/shows/3"
);

}
