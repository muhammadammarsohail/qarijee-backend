const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  try {
    const authHeader = req?.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.status(403).send("Unauthorized action");
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send({ message: "Unauthorized" });
      req.user = user;
      next();
    });
  } catch {
    return (req.user = null);
  }
};

module.exports = authenticated;
