import { useState, useEffect } from "react";

export default function useWikiBio(title) {
  const [info, setInfo]       = useState(null);
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!title) return;

    setLoading(true);
    setError(null);

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        title
      )}`
    )
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((json) => {
        // summary endpoint gives you description + extract + thumbnail
        setInfo({
          title:       json.title,         // “LeBron James”
          description: json.description,   // “American basketball player…”
          extract:     json.extract,       // full first paragraph
          thumbnail:   json.thumbnail?.source,
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [title]);

  return { info, loading, error };
}