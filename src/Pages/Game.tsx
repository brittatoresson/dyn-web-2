import { useEffect, useState } from "react";
import { IArtistObject, IArtistArray } from "../Interface/Interface";

function Game() {
  const [players, setPlayers] = useState<IArtistArray>([]);
  const [showStatistics, setShowStatistics] = useState<boolean>();
  // const [playerOne, setPlayerOne] = useState<IArtistObject>();
  // const [playerTwo, setPlayerTwo] = useState<IArtistObject>();
  const [id, setId] = useState<string | number>();
  let loser: any;
  let winner: any;

  async function getRandomItems() {
    if (players.length < 2) {
      const response = await fetch("http://localhost:2000/top50/random");
      const data = await response.json();
      setId(data._id);
      setPlayers((player) => [...player, data]);
    }
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
  }, [players]);

  // window.onSpotifyWebPlaybackSDKReady = () => {
  //   const token = '[My access token]';
  //   const player = new Spotify.Player({
  //     name: 'Web Playback SDK Quick Start Player',
  //     getOAuthToken: cb => { cb(token); },
  //     volume: 0.5
  //   });

  return (
    <section className="game">
      <section className="gameBoard">
        {players.map((item: IArtistObject, i) => (
          <ul key={i} onClick={() => selectWinner(item)}>
            <li>{item.artist}</li>
            <li>{item.name}</li>
            <img src={item.img}></img>
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

      <button onClick={resetGame}>play again</button>
    </section>
  );
}

export default Game;
