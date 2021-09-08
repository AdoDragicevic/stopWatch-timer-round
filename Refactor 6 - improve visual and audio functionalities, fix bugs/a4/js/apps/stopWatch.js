class StopWatch extends Time {

    isDisableInputs = true;

    //run time data
    runTimeData = {
        isCountingHours: false,
        time: [0, 0, 0],
        resetTime: [0, 0, 0],
        limits: [60, 60, 100],
        incrementAmount: 1,
        defaultVals: [0, 0, 0],
        maxLimit: [60, 0, 0],
        runOnMaxLimit: () => {
            if(this.runTimeData.isCountingHours) this.reset();
            else {
                this.style.removeLaps();
                this.stop();
                this.countHours(true);
                this.start();
            }
        }
    }


    runOnReset = () => {
        if(this.runTimeData.isCountingHours) this.countHours(false);
    }


    lap() {
        this.style.displayLaps.call(this);
    }


    countHours(bool) {
        let {runTimeData} = this;
        runTimeData.isCountingHours = bool;
        runTimeData.time = bool ? [1, 0, 0, 0] : [0, 0, 0]; 
        runTimeData.maxLimit = bool ? [99, 99, 99, 99] : [60, 0, 0];
        runTimeData.limits = bool ? [60, 60, 60, 100] : [60, 60, 100];
        runTimeData.defaultVals = bool ? [0, 0, 0, 0] : [0, 0, 0];
    }


}