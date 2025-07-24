import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
/**
 * Header Component
 *
 * Displays the main header for the Podcast App.
 * Contains the app title and navigation links.
 */
export default function Header() {
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

    useEffect(() => {
   // if (darkMode) {
    //  document.body.classList.add("dark-mode");
   // } else {
    //  document.body.classList.remove("dark-mode");
    //}
     document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <header className={styles.appHeader}>
      <h1>🎙️ Podcast App</h1>
       {/* Navigation Links */}
      <nav className={styles.navLinks}>
        <Link to="/">🏠 Home</Link>
        <Link to="/favourites">❤️ Favourites</Link> 
         <button
      aria-label="Toggle light/dark mode"
      onClick={() => setDarkMode(!darkMode)}
      className={styles.toggleButton}  // Add a new style or reuse existing styles
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
      </nav>
    </header>
  );
}
