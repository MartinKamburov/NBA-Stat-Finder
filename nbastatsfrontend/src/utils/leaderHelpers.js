/**
 * What each category means and where to fetch it.
 * The keys (pts, ast, trb) must match the backend endpoints
 * `/api/leaders/{stat}` you created in Spring Boot.
 */
export const CATEGORY_META = {
  pts: {                       // points-per-game leaders
    title: "Points",
    suffix: "PPG",
    endpoint: "/leaders/pts",
  },
  ast: {                       // assists-per-game leaders
    title: "Assists",
    suffix: "APG",
    endpoint: "/leaders/ast",
  },
  trb: {                       // rebounds-per-game leaders
    title: "Rebounds",
    suffix: "RPG",
    endpoint: "/leaders/trb",
  },
};

/**
 * Crunch the raw row array you get back from `/api/player`
 * into a TOP-N leaderboard for the given stat.
 */
export function computeLeaders(rows, statKey, topN = 5, mode = "avg") {
  const perPlayer = Object.create(null);

  rows.forEach((r) => {
    const player = r.player;
    const value  = Number(r[statKey]);
    if (Number.isNaN(value)) return;

    if (!perPlayer[player]) {
      perPlayer[player] = { player, team: r.team, total: 0, games: 0 };
    }
    perPlayer[player].total += value;
    perPlayer[player].games += 1;
  });

  return Object.values(perPlayer)
    .map(p => ({
      ...p,
      value:
        mode === "avg"
          ? +(p.total / p.games).toFixed(1)
          : p.total,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}