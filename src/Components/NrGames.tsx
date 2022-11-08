import { useEffect, useState } from "react";
import { IArtistArray } from "../Interface/Interface";

function NrGames() {
  const [fewGames, setFewGames] = useState<IArtistArray>([]);
  const [manyGames, setManyGames] = useState<IArtistArray>([]);
  const _ = require("lodash");

  async function getFewGamesPlayed() {
    const response = await fetch(
      "https://dyn-web-2-8tqt.onrender.com/fewMatches"
    );
    // const response = await fetch("http://localhost:2000/fewMatches");
    setFewGames(await response.json());
  }
  async function getManyGamesPlayed() {
    const response = await fetch(
      "https://dyn-web-2-8tqt.onrender.com/manyMatches"
    );
    // const response = await fetch("http://localhost:2000/manyMatches");
    setManyGames(await response.json());
  }
  useEffect(() => {
    getFewGamesPlayed();
    getManyGamesPlayed();
  }, []);

  return (
    <article className="nrGames">
      <h3>Slackers:</h3>
      {fewGames.map((item, i) => (
        <li key={i}>{_.upperFirst(item.name)}</li>
      ))}
      <h3>Fighters:</h3>
      {manyGames.map((item, i) => (
        <li key={i}>{item.name}</li>
      ))}
    </article>
  );
}

export default NrGames;
