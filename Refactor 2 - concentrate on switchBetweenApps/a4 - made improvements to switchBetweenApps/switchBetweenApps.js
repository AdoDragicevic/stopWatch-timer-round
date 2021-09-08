//Stand-alone code, can be used for other projects
//Functionality: switch betwen apps, add event listeners to btns and redirect events to current app, update data on screen, store input val to current app
//Parameters: HTML title; array of inputs, array of apps; switch btn (initiates change); array of btns the apps use
//Requirements: app passed in as argument needs: .name, .isRunning, .numOfBtn, .btn, .btnTxt
class SwitchBetweenApps {
    constructor(h1, inputsArr, appsArr, btnsArr, switchBtn){
        this.title = h1;
        this.apps = appsArr;
        this.app = apps[0];
        //for each input add this.d1, this.d2, etc.; d is short for display
        this.inputs = inputsArr;
        this.inputs.forEach( (input, i) => {
            this["d" + (i+1)] = input;
            input.addEventListener("keyup", () => this.setDisplayManually());
        });
        switchBtn.addEventListener("click", () => this.switch());
        //for each btn (except switchBtn) redirects to adequate method in current app
        this.btns = btnsArr;
        this.btns.forEach( (btn, i) => {
            let btnNum = i + 1;
            btn.addEventListener("click", () => this.redirect(btnNum));
        });
    }

    switch() {
        this.changeApp();
        this.updateTitle();
        this.updateDisplay();
        this.disableInputs();
        this.hideExcessBtns();
        this.setBtnTxt();
    };    
    redirect(num) {
        this.app.btn(num);
        this.setBtnTxt();
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
        console.log(this.app.numOfBtn);
        this.btns.forEach( (btn, i) => {
            let atr = i < this.app.numOfBtn ? "" : "none";
            btn.style.display = atr;  
        });
    };
    setBtnTxt() {
        for(let i = 0; i < this.app.numOfBtn; i++){
            this.btns[i].innerText = this.app.setBtnTxt();
        }
    };
};