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
    #x       // Coordendada x
    #y       // Coordenada y
    #width   // Largura
    #height  // Altura
    #color   // Cor

    // Métodos públicos
    // Construtor da classe Sprite
    constructor(x, y, width, height, color) {
        this.MoveTo(x, y)
        this.#width = width
        this.#height = height
        this.#color = color
    }

    // Método responsável por desenhar as sprites
    draw() {

        const data = {
            x: this.#x,
            y: this.#y,
            width: this.#width,
            height: this.#height,
            color: this.#color
        }

        renderer.draw(data)
    }

    // Seta as coordenadas x e y da sprite
    MoveTo(x, y) {
        this.#x = x
        this.#y = y
    }

    // Move a sprite
    Move(dx, dy) {
        this.#x += dx
        this.#y += dy
    }

    // Métodos getters
    getX() { return this.#x }
    getY() { return this.#y }
}

export default Sprite