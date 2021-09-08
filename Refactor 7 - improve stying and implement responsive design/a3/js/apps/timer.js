class Timer extends Time {

    isSoundOn = this.initSound(true);

    config = {
        time: [0, 2, 0, 99],
        resetTime: [0, 0, 0, 99],
        maxLimit: [0, 0, 0, 99],
        incrementAmount: -1,
        limits: [0, -1, -1, -1],
        defaultVals: [59, 59, 59, 99],
        runOnMaxLimit: () => {
            if(this.isDisplayed && this.isSoundOn) this.playSound("beep");
            this.stop();
        }
    }


}