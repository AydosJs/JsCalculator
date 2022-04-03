
class Calculator {
    constructor(previewOperantText,coorectviewOperantText){
        this.previewOperantText = previewOperantText;
        this.coorectviewOperantText = coorectviewOperantText;
        this.clear();
    }

    clear() {
        this.previewOperant = '';
        this.coorectviewOperant = '';
        this.operation = undefined;
    }

    deleted() {
        this.coorectviewOperant = this.coorectviewOperant.toString().slice(0,-1)
    }

    appendNumber(number) {
        if(number === '.'){
            const text = this.coorectviewOperantText.innerText;
            if(text.includes(".")){
                return;
            }
        }
        this.coorectviewOperant = this.coorectviewOperant.toString() + number.toString();
    }

    shooseOperation(operation) {
        if(this.coorectviewOperant === '') return;
        if(this.coorectviewOperant != '') {
            this.compyut();
        }
        this.operation = operation;
        this.previewOperant = this.coorectviewOperant;
        this.coorectviewOperant = '';
    }

    compyut(){
        const prev = parseInt(this.previewOperant);
        const coorect = parseInt(this.coorectviewOperant);
        if(isNaN(prev) || isNaN(coorect)) return;

        let computation;
        switch(this.operation) {
            case "+":
                computation = prev + coorect;
            break;
            case "-":
                computation = prev - coorect;
                break;
            case "*":
                computation = prev * coorect;
                break;
            case "÷":
                computation = prev / coorect;
            break;

            default: 
            return;
        }

        this.coorectviewOperant = computation;
        this.previewOperant = '';
        this.operation = undefined;
    }

    getHelperFn(number) {
        let stringNumber = number.toString();
        const intejer = parseInt(stringNumber.split(".")[0]);
        const dijits = stringNumber.split(".")[1];

        let intejerDisplay;
        if(isNaN(intejer)){
            intejerDisplay = ''
        }else {
            intejerDisplay = intejer.toLocaleString("en",{maximumFractionDigits: 0})
        }
        if(dijits != null) {
            return `${intejerDisplay}.${dijits}`
        }else {
            return intejerDisplay
        }

    }

    updateDisplay() {
        this.coorectviewOperantText.innerText = this.getHelperFn(this.coorectviewOperant);
        if(this.operation != null) {
            this.previewOperantText.innerText = 
            `${this.getHelperFn(this.previewOperant)} ${this.operation}`;
        }else {
            this.previewOperantText.innerText = `${this.getHelperFn(this.previewOperant)}`;
        }
    }

}


const allNumberBtn = document.querySelectorAll("[date-number]");
const allOperantBtn = document.querySelectorAll("[data-operation]");
const clearAll = document.querySelector("[data-all-clear]");
const deletedBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equal");

const previewOperantText = document.querySelector("[data-previous-operand]");
const coorectviewOperantText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previewOperantText,coorectviewOperantText);


allNumberBtn.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

allOperantBtn.forEach(button => {
    button.addEventListener("click", () => {
        calculator.shooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalBtn.addEventListener("click", () => {
    calculator.compyut();
    calculator.updateDisplay();
});

clearAll.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deletedBtn.addEventListener("click", () => {
    calculator.deleted();
    calculator.updateDisplay();
});

