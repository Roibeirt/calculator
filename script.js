const calcScreen = document.querySelector("#screen");
let digitButtons = document.querySelectorAll(".numpad-row button");

calcScreen.oninput = () => {
    calcScreen.value = calcScreen.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  }
  
function writeToScreen(){

    calcScreen.value += this.textContent;
    calcScreen.value = calcScreen.value.replace(/(\..*)\./g, '$1');
}

digitButtons.forEach((currentValue) => currentValue.addEventListener("click", writeToScreen));



