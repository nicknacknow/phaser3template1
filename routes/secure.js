const express = require("express");
const router = express.Router();

const asyncMiddleware = require("../middleware/async");
const userModel = require("../models/userModel");

router.post("/submit-score", asyncMiddleware( async (req, res, next) => {
    console.log("yo");
    const { email, score } = req.body;
    await userModel.updateOne({email}, {highScore: score});
    res.status(200).json({status: "ok"});
}));

router.get("/scores", asyncMiddleware( async (req, res, next) => { // can write own sorting algorithm here e.g. quicksort
    const users = await userModel.find({}, "name highScore -_id").sort({highScore: -1}).limit(10);
    res.status(200).json(users);
}));

module.exports = router;