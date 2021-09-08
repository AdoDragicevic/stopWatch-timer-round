// Properties & methods specific to timer
function makeTimer(callbacks) {    
    // Deconstruct callbacks, extract method for timer (clock border dissapearing)
    //const {tickingClockBorder} = callbacks;
    // Set time obj as the prototype
    const obj = Object.create(time);
    // time in numbers (min, sec, milSec)
    obj.t1 = 5;
    obj.t2 = 5;
    obj.t3 = 5;
    // is time running vs. frozen
    obj.isRunning = false;
    if(callbacks) obj.tickingClockBorder = tickingClockBorder;
    // functionality of the buttons changes depending on isRunning
    obj.rightBtn = function() {
        console.log("timer");
        this.isRunning ? this.stop() : this.start(10);
    };
    obj.leftBtn = function() {
        // passing specific methods as arguments to reset
        this.reset();
    };
    // change btn innerText
    obj.changeBtnText = function() {
        // right btn: Start / Stop
        btnRight.innerText = this.isRunning ? "Stop" : "Start";
    };

    obj.stop = function() {
        this.isRunning = false;
        this.changeBtnText();
    };
    obj.reset = function() {
        this.isRunning = false;
        this.changeBtnText();
    };


    return obj;
}