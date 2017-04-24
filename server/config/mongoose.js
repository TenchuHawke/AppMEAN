const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

mongoose.promise = global.Promise
mongoose.connect("mongodb://localhost/AppMEAN")

const models_path = path.join(__dirname, "./../models")

fs.readdirSync(models_path).forEach(function(file) {
    if (file.indexOf(".js") >= 0) {
        require(path.join(models_path, file))
    }
})