const { age, date } = require("../../lib/utils");
const model = require("../models/instructor");


module.exports = {
    index(req, res) {
        model.all(function (instructors) {
            return res.render("instructors/index.njk", { instructors });
        })

    },
    create(req, res) {
        return res.render("instructors/create.njk");

    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send("Por favor, preencha todos so campos corretamente!");
            }
        }

        model.create(req.body, function (instructor) {
            return res.redirect(`/instrutores/${instructor.id}`);
        });

    },
    show(req, res) {
        model.find(req.params.id, function (instructor) {
            if (!instructor) return res.send("Instrutor não encontrado");

            instructor.age = age(instructor.birth);
            instructor.services = instructor.services.split(", ");
            instructor.created_at = date(instructor.created_at).format

            return res.render("../views/instructors/show", { instructor })
        });
    },
    edit(req, res) {

        model.find(req.params.id, function (instructor) {
            if (!instructor) return res.send("Instrutor não encontrado");

            instructor.birth = date(instructor.birth).iso;

            return res.render("../views/instructors/edit", { instructor })
        });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send("Por favor, preencha todos so campos corretamente!");
            }
        }

        model.update(req.body, function () {
            return res.redirect(`/instrutores/${req.body.id}`);
        })

    },
    delete(req, res) {
        model.delete(req.body.id, function () {
            return res.redirect("/instrutores");
        });
    },
}



