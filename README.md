# Nutrition web application 🥐

Small web application to calculate, control, and record food consumption.

The API uses Node.js and Typescript, and is connected to a Mongodb database.
The Front is built with React.js.

## Overview

![Overview](https://github.com/clementpiat/Nutrition-web-app/blob/master/nutrition.gif)

## Install and start

This project uses node-typescript
```
sudo apt install node-typescript
```
Create a ./api/.env file with the database credentials
```
DB_USERNAME=username
DB_PASSWORD=password
```
To install the backend dependencies and start the backend :
```
cd api
tsc
npm install
npm start
```
To install the frontend dependencies and start the frontend :
```
cd front
npm install
npm start
```
