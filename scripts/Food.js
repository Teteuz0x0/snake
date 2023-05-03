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
    #sprite       // Sprite da comida
    #snake        // Jogador

    // Métodos públicos
    // Construtor da classe Food
    constructor(color, snake) {
        super()
        this.#sprite = new Sprite(Config.pixel, Config.pixel, color)
        this.#snake = snake
        this.generateCoordinates()
        this.type = "FOOD"
    }

    // Método responsável por desenhar a sprite da comida na tela 
    draw() {
        this.#sprite.draw(this.getX(), this.getY())
    }

    // Método de atualização da comida
    update() {
        // ...
    }

    // Método responsável pela resolução da colisão da "cobrinha"
    onCollision(obj) {
        if (obj.type == "PLAYER") {
            this.generateCoordinates()
        }
    }

    // Gera as coordenadas da comida
    generateCoordinates() {
        // Recupera as coordenadas da cobra
        const snakeCoordinates = this.#snake.getcoordinates();

        // Declara arrays para armazenar as coordenadas possíveis para a comida
        const potentialCoordinatesX = [];
        const potentialCoordinatesY = [];

        // Loop para calcular as coordenadas possíveis para X e Y
        for (let i = 1; i <= Config.amountOfCanvasPixels; i++) {

            // Calcula a coordenada atual para X e Y
            const coordinate = Config.pixel / 2 + (i - 1) * Config.pixel;

            // Variáveis booleanas para verificar se a coordenada atual é válida para X e Y
            let validX = true;
            let validY = true;

            // Loop para verificar se a coordenada atual sobrepõe a cobra para X e Y
            for (const snakeCoordinate of snakeCoordinates) {

                // Se a coordenada atual for igual a uma coordenada da cobra para X
                if (coordinate === snakeCoordinate.x) {
                    validX = false;
                }

                // Se a coordenada atual for igual a uma coordenada da cobra para Y
                if (coordinate === snakeCoordinate.y) {
                    validY = false;
                }
            }

            // Se a coordenada atual for válida para X, adiciona-a ao array de coordenadas possíveis para X
            if (validX) {
                potentialCoordinatesX.push(coordinate);
            }

            // Se a coordenada atual for válida para Y, adiciona-a ao array de coordenadas possíveis para Y
            if (validY) {
                potentialCoordinatesY.push(coordinate);
            }
        }

        // Seleciona aleatoriamente uma coordenada para X e uma coordenada para Y a partir das coordenadas possíveis
        const randomX = potentialCoordinatesX[Math.floor(Math.random() * potentialCoordinatesX.length)];
        const randomY = potentialCoordinatesY[Math.floor(Math.random() * potentialCoordinatesY.length)];

        // Move a comida para as coordenadas selecionadas
        this.MoveTo(randomX, randomY);
    }

}

export default Food