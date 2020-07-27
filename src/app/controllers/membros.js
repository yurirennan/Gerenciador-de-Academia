const { age, date } = require("../../lib/utils");
const model = require("../models/member");


module.exports = {
    index(req, res) {
        model.all(function (members) {
            return res.render("members/index.njk", { members });
        })

    },
    create(req, res) {

        model.instructorSelectOption(function (options) {
            return res.render("members/create.njk", { instructorOptions: options });
        });

    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send("Por favor, preencha todos so campos corretamente!");
            }
        }

        model.create(req.body, function (member) {
            return res.redirect(`/membros/${member.id}`);
        });

    },
    show(req, res) {
        model.find(req.params.id, function (member) {
            if (!member) return res.send("Instrutor não encontrado");

            member.birth = date(member.birth).birthDay;

            return res.render("../views/members/show", { member })
        });
    },
    edit(req, res) {

        model.find(req.params.id, function (member) {
            if (!member) return res.send("Instrutor não encontrado");

            member.birth = date(member.birth).iso;

            model.instructorSelectOption(function (options) {
                return res.render("members/edit", { member, instructorOptions: options });
            });
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
            return res.redirect(`/membros/${req.body.id}`);
        })

    },
    delete(req, res) {
        model.delete(req.body.id, function () {
            return res.redirect("/membros");
        });
    },
}


