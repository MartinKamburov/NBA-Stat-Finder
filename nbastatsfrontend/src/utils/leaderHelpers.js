export function computeLeaders(rows, statKey, topN = 5) {
  const perPlayer = {};

  rows.forEach((r) => {
    const key = r.player;
    if (!perPlayer[key]) {
      perPlayer[key] = { player: r.player, team: r.team, total: 0, games: 0 };
    }
    perPlayer[key].total += Number(r[statKey]);
    perPlayer[key].games += 1;
  });

  return Object.values(perPlayer)
    .map((p) => ({
      ...p,
      value: +(p.total / p.games).toFixed(1), // season average
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}