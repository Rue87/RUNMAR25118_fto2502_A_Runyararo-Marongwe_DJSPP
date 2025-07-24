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
     // Initialize from localStorage once
    return localStorage.getItem("darkMode") === "true";
  });

    useEffect(() => {
       // Add or remove class on body
   document.body.classList.toggle("dark-mode", darkMode);
    // Save preference
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

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
      className={styles.toggleButton}  
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
      </nav>
    </header>
  );
}
