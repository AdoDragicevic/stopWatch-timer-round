// FUNCTION FACTORY - return prototype obj

function makeProto(time1, time2, time3, btnLeft, btnRight) {
    
    return {
        
        d1: time1,
        d2: time2,
        d3: time3,
        btnLeft: btnLeft,
        btnRight: btnRight,

        activate() {
            this.displayTime();
            this.btnLeft.addEventListener("click", () => this.leftBtn());
            this.btnRight.addEventListener("click", () => this.rightBtn());   
        },

        start(duration) {
            this.isRunning = true;
            this.tick(duration);
            this.changeBtnText();
        },

        tick(duration) {
            this.interval = setInterval(() => {
                this.calcTime();
                this.displayTime();            
            }, duration);
        },
        
        stop() {
            this.isRunning = false;
            clearInterval(this.interval);
            this.changeBtnText();
        },

        reset() {
            this.isRunning = false;
            this.t1 = 0;
            this.t2 = 0;
            this.t3 = 0;
            this.displayTime();
            for(let arg of arguments) {
                arg();
            };
        },
        
        // in HTML, display nums as two digit (e.g. 1 as "01")
        displayTime() {
            this.d1.value = this.twoDigitNum(this.t1);
            this.d2.value = this.twoDigitNum(this.t2);
            this.d3.value = this.twoDigitNum(this.t3);
        },
        
        // Every num, when displayed, must be 2 digit
        twoDigitNum(num) {
            let n = num.toString();
            return n.length === 1 ? `0${n}`: n;
        }

    };

}