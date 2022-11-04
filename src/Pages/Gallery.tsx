import { useEffect, useState } from "react";
import AddNewItem from "../Components/AddNewItem";
import { IArtistObject, IArtistArray } from "../Interface/Interface";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosStats } from "react-icons/io";

function Gallery() {
  const [allItem, setAllItem] = useState<IArtistArray>([]);
  const [toggleInputField, setToggleInputField] = useState<boolean>();
  const [defeats, setDefeats] = useState<IArtistArray>([]);
  const [id, setId] = useState("");
  async function getAllItems() {
    const response = await fetch("http://localhost:2000/top50");
    setAllItem(await response.json());
  }
  async function deleteItem(item: IArtistObject) {
    const response = await fetch("http://localhost:2000/top50", {
      method: "DELETE",
      body: JSON.stringify({ item }),
      headers: { "Content-Type": "application/json" },
    });
    getAllItems();
  }

  async function getDefeats(item: any) {
    console.log(item);

    const response = await fetch(`http://localhost:2000/matchWinners/${item}`);
    setDefeats(await response.json());
    setId(item);
  }

  useEffect(() => {
    getAllItems();
  }, [toggleInputField]);

  return (
    <section className="gallery">
      <section className="galleryPosts">
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
        </ul>
        {allItem.map((item, i) => (
          <ul className="galleryPost" key={i}>
            <li onClick={() => deleteItem(item)} className="delete">
              ✖️
            </li>
            <img src={item.img}></img>
            <h3 className="title">{item.name}</h3>
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
                  {defeats.length > 0
                    ? defeats?.map((defeat: IArtistObject, i: number) => (
                        <li className=""> {defeat.artist}</li>
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
