const express = require("express");
const { signJWT } = require("../utils/generateJwt");
const { generateHash } = require("../utils/crypt");
const {
  createUser,
  getUser,
  getUserByEmail,
} = require("../controllers/auth.controllers");
const router = express.Router();
const authenticated = require("../utils/authenticated");

router.get("/", (req, res) => {
  try {
    res.status(404).send("Invalid Request");
  } catch {
    return res.status(500).send("Internal server error");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation

    const hashedPassword = await generateHash(password);
    const token = await signJWT(email);
    const user = await createUser({
      email,
      password: hashedPassword,
      jwt: token,
    });
    return res.status(201).json(user);
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email, password);
    return user
      ? res.status(200).json(user)
      : res.status(404).send("User not found");
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.get("/me", authenticated, async (req, res) => {
  try {
    if (req?.user?.email) {
      const user = await getUserByEmail(req?.user?.email);
      return user
        ? res.status(200).json(user)
        : res.status(404).send("User not found");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
