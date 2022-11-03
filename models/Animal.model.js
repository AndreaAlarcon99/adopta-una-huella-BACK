const { Schema, model } = require("mongoose");

const animalSchema = new Schema(
  {
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    imgAnimal: {
        title: String,
        description: String,
        imageUrl: String
      },
    description: {
        type: String,
        require: true
    },
    animalName: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: ["Macho", "Hembra"],
        require: true
    },
    birthday: {
        type: String,
        require: true
    },
    animalType: {
        type: String,
        enum: ["Perro", "Gato", "Exótico"],
        require: true
    },
    animalBreed: {
        type: Boolean
        // raza del animal
    },
    weight: {
        type: Number,
        require: true
    },
    age: {
        type: String,
        enum: ["Cachorro", "Joven", "Adulto", "Anciano"],
        require: true
    },
    castrated: {
        type: Boolean,
        require: true
    },
    vaccines: {
        type: Boolean,
        require: true
    },
    size: {
        type: String,
        enum: ["Pequeño", "Mediano", "Grande"],
        require: true
    },
    lifestyle: {
        type: String,
        enum: ["Activo", "Muy activo", "Tranquilo", "Muy tranquilo"],
        require: true
    },
    illness: {
        // Enfermedades
        type: Boolean,
        require: true
    },
    microchip: {
        type: Boolean,
        require: true
    },
    adopted: {
        type: Boolean,
        default: false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Animal = model("Animal", animalSchema);

module.exports = Animal;
