// Import React hook to access context values
import { useContext } from "react";

// Import sort options and context used across the app
import { SORT_OPTIONS, PodcastContext } from "../context/PodcastContext";

// Import styles for the select dropdown
import styles from "./SortSelect.module.css";

/**
 * SortSelect Component
 * Renders a dropdown menu that lets users select how to sort episodes (e.g., by title).
 * It reads and updates the global sort key using PodcastContext.
 * Dropdown for choosing sort order.
 */
export default function SortSelect() {
  
// Destructure current sort key and setter function from global context
const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
      // Render a styled <select> element
    <select
      className={styles.select}
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
       {/* Render each option defined in SORT_OPTIONS */}
      {SORT_OPTIONS.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}


