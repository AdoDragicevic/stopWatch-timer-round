//DOM manipulation

class StyleStopWatch extends Style {

    updateBtnTxt() {
        document.querySelector("#reset").innerText = this.isRunning ? "Lap" : "Reset";
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }
};