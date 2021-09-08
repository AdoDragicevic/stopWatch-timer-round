function stopWatch(prototype) {

    const obj = construct(prototype, "StopWatch", )

    //true = count h/m/s; false = count m/s/ms 
    hours = false;

    btnTxt = {
        btnLeft: () => this.isRunning ? "Lap" : "Reset",
        btnRight: () => this.isRunning ? "Stop": "Start"
    };

    //btn functionality changes depending on isRunning
    btnRight() {
        if( this.isRunning ) {
            return this.stop();
        }else if( !this.checkLimit([99, 0, 0]) ){
            let duration = this.hours ? 1000 : 10;
            let maxLimit = this.hours ? [99, 0, 0] : null; 
            let limit = this.hours ? [100, 60, 60] : [60, 60, 100]; 
            let callback = this.hours ? this.stop : () => { this.stop(); this.reset(1, 0, 0); this.hours = true; this.displayLap(); this.start(1000); }
            this.runTime(duration, () => ++this["v" + this.inputs.length], maxLimit, limit, callback);
        }
    };

    btnLeft() {
        this.isRunning ? this.displayLap(this.currVal()) : (() => { this.reset(); this.displayLap(); this.hours = false; })();
    };

    //btnRight
    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
    };

        //bntLeft
        displayLap(text) {
            let ul = document.querySelector(".laps-list");
            // add new lap
            if(text){
                let li = document.createElement("li");
                li.innerText = text;
                ul.appendChild(li);
            // or delete all laps if no argument is passed
            }else{
                let laps = document.querySelectorAll(".laps-list li");
                for(let li of laps) ul.removeChild(li);
            }
        };

}

class StopWatch extends Time {



    



}