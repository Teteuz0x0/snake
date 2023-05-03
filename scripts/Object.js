/**********************************************************************************
// Arquivo: Object.js
//
// Criação:     03 Mai 2023
// Atualização: *
//
// Descrição:   Essa é a classe base para todos objetos do jogo.
//
//              Um objeto do jogo é qualquer coisa que possámos querer desenhar
//              ou interagir dentro do jogo. Por exemplo, a "cobrinha" ou a comida.
//
//              OBS: A classe Object era para ser um classe abstract, com alguns 
//              métodos abstract, ou seja, uma classe que não pode ser instanciada, 
//              mas como o Javascript não tem um suporte nativo a esse tipo de classe,
//              tive que fazer um implementação um tanto quanto alternativa, utilizando
//              do recurso throw, que gerará um erro caso seja acessado um desses métodos 
//              abstract
//
**********************************************************************************/

class Object {

    // Atributos públicos
    type            // Tipo do objeto

    // Atributos privados
    #x              // Coordendada x
    #y              // Coordenada y

    // Métodos públicos 
    // Métodos não abstratos - com uma implementação padrão
    // Construtor da classe Object
    constructor() {
        if (this.constructor == Object) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    // move o objeto por (deltaX, deltaY)
    Translate(dx, dy) {
        this.#x += dx
        this.#y += dy
    }

    // move o objeto para as coordenadas (x, y) indicadas
    MoveTo(x, y) {
        this.#x = x
        this.#y = y
    }

    // Métodos getters
    // Retorna a coordenada x do objeto
    getX() { return this.#x }

    // Retorna a coordenada y do objeto
    getY() { return this.#y }

    // Métodos abtratos - devem ser implementados nas classes filhas
    // Método de atualização
    update() {
        throw new Error(`Abstract method "update" not defined in class child ${this.constructor.name}`);
    }

    // Método de desenho
    draw() {
        throw new Error(`Abstract method "draw" not defined in class child ${this.constructor.name}`);
    }

    // Método de resolução de colisão
    onCollision(obj) {
        throw new Error(`Abstract method "onCollision(obj" not defined in class child ${this.constructor.name}`);
    }
}

export default Object