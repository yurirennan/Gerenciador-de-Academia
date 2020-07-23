//importação do file system, modulo interno do node
const fs = require("fs")
const data = require("../data.json");
const { age, date } = require("../utils");
const { send } = require("process");

exports.index = function (request, response) {
    return response.render("instructors/index.njk", { instructors: data.instructors });
}

//mostrar instrutor
exports.show = function (req, res) {

    const { id } = req.params;

    const foundInstuctor = data.instructors.find(function (instructor) {
        return id == instructor.id;
    });

    if (!foundInstuctor) return res.send("Instrutor não cadastrado");

    const instructor = {
        ...foundInstuctor,
        age: age(foundInstuctor.birth),
        services: foundInstuctor.services.split(", "),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstuctor.created_at),
    }

    return res.render("instructors/show", { instructor: instructor });
}

exports.create = function (req, res) {
    return res.render("instructors/create.njk");
}

//criar instrutor
exports.post = function (req, res) {

    //pega as chaves do req;body que vem do form
    const keys = Object.keys(req.body);

    //validação dos campos
    for (key of keys) {
        if (req.body[key] === "") {
            return res.send("Por favor, preencha todos so campos corretamente!");
        }
    }

    let { avatar_url, name, birth, gender, services } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send("Erro ao processar os dados!")

        return res.redirect("/instrutores")
    })

}

//editar instrutor
exports.edit = function (req, res) {

    const { id } = req.params;

    const foundInstuctor = data.instructors.find(function (instructor) {
        return id == instructor.id;
    });

    if (!foundInstuctor) return res.send("Instrutor não cadastrado");

    const instructor = {
        ...foundInstuctor,
        birth: date(foundInstuctor.birth).iso
    }

    return res.render("instructors/edit.njk", { instructor: instructor })
}

//alterar dados do instrutor
exports.put = function (req, res) {

    const { id } = req.body;
    let index = 0;

    const foundInstuctor = data.instructors.find(function (instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundInstuctor) return res.send("Instrutor não cadastrado");

    const instructor = {
        ...foundInstuctor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write error");

        return res.redirect(`/instrutores/${id}`);
    })
}

//deletar instrutor
exports.delete = function (req, res) {
    const { id } = req.body;

    const filteredInstructors = data.instructors.filter(function (instructor) {
        return instructor.id != id;
    });

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Erro ao deletar instrutor!");
        }

        return res.redirect("/instrutores");
    })
}

