/**
 * @function formatDate
 * Converts an ISO date string into a human-readable, localized date string.
 * Example output: "July 7, 2025".
 *
 * @param {string} isoString - A valid ISO 8601 date string (e.g., "2025-07-07T12:34:56Z").
 * @returns {string} Formatted date string in the user's local language and format.
 **/
export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
/**
 * @function formatDateTime
 * Converts an ISO date string into a human-readable, localized date and time string.
 * Example output: "July 7, 2025, 10:45 AM".
 *
 * @param {string} isoString - A valid ISO 8601 date string (e.g., "2025-07-07T12:34:56Z").
 * @returns {string} Formatted date and time string in the user's local language and format.
 **/
export function formatDateTime(isoString) {
  const date = new Date(isoString);
   if (isNaN(date)) return "Invalid Date";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
