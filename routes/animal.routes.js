const express = require("express");
const router = express.Router();
const Animal = require('../models/Animal.model')
const multer = require("multer");
const uploader = multer({
    dest:"./public/uploaded",
    limits: {
        fileSize: 10000000
    }
})

router.get("/animales", async (req, res, next) => {
    const resp = await Animal.find()
    res.json(resp);
});
router.get("/animalesAdoptados", async (req, res, next) => {
    const resp = await Animal.find({adopted:true})
    res.json(resp);
});
router.get("/animales/:petId", async (req, res, next) => {
    const { petId } = req.params
    const singlePet = await Animal.findById(petId)
    res.json(singlePet);
});
router.post("/animales", uploader.array('nombreDelInput', 5), async (req, res, next) => {
    // const addedAnimal = req.body
    // const newAnimal = await Animal.create(addedAnimal)
    const { creator, description, animalName, gender, birthday, animalType, animalBreed, weight, age, castrated, vaccines, size, lifestyle, illness, microchip, adopted } = req.body
    
    const newAnimal = await Animal.create({ creator, imgAnimal: req.file.path, description, animalName, gender, birthday, animalType, animalBreed, weight, age, castrated, vaccines, size, lifestyle, illness, microchip, adopted })
    
    res.json(newAnimal);
});
router.put("/animales/:petId", async (req, res, next) => {
    const { petId } = req.params
    const updatedAnimal = await Animal.findByIdAndUpdate(petId, req.body)
    res.json(updatedAnimal);
});
router.delete("/animales/:petId", async (req, res, next) => {
    const { petId } = req.params
    await Animal.findByIdAndRemove(petId)
    res.json({message: `Animal with ${petId} was removed successfully`});
});

module.exports = router;
