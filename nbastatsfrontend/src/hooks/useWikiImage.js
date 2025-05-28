import { useState, useEffect } from "react";

/**
 * Given an article title this page calls Wikipedia’s REST endpoint
 * and returns the URL for the page’s thumbnail (if any).
 */
export default function useWikiImage(title) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchThumb = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            title
          )}`
        );
        if (!res.ok) throw new Error("No Wikipedia page found");
        const json = await res.json();
        // Wikipedia returns a `thumbnail` field if one exists
        setUrl(json.thumbnail?.source || null);
      } catch (e) {
        setError(e);
      }
    };

    fetchThumb();
  }, [title]);

  return { url, error };
}