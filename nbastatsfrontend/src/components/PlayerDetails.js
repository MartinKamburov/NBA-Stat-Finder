import useWikiBio from "../hooks/useWikiBio";
import { Spinner } from "react-bootstrap";

export default function PlayerDetails({ playerName }) {
  const { info, error } = useWikiBio(playerName);

  if (error) return <div className="text-red-500">Could not load info</div>;
  if (!info) return <Spinner className="mt-2" />;

  return (
    <div className="space-y-2">
      <div>
        <strong>Position:</strong> {info.position || "—"}
      </div>
      <div>
        <strong>League:</strong> {info.league || "—"}
      </div>
      <div>
        <strong>Born:</strong> {info.born || "—"}
      </div>
      <div>
        <strong>Listed height:</strong> {info.listed_height || "—"}
      </div>
      <div>
        <strong>Listed weight:</strong> {info.listed_weight || "—"}
      </div>
    </div>
  );
}