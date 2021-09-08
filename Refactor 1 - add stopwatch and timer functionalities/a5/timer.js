// Properties & methods specific to timer
function makeTimer(callbacks) {    
    // Deconstruct callbacks, extract method for timer (clock border dissapearing)
    //const {tickingClockBorder} = callbacks;
    // Set time obj as the prototype
    const obj = Object.create(time);
    // time in numbers (min, sec, milSec)
    obj.t1 = 0;
    obj.t2 = 0;
    obj.t3 = 0;
    // is time running vs. frozen
    obj.isRunning = false;
    if(callbacks) obj.tickingClockBorder = tickingClockBorder;
    // functionality of the buttons changes depending on isRunning
    obj.rightBtn = function() {
        this.isRunning ? this.stop() : this.start(1000);
    };
    obj.leftBtn = function() {
        // passing specific methods as arguments to reset
        this.reset();
    };
    obj.setTime = function() {
        this.t1 = parseInt(this.d1.value);
        this.t2 = parseInt(this.d2.value);
        this.t3 = parseInt(this.d3.value);  
    };
    // change btn innerText
    obj.changeBtnText = function() {
        // right btn: Start / Stop
        btnLeft.innerText = "Reset";
        btnRight.innerText = this.isRunning ? "Stop" : "Start";
    };

    // every second remove 1 sec, every 60 sec remove 1 min
    obj.calcTime = function() {
        if(this.t1 === 0 && this.t2 === 0 && this.t3 === 0){
            this.stop();
        }else{
            this.t3 -= 1;
            if(this.t3 < 0) {
                this.t3 = 59;
                this.t2 -= 1;
                if(this.t2 < 0){
                    this.t2 = 59;
                    this.t1 -=1;
                }
            }
        }
    };

    return obj;
}