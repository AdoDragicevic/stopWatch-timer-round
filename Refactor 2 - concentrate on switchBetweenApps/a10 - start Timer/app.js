const title = document.querySelector("h1");
const switchBtn = document.querySelector("#btn-switch");
const buttons = document.querySelectorAll(".buttons .btn");
const inputs = document.querySelectorAll(".display input");


const apps = [
    new StopWatch("StopWatch", inputs, true), 
    new Timer("Timer", inputs, false)
];
const setup = new SwitchBetweenApps(apps, inputs, buttons, switchBtn, title);