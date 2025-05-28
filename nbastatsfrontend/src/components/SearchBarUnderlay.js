import { ListGroup } from "react-bootstrap";

export default function SearchBarUnderlay({
  prefix,
  matches = [],
  onSelect,
}) {
  if (!prefix || matches.length === 0) return null;

  return (
    <ListGroup
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {matches.map(name => (
        <ListGroup.Item
          key={name}
          action
          onClick={() => onSelect(name)}
        >
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}