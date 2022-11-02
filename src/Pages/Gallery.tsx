import { useEffect, useState } from "react";
import AddNewItem from "../Components/AddNewItem";
import { IArtistObject, IArtistArray } from "../Interface/Interface";

function Gallery() {
  const [allItem, setAllItem] = useState<IArtistArray>([]);
  const [toggleInputField, setToggleInputField] = useState<boolean>();
  const [defeats, setDefeats] = useState<IArtistArray>([]);

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
    const response = await fetch(`http://localhost:2000/matchWinners/${item}`);
    setDefeats(await response.json());
  }

  useEffect(() => {
    getAllItems();
  }, [toggleInputField]);

  return (
    <section className="gallery">
      <section className="galleryPosts">
        {allItem.map((item, i) => (
          <ul className="galleryPost" key={i}>
            <ul onMouseOver={() => getDefeats(item._id)}>
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
              {defeats.length > 0
                ? defeats?.map((defeat: IArtistObject, i: number) => (
                    <li key={i}>
                      {" "}
                      Defeats {defeat.name} with {defeat.artist}{" "}
                    </li>
                  ))
                : "No defeats"}
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
