//DOM manipulation

class Style {
        
    constructor() {
        
        this.runOnUpdateDisplay = [ 
            this.updateTitle,
            this.updateH1,
            this.updateInputs,
            this.disableInputs,
            this.updateBtnTxt,
            this.changeBgImg,  
            this.displayLastInput,
            this.displayLastInputBreak 
        ];

        this.runOnStart = [
            this.disableInputs,
            this.updateBtnTxt
        ];
        
        this.runOnReset = [
            this.updateTitle,
            this.updateH1,
            this.updateInputs,
            this.disableInputs,
            this.updateBtnTxt
        ];
        
        this.runOnStop = [
            this.disableInputs,
            this.updateBtnTxt
        ];
        
        this.runOnRunTime = [
            this.updateTitle,
            this.updateInputs
        ];
    
    }


    //show current time in browser tab
    updateTitle() {
        document.title = this.isRunning ? `${this.currVal()} | ${this.name}` : this.name;
    }

    updateH1() {
        document.querySelector("h1").innerText = this.name;
    }

    //ecah app runs its own time, when app is displayed display its time in HTML
    updateInputs() {
        this.inputs.forEach( (input, i) => input.value = this.twoDigitNum(this.val[i]) );
    }

    //if current app is not running and it allows users to change input, add/remove disable to inputs
    disableInputs() {
        if(!this.isRunning && !this.isDisableInputs) {
            for(let input of this.inputs) input.removeAttribute("disabled"); 
        }else{
            for(let input of this.inputs) input.setAttribute("disabled", true);
        }
    }

    updateBtnTxt() {        
        for(let btn of this.btns) btn.innerText = this.btnTxt[btn.id]();
    }

    changeBgImg() {
        document.body.setAttribute("class", `bg-img--${ this.name.toLowerCase() }`);
    }


    displayLastInputBreak() {
        document.querySelector(".inputs__break--2").style.visibility = "";
    }


    displayLastInput() {
        document.querySelector(".inputs__box:last-child").style.display = "";
    }


}