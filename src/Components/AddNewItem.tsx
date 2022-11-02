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
  const [errorMsg, setErrorMsg] = useState<string>("");

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

  async function getSpotifyApi(e: any) {
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
    let uri = chosenItem.uri;
    let img =
      chosenItem.album?.images[0].url ||
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    setItem({ ...item, uri, img });
  }

  useEffect(() => {
    const modal = document.getElementById("form") as HTMLDialogElement;
    modal.showModal();
  }, []);

  return (
    <dialog id="form">
      <h2>Add new song</h2>
      {errorMsg ? errorMsg : null}
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
        <button type="submit" onClick={(e) => getSpotifyApi(e)}>
          Sök
        </button>
      </form>

      <section className="searchResult">
        Pick song:
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
      <button onClick={addNewSong}>Add New Song</button>
      <button onClick={() => toggleInputField.setToggleInputField(false)}>
        Close
      </button>
    </dialog>
  );
}

export default AddNewItem;
