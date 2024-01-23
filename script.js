const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false; //2. değer için bekleniyormu
updateDisplay();

function updateDisplay() {

    display.value = displayValue;
}
keys.addEventListener('click', function (e) {

            const element = e.target;

            const value = element.value
            if (!element.matches('button')) return;
            switch (value) {

                case '+':
                case '-':
                case '*':
                case '/':
                case '=':
                    handleOperator(value);
                    break;
                case '.':
                    inputDecimal();
                    break;
                case 'clear':
                    clear();
                    break;
                default:
                    inputNumber(element.value)


                    // if(element.classList.contains('operator')){
                    //     // console.log('operator',element.value);
                    //   handleOperator(element.value);
                    //   updateDisplay();
                    //   return;

                    // }

                    // if(element.classList.contains('decimal')){
                    //     // console.log('decimal',element.value);
                    //     inputDecimal();
                    //     updateDisplay();

                    //     return;

                    // }

                    // if(element.classList.contains('clear')){
                    //     // console.log('clear',element.value);
                    //     clear();
                    //     updateDisplay(); //bu bilgi input uzerine yansısın
                    //     return;

                    // }

                    // inputNumber(element.value);
                    // updateDisplay();
                } 
                updateDisplay();
                    });
           

            function handleOperator(nextOperator) {
                const value = parseFloat(displayValue);
                if (operator && waitingForSecondValue) {
                    operator = nextOperator;
                    return;
                }
                if (firstValue === null) { // firstvalue degeri boşsa yedege alınacak

                    firstValue = value;
                } else if (operator) {
                    const result = calculate(firstValue, value, operator); //toplama degeri içine gıdenler

                    displayValue = `${parseFloat(result.toFixed(7))}`; // basamagı sınırlandırıyoruz.
                    firstValue = result;
                }

                waitingForSecondValue = true; //2.degerı gırebılmek ıcın bekliyoruz
                operator = nextOperator

                console.log(displayValue, firstValue, operator, waitingForSecondValue);

                // console.log( 'number',element.value)   
            }

            function calculate(first, second, operator) {
                if (operator === '+') {
                    return first + second;
                } else if (operator === '-') {
                    return first - second;
                } else if (operator === '*') {
                    return first * second
                } else if (operator === '/') {
                    return first / second;
                }
                return second;
            }


            function inputNumber(num) {
                if (waitingForSecondValue) {
                    displayValue = num;
                    waitingForSecondValue = false;
                } else {

                    displayValue = displayValue === '0' ? num : displayValue + num;
                }
                console.log(displayValue, firstValue, operator, waitingForSecondValue);

            }

            function inputDecimal() {
                if (!displayValue.includes('.')) {

                    displayValue += '.';

                }

            }

            function clear() {

                displayValue = '0'

            }