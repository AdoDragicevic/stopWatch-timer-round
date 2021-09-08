class StopWatch extends Time {

    
    btnTxt = {
        //btn id : text
        reset: () => this.isRunning ? "Lap" : "Reset",
        start: () => this.isRunning ? "Stop" : "Start"
    }


    //count m/s/ms or h/m/s
    hours = false;


    //if hours is true
    runTimeData1 = {
        duration: 1000,
        maxLimit: [99, 0, 0],
        timeAmount: 1,
        limits: [100, 60, 60],
        defaultTime: 0,
        callback: this.stop
    }
    
    
    //if hours is false
    runTimeData2 = {
        duration: 10,
        maxLimit: null,
        timeAmount: 1,
        limits: [60, 60, 100],
        defaultTime: 0,
        callback: () => { this.reset(1, 0, 0); this.hours = true; this.removeLaps(); this.start(); }
    }


    laps = [];


    //additional function to run when app is reset
    runOnReset = () => {
        this.removeLaps(); 
        this.resetVal[0] = 0;
        this.hours = false;
    }


    //generate runTimeData obj
    runTimeData() {
        return this.hours ? this.runTimeData1 : this.runTimeData2;
    }


    lap() {
        this.laps.unshift(this.currVal());
        this.displayLaps();
    }


    displayLaps() {
        let ul = document.querySelector(".laps-list");
        let li = document.createElement("li");
        li.innerText = this.laps[0];
        ul.prepend(li);
    }


    removeLaps() {
        this.laps.length = 0;
        let displayedLaps = document.querySelectorAll(".laps-list li");
        for(let lap of displayedLaps) lap.remove();
    }


}