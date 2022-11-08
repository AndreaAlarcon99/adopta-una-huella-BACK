const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Animal = require("../models/Animal.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");
const multer = require("multer");
const uploader = multer({
  dest: "./public/uploaded",
  limits: {
    fileSize: 10000000,
  },
});

router.get("/perfil/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const singleUser = await User.findById(userId);
  res.json(singleUser);
});

router.put("/perfil/:userId", isAuthenticated, fileUploader.single('imgUser'), async (req, res, next) => {
    const { userId } = req.params
    const updatedUser = await User.findByIdAndUpdate(userId, req.body)
    res.json(updatedUser);
  }
);

// router.get("/perfil/:animalId", isAuthenticated, (req, res, next) => {
//   const { animalId } = req.params;

//   Animal.findById(animalId)
//     .populate("creator")
//     .then((results) => {
//       res.json(results);
//     });
// });

module.exports = router;
