const CarsModel = require("../models/Cars.model"); //importing the Schema created in the Cars.model file
const mongoose = require("mongoose"); //importing mongoose//

//GET all Cars//
const getCars = async (req, res) => {
  const cars = await CarsModel.find({}).sort({
    model: -1,
  }); /*awaiting to find all the cars and 
    then it get sorted is decending order*/
  res.status(200).json(cars);
};

//Get all old cars//
const getOld = async (req, res) => {
  try {
    //await finding all the documents that exist within the collection/database.

    /*All the documents have to be within the range of createdAt[2022-07-04T09:19:31.544Z], 
        meaning any cars older than 5 years old.*/
    const cars = await CarsModel.find({
      model: { $gt: "2005", $lt: "2022" },
    }).sort({ model: -1 });
    //Send the relevant information that ha been retrieved back to the frontend.
    res.send(cars);
  } catch (error) {
    res.send({ message: `Retrieval failed: ${error}!` }); //Error.
  }
};

//Create new car//
const addCar = async (req, res) => {
  const { make, model, registration, owner } = req.body;
  /*From lines 15-31 is basically saying if any of the input fields are empty ie. make, model, registration,
    ect when adding a new car an error won't throw an error those fields will just be empty*/

  //add document to db//
  try {
    const car = await CarsModel.create({ make, model, registration, owner });
    res.status(200).json(car);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};
//Update car//
const updateCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No Car found" });
  }
  const car = await CarsModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!car) {
    return res.status(404).json({ err: "No Car found" });
  }
  res.status(200).json(car);
};

//Delete car//
const deleteCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No Car found" });
  }
  const car = await CarsModel.findOneAndDelete({ _id: id });

  if (!car) {
    return res.status(404).json({ err: "No Car found" });
  }
  res.status(200).json(car);
};

module.exports = {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  getOld,
};
