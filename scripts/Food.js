/**********************************************************************************
// Arquivo: Food.js
//
// Criação:     21 Abr 2023
// Atualização: 23 Abr 2023
//
// Descrição:   Define e exporta a classe Food. 
//
//              Classe para representar a comida da "cobrinha"
//
**********************************************************************************/

import Config from "./Config.js"
import Sprite from "./Sprite.js"
import Object from "./Object.js"

class Food extends Object {

    // Atributos privados
    #food       // Sprite da comida

    // Métodos públicos
    // Construtor da classe Food
    constructor(color) {
        super()
        this.#food = new Sprite(Config.pixel, Config.pixel, color)
        this.type = "FOOD"
    }

    // Método responsável por desenhar a sprite da comida na tela 
    draw() {
        this.#food.draw(this.#getcoordinates(), this.#getcoordinates())
    }

    // Método de atualização da comida
    update() {
        // ...
    }

    // Método responsável pela resolução da colisão da "cobrinha"
    onCollision(obj) {
        if (obj.type == "PLAYER") {
            this.MoveTo(this.#getcoordinates(), this.#getcoordinates())
        }
    }

    // Métodos privados
    // Gera as coordenadas da comida
    #getcoordinates() {
        let coordinates = []

        for (let i = 0; i <= Config.amountOfCanvasPixels; i++)
            coordinates[i] = Config.pixel / 2 + (i - 1) * Config.pixel

        coordinates.shift()
        const coord = coordinates[Math.floor(Math.random() * coordinates.length)]

        return coord
    }
}

export default Food