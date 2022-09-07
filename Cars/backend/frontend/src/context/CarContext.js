import {createContext, useReducer, } from "react"; /*Allows us to create a new context in our app which we can 
// then pass to pass it to other components in the application*/

export const CarsContext = createContext();
// /*storing the new conext in a constant called CarsContext,
// then envoking the createContext hook which will create the new context*/

export const carsReducer = (state, action) => {
//   /*The reducer function takes in the previous state as an 
//  argument before it is change, the secound argument is the action that was passed into the object of the dispatch function*/

//   /*So inside the reducer we want to check the action type it's for what we want to do with the data
//  i.e delete a car, add a car, update a car or set all the cars*/

//   /* We use a switch statement to check the action type, then we use 
//  cases for different values of the types i.e we use SET_CARS on line 20 to set all the cars*/

//   /*In all of the cases from lines 31 and 35 is return the values that we want the 
//  new state to be, so in essance we are returning a new object.*/

//   /*Within the return an object with on property which is the cars property(line 33) and it has

//   the action.payload, because if we want set all of the cars, then the payload property on the 
    
//   action that is passed onto the dispatch function(line 47) would be an array of all the cars, which is the first case.*/

//   //The seacond case(line 37) is for creating a car//

//   /*In the 2nd case we return have the cars property(line 42) and in it we have new array 
//   which is the action.payload which is going to be a single new car object*/

//   /*The ...is used for spreading the current state dot cars property is all the current 
//      car objects that already exist and we are also putting into the array*/

//   /*In order to keep the local states in sync with the database we would dispatch a 
//      create car action so that in our app we also have the new car*/

  switch (action.type) {
    case "SET_CARS":
      return {
        cars: action.payload,
      };
    case "CREATE_CARS":
      return {
        cars: [action.payload, ...state.cars],
      };
      case "DELETE_CAR":
        return{
          cars: state.cars.filter((c)=> c._id !== action.payload._id)
        }
        case "UPDATE_CAR":
          return{
            cars: state.cars.filter((c)=> c._id !== action.payload._id)
          }
          case "SET_OldCARS":
            return{
              cars: action.payload
            }


    default:
      return state;
    //If they don't match then we just return the state unchanged//
  }
};

export const CarsContextProvider = ({ children }) => {
//   /*The children prop is the root component i.e the index.js file*/

  const [state, dispatch] = useReducer(carsReducer, {
//     /*useReducer(line 59) is similar to useState in which we
//     get back a state value and a function i.e dispatch to update the state value.*/
    cars: null
//     //And we also specify an inital value for state which is the cars object(line 63).//
  });

//   /*The custom context provider that was created returns the actual provider of the context that was 
//     created.*/

  return (
//     /*in this return the context provider wraps whatever components will need to access the
//     context it represents, it takes in the children property that is in the CarsContextProvider 
//     copmonent from the props.
    
//     The children property represents whatever component this custom provider that was made wraps and 
//     since it wraps the App root component in the index.js file it means that the children prop
//     is that root component.
    
//     Since the provider wraps the root component means that all other components have access to the context.*/

//     /*In order to use dispatch and state in other components we need to provide 
//     the state and dispatch in the value(line 84)*/

//     /*Instead of just providing the object line 63, wwe are spreading the different properties inside the
//     whole object and we are providing those.*/

    <CarsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CarsContext.Provider>
  );
};
