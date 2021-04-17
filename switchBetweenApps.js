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
        for(let input of this.inputs) {
            input.addEventListener("input", (e) => {
                let allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", null];
                if( !allowedKeys.includes(e.data) ) input.value = null;
                this.currentApp.setTimeManually();
            });
        }

        //check if apps use identical inputs and btns
        this.appsUseIdenticalInputs = true;
        this.appsUseIdenticalBtns = true;
        for(let app of this.apps) {
            if(app.inputs.length !== this.inputs.length) this.appsUseIdenticalInputs = false;
            if(app.btns.length !== this.btns.length) this.appsUseIdenticalBtns = false;
        }
        
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
        this.hideAppSpecificContent();
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


    //some apps have additional HTML content (div with id of that apps name), remove/display it
    hideAppSpecificContent() {
        let content = document.querySelectorAll(".app-specific-content > *");
        for(let div of content) {
            div.style.display = div.className.toLowerCase() === this.currentApp.name.toLowerCase() ? "" : "none";
        }
    }


}