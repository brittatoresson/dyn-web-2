import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header";
import Game from "./Pages/Game";
import Gallery from "./Pages/Gallery";
import LandingPage from "./Pages/LandingPage";
import Statistics from "./Pages/Statistics";
import History from "./Pages/History";
import { useEffect, useState } from "react";
import { options } from "./Assets/config";

function App() {
  const [test, setTest] = useState<any>();
  let playlist = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF";

  useEffect(() => {
    fetch(playlist, options)
      .then((response) => response.json())
      .then((data) => setTest(data.tracks))
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   if (test) {
  //     test.items.map((i: any) => {
  //       console.log(i.track.name);
  //       console.log(i.track.artists[0].name);
  //       console.log(i.track.uri);
  //       console.log(i.track.album.images[0].url);
  //       console.log(i.track.album.name);
  //       console.log("-------------------------------");
  //     });
  //   }
  // }, [test]);
  return (
    <main>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
            <Route path="/history" element={<History />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
