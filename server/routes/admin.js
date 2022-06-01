const express = require("express");
const upload = require("../controllers/upload");
const Router = express.Router();
const Product = require("../models/product");
const User = require("../models/register");
const Cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
Cloudinary.config({
  cloud_name: "dvjybksi3",
  api_key: "968165244341661",
  api_secret: "qu4oS6RWlKnPdtRd2k5Ttn6s0MI",
});

Router.post("/upload", auth, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      let user = await User.findOne({ _id: req.user.id });
      if (user.role !== "restaurant")
        return res
          .status(401)
          .json(
            "Your request was processed but only restaurants are allowed to add or remove items!"
          );
      let product = await Product.findOne({
        name: req.body.name,
      });

      if (product) return res.status(400).json("Product already exists!");
      Cloudinary.v2.uploader.upload(req.file.path, async function (
        error,
        result
      ) {
        product = new Product({
          type: req.body.type,
          name: req.body.name,
          by: req.body.by,
          price: req.body.price,
          url: result.url,
        });
        try {
          await product.save();
          return res.status(200).json("Item Saved Successfully!");
        } catch (e) {
          console.log(e);
          res.status(500).send("Server Error");
        }
      });
    }
  });
});

Router.get("/items", async (req, res) => {
  Product.find({}, (err, items) => {
    if (err) res.status(400).json(err);
    res.status(200).json(items);
  });
});

Router.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  
  Product.find({ by: id }, (err, items) => {
    if (err) res.status(400).json(err);
    res.status(200).json(items);
  });
  

  /*Product.find({}, (err, items) => {
    if (err) res.status(400).json(err);
    res.status(200).json(items);
  });*/
});

Router.post("/items", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    if (user.role !== "restaurant")
      return res
        .status(401)
        .json(
          "Your request was processed but only restaurants are allowed to add or remove items!"
        );
    const item = await Product.deleteOne({
      name: req.body.name,
    });
    res.status(200).send(item);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
module.exports = Router;
