const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name needs to be at least 3 characters long"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      minlength: [3, "Type needs to be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [3, "Description needs to be at least 3 characters long"],
    },
    skill1: String,
    skill2: String,
    skill3: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;
