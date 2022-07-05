const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const tokenList = {}; // in future we may store this in database rather than memory ! 

const userModel = require("../models/userModel");

router.get("/status", (req, res, next) => {
    res.status(200).json({status: "ok"});
});

router.post("/signup", passport.authenticate("signup", {session:false}), async (req, res, next) => {
    res.status(200).json({message: "signup successful"});
});


router.post("/login", async (req, res, next) => { 
    passport.authenticate("login", async (err, user, info) => {
        try{
            if (err || !user) {
                if (!user) {
                    return next("user was not found");
                }
                return next(err);
            }
            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);
                let body = {
                    _id: user._id,
                    email: user.email
                };

                let token = jwt.sign({user: body}, process.env.TOP_SECRET_KEY, {expiresIn: 300});
                let refreshToken = jwt.sign({user: body}, "top_secret_refresh_key", {expiresIn: 86400});

                // store tokens in cookie
                res.cookie("jwt", token);
                res.cookie("refreshJwt", refreshToken);

                // store tokens in memory
                tokenList[refreshToken] = {
                    token,
                    refreshToken,
                    email: user.email,
                    _id: user._id
                };

                // send back the token to user
                //return res.status(200).json({token, refreshToken});
                // send back status
                return res.status(200).json({status: "ok"});
            })
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    if (req.cookies) {
        let refreshToken = req.cookies["refreshJwt"];
        if (refreshToken in tokenList) delete tokenList[refreshToken];
        res.clearCookie("refreshJwt");
        res.clearCookie("jwt");
    }

    res.status(200).json({message: "logged out"});
});

router.post("/token", (req, res) => {
    let {refreshToken, email} = req.body;
    
    if ((refreshToken in tokenList) && email == tokenList[refreshToken].email) {
        let _id = tokenList[refreshToken]._id;
        let user = {email, _id};
        let token = jwt.sign({user}, process.env.TOP_SECRET_KEY, {expiresIn: 300});

        // update jwt
        res.cookie("jwt", token);
        tokenList[refreshToken].token = token;

        res.status(200).json({token});
    } else {
        res.status(401).json({message: "Unauthorised"});
    }
});

module.exports = router;

/*

curl -X POST -H 'Content-Type: application/json' -d '"{\"email\":\"test5@test.com\",\"password\":\"1234\",\"name\":\"test5\"}"' http://localhost:3000/signup

curl -X POST -H 'Content-Type: application/json' -d '"{\"email\":\"test5@test.com\",\"password\":\"1234\"}"' http://localhost:3000/login

curl -X POST -H 'Content-Type: application/json' -d '"{\"email\":\"test5@test.com\",\"score\":5000}"' http://localhost:3000/submit-score

mongodb

*/