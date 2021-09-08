// Prototype (properties and methods shared by all apps)

class Time {
    
    constructor(disabledInputs = false, time = inputs, btns = buttons) {
        
        //can the user set the input value
        this.disabledInputs = disabledInputs;
        //inputs
        this.inputs = [...time];
        //for each input create property v1, v2, v3, etc.
        this.inputs.forEach( (input, i) => this["v" + (i+1)] = parseInt(input.value) );
        //buttons
        this.btns = [...btns];
        //app has the name of its constructor
        this.name = this.constructor.name;
        //values to display when app is reset
        this.resetVal = [];
        for(let val of this.inputs) this.resetVal.push(0);
        //time is running
        this.isRunning = false;
        //currently displayed app
        this.isDisplayed = false;
    }


    //Basic functionalities


    start() {
        this.isRunning = true;
        if(this.runOnStart) this.runOnStart();
        this.updateBtnTxt();
        this.disableInputs();
        this.runTime(this.runTimeData);
    }


    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
        this.updateBtnTxt();
        this.disableInputs();
    }


    reset(...values) {
        this.stop();
        if(this.runOnReset) this.runOnReset();
        this.inputs.forEach( (input, i) => this["v" + (i+1)] = values[i] || this.resetVal[i] );
        this.updateDisplay();
    }


    //Run time


    //generate str with current lap details
    currVal(num = 1) {
        //number of inputs equals number of stored values (v1,v2,v3...); add all values to one string
        if( num === this.inputs.length ) return this.twoDigitNum( this["v" + num] );
        return this.twoDigitNum( this["v" + num] ) + ": " + this.currVal( ++num );
    };


    //in HTML, display nums as two digit (e.g. 1 as "01")
    twoDigitNum(num) {
        let n = num.toString();
        return n.length === 1 ? `0${n}`: n;
    }    


    //runTimeData contains: how often, until when, increment amount, value to increment, periodic limits, default time, callback for periodic limits
    runTime(runTimeData) {
        //destructure runTimeData
        let data = typeof runTimeData === "function" ? runTimeData.call(this) : runTimeData;
        let {duration, maxLimit, timeAmount, input, limits, defaultTime, callback} = data;
        this.interval = setInterval( () => {
            //stop if maxLimits is reached
            if( this.checkLimit(maxLimit) ) return this.stop();
            //add/deduct timeAmount to last value
            this.addTime(timeAmount, input);
            //turn 100ms into 1s, 60s into 1m; etc.
            this.calcTime(timeAmount, limits, defaultTime, callback);
            if(this.isDisplayed) { 
                this.updateTitle(); 
                this.updateInputs(); 
            }
        }, duration);
    }


    //add timeAmount (e.g. 1) to specified input
    addTime(timeAmount, input = this.inputs.length) {
        this["v" + input] += timeAmount;
    }


    //check if max limit is reached
    checkLimit(maxLimit) {
        if(!maxLimit) return false;
        if(maxLimit.length === 0) return true;
        let boolean = this["v" + maxLimit.length] === maxLimit[maxLimit.length - 1];
        if(!boolean) return false;
        return boolean && this.checkLimit(maxLimit.slice(0, maxLimit.length - 1));
    }


    //check if max limit is reached
    checkLimit(maxLimit) {
        if(!maxLimit) return false;
        for(let i = 0; i < maxLimit.length; i++) {
            if(this["v" + (i+1)] !== maxLimit[i]) return false;
        }
        return true;
    }


    //turn 100ms into 1s, 60s into 1m, 60m into 1h
    calcTime(timeAmount, limits, defaultTime, callback) {
        //base case (recursion); when first value reaches limit, invoke callback
        if( limits.length === 1 && this["v" + limits.length ] === limits[0] ) callback.call(this);
        //if curr val reached its limit, set it to 0, add 1 to value before it (e.g. 0:60 becomes 1:00), invoke this function again
        else if( this["v" + limits.length] === limits[limits.length - 1] ) {
            this["v" + limits.length] = defaultTime;
            this["v" + (limits.length - 1)] += timeAmount;
            this.calcTime(timeAmount, limits.slice(0, limits.length - 1), defaultTime, callback);
        }
    }


    //Update display


    //when user sets input maually, save those values in current app
    setTimeManually() {
        this.inputs.forEach( (input, i) => {
            let val = parseInt(input.value);
            //for each input, update app's v1, v2, v3... to match inputs value
            this[ "v" +(i+1) ] = val;
            //also save the val under resetVal (when app is reset it will return to the last values user inputed)
            this.resetVal[i] = val;
        });
    };


    updateDisplay() {
        this.updateTitle();
        this.updateH1();
        this.updateInputs();
        this.disableInputs();
        this.updateBtnTxt();
    }


    //show current time in browser tab
    updateTitle() {
        document.title = this.isRunning ? `${this.currVal()} | ${this.name}` : this.name;
    };


    updateH1() {
        document.querySelector("h1").innerText = this.name;
    }


    //ecah app runs its own time, when app is displayed display its time in HTML
    updateInputs() {
        this.inputs.forEach( (input, i) => {
            input.value = this.twoDigitNum( this["v" + (i+1) ] );
        });
    }


    //if current app is not running and it allows users to change input, add/remove disable to inputs
    disableInputs() {
        if(!this.isRunning && !this.disabledInputs) {
            for(let input of this.inputs) input.removeAttribute("disabled"); 
        }else{
            for(let input of this.inputs) input.setAttribute("disabled", true);
        }
    };


    updateBtnTxt() {
        for(let btn of this.btns) btn.innerText = this.btnTxt[btn.id]();
    }


}