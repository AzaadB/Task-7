import { useState } from "react";
import { useCarsConext } from "../hooks/useCarContext";

const CarForm = () => {
//   /*useState in this functional component is allowing us to create state variables within it*/

  const { dispatch } = useCarsConext();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    //Submit event handler//
    e.preventDefault();

    const car = { make, model, registration, owner };

    const response = await fetch("http://localhost:5000/api/cars/", {
      //Creating a post request//
      method: "POST",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      //checking that if the response is not ok an error will be shown
      setError(json.error);
    }
    if (response.ok) {
      //If the respone is ok it will add a new car to the collection//
      setMake("");
      setModel("");
      setRegistration("");
      setOwner("");
      setError(null);
      console.log("new car added", json);

      dispatch({ type: "CREATE_CARS", payload: json });
    }
  };

  return (
    /*below we are creating a form with input fields that have an onchange handler,
            it also has an onsubit function with a handleSubmit handler which is as the add button is 
            clicked a new car is added.*/

    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new Car</h3>
      <label>Make:</label>
      <input
        type="text"
        onChange={(e) => setMake(e.target.value)}
        value={make}
      />

      <label>Model:</label>
      <input
        type="number"
        onChange={(e) => setModel(e.target.value)}
        value={model}
      />

      <label>Registration:</label>
      <input
        type="text"
        onChange={(e) => setRegistration(e.target.value)}
        value={registration}
        
      />

      <label>Owner:</label>
      <input
        type="text"
        onChange={(e) => setOwner(e.target.value)}
        value={owner}
        
      />

      <button>Add Car</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default CarForm; //exporting component so it can be used anywhere.//
