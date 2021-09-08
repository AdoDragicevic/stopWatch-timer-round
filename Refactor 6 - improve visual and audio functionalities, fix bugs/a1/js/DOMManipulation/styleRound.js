//DOM manipulation

class StyleRound extends Style {
        
    constructor() {
        
        super();

        this.runOnUpdateDisplay.push(
            this.updateInputLabelTxt.bind(this, ["minutes", "seconds", "rounds"]),
            this.displayCircle,
            this.updateCircleData
        );
        
        this.runOnStart.push( 
            this.updateH1, 
            this.displayLastInput,
            this.displayCircle,
            this.updateCircleColor,
            this.updateCircleData,
            this.runCircle
        );

        this.runOnStop.push(
            this.stopCircle,
            this.updateCircleData
        )

        this.runOnReset.push(
            this.displayLastInput,
            this.displayCircle,
            this.updateCircleData,
            this.updateCircleColor,
            this.resetCircle
        );


    }


    updateTitle() {
        document.title = this.isRunning ? `${this.val[0]} : ${this.val[1]} | ${this.name} ${this.currRound}` : this.name;
    }


    updateH1() {
        document.querySelector(".header").innerText = this.isRunning ? `${this.name} ${this.currRound}` : this.name;
    }

    
    updateBtnTxt() {
        document.querySelector("#reset").innerText = ( () => {
            if(this.isRunning || this.isDisableInputs) return "Reset";
            return this.isSettingRoundTime ? "Set break" : "Set round";
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


    displayCircle() {
        document.querySelector(".svg").style.display = this.isRunning ? "" : "none";
    }
  

    updateCircleColor() {
        document.querySelector(".svg__circle").style.stroke = this.isCountingRoundTime ? "red" : "green";
    }

    
    updateCircleData() {
        const update = () => {
            this.circle.radius = ( () => {
                let r = this.circle.el.getAttribute("r");
                return parseInt( r.slice(0, r.indexOf("px")) );
            })();
            this.circle.perimeter = this.circle.radius * Math.PI * 2;
        };
        if(this.circle) update();
        else {
            this.circle = {};
            this.circle.el = document.querySelector(".svg__circle");
            update();
            window.addEventListener("resize", update);  
        }
    }


    runCircle() {
        let sorce = this.isCountingRoundTime ? this.resetVal : this.resetBreakVal;
        let [m, s] = sorce;
        let duration = m * 60 + s;
        let offsetPerSecond = this.circle.perimeter / duration;
        let offsetPerInterval = offsetPerSecond / 20;
        this.circleInterval = setInterval( () => {
            const currOffset = parseFloat(this.circle.el.getAttribute("stroke-dashoffset"));
            if( Math.abs(currOffset) >= this.circle.perimeter ) clearInterval(this.circleInterval);
            else this.circle.el.setAttribute("stroke-dashoffset", currOffset - offsetPerInterval);
        }, 50);
    }


    stopCircle() {
        clearInterval(this.circleInterval);
    }


    resetCircle() {
        this.circle.el.setAttribute("stroke-dashoffset", 0);
    }


};