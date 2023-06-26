let firstNum;
let operator;
let secondNum;
let equalPressed = false;
const buttons = document.querySelectorAll('button');
const currentText = document.querySelector(".current-text");
const prevText = document.querySelector(".prev-text");
const decimal = document.querySelector('.decimal');
const digit = document.querySelectorAll('.digit');

buttons.forEach(button => button.addEventListener('click', useCalc));

function useCalc(e) {
    btn = this.textContent;
    switch (btn) {
        case 'Clear':
            clearDisplay();
            break;

        case 'Del':
            deleteInput();
            break;
    }
    //if divided by 0, must clear.
    if (currentText.textContent === 'Very funny. Press Clear.') return;
    //if button is number, decimal, or operator, compute display
    if (btn !== 'Clear' && btn !== 'Del') {
        appendDisplay(btn);
    }
    
    
}

//deletes the most recent value added
function deleteInput() {    
    currentText.textContent = currentText.textContent.slice(0, currentText.textContent.length -1);
    checkRules();
}

// Clears display and resets all values
function clearDisplay() {
    firstNum = '';
    operator = '';
    secondNum = '';
    currentText.textContent = '';
    prevText.textContent = '';
    equalPressed = false;
    checkRules();
}

// compute what to do on display
function appendDisplay(btn) {
    //if number or decimal, add to display
    if (!isNaN(Number(btn)) || btn === '.') {
        currentText.textContent += btn;
        checkRules();
    } else if (btn === "=") {
        //if equals is pressed, allows pressing equals again to run same equation using new number. if screen blank, do nothing.
        if (!operator || !currentText.textContent) return; 
        if (equalPressed === true) {
            prevText.textContent = currentText.textContent + ' ' + operator + ' ' + secondNum;
            firstNum = Number(currentText.textContent);
            currentText.textContent = Number(operate(operator, firstNum,secondNum).toFixed(3));
        } else {
            secondNum = Number(currentText.textContent);
            prevText.textContent += ' ' + currentText.textContent;
            currentText.textContent = Number(operate(operator, firstNum,secondNum).toFixed(3));
            equalPressed = true;
        }
        //if operator pressed, allow math off of an equaled number, or if operator already present, allow math off previously entered numbers. 
    } else {
        if (currentText.textContent) {
            if (equalPressed) {
                firstNum = Number(currentText.textContent);
                prevText.textContent = firstNum + ' ' + btn;
            } else if (operator) {
                secondNum = Number(currentText.textContent);
                firstNum = Number(operate(operator, firstNum, secondNum));
                prevText.textContent = firstNum + ' ' + btn;
            } else {
                prevText.textContent = currentText.textContent + ' ' + btn;
                firstNum = Number(currentText.textContent);
            }
            currentText.textContent = '';
            operator = btn;
            equalPressed = false;
            checkRules();
        } else {
            prevText.textContent = firstNum + ' ' + btn;
            operator = btn;
            checkRules();
        }
    }
}

// disables decimal if one is already added, disables input if too long.
function checkRules() {
    decAdded = Number(currentText.textContent.includes('.'));
    decAdded ? decimal.disabled = true : decimal.disabled = false;

    currentText.textContent.length > 14 ? digit.forEach(digit => digit.disabled = true) : digit.forEach(digit => digit.disabled = false);
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return firstNum + secondNum;
            
        case "-":
            return firstNum - secondNum;

         case "x":
            return firstNum * secondNum;

          case "/":
            if (secondNum === 0) {
                currentText.textContent = 'Very funny. Press Clear.';
                return; 
            }
            return firstNum / secondNum;
    }
}