import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";


/**
 * ShowDetailPage - Displays detailed information about a selected podcast.
 *
 * Uses the podcast ID from the URL to find the matching podcast from context.
 * Renders title, image, description, genres, and last updated date.
 *
 * @returns {JSX.Element} The detail view of a selected podcast show.
 */

export default function ShowDetailPage() {

     /**
   * Get the dynamic `id` param from the route URL.
   * @type {{ id: string }}
   */
  const { id } = useParams();

/**
   * Access the podcast list from the shared context.
   * @type {{ podcasts: Object[] }}
   */
  const { podcasts } = useContext(PodcastContext);

  /**
   * Find the podcast that matches the ID from the URL.
   * Converts the route param `id` (string) to a number before comparing.
   * @type {Object|undefined}
   */

  const podcast = podcasts.find(p => p.id === Number(id));

  
  // Render error if podcast is not found

  if (!podcast) return <p>Podcast not found.</p>;

  return (
    <div>
      <h1>{podcast.title}</h1>
      <img src={podcast.image} alt={podcast.title} />
      <p>{podcast.description}</p>
    </div>
  );
}
