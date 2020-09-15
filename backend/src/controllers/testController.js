const fs = require('fs');

module.exports = {
    async index(request, response){
        const { conteudo, filename } = request.body;

        const file = filename ? filename+".css" : "css_animator_file.css";

        fs.writeFile((filename ? filename+".css" : "css_animator_file.css"), conteudo, (err) => {
            if (err) throw err;
            console.log(`${file} has been saved`);
        });

        return response.download(file, (err) => {
            if (err) return response.json(`O arquivo não pode ser baixado. Erro: ${err}. Tente novamente`);
            else fs.unlink(file, (err) => {
                if (err) console.log(`Não foi possível deletar ${file}.`);
                else console.log(`${file} deletado com sucesso.`)
            })
        });
    }
}
