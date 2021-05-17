//DOM manipulation

class StyleStopWatch extends Style {

    constructor() {

        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt
        );

        this.runOnReset.push(
            this.removeLaps
        );

    }


    updateBtnTxt() {
        document.querySelector("#reset").innerText = this.isRunning ? "Lap" : "Reset";
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }

    
    displayLaps() {
        let ul = document.querySelector(".laps-list");
        let li = document.createElement("li");
        li.innerText = this.getCurrTimeStr();
        ul.prepend(li);
    }


    removeLaps() {
        let displayedLaps = document.querySelectorAll(".laps-list li");
        for(let lap of displayedLaps) lap.remove();
    }


}