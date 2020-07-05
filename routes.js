const express = require("express");

const routes = express.Router();

routes.get("/", function (request, response) {
    return response.redirect("/instrutores");
});

routes.get("/instrutores", function (request, response) {
    return response.render("instructors/index.njk");
});

routes.post("/instrutores", function (req, res) {
    return res.send("Recebido");
});


routes.get(("/instrutores/cadastro"), (req, res) => {
    return res.render("instructors/create.njk");
});

routes.get("/membros", function (request, response) {
    return response.send("membros");
});


module.exports = routes