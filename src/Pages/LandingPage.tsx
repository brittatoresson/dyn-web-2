import { useNavigate } from "react-router-dom";
import Spotify from "../Components/Spotify";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <section className="landingPage">
      <p>This or that? Click on the song you like the most!</p>
      <button onClick={() => navigate("./game")}>Start</button>
      <Spotify />
    </section>
  );
}

export default LandingPage;
