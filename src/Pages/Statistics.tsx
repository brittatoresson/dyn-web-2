import { useEffect, useState } from "react";
import { IArtistArray } from "../Interface/Interface";

function Statistics() {
  const [top5, setTop5] = useState<IArtistArray>([]);
  const [bottom5, setBottom5] = useState<IArtistArray>([]);

  async function getTop5() {
    const response = await fetch("http://localhost:2000/winners");
    setTop5(await response.json());
  }
  async function getBottom5() {
    const response = await fetch("http://localhost:2000/losers");
    setBottom5(await response.json());
  }

  useEffect(() => {
    getTop5();
    getBottom5();
  }, []);

  return (
    <section className="statistics">
      <article>
        <h3>Top 5 winners</h3>
        {top5.map((item, i) => (
          <ul key={i}>
            <li> {item.name}</li>
            <li> {item.wins} wins </li>
          </ul>
        ))}
      </article>
      <article>
        <h3>Top 5 losers</h3>
        {bottom5.map((item, i) => (
          <ul key={i}>
            <li> {item.name}</li>
            <li> {item.defeats} defeats </li>
          </ul>
        ))}
      </article>
    </section>
  );
}

export default Statistics;
