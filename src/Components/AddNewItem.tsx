import { useEffect, useState } from "react";
import { options } from "../config";
import { IArtistObject, IHandleInput, IProps } from "../Interface/Interface";

function AddNewItem(toggleInputField: IProps) {
  const [item, setItem] = useState<IArtistObject>({
    wins: 0,
    games: 0,
    defeats: "",
    name: "",
    artist: "",
    uri: "",
    active: false,
  });
  const [searchSong, setSearchSong] = useState<any>();
  const [artist, setArtist] = useState<string>("");
  const [track, setTrack] = useState<string>("");

  function handleInput(e: IHandleInput) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }
  async function addNewSong() {
    toggleInputField.setToggleInputField(false);
    const response = await fetch("http://localhost:2000/top50", {
      method: "POST",
      body: JSON.stringify({ item }),
      headers: { "content-type": "application/json" },
    });
    const modal = document.getElementById("form") as HTMLDialogElement;
    modal?.close();
  }

  async function getSpotifyApi() {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=remaster%2520track%3A${track}%2520artist%3A${artist}&type=track&market=ES&limit=10&offset=5`,
      options
    );
    setSearchSong(await response.json());
  }
  function getUriFromSpotifyApi(chosenItem: any) {
    let uri = chosenItem.uri;
    let img = chosenItem.album.images[0].url;
    setItem({ ...item, uri, img });
  }

  useEffect(() => {
    const modal = document.getElementById("form") as HTMLDialogElement;
    modal.showModal();
  }, []);

  return (
    <dialog id="form">
      <h2>Add new song</h2>
      <form method="POST">
        <input
          type="text"
          placeholder="Artist"
          name="artist"
          onChange={(e) => {
            handleInput(e);
            setArtist(e.target.value);
          }}
          required
        ></input>
        <input
          type="text"
          placeholder="Name of song"
          name="name"
          onChange={(e) => {
            handleInput(e);
            setTrack(e.target.value);
          }}
          required
        ></input>
        <button type="submit" onClick={getSpotifyApi}>
          Sök
        </button>
      </form>

      <section className="searchResult">
        Pick song:
        {searchSong?.tracks?.items?.map((song: any, i: number) => (
          <ul
            key={i}
            onClick={() => getUriFromSpotifyApi(i)}
            className={song.uri === item.uri ? "chosenSong" : ""}
          >
            <li>
              {song.name} - {song.artists[0].name}
            </li>
          </ul>
        ))}
      </section>
      <button onClick={addNewSong}>Add New Song</button>
      <button onClick={() => toggleInputField.setToggleInputField(false)}>
        Close
      </button>
    </dialog>
  );
}

export default AddNewItem;
