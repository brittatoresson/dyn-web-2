import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { options, token } from "../Assets/config";

console.log(token);

function Spotify(item: any) {
  const [error, setError] = useState("");
  const [spotifyToken, setSpotifyToken] = useState("");
  // hej.then((hes) => setSpotifyToken(hes));
  function controllAccessToSpotify() {
    try {
      fetch("https://api.spotify.com/v1/me/player/devices", {
        method: "GET",
        headers: {
          Authorization: `"Bearer ${token}"`,
        },
      }).then((response) => {
        if (response.status !== 200) {
          setError("No access to Spotify web player");
          throw new Error("No access to Spotify");
        }
      });
    } catch (error) {}
  }
  useEffect(() => {
    controllAccessToSpotify();
    console.log(spotifyToken);
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
