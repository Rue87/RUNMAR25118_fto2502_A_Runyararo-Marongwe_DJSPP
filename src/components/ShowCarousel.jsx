import React, { useRef } from "react";
import styles from './ShowCarousel.module.css';

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
        {shows.map(show => (
          <div
            key={show.id}
            className={styles.carouselCard} 
            onClick={() => alert(`Clicked on ${show.title}`)} // Replace with navigation logic
          >
            <img
              src={show.image}
              alt={show.title}
              className={styles.cardImage} 
            />
            <h4 className={styles.cardTitle}>{show.title}</h4>
          </div>
        ))}
      </div>

    </div>
)}   
