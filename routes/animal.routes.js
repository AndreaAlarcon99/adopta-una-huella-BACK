const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const fileUploader = require("../config/cloudinary.config");


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

// página de detalle del animal
router.get("/animales/:animalId", (req, res, next) => {
    const { animalId } = req.params;
    Animal.findById(animalId)
    .then(result =>{
      res.json(result);
    })
    .catch((err) => next(err));
});


// Crear un animal
router.post("/animales", isAuthenticated, fileUploader.single("imgAnimal"), (req, res, next) => {
  console.log(req.body)
  Animal.create({...req.body, imgAnimal: req.file.path})
    .then((results) => res.json(results))
    .catch((err) => {
      next(err);
    });
});

//editar un animal
router.put("/animales/:animalId", isAuthenticated, fileUploader.single("imgAnimal"), async (req, res, next) => {
  const { animalId } = req.params;
  console.log("animal id desde back ", animalId)
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, req.body, { new: true });
    res.json(updatedAnimal);
  }
  catch (err) {
    next(err)
  }
});

// eliminar un animal
router.delete("/animales/:animalId", isAuthenticated, async (req, res, next) => {
  const { animalId } = req.params;
  await Animal.findByIdAndRemove(animalId);
  res.json({ message: `La publicación del animal ${animalId} se ha eliminado correctamente` });
});

router.get("/animalesFiltrados/:creator", async (req, res, next) => {
    const { userId } = req.params
    const resp = await Animal.find({ creator: userId });
    res.json(resp);
  });

module.exports = router;
