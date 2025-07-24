import React, { useRef } from "react";
import styles from './ShowCarousel.module.css';
import CarouselSlide from "./CarouselSlide";
import { genreMap } from "../utils/genreMap"; 
import { useNavigate } from "react-router-dom";

/**
 * ShowCarousel Component
 * Displays a horizontal sliding carousel of shows.
 *
 * @component
 * @param {Object[]} shows - Array of show objects with at least {id, title, image} 
 * @param {string} shows[].id - Unique identifier of the show
 * @param {string} shows[].title - Title of the show
 * @param {string} shows[].image - Image URL of the show
 * @param {number[]} shows[].genres - Array of genre IDs
 * @returns {JSX.Element} A styled, scrollable carousel of show cards
*/
export default function ShowCarousel({ shows }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

   /**
   * Handles scrolling left in the carousel.
   * If at the beginning, loops to the end; otherwise scrolls left by 300px.
   */
 const scrollLeft = () => {
  const container = containerRef.current;
  if (!container) return;

  const threshold = 50;
  const isAtStart = container.scrollLeft <= threshold;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  console.log("LEFT  scrollLeft:", container.scrollLeft, "max:", maxScrollLeft);

  if (isAtStart) {
    console.log("Jumping LEFT to END");
     // Loop to end
    container.scrollTo({
      left: maxScrollLeft,
      behavior: "smooth",
    });
  } else {
    console.log("Scrolling LEFT normally");
    // Scroll normally
    container.scrollBy({ left: -300, behavior: "smooth" });
  }
};

 /**
   * Handles scrolling right in the carousel.
   * If at the end, loops to the beginning; otherwise scrolls right by 300px.
   */
  const scrollRight = () => {
    const container = containerRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScrollLeft - 5) {
      // At end → scroll to start
      container.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      // Scroll normally
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carouselContainer}>
       {/* Scroll control buttons */}
      <div className={styles.carouselHeader}>
        <div className={styles.scrollButtons}>
          <button
            onClick={scrollLeft}
            className={styles.scrollButtonLeft}
            aria-label="Scroll left"
          >
            ‹
          </button>

          <button
            onClick={scrollRight}
            className={styles.scrollButtonRight}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Show cards displayed in horizontal scroll area */}
      <div
        ref={containerRef}
        className={`${styles.carousel} ${styles["hide-scrollbar"]}`}
      >
        {shows.map(show => {
          // Ensure show has genres and map them to names
          const genreNames = show.genres.map(id => genreMap[id] || "Unknown");
          return (
            <CarouselSlide
              key={show.id}
              image={show.image}
              title={show.title}
              genres={genreNames}
              onClick={() => navigate(`/shows/${show.id}`)} 
             />
          );
        })}
      </div>
    </div>
  );
}

       
    
