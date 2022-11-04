import SpotifyPlayer from "react-spotify-web-playback";
import { IArtistObject } from "../Interface/Interface";
import { token } from "../config";
function Spotify(item: any) {
  let uri = item.item.uri;
  return (
    <section className="spotifyPlayer">
      {" "}
      <SpotifyPlayer
        token={token}
        uris={[`${uri}`]}
        styles={
          {
            // activeColor: "#fed",
            // bgColor: "#333",
            // color: "#dsa",
            // loaderColor: "#dst",
            // sliderColor: "#1cb954",
            // trackArtistColor: "#ccc",
            // trackNameColor: "#jgv",
          }
        }
      />
    </section>
  );
}

export default Spotify;
