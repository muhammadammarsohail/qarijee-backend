const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  teacherId: {
    type: Number,
    unique: false,
    require: true,
  },
  courseId: {
    type: Number,
    require: true,
  },
  studentIds: {
    type: [Number],
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  roomLink: {
    type: String,
    require: false,
  },
  fees: {
    type: Number,
    require: false,
  }
});

module.exports = mongoose.model("class", classSchema, "class");
