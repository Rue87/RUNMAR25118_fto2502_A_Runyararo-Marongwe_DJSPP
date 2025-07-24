import React, { useRef } from "react";
import styles from './ShowCarousel.module.css';
import CarouselSlide from "./CarouselSlide";
import { genreMap } from "../utils/genreMap"; 

/**
 * ShowCarousel Component
 * Displays a horizontal sliding carousel of shows.
 *
 * @param {Object[]} shows - Array of show objects with at least {id, title, image} 
 */
export default function ShowCarousel({ shows }) {
  const containerRef = useRef(null);

 const scrollLeft = () => {
  const container = containerRef.current;
  if (!container) return;

  const threshold = 50;
  const isAtStart = container.scrollLeft <= threshold;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  console.log("LEFT  scrollLeft:", container.scrollLeft, "max:", maxScrollLeft);

  if (isAtStart) {
    console.log("Jumping LEFT to END");
    container.scrollTo({
      left: maxScrollLeft,
      behavior: "smooth",
    });
  } else {
    console.log("Scrolling LEFT normally");
    container.scrollBy({ left: -300, behavior: "smooth" });
  }
};


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
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Title and Arrows Row */}
      {/*<h2 className={styles.carouselTitle}>Recommended Shows</h2>*/}
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

      {/* Carousel Slides */}
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
              onClick={() => alert(`Clicked on ${show.title}`)}
            />
          );
        })}
      </div>
    </div>
  );
}

       
    
