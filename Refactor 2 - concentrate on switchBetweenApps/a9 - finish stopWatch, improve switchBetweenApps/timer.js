class Timer extends Time {

    btnTxt = {
        btnLeft: { active: "Reset", inactive: "Reset" },
        btnRight: { active: "Stop", inactive: "Start" }
    };

    btnRight() {
        this.isRunning ? this.stop() : this.start(1000, [0, 0, 0]);
    };
    btnLeft() {
        this.reset();
    };

    //btnRight
    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
    };
    start(duration, maxLimit) {
        this.isRunning = true;
        this.runTime(duration, maxLimit);
    };

    runTime(duration, maxLimit) {
        this.interval = setInterval( () => {
            //stop if maxLimit is reached
            if( this.checkLimit(maxLimit) ) return this.stop();
            //add 1 to last value
            this["v" + this.inputs.length] += 1;
            //every 100ms, add 1 sec; every 60s add 1min; etc.
            let callbacks = () => { this.stop(); this.reset(1, 0, 0); this.hours = true; this.displayLap(); this.start(1000); }; 
            this.hours ? this.calcTime(this.stop, [100, 60, 60]) : this.calcTime(callbacks, [60, 60, 100]);
            this.displayTime();
            this.updateTitle(this.currVal());         
        }, duration);
    };

    runTime(duration, maxLimit) {
        this.interval = setInterval( () => {
            //stop if maxLimit is reached
            if( this.checkLimit(maxLimit) ) return this.stop();
            //add 1 to last value
            this["v" + this.inputs.length] += 1;
            //every 100ms, add 1 sec; every 60s add 1min; etc.
            let callbacks = () => { this.stop(); this.reset(1, 0, 0); this.hours = true; this.displayLap(); this.start(1000); }; 
            this.hours ? this.calcTime(this.stop, [100, 60, 60]) : this.calcTime(callbacks, [60, 60, 100]);
            this.displayTime();
            this.updateTitle(this.currVal());         
        }, duration);
    };
}