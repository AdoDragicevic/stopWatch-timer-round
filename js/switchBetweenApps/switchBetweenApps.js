// Switch between apps; add listeners to btnSwitch and left/right keyboard arrows; update dissplay (if apps use different inputs/btns pass all inputs/btns as args to constructor)

class SwitchBetweenApps {

    constructor(apps, btn = switchBtn) {  

        //display first app
        apps[0].isDisplayed = true;
        this.updateDisplay(apps[0]);

        //add listeners (click & arrow keys)
        btn.addEventListener( "click", () => this.updateDisplay(this.changeApp(apps)) );
        document.addEventListener( "keyup", e => {
            if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
                for(let input of document.querySelectorAll("input")) if(input === document.activeElement) return;
                let dirrection = e.key === "ArrowRight" ?  1 : -1;
                this.updateDisplay(this.changeApp(apps, dirrection));
            }
        });

        //check if apps use identical inputs/btns, return false or arr of unique values (inputs/btns)
        this.inputs = this.compare(apps, "inputs");
        this.btns = this.compare(apps, "btns");

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

    
    updateDisplay(app) {
        if(this.inputs) this.hideExcessEl(app.inputs, this.inputs);
        if(this.btns) this.hideExcessEl(app.btns, this.btns);
        this.hideAppSpecificContent(app);
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


    //check if apps use identical inputs/btns, return false or arr of unique values (inputs/btns)
    compare(apps, property) {
        let areNotSame = false;
        let vals = [ ...apps[0][property] ];
        for(let i = 1; i < apps.length; i++) {
            for(let el of apps[i][property]) {
                if(!vals.includes(el)) {
                    vals.push(el);
                    areNotSame = true;
                }
            }
        }
        return areNotSame ? vals : false; 
    }


}