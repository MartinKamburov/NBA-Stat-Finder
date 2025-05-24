import { useState } from "react";

const testingApiCall = () => {
    const [query, setQuery] = useState("");      // the search input
    const [players, setPlayers] = useState([]);  // array of results
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
        const res = await fetch(`/api/players?name=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        setPlayers(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>testingApiCall</div>
    )
}

export default testingApiCall