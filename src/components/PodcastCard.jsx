import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";
import { Link } from "react-router-dom";// Imported Link for client-side navigation


/**
 * PodcastCard Component
 * 
 * Renders a clickable card that previews podcast info.
 * Now supports routing: clicking a card navigates to the show's detail page.
 *
/**

 * @param {Object} props
 * @param {Object} props.podcast - The podcast data object to display.
 * @param {string} props.podcast.id - Unique ID of the podcast.
 * @param {string} props.podcast.title - Title of the podcast.
 * @param {string} props.podcast.image - URL of the podcast image.
 * @param {number} props.podcast.seasons - Number of seasons available.
 * @param {string} props.podcast.updated - ISO date string for the last update.
 * @param {Array<Object>} props.genres - Array of genre objects for mapping IDs to titles.
 *
 * @returns {JSX.Element} The rendered podcast card component.
 */
export default function PodcastCard({ podcast, genres }) {
  // Convert genre IDs to visual <span> tags with genre titles

 {/*} const genreSpans = podcast.genres.map((id) => {
    const match = genres.find((genre) => genre.id === id);
    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });*/}
  const genreSpans = podcast.genres?.map((id) => {
  if (!genres) return null; // safeguard in case genres is undefined
  const match = genres.find((genre) => genre.id === id);
  return (
    <span key={id} className={styles.tag}>
      {match ? match.title : `Unknown (${id})`}
    </span>
  );
}) || []; // fallback to empty array if podcast.genres is undefined


  {/*return (
    <div className={styles.card}>
      <img src={podcast.image} alt={podcast.title} />

      <h3>{podcast.title}</h3>
      <p className={styles.seasons}>{podcast.seasons} seasons</p>
      <div className={styles.tags}>{genreSpans}</div>
      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </div>
  );*/}
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
