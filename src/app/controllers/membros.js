const { age, date } = require("../../lib/utils");

module.exports = {
    index(req, res) {
        return res.render("members/index.njk");

    },
    create(req, res) {
        return res.render("members/create.njk");

    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send("Por favor, preencha todos so campos corretamente!");
            }
        }


    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send("Por favor, preencha todos so campos corretamente!");
            }
        }
        return
    },
    delete(req, res) {
        return
    },
}



