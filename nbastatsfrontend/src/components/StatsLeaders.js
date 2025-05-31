import { useEffect, useState } from "react";
import getLeaders from "../utils/leaderHelpers";   
import PlayerSnapshot from "./PlayerSnapshot";       

const CARDS = [
  {
    key: "ppg",
    title: "Top 5 Scorers",
    suffix: " PPG",
  },
  {
    key: "apg",
    title: "Top 5 Assist Leaders",
    suffix: " APG",
  },
  {
    key: "rpg",
    title: "Top 5 Rebounders",
    suffix: " RPG",
  },
];

export default function StatsLeaders() {
  const [leaders, setLeaders] = useState({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaders()
      .then((data) => setLeaders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading leaders…</div>;
  }

  return (
    <div className="d-flex flex-column flex-md-row gap-4 mb-5 px-3">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className="flex-fill border rounded-3 p-3 shadow-sm"
          style={{ minWidth: "240px", maxWidth: "400px" }}
        >
          <h5 className="fw-bold text-center mb-3">{card.title}</h5>

          {/* List of the five rows –- uses the tiny component */}
          <ul className="list-unstyled">
            {leaders[card.key]?.map((p, idx) => (
              <PlayerSnapshot
                key={p.player}
                rank={idx + 1}
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