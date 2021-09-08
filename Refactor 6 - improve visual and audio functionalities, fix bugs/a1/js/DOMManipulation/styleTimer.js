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
        if(!this.style.animationInterval) {
            let [h, m, s, ms] = this.runTimeData.resetTime;
            let duration = ( (h * 60 * 60 * 100) + (m * 60 * 100) + (s * 100) + ms);
            console.log(duration);
            if(duration === 99) return;
            line.max = line.value = duration;
        }
        this.style.lineInterval = setInterval( () => {
            line.value <= 0 ? clearInterval(this.style.lineInterval) : line.value -= 1;
        }, 10);
    }


    pauseLine() {
        clearInterval(this.style.lineInterval);
    }


    resetLine() {
        clearInterval(this.style.lineInterval);
        this.lineInterval = null;
        let line = document.querySelector(".line");
        let interval = setInterval( () => {
            line.value >= line.max ? clearInterval(interval) : line.value += 1;
        }, 10);
    }


}