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
{/*export async function fetchPodcasts(setPodcasts, setError, setLoading) {
  try {
    const res = await fetch("https://podcast-api.netlify.app/shows");
    {/*if (!res.ok) throw new Error(`${res.status}`);*/}
   {/* if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
    const data = await res.json();
    setPodcasts(data);
    console.log("Podcasts received from API:", data);
    setError(null); */} // Clear any previous errors on success

  {/*} catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}*/}

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


