const user = require("./../controllers/user.js")

module.exports = function(app) {
    //routes to methods.
    app.get("/lookup", user.lookupCurrentUser)
    app.get("/clear", user.clearSession)
    app.get("/users", user.get_all_users)
    app.post("/createUser", user.createUser)
    app.delete("/deleteUser/:id", user.deleteUser)
    app.post("/checkUser", user.checkUser)
}