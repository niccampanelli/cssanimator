const fs = require('fs');

module.exports = {
    async index(request, response){
        const { conteudo, filename } = request.query;

        const file = filename ? filename+".css" : "css_animator_file.css";

        fs.writeFile((filename ? filename+".css" : "css_animator_file.css"), conteudo, (err) => {
            if (err) throw err;
            console.log(`${file} foi salvo com sucesso.`);
        });
        
        const fileToSend = fs.createReadStream(file);

        response.setHeader(`Content-disposition', 'attachment;filename=${file}`);

        //(err) => {
           // fs.unlink(file, (err) => {
              //  if (err) console.error(`Não foi possível deletar ${file}.`);
                //else console.log(`${file} deletado com sucesso.`)
           /// })
//return response.json(`O envio terminou.`);
        //});
    }
}
