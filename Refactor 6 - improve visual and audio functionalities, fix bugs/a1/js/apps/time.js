// Prototype

class Time {
    
    constructor(disabledInputs = false, time = inputs, btns = buttons, DOMManipuation = style) {

        this.inputs = [...time];

        this.btns = [...btns];
        
        this.name = this.constructor.name;
        
        this.isRunning = false;
        
        this.isDisplayed = false;
        
        this.isDisableInputs = disabledInputs;
        
        //dom manipulation methods are in a separate object passed in as argument to the constructor
        this.style = DOMManipuation[this.name.toLowerCase()];


        for(let btn of this.btns) btn.addEventListener( "click", () => {
            if(this.isDisplayed) this[ this.getLowerCaseFirstWord(btn.innerText) ]();
        });


        this.allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", null];
        for(let input of this.inputs) input.addEventListener( "input", e => {
            if(this.isDisplayed) {
                if( !this.allowedKeys.includes(e.data) ) input.value = null;
                this.setTime(this.runTimeData.time, this.inputs);
                this.setTime(this.runTimeData.resetTime, this.inputs);
            }
        });

    }


    start() {
        let {time, maxLimit} = this.runTimeData;
        if(this.areSame(time, maxLimit)) return;
        this.isRunning = true;
        if(this.runOnStart) this.runOnStart();
        if(this.style) if(this.style.runOnStart) this.style.runOnStart.forEach(f => f.call(this));
        this.runTime(this.runTimeData);
    }


    stop() {
        this.isRunning = false;
        clearInterval(this.runTimeData.runTimeInterval);
        if(this.runOnStop) this.runOnStop();
        if(this.style) if(this.style.runOnStop) this.style.runOnStop.forEach(f => f.call(this));
    }


    reset() {
        this.stop();
        this.runTimeData.time = [...this.runTimeData.resetTime];
        if(this.runOnReset) this.runOnReset();
        if(this.style) if(this.style.runOnReset) this.style.runOnReset.forEach(f => f.call(this));
    }


    runTime(runTimeData) {
        let {maxLimit, runOnMaxLimit, limits, incrementAmount, defaultVals} = runTimeData;
        runTimeData.runTimeInterval = setInterval( () => {
            let {time} = runTimeData;
            if(this.areSame(time, maxLimit)) return runOnMaxLimit();
            runTimeData.time = this.getNewTime(time, incrementAmount, limits, defaultVals);
            if(this.style) if(this.isDisplayed) this.style.runOnRunTime.forEach(f => f.call(this));
        }, 10);
    }


    getNewTime(time, incrementAmount, limits, defaultVals) {
        for(let i = time.length - 1; i >= 0; i--) {
            time[i] += incrementAmount;
            //e.g. turn 2:59 into 3:00, instead of 2:60
            if(time[i] === limits[i] && i !== 0) time[i] = defaultVals[i];
            else break;
        }
        return time;
    }


    setTime(target, newValues) {
        newValues.forEach( (el, i) => target[i] = el.value ? parseInt(el.value) : parseInt(el) );
    }


    areSame(arr1, arr2) {
        if(!arr1 || !arr2) return false;
        for(let i = 0; i < arr1.length; i++) if(arr1[i] !== arr2[i]) return false;
        return true;
    }


    getLowerCaseFirstWord(str) {
        let space = str.indexOf(" ");
        let firstWord = space === -1 ? str : str.slice(0, space);
        return firstWord.toLowerCase(); 
    }


    getCurrTimeStr(numOfVal = 3) {
        let {time} = this.runTimeData;
        let str = "";
        for(let i = 0; i < numOfVal - 1; i++) str += `${this.getTwoDigitStr( time[i] )} : `;
        str += this.getTwoDigitStr(time[numOfVal - 1]);
        return str;
    }


    getTwoDigitStr(num) {
        let n = num.toString();
        return n.length === 1 ? `0${n}`: n;
    }


}