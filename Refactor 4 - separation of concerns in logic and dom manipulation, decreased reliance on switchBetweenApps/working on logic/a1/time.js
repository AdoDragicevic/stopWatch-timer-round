function time(prototype) {
    
    const obj = Object.create(prototype);


    //arguments: how often, what, until when, optional: periodic limits, callback for periodic limits
    obj.runTime = function(duration, action, maxLimit, limit, callback) {
        this.isRunning = true;
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

    //generate str with current lap details
    obj.currVal = function(num = 1) {
        //number of inputs equals number of stored values (v1,v2,v3...); add all values to one string
        if( num === this.inputs.length ) return this.twoDigitNum( this["v" + num] );
        return this.twoDigitNum( this["v" + num] ) + ": " + this.currVal( ++num );
    };
    
    //show current time in browser tab
    obj.updateTitle = function() {
        document.title = this.isRunning ? `${this.currVal()} | ${this.name}` : this.name;
    };
    
    //reset all values to 0 or values provided as arguments
    obj.reset = function(...values) {
        this.inputs.forEach( (input, i) => this["v" + (i+1)] = (values[i] || 0) );
        this.updateInputs();
        this.updateTitle();
    };
    
    //check if max limit is reached
    obj.checkLimit = function(maxLimit) {
        if(!maxLimit) return false;
        if(maxLimit.length === 0) return true;
        let boolean = this["v" + maxLimit.length] === maxLimit[maxLimit.length - 1];
        if(!boolean) return false;
        return boolean && this.checkLimit(maxLimit.slice(0, maxLimit.length - 1));
    };
    
    //turn 100ms into 1s, 60s into 1m, 60m into 1h
    obj.calcTime = function(limits, callback) {
        //base case (recursion); when first value reaches limit, invoke callback
        if( limits.length === 1 && this["v" + limits.length ] === limits[0] ) callback();
        //if curr val reached its limit, set it to 0, add 1 to value before it (e.g. 0:60 becomes 1:00), invoke this function again
        else if( this["v" + limits.length] === limits[limits.length - 1] ) {
            this["v" + limits.length] = 0;
            this["v" + (limits.length - 1)] += 1;
            this.calcTime(limits.slice(0, limits.length - 1), callback);
        }
    };
    
    // in HTML, display nums as two digit (e.g. 1 as "01")
    obj.updateInputs = function() {
        this.inputs.forEach( (input, i) => input.value = this.twoDigitNum(this["v" + (i+1)]) );
    };
    
    // Every num, when displayed, must be 2 digit
    obj.twoDigitNum = function(num) {
        let n = num.toString();
        return n.length === 1 ? `0${n}`: n;
    };

    
    return obj;
}



