/**
 * @function fetchPodcasts
 * Asynchronously fetches podcast data from the remote API and updates state accordingly.
 * Handles loading, error, and successful data response via provided state setters.
 *
 * @param {Function} setPodcasts - State setter function to update the podcasts array.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 *
 **/

export async function fetchPodcasts() {
  try {
    const res = await fetch("https://podcast-api.netlify.app/shows");
    if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}


