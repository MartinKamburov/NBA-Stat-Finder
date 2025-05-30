import useWikiBio from "../hooks/useWikiBio";
import { Spinner, Button } from "react-bootstrap";

export default function PlayerDetails({ name }) {
  // coerce null/undefined → empty object
  const wikiSlug = encodeURIComponent(name.replace(/\s+/g, '_'));
  const wikiUrl  = `https://en.wikipedia.org/wiki/${wikiSlug}`;

  console.log("Here is the player we are searching for in wikipedia, ", name);
  const { info, loading, error } = useWikiBio(name);

  return (
    <div>
      <h2>Biography</h2>
      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {info && (
        <div style={{ textAlign: "left" }}>
          <p><strong>{info.description}</strong></p>
          <p>{info.extract}</p>
          <Button variant="outline-secondary" href={wikiUrl} rel="noopener noreferrer" target="_blank" >Read More...</Button>
        </div>
      )}
    </div>
  );
}