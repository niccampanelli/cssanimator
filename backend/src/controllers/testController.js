const fs = require('fs');

module.exports = {
    async index(request, response){
        const { conteudo, filename } = request.query;

        const file = filename ? filename+".css" : "css_animator_file.css";

        fs.writeFile((filename ? filename+".css" : "css_animator_file.css"), conteudo, (err) => {
            if (err) throw err;
            console.log(`${file} foi salvo com sucesso.`);
        });

        return response.download(file, (err) => {
            if (err) return response.json(`O arquivo não pode ser baixado. Erro: ${err}. Tente novamente`);
            //else fs.unlink(file, (err) => {
                //if (err) console.error(`Não foi possível deletar ${file}.`);
                //else console.log(`${file} deletado com sucesso.`)
            //})
        });
    }
}
