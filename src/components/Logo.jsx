import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <h1>
        GAME <span style={{ color: "rgb(0, 94, 189)" }}>DB</span>
      </h1>
    </Link>
  );
}
