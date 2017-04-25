const mongoose = require("mongoose")

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name is too short"],
        maxlength: [255, "First name is too long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name is too short"],
        maxlength: [255, "Last name is too long"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [2, "Username is too short"],
        maxlength: [255, "Username is too long"]
    },
    email: {
        type: String,
        required: [true, "E-Mail is required"],
        minlength: [8, "E-Mail is too short"],
        maxlength: [255, "E-Mail is too long"],
        validate: {
            validator: function(v) {
                return emailRegex.test(v)
            },
            message: "{VALUE} is not a valid E-Mail address"
        }
    },
    password: {
        type: String,
        required: [true, "A Password is required"],
        minlength: [8, "Password must be 8 characters long"],
        maxlength: [130, "Password cannot be more than 130 characters long"],
    },
}, { timestamps: true })

mongoose.model("User", UserSchema)