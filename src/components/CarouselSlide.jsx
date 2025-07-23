// components/CarouselSlide.jsx

import React from "react";
import "./CarouselSlide.module.css"; 
import styles from "./ShowCarousel.module.css"; // reuse the same CSS module
/**
 * @param {Object} props
 * @param {string} props.image - The show's image URL
 * @param {string} props.title - The show's title
 * @param {string[]} props.genres - Array of genre names
 */
export default function CarouselSlide({ image, title, genres, onClick }) {
  return (
    <div className={styles.carouselCard} onClick={onClick}>
      <img src={image} alt={title}className={styles.cardImage}  />
      <h4 className={styles.cardTitle}>{title}</h4>
      {/* Display genres as tags */}
      <div className={styles.genresTags}>
        {genres.map((genre, index) => (
          <span key={index} className={styles.tag}>{genre}</span>
        ))}
      </div>
    </div>
  );
}
