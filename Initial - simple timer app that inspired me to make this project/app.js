const input = document.querySelector("input");
const btnStart = document.querySelector(".btn-start");
const btnPause = document.querySelector(".btn-pause");

const circle = document.querySelector("circle");
// Perimeter = radius * PI * 2
const perimeter = circle.getAttribute("r") * Math.PI * 2;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const init = new Timer(input, btnStart, btnPause, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        // offset = (perimeter * timeRemaining) / totalDuration - perimeter
        circle.setAttribute("stroke-dashoffset", 
        (perimeter * timeRemaining) / duration - perimeter
        );
    },
    onComplete() {
        console.log("completed");
    }
});