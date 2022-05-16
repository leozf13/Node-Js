import fetch from "node-fetch";

function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
            .all(arrayURLs          //Quebra linha no "." e identa o código para deixar mais limpo
                .map(async url => {
                    const res = await fetch(url); // chama método fetch para verificar código da url
                    return `${res.status} - ${res.statusText}`; // template string para returnar código numérico e de texto
        }))

    return arrayStatus; // dar o return da função antes do catch

    } catch(erro) {
        manejaErros(erro);
    }
    
    
}

function extraiURL(arrayLinks) {
    //Object.values = extrai apenas os valores de um objeto, ignorando suas chaves
    return arrayLinks
        .map(Objeto => Object
            .values(Objeto).join()); // a função join() junta os diferentes arrays em um mesmo
}    

export default async function validaURLs(arrayLinks) {
    const links = extraiURL(arrayLinks);
    const statusLinks = await checaStatus(links); // await pois checaStatus é uma função assincrona
    
    //spread operator ou operador de espalhamento
    const resultados = arrayLinks.map((objeto, indice) => ({ //Envolve com parenteses para dizer que é um objeto
        ...objeto,
        status : statusLinks[indice]
    }))

    return resultados;
}