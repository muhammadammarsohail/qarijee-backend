const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/qarijee", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));

module.exports = db;
