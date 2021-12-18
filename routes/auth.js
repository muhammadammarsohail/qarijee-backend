const express = require("express");
const { signJWT } = require("../utils/generateJwt");
const { generateHash } = require("../utils/crypt");
const {
  createUser,
  getUser,
  getUsersByEmail,
  doesUserExists,
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
    const { email, password, name } = req.body;
    // validation

    const hashedPassword = await generateHash(password);
    const token = await signJWT(email);
    const isAlreadyExisting = await doesUserExists(email);
    if (isAlreadyExisting) {
      console.log('already Exists');
      return res.status(400).json({"error": "This email address is already taken"});
    }
    const user = await createUser({
      email,
      password: hashedPassword,
      jwt: token,
      name
    });
    return res.status(201).json(user);
  } catch(error) {
    res.status(500).send(error);
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
      const user = await getUser(req?.user?.email);
      return user
        ? res.status(200).json(user)
        : res.status(404).send("User not found");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.get("/users", authenticated, async (req, res) => {
  try {
    const emails = req?.body?.emails;
    if (emails) {
      const user = await getUsersByEmail(emails);
      return user
        ? res.status(200).json(user)
        : res.status(404).send("no user found");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.get("/user", authenticated, async (req, res) => {
  try {
    if (req?.body?.email) {
      const user = await getUsersByEmail([req?.body?.email]);
      return user
        ? res.status(200).json(user)
        : res.status(404).send("No user found");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
