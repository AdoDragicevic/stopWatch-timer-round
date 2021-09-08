//DOM manipulation

class StyleRound extends Style {
        
    constructor() {
        
        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt.bind(this, ["minutes", "seconds", "rounds"]),
            this.resizeCircle,
            this.displayCircle,
            this.displayNumOfRounds,
        );
        
        this.runOnStart.push( 
            this.updateH1, 
            this.displayLastInput,
            this.displayCircle,
            this.updateCircleColor,
            this.runCircle,
        );

        this.runOnStop.push(
            this.stopCircle
        )

        this.runOnReset.push(
            this.displayLastInput,
            this.displayNumOfRounds,
            this.displayCircle,
            this.updateCircleColor,
            this.resetCircle
        );

        this.runOnMaxLimit = [
            this.stopCircle,   
            this.resetCircle,
            this.updateCircleColor,
            this.runCircle
        ];
        
        window.addEventListener("resize", this.resizeCircle);
    
    }


    updateTitle() {
        let {time, currRound} = this.config;
        let minutes = this.getTwoDigitStr(time[0]);
        let seconds = this.getTwoDigitStr(time[1]);
        document.title = this.isRunning ? `${minutes} : ${seconds} | Round ${currRound}` : this.name;
    }


    updateH1() {
        document.querySelector(".header").innerText = this.isRunning ? `${this.name} ${this.config.currRound}` : this.name;
    }

    
    updateBtnTxt() {
        document.querySelector("#reset").innerText = ( () => {
            if(this.isRunning || this.isDisableInputs) return "Reset";
            return this.config.isSettingBreakTime ? "Set round" : "Set break";
        })();
        document.querySelector("#start").innerText = this.isRunning ? "Stop" : "Start";
    }
    
    
    displayLastInputBreak() {
        document.querySelector(".inputs__break--2").style.display = "none";
    }


    displayLastInput() {
        let input = document.querySelector(".inputs__box:last-child");
        input.style.display = (this.isRunning || this.isDisableInputs) ? "none" : "";
    }

    
    displayNumOfRounds() {
        this.inputs[this.inputs.length - 1].value = this.config.numOfRounds;
    }


    resizeCircle = config => {
        const circle = document.querySelector(".svg__circle");
        const radius = circle.getAttribute("r");
        if(window.innerWidth > 575 && radius !== "230px") circle.setAttribute("r", "230px");
        else if(window.innerWidth < 574 && radius !== "140px") circle.setAttribute("r", "140px");
        else return;
        this.updateCircleData();
        this.stopCircle();
        this.runCircle(config);
    }


    displayCircle() {
        document.querySelector(".svg").style.display = this.isRunning ? "" : "none";
    }
  

    updateCircleColor() {
        document.querySelector(".svg__circle").style.stroke = this.config.isCountingBreakTime ? "green" : "red";
    }


    updateCircleData = () => {
        if(!this.circleData) this.circleData = { el: document.querySelector(".svg__circle") };
        this.circleData.radius = ( () => {
            let r = this.circleData.el.getAttribute("r");
            return parseInt( r.slice(0, r.indexOf("px")) );
        })();
        this.circleData.perimeter = this.circleData.radius * Math.PI * 2;
    }


    runCircle = (config) => {
        let duration = this.getDuration(config);
        let offsetPerInterval = this.circleData.perimeter / duration;
        //just deduct the percentage of total time from current time when runCircle starts
        //...because of resizing the cirlce on screen resize
        this.circleData.circleInterval = setInterval( () => {
            const currOffset = parseFloat(this.circleData.el.getAttribute("stroke-dashoffset"));
            if( Math.abs(currOffset) >= this.circleData.perimeter ) clearInterval(this.circleData.circleInterval);
            else this.circleData.el.setAttribute("stroke-dashoffset", currOffset - offsetPerInterval);
        }, 10);
    }


    getDuration(config) {
        let {isCountingBreakTime, resetBreak: breakTime, resetTime: roundTime} = config;
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
    }


}