import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header";
import Game from "./Pages/Game";
import Gallery from "./Pages/Gallery";
import LandingPage from "./Pages/LandingPage";
import Statistics from "./Pages/Statistics";
import History from "./Pages/History";

function App() {
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
