//DOM manipulation

class StyleRound extends Style {
        
    constructor() {
        
        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt.bind(this, ["minutes", "seconds", "rounds"])
        );
        
        this.runOnStart.push( 
            this.updateH1, 
            this.displayLastInput
        );

        this.runOnReset.push(
            this.displayLastInput
        );
        
    }


    updateTitle() {
        document.title = this.isRunning ? `${this.val[0]} : ${this.val[1]} | ${this.name} ${this.currRound}` : this.name;
    }


    updateH1() {
        document.querySelector(".header").innerText = this.isRunning ? `${this.name} ${this.currRound}` : this.name;
    }

    
    updateBtnTxt() {
        document.querySelector("#reset").innerText = ( () => {
            if(this.isRunning || this.isDisableInputs) return "Reset";
            return this.isSettingRoundTime ? "Set break" : "Set round";
        })();
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }
    
    
    //don't display ":" between seconds (second input) and rounds (last input)
    displayLastInputBreak() {
        document.querySelector(".inputs__break--2").style.visibility = "hidden";
    }


    displayLastInput() {
        let input = document.querySelector(".inputs__box:last-child");
        input.style.display = (this.isRunning || this.isDisableInputs) ? "none" : "";
    }
  
    
};