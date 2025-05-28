import { useState, useEffect, useRef } from "react";
import { useNavigate }               from "react-router-dom";
import { Button, InputGroup, Form, Spinner } from "react-bootstrap";
import SearchBarUnderlay             from "./SearchBarUnderlay";

export default function SearchBar() {
  const [query,        setQuery]        = useState("");
  const [matches,      setMatches]      = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const navigate                         = useNavigate();
  const inputRef                         = useRef(null);

  // fetch up to 5 suggestions whenever `query` changes
  useEffect(() => {
    if (!query) {
      setMatches([]);
      return;
    }
    setLoading(true);
    fetch(`/api/player/search/${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(names => setMatches(names.slice(0, 5)))
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, [query]);

  // clicking a suggestion
  const handleSelectName = name => {
    setQuery(name);
    setSelectedName(name);
    setMatches([]);              // hide dropdown
    inputRef.current?.focus();   // keep focus for "Enter"
  };

  // typing in the box clears any prior “selection”
  const handleChange = e => {
    setQuery(e.target.value);
    setSelectedName(null);
  };

  // only let them search if they have actually picked a valid full name
  const handleSubmit = e => {
    e.preventDefault();
    if (selectedName !== query) {
      // you could show an error toast here instead
      return;
    }
    navigate(`/player/${encodeURIComponent(query)}`);
    setQuery("");
    setSelectedName(null);
  };

  return (
    <div style={{ position: "relative", maxWidth: 400 }}>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <InputGroup>
          <Form.Control
            ref={inputRef}
            placeholder="Enter player name"
            value={query}
            onChange={handleChange}
          />
          <Button
            type="submit"
            disabled={loading || selectedName !== query}
          >
            {loading
              ? <Spinner animation="border" size="sm" />
              : "Search"}
          </Button>
        </InputGroup>
      </Form>

      <SearchBarUnderlay
        prefix={query}
        matches={matches}
        onSelect={handleSelectName}
      />
    </div>
  );
}