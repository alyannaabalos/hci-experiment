let clicks = 0;
let lastButtonClicked = null;
const timeLeft = document.getElementById('time');
const clickCounter = document.getElementById('clicks');
const heartButton = document.getElementById('heartButton');
const commentButton = document.getElementById('commentButton');
const shareButton = document.getElementById('shareButton');
const bookmarkButton = document.getElementById('bookmarkButton');
const instruction = document.getElementById('instruction');
let phase = 0;
let userHandPreference = "left";
let clickCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
let totalMovementTimes = {2: 0, 4: 0, 6: 0, 8: 0};
let movementCounts = {2: 0, 4: 0, 6: 0, 8: 0};
let movementStartTime = 0; 
let isHeartClicked = false; 

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
    let time = 3; 
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
                phase = 5;
                startPhase1();
            } else if (phase === 5) {
                phase = 6;
                startPhase2();
            } else if (phase === 6) {
                phase = 7;
                startPhase1();
            } else if (phase === 7) {
                phase = 8;
                startPhase2();
            } else if (phase === 8) {
                // End of game
                heartButton.disabled = true;
                commentButton.disabled = true;
                bookmarkButton.disabled = true;
                shareButton.disabled = true;
                instruction.textContent = "Time's up! Thank you for participating.";
                alert("Time's up! Thank you for participating.");

                offerDownloadResultsAsCSV();
            }
        } else {
            time--;
            timeLeft.textContent = time; 
        }
    }, 1000);
}

function startPhase1() {
    adjustButtonPositionForPhase(phase);
    let alertText;
    let instructionText;
    
    if (phase === 0) {
        alertText = "Phase 1: With your left hand, click the ❤️ as many times as you can in 10 seconds! Press OK to start.";
        instructionText = "Click the ❤️ as many times as you can in 10 seconds!";
        phase = 1; 
    } 
    else if (phase === 3) {
        alertText = "Phase 3: With your right hand, click the ❤️ again as many times as you can in 10 seconds! Press OK to start.";
        instructionText = "Click the ❤️ again as many times as you can in 10 seconds!";
    }
    else if (phase === 5) {
        alertText = "Phase 5: With your left hand, click the ❤️ as many times as you can in 10 seconds! Press OK to start.";
        instructionText = "Click the ❤️ as many times as you can in 10 seconds!";
    }
    else if (phase === 7) {
        alertText = "Phase 7: With your right hand, click the ❤️ again as many times as you can in 10 seconds! Press OK to start.";
        instructionText = "Click the ❤️ again as many times as you can in 10 seconds!";
    }
    
    alert(alertText);
    instruction.textContent = instructionText;
    clicks = 0;
    clickCounter.textContent = clicks;
    startTimer(); 
}

function startPhase2() {
    movementStartTime = 0;
    adjustButtonPositionForPhase(phase);
    let alertText;
    let instructionText;
    
    if (phase === 2) {
        alertText = "Phase 2: Still using your left hand, alternate clicks between ❤️ and 🔗 as fast as you can for 10 seconds! Press OK to start.";
        instructionText = "Now, alternate clicks between ❤️ and 🔗 as fast as you can for 10 seconds!";
    } else if (phase === 4) {
        alertText = "Phase 4: With your right hand, alternate clicks between ❤️ and 🔗 again as fast as you can for 10 seconds! Press OK to start.";
        instructionText = "Once more, alternate clicks between ❤️ and 🔗 as fast as you can for 10 seconds!";
    } else if (phase === 6) {
        alertText = "Phase 6: Now, using your left hand again, alternate clicks between ❤️ and 🔗 as fast as you can for 10 seconds! Press OK to start.";
        instructionText = "Alternate clicks between ❤️ and 🔗 as fast as you can for 10 seconds!";
    } else if (phase === 8) {
        alertText = "Phase 8: Finally, with your right hand, alternate clicks between ❤️ and 🔗 one last time as fast as you can for 10 seconds! Press OK to start.";
        instructionText = "Alternate clicks between ❤️ and 🔗 one last time as fast as you can for 10 seconds!";
    }
    
    alert(alertText);
    instruction.textContent = instructionText;
    clicks = 0;
    clickCounter.textContent = clicks;
    startTimer();
}

function adjustButtonPositionForPhase(phase) {
    const buttonsContainer = document.getElementById('buttonsContainer');
    if (phase >= 5) {
        buttonsContainer.classList.add('right-side');
    } else {
        buttonsContainer.classList.remove('right-side');
    }
}

function askHandPreference() {
    const handPreference = window.prompt("Are you left-handed or right-handed? Type 'left' for left-handed, 'right' for right-handed.", "").toLowerCase();
    userHandPreference = (handPreference === "right" ? "right" : "left");
}

function offerDownloadResultsAsCSV() {
    // Ask the user if they want to download the results
    const userAgreed = window.confirm("Do you want to download your game results?");
    
    if (userAgreed) {
        downloadResultsAsCSV(); 
    }
}

function downloadResultsAsCSV() {
    let csvContent = `Dominant Hand:, ${userHandPreference}\r\n`;
    csvContent += "Phase,Clicks,Average Movement Time (ms)\r\n";

    // Iterate over all phases
    for (let i = 1; i <= 8; i++) {
        let lineContent = `${i},${clickCounts[i]}`;
        if (i % 2 === 0) { // For phases 2, 4, 6, and 8, include average movement time
            let averageMovementTime = "N/A"; // Default
            if (movementCounts[i] > 0) {
                averageMovementTime = (totalMovementTimes[i] / movementCounts[i]).toFixed(2);
            }
            lineContent += `,${averageMovementTime}`;
        } else {
            lineContent += ","; // Maintain column consistency across all rows
        }
        csvContent += lineContent + "\r\n";
    }

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "game_results.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link); // Clean up after download
}



heartButton.addEventListener('click', () => {
    if (phase === 2 || phase === 4 || phase === 6 || phase === 8) {
        // Allow share button click only if heart button was clicked last
        isHeartClicked = true;
        // Set the movementStartTime when heart button is clicked
        movementStartTime = performance.now();
    } else {
        // For non-alternating phases, always increment clicks
        clicks++;
        clickCounts[phase]++;
        clickCounter.textContent = clicks;
    }
    lastButtonClicked = 'heart'; // Keep track of the last button clicked
});

shareButton.addEventListener('click', () => {
    if (phase === 2 || phase === 4 || phase === 6 || phase === 8) {
        // If the heart button was clicked last, increment the click count
        if (isHeartClicked) {
            clicks++;
            clickCounts[phase]++;
            clickCounter.textContent = clicks;
            isHeartClicked = false; // Reset the flag as the pair has been clicked

            // Calculate and store the movement time if a movement was previously started
            if (movementStartTime > 0) {
                const movementEndTime = performance.now();
                const movementTime = movementEndTime - movementStartTime;
                totalMovementTimes[phase] += movementTime; // Update total movement time
                movementCounts[phase]++; // Increment movement count
                movementStartTime = 0; // Reset the movement start time for the next round
            }
        }
    }
    lastButtonClicked = 'share'; // Keep track of the last button clicked
});


// Start Phase 1 after a brief introductory prompt
document.addEventListener('DOMContentLoaded', () => {
    askHandPreference();
    setTimeout(startPhase1, 100); // Delay added to ensure DOM is fully loaded
});
