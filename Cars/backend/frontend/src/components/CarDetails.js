import { useCarsConext } from "../hooks/useCarContext"; //importing the hook to be used inside the CarDetails function
import UpdateOneCar from "../components/UpdateOneCar";

// /*Create a button in Details component so when the button is clicked it deletes a specific document
// from the database*/

const CarDetails = ({ car }) => {
    const { dispatch } = useCarsConext();
    //Creating the handleClick function(line 6)//

    const handleClick = async () => {
      //using async so we can use await inside the function//
      const response = await fetch("http://localhost:5000/api/cars/" + car._id, {
        /*The secound argument is the type of
    requset is being made*/
        method: "DELETE",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_CAR", payload: json });
      }
    };

  return (
    //Displaying all the cars//

    /*Below the details div creating a span(line 22) called delete and adding an onClick which will 
        equal a handler function*/

    <div className="car-details">
      <h4>Make: {car.make}</h4>
      
      <h4><br></br>Model: {car.model}</h4>
      
      <h4><br></br>Registration: {car.registration} </h4>
      
      <h4><br></br>Owner: {car.owner} </h4>
      
      <h4><br></br>Date Created: {car.createdAt} </h4>
      <span onClick={handleClick}>Delete</span>
     {
      <UpdateOneCar carId={car._id} car={car}/>}
    </div>
  );
};
export default CarDetails; //exporting component so it can be used anywhere.//
