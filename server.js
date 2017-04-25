const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")

const PORT = 4512
let secret = 'ThisIsAStillSecretKey' // string for encryption

var app = express();
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    maxAge: 20000
}));

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "./client/dist")))
app.use(express.static(path.join(__dirname, "../client/node_modules")))
app.use(express.static(path.join(__dirname, "./node_modules")))
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    // });

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app)

app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`)
})