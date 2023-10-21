# User Authentication System

## Overview

This project is a simple User Authentication System that provides user registration (signup) and sign-in functionality. It allows users to securely create an account and access their account by logging in. 

## Features

- **User Registration (Signup):** 
  - Users can create a new account by providing their email, username and password.
  - Passwords are securely hashed before storing in the database.

- **User Authentication (Login):**
  - Registered users can log in using their email and password.
  - User sessions are maintained for authenticated users using JWT.

## Technologies Used

- **Programming Language:** This project is implemented using [Nodejs] and [Express].

- **Database:** User data is stored in [MongoDB database] for safe and secure storage.

- **Security:** The system implements best practices for secure password handling, including password hashing.

## Installation and Setup

1. Clone the repository to your local machine.

2. Run `npm install` in the root directory of the project. 

3. Create Environmental variables with you mongodb connetion string
  * URL => mongodb connection string
  * JWT_SECRET => Secret to you JsonWebToken
  * PORT => Prefered port or it uses a default port 8080

## Usage

 ## TO signup
 * Method   => POST
 * Route    => http://localhost/api/auth/signup
 * data     => {
      "password": 123456,
      "username: "John",
      "email": "johndoe@gmail.com"
 }
 * Response => {
      "status": "success",
      "message": "Signup successful",
      "data": null
  }

 ## To Login
 * Method   => POST
 * Route    => http://localhost/api/auth/login
 * data     => {
      "password": 1234,
      "email": "johndoe@gmail.com"
 }
 * Response => {
    "status": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTc5MDQ0MTIsImV4cCI6MTY5Nzk5MDgxMn0.tY9dzg3JTTGPPYcOJhLlpjmSsKMm7geTW_Q-pFqA9EM",
        "userId": "6533e55a9681d5bc0839ba55",
        "username": "John"
    }
 }