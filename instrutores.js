//importação do file system, modulo interno do node
const fs = require("fs")
const data = require("./data.json");

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

//mostrar instrutor
exports.show = function (req, res) {

    const { id } = req.params;

    const foundInstuctor = data.instructors.find(function (instructor) {
        return id == instructor.id;
    });

    if (!foundInstuctor) return res.send("Instrutor não cadastrado");


    function age(birth) {
        const today = new Date();
        const birthDate = new Date(birth);

        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();


        if (month < 0 || month == 0) {

        }
    }

    const instructor = {
        ...foundInstuctor,
        age: "",
        services: foundInstuctor.services.split(", "),
        created_at: "",
    }

    return res.render("instructors/show", { instructor: instructor });
}

