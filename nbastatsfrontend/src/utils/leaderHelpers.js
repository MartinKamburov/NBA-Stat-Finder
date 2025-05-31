/**
 * Crunch the raw row array you get back from `/api/player`
 * into a TOP-N leaderboard for the given stat.
 *
 * @param {Array<Object>} rows    – One row per game
 * @param {string}       statKey  – “pts”, “ast”, “trb”, …
 * @param {number}       topN     – How many leaders to return
 * @param {"avg"|"sum"}  mode     – "avg" ➜ per-game average, "sum" ➜ season total
 */
export function computeLeaders(rows, statKey, topN = 5, mode = "avg") {
  const perPlayer = Object.create(null);

  rows.forEach((r) => {
    const player = r.player;
    const value = Number(r[statKey]);               // make sure it’s numeric
    if (Number.isNaN(value)) return;                // skip bad data rows

    if (!perPlayer[player]) {
      perPlayer[player] = { player, team: r.team, total: 0, games: 0 };
    }
    perPlayer[player].total += value;
    perPlayer[player].games += 1;
  });

  // convert to an array of { player, team, value }
  const list = Object.values(perPlayer).map((p) => ({
    ...p,
    value:
      mode === "avg"
        ? +(p.total / p.games).toFixed(1)           // e.g. 27.3 PPG
        : p.total,
  }));

  return list.sort((a, b) => b.value - a.value).slice(0, topN);
}