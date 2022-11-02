import { useNavigate } from "react-router-dom";
import { ImHeadphones } from "react-icons/im";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <section className="landingPage">
      <h1 onClick={() => navigate("./game")}>
        This or that? Just click on the song you like the most. Redy to start?{" "}
        <ImHeadphones />
      </h1>
    </section>
  );
}

export default LandingPage;
