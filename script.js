// Declare variables to manage the stopwatch
let timerInterval; // Stores the interval ID for updating the time display
let startTime;     // Stores the timestamp when the stopwatch starts or resumes
let running = false; // Indicates whether the stopwatch is running
let elapsedTime = 0; // Keeps track of the elapsed time in milliseconds

// Select elements from the HTML DOM
const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Add click event listeners to buttons
startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

// Function to start the stopwatch
function start() {
    if (!running) {
        // Store the current time and subtract elapsed time to resume
        startTime = Date.now() - elapsedTime;

        // Set up an interval to update the time display every 10 milliseconds
        timerInterval = setInterval(updateTime, 10);

        // Update the running flag
        running = true;

        // Change the background image to indicate the stopwatch is running
        document.body.style.backgroundImage = "url('start.gif')";
    }
}

// Function to stop the stopwatch
function stop() {
    if (running) {
        // Clear the interval to stop the timer
        clearInterval(timerInterval);

        // Update the running flag
        running = false;

        // Change the background image to indicate the stopwatch is stopped
        document.body.style.backgroundImage = "url('stop.gif')";
    }
}

// Function to reset the stopwatch
function reset() {
    // Clear the interval to stop the timer
    clearInterval(timerInterval);

    // Reset elapsed time and running flag
    elapsedTime = 0;
    running = false;

    // Reset the time display
    timeDisplay.textContent = '00:00:000';

    // Change the background image to indicate the stopwatch is reset
    document.body.style.backgroundImage = "url('reset.gif')";
}

// Function to update the time display
function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    // Calculate minutes, seconds, and milliseconds
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    // Format and display the time
    timeDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}:${padMilliseconds(milliseconds)}`;
}

// Utility function to pad a value with leading zeros
function padTime(value) {
    return value.toString().padStart(2, '0');
}

// Utility function to pad milliseconds with leading zeros
function padMilliseconds(value) {
    return value.toString().padStart(3, '0');
}
