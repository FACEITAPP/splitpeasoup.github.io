# Faceit

## A facial recognition authorization tool.
**Version**: 1.1.0

## Table of Contents
* [Team Members] (#Team-Members)
* [Contributors] (#Contributors)
* [Technologies Used] (#Technologies-Used)
* [Overview] (#Overview)
  * [Problem Domain] (#Problem-Domain)
  * [User Stories] (#User-Stories)
* [How to use our API] (#How-to-Use-Our-API)
* [Project Details] (#Project-Details)

## Team Members
* Alicia Lycan https://github.com/alicialycan
* Caitlin Sweeney https://github.com/splitpeasoup
* Mitch Hall https://github.com/SCUBAGUYPNW
***

## Contributors
* JB Tellez
* Steve Geluso

## Technologies Used
* FacePlusPlus API <https://www.faceplusplus.com/>
* Amazon S3
* JavaScript
* NodeJS
* ExpressJS
* MongoDB
* Mongoose
* AWS SDK
* RESTful API
* Multer
* Basic and Bearer Authorization/Authentication
* Heroku
* Superagent
* Jest
* Travis CI
* Bcrypt
* JWT

## Overview

## Problem Domain:
Create an App that will incorporate Username/Password security along with facial recognition. Users username, hashed password and the return value from the facial recognition API will be stored in a MongoDB.
The App will also generate a bearer token so the user will be recognized as being signed in.

## User Stories:
- As a user, I want to be able to create an account in the App by providing a username and password, and I will also select a photo that will be passed onto the facial recognition API.
- I will then sign into the app using that username and password and will supply another (or the same) photo. My second photo will then be compared against the return from the first photo and if they match I will be able to login. If they do not match I will be alerted they do not match.
- Once I have successfully signed in, I want the app to know that I have successfully signed in so I can move about the app without being prompted to login again.

## How to Use Our API

### POST request to create a new user sign up
- User will be presented with an HTML form where they will be prompted to supply a Username, Password and a photo.
- The username and password will be passed into the Create User MongoDB schema and prior to being saved the password will be hashed using BCrypt.
 - The photo will be sent to the API and a face-token will be returned. This face-token will be saved to the user database in MongoDB.

### POST request to for existing user sign in
- User will be prompted to supply a username, password and another photo (or the same photo).
- The username and password will be compared to the values stored in the database and an authorization token will be returned.
- The second photo the user supplies will be sent to the API alongside the first photo they supplied and the API will return a match threshold.
- If the match threshold is within accepted range and the user has an authorization token the user will be considered logged in.