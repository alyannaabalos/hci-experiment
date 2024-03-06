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
let userHandPreference = "left";
let clickCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};


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
    csvContent += "Phase, Clicks\r\n"

    for (let i = 1; i <= 8; i++) {
        csvContent += `${i},${clickCounts[i]}\r\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "game_results.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    
    link.click(); 
    
    document.body.removeChild(link); 
}


heartButton.addEventListener('click', () => {
    if (phase === 1 || phase === 3 || phase == 5 || phase == 7) {
        clicks++;
        clickCounts[phase]++;
        function downloadResultsAsCSV() {
    let csvContent = "Dominant Hand,Phase,Clicks\r\n"; 

    for (let i = 1; i <= 8; i++) {
        csvContent += `${userHandPreference},${i},${clickCounts[i]}\r\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "results.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    
    link.click(); // Trigger download
    
    document.body.removeChild(link); // Clean up
}

        clickCounter.textContent = clicks;
    }
    else if (phase === 2 || phase == 4 || phase == 6 || phase == 8) {
        if (lastButtonClicked !== 'heartButton') {
            clicks++;
            clickCounts[phase]++;
            clickCounter.textContent = clicks;
            lastButtonClicked = 'heartButton';
        }
    }
});

shareButton.addEventListener('click', () => {
    if ((phase === 2 || phase == 4 || phase == 6 || phase == 8) && lastButtonClicked !== 'shareButton') {
        clicks++;
        clickCounts[phase]++;
        clickCounter.textContent = clicks;
        lastButtonClicked = 'shareButton';
    }
});


// Start Phase 1 after a brief introductory prompt
document.addEventListener('DOMContentLoaded', () => {
    askHandPreference();
    setTimeout(startPhase1, 100); // Delay added to ensure DOM is fully loaded
});
