const mongoose = require("mongoose");

const assessmentSchema = mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    examinerId: {
        type: Number,
        unique: false,
        require: true,
    },
    courseId: {
        type: Number,
        require: true,
    },
    studentId: {
        type: [Number],
        require: true,
    },
    roomLink: {
        type: String,
        require: false,
    },
    totalMarks: {
        type: Number,
        require: false,
    },
    obtainedMarks: {
        type: Number,
        require: false,
    },
    grade: {
        type: String,
        require: false,
    },
    remarks: {
        type: String,
        require: false,
    },
    dateTime: {
        type: Date,
        required: false,
    },
});

module.exports = mongoose.model("assessment", assessmentSchema, "assessment");
