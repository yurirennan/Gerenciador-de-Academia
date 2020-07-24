const express = require("express");
const instrutores = require("./app/controllers/instrutores");
const membros = require("./app/controllers/membros");

const routes = express.Router();

routes.get("/", function (request, response) {
    return response.redirect("/instrutores");
});

routes.get("/instrutores", instrutores.index);
routes.post("/instrutores", instrutores.post);
routes.get("/instrutores/cadastro", instrutores.create);
routes.get("/instrutores/:id", instrutores.show);
routes.get("/instrutores/:id/editar", instrutores.edit);
routes.put("/instrutores", instrutores.put);
routes.delete("/instrutores", instrutores.delete);


routes.get("/membros", membros.index);
routes.get("/membros/cadastro", membros.create);
routes.get("/membros/:id", membros.show);
routes.get("/membros/:id/editar", membros.edit);
routes.post("/membros", membros.post);
routes.put("/membros", membros.put);
routes.delete("/membros", membros.delete);


module.exports = routes