/**********************************************************************************
// Arquivo: Renderer.js
//
// Criação:     19 Abr 2023
// Atualização: 29 Abr 2023
//
// Descrição:   Define a classe Renderer e exporta uma instância da mesma. A
//              Classe Renderer, faz a manipulação direta do elemento canvas, 
//              desenhando, apagando e escrevendo
//
**********************************************************************************/

import Config from "./Config.js"

class Renderer {

    // Atributos privadas
    #canvas                                     // Elemento canvas
    #ctx                                        // Contexto do dispositivo gráfico

    // Métodos públicos
    // Construtor da classe Renderer
    constructor() {
        // Inicializa e configura o canvas
        // Obter referência ao elemento canvas
        this.#canvas = document.getElementById('canvas')
        this.#ctx = this.#canvas.getContext('2d')

        // Definir a largura e altura do canvas 
        this.#canvas.width = Config.pixel * Config.amountOfCanvasPixels
        this.#canvas.height = Config.pixel * Config.amountOfCanvasPixels
    }

    // Desenha o quadro
    draw(data) {
        // Desenha as sprites
        this.#ctx.fillStyle = data.color
        this.#ctx.fillRect(data.x - data.width / 2, data.y - data.height / 2, data.width, data.height)
    }

    // Escreve um texto no canvas
    write(text, x, y, size = "1em", color = "black", style = "normal", font = "arial") {

        this.#ctx.textAlign = "center"                      // Centraliza horizontalmente
        this.#ctx.textBaseline = "middle"                   // Centraliza verticalmente
        this.#ctx.font = `${style} ${size} ${font}`         // Seta os estilos 
        this.#ctx.fillStyle = color                         // Seta a cor

        // Escreve o texto
        this.#ctx.fillText(text, x, y)
    }

    // Limpa o canvas
    clear() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    }

    // Métodos getters
    getCanvasWidth() { return this.#canvas.width }
    getCanvasHeight() { return this.#canvas.height }
}

const renderer = new Renderer()

export default renderer