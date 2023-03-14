const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/user.model");
let middleware = require("../authcheck");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.use((req, res, next) => {
  middleware.checkToken(req, res, next);
});

router.route("/").get(async (req, res) => {
  try {
    let { _id } = req.decoded;

    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.send({ success: false, message: "User doesn't exist" });
    }

    return res.json({
      success: true,
      message: "Link components fetched",
      data: user.linkComponents,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Error fetching link components",
    });
  }
});

router.route("/create").post(async (req, res) => {
  try {
    const { active, type, title, link, icon } = req.body;

    let { _id } = req.decoded;

    const newElement = {
      // _id: new mongoose.Types.ObjectId(),
      active,
      elemType:type,
      title,
      link,
      // icon
    }
    console.log(newElement)
    const user = await User.findOneAndUpdate({ _id: _id }, {"$push":{"linkComponents":newElement}}, {
      new: true
    });
    
    console.log(user)
    
    if (!user) {
      return res.send({ success: false, message: "User doesn't exist" });
    }
    // const usernameExists = await User.findOne({ username: username });
    // if (userEmailExists) {
    //   return res.send({ success: false, message: "Email is already in use" });
    // }
    // await User.findOne({ username: username });
    // if (usernameExists) {
    //   return res.send({
    //     success: false,
    //     message: "Username is already in use",
    //   });
    // }
    // await User.create({
    //   email: email,
    //   username: username,
    //   password: encryptedPassword,
    // });

    return res.send({
      success: true,
      message: "Link component created successfully.",
    });
  } catch (error) {
    console.log(error.message)
    return res.send({
      success: false,
      message: "Error creating link component",
    });
  }
});

// router.route("/").delete(async (req, res) => {
// });

router.route("/update").post(async (req, res) => {
  try {
    const { id, active, title, link, icon } = req.body;

    return res.send({
      success: true,
      message: "Link component created successfully.",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error creating link component",
    });
  }
});

module.exports = router;
