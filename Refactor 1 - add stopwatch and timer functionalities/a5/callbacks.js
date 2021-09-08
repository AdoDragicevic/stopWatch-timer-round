// Visual elements (clock ticking, border decreasing...)
const callbacks = {
    tickingClockHand(str) {
        let clockArrow = document.querySelector(".svg__line");
        if(str){
            // Move arrow; get first num from transform="rotate(0 200 200)" & mutate it
            let rotate = clockArrow.getAttribute("transform");
            // we got "rotate(n 200 200)" => now slice it from "(" to " "
            let rotateDeg = rotate.slice(rotate.indexOf("(") + 1, rotate.indexOf(" "));
            let deg = parseInt(rotateDeg);
            deg += 6;
            clockArrow.setAttribute("transform", `rotate(${deg} 200 200)`); 
        }else{
            // If no argument, reset arrow
            clockArrow.setAttribute("transform", "rotate(0 200 200)");
        } 
    }
};