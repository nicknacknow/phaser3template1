const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema; // simplified class name

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    highScore: {
        type: Number,
        default: 0
    }
});

// right before data is saved to the db, mongoose calls this where we can make required changes, such as hashing pw
userSchema.pre("save", async function(next) { // can't be arrow function as 'this' is handled differently
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password); // compares if input password's hash is equal to user's stored & hashed password
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;