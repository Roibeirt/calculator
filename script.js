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
let operator = "";

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

//
function assignOperator(operator){

    if (currentOperator == null){
        currentValue = Number(calcScreen.value);
        currentOperator = operator;
    }
    else{
        //only change previous input if input changes, otherwise repeated operations will not use original value
        if (newInput == true){
        previousValue = currentValue;
        }
        currentValue = Number(calcScreen.value);
        previousOperator = currentOperator;
        currentOperator = operator;
        operate();
    }
    operated = true;
}

function operate(){

    //if someone presses equals after the first operator, previous value won't be assigned. This makes sure it is assigned.
    if(previousValue == null){
        previousValue = currentValue;
        currentValue = Number(calcScreen.value);
    }

    if (currentOperator == "divide"){
        currentValue = divide(previousValue, currentValue);
    }
    else if (currentOperator == "multiply"){
        currentValue = multiply(previousValue, currentValue);
    }
    else if (currentOperator == "minus"){
        currentValue = subtract(previousValue, currentValue);
    }
    else{
        currentValue = add(previousValue, currentValue);
    }

    
    calcScreen.value = currentValue;
    operated = true;
    newInput= false;

}


const equalsButton = document.querySelector("#equals-button");
equalsButton.addEventListener("click", operate);

/*const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {

    operator = "";
    inOperation= false;
    currentValue = null;
    calcScreen.value = null;

})*/


