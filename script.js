//find screen in DOM and declare it for reference.
const calcScreen = document.querySelector("#screen");
//use regex to prevent user typing values other than numbers and a single decimal into the screen.
calcScreen.oninput = () =>{
    //if an operation has just completed, the next input should clear the old input
    if (operated == true){
        calcScreen.value = null;
        operated = false;
    }
    newInput=true;
    calcScreen.value = calcScreen.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
} 

//find digit buttons in DOM and declare in array for reference.
let digitButtons = document.querySelectorAll("#numpad .numpad-row button");
//iterate through array assigning event listener to buttons calling a function to write them to the screen
digitButtons.forEach((currentValue) => currentValue.addEventListener("click", writeToScreen));

//funciton writes the text value of the button pressed to the screen, with regex preventing more than two decimal points
function writeToScreen(){
    //if an operation has just completed, the next input should clear the old input
    if (operated == true){
        calcScreen.value = null;
        operated = false;
    }
    newInput=true;
    calcScreen.value += this.textContent;
    calcScreen.value = calcScreen.value.replace(/(\..*)\./g, '$1');
}

//basic functions for basic operators, returning operated value
function add(value1, value2){
    return(value1 + value2);
}

function subtract(value1, value2){
    return(value1 - value2);
}

function divide(value1, value2){
    return(value1/value2);
}

function multiply(value1, value2){
    return(value1*value2);
}

//declare variable to hold current operator
//let operator = "";

//find operator buttons in DOM, declare them to variables
//assign event listener to buttons to change currently selected operator
const divideButton = document.querySelector("#divide-operator");
divideButton.addEventListener("click", () => assignOperator("divide"));

const multiplyButton = document.querySelector("#multiply-operator");
multiplyButton.addEventListener("click", () => assignOperator("multiply"));

const minusButton = document.querySelector("#minus-operator");
minusButton.addEventListener("click", () => assignOperator("minus"));

const plusButton = document.querySelector("#plus-operator");
plusButton.addEventListener("click", () => assignOperator("plus"));

//declare variables to hold operator values
let previousOperator = null;
let currentOperator = null;
let operated = false;
let newInput = false;

//declare variables to hold values
let currentValue = null;
let previousValue = null;
let newValue = null;

//function assigns operator values and calls operate function 
function assignOperator(operator, equals){

    //if there is no current operator, there is no second value so operate is not called
    if (currentOperator == null){
        currentValue = Number(calcScreen.value);
        currentOperator = operator;
        operated = true;
    }
    else{
        //only change previous input if input changes, otherwise repeated operations will not use original value
        if (newInput == true){
            previousValue = currentValue;
            newInput= false;
            sameOperation = false
        }
        //if the operator has changed, the operation is not repeating
        else if(operator != currentOperator){
            sameOperation = false;
        }
        //From the second time an operation is run, the value which is operating should remain the same
        else if(equals == true && sameOperation == false){
            previousValue = currentValue;
            sameOperation = true;
        }
        currentValue = Number(calcScreen.value);
        previousOperator = currentOperator;
        currentOperator = operator;
        //because user has pressed two operator buttons, the expected function of the calculator is to operate using the value of the first button pressed
        if(currentOperator == previousOperator && equals !=true){
            operated = true;
            return;
        }
        else if(equals != true) operate(previousOperator);
        else operate(currentOperator);
    }
}

function operate(operator){

    //if someone presses equals after the first operator, previous value won't be assigned. This makes sure it is assigned.
    if(previousValue == null){
        previousValue = currentValue;
        currentValue = Number(calcScreen.value);
    }

    if (operator == "divide"){
        //if we are repeating the operation, it is expected that the new value will be divided by the old one.
        //divide is the only operation where it is necessary to make this distinction
        if(sameOperation == true){
            calcScreen.value = divide(currentValue, previousValue);
        }
        else calcScreen.value = divide(previousValue, currentValue);
    }
    else if (operator == "multiply"){
        calcScreen.value = multiply(previousValue, currentValue);
    }
    else if (operator == "minus"){
        calcScreen.value = subtract(previousValue, currentValue);
    }
    else{
        calcScreen.value = add(previousValue, currentValue);
    }

    /*if (currentOperator == "divide"){
        let scooch = currentValue;
        currentValue = previousValue;
    }*/
    operated = true;

}


const equalsButton = document.querySelector("#equals-button");
equalsButton.addEventListener("click", () => {

    if (currentOperator != null){
        //equals needs to call assignOperator rather than operate as the logic to determine which operator to use exists in that function
        assignOperator(currentOperator, true);
    }
    else return;
    
});

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {

    previousOperator = null;
    currentOperator = null;
    operated = false;
    newInput = false;

    currentValue = null;
    previousValue = null;
    
    calcScreen.value = null;

});


