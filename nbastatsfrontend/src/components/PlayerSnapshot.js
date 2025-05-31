import { Link } from "react-router-dom";
import PlayerPicture from "./PlayerPicture";

/**
 * One compact “avatar row” in the leaders boxes.
 *
 * Props
 *  ─ rank    ⇒ 1, 2, 3 …
 *  ─ player  ⇒ "LeBron James"
 *  ─ team    ⇒ "LAL"
 *  ─ value   ⇒ 27.4
 *  ─ suffix  ⇒ " PPG"  (or " APG", " RPG")
 */
export default function PlayerSnapshot({ rank, player, team, value, suffix }) {
  return (
    <li
      className="d-flex align-items-center py-1 gap-2"
      style={{ fontSize: ".9rem" }}
    >
      <strong className="me-1">{rank}.</strong>

      {/* tiny round head-shot (falls back to blank if Wikipedia has none) */}
      <PlayerPicture playerName={player} size={32} />

      {/* player name + team (truncates nicely on narrow screens) */}
      <span className="flex-grow-1 text-truncate">
        <Link
          to={`/player/${encodeURIComponent(player)}`}
          className="text-decoration-none"
        >
          {player}
        </Link>{" "}
        <small className="text-muted">({team})</small>
      </span>

      {/* numeric value right-aligned */}
      <span className="fw-semibold text-nowrap ms-auto">
        {value}
        {suffix}
      </span>
    </li>
  );
}