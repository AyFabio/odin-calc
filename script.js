let firstNum;
let operator;
let lastNum;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNum, lastNum) { 
    switch (operator) {
        case "+":
            return add(firstNum, lastNum);
            
        case "-":
            return subtract(firstNum, lastNum);

         case "x":
            return multiply(firstNum, lastNum);

          case "/":
            return divide(firstNum, lastNum);
    }
}
 function populateDisplay () {
    const buttons = document.querySelectorAll('button');
    const currentText = document.querySelector(".current-text");
    const prevText = document.querySelector(".prev-text");

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.textContent === "x" || btn.textContent === "/" || btn.textContent === "+" || btn.textContent === "-") {
                if (operator) {
                    lastNum = +currentText.textContent;
                currentText.textContent = Number(operate(operator, firstNum, lastNum).toFixed(3));
                }
                prevText.textContent = Number(Number(currentText.textContent).toFixed(3)) + ' ' + btn.textContent;
                firstNum = +currentText.textContent;
                operator = btn.textContent;
                currentText.textContent = '';
            } else if (btn.textContent === '='){
                lastNum = +currentText.textContent;
                prevText.textContent += ' ' + currentText.textContent + " =";
                currentText.textContent = Number(operate(operator, firstNum, lastNum).toFixed(3));
                operator = undefined;
            } else if (btn.textContent === 'Clear') {
                currentText.textContent = '';
                prevText.textContent = '';
                firstNum = undefined;
                lastNum = undefined;
                operator = undefined; 
            } else if (btn.textContent === 'Del') {
                currentText.textContent = currentText.textContent.slice(0, currentText.textContent.length -1);
            } else {
            currentText.textContent += +btn.textContent;
            }
        });
    });
 }

 populateDisplay ()
