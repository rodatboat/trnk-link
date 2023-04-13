const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
    },
    displayName: {
      type: String,
      required: true,
      maxlength: 30,
      default: "",
    },
    bio: {
      type: String,
      required: true,
      default: "",
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
    },
    background: {
      mode: {
        type: String,
        required: true,
        enum: ["solid", "gradient"],
        default: "solid",
      },
      colors: [
        {
          type: String,
          default: "#fafafa",
        },
      ],
    },
    buttons: {
      mode: {
        type: String,
        required: true,
        enum: ["fill", "outline", "hardshadow", "softshadow"],
        default: "outline",
      },
      borderType: {
        type: Number,
        min: 0,
        max: 2,
      },
      colors: [
        {
          type: String,
          default: "#fff",
        },
        {
          type: String,
          default: "#000",
        },
        {
          type: String,
          default: "#000",
        },
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    order: [
      {
        id: {
          type: String,
        },
      },
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
