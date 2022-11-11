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
  username: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true, match: [/^\S+@\S+.\S+$/, "Please use a valid email address."]},
  imgUser: {title: String, description: String, imageUrl: String, default: "../public/defaultimg.png"}
  password: { type: String, required: true },
  isAdmin: {type: Boolean, default: false}
});
```

#### Animal.model.js

```js
const animalSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User", require: true },
  animalName: { type: String, require: true },
  imgAnimal: {
    type: Array,
    title: String,
    description: String,
    imageUrl: String,
  },
  description: { type: String, require: true },
  gender: { type: String, enum: ["Macho", "Hembra"], require: true },
  birthday: { type: String, require: true },
  animalType: {
    type: String,
    enum: ["Perro", "Gato", "Exótico"],
    require: true,
  },
  animalBreed: Boolean,
  weight: { type: Number, require: true },
  age: {
    type: String,
    enum: ["Cachorro", "Joven", "Adulto", "Anciano"],
    require: true,
  },
  castrated: { type: Boolean, require: true },
  vaccines: { type: Boolean, require: true },
  size: { type: String, enum: ["Pequeño", "Mediano", "Grande"], require: true },
  lifestyle: {
    type: String,
    enum: ["Activo", "Muy activo", "Tranquilo", "Muy tranquilo"],
    require: true,
  },
  illness: { type: Boolean, require: true },
  microchip: { type: Boolean, require: true },
  ubication: { type: String },
  adopted: { type: Boolean, default: false },
});
```

## User roles

| Role  | Capabilities                                                                                                                       | Property       |
| :---: | ---------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| User  | Can login/logout. Can read all the pets. Can create a new pet. Can edit and delete his pets.                                       | isAdmin: false |
| Admin | Can login/logout. Can read, edit or delete all the pets. Can create a new pet. Can read all user's orders and edit or delete them. | isAdmin: true  |

## API Reference

| Method | Endpoint           | Require                                   | Response (200)                                                   | Action                                                                                   |
| :----: | ------------------ | ----------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
|  GET   | /animales          | -                                         | json([allPets])                                                  | Returns an array with all the animals that are in adoptation registeres in the database. |
|  GET   | /animalesAdoptados | -                                         | json([allPets])                                                  | Returns an array with all the animals that are adoptated registeres in the database.     |
|  GET   | /animales/:petId   | const { petId } = req.params              | json({singlePet})                                                | Returns the information of the specified animal.                                         |
|  POST  | /animales          | const { newAnimal } = req.body            | json({newAnimal})                                                | Creates an animal in the database.                                                       |
|  PUT   | /animales/:petId   | const { petId } = req.params              | json({updatedAnimal})                                            | Edits an animal that already exists on the database.                                     |
| DELETE | /animales/:petId   | const { petId } = req.params              | json({message: "Animal with _petId_ was removed successfully."}) | Deletes an animal from the database.                                                     |
|  GET   | /perfil/:userId    | -                                         | json({thisUser})                                                 | Returns the current user object.                                                         |
|  PUT   | /perfil/:userId    | const { userId } = req.params             | json({updatedUser})                                              | Edits an user that already exists on the database.                                       |
| DELETE | /perfil/:userId    | const { userId } = req.params             | json({message: "User with _userId_ was removed successfully."})  | Deletes an user from the database.                                                       |
|  POST  | /signup            | const { falta definir modelo } = req.body | json({response})                                                 | Creates a new user in the database.                                                      |
|  POST  | /login             | const { falta definir modelo } = req.body | json({authToken})                                                | Send the token as the response.                                                          |
|  GET   | /verify            | const { falta definir modelo } = req.body | json({payload})                                                  | Send back the token payload object containing the user data.                             |

---

Any doubts? Contact us!

<br>
<img width="20px" src="https://simpleicons.now.sh/linkedin/495f7e" alt="LinkedIn" />
</br>

<a href="https://www.linkedin.com/in/leticiasantospoveda/">Leticia</a>
<a href="https://www.linkedin.com/in/andreaalarconvaldes/">Andrea</a>
<a href="https://www.linkedin.com/in/angelnahuelciminialvarez/">Nahuel</a>
