import { useEffect, useState } from "react";
import { IArtistArray } from "../Interface/Interface";

function NrGames() {
  const [fewGames, setFewGames] = useState<IArtistArray>([]);
  const [manyGames, setManyGames] = useState<IArtistArray>([]);
  const _ = require("lodash");

  async function getFewGames() {
    const response = await fetch("http://localhost:2000/fewMatches");
    setFewGames(await response.json());
  }
  async function getManyGames() {
    const response = await fetch("http://localhost:2000/manyMatches");
    setManyGames(await response.json());
  }
  useEffect(() => {
    getFewGames();
    getManyGames();
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
