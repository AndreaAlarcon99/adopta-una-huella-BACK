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

// página de detalle del animal
router.get("/animales/:animalId", (req, res, next) => {
    const { animalId } = req.params;
    
    Animal.findById(animalId)
    .then(result =>{
      res.json(result);
    })
    .catch((err) => next(err));
});

//Crear un animal
// router.post(
//   "/animales", isAuthenticated,
//   uploader.array("nombreDelInput", 5),
//   async (req, res, next) => {
//     try {
//       const response = await Animal.create(req.body);
//       res.json(response);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

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
  console.log("animal id desde back ", animalId)
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, req.body, { new: true });
    console.log("updatedAnimal ", updatedAnimal)
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

module.exports = router;
