require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./utils/dbConnection");

const auth = require("./routes/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", auth);

// Routes
app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello World!!");
  } catch {
    res.status(500).send("Internal server error");
  }
});

app.listen(process.env.port || 5000, () => {
  console.log(`server running on port ${process.env.port || 5000}`);
});
