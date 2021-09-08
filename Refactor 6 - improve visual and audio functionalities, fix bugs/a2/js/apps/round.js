class Round extends Time {

    runTimeData = {
        time: [3, 0, 99],
        resetTime: [3, 0, 99],
        break: [0, 20, 99],
        resetBreak: [0, 20, 99],
        numOfRounds: 12,
        currRound: null,
        isCountingBreakTime: false,
        isSettingBreakTime: false,
        incrementAmount: -1,
        limits: [0, -1, -1],
        defaultVals: [59, 59, 99],
        maxLimit: [0, 1, 00],
        runOnMaxLimit: () => {
            if(this.isDisplayed) this.playSound("bell");
            let {currRound, numOfRounds, isCountingBreakTime} = this.runTimeData;
            if(currRound >= numOfRounds) this.reset();
            else {
                this.stop();
                this.countRoundTime();
                this.start();
                this.style.runOnMaxLimit.forEach(f => f.call(this, this.runTimeData));
            }
        }
    }


    runOnStart() {
        this.runTimeData.currRound = this.runTimeData.currRound || 1;
        this.isDisableInputs = true;
    }

    
    runOnReset() {
        this.isDisableInputs = false;
        let {runTimeData} = this;
        runTimeData.currRound = null;
        runTimeData.isSettingBreakTime = false;
        runTimeData.isCountingBreakTime = false;
    }


    countRoundTime(bool) {
        this.runTimeData.isCountingBreakTime = !bool;
        this.runTimeData.time = bool ? [...this.runTimeData.resetTime] : [...this.runTimeData.resetBreak];
        if(bool) this.runTimeData.currRound++;
    }


    //switch between setting round/break time
    set() {
        let {isSettingBreakTime, break: breakTime, time: roundTime, numOfRounds} = this.runTimeData;
        this.runTimeData.isSettingBreakTime = !isSettingBreakTime;
        let target = isSettingBreakTime ? roundTime : breakTime;
        target = target.map( el => this.getTwoDigitStr(el) );
        target[2] = numOfRounds;
        this.style.updateInputs.call(this, ...target);
        this.style.updateBtnTxt.call(this);
    }


    setTimeManually() {
        let {inputs, runTimeData} = this;
        let target1 = runTimeData.isSettingBreakTime ? runTimeData.break : runTimeData.time;
        let target2 = runTimeData.isSettingBreakTime ? runTimeData.resetBreak : runTimeData.resetTime;
        for(let i = 0; i < 2; i++) target1[i] = target2[i] = parseInt(inputs[i].value) || 0;
        let numOfRounds = parseInt(inputs[2].value);
        if(numOfRounds <= 0 || numOfRounds === NaN) numOfRounds = 12;
        runTimeData.numOfRounds = numOfRounds;
    }

    
}