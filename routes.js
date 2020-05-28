const express = require("express")

const routes = express.Router()

routes.get("/", function (request, response) {
    return response.send("sobre")
})

routes.get("/instrutores", function (request, response) {
    return response.render("instructors/index.html")
})

routes.get("/membros", function (request, response) {
    return response.send("membros")
})

module.exports = routes