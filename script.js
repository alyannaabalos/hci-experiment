let clicks = 0;
let lastButtonClicked = null;
const timeLeft = document.getElementById('time');
const clickCounter = document.getElementById('clicks');
const heartButton = document.getElementById('heartButton');
const commentButton = document.getElementById('commentButton');
const shareButton = document.getElementById('shareButton');
const bookmarkButton = document.getElementById('bookmarkButton');
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

function startTimer() {
    let time = 10; 
    timeLeft.textContent = time; 
    
    const timer = setInterval(() => {
        if (time <= 0) {
            clearInterval(timer); 
            if (phase === 1) {
                phase = 2; 
                startPhase2();
            } else if (phase === 2) {
                phase = 3;
                startPhase1(); 
            } else if (phase === 3) {
                phase = 4;
                startPhase2();
            } else if (phase === 4) {
                // End of game
                heartButton.disabled = true;
                commentButton.disabled = true;
                bookmarkButton.disabled = true;
                shareButton.disabled = true;
                instruction.textContent = "Game over! Thank you for participating.";
                alert("Game over! Thank you for participating.");
            }
        } else {
            time--;
            timeLeft.textContent = time; 
        }
    }, 1000);
}



function startPhase1() {
    let alertText;
    let instructionText;
    
    if (phase === 0) {
        alertText = "Phase 1: With your left hand, click the ❤️ as many times as you can in 10 seconds! Press OK to start.";
        instructionText = "Click the ❤️ as many times as you can in 10 seconds!";
        phase = 1;
    } else if (phase === 3) {
        alertText = "Phase 3: With your right hand, click the ❤️ again as many times as you can in 10 seconds! Press OK to start.";
        instructionText = "Click the ❤️ again as many times as you can in 10 seconds!";
    }
    
    alert(alertText);
    instruction.textContent = instructionText;
    clicks = 0; 
    clickCounter.textContent = clicks;
    startTimer(); 
}

function startPhase2() {
    let alertText;
    let instructionText;
    
    if (phase === 2) {
        alertText = "Phase 2: Still using your left hand, alternate clicks between ❤️ and 💬 as fast as you can for 10 seconds! Press OK to start.";
        instructionText = "Now, alternate clicks between ❤️ and 💬 as fast as you can for 10 seconds!";
    } else if (phase === 4) {
        alertText = "Phase 4: With your right hand, alternate clicks between ❤️ and 💬 again as fast as you can for 10 seconds! Press OK to start.";
        instructionText = "Once more, alternate clicks between ❤️ and 💬 as fast as you can for 10 seconds!";
    }
    
    alert(alertText);
    instruction.textContent = instructionText;
    clicks = 0;
    clickCounter.textContent = clicks;
    startTimer();
}


heartButton.addEventListener('click', () => {
    // For Phase 1 and Phase 3, count every click on the heart button
    if (phase === 1 || phase === 3) {
        clicks++;
        clickCounter.textContent = clicks;
    }
    // For Phase 2, ensure the last button clicked was different, i.e., alternating clicks
    else if (phase === 2 || phase == 4) {
        if (lastButtonClicked !== 'heartButton') {
            clicks++;
            clickCounter.textContent = clicks;
            lastButtonClicked = 'heartButton';
        }
    }
});

commentButton.addEventListener('click', () => {
    // For Phase 2, count click if the last button clicked was different (heart button)
    if ((phase === 2 || phase == 4) && lastButtonClicked !== 'commentButton') {
        clicks++;
        clickCounter.textContent = clicks;
        lastButtonClicked = 'commentButton';
    }
});


// Start Phase 1 after a brief introductory prompt
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(startPhase1, 100); // Delay added to ensure DOM is fully loaded
});
