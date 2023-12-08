const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
// Convert data into JSON Format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// use EJS as view Engine
app.set('view engine', 'ejs');
// Static file
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/signup", function (req, res) {
    res.render("signup");
})
// Register
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    // check if the user already exist
    const existuser = await collection.findOne({ name: data.name });

    if (existuser) {
        res.send("it is already use try another username");
    } else {
        // Hash the password using bcrypt
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(data.password, saltRound);

        data.password = hashPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.send("Successfull");
    }
})
// Login User
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("username can not find");
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("home");
        } else {
            req.send("Wrong Password");
        }
    } catch {
        res.send("Wrong Details");
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})