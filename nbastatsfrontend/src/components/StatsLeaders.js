import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { computeLeaders } from "../utils/leaderHelpers";

const categories = [
  { key: "pts", label: "Top 5 Scorers", suffix: " PPG" },
  { key: "ast", label: "Top 5 Assist Leaders", suffix: " APG" },
  { key: "trb", label: "Top 5 Rebounders", suffix: " RPG" },
];

export default function StatsLeaders() {
  const [leaders, setLeaders] = useState({});
  const [loading, setLoading] = useState(true);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/player`)
      .then((r) => r.json())
      .then((rows) => {
        const result = {};
        categories.forEach((c) => {
          result[c.key] = computeLeaders(rows, c.key);
        });
        setLeaders(result);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="spinner-border" role="status" />
      </div>
    );
  }

  return (
    <section className="container py-5">
      <div className="row g-4">
        {categories.map((c) => (
          <div key={c.key} className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-center fw-bold mb-3">
                  {c.label}
                </h5>

                <ul className="list-group list-group-flush">
                  {leaders[c.key].map((p, idx) => (
                    <li
                      key={p.player}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {idx + 1}.{" "}
                        <Link
                          to={`/player/${encodeURIComponent(p.player)}`}
                          className="link-underline link-underline-opacity-0"
                        >
                          {p.player}
                        </Link>{" "}
                        ({p.team})
                      </span>
                      <span className="fw-semibold">
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