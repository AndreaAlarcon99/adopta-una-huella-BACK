const { Schema, model } = require("mongoose");

const animalSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    animalName: {
      type: String,
      require: true,
    },
    imgAnimal: {
      type: String,
      title: String,
      description: String,
      imageUrl: String,
    },
    description: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["Macho", "Hembra"],
      require: true,
    },
    birthday: {
      dia: {
        type: Number,
      },

      mes: {
        type: Number,
      },
      año: {
        type: Number,
      },
      require: true,
    },
    animalType: {
      type: String,
      enum: ["Perro", "Gato", "Exótico"],
      require: true,
    },

    weight: {
      type: Number,
      require: true,
    },
    age: {
      type: String,
      enum: ["Cachorro", "Joven", "Adulto", "Anciano"],
      require: true,
    },
    castrated: {
      type: Boolean,
      require: true,
    },
    vaccines: {
      type: Boolean,
      require: true,
    },
    size: {
      type: String,
      enum: ["Pequeño", "Mediano", "Grande"],
      require: true,
    },
    lifestyle: {
      type: String,
      enum: ["Activo", "Muy activo", "Tranquilo", "Muy tranquilo"],
      require: true,
    },
    microchip: {
      type: Boolean,
      require: true,
    },
    location: {
      type: String,
    },

    adopted: {
      type: Boolean,
      default: false,
    },
    singleAnimal: {
      type: Boolean,
      default: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Animal = model("Animal", animalSchema);

module.exports = Animal;
