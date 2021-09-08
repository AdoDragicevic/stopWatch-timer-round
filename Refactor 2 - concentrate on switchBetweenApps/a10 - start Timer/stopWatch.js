class StopWatch extends Time {

    //true = count h/m/s; false = count m/s/ms 
    hours = false;

    btnTxt = {
        btnLeft: () => this.isRunning ? "Lap" : "Reset",
        btnRight: () => this.isRunning ? "Stop": "Start"
    };

    //btn functionality changes depending on isRunning
    btnRight() {
        if(this.isRunning) return this.stop();
        //else:
        let action = () => ++this["v" + this.inputs.length];
        let duration = this.hours ? 1000 : 10;
        let maxLimit = this.hours ? [99] : null; 
        let limit = this.hours ? [100, 60, 60] : [60, 60, 100]; 
        let callback = this.hours ? this.stop : () => { this.stop(); this.reset(1, 0, 0); this.hours = true; this.displayLap(); this.start(1000); }
        this.start( this.runTime.bind(this, duration, action, maxLimit, limit, callback) );
    };
    btnLeft() {
        this.isRunning ? this.displayLap(this.currVal()) : this.reset();
    };
    
    //btnRight
    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
    };

    start(callback) {
        this.isRunning = true;
        callback();
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
        this.updateInputs();
        this.displayLap();
        this.updateTitle();
        if(this.hours) this.hours = false;
    };

    //
    //arguments: how often, what, until when, optional: periodic limits, callback for periodic limits
    runTime(duration, action, maxLimit, limit, callback) {
        this.interval = setInterval( () => {
            //stop if maxLimit is reached
            if( this.checkLimit(maxLimit) ) return this.stop();
            //add/deduct or something else to last value
            action();
            //turn 100ms into 1s, 60s into 1m; etc.
            if(limit) this.calcTime(limit, callback);
            if(this.currApp) {
                this.updateInputs();
                this.updateTitle();  
            }       
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

    //0, 0, 0
    //0, 0, 0

    // MOŽDA OD CALCTIME MOŽEŠ I NAPRAVIT FUNKCIJU KOJA ĆE ISPRAVIT USER INPUT, NPR KAD USER U TIMER UNESE 99:99:99
    // ILI MOŽDA JE ZA TIMER TO OK??
    //turn 100ms into 1s, 60s into 1m, 60m into 1h
    // 99:99:99 MI SE I ČINI VIŠE SEXY LIMIT NEGO OVAJ KOJ SAD IMAM (99:0:0)
    calcTime(limits, callback) {
        //base case (recursion); when first value reaches limit, invoke callback
        if( limits.length === 1 && this["v" + limits.length ] === limits[0] ) callback();
        //if curr val reached its limit, set it to 0, add 1 to value before it (e.g. 0:60 becomes 1:00), invoke this function again
        else if( this["v" + limits.length] === limits[limits.length - 1] ) {
            this["v" + limits.length] = 0;
            this["v" + (limits.length - 1)] += 1;
            this.calcTime(limits.slice(0, limits.length - 1), callback);
        }
    }

    // in HTML, display nums as two digit (e.g. 1 as "01")
    updateInputs() {
        this.inputs.forEach( (input, i) => input.value = this.twoDigitNum(this["v" + (i+1)]) );
    };

    // Every num, when displayed, must be 2 digit
    twoDigitNum(num) {
        let n = num.toString();
        return n.length === 1 ? `0${n}`: n;
    };

}