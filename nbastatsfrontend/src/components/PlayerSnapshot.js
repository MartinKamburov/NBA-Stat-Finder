import useWikiImage from '../hooks/useWikiImage';

export default function PlayerSnapshot({ rank, player, team, value, suffix }) {
  const { url } = useWikiImage(player, 64);     // 64 px square

  return (
    <div className="d-flex align-items-center mb-1">
      <strong className="me-1">{rank}.</strong>
      <img
        src={url}
        alt={player}
        width="32"
        height="32"
        className="rounded-circle border me-2"
        style={{ objectFit: 'cover' }}
      />
      <div className="flex-grow-1 small">
        {player} <span className="text-muted">({team})</span>
      </div>
      <div className="fw-bold ms-1">{value.toFixed(1)} {suffix}</div>
    </div>
  );
}