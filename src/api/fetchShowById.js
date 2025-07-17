/**
 * Fetch a single show by its ID from the remote API.
 *
 * @param {string} id - The unique show ID.
 * @param {Function} setShow - State setter to store the fetched show data.
 * @param {Function} setError - State setter to store error messages.
 * @param {Function} setLoading - State setter to toggle loading state.
 * @returns {Promise<void>}
 */
export async function fetchShowById(id, setShow, setError, setLoading) {

  try {
    setLoading(true);
    const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    if (!res.ok) throw new Error(`Error: ${res.status} - Show not found`);
    const data = await res.json();
     console.log("Show data fetched:", data);
    setShow(data);
  } catch (err) {
    console.error("Failed to fetch show:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
