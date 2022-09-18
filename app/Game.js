class Game {
    constructor({lettersWrapper, categoryWrapper, wordWrapper, outputWrapper}){
        this.lettersWrapper = lettersWrapper
        this.categoryWrapper = categoryWrapper
        this.wordWrapper = wordWrapper
        this.outputWrapper = outputWrapper
        this.polishLetters = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"];
    }

    guess(letter){
        console.log(letter);
    }

    generateButtons(){
        this.polishLetters.forEach(letter => {
            const button = document.createElement('button');
            button.innerText = letter;
            button.classList.add('bg-black', 'text-white', 'px-8', 'py-1');
            button.addEventListener('click', () => this.guess(letter))
            this.lettersWrapper.appendChild(button);
        });
    }

    start(){
        this.generateButtons();
    }
}

const game = new Game({
    lettersWrapper: document.querySelector('#letters'),
    categoryWrapper: document.querySelector('#category'),
    wordWrapper: document.querySelector('#word'),
    outputWrapper: document.querySelector('#output')
});

game.start();