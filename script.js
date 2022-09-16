const numpad = document.querySelector("#numpad");
let digits = new Array();

for (i=0; i<10; i++){

    digits[i]=document.createElement("button");
    numpad.appendChild(digits[i]);
    digits[i].style.width = "20px";
    digits[i].style.display = "flex";
    digits[i].style.flex = "auto";
    digits[i].textContent = 9-i;
    
}