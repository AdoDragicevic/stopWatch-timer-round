/*
STAND ALONE code, can be used in other projects
Parameters: array of inputs (any number), array of apps (any number); array of btns (any number), switch btn (initiates change between apps);
Optional parameter: HTML title (e.g. h1; displays current app name)
Functionality:
    - switch between apps,
    - add event listeners to btns and inputs
    - redirect btn events to methods in currently running app (e.g. click on btn with id="reset" invokes reset method in current app (if it has that method))
    - store users input value to current app
    - DOM manipulation (change title, btn text, hide btns... based on current app) 
Requirements: app passed in as argument needs next properties: .isRunning, .numOfBtn, .btnTxt (optional: .name)
*/
class SwitchBetweenApps {
    constructor(inputsArr, appsArr, btnsArr, switchBtn, h1){
        //for each input add this.d1, this.d2, etc.; d is short for display
        this.inputs = inputsArr;
        this.inputs.forEach( (input, i) => {
            this["d" + (i+1)] = input;
            input.addEventListener("keyup", () => this.setDisplayManually());
        });
        this.apps = appsArr;
        //current app
        this.app = apps[0];
        switchBtn.addEventListener("click", () => this.switch());
        //for each btn (except switchBtn) redirects to adequate method in current app
        this.btns = btnsArr;
        //e.g. bnt with id="exit" invokes exit method in current app
        for(let btn of this.btns){
            let btnId = btn.id;
            btn.addEventListener("click", () => this.redirect(btnId));
        }
        if(h1) this.title = h1;
    }

    switch() {
        this.changeApp();
        this.updateDisplay();
        this.disableInputs();
        this.hideExcessBtns();
        this.setBtnTxt();
        if(this.title) this.updateTitle();
    };
    //if current app has a property named identical as the btnId, invoke it (e.g. btn with id="reset" invokes currentApp.reset())
    redirect(btnId) {
        if(this.app[btnId]) this.app[btnId]();
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
    hideExcessBtns() {
        for(let btn of this.btns){
            //if current app does not have a method named as the btn id, remove btn
            btn.style.display = this.app[btn.id] ? "" : "none";
        }
    };
    setBtnTxt() {
        for(let btn of this.btns){
            //if current app has a method named as the btn id, set text of that btn
            if(this.app[btn.id]) btn.innerText = this.app.setBtnTxt();
        }
    };
};