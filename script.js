let clicks = 0;
let lastButtonClicked = null;
const timeLeft = document.getElementById('time');
const clickCounter = document.getElementById('clicks');
const heartButton = document.getElementById('heartButton');
const commentButton = document.getElementById('commentButton');
const instruction = document.getElementById('instruction');
let phase = 1; // Track the current phase

// Start the timer
let time = 30; // 30 seconds for each phase
const timer = setInterval(() => {
    if (time <= 0 && phase === 1) {
        // Transition to Phase 2
        phase = 2;
        time = 30; // Reset time for the next phase
        clicks = 0; // Reset clicks for the next phase
        clickCounter.textContent = clicks; // Update the click counter display
        instruction.textContent = "Phase 2: Now, alternate clicks between ❤️ and 💬 as fast as you can for 30 seconds!";
        heartButton.disabled = false; // Ensure buttons are enabled for Phase 2
        commentButton.disabled = false;
    } else if (time <= 0 && phase === 2) {
        clearInterval(timer);
        heartButton.disabled = true;
        commentButton.disabled = true;
        instruction.textContent = "Game over! Thank you for participating.";
        alert(`Game over! You alternated clicks ${clicks} times.`);
    } else {
        time--;
        timeLeft.textContent = time;
    }
}, 1000);

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
