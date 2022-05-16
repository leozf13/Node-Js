import chalk  from "chalk"; //importa dependencia/biblioteca chalk
import fs from "fs"; //file system\\ Biblioteca nativa 

//import path from "path";

//let __dirname = "./arquivos"

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm; // expressão regular para identificar palavras crave e links
    const arrayResultados = [];  // array para armazenas links extraídos
    let temp; //variável temporária para percorrer o texto

    while((temp = regex.exec(texto)) !== null) { //enquanto temp for diferente de null, ela percorrerá o texto seguindo a expressão regular
        arrayResultados.push({ [temp[1]] : temp[2] }) // temp1 está entre colchetes poisestá sendo definida como a chave do objeto
    }

    return arrayResultados.length === 0 ? chalk.redBright("\n Não há Links \n") : arrayResultados; //retorna array com os links extraídos
}

function trataErro(erro) { //Função para tratar erros ao ler o arquivo
    throw new Error(chalk.redBright(erro.code === 'EISDIR' ? 'Diretório e não arquivo' : 'Erro')); // cria um objeto do tipo Error com o parâmetro 'erro'
}

export default async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
      const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
      return extraiLinks(texto);
    } catch(erro) {
      trataErro(erro);
    }
  }

  

//pegaArquivo(caminho[2]);





