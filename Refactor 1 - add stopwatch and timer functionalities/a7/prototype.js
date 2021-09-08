// FUNCTION FACTORY - return prototype obj

function makeProto(time1, time2, time3, btnLeft, btnRight) {
    

    return {
        // d (short for display) holds the input value
        d1: time1,
        d2: time2,
        d3: time3,
        btnLeft: btnLeft,
        btnRight: btnRight,

        activate() {
            this.displayTime();
            this.changeBtnText();
            this.disableInput();
            
            this.d1.addEventListener("keyup", () => this.setTime());
            this.d2.addEventListener("keyup", () => this.setTime());
            this.d3.addEventListener("keyup", () => this.setTime());
            this.btnLeft.addEventListener("click", () => this.leftBtn());
            this.btnRight.addEventListener("click", () => this.rightBtn());
        },

        start(duration) {
            this.isRunning = true;
            this.tick(duration);
            this.changeBtnText();
        },

        tick(duration, callbackDuration) {
            this.interval = setInterval(() => {
                this.calcTime();
                this.displayTime();
                this.callback();            
            }, duration);
        },
        
        stop() {
            this.isRunning = false;
            clearInterval(this.interval);
            this.changeBtnText();
        },

        reset(methods) {
            this.isRunning = false;
            this.t1 = 0;
            this.t2 = 0;
            this.t3 = 0;
            this.displayTime(app);
            for(let arg of arguments) {
                arg();
            };
        },
        
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
        }
    };

}