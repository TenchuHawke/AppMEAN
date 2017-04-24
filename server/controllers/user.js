const mongoose = require("mongoose")
const User = mongoose.model("User")
const hash = require("password-hash")
const saltRounds = 10

module.exports = {

    get_all_users: function(req, res) {
        console.log("get all users")
        User.find({}, function(err, data) {
            if (err) {
                console.log("User find Error", err)
                res.json(err)
            } else {
                res.json(data)
            }
        })
    },
    createUser: function(req, res) {
        console.log("Create User:", req.body)
        if (req.body.password == req.body.passwordConfirm) {
            var pw = hash.generate(req.body.password)
            var newUser = new User(req.body)
            newUser.password = pw
            console.log(newUser.password)
            newUser.save(function(err, data) {
                if (err) {
                    console.log("user create error", err)
                    res.json({ added: false, error: err })
                } else {
                    req.session.CurrentUser = data
                    console.log("Logged in user ID:", req.session.CurrentUser)
                    res.json({ added: true })
                }
            })
        } else {
            console.log("Password and Confirmation must match.")
            res.json({ added: false, error: "Password and Confirmation password must match." })
        }
    },
    checkUser: function(req, res) {
        console.log("server.users.js.check user")
        User.findOne({ "email": req.body.email },
            (err, data) => {
                if (!data) {
                    console.log("User find Error", err)
                    res.json(err)
                } else {
                    console.log("found")
                    let checkUser = data;
                    if (hash.verify(req.body.password, data.password)) {
                        console.log("password succeeded")
                        req.session.CurrentUser = checkUser;
                        console.log("current user:", req.session.CurrentUser)
                        res.json(data)
                    } else {
                        console.log("password fail")
                        res.json({ error: "Email and Password don't match." })

                    }
                }
            })
    },
    deleteUser: function(req, res) {
        console.log("delete user")
        User.remove({ _id: req.params.id }, function(err) {
            if (err) {
                console.log("User delete error")
                res.json(false)
            } else {
                console.log("User Deleted")
                res.json(true)
            }
        })
    },
    lookupCurrentUser: function(req, res) {
            console.log("lookup")
            console.log(req.session.CurrentUser)
            if (req.session.CurrentUser) {
                console.log("sending...")
                Promise.resolve(res.json(req.session.CurrentUser))
            } else { res.json(Promise.resolve("User Not Logged in")) }
        }
        // lookupCurrentUser: function(req, res) {
        //     console.log("lookup current user")
        // if (res.session.CurrentUser) {
        //     res.json(res.session.CurrentUser)
        // } else {
        //     res.json("Not logged in")
        // }
        // }
}