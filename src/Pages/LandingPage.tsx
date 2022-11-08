import { useNavigate } from "react-router-dom";
import { ImHeadphones } from "react-icons/im";
import { useEffect, useState } from "react";
import errorHandling from "../Components/ErrorHandling";

function LandingPage() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<any>();

  function testConnectionToServer() {
    fetch("https://dyn-web-2-8tqt.onrender.com/top20")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          setErrMsg(errorHandling(response.status));
          throw Error(response.status.toString());
        }
      })
      .catch((error) => {
        setErrMsg(errorHandling(error));
        return error;
      });
  }

  useEffect(() => {
    testConnectionToServer();
  }, []);

  return (
    <section className="landingPage">
      {errMsg ? (
        errMsg
      ) : (
        <h1 onClick={() => navigate("./game")}>
          This or that? Just click on the song you like the most. Redy to start?
          <ImHeadphones />
        </h1>
      )}
    </section>
  );
}

export default LandingPage;
