const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

const userModel = require("../models/userModel");

// handle sign up
passport.use("signup", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => { 
    try {
        let { name } = req.body;
        let user = await userModel.create({email, password, name});
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

// handle log in
passport.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        let user = await userModel.findOne({ email });
        if (!user){
            return done(null, false, {message: "User not found"});
        }
        let valid = await user.isValidPassword(password);
        if (!valid){
            return done(null, false, {mesage: "Incorrect password"});
        }
        return done(null, user, {message: "Successful login"});
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: process.env.TOP_SECRET_KEY,
    jwtFromRequest: (req) => (req && req.cookies) ? req.cookies['jwt'] : null
}, async (token, done) => {
    try{
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}))