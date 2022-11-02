# Adopta una huella Backend

Developed as the final project of our web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the frontend repository [here](https://github.com/AndreaAlarcon99/adopta-una-huella-FRONT).

## About

Hi! We are Andrea, Leticia and Nahuel, web developers students. This project is about a web application where you can adopt pets from different foundations. Our main goal is to make easier the process to adopt a pet and also help foundations to promote pet adoptations.

![Project logo.](../adopta-una-huella-FRONT/public/Huella%20logo.png "Project logo.")

## Deployment

You can check the app fully deployed [here](https://afabregasm.herokuapp.com/). If you wish to view the API deployment instead, check [here](https://afabregasm-back.herokuapp.com/api/).

## Work structure

We used [Trello](https://trello.com/home) tool to help us sharing the tasks during the project development.

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

| Method | Endpoint                    | Require                                             | Response (200)                                                        | Action                                                                    |
| :----: | --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
|  POST  | /signup                     | const { username, email, password } = req.body      | json({user: user})                                                    | Registers the user in the database and returns the logged in user.        |
|  POST  | /login                      | const { email, password } = req.body                | json({authToken: authToken})                                          | Logs in a user already registered.                                        |
|  GET   | /coding-projects            | -                                                   | json([allProjects])                                                   | Returns an array with all the coding projects registered in the database. |
|  GET   | /design-projects            | -                                                   | json([allProjects])                                                   | Returns an array with all the design projects registered in the database. |
|  GET   | /coding-projects/:projectId | const { projectId } = req.params                    | json({project})                                                       | Returns the information of the specified project.                         |
|  GET   | /design-projects/:projectId | const { projectId } = req.params                    | json({project})                                                       | Returns the information of the specified project.                         |
|  POST  | /coding-projects            | const { title, description, url, image } = req.body | json({response})                                                      | Creates a coding project in the database.                                 |
|  POST  | /design-projects            | const { title, description, images } = req.body     | json({response})                                                      | Creates a design project in the database.                                 |
|  PUT   | /coding-projects/:projectId | const { projectId } = req.params                    | json({updatedProject})                                                | Edits a coding project that already exists on the database.               |
|  PUT   | /design-projects/:projectId | const { projectId } = req.params                    | json({updatedProject})                                                | Edits a design project that already exists on the database.               |
| DELETE | /coding-projects/:projectId | const { projectId } = req.params                    | json({message: "Project with _projectId_ was removed successfully."}) | Deletes a coding project from the database.                               |
| DELETE | /design-projects/:projectId | const { projectId } = req.params                    | json({message: "Project with _projectId_ was removed successfully."}) | Deletes a design project from the database.                               |
|  GET   | /profile                    | -                                                   | json({thisUser})                                                      | Returns the current user object.                                          |
|  POST  | /profile                    | const { title, description, reference } = req.body  | json({message: "Your order was created successfully."})               | Creates an order in the database and update the current user document.    |
| DELETE | /profile/:orderId           | const { orderId } = req.params                      | json({message: "Your order was removed successfully."})               | Deletes an order from the database.                                       |
|  GET   | /all-orders                 | -                                                   | json([allOrders])                                                     | Returns an array with all the orders registered in the database.          |
|  GET   | /all-orders/:orderId        | const { orderId } = req.params                      | json({order})                                                         | Returns the information of the specified order.                           |
| PATCH  | /all-orders/:orderId        | const { orderId } = req.params                      | res.json({updatedOrder})                                              | Edits an order that already exists on the database.                       |

---
