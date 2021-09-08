class Round extends Time {


    //default values
    v1 = 2;
    v2 = 0;
    v3 = 12;


    btnTxt = {
        //btn id : txt
        reset: () => (!this.isRunning && this.rounds.setMode) ? "Set" : "Reset",
        start: () => this.isRunning ? "Stop" : "Start"
    };

    
    runOnStart = () => {
        this.rounds.setMode = false,
        this.disabledInputs = true
    }

    
    runOnReset = () => {
        this.rounds.setMode = true,
        this.rounds.runRounds = true,
        this.disabledInputs = false,
        this.updateInputs.bind(this, this.rounds.roundDuration.v1, this.rounds.roundDuration.v2, this.rounds.numOfRounds)(),
    }

    
    runTimeData = {
        duration: 1000,
        maxLimit: [0, 0, 12],
        timeAmount: -1,
        input: 2,
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
            v2: 30
        },
        roundDuration: {
            v1: 2,
            v2: 0
        }
    };

    
    set() {
        let {breakDuration, roundDuration} = this.rounds;
        this.rounds.setRounds = this.rounds.setRounds ? false : true;
        if(this.rounds.setRounds) {
            this.reset(roundDuration.v1, roundDuration.v2, this.rounds.numOfRounds);    
        }else{
            this.reset(breakDuration.v1, breakDuration.v2, this.rounds.numOfRounds);
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


};