// Switch between apps; if apps use different inputs/btns pass all inputs and btns as arguments to the constructor;

class SwitchBetweenApps {    

    constructor(apps, btnSwitch = switchBtn, inputs = null, btns = null) {  

        apps[0].isDisplayed = true;
        apps[0].updateDisplay();
        btnSwitch.addEventListener( "click", () => this.updateDisplay( this.changeApp(apps), btns, inputs ) );

    }

    
    changeApp(apps) {
        let indx = apps.findIndex( app => app.isDisplayed === true);
        let currApp = apps[indx];
        currApp.isDisplayed = false;
        currApp = apps[indx + 1] ? apps[indx + 1] : apps[0];
        currApp.isDisplayed = true;
        return currApp;
    }

    
    updateDisplay(app, btns, inputs) {
        if(btns) this.hideExcessEl(app.btns, btns);
        if(inputs) this.hideExcessEl(app.inputs, inputs);
        this.hideAppSpecificContent(app);
        app.updateDisplay();
    }
    

    //hide elements (btns, inputs) app is not using
    hideExcessEl(appElements, elements) {
        for(let el of elements) el.style.display = appElements.includes(el) ? "" : "none";
    }


    //some apps have additional HTML content (div with id of that apps name), remove/display it
    hideAppSpecificContent(app) {
        let content = document.querySelectorAll(".app-specific-content > *");
        for(let div of content) {
            div.style.display = div.className.toLowerCase() === app.name.toLowerCase() ? "" : "none";
        }
    }


}