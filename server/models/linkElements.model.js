const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkElementSchema = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    elemType: {
      type: String,
      enum: ["link", "header", "social"],
      default: ["link"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      required: true,
      default: "",
      type: String,
      maxlength: 50,
    },
    link: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  {
    collection: "LinkElements",
    timestamps: true,
  }
);

const LinkElement = mongoose.model("LinkElement", LinkElementSchema);

module.exports = LinkElement;
