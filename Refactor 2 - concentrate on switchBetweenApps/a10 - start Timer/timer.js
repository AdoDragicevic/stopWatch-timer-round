class Timer extends Time {

    btnTxt = {
        btnLeft: () => this.isRunning ? "Reset" : "Reset",
        btnRight: () => this.isRunning ? "Stop": "Start"
    };

    btnRight() {
        if(this.isRunning) {
            this.stop()
        }else if( !this.checkLimit([0, 0, 0]) ){
            this.start( this.runTime.bind(this, 1000, () => --this["v" + this.inputs.length], [0, 0, 0], [0, -1, -1], this.stop) );
        } 
    };
    btnLeft() {
        this.reset();
    };

    //btnRight
    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
    };
    //isRunning is true & invoke callback
    start(callback) {
        this.isRunning = true;
        callback();
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
        //this.displayLap();
        this.updateTitle();
        if(this.hours) this.hours = false;
    };


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

    // MO??DA OD CALCTIME MO??E?? I NAPRAVIT FUNKCIJU KOJA ??E ISPRAVIT USER INPUT, NPR KAD USER U TIMER UNESE 99:99:99
    // ILI MO??DA JE ZA TIMER TO OK??
    //turn 100ms into 1s, 60s into 1m, 60m into 1h
    // 99:99:99 MI SE I ??INI VI??E SEXY LIMIT NEGO OVAJ KOJ SAD IMAM (99:0:0)
    
    calcTime(limits, callback) {
        //base case (recursion); when first value reaches limit, invoke callback
        if( limits.length === 1 && this["v" + limits.length ] === limits[0] ) callback();
        //if curr val reached its limit, set it to 0, add 1 to value before it (e.g. 0:60 becomes 1:00), invoke this function again
        else if( this["v" + limits.length] === limits[limits.length - 1] ) {
            this["v" + limits.length] = 59;
            this["v" + (limits.length - 1)] -= 1;
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