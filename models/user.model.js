const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  jwt: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: false
  },
  gender: {
    type: String,
    require: false
  },
  country: {
    type: String,
    require: false,
  },
  city: {
    type: String,
    require: false,
  },
  trainingClasses: {
    type: [Number],
    require: false,
  },
  recitation: {
    type: String,
    require: false,
  }
});

module.exports = mongoose.model("users", userSchema, "users");
