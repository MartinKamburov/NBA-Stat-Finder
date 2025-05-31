import { useEffect, useState } from 'react';
import PlayerSnapshot     from './PlayerSnapshot';
import {  }  from '../utils/leaderHelpers';

const api = path =>
  fetch(`${process.env.REACT_APP_API_URL}${path}`).then(r => {
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  });

function CategoryCard({ cat }) {
  const { title, suffix, endpoint } = CATEGORY_META[cat];
  const [rows, setRows]   = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api(endpoint).then(setRows).catch(setError);
  }, [endpoint]);

  return (
    <div className="col-md-4 mb-3">
      <div className="border rounded p-3 h-100">
        <h5 className="text-center fw-bold mb-3">{title}</h5>

        {error && (
          <div className="text-danger small">⚠ {error.message}</div>
        )}

        {!error && rows.length === 0 && (
          <div className="text-muted small">Loading…</div>
        )}

        {rows.map((r, i) => (
          <PlayerSnapshot
            key={r.player}
            rank={i + 1}
            player={r.player}
            team={r.team}
            value={r.value}
            suffix={suffix}
          />
        ))}
      </div>
    </div>
  );
}

export default function StatsLeaders() {
  return (
    <div className="container my-4">
      <div className="row">
        {Object.keys(CATEGORY_META).map(cat => (
          <CategoryCard key={cat} cat={cat} />
        ))}
      </div>
    </div>
  );
}