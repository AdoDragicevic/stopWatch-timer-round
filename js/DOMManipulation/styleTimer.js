//DOM manipulation

class StyleTimer extends Style {

    updateBtnTxt() {
        document.querySelector("#reset").innerText = "Reset";
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }

};