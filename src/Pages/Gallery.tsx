import { useEffect, useState } from "react";
import AddNewItem from "../Components/AddNewItem";
import { IArtistObject, IArtistArray } from "../Interface/Interface";

function Gallery() {
  const [allItem, setAllItem] = useState<IArtistArray>([]);
  const [toggleInputField, setToggleInputField] = useState<boolean>();

  async function getAllItems() {
    const response = await fetch("http://localhost:2000/top50");
    const data = await response.json();
    setAllItem(data);
  }
  async function deleteItem(item: IArtistObject) {
    const response = await fetch("http://localhost:2000/top50", {
      method: "DELETE",
      body: JSON.stringify({ item }),
      headers: { "Content-Type": "application/json" },
    });
    getAllItems();
  }

  useEffect(() => {
    getAllItems();
  }, [toggleInputField]);

  return (
    <section className="gallery">
      <section className="galleryPosts">
        {allItem.map((item, i) => (
          <ul className="galleryPost" key={i}>
            <ul>
              <li onClick={() => deleteItem(item)} id="deleteItem">
                ✖️
              </li>
              <img src={item.img}></img>
              <li>{item.name}</li>
              <li>{item.artist}</li>
            </ul>
            <ul className="toggelGameInfo">
              <li>Wins: {item.wins}</li>
              <li>Losses: {item.defeats}</li>
              <li>Total games: {item.games}</li>
            </ul>
          </ul>
        ))}
      </section>
      {toggleInputField ? (
        <AddNewItem setToggleInputField={setToggleInputField} />
      ) : (
        <button onClick={() => setToggleInputField(true)}> Add new song</button>
      )}{" "}
    </section>
  );
}

export default Gallery;
