let timerInterval;
let startTime;
let running = false;
let elapsedTime = 0;

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
        document.body.style.backgroundImage = "url('start.gif')";
    }
}

function stop() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        document.body.style.backgroundImage = "url('stop.gif')";
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    timeDisplay.textContent = '00:00:000';
    document.body.style.backgroundImage = "url('reset.gif')";
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    timeDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}:${padMilliseconds(milliseconds)}`;
}

function padTime(value) {
    return value.toString().padStart(2, '0');
}

function padMilliseconds(value) {
    return value.toString().padStart(3, '0');
}
