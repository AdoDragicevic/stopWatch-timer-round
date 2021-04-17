// Prototype (properties and methods shared by all apps)

class Time {
    
    constructor(disabledInputs = false, time = inputs, btns = buttons) {

        //can the user set the input value
        this.isDisableInputs = disabledInputs;

        //inputs
        this.inputs = [...time];

        //buttons
        this.btns = [...btns];

        //app has the name of its constructor
        this.name = this.constructor.name;

        //input values (shows currently running time)
        this.val = [];

        //values to display when app is reset (time the user set or default time)
        this.resetVal = [];
        ( () => {
            for(let i of this.inputs) {
                this.val.push(0);
                this.resetVal.push(0);
            }
        } )();

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
        if(this.runOnStop) this.runOnStop();
        this.updateBtnTxt();
        this.disableInputs();
    }


    reset(...values) {
        this.stop();
        if(this.runOnReset) this.runOnReset();
        this.val.forEach( (v, i) => this.val[i] = values[i] || this.resetVal[i] );
        this.updateDisplay();
    }


    //Run time
    

    //generate str with current lap details
    currVal(num = 0) {
        //base case (recursion)
        if( num === (this.val.length - 1) ) return this.twoDigitNum(this.val[num]);
        return this.twoDigitNum(this.val[num]) + ": " + this.currVal(++num);
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
        let {duration, maxLimit, timeAmount, val, limits, defaultTime, callback} = data;
        this.interval = setInterval( () => {
            //stop if maxLimits is reached
            if( this.checkLimit(maxLimit) ) return this.stop();
            //timeAmount and val to increment
            this.addTime(timeAmount, val);
            //turn 100ms into 1s, 60s into 1m; etc.
            this.calcTime(timeAmount, limits, defaultTime, callback);
            if(this.isDisplayed) { 
                this.updateTitle(); 
                this.updateInputs(); 
            }
        }, duration);
    }


    //add timeAmount (e.g. 1) to last val if not specified othervise
    addTime(timeAmount, indx = this.val.length) {
        this.val[indx - 1] += timeAmount;
    }


    //check if max limit is reached
    checkLimit(maxLimit) {
        if(!maxLimit) return false;
        for(let i = 0; i < maxLimit.length; i++) {
            if(maxLimit[i] !== this.val[i]) return false;
        }
        return true;
    }


    //turn 100ms into 1s, 60s into 1m, 60m into 1h
    calcTime(timeAmount, limits, defaultTime, callback) {
        for(let i = limits.length - 1; i >= 0; i--) {
            if( limits[i] === this.val[i] ) {
                if(i !== 0) {
                    //e.g. turn 00:00:60 into 00:01:00
                    this.val[i] = defaultTime;
                    this.val[i-1] += timeAmount;
                }
                else callback.call(this);
            }
            else break;
        }
    }


    //Update display


    //when user sets input maually, save those values in current app
    setTimeManually() {
        this.inputs.forEach( (input, i) => {
            let val = parseInt(input.value) || 0;
            //update this.val array (stores currently running time)
            this.val[i] = val;
            //update this.resetVal array (when app is reset it will return to the last values user inputed)
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
            input.value =  this.twoDigitNum( this.val[i] );
        });
    }


    //if current app is not running and it allows users to change input, add/remove disable to inputs
    disableInputs() {
        if(!this.isRunning && !this.isDisableInputs) {
            for(let input of this.inputs) input.removeAttribute("disabled"); 
        }else{
            for(let input of this.inputs) input.setAttribute("disabled", true);
        }
    };


    updateBtnTxt() {
        for(let btn of this.btns) btn.innerText = this.btnTxt[btn.id]();
    }


}