# Adopta una huella Backend

Developed as the final project of our web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the frontend repository [here](https://github.com/AndreaAlarcon99/adopta-una-huella-FRONT).

## About

Hi! We are Andrea, Leticia and Nahuel, web developers students. This project is about a web application where you can adopt pets from different foundations. Our main goal is to make easier the process to adopt a pet and also help foundations to promote pet adoptations.

![Project logo.](./public/Huella.png "Project logo.")

## Deployment

You can check the app fully deployed [here](https://afabregasm.herokuapp.com/). If you wish to view the API deployment instead, check [here](https://afabregasm-back.herokuapp.com/api/).

## Work structure

We used [Trello](https://trello.com/b/Qbeckzgi) tool to help us sharing the tasks during the project development.

## Installation guide

- Fork this repo
- Clone this repo

```shell
$ cd adopta-una-huella-BACK
$ npm install
$ npm start
```

## Models

#### User.model.js

```js
const userSchema = new Schema({
  ourAnimals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Animal",
    },
  ],
  username: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    lowercase: true, 
    trim: true, 
    match: [/^\S+@\S+.\S+$/, "Please use a valid email address."]
  },
  imgUser: {
    type: String, 
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  licence: {
    type: String,
    enum: [
      "12345A",
      "12345B",
      "12345C",
      "12345D",
      "12345E",
      "12345F",
      "12345G",
      "12345H",
      "12345I",
      "12345J",
    ],
    required: true,
  },
  password: { 
    type: String, 
    required: [true, "Password is required."],
  },
  location: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
}
);
```

#### Animal.model.js

```js
const animalSchema = new Schema({
  creator: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    require: true 
  },
  animalName: { 
    type: String, 
    require: true 
  },
  imgAnimal: {
    type: String,
  },
  description: { 
    type: String, 
    require: true 
  },
  gender: { 
    type: String, 
    enum: ["Macho", "Hembra"], 
    require: true 
  },
  birthday: { 
    type: Date, 
  },
  animalType: {
    type: String,
    enum: ["Perro", "Gato", "Exótico"],
    require: true,
  },
  weight: { 
    type: Number, 
    require: true 
  },
  age: {
    type: String,
    enum: ["Cachorro", "Joven", "Adulto", "Anciano"],
    require: true,
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
    require: true,
  },
  microchip: { 
    type: Boolean, 
    require: true 
  },
  location: { 
    type: String 
  },
  adopted: { 
    type: Boolean, 
    default: false 
  },
}
{
  timestamps: true,
}
);
```

## User roles

| Role  | Capabilities                                                                                                                       | Property       |
| :---: | ---------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| User  | Can login/logout. Can read all the pets. Can create a new pet. Can edit and delete his pets.                                       | isAdmin: false |
| Admin | Can login/logout. Can read, edit or delete all the pets. Can create a new pet. Can read all user's orders and edit or delete them. | isAdmin: true  |

## API Reference

| Method | Endpoint           | Require                                   | Response (200)                                                   | Action                                                                                   |
| :----: | ------------------ | ----------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
|  GET   | /                  | -                                         | json([results])                                                  | Returns an array with all the animals that are old and in adoptation in the database.    |
|  GET   | /animales          | -                                         | json([results])                                                  | Returns an array with all the animals that are in adoptation filtered.                   |
|  GET   | /animalesAdoptados | -                                         | json([results])                                                  | Returns an array with all the animals that are adoptated registered in the database.     |
|  GET   | /animales/:animalId| const { animalId } = req.params           | json({results})                                                  | Returns the information of the animal chosen.                                             |
|  POST  | /animales          | const { newAnimal } = req.body            | json({results})                                                  | Creates an animal in the database.                                                       |
|  PUT   | /animales/:animalId| const { animalId } = req.params           | json({results})                                                  | Edits an animal that already exists on the database.                                   |
| DELETE | /animales/:animalId| const { animalId } = req.params           | json({message: `La publicación de ${animalId} se ha eliminado`)  | Deletes an animal from the database.                                                     |
|  GET   | /perfil/:userId    | const { userId } = req.params             | json({singleUser})                                               | Returns the current user object.                                                          |
|  GET   | /protectoras       | const filtro = {admin: false}             | json({results})                                                  | Returns all users (not admin user). 
|  PUT   | /perfil/:userId    | const { userId } = req.params             | json({updatedUser})                                              | Edits an user that already exists on the database.                                     |
| DELETE | /perfil/:userId    | const { userId } = req.params             | json({message: `El perfil ${userId} se ha eliminado`})           | Deletes an user from the database.                                                       |
|  POST  |/perfil/:userId/send| const mailData = req.body;                | json({message: "¡Mensaje enviado! Pronto contactarán contigo"})  | Sends an email to a user.                                                              |
|  POST  | /signup            | const { user } = req.body                 | json({response})                                                 | Creates a new user in the database.                                                     |
|  POST  | /login             | const { email, password } = req.body      | json({authToken})                                                | Send the token as the response.                                                        |
|  GET   | /verify            | -                                         | json({req.payload})                                              | Send back the token payload object containing the user data.                            |

---

Any doubts? Contact us!

<br>
<img width="20px" src="https://simpleicons.now.sh/linkedin/495f7e" alt="LinkedIn" />
</br>

<a href="https://www.linkedin.com/in/leticiasantospoveda/">Leticia</a>
<a href="https://www.linkedin.com/in/andreaalarconvaldes/">Andrea</a>
<a href="https://www.linkedin.com/in/angelnahuelciminialvarez/">Nahuel</a>
