const express = require("express");
const router = express.Router();
const {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  getOld,
} = require("../controllers/Cars.controllers");

//GET all cars
router.get("/", getCars);

//Get old cars
router.get("/Old", getOld);

//POST new car
router.post("/", addCar);

//DELETE car
router.delete("/:id", deleteCar);

//UPDATE car
router.patch("/:id", updateCar);

module.exports = router;
