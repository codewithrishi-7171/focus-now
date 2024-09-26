const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time');
const tree = document.getElementById('tree');

// Timer selection buttons
const set25Button = document.getElementById('set25');
const set15Button = document.getElementById('set15');
const set5Button = document.getElementById('set5');

// Alarm sound
const alarmSound = document.getElementById('alarmSound');

let focusTime = 25 * 60; // Default 25 minutes in seconds
let timer;
let isRunning = false;
let isPaused = false; // Flag to check if the timer is paused
let treeState = 0;

// Disable resume button initially
resumeButton.disabled = true;

function updateTimer() {
    let minutes = Math.floor(focusTime / 60);
    let seconds = focusTime % 60;

    // Display formatted time
    timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Check if time is up
    if (focusTime <= 0) {
        clearInterval(timer);
        playAlarm(); // Play the alarm when the timer finishes
        growTree(); // Grow the tree when time finishes
    } else {
        focusTime--;
    }
}

function startFocus() {
    if (!isRunning && !isPaused) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        resumeButton.disabled = false; // Enable the resume button after starting
    }
}

function stopFocus() {
    clearInterval(timer);
    isRunning = false;
    isPaused = true; // Set the paused state
}

function resumeFocus() {
    if (!isRunning && isPaused) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        isPaused = false; // Reset paused state when resuming
    }
}

function resetFocus() {
    // Stop the timer and reset everything
    clearInterval(timer);
    focusTime = 25 * 60; // Reset time to 25 minutes by default
    treeState = 0;
    tree.src = "sapling.png"; // Reset tree to sapling
    timeDisplay.textContent = "25:00"; // Reset timer display
    isRunning = false;
    isPaused = false;

    // Disable the resume button since there's nothing to resume
    resumeButton.disabled = true;
}

function growTree() {
    treeState++;
    switch (treeState) {
        case 1:
            tree.src = "small-tree.png";
            break;
        case 2:
            tree.src = "grown-tree.png";
            break;
        default:
            tree.src = "sapling.png";
    }
}

function playAlarm() {
    // Play the alarm sound
    alarmSound.play();
}

// Timer selection handlers
set25Button.addEventListener('click', () => {
    focusTime = 25 * 60; // 25 minutes
    timeDisplay.textContent = "25:00";
});

set15Button.addEventListener('click', () => {
    focusTime = 15 * 60; // 15 minutes
    timeDisplay.textContent = "15:00";
});

set5Button.addEventListener('click', () => {
    focusTime = 5 * 60; // 5 minutes
    timeDisplay.textContent = "05:00";
});

// Event listeners for focus control buttons
startButton.addEventListener('click', startFocus);
stopButton.addEventListener('click', stopFocus);
resumeButton.addEventListener('click', resumeFocus);
resetButton.addEventListener('click', resetFocus);
