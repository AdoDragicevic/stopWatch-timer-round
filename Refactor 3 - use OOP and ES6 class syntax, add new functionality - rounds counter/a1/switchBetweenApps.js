/*
EXPLANATION
Parameters: array of inputs, array of btns (except switchBtn), switch btn (initiates change between apps), header
Functionality:
    - switch between apps,
    - keep track of current app,
    - add event listeners,
    - redirect events (i.e. btn with id="reset" invokes reset method in currenlty running app)
    - DOM manipulation (change title, input value, number of inputs and btns, btn text... e.g. inputs & buttons wholse ID does not correspond 
      to any of currently running app's methods are not displayed)
Requirements: 
    - apps are added to the apps property on this obj
    - apps prototype needs to be this obj (or obj whose prototype is this obj) if they want access to inputs
    - apps need these properties: .isRunning (boolean), .currApp (boolean) .btnTxt (obj), .name (txt)
    - btns and inputs passed in as arguments should have an HTML ID
*/

function switchBetweenApps(inputs, btns, switchBtn, h1) {
    
    //prototype obj
    const obj = {
        
        //INPUTS
        inputs: inputs,
        btns: btns,
        header: h1,

        //SWITCH BETWEEN APPS        
        apps: [],
        app: app[0],

        obj.switch = function() {
            this.changeApp();
            this.app.updateValue();
            this.app.disableInputs();
            this.app.hideExcessBtns();
            this.app.hideExcessInputs();
            this.app.setBtnTxt();
            this.app.updateHeader();
            //this.app.updateTitle(); - mislim da update title možeš s this.updateTitle(this.app.currVal());
            //if(this.app.whenActivated) this.app.whenActivated();
        },
        
        obj.changeApp = function() {
            this.app.active = false;
            let indx = this.apps.indexOf(this.app);
            this.app = indx === this.apps.length -1 ? this.apps[0] : this.apps[indx+1];
            this.app.active = true;
        },
        
        //ecah app runs its own time, when app is activated display that time in HTML
        updateValue() {
            for(let input of this.inputs) {
                if(this.app[input.id]) input.value = this.twoDigitNum( this.app[input.id] );
            }  
        },
        
        //in HTML, display nums as two digit (e.g. 1 as "01")
        twoDigitNum(num) {
            let n = num.toString();
            return n.length === 1 ? `0${n}`: n;
        },

        //if current app is not running and allows users to change input, add/remove disable to inputs
        disableInputs() {
            if(!this.app.isRunning && !this.app.disableInputs) {
                for(let input of this.inputs) input.removeAttribute("disabled"); 
            }else{
                for(let input of this.inputs) input.setAttribute("disabled", true);
            }
        },

        updateHeader() {
            this.title.innerText = this.app.name.charAt(0).toUpperCase() + this.app.name.slice(1);
        },


        //DISPLAY RELEVANT INPUTS & BUTTONS

        //if current app does not have a method named as the btn id, remove btn
        hideExcessBtns() {
            for(let btn of this.btns) btn.style.display = this.app[btn.id] ? "" : "none";
        },

        //hide HTML inputs curr app is not using
        hideExcessInputs() {
            for(let input of this.inputs) input.style.display = this.app[input.id] ? "" : "none";
        },


        //REDIRECT BUTTON CLIC TO RELEVANT APP

        //if current app has a property named identical as the btnId, invoke it (e.g. btn with id="reset" invokes currentApp.reset())
        redirect(btnId) {
            if(this.app[btnId]) this.app[btnId]();
            this.setBtnTxt();
            this.disableInputs();
        },

        //if current app has a method/property named as btn id, set text of that btn
        setBtnTxt() {
            for(let btn of this.btns){
                if(this.app.btnTxt[btn.id]) btn.innerText = this.app.btnTxt[btn.id]();
            }
        }

    };


    //ADD EVENT LISTENERS

    //each btn (except switchBtn) redirects to adequate method in current app; e.g. bnt with id="exit" invokes exit method in currApp
    for(let btn of btns) btn.addEventListener( "click", () => obj.redirect(btn.id) );
    for(let input of inputs) input.addEventListener( "input", () => { obj.setDisplayManually(); obj.setBtnTxt(); } );
    switchBtn.addEventListener( "click", () => this.switch() );


    return obj;
}