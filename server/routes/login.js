const express = require("express");
const router = express.Router();
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/", auth, cors(), async (req, res) => {
  try {
    const user = await Register.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.json(user);
  }
});
router.get("/:by", async (req, res) => {
  const id = req.params.by;
 
  try {
    console.log("yessss");
    console.log(id);
    const user = await Register.findById(id).select("-password");
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

router.post(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  cors(),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        errors: err.array(),
      });
    }
    const { email, password } = req.body;

    try {
      let user = await Register.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          msg: "User not registered",
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(500).json({
          msg: "Incorrect Password",
        });
      const payload = {
        user: {
          id: user.id,
          //verified: user.verify
        },
      };
      jwt.sign(
        payload,
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MzkzMTkxMywiaWF0IjoxNjUzOTMxOTEzfQ.abdzEC_WlKiZmNwL1alx2q56jNHL1QSRPs1FMwN08hQ",
        {
          expiresIn: 432000,
        },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(400).json("Error");
    }
  }
);

module.exports = router;
