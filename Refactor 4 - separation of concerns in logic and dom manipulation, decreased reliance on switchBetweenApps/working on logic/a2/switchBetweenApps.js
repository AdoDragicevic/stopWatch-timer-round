// Switch between apps, add & redirect listeners

class SwitchBetweenApps {    
    constructor(apps, inputsArr = inputs, btnsArr = buttons, btnSwitch = switchBtn) {        
        //switch between apps
        this.apps = [...apps];
        this.currentApp = this.apps[0];
        this.currentApp.isDisplayed = true;
        btnSwitch.addEventListener( "click", () => this.switch() );
        //add & redirect listeners
        this.inputs = inputsArr;
        this.btns = btnsArr;
        for(let btn of this.btns) btn.addEventListener( "click", () => this.currentApp[btn.innerText.toLowerCase()]() );
        for(let input of this.inputs) input.addEventListener( "input", () => this.currentApp.setTimeManually() );
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
        //this.hideExcessBtns();
        //this.hideExcessInputs();
        this.currentApp.updateDisplay();
        //this.currentApp.disableInputs(); ovo stavi pod update inputs
    }

    /*
    hideExcessBtns() {
        
    }

    hideExcessInputs() {
        
    }
    */

}