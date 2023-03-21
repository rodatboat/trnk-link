const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength:2,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength:4,
    },
    order:[
      {
        id:{
          type:String
        }
      }
    ],
    since: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

const User = mongoose.model("User", user);

module.exports = User;
