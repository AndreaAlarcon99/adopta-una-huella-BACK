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
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  isAdmin: Boolean,
});
```

#### CodingProject.model.js

```js
const codingProjectSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  url: { type: String, unique: true },
  image: String,
});
```

#### DesignProject.model.js

```js
const designProjectSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  images: [String],
});
```

#### Order.model.js

```js
const orderSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  modComment: {
    type: String,
    default: "Pendiente",
  },
  status: {
    type: String,
    enum: ["Aprobado", "Pendiente", "Denegado"],
    default: "Pendiente",
  },
});
```

## User roles

| Role  | Capabilities                                                                                                                               | Property       |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| User  | Can login/logout. Can read all the projects. Can create a new order.                                                                       | isAdmin: false |
| Admin | Can login/logout. Can read, edit or delete all the projects. Can create a new project. Can read all user's orders and edit or delete them. | isAdmin: true  |

## API Reference

| Method | Endpoint           | Require                                   | Response (200)                                                   | Action                                                                                   |
| :----: | ------------------ | ----------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
|  GET   | /animales          | -                                         | json([allPets])                                                  | Returns an array with all the animals that are in adoptation registeres in the database. |
|  GET   | /animalesAdoptados | -                                         | json([allPets])                                                  | Returns an array with all the animals that are adoptated registeres in the database.     |
|  GET   | /animales/:petId   | const { petId } = req.params              | json({singlePet})                                                | Returns the information of the specified animal.                                         |
|  POST  | /animales          | const {falta definir modelo} = req.body   | json({response})                                                 | Creates an animal in the database.                                                       |
|  PUT   | /animales/:petId   | const { petId } = req.params              | json({updatedAnimal})                                            | Edits an animal that already exists on the database.                                     |
| DELETE | /animales/:petId   | const { petId } = req.params              | json({message: "Animal with _petId_ was removed successfully."}) | Deletes an animal from the database.                                                     |
|  GET   | /profile/:userId   | -                                         | json({thisUser})                                                 | Returns the current user object.                                                         |
|  POST  | /profile/:userId   | const { falta definir modelo } = req.body | json({response})                                                 | Creates a user in the database.                                                          |
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
