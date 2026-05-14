'use scrict'

const conteudo = document.getElementById("conteudo")
const conteudoOriginal = conteudo.innerHTML

//Funcao que altera o o efeito dos button do hearder
function limparHeader(elemento) {

    const buscar = document.getElementById("pag-busca")
    const aleatorio = document.getElementById("pag-principal")
    const procurar = document.getElementById("pag-ordem")

    if(elemento == "buscar"){
        buscar.className = "active"
        aleatorio.classList.remove("active")
        procurar.classList.remove("active")
    }else if(elemento == "aleatorio"){
        buscar.classList.remove("active")
        aleatorio.className = "active"
        procurar.classList.remove("active")
    }else{
        buscar.classList.remove("active")
        aleatorio.classList.remove("active")
        procurar.className = "active"
    }
}

//Gera o conselho aleatorio da página principal
document.getElementById("pag-principal").addEventListener("click", function() {

    limparHeader("aleatorio")

    const conteudo = document.getElementById("conteudo")
    conteudo.innerHTML = conteudoOriginal 

    gerarConselhoDiario()
})

async function gerarConselhoDiario() {
    const quadro = document.getElementById("quadro-branco")
    quadro.innerHTML = ""

    const conselho = await getDadosConselhosDiario()
    const traduzido = await traduzirTextoPortugues(conselho.slip.advice)

    const frase = document.createElement("p")
    frase.className = "frase"
    frase.textContent = traduzido

    document.getElementById("quadro-branco").appendChild(frase)
}

async function getDadosConselhosDiario() {
    let number = Math.floor(Math.random() * (224 - 1 + 1)) + 1
    const url = `https://api.adviceslip.com/advice/${number}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

gerarConselhoDiario()

//Organiza o main para a segunda parte, 
//onde vai ter a parte de buscar um conselho

document.getElementById("pag-busca").addEventListener("click", function() {

    limparHeader("buscar")

    const container     = document.createElement("div")
    container.className = "container-buscar"

    const topico       = document.createElement("span")
    topico.textContent = "- Buscar"
    topico.className   = "topico" 

    const titulo     = document.createElement("h2")
    titulo.innerHTML = "Encontre um <br>conselho específico"

    const texto       = document.createElement("p")
    texto.className   = "pesquisa"
    texto.innerHTML   = "Pesquise por qualquer palavra ou tema.<br>Que nós te devolvemos um conselho."

    const sombra     = document.createElement("div")
    sombra.className = "quadro-sombra"

    const div = document.createElement("div")

    const digitar       = document.createElement("input")
    digitar.type        = "text"
    digitar.className   = "tema"
    digitar.id          = "tema"
    digitar.placeholder = "Ex: amigos, tempo, coragem..."

    const botao       = document.createElement("button")
    botao.textContent = "Buscar"
    botao.className   = "button-verde"
    botao.onclick     = exibirImgECoselho()

    const conteudo = document.getElementById("conteudo")
    conteudo.innerHTML = ""

    container.append(topico, titulo, texto, sombra, div)
    sombra.appendChild(div)
    div.append(digitar, botao)
    conteudo.appendChild(container)
})

function exibirImgECoselho() {

}

async function getImgTema(tema) {
    const url = `https://api.sourcesplash.com/i/random?q=${tema}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function getDadosConselhosTema(tema) {
    const url = `https://api.adviceslip.com/advice/search/${tema}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

//Organiza o main para a terceira parte, 
//onde vai ter a parte de buscar por ordem o conselho

//Api de tradução do google, mechi em algumas coisas para ele aguentar varias requisições
function delay(statusCode) {
    return new Promise(resolve => setTimeout(resolve, statusCode))
}

async function traduzirTextoIngles(texto) {
    const response = await fetch(
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=en&dt=t&q=" +
        encodeURIComponent(texto)
    )

    const data = await response.json()

    return data[0][0][0]
}

async function traduzirIngles() {
    const texto = document.getElementById("texto").value

    if (!texto) return

    const traducao = await traduzirTexto(texto)

    document.getElementById("resultado").innerText = traducao
}

async function traduzirTextoPortugues(texto) {
    const response = await fetch(
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=" +
        encodeURIComponent(texto)
    )

    const data = await response.json()

    return data[0][0][0]
}

async function traduzirPortugues() {
    const texto = document.getElementById("texto").value

    if (!texto) return

    const traducao = await traduzirTextoPortugues(texto)

    document.getElementById("resultado").innerText = traducao

    await delay(300)
}


