import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header";
import Game from "./Pages/Game";
import Gallery from "./Pages/Gallery";
import LandingPage from "./Pages/LandingPage";

export const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer BQA2b5eFDB-GOAJAkusTche4Wh5oHN2huz20eV8u-oYqWiWMQWeMwTS4M6t9uSok9E_DiVC6KQITxJkKRbgmoj-7m4GVtbVHuwDbht4etycad5XC8q56AQkrbyCGUfTWJkmsWWpbUBdTO_7UNAGtz4pH65ePJku5j9iWyvKVz0ejVJNgFNJkf1GToDVOkq9yT4k",
  },
};

let show =
  "https://api.spotify.com/v1/shows?market=ES&ids=5CfCWKI5pZ28U0uOzXkDHe%2C5as3aKmN2k11yfDDDSrvaZ";
let playlist = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF";

function App() {
  // const [test, setTest] = useState<any>();

  // useEffect(() => {
  //   fetch(playlist, options)
  //     .then((response) => response.json())
  //     .then((data) => setTest(data.tracks))
  //     .catch((err) => console.error(err));
  // }, []);

  // useEffect(() => {
  //   if (test) {
  //     test.items.map((i: any) => {
  //       console.log(i.track);
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
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;

//// julkalendrar, poddar, P3 personligheter, musik
