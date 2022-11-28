const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

const fileUploader = require("../config/cloudinary.config");

// POST  /signup - creates a new user
router.post("/signup", fileUploader.single("imgUser"), (req, res, next) => {
  const { email, password, username, description, licence, location, imgUser } =
    req.body;

  // Check if any of them are provided as empty strings
  if (
    email === "" ||
    password === "" ||
    username === "" ||
    description === "" ||
    licence === "" ||
    location === ""
  ) {
    res.status(400).json({ message: "Todos los campos son obligatorios." });
    return;
  }

  // if (password !== password2) {
  //   res.status(400).json({ message: "Las contraseñas no coinciden." });
  // }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res
      .status(400)
      .json({ message: "Proporcione un correo electrónico valido." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "La contraseña debe tener al menos 6 caracteres y contener al menos un número, una minúscula y una mayúscula.",
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "Este usuario ya existe." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({
        email,
        password: hashedPassword,
        username,
        description,
        licence,
        location,
        imgUser: req.file.path,
      });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, username, _id, description, licence, location, imgUser } =
        createdUser;

      // Create a new object that doesn't expose the password
      const payload = {
        email,
        username,
        _id,
        description,
        licence,
        location,
        imgUser,
      };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken: authToken });

      // Send a json response containing the user object
      // res.status(201).json({ user: user });
    })
    .catch((err) => {
      next(err);
    }); // In this case, we send error handling to the error handling middleware.
});

// POST  /login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Todos los campos deben ser rellenados." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "Usuario no encontrado." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, username, description, licence, location, admin } =
          foundUser;

        // Create an object that will be set as the token payload
        const payload = {
          _id,
          email,
          username,
          description,
          licence,
          location,
          admin,
        };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Las credenciales no son correctas." });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
