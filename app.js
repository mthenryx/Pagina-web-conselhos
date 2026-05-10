'use scrict'

//Gera o conselho aleatorio da pagina principal
async function gerarConselhoDiario() {
    const numero = gerarNumeroAleatorio()
    const conselho = await getDadosConselhosDiario(numero)
    
    const frase = document.createElement("p")
    frase.className = "frase"
    frase.textContent = conselho.slip.advice

    document.getElementById("quadro-branco").appendChild(frase)
}

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * (224 - 1 + 1)) + 1;
}

async function getDadosConselhosDiario(id) {
    const url = `https://api.adviceslip.com/advice/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

gerarConselhoDiario()