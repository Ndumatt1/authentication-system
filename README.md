# Hospital Authentication System

## Overview

This project is a simple Authentication System for hospital dashboard signup and login. 

## Features

- **Hospital Registration (Signup):** 
  - Hospitals can create a new account by providing their email,name, address, phonenumber and password.
  - Passwords are securely hashed before storing in the database.

- **Hospital Authentication (Login):**
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
 * Route    => https://authentication-system-sai8.onrender.com/api/auth/signup
 * data     => {
    "hos_email": "johndoe@gmail.com",
    "hos_address": "Abakaliki",
    "password": "Hospital@1",
    "hos_name": "Holy Hospital",
    "hos_telephone": "12345678901"
}
 * Response => {
      "status": "success",
      "message": "Signup successful",
      "data": null
  }

 ## To Login
 * Method   => POST
 * Route    => https://authentication-system-sai8.onrender.com/api/auth/login
 * data     => {
      "password": "Hospital@1",
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
