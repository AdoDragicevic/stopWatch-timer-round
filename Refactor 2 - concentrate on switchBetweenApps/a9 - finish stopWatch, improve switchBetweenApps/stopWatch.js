class StopWatch extends Time {

    //true = count h/m/s; false = count m/s/ms 
    hours = false;

    btnTxt = {
        btnLeft: { active: "Lap", inactive: "Reset" },
        btnRight: { active: "Stop", inactive: "Start" }
    };

    //btn functionality changes depending on isRunning
    btnRight() {
        let duration = this.hours ? 1000 : 10;
        let maxLimit = this.hours ? [99] : null;
        this.isRunning ? this.stop() : this.start(duration, maxLimit);
    };
    btnLeft() {
        this.isRunning ? this.displayLap(this.currVal()) : this.reset();
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


    //bntLeft
    displayLap(text) {
        let ul = document.querySelector(".laps-list");
        // add new lap
        if(text){
            let li = document.createElement("li");
            li.innerText = text;
            ul.appendChild(li);
        // or delete all laps if no argument is passed
        }else{
            let laps = document.querySelectorAll(".laps-list li");
            for(let li of laps) ul.removeChild(li);
        }
    };
    //generate str with current lap details
    currVal(num = 1) {
        //number of inputs equals number of stored values (v1,v2,v3...); add all values to one string
        if(num === this.inputs.length) return this.twoDigitNum(this["v" + num]);
        return this.twoDigitNum(this["v" + num]) + ": " + this.currVal(++num);
    };
    //show current time in browser tab
    updateTitle() {
        document.title = this.isRunning ? `${this.currVal()} | ${this.name}` : this.name;
    };
    //reset all values to 0 or values provided as arguments
    reset(...values) {
        this.inputs.forEach( (input, i) => this["v" + (i+1)] = (values[i] || 0) );
        this.displayTime();
        this.displayLap();
        this.updateTitle();
        if(this.hours) this.hours = false;
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
    
    //check if max limit is reached
    checkLimit(maxLimit) {
        if(!maxLimit) return false;
        if(maxLimit.length === 0) return true;
        let boolean = this["v" + maxLimit.length] === maxLimit[maxLimit.length - 1];
        if(!boolean) return false;
        return boolean && this.checkLimit(maxLimit.slice(0, maxLimit.length - 1));
    }

    //turn 100ms into 1s, 60s into 1m, 60m into 1h
    calcTime(callback, limits) {
        //base case (recursive function); when first value reaches limit, invoke callback
        if( limits.length === 1 && this["v" + limits.length ] === limits[0] ) callback();
        //if curr val reached its limit, set it to 0, add 1 to value before it (e.g. 0:60 becomes 1:00), invoke this function again
        else if( this["v" + limits.length] === limits[limits.length - 1] ) {
            this["v" + limits.length] = 0;
            this["v" + (limits.length - 1)] += 1;
            this.calcTime(callback, limits.slice(0, limits.length - 1));
        }
    }

    // in HTML, display nums as two digit (e.g. 1 as "01")
    displayTime() {
        this.inputs.forEach( (input, i) => input.value = this.twoDigitNum(this["v" + (i+1)]) );
    };

    // Every num, when displayed, must be 2 digit
    twoDigitNum(num) {
        let n = num.toString();
        return n.length === 1 ? `0${n}`: n;
    };

}