import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/battle">Game</Link>
      <Link to="/gallery">Gallery</Link>
    </nav>
  );
}

export default Header;
