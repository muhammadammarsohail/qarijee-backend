const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
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
  age: {
    type: Number,
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
  roomLink: {
    type: String,
    require: false,
  },
  trainingClasses: {
    type: Boolean,
    require: false,
  },
  Courses: {
    type: [int],
    require: false,
  }
  
});

module.exports = mongoose.model("users", userSchema, "users");
