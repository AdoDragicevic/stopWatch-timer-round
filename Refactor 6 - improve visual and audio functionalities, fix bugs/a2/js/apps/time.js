// Prototype

class Time {
    
    constructor(disabledInputs = false, time = inputs, btns = buttons, DOMManipuation = style) {

        this.inputs = [...time];

        this.btns = [...btns];
        
        this.name = this.constructor.name;
        
        this.isRunning = false;
        
        this.isDisplayed = false;
        
        this.isDisableInputs = disabledInputs;
        
        this.style = DOMManipuation[this.name.toLowerCase()];
        
        for(let btn of this.btns) btn.addEventListener( "click", () => {
            if(this.isDisplayed) this[ this.getLowerCaseFirstWord(btn.innerText) ]();
        });

        this.allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", null];
        for(let input of this.inputs) input.addEventListener( "input", e => {
            if(this.isDisplayed) {
                if( !this.allowedKeys.includes(e.data) ) input.value = null;
                this.setTimeManually();
            }
        });

    }


    start() {
        let {time, maxLimit} = this.runTimeData;
        if(this.areSame(time, maxLimit)) return;
        this.isRunning = true;
        if(this.runOnStart) this.runOnStart();
        if(this.style) if(this.style.runOnStart) this.style.runOnStart.forEach(f => f.call(this, this.runTimeData));
        this.runTime(this.runTimeData);
    }


    stop() {
        this.isRunning = false;
        clearInterval(this.runTimeData.runTimeInterval);
        if(this.runOnStop) this.runOnStop();
        this.style.runOnStop.forEach(f => f.call(this));
    }


    reset() {
        this.stop();
        this.runTimeData.time = [...this.runTimeData.resetTime];
        if(this.runOnReset) this.runOnReset();
        this.style.runOnReset.forEach(f => f.call(this));
    }


    runTime(runTimeData) {
        let {maxLimit, runOnMaxLimit, limits, incrementAmount, defaultVals} = runTimeData;
        runTimeData.runTimeInterval = setInterval( () => {
            let {time} = runTimeData;
            if(this.areSame(time, maxLimit)) return runOnMaxLimit();
            runTimeData.time = this.getNewTime(time, incrementAmount, limits, defaultVals);
            if(this.isDisplayed) this.style.runOnRunTime.forEach(f => f.call(this));
        }, 10);
    }


    getNewTime(time, incrementAmount, limits, defaultVals) {
        for(let i = time.length - 1; i >= 0; i--) {
            time[i] += incrementAmount;
            //e.g. turn 0:59 into 1:00
            if(time[i] === limits[i] && i !== 0) time[i] = defaultVals[i];
            else break;
        }
        return time;
    }


    setTimeManually() {
        this.inputs.forEach( (input, i) => {
            this.runTimeData.time[i] = this.runTimeData.resetTime[i] = parseInt(input.value) || 0;
        });
    }


    playSound(soundName) {
        let checkBox = document.querySelector(`#${this.name.toLowerCase()}-checkbox`);
        let audio = document.querySelector(`#audio-${soundName}`);
        if(checkBox.checked) audio.play(); 
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