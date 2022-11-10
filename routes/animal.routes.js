const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  const filtro = {
    age: ["Anciano"],
  };

  Animal.find({ age: { $in: filtro.age } }).then((results) => {
    res.json(results);
  });
});

// Lista de animales en adopción con filtros
router.get("/animales", (req, res, next) => {
  const arrayCondiciones = [];
  const filtro = {};
  const { gender, age, size, lifestyle, animalType } = req.query;

  if (gender && gender.length > 0)
    arrayCondiciones.push({ gender: { $in: gender } });
  if (size && size.length > 0) arrayCondiciones.push({ size: { $in: size } });
  if (age && age.length > 0) arrayCondiciones.push({ age: { $in: age } });
  if (lifestyle && lifestyle.length > 0)
    arrayCondiciones.push({ lifestyle: { $in: lifestyle } });
  if (animalType && animalType.length > 0)
    arrayCondiciones.push({ animalType: { $in: animalType } });

  if (arrayCondiciones.length > 0) filtro.$and = arrayCondiciones;

  Animal.find(filtro)
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
    .then((result) => {
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
  try {

    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, req.body, { new: true });
    res.json(updatedAnimal);
  } catch (err) {
    next(err);
  }
});

// eliminar un animal
router.delete(
  "/animales/:animalId",
  isAuthenticated,
  async (req, res, next) => {
    const { animalId } = req.params;
    await Animal.findByIdAndRemove(animalId);
    res.json({
      message: `La publicación del animal ${animalId} se ha eliminado correctamente`,
    });
  }
);

module.exports = router;
