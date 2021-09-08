/*
STAND ALONE code, can be used in other projects
Parameters: array of inputs (any number), array of apps (any number); array of btns (any number), switch btn (initiates change between apps);
Optional parameter: HTML title (e.g. h1; displays current app name)
Functionality:
    - switch between apps,
    - keep track of currently running app,
    - add event listeners to inputs and btns,
    - redirect btn events to currently running app's methods (e.g. click on btn with id="reset" invokes reset method in app that is currently
      running); this enables using identical HTML btns for different apps, instead of changing btns and adding new event listeners for each 
      app (i.e. with SwtichBetweenApps different methods are invoked with same events, depending on the currently running app)
    - store users input value to current app,
    - DOM manipulation (change title, input value, number of inputs and btns, btn text... based on current app)
Requirements: 
    - apps passed in as argument need next properties: .isRunning (boolean), .setBtnTxt (txt), .name (txt; optional)
    - btns passed in as arguments should have an ID (i.e. btn with id="reset" invokes reset method in currenlty running app; buttons wholse 
      ID does not correspond to any of currently running app's methods are not displayed - this allows for different apps to have different 
      number of btns)
*/
class SwitchBetweenApps {
    constructor(inputsArr, appsArr, btnsArr, switchBtn, h1){
        //for each input add this.d1, this.d2, etc.; d is short for display
        this.inputs = inputsArr;
        this.inputs.forEach( (input, i) => {
            this["input" + (i+1)] = input;
            input.addEventListener("keypress", () => this.setDisplayManually());
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
        this.hideExcessInputs();
        this.setBtnTxt();
        if(this.title) this.updateTitle();
    };
    //if current app has a property named identical as the btnId, invoke it (e.g. btn with id="reset" invokes currentApp.reset())
    redirect(btnId) {
        if(this.app[btnId]) this.app[btnId]();
        this.setBtnTxt();
    };
    //when user sets input maually (if app is not running), save that value in current app
    setDisplayManually() {
        if(!this.app.isRunning){
            //for each input, update current app's v1, v2, v3... to match the inputs value (v is short for value)
            this.inputs.forEach( (input, i) => this.app[ "v" +(i+1) ] = parseInt(input.value) );
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
        this.inputs.forEach( (input, i) => input.value = this.twoDigitNum( this.app["v" +(i+1)] ));
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

    hideExcessInputs() {
        //hide HTML inputs curr app is not using
        this.inputs.forEach( (input, i) => input.style.display = this.app["v" + (i+1)] ? "" : "none" );
    }

    setBtnTxt() {
        for(let btn of this.btns){
            //if current app has a value identical as the btn id, set text of that btn
            if(this.app.btnTxt[btn.id]) btn.innerText = this.app.isRunning ? this.app.btnTxt[btn.id].active : this.app.btnTxt[btn.id].inactive;
        }
    };
};