import { useContext, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { token, options } from "../Assets/config";

function Spotify(item: any) {
  const [error, setError] = useState("");
  let uri = item.item.uri;

  function controllAccessToSpotify() {
    try {
      fetch("https://api.spotify.com/v1/me/player/devices", options).then(
        (response) => {
          if (response.status !== 200) {
            setError("No access to Spotify web player");
            throw new Error("No access to Spotify");
          }
        }
      );
    } catch (error) {}
  }
  useEffect(() => {
    controllAccessToSpotify();
  }, []);

  return (
    <section className="spotifyPlayer">
      {error.length > 1 ? (
        error
      ) : (
        <SpotifyPlayer token={token} uris={[`${uri}`]} />
      )}{" "}
    </section>
  );
}

export default Spotify;
