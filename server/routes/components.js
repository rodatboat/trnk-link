const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/user.model");
const LinkElement = require("../models/linkElements.model");
let middleware = require("../authcheck");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.use((req, res, next) => {
  middleware.checkToken(req, res, next);
});

router.route("/").get(async (req, res) => {
  try {
    let { _id } = req.decoded;
    const user = await User.findOne({_id:_id});

    if (!user) {
      return res.send({ success: false, message: "User doesn't exist" });
    }

    let linkElements = await LinkElement.find({ user: _id },{
      active:1,
      elemType:1,
      user:1,
      title:1,
      link:1,
      updatedAt:1,
      icon:1
    });

    const userOrder = await user.order.map((o)=>o._id.toString());

    linkElements.sort((a, b) => {
      // console.log(a,b)
      return userOrder.indexOf(a._id.toString()) - userOrder.indexOf(b._id.toString())});


    return res.json({
      success: true,
      message: "Link components fetched",
      data: linkElements,
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
    const { active, elemType, title, link, icon } = req.body;
    const { _id } = req.decoded;

    const user = await User.findOne({ _id: _id });
    
    if (!user) {
      return res.send({ success: false, message: "User doesn't exist" });
    } else {
      const newElement = await LinkElement.create({
        active, elemType, title, link, icon, user: user._id
      });
  
      return res.send({
        data: user,
        success: true,
        message: "Link component created",
        data: {
          _id:newElement._id,
          active: newElement.active,
          elemType:newElement.elemType,
          title:newElement.title,
          link:newElement.link,
          icon:newElement.icon,
          updatedAt:newElement.updatedAt,
        }
      });
    }
  } catch (error) {
    console.log(error.message)
    return res.send({
      success: false,
      message: "Error creating link component",
    });
  }
});

router.route("/").delete(async (req, res) => {
  try {
    const { elemId } = req.body;
    const { _id } = req.decoded;

    const linkElement = await LinkElement.findOne({ _id:elemId, user: _id });
    
    if (!linkElement) {
      return res.send({ success: false, message: "Component doesn't exist" });
    }

    await linkElement.deleteOne();

    return res.send({
      success: true,
      message: "Link component deleted"
    });
  } catch (error) {
    console.log(error.message)
    return res.send({
      success: false,
      message: "Error deleting link component",
    });
  }
});

router.route("/update").post(async (req, res) => {
  try {
    const { elemId, active, title, link, icon } = req.body;
    const { _id } = req.decoded;

    const linkElement = await LinkElement.findOneAndUpdate({ _id:elemId, user: _id }, {
      active,
      title,
      link,
      icon
    }, {new:true});

    return res.send({
      success: true,
      message: "Link component updated",
      data: {
        _id:linkElement._id,
        active: linkElement.active,
        user: linkElement.user,
        elemType:linkElement.elemType,
        title:linkElement.title,
        link:linkElement.link,
        icon:linkElement.icon,
        updatedAt:linkElement.updatedAt,
      }
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error updating link component",
    });
  }
});

router.route("/order").post( async(req, res)=>{
  try {
    const { components } = req.body;
    const { _id } = req.decoded;

    const user = await User.findOne({_id:_id})

    if (!user) {
      return res.send({ success: false, message: "User doesn't exist" });
    }

    await user.updateOne({
      order:components
    });

    return res.send({
      success: true,
      message: "Link components order changed"
    });
  } catch (error) {
    console.log(error.message)
    return res.send({
      success: false,
      message: "Error changing link components order",
    });
  }
});

module.exports = router;
