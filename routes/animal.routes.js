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
router.post("/animales", isAuthenticated, (req, res, next) => {
  console.log("Soy el post de animales desde back");
  Animal.create(req.body)
    .then((results) => res.json(results))
    .catch((err) => {
      console.log("INTENTANDO ENCONTRAR EL ERROR: ", err.response);
      next(err);
    });
});

//editar un animal
router.put("/animales/:animalId", isAuthenticated, async (req, res, next) => {
  const { animalId } = req.params;
  console.log("animal id desde back ", animalId);
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, req.body, {
      new: true,
    });
    console.log("updatedAnimal ", updatedAnimal);
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

router.get("/animalesFiltrados/:creator", async (req, res, next) => {
  const { userId } = req.params;
  const resp = await Animal.find({ creator: userId });
  res.json(resp);
});

// Filtros animales

module.exports = router;
