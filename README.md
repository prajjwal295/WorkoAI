# User Management API

This project is a simple User Management API built with Express.js, Mongoose, and other useful middlewares. It supports various user operations such as creating, retrieving, updating, and soft-deleting users.

## Installation

1 . Install Dependencies

```bash
npm install
npm install bcrypt
npm cookie-parser
npm cors
npm dotenv
npm express
npm joi
npm jsonwebtoken
npm mongoose
npm nodemon
```

2 . Set up environment variables:
Create a .env file in the root directory and add the following environment variables:


```bash
Port = 
DATABASE_URL = ""
JWT_SECRET = ""
```

3 . Start the server:
```bash
npm run dev
```


## API Endpoints

### 1 . Create User

URL: `http://localhost:${PORT}/createUser`

Method: POST

Description: Create a new user.

Request Body :
```bash
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "city": "New York",
  "age": 30,
  "zipCode": "123456"
}
```
### 2 . Get User Details

URL: `http://localhost:${PORT}/getUserDetails/:id`

Method: GET

Description: Retrieve details of a specific user by their ID.


### 3 . Get User List
URL: `http://localhost:${PORT}/getUserList`

Method: GET

Description: Retrieve a list of all users.


### 4 . Update User

URL: `http://localhost:${PORT}/updateUser`

Method: PUT

Description: Update user details (requires authentication)

Request Body :
```bash
{
  "id": "user_id",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "city": "Los Angeles",
  "age": 25,
  "zipCode": "654321"
}

```
### 5 . Patch User
URL: `http://localhost:${PORT}/updatePatchUser`

Method: PATCH

Description: Partially update user details (requires authentication).

Request Body (only fields to update) :
```bash
{
  "id": "user_id",
  "city": "San Francisco"
}

```
### 6 . Soft Delete User
URL: `http://localhost:${PORT}/softDelete`

Method: POST

Description: Mark a user as deleted without actually removing them from the database.

Request Body :
```bash
{
  "id": "user_id"
  // user id of the user
}

```

## Mongoose Schema

The Mongoose schema defines the structure of the user data stored in MongoDB. Here's the structure:


``` bash
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
  },
  zipCode: {
    type: String,
    required: true,
    match: [/^\d{6}(-\d{4})?$/, "Please fill a valid zip code"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
```
## Middleware

`auth`: Middleware to handle authentication for protected routes.

`cookieParser`: Middleware to parse cookies.

`cors`: Middleware to enable Cross-Origin Resource Sharing.



