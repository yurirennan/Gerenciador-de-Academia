//importação do file system, modulo interno do node
const fs = require("fs")
const data = require("../data.json");
const { date } = require("../utils");


// page inicial
exports.index = function (request, response) {
    return response.render("members/index.njk", { members: data.members });
}


//mostrar membro
exports.show = function (req, res) {

    const { id } = req.params;

    const foundMember = data.members.find(function (member) {
        return id == member.id;
    });

    if (!foundMember) return res.send("Membro não cadastrado");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render("members/show", { member: member });
}

exports.create = function (req, res) {
    return res.render("members/create.njk");
}

//criar membro
exports.post = function (req, res) {

    //pega as chaves do req;body que vem do form
    const keys = Object.keys(req.body);

    //validação dos campos
    for (key of keys) {
        if (req.body[key] === "") {
            return res.send("Por favor, preencha todos so campos corretamente!");
        }
    }

    birth = Date.parse(req.body.birth);
    const lastMember = data.members[data.members.length - 1];

    let id = 1;

    if (lastMember) {
        id = lastMember.id + 1
    }

    data.members.push({
        ...req.body,
        id,
        birth
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send("Erro ao processar os dados!");

        return res.redirect(`/membros/${id}`);
    })

}

//procurar membro
exports.edit = function (req, res) {

    const { id } = req.params;

    const foundMember = data.members.find(function (member) {
        return id == member.id;
    });

    if (!foundMember) return res.send("Membro não cadastrado");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render("members/edit.njk", { member: member })
}

//alterar dados do membro
exports.put = function (req, res) {

    const { id } = req.body;
    let index = 0;

    const foundMember = data.members.find(function (member, foundIndex) {
        if (id == member.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundMember) return res.send("Membro não cadastrado");

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write error");

        return res.redirect(`/membros/${id}`);
    })
}

//deletar membro
exports.delete = function (req, res) {
    const { id } = req.body;

    const filteredMembers = data.members.filter(function (member) {
        return member.id != id;
    });

    data.members = filteredMembers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Erro ao deletar membro!");
        }

        return res.redirect("/membros");
    })
}
