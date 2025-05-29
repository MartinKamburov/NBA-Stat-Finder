import { useEffect, useState } from "react";
import { useParams }            from "react-router-dom";
import PlayerPicture            from "../components/PlayerPicture";
import PlayerDetails            from "../components/PlayerDetails";

export default function PlayerPage() {
  const { name }    = useParams();
  const playerName  = decodeURIComponent(name);
  const [stats, setStats] = useState([]);
  const [currentStats, setCurrentStats] = useState();

  useEffect(() => {
    fetch(`/api/player/${encodeURIComponent(playerName)}`)
      .then(r => r.json())
      .then(setStats)
      .catch(console.error);
  }, [playerName]);



  return (
    <div className="container py-4">
      {/* picture + bio row */}
        <div className="row mb-5 align-items-start">
            {/* picture */}
            <div className="col-12 col-md-4 mb-3 mb-md-0">
                <PlayerPicture playerName={playerName} />
            </div>

            {/* details */}
            <div className="col-12 col-md-8">
                <PlayerDetails name={playerName} />
            </div>
        </div>

        {/* stats header */}
        <div class="dropdown">
            <h2 className="mb-3">Stats for {playerName} 2024–2025</h2>
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
            </div>
        </div>

      {/* responsive table wrapper */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Team</th>
              <th>Opp</th>
              <th className="text-end">Result</th>
              <th className="text-end">MP</th>
              <th className="text-end">FG</th>
              <th className="text-end">FGA</th>
              <th className="text-end">FG%</th>
              <th className="text-end">3P</th>
              <th className="text-end">3PA</th>
              <th className="text-end">3P%</th>
              <th className="text-end">FT</th>
              <th className="text-end">FTA</th>
              <th className="text-end">FT%</th>
              <th className="text-end">ORB</th>
              <th className="text-end">DRB</th>
              <th className="text-end">TRB</th>
              <th className="text-end">AST</th>
              <th className="text-end">STL</th>
              <th className="text-end">BLK</th>
              <th className="text-end">TOV</th>
              <th className="text-end">PF</th>
              <th className="text-end">PTS</th>
              <th className="text-end">GmSc</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((g,i) => (
              <tr key={i}>
                <td>{g.game_date}</td>
                <td>{g.team}</td>
                <td>{g.opponent}</td>
                <td className="text-end">{g.result}</td>
                <td className="text-end">{g.minutes_played}</td>
                <td className="text-end">{g.fg}</td>
                <td className="text-end">{g.fga}</td>
                <td className="text-end">{g.fg_pct}</td>
                <td className="text-end">{g.three_pm}</td>
                <td className="text-end">{g.three_pa}</td>
                <td className="text-end">{g.three_pct}</td>
                <td className="text-end">{g.ft}</td>
                <td className="text-end">{g.fta}</td>
                <td className="text-end">{g.ft_pct}</td>
                <td className="text-end">{g.orb}</td>
                <td className="text-end">{g.drb}</td>
                <td className="text-end">{g.trb}</td>
                <td className="text-end">{g.ast}</td>
                <td className="text-end">{g.stl}</td>
                <td className="text-end">{g.blk}</td>
                <td className="text-end">{g.tov}</td>
                <td className="text-end">{g.pf}</td>
                <td className="text-end">{g.pts}</td>
                <td className="text-end">{g.gmsc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}