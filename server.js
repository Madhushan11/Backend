//Load env variables
if (process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

//Import dependencies
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const vehiclesController = require("./controllers/vehiclesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

//Create an express app
const app= express();

//Configure express app
app.use(express.json({limit : '50mb'}));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));


// Connect to database
connectToDb();

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);
app.get("/vehicles", requireAuth, vehiclesController.fetchVehicles);
app.get("/vehicles/:id", requireAuth, vehiclesController.fetchVehicle); 
app.post("/vehicles", requireAuth, vehiclesController.createVehicle);
app.put("/vehicles/:id", requireAuth, vehiclesController.updateVehicle);
app.delete("/vehicles/:id", requireAuth, vehiclesController.deleteVehicle);

//Start our server
app.listen(process.env.PORT);