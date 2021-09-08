class Rounds extends Time {

    btnTxt = {
        reset: () => this.isRunning ? "Reset" : "Set",
        start: () => this.isRunning ? "Stop": "Start"
    };

    runTimeData = {
        duration: 1000,
        maxLimit: [0, 0],
        timeAmount: -1,
        limits: [-1, -1],
        defaultTime: 59,
        callback: this.stop 
    };

    set = false;
    numOfRounds = 12;
    roundMin;
    roundSec;
    breakMin = 0;
    breakSec = 30;

    //check if max limit is reached
    checkLimit(maxLimit) {
        if(!maxLimit) return false;
        if(maxLimit.length === 0) return true;
        let boolean = this["v" + maxLimit.length] === maxLimit[maxLimit.length - 1];
        if(!boolean) return false;
        return boolean && this.checkLimit(maxLimit.slice(0, maxLimit.length - 1));
    }

    //turn 100ms into 1s, 60s into 1m, 60m into 1h
    calcTime(timeAmount, limits, defaultTime, callback) {
        //base case (recursion); when first value reaches limit, invoke callback
        if( limits.length === 1 && this["v" + limits.length ] === limits[0] ) callback();
        //if curr val reached its limit, set it to 0, add 1 to value before it (e.g. 0:60 becomes 1:00), invoke this function again
        else if( this["v" + limits.length] === limits[limits.length - 1] ) {
            this["v" + limits.length] = defaultTime;
            this["v" + (limits.length - 1)] += timeAmount;
            this.calcTime(timeAmount, limits.slice(0, limits.length - 1), defaultTime, callback);
        }
    }

}