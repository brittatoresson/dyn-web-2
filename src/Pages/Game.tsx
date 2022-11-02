import { useEffect, useState } from "react";
import { IArtistObject, IArtistArray } from "../Interface/Interface";
import { BsShuffle } from "react-icons/bs";

function Game() {
  const [players, setPlayers] = useState<IArtistArray>([]);
  const [showStatistics, setShowStatistics] = useState<boolean>();
  const [winners, setWinners] = useState<IArtistObject>();
  let loser: any;
  let winner: any;

  async function getRandomItems() {
    const response = await fetch("http://localhost:2000/top50/random");
    const data = await response.json();
    setPlayers(data);
  }

  async function selectWinner(item: IArtistObject) {
    loser = players.find((player) => player._id !== item._id);
    winner = players.find((player) => player._id == item._id);
    setWinners(winner);

    const response = await fetch("http://localhost:2000/matches", {
      method: "POST",
      body: JSON.stringify({ winner: winner, loser: loser }),
      headers: { "Content-Type": "application/json" },
    });
    updateStatistics(item);
    setShowStatistics(true);
  }

  async function updateStatistics(item: IArtistObject) {
    const response = await fetch("http://localhost:2000/matches", {
      method: "PUT",
      body: JSON.stringify({ winner: winner?._id, loser: loser?._id }),
      headers: { "Content-Type": "application/json" },
    });
  }

  function resetGame() {
    getRandomItems();
    setPlayers([]);
    setShowStatistics(false);
  }

  useEffect(() => {
    getRandomItems();
  }, []);

  return (
    <section className="game">
      <section className="gameBoard">
        {players.map((item: IArtistObject, i) => (
          <ul
            key={i}
            onClick={() => selectWinner(item)}
            className={
              winners?._id !== item._id && showStatistics ? "togglePlayer" : ""
            }
          >
            <img src={item.img}></img>
            <li>
              {item.name} with {item.artist}
            </li>
            {showStatistics ? (
              <>
                {" "}
                <li>Total games: {item.games}</li>
                <li>Wins: {item.wins}</li>
                <li>Losses: {item.defeats}</li>
                <li>Listen {item.uri}</li>{" "}
              </>
            ) : null}
          </ul>
        ))}
      </section>

      <button onClick={resetGame}>
        <BsShuffle />
      </button>
    </section>
  );
}

export default Game;
