const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    ourAnimals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],
    username: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    imgUser: {
      type: String,
      default: "../public/imageDefault.png"
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    licence: {
      type: String,
      enum: [
        "12345A",
        "12345B",
        "12345C",
        "12345D",
        "12345E",
        "12345F",
        "12345G",
        "12345H",
        "12345I",
        "12345J",
      ],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
