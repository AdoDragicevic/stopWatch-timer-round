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


/*
Ovaj pristup radi, ali me živcira to što inputs (koji su isti) moram dodati kao argument i u SwtichBetweenApss i u svaki app (realno dovoljno
mi je da svaki app ima pristup 1 objektu koji ima na sebi inputs, btns i druge DOM elemente)
Aplikacija podržava to da različite aplikacije (stopWatch, timer, rounds) imaju različit broj inputa i btna, ali potreban mi je pristup njima
(radi DOM manipulation) i u zasebnoj aplikaciji (stopWatch, timer, rounds) i u SwitchBetweenApps

Zato su mi pale na pamet 2 alternative:
- zip 2
- zip 3


*/