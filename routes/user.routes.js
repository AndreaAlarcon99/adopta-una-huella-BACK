const express = require("express");
const router = express.Router();
const User = require('../models/User.model')

router.get("/profile/:userId", async (req, res, next) => {
    const { userId } = req.params
    const singleUser = await Animal.findById(userId)
    res.json(singleUser);
});
router.post("/profile/:userId", async (req, res, next) => {
    // const { addedUser } = req.body
    // const newUser = await User.create(addedUser)
    const { username, email, password, imgUser, admin } = req.body
    const newUser = await User.create({ username, email, password, imgUser, admin })
    res.json(newUser);
});

module.exports = router;
