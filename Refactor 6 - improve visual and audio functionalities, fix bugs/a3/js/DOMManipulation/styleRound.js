//DOM manipulation

class StyleRound extends Style {
        
    constructor() {
        
        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt.bind(this, ["minutes", "seconds", "rounds"]),
            this.displayCircle,
            this.displayNumOfRounds
        );
        
        this.runOnStart.push( 
            this.updateH1, 
            this.displayLastInput,
            this.displayCircle,
            this.updateCircleColor,
            this.updateCircleData,
            this.runCircle,
        );

        this.runOnStop.push(
            this.stopCircle,
            this.updateCircleData
        )

        this.runOnReset.push(
            this.displayLastInput,
            this.displayNumOfRounds,
            this.displayCircle,
            this.updateCircleData,
            this.updateCircleColor,
            this.resetCircle
        );

        this.runOnMaxLimit = [
            this.stopCircle,   
            this.resetCircle,
            this.updateCircleColor,
            this.runCircle
        ];
        
    
    }


    updateTitle() {
        let {time, currRound} = this.runTimeData;
        let minutes = this.getTwoDigitStr(time[0]);
        let seconds = this.getTwoDigitStr(time[1]);
        document.title = this.isRunning ? `${minutes} : ${seconds} | Round ${currRound}` : this.name;
    }


    updateH1() {
        document.querySelector(".header").innerText = this.isRunning ? `${this.name} ${this.runTimeData.currRound}` : this.name;
    }

    
    updateBtnTxt() {
        document.querySelector("#reset").innerText = ( () => {
            if(this.isRunning || this.isDisableInputs) return "Reset";
            return this.runTimeData.isSettingBreakTime ? "Set round" : "Set break";
        })();
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }
    
    
    //don't display ":" between seconds (second input) and rounds (last input)
    displayLastInputBreak() {
        document.querySelector(".inputs__break--2").style.display = "none";
    }


    displayLastInput() {
        let input = document.querySelector(".inputs__box:last-child");
        input.style.display = (this.isRunning || this.isDisableInputs) ? "none" : "";
    }

    
    displayNumOfRounds() {
        this.inputs[this.inputs.length - 1].value = this.runTimeData.numOfRounds;
    }


    displayCircle() {
        document.querySelector(".svg").style.display = this.isRunning ? "" : "none";
    }
  

    updateCircleColor() {
        document.querySelector(".svg__circle").style.stroke = this.runTimeData.isCountingBreakTime ? "green" : "red";
    }


    updateCircleData = (runTimeData) => {
        if(!this.circleData) {
            this.circleData = { el: document.querySelector(".svg__circle") }
            window.addEventListener("resize", () => this.updateCircleDataOnScreenResize(runTimeData));
        }
        this.circleData.radius = ( () => {
            let r = this.circleData.el.getAttribute("r");
            return parseInt( r.slice(0, r.indexOf("px")) );
        })();
        this.circleData.perimeter = this.circleData.radius * Math.PI * 2;
    }


    updateCircleDataOnScreenResize(runTimeData) {
        this.stopCircle();
        this.updateCircleData();
        this.runCircle(runTimeData);
    }


    runCircle = (runTimeData) => {
        let duration = this.getDuration(runTimeData);
        let offsetPerInterval = this.circleData.perimeter / duration;
        this.circleData.circleInterval = setInterval( () => {
            const currOffset = parseFloat(this.circleData.el.getAttribute("stroke-dashoffset"));
            if( Math.abs(currOffset) >= this.circleData.perimeter ) clearInterval(this.circleData.circleInterval);
            else this.circleData.el.setAttribute("stroke-dashoffset", currOffset - offsetPerInterval);
        }, 10);
    }


    getDuration(runTimeData) {
        let {isCountingBreakTime, break: breakTime, time: roundTime} = runTimeData;
        let sorce = isCountingBreakTime ? breakTime : roundTime;
        let [m, s] = sorce;
        let duration = (m * 60 + s) * 100;
        return duration;
    }


    stopCircle = () => {
        clearInterval(this.circleData.circleInterval);
    }


    resetCircle = () => {
        this.circleData.el.setAttribute("stroke-dashoffset", 0);
        this.circleData.circleInterval = null;
    }


}