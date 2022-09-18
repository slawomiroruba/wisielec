import { Quote } from "./Quote.js";

class Game {
    currentStep = 0;
    lastStep = 8;

    quotes = [
        {
            text: 'Pan Tadeusz',
            category: 'Utwór literacki'
        },
        {
            text: 'Janko muzykant',
            category: 'Utwór literacki'
        },
        {
            text: 'Akademia pana Kleksa',
            category: 'Film'
        },
    ]

    constructor({lettersWrapper, categoryWrapper, wordWrapper, outputWrapper}){
        this.lettersWrapper = lettersWrapper
        this.categoryWrapper = categoryWrapper
        this.wordWrapper = wordWrapper
        this.outputWrapper = outputWrapper
        this.polishLetters = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"];
        const {text, category} = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerText = `Kategoria: ${category}`;
        this.quote = new Quote(text);
    }

    guess(letter){
        // event.target.disabled = true;
        this.lettersWrapper.querySelectorAll('button').forEach(button => {
            if(button.innerText == letter){
                button.disabled = true;
            }
        })
        if(this.quote.guess(letter)){
            this.drawQuote();
        } else {
            this.currentStep++;
            document.querySelectorAll('#output div')[this.currentStep].style.opacity = 1;
            if(this.currentStep == this.lastStep - 1){
                this.loosing();
            }
        };
        
    }

    generateButtons(){
        this.polishLetters.forEach((letter) => {
            const button = document.createElement('button');
            button.innerText = letter;
            button.classList.add('bg-black', 'text-white', 'px-2', 'md:px-8', 'md:py-1', 'disabled:opacity-50');
            button.addEventListener('click', (event) => {
                console.log(letter);
                this.guess(letter, event)
            })
            this.lettersWrapper.appendChild(button);
        });
    }

    drawQuote(){
        this.wordWrapper.innerText = this.quote.getContent();
        if(!this.quote.getContent().includes('_')){
            this.winning();
        }
    }

    winning(){
        this.wordWrapper.innerText = 'Gratulacje, wygrywasz! Koniec gry';
        this.categoryWrapper.innerText = '';
        this.lettersWrapper.innerHTML = '';
    }

    loosing(){
        this.wordWrapper.innerText = 'Niestety przegrywasz! Koniec gry';
        this.categoryWrapper.innerText = '';
        this.lettersWrapper.innerHTML = '';
    }

    start(){
        document.querySelectorAll('#output div')[this.currentStep].style.opacity = 1;
        this.generateButtons();
        this.wordWrapper.innerText = this.quote.getContent();
    }
}

const game = new Game({
    lettersWrapper: document.querySelector('#letters'),
    categoryWrapper: document.querySelector('#category'),
    wordWrapper: document.querySelector('#word'),
    outputWrapper: document.querySelector('#output')
});

game.start();

document.addEventListener('keyup', e => {
    game.guess(e.key, null)
})