document.addEventListener('DOMContentLoaded', function () {
    let display = document.getElementById('display');
    let buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            let buttonValue = e.target.innerText;

            if (buttonValue === 'C') {
                currentInput = '';
                operator = null;
                firstOperand = null;
                display.innerText = '0';
            } else if (buttonValue === '⌫') {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
            } else if (buttonValue === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.innerText = currentInput;
            } else if (['+', '−', '×', '÷'].includes(buttonValue)) {
                if (operator !== null) {
                    currentInput = operate(firstOperand, currentInput, operator);
                    display.innerText = currentInput;
                }
                firstOperand = currentInput;
                operator = buttonValue;
                currentInput = '';
            } else if (buttonValue === '=') {
                if (operator !== null) {
                    currentInput = operate(firstOperand, currentInput, operator);
                    display.innerText = currentInput;
                    operator = null;
                    firstOperand = null;
                }
            } else {
                currentInput += buttonValue;
                display.innerText = currentInput;
            }
        });
    });

    function operate(a, b, operator) {
        let result;
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '−':
                result = a - b;
                break;
            case '×':
                result = a * b;
                break;
            case '÷':
                result = a / b;
                break;
        }
        return result.toString();
    }
});
