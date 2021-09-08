//DOM manipulation

class StyleTimer extends Style {

    constructor() {

        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt.bind(this, ["hours", "minutes", "seconds"])
        );
        
        this.runOnStart.push(
            this.runLine
        );

        this.runOnStop.push(
            this.pauseLine
        );

        this.runOnReset.push(
            this.resetLine
        );
        
    }


    updateBtnTxt() {
        document.querySelector("#reset").innerText = "Reset";
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }


    runLine() {
        let line = document.querySelector(".line");
        if(!this.lineInterval) {
            let [h, m, s] = this.runTimeData.time;
            let duration = ((h * 60 * 60) + (m * 60) + (s)) * 100;
            if(duration === 99) return;
            line.max = line.value = duration;
        }
        this.lineInterval = setInterval( () => {
            line.value <= 0 ? clearInterval(this.lineInterval) : line.value -= 1;
        }, 10);
    }


    pauseLine() {
        clearInterval(this.lineInterval);
    }


    resetLine() {
        clearInterval(this.lineInterval);
        this.lineInterval = null;
        let line = document.querySelector(".line");
        let interval = setInterval( () => {
            line.value >= line.max ? clearInterval(interval) : line.value += 10;
        }, 10);
    }


}