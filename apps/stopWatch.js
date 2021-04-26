class StopWatch extends Time {

    //count m/s/ms or h/m/s (after 59m, 59s 99,ms start counting from 0h, 0m, 0s)
    isCountingHours = false;


    //if isCountingHours is true
    runTimeData1 = {
        duration: 1000,
        maxLimit: [99, 0, 0],
        timeAmount: 1,
        limits: [100, 60, 60],
        defaultTime: 0,
        callback: this.stop
    }
    
    
    //if isCountingHours is false
    runTimeData2 = {
        duration: 10,
        maxLimit: null,
        timeAmount: 1,
        limits: [60, 60, 100],
        defaultTime: 0,
        callback: () => { this.reset(1, 0, 0); this.isCountingHours = true; this.removeLaps(); this.start(); }
    }


    laps = [];


    //additional function to run when app is reset
    runOnReset = () => {
        this.removeLaps(); 
        this.resetVal[0] = 0; // check what this line does!!
        this.isCountingHours = false;
    }


    //generate runTimeData obj
    runTimeData() {
        return this.isCountingHours ? this.runTimeData1 : this.runTimeData2;
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