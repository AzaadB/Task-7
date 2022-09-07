const mongoose = require("mongoose"); //Require Mongoose.
const Schema = mongoose.Schema;

//Build Schema for documentation.
const CarSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: Number,
      required: true,
    },
    registration: {
      type: String,
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },
    createdAt:{
      type:Date,
      required:false,
      default: Date.now
  },

});

module.exports = mongoose.model("CarsModel", CarSchema);
