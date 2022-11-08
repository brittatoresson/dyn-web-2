import { useEffect, useState } from "react";
import AddNewItem from "../Components/AddNewItem";
import { IArtistObject, IArtistArray } from "../Interface/Interface";
import { IoIosStats } from "react-icons/io";

function Gallery() {
  const [allItem, setAllItem] = useState<IArtistArray>([]);
  const [toggleInputField, setToggleInputField] = useState<boolean>();
  const [defeats, setDefeats] = useState<IArtistArray>([]);
  const [id, setId] = useState<string | undefined>("");
  const [sum, setSum] = useState(0);

  async function getAllItemsFromTop20() {
    const response = await fetch("https://dyn-web-2-8tqt.onrender.com/top20");
    setAllItem(await response.json());
  }

  async function deleteItem(item: IArtistObject) {
    const response = await fetch(
      `https://dyn-web-2-8tqt.onrender.com/top20/${item._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    getAllItemsFromTop20();
  }

  async function getDefeats(item: string | undefined) {
    const response = await fetch(
      `https://dyn-web-2-8tqt.onrender.com/matchWinners/${item}`
    );
    setDefeats(await response.json());
    setId(item);
  }

  function getPopularity() {
    let totalGames: any[] = [];
    allItem.map((item) => {
      totalGames.push(item.games);
      var sum = totalGames.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
      }, 0);
      setSum(sum);
    });
  }

  useEffect(() => {
    getPopularity();
  }, [allItem]);

  useEffect(() => {
    getAllItemsFromTop20();
  }, [toggleInputField]);

  return (
    <section className="gallery">
      <section
        className="galleryPosts"
        id={toggleInputField == true ? "toggleOpacity" : ""}
      >
        {toggleInputField ? (
          <AddNewItem setToggleInputField={setToggleInputField} />
        ) : (
          <button onClick={() => setToggleInputField(true)}>
            {" "}
            Add new song
          </button>
        )}{" "}
        <ul className="galleryHeaders">
          <p className="name">Track</p>
          <p className="albums">Album</p>
          <p className="popularity">Popularity</p>
        </ul>
        {allItem.map((item, i) => (
          <ul className="galleryPost" key={i}>
            <li onClick={() => deleteItem(item)} className="delete">
              ✖️
            </li>
            <img src={item.img}></img>
            {item.wins > 0 ? (
              <li className="sum">
                {Math.round((sum / 100) * item.wins * 10)} %{" "}
              </li>
            ) : (
              <li className="sum">0 %</li>
            )}
            <li className="title">{item.name}</li>
            <li className="artist">{item.artist}</li>
            <li className="album">{item.album}</li>
            <li className="navdot" onClick={() => getDefeats(item._id)}>
              <IoIosStats />
            </li>{" "}
            {id == item._id ? (
              <section className="gameInfoContainer">
                <ul className="gameInfo" key={i + 1}>
                  <li>Wins: {item.wins}</li>
                  <li>Losses: {item.defeats}</li>
                  <li>Total games: {item.games}</li>
                </ul>
                <ul key={i} className="defeats">
                  <li>Defeats:</li>
                  {defeats.length > 0
                    ? defeats?.map((defeat: IArtistObject, i: number) => (
                        <li key={i}> {defeat.artist}</li>
                      ))
                    : ""}
                </ul>
              </section>
            ) : null}
          </ul>
        ))}
      </section>
    </section>
  );
}

export default Gallery;
