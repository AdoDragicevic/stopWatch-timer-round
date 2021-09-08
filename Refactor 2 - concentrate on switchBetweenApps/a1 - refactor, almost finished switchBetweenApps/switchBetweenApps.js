class SwitchBetweenApps {
    //arguments: h1 that will display current app; array of apps; switch btn that initiates change; btnLeft & btnRight
    constructor(h1, appsArr, switchBtn, lelftBtn, rightBtn){
        this.title = h1;
        this.apps = appsArr;
        this.app = apps[0];
        switchBtn.addEventListener("click", () => this.switch());
        lelftBtn.addEventListener("click", () => this.redirect(1));
        rightBtn.addEventListener("click", () => this.redirect(2));
    }

    switch(){
        this.changeApp();
        this.changeTitle();
        this.changeDisplay();
    };    
    redirect(num){
        num === 1 ? this.app.btnLeft() : this.app.btnRight(); 
    };

    changeApp(){
        let indx = this.apps.indexOf(this.app);
        this.app = indx === this.apps.length -1 ? this.apps[0] : this.apps[indx+1];
    };
    changeTitle(){
        title.innerText = this.app.name.charAt(0).toUpperCase() + this.app.name.slice(1);
    };
    changeDisplay(){
        console.log("im still empty");
    };
};





/*
OVO JE ZA displayTime() funkciju gore!
// in HTML, display nums as two digit (e.g. 1 as "01")
        displayTime() {
            if(app === 1){
                this.d1.value = this.twoDigitNum(stopwatch.t1);
                this.d2.value = this.twoDigitNum(stopwatch.t2);
                this.d3.value = this.twoDigitNum(stopwatch.t3);
            }
            else{
                this.d1.value = this.twoDigitNum(timer.t1);
                this.d2.value = this.twoDigitNum(timer.t2);
                this.d3.value = this.twoDigitNum(timer.t3);
            }
        },
        
        // Every num, when displayed, must be 2 digit
        twoDigitNum(num) {
            let n = num.toString();
            return n.length === 1 ? `0${n}`: n;
        },

        disableInput() {
            for(let input of inputs) {
                input.disabled = input.disabled === true ? false : true;
            }
        },
*/