import { useEffect, useState, useMemo } from "react";
import { useParams }            from "react-router-dom";
import PlayerPicture            from "../components/PlayerPicture";
import PlayerDetails            from "../components/PlayerDetails";

export default function PlayerPage() {
    const { name }    = useParams();
    const playerName  = decodeURIComponent(name);
    const [stats, setStats] = useState([]);
    const [showSummary, setShowSummary] = useState(true);

    useEffect(() => {
        fetch(`/api/player/${encodeURIComponent(playerName)}`)
        .then(r => r.json())
        .then(setStats)
        .catch(console.error);
    }, [playerName]);

    console.log("Here is the player stuff: ");
    console.log(stats);

    const summary = useMemo(() => {
        if (!stats.length) {
            return {
            ppg: 0, rpg: 0, apg: 0,
            fgPct: 0, threePct: 0, ftPct: 0
            };
        }

        const totals = stats.reduce((acc, g) => ({
            pts:   acc.pts   + g.pts,
            reb:   acc.reb   + g.trb,
            ast:   acc.ast   + g.ast,
            fg:    acc.fg    + g.fg,
            three: acc.three + g.three_pm,
            fga:   acc.fga   + g.fga,
            three_pa: acc.three_pa + g.three_pa,
            ft:    acc.ft    + g.ft,
            fta:   acc.fta   + g.fta,
        }), { pts:0, reb:0, ast:0, fg:0, three:0, fga:0, three_pa:0, ft:0, fta:0 });

        const games = stats.length;
        const ppg = totals.pts / games;
        const rpg = totals.reb / games;
        const apg = totals.ast / games;

        const fgPct    = totals.fga   ? (totals.fg    / totals.fga)   * 100 : 0;
        const threePct = totals.three_pa 
                        ? (totals.three / totals.three_pa) * 100 
                        : 0;
        const ftPct    = totals.fta   ? (totals.ft    / totals.fta)   * 100 : 0;

        return {
            ppg:  ppg.toFixed(1),
            rpg:  rpg.toFixed(1),
            apg:  apg.toFixed(1),
            fgPct:    fgPct.toFixed(1),
            threePct: threePct.toFixed(1),
            ftPct:    ftPct.toFixed(1),
        };
    }, [stats]);

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

            {/* header + toggle buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Stats for {playerName} 2024–2025</h2>
                <div className="btn-group" role="group" aria-label="View toggle">
                    <button
                        type="button"
                        className={`btn ${showSummary ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setShowSummary(true)}
                    >
                        Summary
                    </button>
                    <button
                        type="button"
                        className={`btn ${!showSummary ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setShowSummary(false)}
                    >
                        Full Stats
                    </button>
                </div>
            </div>

            {/* conditional content */}
            {showSummary ? (
                <div className="row text-center">
                {/** We have 7 metrics, so we'll give each a col-md-3 / col-lg-2 */}
                {[
                    ["PPG",  summary.ppg],
                    ["RPG",  summary.rpg],
                    ["APG",  summary.apg],
                    ["FG %", summary.fgPct],
                    ["3P %", summary.threePct],
                    ["FT %", summary.ftPct],
                ].map(([label, value]) => (
                    <div className="col-6 col-md-4 col-lg-2 mb-3" key={label}>
                    <div className="card h-100">
                        <div className="card-header">{label}</div>
                        <div className="card-body d-flex align-items-center justify-content-center">
                        <h3 className="card-title">{value}</h3>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
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
            )}
        </div>
    );
}