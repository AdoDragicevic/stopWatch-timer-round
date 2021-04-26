//DOM manipulation

class StyleTimer extends Style {

    constructor() {

        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt.bind(this, ["hours", "minutes", "seconds"])
        );

        this.runOnRunTime.push(
            this.runLine
        );

    }


    updateBtnTxt() {
        document.querySelector("#reset").innerText = "Reset";
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }


    runLine() {
        let line = document.querySelector(".line");
        console.log(line);
        line.value = "12"
    }


};