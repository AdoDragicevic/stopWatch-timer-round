//DOM manipulation

class StyleRound extends Style {
        
    constructor() {
        
        super();
        
        this.runOnStart.push( 
            this.displayLastInput, 
            this.updateH1withCurrRound 
        );

        this.runOnReset.push(
            this.displayLastInput
        );

        
    }
    
    //round counter doesn't display it when running
    displayLastInputBreak() {
        document.querySelector(".inputs__break--2").style.visibility = "hidden";
    }


    displayLastInput() {
        let input = document.querySelector(".inputs__box:last-child");
        input.style.display = (this.isRunning || this.isDisableInputs) ? "none" : "";
    }


    updateH1withCurrRound() {
        document.querySelector(".header").innerText = `${this.name} ${this.currRound}`;
    }
    
};