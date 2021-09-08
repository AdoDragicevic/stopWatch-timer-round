class Timer {
    constructor(input, btnStart, btnPause, callbacks){
        this.input = input;
        this.btnStart = btnStart;
        this.btnPause = btnPause;

        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        
        this.btnStart.addEventListener("click", this.start);
        this.btnPause.addEventListener("click", this.pause);
    }
    // Arrow function gets placed inside the constructor! It's not in the prototype!
    start = () => {
        if(this.onStart) {
            // this is how we pass the value of timeRemaining to onStart
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 20);
    }
    // Arrow function, othervise when invoked with click listener, "this" points to clicked button
    pause = () => {
        clearInterval(this.interval);
    }
    tick = () => {
        if(this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete) this.onComplete();
        }else{
            // left is setter, right is getter
            this.timeRemaining = this.timeRemaining - 0.02;
            /* Instead of these 2 lines, we use getter and setter
            const timeRemaining = parseFloat(this.input.value);
            this.input.value = timeRemaining - 1;
            */
           // This is how onTick function gets access to timeRemaining
           if(this.onTick) this.onTick(this.timeRemaining);
        }
    }
    get timeRemaining() {
        // parseInt("10.1") // 10
        // parseFloat("10.1") // 10.1
        return parseFloat(this.input.value);
    }
    // whatever is on the right side of = is passed in as "time"
    // setter is on the left side of =
    set timeRemaining(time) {
        this.input.value = time.toFixed(2);
    }
}