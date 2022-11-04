const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal.model");
const multer = require("multer");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const uploader = multer({
  dest: "./public/uploaded",
  limits: {
    fileSize: 10000000,
  },
});

// Lista de animales en adopción
router.get("/animales", (req, res, next) => {
  Animal.find()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      next(err);
    });
});

// Lista de animales que han sido adoptados
router.get("/animalesAdoptados", async (req, res, next) => {
  const resp = await Animal.find({ adopted: true });
  res.json(resp);
});

router.get("/animales/:petId", async (req, res, next) => {
  const { petId } = req.params;
  const singlePet = await Animal.findById(petId);
  res.json(singlePet);
});

//Crear un animal
router.post(
  "/animales", isAuthenticated,
  uploader.array("nombreDelInput", 5),
  async (req, res, next) => {
    try {
      const response = await Animal.create(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.put("/animales/:petId", isAuthenticated, async (req, res, next) => {
  const { petId } = req.params;
  const updatedAnimal = await Animal.findByIdAndUpdate(petId, req.body);
  res.json(updatedAnimal);
});
router.delete("/animales/:petId", isAuthenticated, async (req, res, next) => {
  const { petId } = req.params;
  await Animal.findByIdAndRemove(petId);
  res.json({ message: `Animal with ${petId} was removed successfully` });
});

module.exports = router;
