//SELECTORS
const inputs    = document.querySelectorAll(".display input"),
      btns      = document.querySelectorAll(".buttons .btn"),
      switchBtn = document.querySelector("#btn-switch"),
      h1        = document.querySelector("h1");

//CONSTRUCTORS
const apps = [ 
    new StopWatch("StopWatch", inputs, true), 
    new Timer("Timer", inputs, false),
    new Rounds("Rounds", inputs, false) 
];

//SETUP
const setup = new SwitchBetweenApps(apps, inputs, btns, switchBtn, h1);