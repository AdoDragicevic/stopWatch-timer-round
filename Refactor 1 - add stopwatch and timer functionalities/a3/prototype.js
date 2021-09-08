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
        
        stop() {
            this.isRunning = false;
            clearInterval(this.interval);
            this.changeBtnText();
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