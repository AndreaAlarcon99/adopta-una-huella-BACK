const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
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
      match: [/^\S+@\S+.\S+$/, "Please use a valid email address."]
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    imgUser: {
      title: String,
      description: String,
      imageUrl: String,
      // default: src='../public/defaultimg.png'
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
