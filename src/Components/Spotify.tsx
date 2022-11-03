import SpotifyPlayer from "react-spotify-web-playback";
import { IArtistObject } from "../Interface/Interface";
import { token } from "../config";
function Spotify(item: any) {
  console.log(item);

  let uri = item.item.uri;

  return (
    <section>
      {" "}
      <SpotifyPlayer
        token={token}
        uris={[`${uri}`]}
        styles={{
          activeColor: "#fed",
          bgColor: "#333",
          color: "#dsa",
          loaderColor: "#dst",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#jgv",
          height: "5vh",
        }}
      />
    </section>
  );
}

export default Spotify;
