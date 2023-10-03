# Welcome to my Stopwatch Repo

This is a custom stopwatch which 
- speeds up background animation when start is pressed
- slows down background animation when stop is pressed
- returns back to normal bg animation speed when reset is pressed
- has a custom font for the timer
- has glow on hover for the buttons

Let's break down how the JavaScript code works step by step:

```javascript
let timerInterval;
let startTime;
let running = false;
let elapsedTime = 0;

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
```

- We start by declaring several variables to manage the stopwatch functionality:
  - `timerInterval`: This variable will hold the interval reference for updating the time display.
  - `startTime`: It stores the timestamp when the stopwatch starts or resumes.
  - `running`: A boolean flag that indicates whether the stopwatch is running.
  - `elapsedTime`: This variable keeps track of the elapsed time in milliseconds.
  - We also select elements from the HTML DOM:
    - `timeDisplay`: This variable references the HTML element displaying the time in the format "MM:SS:SSS."
    - `startButton`, `stopButton`, and `resetButton`: These variables reference the "Start," "Stop," and "Reset" buttons, respectively.

```javascript
startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
```

- We use event listeners to trigger functions when the buttons are clicked. When the "Start," "Stop," or "Reset" button is clicked, it will execute the corresponding function: `start()`, `stop()`, or `reset()`.

Now, let's dive into each of the functions:

```javascript
function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
        document.body.style.backgroundImage = "url('start.gif')";
    }
}
```

- The `start` function is called when the "Start" button is clicked.
- It checks if the stopwatch is not already running (`!running`). If it's not running, it does the following:
  - It sets `startTime` to the current timestamp minus `elapsedTime`. This is done to resume the stopwatch from where it left off if it was stopped previously.
  - It sets up an interval (`setInterval`) to call the `updateTime` function every 10 milliseconds to update the time display.
  - It sets the `running` flag to `true` to indicate that the stopwatch is running.
  - It changes the background image of the `body` to "start.gif" to visually indicate that the stopwatch is running.

```javascript
function stop() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        document.body.style.backgroundImage = "url('stop.gif')";
    }
}
```

- The `stop` function is called when the "Stop" button is clicked.
- It checks if the stopwatch is currently running (`running`). If it is running, it does the following:
  - It clears the interval (`clearInterval`) previously set by `setInterval`, effectively stopping the timer.
  - It sets the `running` flag to `false` to indicate that the stopwatch is stopped.
  - It changes the background image of the `body` to "stop.gif" to visually indicate that the stopwatch is stopped.

```javascript
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    timeDisplay.textContent = '00:00:000';
    document.body.style.backgroundImage = "url('reset.gif')";
}
```

- The `reset` function is called when the "Reset" button is clicked.
- It performs the following actions:
  - Clears the interval (`clearInterval`) to stop the timer.
  - Resets `elapsedTime` to 0, effectively resetting the stopwatch to 0 milliseconds.
  - Sets `running` to `false` to indicate that the stopwatch is stopped.
  - Updates the `timeDisplay` to show "00:00:000" as the reset time.
  - Changes the background image of the `body` to "reset.gif" to visually indicate that the stopwatch is reset.

```javascript
function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    timeDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}:${padMilliseconds(milliseconds)}`;
}
```

- The `updateTime` function is called at regular intervals by the `setInterval` in the `start` function.
- It calculates the current time, updates `elapsedTime` by subtracting the `startTime`, and then calculates the minutes, seconds, and milliseconds based on `elapsedTime`.
- Finally, it updates the `timeDisplay` element with the formatted time.

```javascript
function padTime(value) {
    return value.toString().padStart(2, '0');
}

function padMilliseconds(value) {
    return value.toString().padStart(3, '0');
}
```

- These two utility functions are used to format the minutes, seconds, and milliseconds with leading zeros if necessary to ensure the display always shows two digits for minutes and seconds and three digits for milliseconds.

In summary, the JavaScript code manages the stopwatch's start, stop, and reset functionality by tracking time using the `Date` object and updating the display accordingly. Additionally, it handles the visual representation of the stopwatch by changing the background image to provide feedback to the user.