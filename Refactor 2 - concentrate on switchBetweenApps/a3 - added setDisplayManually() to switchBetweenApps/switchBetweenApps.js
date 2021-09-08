//Functionalities: switch betwen apps, redirect btn event listeners to current app, update data on screen
class SwitchBetweenApps {
    //arguments: h1 that will display current app; array of apps; switch btn that initiates change; btnLeft & btnRight
    constructor(h1, timeInputs, appsArr, switchBtn, lelftBtn, rightBtn){
        this.title = h1;
        this.apps = appsArr;
        this.app = apps[0];
        //for each input add this.d1, this.d2, etc.; d is short for display
        this.inputs = timeInputs;
        this.inputs.forEach( (input, i) => {
            this["d" + (i+1)] = input;
            input.addEventListener("keyup", () => this.setDisplayManually());
        });
        switchBtn.addEventListener("click", () => this.switch());
        lelftBtn.addEventListener("click", () => this.redirect(1));
        rightBtn.addEventListener("click", () => this.redirect(2));
    }

    switch() {
        this.changeApp();
        this.updateTitle();
        this.updateDisplay();
        this.disableInputs();
        this.setBtnTxt();
    };    
    redirect(num) {
        num === 1 ? this.app.btnLeft() : this.app.btnRight(); 
    };
    //when user sets time maually (if app is not running), save that time in current app
    setDisplayManually() {
        if(!this.app.isRunning){
            this.app.t1 = parseInt(this.d1.value);
            this.app.t2 = parseInt(this.d2.value);
            this.app.t3 = parseInt(this.d3.value); 
        } 
    };

    changeApp() {
        let indx = this.apps.indexOf(this.app);
        this.app = indx === this.apps.length -1 ? this.apps[0] : this.apps[indx+1];
    };
    updateTitle() {
        title.innerText = this.app.name.charAt(0).toUpperCase() + this.app.name.slice(1);
    };
    //ecah app runs its own time, when app is activated display that time in HTML
    updateDisplay() {
        this.d1.value = this.twoDigitNum(this.app.t1);
        this.d2.value = this.twoDigitNum(this.app.t2);
        this.d3.value = this.twoDigitNum(this.app.t3);
    };
    //in HTML, display nums as two digit (e.g. 1 as "01")
    twoDigitNum(num) {
        let n = num.toString();
        return n.length === 1 ? `0${n}`: n;
    };
    //if current app is not running, remove/add disable to inputs, if app does/doesn't allow user to set time
    disableInputs() {
        if(!this.app.isRunning){
            if(this.app.disabledInputs){
                for(let input of this.inputs) input.setAttribute("disabled", true);
            }else{
                for(let input of this.inputs) input.removeAttribute("disabled");
            }      
        }
    };
    setBtnTxt() {
        this.app.setBtnTxt();
    };
};