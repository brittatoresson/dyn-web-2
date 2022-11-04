import { useNavigate } from "react-router-dom";
import { ImHeadphones } from "react-icons/im";
import { useEffect, useState } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<any>();

  function getRandomItems() {
    fetch("http://localhost:2000/top50/")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          setErrMsg(response.statusText.toLowerCase());
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        // console.log(error);
        // setErrMsg(error);
      });
  }

  useEffect(() => {
    getRandomItems();
  }, []);

  return (
    <section className="landingPage">
      {errMsg ? (
        `Oops something went wrong, please try again`
      ) : (
        <h1 onClick={() => navigate("./game")}>
          This or that? Just click on the song you like the most. Redy to start?{" "}
          <ImHeadphones />
        </h1>
      )}
    </section>
  );
}

export default LandingPage;
