import { useEffect, useState } from "react";
import { IArtistObject, IArtistArray } from "../Interface/Interface";
import { BsShuffle, BsHeart, BsHeartFill } from "react-icons/bs";
import Spotify from "../Components/Spotify";

function Game() {
  const [players, setPlayers] = useState<IArtistArray>([]);
  const [showStatistics, setShowStatistics] = useState<boolean>();
  const [winners, setWinners] = useState<IArtistObject>();
  let loser: any;
  let winner: any;

  async function getTwoRandomItems() {
    const response = await fetch(
      "https://dyn-web-2-8tqt.onrender.com/top20/random"
    );
    const data = await response.json();
    setPlayers(data);
  }

  async function selectWinner(item: IArtistObject) {
    loser = players.find((player) => player._id !== item._id);
    winner = players.find((player) => player._id == item._id);
    setWinners(winner);

    const response = await fetch(
      "https://dyn-web-2-8tqt.onrender.com/matches",
      {
        method: "POST",
        body: JSON.stringify({ winner: winner, loser: loser }),
        headers: { "Content-Type": "application/json" },
      }
    );
    updateStatistics(item);
    setShowStatistics(true);
  }

  async function updateStatistics(item: IArtistObject) {
    const response = await fetch(
      "https://dyn-web-2-8tqt.onrender.com/matches",
      {
        method: "PUT",
        body: JSON.stringify({ winner: winner?._id, loser: loser?._id }),
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  function resetGame() {
    getTwoRandomItems();
    setPlayers([]);
    setShowStatistics(false);
  }

  useEffect(() => {
    getTwoRandomItems();
  }, []);

  return (
    <section className="game">
      <section className="gameBoard">
        {players.map((item: IArtistObject, i) => (
          <ul
            key={i}
            className={
              winners?._id !== item._id && showStatistics ? "togglePlayer" : ""
            }
          >
            <img src={item.img}></img>
            <li>{item.name}</li>
            <li>{item.artist}</li>
            <li className="blinkHeart" onClick={() => selectWinner(item)}>
              {winners?._id == item._id && showStatistics ? (
                <BsHeartFill />
              ) : (
                <BsHeart />
              )}
            </li>
            {showStatistics ? (
              <>
                {" "}
                <li>Total games: {item.games}</li>
                <li>Wins: {item.wins}</li>
                <li>Losses: {item.defeats}</li>
              </>
            ) : null}
            {winners?._id === item._id ? <Spotify item={winners} /> : null}
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
