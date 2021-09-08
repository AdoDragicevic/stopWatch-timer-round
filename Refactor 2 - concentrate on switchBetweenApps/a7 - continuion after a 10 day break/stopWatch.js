class StopWatch extends Time {

    //stopwatch displays minutes, seconds and millicesonds; if minutes exceed 59, it displays hours, minutes and seconds
    hours = false;

    btnTxt = {
        btnLeft: {
            active: "Lap",
            inactive: "Reset"
        },
        btnRight: {
            active: "Stop",
            inactive: "Start"
        }
    }

    //btn functionality changes depending on isRunning
    btnRight() {
        let duration = this.hours ? 1000 : 10;
        let maxLimit = this.hours ? [99] : [];
        this.isRunning ? this.stop() : this.start(duration, maxLimit);
    };
    btnLeft() {
        this.isRunning ? this.displayLap(this.lap()) : this.reset();
    };
    
    //bntRight
    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
    };
    start(duration, maxLimit) {
        this.isRunning = true;
        this.runTime(duration, maxLimit);
    };

    checkLimit(maxLimit) {
        if(maxLimit.length === 0) return false;
        let boolean = this["v" + maxLimit.length] === maxLimit[maxLimit.length - 1];
        return boolean && this.checkLimit(maxLimit.slice(0, maxLimit.length - 1));
    }

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
    lap(num = 1) {
        //number of inputs equals number of stored values (v1,v2,v3...); add all values to one string
        if(num === this.inputs.length) return this.twoDigitNum(this["v" + num]);
        return this.twoDigitNum(this["v" + num]) + ": " + this.lap(++num);
    }

    //reset all values to 0 or values provided as arguments
    reset(...values) {
        this.inputs.forEach( (input, i) => this["v" + (i+1)] = (values[i] || 0) );
        this.displayTime();
        this.displayLap();
        if(this.hours) this.hours = false;
    };



    runTime(duration, maxLimit) {
        this.interval = setInterval( () => {
            //stop if maxLimit is already reached
            if(!checkLimit(maxLimit)) this.stop();
            //add 1 to last value
            this["v" + this.inputs.length] += 1;
            //calcTime arguments depend upon this.hours boolean
            let callbacks = () => { this.stop(); this.reset(1, 0, 0); this.hours = true; this.start(1000); };
            this.hours ? this.calcTime(this.stop, 99, 60, 60) : this.calcTime(callbacks, 60, 60, 100);
            this.displayTime();            
        }, duration);
    };

    // every 100msc add 1 sec, every 60 sec add 1 min
    //CALC TIME SPOJI U 1 FUNKCIJU KOJA PRIMA RAZLIČITE ARGUMENTE
    //NEMOJ ZABORAVIT ISKLJUČIT HOUR MODE KAD SE RESETIRA SVE
    
    
    //callback runs when first value exceeds limit; limits are set with rest operator
    calcTime(callback, ...limits) {
        //base case (this is a recursive function)
        if( limits.length === 1 && this["v" + limits.length ] === limits[0] ) {
            callback();
        }
        else if( this["v" + limits.length] === limits[limits.length - 1] ) {
            this["v" + limits.length] = 0;
            this["v" + limits.length - 1] += 1;
            this.calcTime(limits.splice(0, limits.length - 1));
        }
    };

    calcTime(callback, ...limits) {
        //increment last value by 1
        this["v" + this.inputs.length] += 1;
        //every 100ms, add 1 sec; every 60s add 1min; etc.
        this.transfer(callback, limits);
    }

    transfer(callback, limits) {
        //ITERATION
        for(let i = limits.length; i > 0; i--) {
            //if curr val reached its limit, set it to 0 and increment value in front of it (e.g. 0:60 becomes 1:00)
            if(this["v" + i] === limits[i-1]) {
                if(i > 1) {
                    this["v" + 1] = 0;
                    this["v" + (i-1)] += 1;
                }else{
                    //if first limit is reached, run callback;
                    callback();
                }
            }
            else{
                //if any val does not reach its limit, break the loop (e.g. break when 0:60 becomes 1:00, as opposed to 59:60 becoming 1:00:00)
                break;
            }
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