export class Quote {
    constructor(text) {
        this.text = text;
        this.guessed = [];
    }

    getContent(){
        let content = '';
        for(const letter of this.text){
            
            if(letter  == ' ' || this.guessed.includes(letter.toLowerCase())){
                content += letter;
            }   else {
                content += '_'
            }
        }
        return content;
    }

    guess(letter){
        this.guessed.push(letter);
        let lowerText = this.text.toLowerCase();
        if(lowerText.includes(letter.toLowerCase())){
            return true;
        } else {
            return false;
        }
        
    }
}