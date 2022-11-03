const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const multer = require("multer");
const uploader = multer({
    dest:"./public/uploaded",
    limits: {
        fileSize: 10000000
    }
})


router.get("/profile/:userId", async (req, res, next) => {
    const { userId } = req.params
    const singleUser = await Animal.findById(userId)
    res.json(singleUser);
});
router.put("/profile/:userId", uploader.array('nombreDelInput', 5), async (req, res, next) => {
    const { userId } = req.params
    const updatedUser = await User.findByIdAndUpdate(userId, req.body)
    res.json(updatedUser);
});

module.exports = router;
