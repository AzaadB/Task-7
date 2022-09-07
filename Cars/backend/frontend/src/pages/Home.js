import { useEffect } from "react"; //importing UseState and UseEffect Hooks from react//
import { useCarsConext } from "../hooks/useCarContext"; //importing the hook to be used inside the home function

//componenets//
import CarDetails from "../components/CarDetails";
import CarForm from "../components/CarForm";

const Home = () => {
  const { cars, dispatch } = useCarsConext(); /*We firstly destructure the fuction by saying 
//   const {cars, dispatch}, the cars object is null to begin with because it comes from the 
//   useCarsContext js file. 
  
//   Once we fetched the cars we want to update it and to do that we use the dispatch function(line 9)*/

  useEffect(() => {
    /*The useEffect hook is a function that will run immediately when the website is 
    loaded*/
    const fetchCars = async () => {
      //doing a get request//
      const response = await fetch("http://localhost:5000/api/cars");
      const json = await response.json();

      if (response.ok) {
        /*if the response is ok we dispatch an action which has a type called 'SET_CARS' because 
        we want to update all cars and the payload is going to represent the whole array of cars we
        recieve from the server*/
        dispatch({ type: "SET_CARS", payload: json });
      }
    };
    fetchCars(); //calling the fetchCars function//
  }, []);
  return (
    /*below we are mapping the car object and making an instace of the different 
    components ie. CarDetails and CarForm*/

    <div className="home">
      <div className="cars">
        {cars && cars.map((car) => <CarDetails key={car._id} car={car} />)}
      </div>
      <CarForm />
    </div>
  );
};
export default Home; //exporting component so it can be used anywhere.//
