//DOM manipulation

class StyleTimer extends Style {

    constructor() {

        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt.bind(this, ["hours", "seconds", "ms"])
        );
    }


    updateBtnTxt() {
        document.querySelector("#reset").innerText = "Reset";
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }


};