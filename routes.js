const express = require("express");
const instrutores = require("./instrutores");

const routes = express.Router();

routes.get("/", function (request, response) {
    return response.redirect("/instrutores");
});

routes.get("/instrutores", function (request, response) {
    return response.render("instructors/index.njk");
});

//routes.get(("/instrutores/:id"), instrutores.show);

routes.post("/instrutores", instrutores.post);


routes.get(("/instrutores/cadastro"), (req, res) => {
    return res.render("instructors/create.njk");
});

routes.get("/membros", function (request, response) {
    return response.send("membros");
});


module.exports = routes