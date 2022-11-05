import { useEffect, useState } from "react";
import { options } from "../Assets/config";
import { IArtistObject, IHandleInput, IProps } from "../Interface/Interface";
const _ = require("lodash");

function AddNewItem(toggleInputField: IProps) {
  const [item, setItem] = useState<IArtistObject>({
    wins: 0,
    games: 0,
    defeats: "",
    name: "",
    artist: "",
    uri: "",
    album: "",
  });
  const [searchSong, setSearchSong] = useState<any>();
  const [artist, setArtist] = useState<string>("");
  const [track, setTrack] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function addNewSong() {
    const response = await fetch("http://localhost:2000/top50", {
      method: "POST",
      body: JSON.stringify({ item }),
      headers: { "content-type": "application/json" },
    });
    const modal = document.getElementById("form") as HTMLDialogElement;
    modal?.close();
    toggleInputField.setToggleInputField(false);
  }

  async function getSpotifyApi(e: any) {
    setErrorMsg("");
    setSearchSong([]);
    e.preventDefault();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=remaster%2520track%3A${track}%2520artist%3A${artist}&type=track&market=ES&limit=10&offset=5`,
      options
    );
    const data = await response.json();
    if (!response.ok) {
      setErrorMsg("please try again");
    } else if (data.tracks.items.length < 1) {
      setErrorMsg("please try again");
    } else {
      setSearchSong(data);
    }
  }

  function getUriFromSpotifyApi(chosenItem: any) {
    let name = chosenItem.name || "";
    let artist = chosenItem.artists[0].name || "";
    let album = chosenItem.album.name;
    let uri = chosenItem.uri;
    let img =
      chosenItem.album?.images[0].url ||
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

    setItem({ ...item, uri, img, name, artist, album });
  }

  useEffect(() => {
    const modal = document.getElementById("form") as HTMLDialogElement;
    modal.showModal();
  }, []);

  return (
    <dialog id="form">
      <p onClick={() => toggleInputField.setToggleInputField(false)}>X</p>
      <h2>Add new song</h2>
      <form method="POST" onSubmit={(e) => getSpotifyApi(e)}>
        <input
          type="text"
          placeholder="Artist"
          name="artist"
          onChange={(e) => {
            setArtist(e.target.value);
          }}
          required
        ></input>
        <input
          type="text"
          placeholder="Name of song"
          name="name"
          onChange={(e) => {
            setTrack(e.target.value);
          }}
          required
        ></input>
        <button type="submit" value="sök">
          {" "}
          sök
        </button>
      </form>

      <section className="searchResult">
        {searchSong?.tracks?.items?.map((song: any, i: number) => (
          <ul
            key={i}
            onClick={() => getUriFromSpotifyApi(song)}
            className={song.uri === item.uri ? "chosenSong" : ""}
          >
            <li>
              {song.name} - {song.artists[0].name}
            </li>
          </ul>
        ))}
      </section>
      {searchSong?.tracks?.items ? (
        <button onClick={addNewSong}>Add New Song</button>
      ) : errorMsg ? (
        errorMsg
      ) : null}
    </dialog>
  );
}

export default AddNewItem;
