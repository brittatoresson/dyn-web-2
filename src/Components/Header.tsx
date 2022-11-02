import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/game">Game</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/statistics">Statistics</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}

export default Header;
