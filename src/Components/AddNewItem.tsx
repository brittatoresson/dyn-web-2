import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IArtistObject, handleInput } from "../Interface/Interface";

function AddNewItem(toggleInputField: any) {
  console.log(toggleInputField);
  const [item, setItem] = useState<IArtistObject>({
    wins: 0,
    games: 0,
    name: "",
    artist: "",
    uri: "",
    active: false,
  });
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();

  function handleInput(e: handleInput) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }
  function addNewSong() {
    toggleInputField.setToggleInputField(false);
  }

  return (
    <section className="billingInfo">
      {toggleModal ? (
        <section className="confirmModal">
          <p>Thanks for your oder! Your candy will arrive in 3-5 days 🎈🍭 </p>
          <p onClick={() => navigate("/")}>x</p>
        </section>
      ) : (
        <>
          <h2>Delivery and payment</h2>
          <input
            type="text"
            placeholder="Artist"
            name="artist"
            onChange={(e) => handleInput(e)}
          ></input>
          <input
            type="text"
            placeholder="Name of song"
            name="name"
            onChange={(e) => handleInput(e)}
          ></input>
          {/* <input
            type="text"
            placeholder="Adress"
            name="adress"
            onChange={(e) => handleInput(e)}
          ></input>
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={(e) => handleInput(e)}
          ></input>
          <input
            type="text"
            placeholder="Postal code"
            name="postalcode"
            onChange={(e) => handleInput(e)}
          ></input> */}
          {/* <section className="radio">
            <label htmlFor="swish">Swish</label>
            <input
              type="radio"
              name="payment"
              id="swish"
              onChange={(e) => setPayment(e.target.id)}
            />
            <label htmlFor="creditcard">Creditcard</label>
            <input
              type="radio"
              name="payment"
              id="creditcard"
              onChange={(e) => setPayment(e.target.id)}
            />
          </section> */}
          <button onClick={addNewSong}>Buy</button>
        </>
      )}
    </section>
  );
}

export default AddNewItem;
