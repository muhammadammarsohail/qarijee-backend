const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://root:root123@cluster0.aakuo.mongodb.net/qarijee?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));

module.exports = db;
