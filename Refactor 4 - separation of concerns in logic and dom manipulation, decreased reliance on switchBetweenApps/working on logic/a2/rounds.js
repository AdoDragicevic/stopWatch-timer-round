class Rounds extends Time {

    //default values
    v1 = 2;
    v2 = 0;
    v3 = 12;

    btnTxt = {
        //btn id : txt
        reset: () => this.isRunning ? "Reset" : "Set",
        start: () => this.isRunning ? "Stop": "Start"
    };

    runTimeData = {
        duration: 1000,
        maxLimit: [0, 0, 12],
        timeAmount: -1,
        limits: [-1, -1],
        defaultTime: 59,
        callback: this.countRounds
    };

    rounds = {
        //
        setMode: true,
        //setting roundDuration or breakDuration
        setRounds: true,
        runRounds: true,
        numOfRounds: 12,
        currRound: 1,
        breakDuration: {
            v1: 0,
            v2: 3
        },
        roundDuration: {
            v1: 0,
            v2: 5
        }
    };

    set() {
        let {numOfRounds, breakDuration, roundDuration} = this.rounds;
        this.rounds.setRounds = this.rounds.setRounds ? false : true;
        if(this.rounds.setRounds) {
            this.reset(roundDuration.v1, roundDuration.v2, numOfRounds);    
        }else{
            this.reset(breakDuration.v1, breakDuration.v2, numOfRounds);
        }
    };

    //change between running rounds and breaks & increment this.rounds.currRound
    countRounds() {
        let {numOfRounds, currRound, runRounds, breakDuration, roundDuration} = this.rounds;
        if(currRound < numOfRounds) {
            if(runRounds) {
                this.rounds.runRounds = false;
                this.v1 = breakDuration.v1;
                this.v2 = breakDuration.v2;
            }else{
                this.reset(0, 0, ++this.rounds.currRound);
                this.rounds.runRounds = true;
                this.v1 = roundDuration.v1;
                this.v2 = roundDuration.v2;
            }
        }
        else this.stop();
    };

    //when user sets input maually, save that value in current app
    setTimeManually() {
        if(this.rounds.setRounds) {
            //set duration of rounds
            this.v1 = parseInt(this.inputs[0].value);
            this.v2 = parseInt(this.inputs[1].value);
            this.rounds.roundDuration.v1 = parseInt(this.inputs[0].value);
            this.rounds.roundDuration.v2 = parseInt(this.inputs[1].value);
        }else{
            //set duration of breaks
            this.rounds.breakDuration.v1 = parseInt(this.inputs[0].value);
            this.rounds.breakDuration.v2 = parseInt(this.inputs[1].value);
        }
        //set number of rounds
        let numOfRounds = parseInt(this.inputs[2].value);
        this.rounds.numOfRounds = numOfRounds ? numOfRounds : 12;
        this.runTimeData.maxLimit[2] = this.rounds.numOfRounds;
    };

    //increment second value (instead of last value)
    addTime(timeAmount) {
        this.v2 += timeAmount;
    };


};