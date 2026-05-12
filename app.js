'use scrict'

//Gera o conselho aleatorio da pagina principal
async function gerarConselhoDiario() {
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

// {/* <span class="topico">- Buscar</span>
// <h2>Encontre um <br>conselho específico</h2>
// <p class="pesquisa">Pesquise por qualquer palavra ou tema.<br>Que nós te devolvemos um conselho.</p>
// <div class="quadro-sombra">
//     <div>
//         <input type="text" class="tema" id="tema" placeholder="Ex: amigos, tempo, coragem...">
//         <button class="button-verde" onclick="exibirImgECoselho()">Buscar</button>
//     </div>
// </div> */}

document.getElementById("pag-busca").addEventListener("click", function() {
    const buscar = document.getElementById("pag-busca")
    buscar.className = "active"

    const aleatorio = document.getElementById("pag-principal")
    aleatorio.classList.remove("active")

    const topico     = document.createElement("span")
    topico.textContent = "- Buscar"
    topico.className = "topico" 

    const titulo       = document.createElement("h2")
    titulo.textContent = "Encontre um <br>conselho específico"

    const texto       = document.createElement("p")
    texto.className   = "pesquisa"
    texto.textContent = "Pesquise por qualquer palavra ou tema.<br>Que nós te devolvemos um conselho."

    const sombra     = document.createElement("div")
    sombra.className = "quadro-sombra"

    const container = document.createElement("div")

    const digitar       = document.createElement("input")
    digitar.type        = "text"
    digitar.className   = "tema"
    digitar.id          = "tema"
    digitar.placeholder = "Ex: amigos, tempo, coragem..."

    const botao       = document.createElement("button")
    botao.textContent = "Buscar"
    botao.className   = "button-verde"
    botao.onclick     = exibirImgECoselho

    sombra.appendChild(container)
    container.append(digitar, botao)

    const conteudo = document.getElementById("conteudo")

    conteudo.innerHTML = ""

    conteudo.getElementById("conteudo").append(topico, titulo, texto, sombra, container, digitar, botao)
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


