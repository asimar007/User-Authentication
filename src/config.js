const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb://localhost:27017/Hello");

// Check Database Connect or Not
connect.then(() => {
    console.log("Database Connect");
})
    .catch(() => {
        console.log("Database not Connect");
    })

// Create Schema
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
// Collection Part

const collection = new mongoose.model("users", loginSchema);

module.exports = collection;