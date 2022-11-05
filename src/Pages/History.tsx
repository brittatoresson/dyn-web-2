import { useEffect, useState } from "react";
import {
  IAllMatches,
  IArtistArray,
  IArtistObject,
} from "../Interface/Interface";

function History() {
  const [allMatches, setAllMatches] = useState<any>([]);
  const [deleteItem, setDeleteItem] = useState<IArtistObject>();

  async function getAllMatches() {
    const response = await fetch("http://localhost:2000/matches");
    setAllMatches(await response.json());
  }

  async function deleteMatch(item: IArtistObject) {
    const response = await fetch(`http://localhost:2000/matches/${item._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(await response.json());
    getAllMatches();
  }

  useEffect(() => {
    getAllMatches();
  }, []);

  return (
    <section className="history">
      {allMatches
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
        : null}
    </section>
  );
}

export default History;