import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerPicture from "../components/PlayerPicture";
import PlayerDetails from "../components/PlayerDetails";


export default function PlayerPage() {
    // 1) grab the ":name" path param
    const { name } = useParams();                                        
    // 2) decode it (because we did encodeURIComponent when navigating)
    const playerName = decodeURIComponent(name);                         


    // optional: fetch that player’s stats here, e.g. into state
    const [stats, setStats] = useState([]);
    useEffect(() => {
        fetch(`/api/player/${encodeURIComponent(playerName)}`)
        .then(r => r.json())
        .then(setStats)
        .catch(console.error);

        
    }, [playerName]);

    console.log("Here is the current array for the player", name);
    console.log(stats);

    return (
        <div style={{ padding: 20 }}>
            {/* display the current player’s name */}
            <div className="flex flex-wrap items-start gap-8">
                <PlayerPicture
                playerName={name}
                />

                <div className="flex-1 min-w-[200px]">
                    <PlayerDetails />
                </div>
            </div>     

            <h1 className="text-3xl font-bold mb-6">Stats for {name} 2024-2025</h1>                              

            {/* optional: render your stats table */}
            <table className="table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Team</th>
                    <th>Opp</th>
                    <th>PTS</th>
                    <th>REB</th>
                    <th>AST</th>
                    {/* …etc… */}
                </tr>
                </thead>
                <tbody>
                {stats.map((g, i) => (
                    <tr key={i}>
                        <td>{g.game_date}</td>
                        <td>{g.team}</td>
                        <td>{g.opp}</td>
                        <td>{g.pts}</td>
                        <td>{g.trb}</td>
                        <td>{g.ast}</td>
                        <td>{g.ast}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
  );
}