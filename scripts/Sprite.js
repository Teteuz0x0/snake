/**********************************************************************************
// Arquivo: Renderer.js
//
// Criação:     20 Abr 2023
// Atualização: 21 Abr 2023
//
// Descrição:   Define e exporta a classe Sprite.
//
//              Classe que cria as sprites do jogo.
//
**********************************************************************************/

import renderer from "./Renderer.js";

class Sprite {

    // Atributos privados
    #width   // Largura
    #height  // Altura
    #color   // Cor

    // Métodos públicos
    // Construtor da classe Sprite
    constructor(width, height, color) {
        this.#width = width
        this.#height = height
        this.#color = color
    }

    // Método responsável por desenhar as sprites
    draw(x, y) {

        const data = {
            x: x,
            y: y,
            width: this.#width,
            height: this.#height,
            color: this.#color
        }

        renderer.draw(data)
    }
}

export default Sprite