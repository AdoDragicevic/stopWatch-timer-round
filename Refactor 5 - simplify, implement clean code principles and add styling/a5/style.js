//DOM manipulation methods

class DOMManipulation {
        
    constructor() {
        this.runOnUpdateDisplay = [ this.changeBgImg, this.displayLastInputBreak, this.displayLastInput ];
        this.runOnStart = [];
        this.runOnReset = [];
        this.runOnStop = [];
        this.runOnInterval = [];
    }


    changeBgImg() {
        document.body.setAttribute("class", `bg-img--${ this.name.toLowerCase() }`);
    }

        
    //round counter doesn't display it when running
    displayLastInputBreak() {
        document.querySelector(".inputs__break--2").style.visibility = "";
    }


    displayLastInput() {
        document.querySelector(".inputs__box:last-child").style.display = "";
    }


}



    //Extends
    class TimerDOMManipulation extends Style {};
    class StopWatchDOMManipulation extends Style {};
    class RoundDOMManipulation extends Style {
        
        constructor() {
            super();
            this.runOnStart.push( this.displayLastInput, this.updateH1withCurrRound );
        }
        
        //round counter doesn't display it when running
        displayLastInputBreak() {
            document.querySelector(".inputs__break--2").style.visibility = "hidden";
        }

        displayLastInput() {
            let input = document.querySelector(".inputs__box:last-child");
            input.style.display = this.isDisableInputs ? "none" : "";
        }

        updateH1withCurrRound() {
            document.querySelector(".header").innerText = `${this.name} ${this.currRound}`;
        }
        
    };