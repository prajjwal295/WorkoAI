const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
  },
  zipCode: {
    type: String,
    required: true,
    match: [/^\d{6}(-\d{4})?$/, "Please fill a valid zip code"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);




