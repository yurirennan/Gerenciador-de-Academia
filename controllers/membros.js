//importação do file system, modulo interno do node
const fs = require("fs")
const data = require("../data.json");
const { age, date } = require("../utils");


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
        age: age(foundMember.birth)
    }

    return res.render("members/show", { member: member });
}

exports.create = function (req, res) {

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

    let { avatar_url, name, birth, gender, services } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.members.length + 1);


    data.members.push({
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

        return res.redirect("/membros")
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
        birth: date(foundMember.birth)
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
