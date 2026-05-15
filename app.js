'use strict'

const conteudo = document.getElementById("conteudo")
const conteudoOriginal = conteudo.innerHTML

//Funcao de alterar header
function limparHeader(elemento) {

    const buscar = document.getElementById("pag-busca")
    const aleatorio = document.getElementById("pag-principal")
    const procurar = document.getElementById("pag-ordem")

    if (elemento == "buscar") {
        buscar.className = "active"
        aleatorio.classList.remove("active")
        procurar.classList.remove("active")
    } else if (elemento == "aleatorio") {
        buscar.classList.remove("active")
        aleatorio.className = "active"
        procurar.classList.remove("active")
    } else {
        buscar.classList.remove("active")
        aleatorio.classList.remove("active")
        procurar.className = "active"
    }
}

//Funcao de alterar numero de busca
function alterarNumeroConselhosBuscados() {
    const numero = document.getElementById("number")

    if (numero.textContent === "+99") return

    let valor = Number(numero.textContent)
    valor++

    if (valor > 99) {
        numero.textContent = "+99"
    } else {
        numero.textContent = valor
    }
}

//Funcao da pagina principal
document.getElementById("pag-principal").addEventListener("click", function () {

    limparHeader("aleatorio")

    const conteudo = document.getElementById("conteudo")
    conteudo.innerHTML = conteudoOriginal

    gerarConselhoDiario()
})

async function gerarConselhoDiario() {
    const quadro = document.getElementById("quadro-branco")
    quadro.innerHTML = ""

    const conselho = await getDadosConselhosDiario()
    const traduzido = await traduzir(conselho.slip.advice, "en")

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

//funcao que cria os elemento do buscar
document.getElementById("pag-busca").addEventListener("click", function () {

    limparHeader("buscar")

    const container = document.createElement("div")
    container.className = "container-buscar"

    const topico = document.createElement("span")
    topico.textContent = "- Buscar"
    topico.className = "topico"

    const titulo = document.createElement("h2")
    titulo.innerHTML = "Encontre um <br>conselho específico"

    const texto = document.createElement("p")
    texto.className = "pesquisa"
    texto.innerHTML = "Pesquise por qualquer palavra ou tema.<br>Que nós te devolvemos um conselho."

    const sombra = document.createElement("div")
    sombra.className = "quadro-sombra"

    const div = document.createElement("div")

    const digitar = document.createElement("input")
    digitar.type = "text"
    digitar.className = "tema"
    digitar.id = "tema"
    digitar.placeholder = "Ex: amigos, tempo, coragem..."

    const botao = document.createElement("button")
    botao.id = "buscar"
    botao.textContent = "Buscar"
    botao.className = "button-verde"
    botao.addEventListener("click", async function () {

        const tema = document.getElementById("tema").value
        if (!tema) {
            return
        } else {

            const antigo = container.querySelector(".container-img-text")
            
            if (antigo) {
                antigo.remove()
            }

            const temaTraduzido = await traduzir(tema, "pt")

            const imgTema = await getImgTema(temaTraduzido)
            const img = document.createElement("img")
            img.src = `${imgTema}`
            img.alt = `Img: ${tema}`
            img.className = "imgTema"

            const dados = await getDadosConselhosTema(temaTraduzido)
            const conselhoPortugues = await traduzir(dados, "en")

            const frase = document.createElement("p")
            frase.textContent = conselhoPortugues
            frase.className = "conselhoTema"

            const ImgText = document.createElement("div")
            ImgText.className = "container-img-text"

            ImgText.append(img, frase)
            container.appendChild(ImgText)

            alterarNumeroConselhosBuscados()
        }
    })

    const conteudo = document.getElementById("conteudo")
    conteudo.innerHTML = ""

    container.append(topico, titulo, texto, sombra, div)
    sombra.appendChild(div)
    div.append(digitar, botao)
    conteudo.appendChild(container)
})

//Funcoes de gerar img e conselho
async function getImgTema(tema) {
    const key = "OC2gJMRyHyitlh7apfNfnCwZeoQ_WErVs6asYJsFH4w"
    const url = await fetch(`https://api.unsplash.com/search/photos?query=${tema}&client_id=${key}`)
    const data = await url.json()

    if (!data.results || data.results.length === 0) {
        return "https://picsum.photos/300/300"
    } else {
        return data.results[0].urls.regular
    }
}

async function getDadosConselhosTema(tema) {
    const url = `https://api.adviceslip.com/advice/search/${tema}`
    const response = await fetch(url)
    const dados = await response.json()

    if (!dados.slips) {
        return dados.message.text
    } else {
        return dados.slips[0].advice
    }
}

//Funcao de traducao
async function traduzir(texto, idioma) {
    const destino = idioma === "pt" ? "en" : "pt"

    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${idioma}|${destino}`
        )

        const data = await response.json()

        return data.responseData.translatedText

    } catch {
        return texto
    }
}