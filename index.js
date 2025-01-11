let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetScreen = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

// Functions for basic operations
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
    if (b === 0) {
        return "Error: Div by 0";
    }
    return a / b;
}

// Operate function
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}

// Update the display
function updateDisplay(value) {
    if (shouldResetScreen) {
        display.textContent = value;
        shouldResetScreen = false;
    } else {
        if (display.textContent === "0") {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    }
}

// Reset display
function resetDisplay() {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    shouldResetScreen = false;
}

// Clear all
function clearAll() {
    resetDisplay();
}

// Delete last character
function deleteLast() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }
}

// Handle button clicks
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (!action) {
            // Number button clicked
            updateDisplay(value);
        } else if (action === "decimal") {
            if (!display.textContent.includes(".")) {
                display.textContent += ".";
            }
        } else if (action === "clear") {
            clearAll();
        } else if (action === "delete") {
            deleteLast();
        } else if (action === "operator") {
            if (currentOperator && firstNumber) {
                secondNumber = display.textContent;
                const result = operate(currentOperator, firstNumber, secondNumber);
                display.textContent = result;
                firstNumber = result;
                secondNumber = "";
            } else {
                firstNumber = display.textContent;
            }
            currentOperator = button.textContent;
            shouldResetScreen = true;
        } else if (action === "calculate") {
            if (currentOperator && firstNumber) {
                secondNumber = display.textContent;
                const result = operate(currentOperator, firstNumber, secondNumber);
                display.textContent = result;
                firstNumber = result;
                secondNumber = "";
                currentOperator = "";
            }
        }
    });
});
