class Timer extends Time {

    //default value
    v1 = 24;

    btnTxt = {
        //btn id : text
        reset: () => "Reset",
        start: () => this.isRunning ? "Stop" : "Start"
    }

    runTimeData = {
        duration: 1000,
        maxLimit: [0, 0, 0],
        timeAmount: -1,
        limits: [0, -1, -1],
        defaultTime: 59,
        callback: this.stop 
    }

}