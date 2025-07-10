//REFERENCE DISPLAY ELEMENT
const display = document.getElementById('display');

//TRACK IF WE HAVE PERFOMED A CALCULATION
let justCalculated = false;

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function getLastChar() {
    return display.value.slice(-1);
}

function safeEval(expression) {
    try {
        let jsExpression = expression
            .replace(/x/g, '*')
            .replace(/÷/g, '/');

        if (!/^[0-9+\-*/.() ]+$/.test(jsExpression)){
            throw new Error('Invalid characters in expression');
        }

        const result = Function(' "use strict"; return (' + jsExpression + ')')();

        if (!isFinite(result)) {
            throw new Error ('Invalid calculation result');
        }

        return result;
    } catch (error) {
        console.error('Calculation error:', error);
        return 'Error';
    }
}

function appendToDisplay(value) {
    console.log('Button pressed: ', value);

    let currentValue = display.value;

    if (justCalculated && !isNaN(value)) {
        display.value = value;
        justCalculated = false;
        return;
    }

    if (justCalculated && isOperator(value)) {
        display.value = currentValue + value;
        justCalculated = false;
        return;
    }

    //HANDLES OPERATORS
    if (isOperator(value)) {
        //DONT ALLOW OPERATOR AS FIRST CHAR(EXCEPTION FOR MINUS)
        if (currentValue === '0' && value !== '-') {
            return; // DO NOTHING   
        }

        //IF THE LAST CHARACTER IS ALREADY AN OPERATOR, REPLACE IT
        if (isOperator(getLastChar())) {
            display.value = currentValue.slice(0, -1) + value;
        } else {
            display.value = currentValue + value;
        }

    } else if (!isNaN(value)) {
        
        if (currentValue === '0') {
           display.value = value; 
        } else {
           display.value =  currentValue + value;
        }

    } else if (value === '.') {
        
        if (currentValue === '0') {
            display.value = currentValue + value;
        } else {
            //GET THE LAST NUMBER IN THE DISPLAY (AFTER THE OPERATOR)
            let parts = currentValue.split('/[+\-*/');
            let lastNumber = parts[parts.length - 1];

            //ONLY ADD DECIMAL IF NUMBER DOESNT ALREADY HAVE ONE
            if (!lastNumber.includes('.')) {
                display.value = currentValue + value;
            }
        }
    } else {
        display.value = currentValue + value;
    }

    //RESET THE JUSTCALCULATED FLAG WHEN USER STARTS TYPING
    justCalculated = false;

    console.log('Display updated to: ', display.value);
}

function clearDisplay() {
    console.log('Clear button pressed.');

    display.value = '0';
    justCalculated = false;

    display.style.backgroundColor = '#f0f0f0';
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 150);

}

function deleteLast() {
    console.log('Backspace button pressed.');

    let currentValue = display.value;

    //IF THERES ONLY ONE CHARACTER OR ITS 0,RESET TO 0
    if (currentValue.length <= 1 || currentValue === '0') {
        display.value = '0';
    } else {
        display.value = currentValue.slice(0, -1);
    }
}

function calculate() {
    let expression = display.value;

    //DONT CALC IF DISPLAY IS 0 OR EMPTY
    if (expression === '0' || expression === '') {
        return;
    }

    //DONT CALC IF EXPRESSION ENDS WITH OPERATOR
    if (isOperator(getLastChar())) {
        return;
    }

    let result = safeEval(expression);

    if (result === 'Error') {
        display.value = 'Error';
        setTimeout(() => {
            clearDisplay()
        }, 2000);
    } else {
        if (Number.isInteger(result)) {
            display.value = result.toString();
        } else {
            display.value = parseFloat(result.toFixed(10)).toString();
        }

        justCalculated = true;
    }

    display.style.backgroundColor = '#e8f5e8';
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 300);
}

document.addEventListener('keydown', function(event) {
    console.log('Key pressed', event.key);

    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+') {
        appendToDisplay('+');
    } else if (event.key === '-') {
        appendToDisplay('-');
    } else if (event.key === '*') {
        appendToDisplay('*');
    } else if (event.key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    }

     else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
       clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
})

document.addEventListener('DOMContentLoaded', function(){
    console.log('Calculator loaded successfully');
    console.log('Display  element', display);

    if (display) {
        console.log('Current display value: ', display.value);
    } else {
        console.log('Display element not found')
    } 
})
