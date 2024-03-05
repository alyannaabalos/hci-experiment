let clicks = 0;
let lastButtonClicked = null;
const timeLeft = document.getElementById('time');
const clickCounter = document.getElementById('clicks');
const heartButton = document.getElementById('heartButton');
const commentButton = document.getElementById('commentButton');
const instruction = document.getElementById('instruction');
let phase = 0; // Initialize phase as 0 (not started)

// Preventing Double-Tap Zoom
document.addEventListener('touchstart', handleTouchStart, false);
let lastTouchTime = 0;

function handleTouchStart(event) {
    const currentTime = (new Date()).getTime();
    if (currentTime - lastTouchTime < 300) { // 300ms threshold for double-tap
        event.preventDefault();
    }
    lastTouchTime = currentTime;
}

// Timer logic extracted into its own function
function startTimer() {
    let time = 10; // Reset time for the current phase
    const timer = setInterval(() => {
        if (time <= 0) {
            clearInterval(timer); // Stop the timer
            if (phase === 1) {
                startPhase2(); // Transition to Phase 2
            } else if (phase === 2) {
                // End of Phase 2 and game
                heartButton.disabled = true;
                commentButton.disabled = true;
                instruction.textContent = "Game over! Thank you for participating.";
                alert(`Game over! You alternated clicks ${clicks} times.`);
            }
        } else {
            time--;
            timeLeft.textContent = time;
        }
    }, 1000);
}

// Function to start Phase 1
function startPhase1() {
    alert("Phase 1: With your left hand, click the ❤️ as many times as you can in 10 seconds! Press OK to start.");
    phase = 1; // Set phase to 1 to start Phase 1
    instruction.textContent = "Click the ❤️ as many times as you can in 10 seconds!";
    clicks = 0; // Reset clicks for the new phase
    clickCounter.textContent = clicks;
    startTimer(); // Start the timer after the user closes the alert
}

// Transition to Phase 2 with a prompt
function startPhase2() {
    alert("Phase 2: Still using your left hand, alternate clicks between ❤️ and 💬 as fast as you can for 10 seconds! Press OK to start.");
    phase = 2; // Set phase to 2 to start Phase 2
    instruction.textContent = "Now, alternate clicks between ❤️ and 💬 as fast as you can for 10 seconds!";
    clicks = 0; // Reset clicks for the new phase
    clickCounter.textContent = clicks;
    heartButton.disabled = false; // Ensure buttons are enabled for Phase 2
    commentButton.disabled = false;
    startTimer(); // Restart the timer for Phase 2
}

heartButton.addEventListener('click', () => {
    if (phase === 1 || (phase === 2 && lastButtonClicked !== 'like')) {
        clicks++;
        clickCounter.textContent = clicks;
        lastButtonClicked = 'like';
    }
});

commentButton.addEventListener('click', () => {
    if (phase === 2 && lastButtonClicked !== 'comment') {
        clicks++;
        clickCounter.textContent = clicks;
        lastButtonClicked = 'comment';
    }
});

// Start Phase 1 after a brief introductory prompt
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(startPhase1, 100); // Delay added to ensure DOM is fully loaded
});
