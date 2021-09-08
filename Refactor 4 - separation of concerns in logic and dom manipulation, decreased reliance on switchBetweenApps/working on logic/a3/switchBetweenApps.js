// Switch between apps, add & redirect listeners, if apps use different inputs/btns display needed inputs/btns

class SwitchBetweenApps {    

    constructor(appsArr, inputsArr = inputs, btnsArr = buttons, btnSwitch = switchBtn) {        
    
        //switch between apps
        this.apps = appsArr;
        this.currentApp = this.apps[0];
        this.currentApp.isDisplayed = true;
        btnSwitch.addEventListener( "click", () => this.switch() );
    
        //add & redirect listeners
        this.inputs = inputsArr;
        this.btns = btnsArr;
        for(let btn of this.btns) btn.addEventListener( "click", () => this.currentApp[btn.innerText.toLowerCase()]() );
        for(let input of this.inputs) input.addEventListener( "input", () => this.currentApp.setTimeManually() );
    
        //check if apps use identical inputs and btns
        this.appsUseIdenticalInputs = (() => {
            for(let app of this.apps) {
                if(app.inputs.length !== this.inputs.length) return false;
            }
            return true;           
        })();
        this.appsUseIdenticalBtns = (() => {
            for(let app of this.apps) {
                if(app.btns.length !== this.btns.length) return false;
            }
            return true;
        })();
    }


    switch() {
        this.changeApp();
        this.updateDisplay();
    }

    
    changeApp() {
        this.currentApp.isDisplayed = false;
        let indx = this.apps.indexOf(this.currentApp);
        this.currentApp = indx === this.apps.length -1 ? this.apps[0] : this.apps[indx+1];
        this.currentApp.isDisplayed = true;
    }


    updateDisplay() {
        if(!this.appsUseIdenticalBtns) this.hideExcessBtns();
        if(!this.appsUseIdenticalInputs) this.hideExcessInputs();
        this.currentApp.updateDisplay();
    }

    
    hideExcessBtns() {
        for(let btn of this.btns) {
            btn.style.display = (this.currentApp.btns.includes(btn)) ? "" : "none";
        }
    }


    hideExcessInputs() {
        for(let input of this.inputs) {
            input.style.display = (this.currentApp.inputs.includes(input)) ? "" : "none";
        }
    }


}