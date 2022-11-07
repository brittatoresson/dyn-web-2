import { useEffect, useState } from "react";
import { IArtistArray, IArtistObject } from "../Interface/Interface";

function History() {
  const [allMatches, setAllMatches] = useState<IArtistArray>([]);

  async function getAllMatches() {
    const response = await fetch("http://localhost:2000/matches");
    setAllMatches(await response.json());
  }

  async function deleteMatch(item: IArtistObject) {
    const response = await fetch(`http://localhost:2000/matches/${item._id}`, {
      method: "DELETE",
      body: JSON.stringify({ item }),

      headers: { "Content-Type": "application/json" },
    });
    getAllMatches();
  }

  useEffect(() => {
    getAllMatches();
  }, []);

  return (
    <section className="history">
      {allMatches.length > 0
        ? allMatches.map((item: any, i: number) => (
            <ul key={i} className="historyPost">
              <article className="historyWinner">
                <h3>Winner</h3>
                <img src={item.winner.img}></img>
                <li> {item.winner.name}</li>
              </article>
              <p className="VS">VS</p>
              <li onClick={() => deleteMatch(item)} id="delete">
                ✖️
              </li>
              <article className="historyLoser">
                <h3>Loser</h3>
                <img src={item.loser.img}></img>
                <li> {item.loser.name}</li>
              </article>
            </ul>
          ))
        : " No games played yet"}
    </section>
  );
}

export default History;
