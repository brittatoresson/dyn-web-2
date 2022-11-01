import { useEffect, useState } from "react";
import { IArtistObject, IArtistArray } from "../Interface/Interface";

function Battle() {
  const [players, setPlayers] = useState<IArtistArray>([]);
  const [playerOne, setPlayerOne] = useState<IArtistObject>();
  const [playerTwo, setPlayerTwo] = useState<IArtistObject>();
  const [id, setId] = useState<string | number>();
  let loser: any;
  let winner: any;

  async function getRandomItems() {
    const response = await fetch("http://localhost:2000/top50/random");
    const data = await response.json();
    setId(data._id);
    setPlayerOne(data);
    setPlayers((player) => [...player, data]);
  }

  async function selectWinner(item: IArtistObject) {
    loser = players.find((player) => player._id !== item._id);
    winner = players.find((player) => player._id == item._id);

    const response = await fetch("http://localhost:2000/matches", {
      method: "POST",
      body: JSON.stringify({ winner: winner, loser: loser }),
      headers: { "Content-Type": "application/json" },
    });
    updateStatistics(item);
  }

  async function updateStatistics(item: IArtistObject) {
    const response = await fetch("http://localhost:2000/matches", {
      method: "PUT",
      body: JSON.stringify({ winner: winner?._id, loser: loser?._id }),
      headers: { "Content-Type": "application/json" },
    });
  }

  function resetGame() {
    setPlayers([]);
    getRandomItems();
  }

  useEffect(() => {
    if (players.length < 1) {
      getRandomItems();
    }
    console.log(players);
  }, [players]);

  return (
    <section>
      <p>battle</p>;
      {players.map((item: IArtistObject, i) => (
        <ul key={i} onClick={() => selectWinner(item)}>
          <li>{item.artist}</li>
          <li>{item.name}</li>
          <img src={item.img}></img>
        </ul>
      ))}
      <button onClick={resetGame}>play again</button>
    </section>
  );
}

export default Battle;
