// Visual elements (clock ticking, border decreasing...)
const callbacks = {
    tickingClockHand(str) {
        let clockArrow = document.querySelector(".svg__line");
        if(str){
            // Move arrow; get first num from transform="rotate(0 200 200)" & mutate it
            let rotate = clockArrow.getAttribute("transform");
            // we got "rotate(n 200 200)" => now slice it from "(" to " "
            let rotateDeg = rotate.slice(rotate.indexOf("(") + 1, rotate.indexOf(" "));
            console.log(rotateDeg);
            let deg = parseFloat(rotateDeg);
            deg += 0.3;
            clockArrow.setAttribute("transform", `rotate(${deg} 200 200)`); 
        }else{
            // If no argument, reset arrow
            clockArrow.setAttribute("transform", "rotate(0 200 200)");
        }
    },
    slidingBorder(startTime) {
        let clockBorder = document.querySelector(".svg__circle");
        let radius = clockBorder.getAttribute("r");
        let perimeter = 2 * Math.PI * radius;
        clockBorder.setAttribute("stroke-dasharray", perimeter);
        // Cool izgleda, možda možeš nešto i s time napravit: clockBorder.setAttribute("stroke-dasharray", "200");
        if(!startTime) {
            // Reset border
            clockBorder.setAttribute("stroke-dashoffset", 0);
        }else{
            // Decrease border
            // Get remaining time in seconds
            let timeRemaining = (this.t1 * 60 * 60) + (this.t2 * 60) + this.t3;
            // Formula to calculate the decrease in stroke.dashoffset:
            let offset = (perimeter * timeRemaining) / startTime - perimeter;
            clockBorder.setAttribute("stroke-dashoffset", offset);
        }

    }


};