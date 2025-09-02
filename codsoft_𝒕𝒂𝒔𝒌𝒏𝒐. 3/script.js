let currentInput = '0';
let previousInput = null;
let currentOperator = null;
let waitingForNewInput = false;

const display = document.getElementById('display');
display.value = currentInput;

function inputNumber(num) {
    if (waitingForNewInput) {
        currentInput = num;
        waitingForNewInput = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForNewInput) {
        currentInput = '0.';
        waitingForNewInput = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(operator) {
    if (currentOperator && !waitingForNewInput) {
        calculate();
    }

    previousInput = currentInput;
    currentOperator = operator;
    waitingForNewInput = true;
}

function calculate() {
    if (currentOperator && previousInput !== null) {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        if (currentOperator === '+') {
            result = prev + current;
        } else if (currentOperator === '-') {
            result = prev - current;
        } else if (currentOperator === '*') {
            result = prev * current;
        } else if (currentOperator === '/') {
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                resetCalculator();
                return;
            }
            result = prev / current;
        }

        result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
        currentInput = result.toString();

        currentOperator = null;
        previousInput = null;
        waitingForNewInput = true;
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '0';
    previousInput = null;
    currentOperator = null;
    waitingForNewInput = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1 && currentInput !== 'Error') {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function resetCalculator() {
    setTimeout(() => {
        clearDisplay();
    }, 1500);
}

function updateDisplay() {
    display.value = currentInput;
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+') {
        handleOperator('+');
    } else if (key === '-') {
        handleOperator('-');
    } else if (key === '*') {
        handleOperator('*');
    } else if (key === '/') {
        event.preventDefault();
        handleOperator('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
