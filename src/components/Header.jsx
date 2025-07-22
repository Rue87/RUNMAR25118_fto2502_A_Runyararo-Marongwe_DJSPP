import styles from "./Header.module.css";
import { Link } from "react-router-dom";
/**
 * Header Component
 *
 * Displays the main header for the Podcast App.
 * Contains the app title and navigation links.
 */
export default function Header() {
  return (
    <header className={styles.appHeader}>
      <h1>🎙️ Podcast App</h1>
       {/* Navigation Links */}
      <nav className={styles.navLinks}>
        <Link to="/">🏠 Home</Link>
        <Link to="/favourites">❤️ Favourites</Link> 
      </nav>
    </header>
  );
}
