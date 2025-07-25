/**
 * Save the playback time of a specific episode to localStorage.
 *
 * @param {string} episodeId - Unique ID of the episode.
 * @param {number} time - Current playback time in seconds.
 */
export function savePlaybackProgress(episodeId, time) {
  if (!episodeId) return;
  localStorage.setItem(`progress-${episodeId}`, time.toString());
}

/**
 * Retrieve the last saved playback time of an episode.
 *
 * @param {string} episodeId - Unique ID of the episode.
 * @returns {number|null} - Saved time in seconds, or null if none.
 */
export function getPlaybackProgress(episodeId) {
  if (!episodeId) return null;
  const time = localStorage.getItem(`progress-${episodeId}`);
  return time ? parseFloat(time) : null;
}

/**
 * Clear saved playback progress for an episode.
 *
 * @param {string} episodeId - Unique ID of the episode.
 */
export function clearPlaybackProgress(episodeId) {
  if (!episodeId) return;
  localStorage.removeItem(`progress-${episodeId}`);
}
