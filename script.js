var numA = '',
    numB = '',
    opp = '';
    result = ''
const userInput = document.querySelector('.user-input');
const resultDisplay = document.querySelector('.result');

const Buttons = document.querySelectorAll('.button');
Buttons.forEach(button => {
    button.addEventListener('click', ()=>{
        const fullClassName = button.className;
        const className = fullClassName.split(' ')[1];
        switch(className){
            case 'number':
                if(opp === ''){
                    numA = numA+button.textContent;
                }else{
                    numB = numB+button.textContent;
                }
                break;
            case 'opperator':
                if(numA !== '' && numB === ''){
                    opp = button.textContent;
                    if(opp === '%'){numA = operate(numA, opp, numB);
                        numB = '';
                        opp = '';
                    }
                }else if(numB !== ''){
                    result = operate(numA, opp, numB);
                    numA = result;
                    numB = '';
                    opp = button.textContent;
                }
                break;
            case 'allClear':
                result = '';
                numA = '';
                numB = '';
                opp = '';
                break;
            case 'clear':
                if(numB !== ''){
                    numB = numB.substring(0, numB.length - 1);
                }else{
                    if(opp !== ''){
                        opp = '';
                    }else{
                        numA = numA.substring(0,numA.length - 1);
                    }
                }
                break;
            case 'decimal':
                if(opp === ''){
                    if(numA.includes('.')){break}
                    numA = numA+button.textContent;
                }else{
                    if(numB.includes('.')){break}
                    numB = numB+button.textContent;
                }
                break;
            case 'equalTo':
                result = operate(numA, opp, numB);
                numA = result;
                numB = '';
                opp = '';
                break;
            default:
                break;
        } 

        displayUpdate(numA, opp, numB, result);

    })
})

const add = (a, b) => (a+b);
const subtract = (a, b) => (a-b);
const multiply = (a, b) => (a*b);
const divide = (a, b) => (a/b);
const percentile = (a) => (a/100)

function operate(a, opp, b) {
    var result = '';
    a = parseFloat(a);
    b = parseFloat(b);
    switch (opp) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
        case '%':
            result = percentile(a);
        default:
            break;
    }
    return result.toString();
}

function displayUpdate(a, opp, b, result){
    userInput.textContent = `${a} ${opp} ${b}`
    resultDisplay.textContent = `${result}`

}

addEventListener('keydown', (key) => {

    const buttonIds = [ '+', '-', '/', '*', '%', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace', '.'];

    if(buttonIds.includes(key.key)){
        document.getElementById(key.key).click();
    }else if (key.key === '=' || key.key === 'Enter') {
		document.getElementById('equals').click();	
    }
})