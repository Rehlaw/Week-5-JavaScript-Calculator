//REFERENCE DISPLAY ELEMENT
const display = document.getElementById('display');

//TRACK IF WE HAVE PERFOMED A CALCULATION
let justCalculated = false;

function appendToDisplay(value) {
    console.log('Button pressed: ', value);

    let currentValue = display.value;

    if (justCalculated && !isNaN(value)) {
        display.value = value;
        justCalculated = false;
        return;
    }

    //IF CURRENT DISPLAY SHOWS 0 AND USER ENTERS A NUMBER, WE WANT TO REPLACE THE 0
    if (currentValue === "0" && !isNaN(value)) {
        display.value = value;
    } else if (currentValue === '0' && value == '.') {
        display.value = currentValue + value;
    } else if (value === '.') {
        //GET THE LAST NUMBER IN THE DISPLAY 
        let lastNumber = currentValue.split('/[+\-*/]').pop();
        //ONLY AT THE DECIMAL IF THE CURRENT NUMBER DOESNT HAVE ONT
        if (!lastNumber.includes('.')) {
            display.value = currentValue + value
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
    if (currentValue.length <= 1 || currentValue == '0') {
        display.value = '0';
    } else {
        display.value = currentValue.slice(0, -1);
    }
}

function calculate() {
    console.log('Equals button pressed.');

    alert('Equals button was clicked');
}

document.addEventListener('keydown', function(event) {
    console.log('key pressed', event.key);

    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.')
    } else if (event.key === '+') {
        appendToDisplay('+')
    } else if (event.key === '-') {
        appendToDisplay('-')
    } else if (event.key === '*') {
        appendToDisplay('*')
    } else if (event.key === '/') {
        event.preventDefault();
        appendToDisplay('/')
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
