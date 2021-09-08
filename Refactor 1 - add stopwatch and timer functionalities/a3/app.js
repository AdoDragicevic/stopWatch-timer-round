// SELECTORS
// Time display (00 : 00 : 00)
const time1 = document.querySelector(".time__display-1");
const time2 = document.querySelector(".time__display-2");
const time3 = document.querySelector(".time__display-3");
// Main buttons
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

// RUN APP
// Create prototype obj
const time = makeProto(time1, time2, time3, btnLeft, btnRight);
// Create objs for each functionality (stopwatch/timer/clock) that borrow from the time prototype
const stopwatch = stopWatch(callbacks);
// Activate stopwatch
stopwatch.activate();

// Switch between app functionalities (stopwatch/timer/clock)



/*
const btnChange = document.querySelector(".btn-change");
const inputs = document.querySelectorAll(".time__display input");

btnChange.addEventListener("click", disableInput);

function disableInput(){
    for(let input of inputs){
        input.disabled = input.disabled === true ? false : true;
    }
}

for(let input of inputs){
    input.addEventListener("keypress", allowOnlyNum);
}
*/