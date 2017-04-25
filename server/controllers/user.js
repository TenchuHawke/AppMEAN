const mongoose = require("mongoose")
const User = mongoose.model("User")
const hash = require("password-hash")
const saltRounds = 10

module.exports = {

    get_all_users: function(req, res) {
        User.find({}, function(err, data) {
            if (err) {
                res.json(err)
            } else {
                res.json(data)
            }
        })
    },
    createUser: function(req, res) {
        var Error = []
        User.find({ "email": req.body.email },
            (err, data) => {
                if (data.length > 0) {
                    Error.push("Email already exists")
                }
            })
        User.find({ "username": req.body.username },
            (err, data) => {
                if (data.length) {
                    Error.push("\nUsername already exists")
                }
            })
        if (Error.length == 0 && req.body.password == req.body.passwordConfirm) {
            var pw = hash.generate(req.body.password)
            var newUser = new User(req.body)
            newUser.password = pw
            newUser.save(function(err, data) {
                if (err || Error.length > 0) {
                    if (err) {
                        for (var errName in err.errors) {
                            Error.push(err.errors[errName].message)
                        }
                    }
                    res.json({ added: false, errors: Error })
                    return
                } else {
                    req.session.CurrentUser = data
                    res.json({ added: true, user: req.session.CurrentUser })
                    return
                }
            })
        } else {
            if (req.body.password = !req.body.passwordConfirm) {
                Error.push("Password and Confirmation must match")
            }
            res.json({ added: false, errors: Error })
        }
    },
    checkUser: function(req, res) {
        let errors = []
        User.findOne({ "email": req.body.email },
            (err, data) => {
                if (!data) {
                    errors.push("Email or Password not found.")
                    res.json({ errors: errors })
                } else {
                    if (hash.verify(req.body.password, data.password)) {
                        req.session.CurrentUser = data;
                        res.json(data)
                    } else {
                        errors.push("Email or Password not found.")
                        res.json({ errors: errors })
                    }
                }
            })
    },
    deleteUser: function(req, res) {
        User.remove({ _id: req.params.id }, function(err) {
            if (err) {
                res.json(false)
            } else {
                res.json(true)
            }
        })
    },

    lookupCurrentUser: function(req, res) {
        if (req.session.CurrentUser) {
            res.json(req.session.CurrentUser)
        } else {
            res.json({ error: "Not logged in" })
        }
    },
    clearSession: function(req, res) {
        req.session.CurrentUser = null;
    }
}