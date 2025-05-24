//The useState hook in react allows functional components to manage state. It provides a way to declare state variables that can hold various data types. 
// By using the update function in the two element array of a useState the update function will trigger a re-render of the component.
import { useState } from "react"; 
import { Button, InputGroup, Form } from 'react-bootstrap';

const SearchBar = () => {
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
        const res = await fetch(`/api/player/${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const player = await res.json();
        console.log(player);
        setPlayers(player);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="App" style={{ padding: 20, fontFamily: "sans-serif" }}>
            <Form onSubmit={handleSearch}>
                <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Enter player name"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <Button
                    variant="outline-primary"
                    type="submit" 
                    disabled={loading}
                >
                    Search
                </Button>
                </InputGroup>
            </Form>

            {loading && <p>Loading…</p>}
            {error && <p style={{ color: "red" }}> Player not found. Please check your spelling. </p>}

            {/* {!loading && !error && players.length === 0 && (
                <p>No players found. Try a different name.</p>
            )} */}

            <ul>
                {players.map(player => (
                    <li
                    key={`${player.name}-${player.game_date}`}  // use a unique combo
                    style={{ marginBottom: 10 }}
                    >
                        <strong>{player.name}</strong> — Team: {player.team}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchBar