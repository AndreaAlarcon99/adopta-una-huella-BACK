const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Animal = require("../models/Animal.model");
const EmailSender = require("../config/sendMail.config");
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");


//GET user profile
router.get("/perfil/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate("ourAnimals")
    .then((singleUser) => res.json(singleUser))
    .catch((err) => console.log(err));
});

//GET all users (not admin user)
router.get("/protectoras", (req, res, next) => {
  const filtro = {
    admin: false
  }
  User.find(filtro)
      .then(results => res.json(results))
      .catch(err => next(err))
});

//UPDATE user
router.put(
  "/perfil/:userId",
  isAuthenticated,
  fileUploader.single("imgUser"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
      res.json(updatedUser);
    } catch(err) {console.log("error editar perfil back: ", err)}
  }
);

//DELETE user
router.delete("/perfil/:userId", isAuthenticated, async (req, res, next) => {
    const { userId } = req.params;
  try {
    await Animal.deleteMany({creator: userId})
    await User.findByIdAndRemove(userId);
    res.json({message: `El perfil de la protectora ${userId} se ha eliminado correctamente`});
  } catch(err) {
    next(err);
  }
});

//POST email (under construction)
router.post("/perfil/:userId/send", (req, res, next) => {
  try {
    const mailData = req.body;
    EmailSender(mailData);
    res.json({ msn: "Mensaje enviado! Pronto se pondrán en contacto contigo" });
  } 
  catch (err) {
    next(err)
  }
});

module.exports = router;
