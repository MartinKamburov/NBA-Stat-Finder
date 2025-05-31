import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { computeLeaders } from "../utils/leaderHelpers";
import PlayerPicture from "./PlayerPicture";

const CATEGORIES = [
  { key: "pts", label: "Top 5 Scorers",    suffix: " PPG" },
  { key: "ast", label: "Top 5 Assist Leaders", suffix: " APG" },
  { key: "trb", label: "Top 5 Rebounders", suffix: " RPG" },
];

export default function StatsLeaders() {
  const [leaders, setLeaders] = useState({});
  const [loading, setLoading] = useState(true);

  // ① absolute URL avoids the old “double slash” bug
  const API = import.meta.env.VITE_API_URL ?? process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/player`)                            // e.g. https://my-backend.onrender.com/api/player
      .then((r) => r.json())
      .then((rows) => {
        const next = {};
        CATEGORIES.forEach((c) => {
          next[c.key] = computeLeaders(rows, c.key, 5, "avg"); // per-game average
        });
        setLeaders(next);
      })
      .finally(() => setLoading(false));
  }, [API]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <span className="spinner-border" role="status" />
      </div>
    );
  }

  return (
    <section className="container py-4">
      <div className="row g-4">
        {CATEGORIES.map((c) => (
          <div key={c.key} className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold text-center mb-3">
                  {c.label}
                </h5>

                <ul className="list-group list-group-flush small">
                  {leaders[c.key].map((p, idx) => (
                    <li
                      key={p.player}
                      className="list-group-item d-flex justify-content-between align-items-center gap-2"
                    >
                      {/* tiny head-shot */}
                      <PlayerPicture
                        playerName={p.player}
                        size={32}              /* you added this prop earlier */
                      />

                      {/* rank + name */}
                      <span className="flex-grow-1">
                        {idx + 1}.{" "}
                        <Link
                          to={`/player/${encodeURIComponent(p.player)}`}
                          className="link-underline link-underline-opacity-0"
                        >
                          {p.player}
                        </Link>{" "}
                        <small className="text-muted">({p.team})</small>
                      </span>

                      {/* stat value */}
                      <span className="fw-semibold text-nowrap">
                        {p.value}
                        {c.suffix}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}