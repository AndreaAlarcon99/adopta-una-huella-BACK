const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Animal = require("../models/Animal.model");
const EmailSender = require('../config/sendMail.config')

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");
const multer = require("multer");

const uploader = multer({
  dest: "./public/uploaded",
  limits: {
    fileSize: 10000000,
  },
});

router.get("/perfil/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate("ourAnimals")
    .then((singleUser) => res.json(singleUser))
    .catch((err) => console.log(err));
});

router.put("/perfil/:userId", isAuthenticated, fileUploader.single('imgUser'), async (req, res, next) => {

    try {
      const { userId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body);
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
    }
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

router.post("/perfil/:userId/send", (req, res, next) => {
  try {
    const mailData = req.body;

    EmailSender(mailData)
    res.json({msn: "Mensaje enviado! Pronto se pondrán en contacto contigo"})
  } catch (err) { console.log(err) }
  });


module.exports = router;
