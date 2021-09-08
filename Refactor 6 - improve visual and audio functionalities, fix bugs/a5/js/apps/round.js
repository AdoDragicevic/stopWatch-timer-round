class Round extends Time {

    config = {
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
        maxLimit: [0, 0, 99],
        runOnMaxLimit: () => {
            if(this.isDisplayed) this.playSound("bell");
            let {currRound, numOfRounds, isCountingBreakTime} = this.config;
            if(currRound >= numOfRounds) this.reset();
            else {
                this.stop();
                this.countRoundTime(isCountingBreakTime);
                this.start();
                this.style.runOnMaxLimit.forEach(f => f.call(this, this.config));
            }
        }
    }

    runOnStart() {
        this.config.currRound = this.config.currRound || 1;
        this.isDisableInputs = true;
    }

    
    runOnReset() {
        this.isDisableInputs = false;
        let {config} = this;
        config.currRound = null;
        config.isSettingBreakTime = false;
        config.isCountingBreakTime = false;
    }


    countRoundTime(bool) {
        this.config.isCountingBreakTime = !bool;
        this.config.time = bool ? [...this.config.resetTime] : [...this.config.resetBreak];
        if(bool) this.config.currRound++;
    }


    //switch between setting round/break time
    set() {
        let {isSettingBreakTime, break: breakTime, time: roundTime, numOfRounds} = this.config;
        this.config.isSettingBreakTime = !isSettingBreakTime;
        let target = isSettingBreakTime ? roundTime : breakTime;
        target = target.map( el => this.getTwoDigitStr(el) );
        target[2] = numOfRounds;
        this.style.updateInputs.call(this, ...target);
        this.style.updateBtnTxt.call(this);
    }


    setTimeManually() {
        let {inputs, config} = this;
        let target1 = config.isSettingBreakTime ? config.break : config.time;
        let target2 = config.isSettingBreakTime ? config.resetBreak : config.resetTime;
        for(let i = 0; i < 2; i++) target1[i] = target2[i] = parseInt(inputs[i].value) || 0;
        let numOfRounds = parseInt(inputs[2].value);
        if(numOfRounds <= 0 || numOfRounds === NaN) numOfRounds = 12;
        config.numOfRounds = numOfRounds;
    }

    
}