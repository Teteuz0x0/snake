/**********************************************************************************
// Arquivo: Game.js
//
// Criação:     26 Abr 2023
// Atualização: *
//
// Descrição:   Define e exporta a classe Game. 
//
//              Classe que representa o jogo em si.
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
    #gameOver                   // Som de game over
    #gameOverAudioPlayed        // guara o estado do áudio de gme over

    // Métodos públicos
    // inicializa o jogo
    init() {
        // Instância um objeto da classe Snake
        this.#snake = new Snake(renderer.getCanvasWidth() / 2 - Config.pixel / 2, renderer.getCanvasHeight() / 2 - Config.pixel / 2, "green")
        // Instância um objeto da classe Food
        this.#food = new Food("red", this.#snake)

        // Instância um objeto da classe Scene
        this.#scene = new Scene()
        // Adiciona objetos a cena
        this.#scene.add(this.#food)
        this.#scene.add(this.#snake)

        // Instância um objeto da classe InputListener
        this.#inputListener = new InputListener()
        // Inscreve o player como observer
        this.#inputListener.subscribe(this.#snake)
        // Increve o jogo como observer
        this.#inputListener.subscribe(this)

        // Carrega o som de game over
        this.#gameOver = new Audio("..\\resources\\game-over.mp3")
        // Seta o estao do áudio game over para não tocado
        this.#gameOverAudioPlayed = false
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

        // Tocar som de game over, cajo o player tenha perdido
        if (this.gameOver() && !this.#gameOverAudioPlayed) {
            this.#gameOver.play()
            this.#gameOverAudioPlayed = true
        }
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
        // Caso presionar Enter em estado de game over
        if (keyPressed == "Enter" && this.gameOver()) {
            // Reinicie o jogo
            this.#scene.remove(this.#snake)
            this.#inputListener.unsubscribe(this.#snake)
            this.#snake = new Snake(renderer.getCanvasWidth() / 2 - Config.pixel / 2, renderer.getCanvasHeight() / 2 - Config.pixel / 2, "green")
            this.#scene.add(this.#snake)
            this.#inputListener.subscribe(this.#snake)
            this.#food.generateCoordinates()
            this.#gameOverAudioPlayed = false
        }
    }

}

export default Game