import useWikiBio from "./useWikiBio";
import { useEffect } from "react";

export default function WikiTest({ name }) {
  // hard–code a name you know exists
  console.log("Here is the player we are searching for in wikipedia, ", name);
  const { info, loading, error } = useWikiBio(name);

  useEffect(() => {
    console.log("loading:", loading);
    console.log("error:", error);
    console.log("info:", info);
  }, [loading, error, info]);

  return (
    <div>
      <h2>WikiTest</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {info && (
        <div style={{ textAlign: "left" }}>
          <p><strong>{info.description}</strong></p>
          <p>{info.extract}</p>
        </div>
      )}
    </div>
  );
}