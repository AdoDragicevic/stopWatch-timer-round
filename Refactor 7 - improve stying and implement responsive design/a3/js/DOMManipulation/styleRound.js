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
            this.runCircle
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


    displayCircle() {
        document.querySelectorAll(".svg").forEach( el => (
            el.style.display = this.isRunning ? "" : "none"
        ));
    }
  

    updateCircleColor() {
        document.querySelector(".svg__circle").style.stroke = this.config.isCountingBreakTime ? "green" : "red";
    }


    runCircle = config => {
        let duration = this.getDuration(config);
        let circleLg = this.getCircleData(document.querySelector(".svg__circle--lg"), duration);
        let circleSm = this.getCircleData(document.querySelector(".svg__circle--sm"), duration);
        this.circleInterval = setInterval( () => {
            let circleLgCurrOffset = parseFloat(circleLg.el.getAttribute("stroke-dashoffset"));
            let circleSmCurrOffset = parseFloat(circleSm.el.getAttribute("stroke-dashoffset"));
            if( Math.abs(circleLgCurrOffset) >= circleLg.perimeter ) {
                clearInterval(this.circleInterval);
            } else {
                circleLg.el.setAttribute("stroke-dashoffset", circleLgCurrOffset - circleLg.offsetPerInterval);
                circleSm.el.setAttribute("stroke-dashoffset", circleSmCurrOffset - circleSm.offsetPerInterval);
            }
        }, 10 );
    }

    
    getCircleData(el, duration) {
        let radius = this.getRadius(el);
        let perimeter = this.getPerimeter(radius);
        let offsetPerInterval = perimeter / duration;
        return { el: el, radius, perimeter, offsetPerInterval };
    };


    getRadius(el) {
        let r = el.getAttribute("r");
        return parseInt( r.slice(0, r.indexOf("px")) );
    }


    getPerimeter(radius) {
        return radius * Math.PI * 2;
    }


    getDuration(config) {
        let {isCountingBreakTime, resetBreak: breakTime, resetTime: roundTime} = config;
        let sorce = isCountingBreakTime ? breakTime : roundTime;
        return this.calcMilliSeconds(sorce);
    }


    calcMilliSeconds(currTime) {
        let [m, s] = currTime;
        let duration = (m * 60 + s) * 100;
        return duration;
    }


    stopCircle = () => {
        clearInterval(this.circleInterval);
    }


    resetCircle() {
        document.querySelectorAll(".svg__circle").forEach(el => el.setAttribute("stroke-dashoffset", 0));
    }
    

}