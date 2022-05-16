import chalk from "chalk";
import pegaArquivo from "./index.js";
import validaURLs from "./http-validacao.js";

const caminho = process.argv;

async function processaTexto(caminhoDoArquivo) {

    const resultado = await pegaArquivo(caminhoDoArquivo[2]);
    if(caminhoDoArquivo[3] === 'validar') {
        console.log(chalk.bgCyan('\n Links validados: \n'));
        console.log(await validaURLs(resultado)); // await pois tem de esperar a função validaURLs terminar de percorrer todo arquivo
    } else {
        
        console.log(chalk.yellow("\n Lista de Links: \n"))
        console.log(resultado);
    }

    // resultado.forEach(porraIrmao => {
    //     console.log(porraIrmao);
    // })

}

processaTexto(caminho);