// Switch between apps; add listeners to btnSwitch and left/right keyboard arrows; update dissplay (if apps use different inputs/btns pass all inputs/btns as args to constructor)

class SwitchBetweenApps {    

    constructor(apps, btnSwitch = switchBtn, btns = null, inputs = null) {  

        this.apps = apps;

        apps[0].isDisplayed = true;
        this.updateDisplay( apps[0], btns, inputs);

        btnSwitch.addEventListener( "click", () => this.updateDisplay( this.changeApp(apps), btns, inputs) );
        
        //change apps with arrow keys, if inputs not focused
        document.addEventListener( "keyup", e => {
            if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
                for(let input of document.querySelectorAll("input")) if(input === document.activeElement) return;
                let dirrection = e.key === "ArrowRight" ?  1 : -1;
                this.updateDisplay( this.changeApp(apps, dirrection), btns, inputs );
            }
        });

    }

    
    changeApp(apps, dirrection = 1) {
        let indx = apps.findIndex( app => app.isDisplayed === true);
        let currApp = apps[indx];
        currApp.isDisplayed = false;
        currApp = apps[indx + dirrection];
        if(!currApp) currApp = dirrection === 1 ? apps[0] : apps[apps.length - 1];
        currApp.isDisplayed = true;
        return currApp;
    }

    
    updateDisplay(app, btns, inputs) {
        if(btns) this.hideExcessEl(app.btns, btns);
        if(inputs) this.hideExcessEl(app.inputs, inputs);
        this.hideAppSpecificContent(app);
        //this.changeCustomCSS(app.name);
        app.updateDisplay();
    }
    

    //hide elements (btns, inputs) app is not using
    hideExcessEl(appElements, elements) {
        for(let el of elements) el.style.display = appElements.includes(el) ? "" : "none";
    }


    //some apps have additional HTML content (div with id of that apps name), remove/display it
    hideAppSpecificContent(app) {
        for(let el of document.querySelectorAll(".app-specific-content > *")) {
            el.style.display = el.id.toLowerCase() === app.name.toLowerCase() ? "" : "none";
        }
    }


    //change href of custom CSS stylesheet
    changeCustomCSS(appName) {
        document.querySelector("#app-specific-CSS").setAttribute("href", `${appName.toLowerCase()}.css`);
    }

}