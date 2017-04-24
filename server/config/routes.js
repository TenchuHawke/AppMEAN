const user = require("./../controllers/user.js")

module.exports = function(app) {
    //routes to methods.
    app.get("/lookupCurrentUser", user.lookupCurrentUser)
    app.get("/users", user.get_all_users)
    app.post("/createUser", user.createUser)
    app.delete("/deleteUser/:id", user.deleteUser)
    app.post("/checkUser", user.checkUser)
}