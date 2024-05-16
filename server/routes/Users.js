const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email: email } });


  
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  //Create a hash Password to secure Password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Login successful and return user data or token
  const accesstoken = sign(
    {
      username: user.username,
      id: user.id,
    },
    "importantsecret"
  );
  res.status(200).json(accesstoken);
});

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
