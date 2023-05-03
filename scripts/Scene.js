/**********************************************************************************
// Arquivo: Scene.js
//
// Criação:     20 Abr 2023
// Atualização: 22 Abr 2023
//
// Descrição:   Define a classe Scene e a exporta.
//
//              A classe Scene, e uma gerenciadora de cena, ela adiciona objetos
//              e chama automaticamnete seus métodos update, draw e onCollision 
//              (quando há colisão).              
//
**********************************************************************************/

class Scene {

    // Atributos privados
    #objects    // Array que guarda os objetos da cena
    #collisions // Armazena as colisões que acontecerem

    // Métodos públicos
    // Construtor da classe Scene
    constructor() {
        this.#objects = []
        this.#collisions = []
    }

    // Insere novo objeto no array
    add(type, obj) {
        // Acidciona o tipo do do objeto
        obj.type = type
        // Adiciona o obejeto a cena
        this.#objects.push(obj)
    }

    // Remove objeto no array
    remove(obj) {
        this.#objects = this.#objects.filter(value => value != obj)
    }

    // Atualiza todos os objetos do array
    update() {
        this.#objects.forEach(obj => {
            obj.update()
        })
    }

    // Desenha todos os objetos do array
    draw() {
        this.#objects.forEach(obj => {
            obj.draw()
        })
    }

    // Verifica se há colisão 
    hasCollision() {

        this.#collisions = []

        // testa colisão entre todos os objetos
        for (let i = 0; i < this.#objects.length; i++) {
            // j inicia no segundo elemento do array
            for (let j = i + 1; j < this.#objects.length; ++j) {
                if (this.#collision(this.#objects[i], this.#objects[j]))
                    this.#collisions.push({ a: this.#objects[i], b: this.#objects[j] })
            }
        }

        if (this.#collisions.length > 0) {
            for (const { a, b } of this.#collisions) {
                a.onCollision(b)
                b.onCollision(a)
            }
        }
    }

    // Métodos privados
    // Retorna se há colisão
    #collision(p, q) {
        return p.getX() == q.getX() && p.getY() == q.getY()
    }
}

export default Scene