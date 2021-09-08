// Properties & methods specific to stopwatch

function makeStopwatch(callbacks) {
    
    // Deconstruct callbacks, extract method for StopWatch (clock hand moving)
    const {tickingClockHand} = callbacks;
    
    // Set time obj as the prototype
    const obj = Object.create(time);
    
    // time in numbers (min, sec, milSec)
    obj.t1 = 0;
    obj.t2 = 0;
    obj.t3 = 0;
    
    obj.setTime = function() {
        console.log("time is fixed to 0 0 0");
    }

    // is time running vs. frozen
    obj.isRunning = false;

    obj.thisApp = false;

    obj.tickingClockHand = tickingClockHand;

    // functionality of the buttons changes depending on isRunning
    obj.rightBtn = function() {
        this.isRunning ? this.stop() : this.start(10);
    };
    
    obj.leftBtn = function() {
        this.isRunning ? this.lap() : this.reset(this.tickingClockHand, this.displayLap);
    };
    
    // change btn innerText
    obj.changeBtnText = function() {
        // left btn: Lap / Reset
        btnLeft.innerText = this.isRunning ? "Lap" : "Reset";
        // right btn: Start / Stop
        btnRight.innerText = this.isRunning ? "Stop" : "Start";
    };
    
    // functionalities
    

    // every 100msc add 1 sec, every 60 sec add 1 min
    obj.calcTime = function() {
        this.t3 += 1;
        // for every 100 msec, add 1 sec
        if(this.t3 > 99){
            this.t3 = 0;
            this.t2 += 1;
            this.tickingClockHand("on");
            // for every 60 sec, add 1 min
            if(this.t2 > 59) {
                this.t2 = 0;
                this.t1 +=1;
                // stop when we reach 99 min
                if(this.t1 === 99) {
                    this.stop();
                }
            }
        }
    };
    
    obj.lap = function() {
        const n1 = this.twoDigitNum(this.t1);
        const n2 = this.twoDigitNum(this.t2);
        const n3 = this.twoDigitNum(this.t3); 
        const str = `${n1}: ${n2}: ${n3}`;
        this.displayLap(str);
    };
    /*
    obj.reset = function() {
        this.isRunning = false;
        this.t1 = 0;
        this.t2 = 0;
        this.t3 = 0;
        this.displayTime();
        this.tickingClockHand();
        this.displayLap();
    };
    */


    obj.displayLap = function(text) {
        let ul = document.querySelector(".time__laps-list");
        // add new lap
        if(text){
            let li = document.createElement("li");
            li.innerText = text;
            ul.appendChild(li);
        // or delete all laps if no argument is passed
        }else{
            let laps = document.querySelectorAll(".time__laps-list li");
            for(let li of laps) ul.removeChild(li);
        }
    };

    return obj;

}