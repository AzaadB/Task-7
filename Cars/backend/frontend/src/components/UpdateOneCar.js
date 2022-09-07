import { useState } from "react";
import { useCarsConext } from "../hooks/useCarContext";

const UpdateOneCar = ({car, carId}) => {
//   /*useState in this functional component is allowing us to create state variables within it*/

  const { dispatch } = useCarsConext();

  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [registration, setRegistration] = useState(car.registration);
  const [owner, setOwner] = useState(car.owner);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    //Submit event handler//
    e.preventDefault();

    const car = { make, model, registration, owner};
    console.log(car)

    const response = await fetch(`http://localhost:5000/api/cars/${carId}`, {
      //Creating a patch request//
      method: "PATCH",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if(!response.ok){
      setError(json.error)
    }

    if (response.ok) {
      //If the respone is ok it will update a car in the collection//
      setMake(car.make);
      setModel(car.make);
      setRegistration(car.registration);
      setOwner(car.owner);
      setError(null);
      console.log("car updated", json);
      
      dispatch({ type: "UPDATE_CAR", payload: json });
    }
  };

  return (
    /*below we are creating a form with input fields that have an onchange handler,
            it also has an onsubit function with a handleSubmit handler which is as the add button is 
            clicked a new car is added.*/

    <form className="update" onSubmit={handleSubmit}>
      <br></br>
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
    
      <button>UPDATE ONE</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default UpdateOneCar; //exporting component so it can be used anywhere.//
