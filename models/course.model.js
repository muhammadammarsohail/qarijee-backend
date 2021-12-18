const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model("course", courseSchema, "course");
