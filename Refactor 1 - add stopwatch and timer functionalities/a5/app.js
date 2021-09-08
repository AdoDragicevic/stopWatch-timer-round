// SELECTORS (time display '00:00:00' & buttons)
const inputs = document.querySelectorAll(".time__display input");
const buttons = document.querySelectorAll(".buttons button");
const [time1, time2, time3] = inputs;
const [btnLeft, btnRight, btnSwitch] = buttons;

let app = 2;

// CREATE stopwatch/timer/clock OBJECTS
const time = makeProto(time1, time2, time3, btnLeft, btnRight);
const stopwatch = makeStopwatch(callbacks);
const timer = makeTimer();



timer.activate();


// SWITCH between stopwatch/timer/clock
btnSwitch.addEventListener("click", switchApp);

function switchApp() {
    app = app === 3 ? 1 : ++app;
    console.log(app); 
    if(app === 1) stopwatch.activate();
    if(app === 2) timer.activate();
    //if(functionality === 3) 
}



/*
for(let input of inputs) {
    input.disabled = input.disabled === true ? false : true;
}
*/

/*
const test = document.querySelector("#test")

test.addEventListener("click", print);

setInterval(() => {
    test.removeEventListener("click", print);
}, 4000);


function print() {
    console.log("hi");
}
*/