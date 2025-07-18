/**
 * Truncate a string to a given max length and add ellipsis (…) if needed.
 * @param {string} text - The full text to shorten.
 * @param {number} maxLength - Max length before truncation.
 * @returns {string} - Truncated text with ellipsis if needed.
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}