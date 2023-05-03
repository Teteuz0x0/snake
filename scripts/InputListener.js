/**********************************************************************************
// Arquivo: InputListener.js
//
// Criação:     25 Abr 2023
// Atualização: *
//
// Descrição:   Define e exporta a classe InputListener.
//
//              Classe que captura os inputs, e para tal tarefa  utiliza do desing
//              pattern Observer, segue o link para mais infirmações do mesmo: 
//              https://refactoring.guru/pt-br/design-patterns/observer
//              
**********************************************************************************/

class InputListener {

    // Atributos públicos
    #observers      // Array de observers

    // Construtor da classe InputListener
    constructor() {
        this.#observers = []
        document.addEventListener("keydown", this.notifyAll.bind(this))
    }

    // Inscreve um observer
    subscribe(observer) {
        this.#observers.push(observer)
    }

    // Cancela inscrisão de um observer
    unsubscribe(observer) {
        this.#observers = this.#observers.filter(value => value != observer)
    }

    // Notifica todos os observers do evento
    notifyAll(event) {
        this.#observers.forEach(observer => {
            const keyPressed = event.code
            observer.inputListener(keyPressed)
        })
    }
}

export default InputListener