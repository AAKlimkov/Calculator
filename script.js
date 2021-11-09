class Calculator {

  constructor(previousOperandTextElement= '', currentOperandTextElement = '') {
    this.state = 0
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.currentOperand = ""
    this.previusOperand = ""
    this.operation = undefined
  }

  clear() {
    this.currentOperand = ""
    this.previusOperand = ""
    this.operation = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1)
  }

  appendNumber(number) {


    if (this.state ==1) {
      this.currentOperand = ''
      this.state = 0
    }
    if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand ? this.currentOperand.toString() + number.toString() : number.toString();


  }
  chooseOperation(operation) {
    if (this.currentOperand == '') return;
    if (this.currentOperand != '' && this.previusOperand != '') {
      this.compute()
    }
    this.operation = operation;
    this.previusOperand = this.currentOperand;
    this.currentOperand = '';
  }

  sqrt() {
    let computation
    const curr = parseFloat(this.currentOperand)

    if (isNaN(curr)) return
    computation = curr > 0 ? Math.sqrt(curr) : "error"
    this.currentOperand = computation
    this.state = 1
  }

  negative(){
    let computation
    const curr = parseFloat(this.currentOperand)
    if (isNaN(curr)) return
      computation = curr*(-1)
    this.currentOperand = computation ? computation: ""
    this.previusOperand = this.previusOperand ? this.previusOperand: ''
  }
  compute() {
let computation
const prev = parseFloat(this.previusOperand)
const curr = parseFloat(this.currentOperand)
if (isNaN(prev) || isNaN(curr)) return

    switch (this.operation) {
      case '+':
        computation = prev + curr
        break;
      case '-':
        computation = prev - curr
        break;
      case '*':
        computation = prev * curr
        break;
      case '÷':
        computation = prev / curr
        break;
        case '^':
        computation = Math.pow(prev, curr)
        break;
      default:
        break;
    }
    this.state = 1
    this.currentOperand =  (+(computation*1000).toFixed(6))/1000;
    this.operation = undefined
    this.previusOperand = ''

  }
  updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previusOperand ? `${this.previusOperand} ${this.operation}` : ''


}
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const powButton = document.querySelector("[data-pow]");
const sqrtButton = document.querySelector("[data-sqrt]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const negativeButton = document.querySelector("[data-negative]");

const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
sqrtButton.addEventListener('click', button => {
  calculator.sqrt();
  calculator.updateDisplay();
})
negativeButton.addEventListener('click', button => {
  calculator.negative();
  calculator.updateDisplay();
})





