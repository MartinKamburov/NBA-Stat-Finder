import { useEffect, useState } from "react";
import { computeLeaders } from "../utils/leaderHelpers"; 
import PlayerSnapshot from "./PlayerSnapshot";

/** configuration for the three cards we want to display */
const CARDS = [
  { key: "ppg", title: "Top 5 Scorers",        suffix: " PPG" },
  { key: "apg", title: "Top 5 Assist Leaders", suffix: " APG" },
  { key: "rpg", title: "Top 5 Rebounders",     suffix: " RPG" },
];

export default function StatsLeaders() {
  const [leaders, setLeaders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    async function load() {
      try {
        // 1) grab every game row for the season
        const res  = await fetch("/api/player");        // adapt if your endpoint differs
        if (!res.ok) throw new Error(`API ${res.status}`);
        const rows = await res.json();

        // 2) crunch the numbers into three top-5 lists
        setLeaders({
          ppg: computeLeaders(rows, "pts"),   // points-per-game
          apg: computeLeaders(rows, "ast"),   // assists-per-game
          rpg: computeLeaders(rows, "trb"),   // rebounds-per-game
        });
      } catch (e) {
        console.error(e);
        setError(e.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-center my-5">Loading leaders…</p>;
  if (error)   return <p className="text-center text-danger my-5">⚠ {error}</p>;

  return (
    <div className="d-flex flex-column flex-md-row gap-4 mb-5 px-3">
      {CARDS.map(card => (
        <div
          key={card.key}
          className="flex-fill border rounded-3 p-3 shadow-sm"
          style={{ minWidth: 240, maxWidth: 400 }}
        >
          <h5 className="fw-bold text-center mb-3">{card.title}</h5>

          {/* 5 tiny “avatar rows” */}
          <ul className="list-unstyled m-0">
            {(leaders[card.key] ?? []).map((p, i) => (
              <PlayerSnapshot
                key={p.player}
                rank={i + 1}
                player={p.player}
                team={p.team}
                value={p.value}
                suffix={card.suffix}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}