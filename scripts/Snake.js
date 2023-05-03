/**********************************************************************************
// Arquivo: Snake.js
//
// Criação:     22 Abr 2023
// Atualização: 24 Abr 2023
//
// Descrição:   Define e exporta a classe Snake. 
//
//               Classe para representar o jogador.
//
**********************************************************************************/

import Config from "./Config.js"
import Sprite from "./Sprite.js"
import renderer from "./Renderer.js"

class Snake {

    // Atributos privados
    #snake                       // Corpo da "cobrinha"
    #color                       // Cor da "cobrinha"
    #direction                   // Direção da "cobrinha"
    #snakeX                      // Coordenada x da cabeça da "cobrinha"
    #snakeY                      // Coordenada y da cabeça da "cobrinha"
    #collisionWithFood           // Guarda o estado de colisão com a comida
    #score                       // Pontuação do jogador
    #gameOver                    // Guarda o estado de perda de jogo

    // Métodos públicos
    // Construtor da classe Snake
    constructor(x, y, color) {
        this.#snake = []
        this.#color = color
        this.#score = 0
        this.#gameOver = false
        this.#snake[0] = new Sprite(x, y, Config.pixel, Config.pixel, color)
        this.#collisionWithFood = false
    }

    // Método responsável por desenhar a sprite da "cobrinha" na tela 
    draw() {
        this.#snake.forEach(sprite => {
            sprite.draw()
        })
    }

    // Método de atualização da "cobrinha"
    update() {

        // Verifica se o jogador perdeu, o jogador pode perder em dois casos
        // Caso 1 : Sair da janela
        if (this.getX() >= renderer.getCanvasWidth() || this.getX() <= 0 || this.getY() >= renderer.getCanvasHeight() || this.getY() <= 0)
            this.#gameOver = true

        // Caso 2: Colidir com uma parte de si mesmo
        for (let i = 1; i < this.#snake.length; i++) {
            if (this.getX() == this.#snake[i].getX() && this.getY() == this.#snake[i].getY())
                this.#gameOver = true
        }

        // Se o jogador não tiver perdido
        if (!this.#gameOver) {
            // Recuperando os valores da posição 0 dos array de sprites
            this.#snakeX = this.#snake[0].getX()
            this.#snakeY = this.#snake[0].getY()

            // Movimentação
            if (this.#direction == "right") this.#snakeX += Config.pixel
            if (this.#direction == "left") this.#snakeX -= Config.pixel
            if (this.#direction == "up") this.#snakeY -= Config.pixel
            if (this.#direction == "down") this.#snakeY += Config.pixel

            // Se não ouver colisão com a comida será removido o último elemento do array #snake
            if (!this.#collisionWithFood)
                this.#pop()

            // Adiciona nova sprite ao ínicio do array #snake
            this.#unshift()

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
    getX() { return this.#snakeX }
    getY() { return this.#snakeY }
    getScore() { return this.#score }
    getGameOver() { return this.#gameOver }

    // Métodos privados
    // Remove o último elemento do array de sprites
    #pop() {
        this.#snake.pop()
    }

    // Adiciona sprite no ínicio do array
    #unshift() {
        this.#snake.unshift(new Sprite(this.#snakeX, this.#snakeY, Config.pixel, Config.pixel, this.#color))
    }
}

export default Snake