/**********************************************************************************
// Arquivo: Snake.js
//
// Criação:     22 Abr 2023
// Atualização: 24 Abr 2023
//
// Descrição:   Define e exporta a classe Snake. 
//
//              Classe para representar o jogador.
//
**********************************************************************************/

import Config from "./Config.js"
import Sprite from "./Sprite.js"
import renderer from "./Renderer.js"
import Object from "./Object.js"

class Snake extends Object {

    // Atributos privados
    #sprite                      // Sprite da "cobrinha"
    #coordinates                 // Array de coordenadas
    #direction                   // Direção da "cobrinha"
    #collisionWithFood           // Guarda o estado de colisão com a comida
    #score                       // Pontuação do jogador
    #gameOver                    // Guarda o estado de perda de jogo

    // Métodos públicos
    // Construtor da classe Snake
    constructor(x, y, color) {
        super()
        this.#score = 0
        this.#gameOver = false
        this.#sprite = new Sprite(Config.pixel, Config.pixel, color)
        this.#collisionWithFood = false
        this.#coordinates = []
        this.#coordinates.unshift({ x, y })
        this.MoveTo(x, y)
        this.type = "PLAYER"
    }

    // Método responsável por desenhar a sprite da "cobrinha" na tela 
    draw() {
        this.#coordinates.forEach(coordinate => {
            this.#sprite.draw(coordinate.x, coordinate.y)
        })
    }

    // Método de atualização da "cobrinha"
    update() {

        // Verifica se o jogador perdeu, o jogador pode perder em dois casos
        // Caso 1 : Sair da janela
        if (this.getX() >= renderer.getCanvasWidth() || this.getX() <= 0 || this.getY() >= renderer.getCanvasHeight() || this.getY() <= 0)
            this.#gameOver = true

        // Caso 2: Colidir com uma parte de si mesmo
        for (let i = 1; i < this.#coordinates.length; i++) {
            if (this.getX() == this.#coordinates[i].x && this.getY() == this.#coordinates[i].y)
                this.#gameOver = true
        }

        // Se o jogador não tiver perdido
        if (!this.#gameOver) {

            // Movimentação
            if (this.#direction == "right") this.Translate(Config.pixel, 0)
            if (this.#direction == "left") this.Translate(-Config.pixel, 0)
            if (this.#direction == "up") this.Translate(0, -Config.pixel)
            if (this.#direction == "down") this.Translate(0, Config.pixel)

            // Se não ouver colisão com a comida será removido o último elemento do array #coordinates
            if (!this.#collisionWithFood)
                this.#coordinates.pop()

            // Adiciona nova coordenada ao ínicio do array #coordinates
            this.#coordinates.unshift({ x: this.getX(), y: this.getY() })

            // Seta a colisão com a comida para falso
            this.#collisionWithFood = false
        }
    }

    // Método responsável pela resolução da colisão da "cobrinha"
    onCollision(obj) {
        if (obj.type == "FOOD") {
            // Seta a colisão com a comida para verdadeiro
            this.#collisionWithFood = true
            // Incrementa a pontuação
            this.#score++
        }
    }

    // Escuta o input do player
    inputListener(keyPressed) {
        switch (keyPressed) {
            case "ArrowUp":
                if (this.#direction != "down")
                    this.#direction = "up"
                break
            case "ArrowDown":
                if (this.#direction != "up")
                    this.#direction = "down"
                break
            case "ArrowLeft":
                if (this.#direction != "right")
                    this.#direction = "left"
                break
            case "ArrowRight":
                if (this.#direction != "left")
                    this.#direction = "right"
                break
        }
    }

    // Métodos getters
    getScore() { return this.#score }
    getGameOver() { return this.#gameOver }
    getcoordinates() { return this.#coordinates }
}

export default Snake