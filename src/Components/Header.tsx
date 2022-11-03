import { Link } from "react-router-dom";
import { BsSpotify } from "react-icons/bs";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">
          <BsSpotify />
        </Link>
        <Link to="/game">Game</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/history">History</Link>
      </nav>
    </header>
  );
}

export default Header;
