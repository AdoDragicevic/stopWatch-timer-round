//DOM manipulation

class Style {
        
    constructor() {
        
        this.runOnUpdateDisplay = [ 
            this.updateTitle,
            this.updateH1,
            this.updateInputs,
            this.disableInputs,
            this.updateLabel,
            this.updateBtnTxt,
            this.changeBgImg,  
            this.displayLastInput,
            this.displayLastInputBreak 
        ];

        this.runOnStart = [
            this.disableInputs,
            this.updateBtnTxt,
            this.updateLabel
        ];
        
        this.runOnReset = [
            this.updateTitle,
            this.updateH1,
            this.updateInputs,
            this.disableInputs,
            this.updateBtnTxt,
            this.updateLabel
        ];
        
        this.runOnStop = [
            this.updateBtnTxt
        ];
        
        this.runOnRunTime = [
            this.updateTitle,
            this.updateInputs
        ];
    
    }


    //show current time in browser tab
    updateTitle() {
        document.title = this.isRunning ? `${this.getCurrTimeStr(3)} | ${this.name}` : this.name;
    }


    updateH1() {
        document.querySelector("h1").innerText = this.name;
    }


    //ecah app runs its own time, when app is displayed display its time in HTML
    updateInputs() {
        this.inputs.forEach( (input, i) => input.value = this.getTwoDigitStr(this.runTimeData.time[i]) );
    }


    //if current app is not running and it allows users to change input, add/remove disable to inputs
    disableInputs() {
        if(!this.isRunning && !this.isDisableInputs) {
            for(let input of this.inputs) input.removeAttribute("disabled"); 
        }else{
            for(let input of this.inputs) input.setAttribute("disabled", true);
        }
    }


    updateInputLabelTxt(txt) {
        let labels = document.querySelectorAll(".inputs__label"); 
        if(!txt) for(let label of labels) label.innerText = "";
        else labels.forEach( (label, i) => label.innerText = txt[i] );
    }


    updateLabel() {
        let opacity = this.isRunning ? "0" : "1";
        document.querySelectorAll(".inputs__label").
        forEach( label => label.style.opacity = opacity);
    }


    showLabel() {
        document.querySelectorAll(".inputs__label").
        forEach( label => label.style.opacity = "0" );
    }


    updateBtnTxt() {        
        for(let btn of this.btns) btn.innerText = this.btnTxt[btn.id]();
    }

    
    changeBgImg() {
        document.body.setAttribute("class", `bg-img--${ this.name.toLowerCase() }`);
    }


    displayLastInput() {
        document.querySelector(".inputs__box:last-child").style.display = "";
    }


    displayLastInputBreak() {
        document.querySelector(".inputs__break--2").style.display = "";
    }

}