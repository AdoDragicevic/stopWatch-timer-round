//DOM manipulation

class StyleStopWatch extends Style {

    constructor() {

        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt
        );

    }


    updateBtnTxt() {
        document.querySelector("#reset").innerText = this.isRunning ? "Lap" : "Reset";
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }


}