// FavouriteEpisode.jsx

import React from "react";

/**
 * Renders a favorite episode card with show and season info.
 *
 * @param {Object} props
 * @param {Object} props.episode - The episode data.
 * @param {Object} props.show - The parent show the episode belongs to.
 * @param {Object} props.season - The season object the episode is part of.
 */
export default function FavouriteEpisode({ episode, show, season }) {
  return (
    <div className="favourite-episode">
      <h3>{episode.title}</h3>
      <p>
        <strong>Show:</strong> {show.title} <br />
        <strong>Season:</strong> {season.title || `Season ${season.number}`}
      </p>
    </div>
  );
}
