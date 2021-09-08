class Timer extends Time {

    runTimeData = {
        duration: 1000,
        maxLimit: [0, 0, 0],
        timeAmount: -1,
        limits: [0, -1, -1],
        defaultTime: 59,
        callback: () => this.stop 
    }

}