require("dotenv").config(); // this makes values in .env global variables here

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const passport = require('passport');

// initalise express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

require("./auth/auth");

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// setup mongo connection
mongoose.connect(process.env.MONGO_CONNECTION_URL);
mongoose.connection.on("error", (error) => {
    console.log("[mongoose] error : " + error);
    process.exit(1);
});
mongoose.connection.on("connected", () => {
    console.log("[mongoose] successfully connected to MongoDB");
});

// main routes
const getRoute = (name) => require(`./routes/${name}`);
app.use("/", getRoute("main"));
app.use("/", passport.authenticate('jwt', {session: false}), getRoute("secure"));

// catch incorrect routes
app.use((req, res, next) => {
    res.status(404);
    res.json({message: "404 - not found"});
});

// handle errors
app.use((err, req, res, next) => {
    console.log("error");
    res.status(err.status || 500);
    res.json({error : err});
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})