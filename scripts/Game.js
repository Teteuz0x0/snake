/**********************************************************************************
// Arquivo: Game.js
//
// Criação:     26 Abr 2023
// Atualização: *
//
// Descrição:   Define e exporta a classe Game, Classe que representa
//              o jogo em si
//
**********************************************************************************/

import Snake from "./Snake.js"
import Food from "./Food.js"
import Config from "./Config.js"
import renderer from "./Renderer.js"
import Scene from "./Scene.js"
import InputListener from "./InputListener.js"

class Game {

    // Atributos privados
    #snake                      // Player
    #food                       // Comida
    #scene                      // Gerenciador de cena
    #inputListener              // Ecuta os input do player

    // Métodos públicos
    // inicializa o jogo
    init() {
        // Instância um objeto da classe Food
        this.#food = new Food("red")
        // Instância um objeto da classe Snake
        this.#snake = new Snake(renderer.getCanvasWidth() / 2 - Config.pixel / 2, renderer.getCanvasHeight() / 2 - Config.pixel / 2, "green")

        // Instância um objeto da classe Scene
        this.#scene = new Scene()
        // Adiciona objetos a cena
        this.#scene.add("FOOD", this.#food)
        this.#scene.add("PLAYER", this.#snake)

        // Instância um objeto da classe InputListener
        this.#inputListener = new InputListener()
        // Inscreve o player como observer
        this.#inputListener.subscribe(this.#snake)
        // Increve o jogo como observer
        this.#inputListener.subscribe(this)
    }

    // Desenha o jogo
    draw() {
        renderer.clear()
        this.#scene.draw()

        // Score
        let score = `Score: ${this.#snake.getScore()}`
        let x = score.length * 4
        renderer.write(score, x, 10)

        // Game Over
        if (this.gameOver()) {
            renderer.write("Game Over", renderer.getCanvasWidth() / 2, renderer.getCanvasHeight() / 2, "2.5em", "red", "bold", "algerian")
            renderer.write("Presione [ENTER] para jogar novamente", renderer.getCanvasWidth() / 2, renderer.getCanvasHeight() / 2 + 21, "0.9em", "red", "bold", "algerian")
        }
    }

    // Atualiza o jogo
    update() {
        this.#scene.update()
    }

    // Resolve as colisões do jogo
    hasCollision() {
        this.#scene.hasCollision()
    }

    // Retorna se o jogador perdeu
    gameOver() {
        return this.#snake.getGameOver()
    }

    // Escuta o input do player
    inputListener(keyPressed) {
        // Caso presionar Enter
        if (keyPressed == "Enter") {
            // Reinicie o jogo
            this.#scene.remove(this.#snake)
            this.#inputListener.unsubscribe(this.#snake)
            this.#snake = new Snake(renderer.getCanvasWidth() / 2 - Config.pixel / 2, renderer.getCanvasHeight() / 2 - Config.pixel / 2, "green")
            this.#scene.add("PLAYER", this.#snake)
            this.#inputListener.subscribe(this.#snake)
        }
    }

}

export default Game