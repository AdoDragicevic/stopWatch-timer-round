class Round extends Time {

    //default values
    val = [3, 0, 12];
    resetVal = [3, 0, 12];
    breakVal = [0, 30];
    resetBreakVal = [0, 30];
    //e.g.if user sets 12 rounds, when app is started, this is the current round
    currRound = 1;


    //counting round time or break time
    isCountingRoundTime = true;


    //setting round duration or break duration
    isSettingRoundTime = true;

    
    runTimeData = {
        duration: 1000,
        maxLimit: [0, 0, 12],
        timeAmount: -1,
        val: 2,
        limits: [-1, -1],
        defaultTime: 59,
        callback: this.countRounds
    };


    runOnStart = () => this.val[this.val.length - 1] = this.currRound;


    runOnStop = () => this.isDisableInputs = true;

    
    runOnReset = () => {
        this.isDisableInputs = false;
        this.isSettingRoundTime = true;
        this.isCountingRoundTime = true;
        this.currRound = 1;
    }


    //switch between setting round duration / break duration
    set() {
        this.isSettingRoundTime = !this.isSettingRoundTime;
        let values = this.isSettingRoundTime ? this.val : this.resetBreakVal;
        values.forEach( (val, i) => this.inputs[i].value = this.twoDigitNum(val) );
        this.style.updateBtnTxt.call(this);
    };      
    

    //change between running rounds and breaks & increment this.rounds.currRound
    countRounds() {
        this.isCountingRoundTime = !this.isCountingRoundTime;
        if(this.isCountingRoundTime) {
            this.resetVal.forEach( (val, i) => this.val[i] = val );
            this.val[this.val.length - 1] = ++this.currRound;
            this.style.updateH1.call(this);
        }
        else this.breakVal.forEach( (breakTime, i) => this.val[i] = breakTime );
    };


    //when user sets input maually, save those values
    setTimeManually() {
        this.inputs.forEach( (input, i) => {
            let val = parseInt(input.value) || 0;
            if(i === this.val.length - 1) {
                //numOfRounds = this.runTimeData
                this.val[i] = val;
                this.resetVal[i] = val;
                this.runTimeData.maxLimit[i] = val;
                this.currRound = 1;
            }
            else if(this.isSettingRoundTime) {
                //round duration
                this.val[i] = val;
                this.resetVal[i] = val;
            }else {
                //break duration
                this.breakVal[i] = val;
                this.resetBreakVal[i] = val;
            }
        });
    };


};