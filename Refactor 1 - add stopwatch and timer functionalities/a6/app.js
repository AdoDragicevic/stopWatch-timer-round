// SELECTORS (time display '00:00:00' & buttons)
const inputs = document.querySelectorAll(".time__display input");
const buttons = document.querySelectorAll(".buttons button");
const [time1, time2, time3] = inputs;
const [btnLeft, btnRight, btnSwitch] = buttons;

// 1:stopwatch/2:timer/3:clock
let app = 2;

// CREATE OBJECTS stopwatch/timer/clock
const time = makeProto(time1, time2, time3, btnLeft, btnRight);
const stopwatch = makeStopwatch(callbacks);
const timer = makeTimer(callbacks);

timer.activate();

// SWITCH between stopwatch/timer/clock
btnSwitch.addEventListener("click", switchApp);

function switchApp() {
    app = app === 3 ? 1 : ++app;
    console.log(app); 
    if(app === 1) stopwatch.activate();
    if(app === 2) timer.activate();
    //if(app === 3) clock.activate(); 
}