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
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carouselContainer}>
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

      <div
        ref={containerRef}
        className={`${styles.carousel} ${styles["hide-scrollbar"]}`}
      >
        {shows.map(show => {
          // Ensure show has genres and map them to names}
        const genreNames = show.genres.map(id => genreMap[id] || "Unknown");
  return (
  <CarouselSlide
    key={show.id}
    image={show.image}
    title={show.title}
    genres={genreNames} // 
    onClick={() => alert(`Clicked on ${show.title}`)} // optional
  />
  );
})}
 </div>

    </div>
      );
}

       
    
