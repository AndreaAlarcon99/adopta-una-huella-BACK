const express = require("express");
const router = express.Router();
const Animal = require('../models/Animal.model')

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
router.post("/animales", async (req, res, next) => {
    // const addedAnimal = req.body
    // const newAnimal = await Animal.create(addedAnimal)
    const { userInfo, imgAnimal, description, animalName, gender, birthday, animalType, animalBreed, weight, age, castrated, vaccines, size, lifestyle, illness, microchip, adopted } = req.body
    const newAnimal = await Animal.create({ userInfo, imgAnimal, description, animalName, gender, birthday, animalType, animalBreed, weight, age, castrated, vaccines, size, lifestyle, illness, microchip, adopted })
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
