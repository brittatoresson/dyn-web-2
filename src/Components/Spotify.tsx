import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { options, token } from "../Assets/config";

function Spotify(item: any) {
  const [error, setError] = useState("");
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

  let uri = item.item.uri;
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
