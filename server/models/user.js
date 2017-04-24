const mongoose = require("mongoose")

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true, minlength: 2, maxlength: 130 },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        validate: {
            validator: function(v) {
                return emailRegex.test(v)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 130,
    },
}, { timestamps: true })

mongoose.model("User", UserSchema)