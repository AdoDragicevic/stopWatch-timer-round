class StopWatch extends Time {

    isDisableInputs = true;

    isSoundOn = false;

    //config time data
    config = {
        isCountingHours: false,
        time: [0, 0, 0],
        resetTime: [0, 0, 0],
        limits: [60, 60, 100],
        incrementAmount: 1,
        defaultVals: [0, 0, 0],
        maxLimit: [60, 0, 0],
        runOnMaxLimit: () => {
            if(this.config.isCountingHours) this.reset();
            else {
                this.style.removeLaps();
                this.stop();
                this.countHours(true);
                this.start();
            }
        }
    }


    runOnReset = () => {
        if(this.config.isCountingHours) this.countHours(false);
    }


    lap() {
        this.style.displayLaps.call(this);
    }


    countHours(bool) {
        let {config} = this;
        config.isCountingHours = bool;
        config.time = bool ? [1, 0, 0, 0] : [0, 0, 0]; 
        config.maxLimit = bool ? [99, 99, 99, 99] : [60, 0, 0];
        config.limits = bool ? [60, 60, 60, 100] : [60, 60, 100];
        config.defaultVals = bool ? [0, 0, 0, 0] : [0, 0, 0];
    }


}