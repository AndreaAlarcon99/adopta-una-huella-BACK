const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const multer = require("multer");
import EmailSender from '../config/sendMail.config'
const uploader = multer({
    dest:"./public/uploaded",
    limits: {
        fileSize: 10000000
    }
})

router.get("/perfil/:userId", (req, res, next) => {
    const { userId } = req.params
    User.findById(userId)
    .populate('Animal')
    .then(singleUser => res.json(singleUser))
    .catch(err => console.log(err))
});
router.put("/perfil/:userId", isAuthenticated, uploader.single('nombreDelInput'), async (req, res, next) => {
    try {
      const { userId } = req.params
      const updatedUser = await User.findByIdAndUpdate(userId, req.body)
      res.json(updatedUser);
    } catch (err) { console.log(err) }
});

router.post('/perfil/:userId/send', (req, res, next) => {
  try {
    const mailData = req.body;
    EmailSender(mailData)
    res.json({msn: "Mensaje enviado! Pronto se pondrán en contacto contigo"})
  } catch (err) { console.log(err) }

  });

module.exports = router;
