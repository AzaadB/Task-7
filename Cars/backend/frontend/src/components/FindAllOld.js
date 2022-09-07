import { useEffect } from "react";
import { useCarsConext } from "../hooks/useCarContext";

//components//
import CarDetails from "../components/CarDetails";
import CarForm from "../components/CarForm";

const AllOld = () =>{
    const { cars, dispatch } = useCarsConext(); /*We firstly destructure the fuction by saying 
//   const {cars, dispatch}, the cars object is null to begin with because it comes from the 
//   useCarsContext js file. 
  
//   Once we fetched the cars we want to update it and to do that we use the dispatch function(line 9)*/

  useEffect(() => {
    /*The useEffect hook is a function that will run immediately when the website is 
    loaded*/
    const fetchOldCars = async () => {
      //doing a get request//
      const response = await fetch("http://localhost:5000/api/cars/Old");
      const json = await response.json();

      if (response.ok) {
        /*if the response is ok we dispatch an action which has a type called 'SET_CARS' because 
        we want to update all cars and the payload is going to represent the whole array of cars we
        recieve from the server*/
        dispatch({ type: "SET_OldCARS", payload: json });
      }
    };
    fetchOldCars(); //calling the fetchCars function//
  }, []);
  return (
    /*below we are mapping the car object and making an instace of the different 
    components ie. CarDetails and CarForm*/

    <div className="old">
      <div className="cars">
        {cars && cars.map((car) => <CarDetails key={car._id} car={car} />)}
      </div>
      <CarForm />
    </div>
  );
}

export default AllOld; //exporting component so it can be used anywhere.//

