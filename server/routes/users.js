const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const LinkElement = require("../models/linkElements.model");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
// const SERVER_DOMAIN = process.env.SERVER_DOMAIN;
// const APP_DOMAIN = process.env.APP_DOMAIN;

// let middleware = require('../authcheck');
// router.use((req, res, next) => {
//     middleware.checkToken(req, res, next);
//   });

router.route("/register").post(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userEmailExists = await User.findOne({ email: email });
    const usernameExists = await User.findOne({ username: username });
    if (userEmailExists) {
      return res.send({ success: false, message: "Email is already in use" });
    }
    if (usernameExists) {
      return res.send({
        success: false,
        message: "Username is already in use",
      });
    }
    await User.create({
      email: email,
      username: username,
      displayName: `@${username}`,
      password: encryptedPassword,
    });

    return res.send({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.send({ success: false, message: "Error creating user" });
  }
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user) {
    return res.send({ success: false, message: "User doesn't exist" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { email: user.email, username: user.username, _id: user._id },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 hour * 2
      // httpOnly: true,
      // secure: true,
    });

    if (res.status(200)) {
      return res.json({
        success: true,
        message: "User logged in.",
        token: token,
      });
    } else {
      return res.json({ success: false, message: "Error logging in." });
    }
  }

  return res.json({ success: false, message: "Incorrect password." });
});

router.route("/").get(async (req, res) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const verify = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne(
      { _id: verify._id },
      {
        password: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );

    if (!user) {
      return res.send({ success: false, message: "User doesn't exist" });
    }

    return res.json({
      success: true,
      message: "User info fetched",
      data: user,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Error fetching user info",
    });
  }
});

router.route("/:username").get(async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne(
      { username: username },
      { username: 1, displayName: 1, bio: 1, background: 1 }
    );

    if (!user) {
      return res.send({ success: false, message: "User doesn't exist" });
    }

    let userElements = await LinkElement.find(
      { username: username },
      {
        index: 1,
        active: 1,
        elemType: 1,
        title: 1,
        link: 1,
        icon: 1,
      }
    );
    userElements.sort((a, b) => a.index - b.index);

    return res.json({
      success: true,
      message: "User link components fetched",
      data: {
        user: user,
        elements: userElements,
      },
    });
  } catch (err) {
    console.log(error.message);
    return res.send({
      success: false,
      message: "Error fetching user link components",
    });
  }
});

router.route("/update").post(async (req, res) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const { update } = req.body;

    const verify = jwt.verify(token, JWT_SECRET);

    const updatedUser = await User.findOneAndUpdate(
      { _id: verify._id },
      {
        ...update
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.send({ success: false, message: "User doesn't exist" });
    }

    return res.json({
      success: true,
      message: "User updated",
      data: {
        background: updatedUser.background,
        user: {
          displayName:updatedUser.displayName,
          bio:updatedUser.bio
        },
      },
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Error updating user",
    });
  }
});

module.exports = router;
