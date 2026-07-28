let currentIndex = 0;
let score = 0;
let timerInterval;
let enteredDigits = [];

// Initialize game
document.getElementById('digit-input').addEventListener('input', handleInput);
startGame();

function startGame() {
    currentIndex = 0;
    score = 0;
    enteredDigits = [];
    updateScore();
    updateDisplay();
    showNextDigit();
    startTimer();
    document.getElementById('digit-input').disabled = false;
}

function showNextDigit() {
    document.getElementById('digit-input').value = '';
    document.getElementById('digit-input').focus();
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('digit-display');
    display.innerHTML = '';
    
    // Group digits in tens
    for (let i = 0; i <= currentIndex; i++) {
        if (i > 0 && i % 10 === 0) {
            // Add a small gap between groups of 10
            const breakElement = document.createElement('span');
            breakElement.style.width = '100%';
            breakElement.style.height = '5px';
            display.appendChild(breakElement);
        }
        
        const digitSpan = document.createElement('span');
        
        if (i < enteredDigits.length) {
            // Already entered digits
            digitSpan.textContent = enteredDigits[i];
            if (enteredDigits[i] === phiDigits[i]) {
                digitSpan.className = 'correct-digit';
            } else {
                digitSpan.className = 'wrong-digit';
            }
        } else if (i === currentIndex) {
            // Current digit to guess (show as question mark or highlight)
            digitSpan.textContent = '?';
            digitSpan.className = 'current-digit';
        } else {
            // Future digits (don't show)
            digitSpan.textContent = '·';
            digitSpan.className = 'future-digit';
            digitSpan.style.color = '#bdc3c7';
        }
        
        // Add spacing between groups
        if (i > 0 && i % 10 === 0) {
            digitSpan.style.marginLeft = '10px';
        }
        
        display.appendChild(digitSpan);
    }
}

function handleInput(e) {
    const inputDigit = e.target.value;
    const correctDigit = phiDigits[currentIndex];
    
    if (inputDigit === correctDigit) {
        enteredDigits.push(inputDigit);
        score++;
        currentIndex++;
        updateScore();
        resetTimer();
        updateDisplay();
        showNextDigit();
    } else if (inputDigit !== '') {
        enteredDigits.push(inputDigit);
        updateDisplay();
        gameOver();
    }
}

function startTimer() {
    resetTimer();
    timerInterval = setInterval(updateTimer, 30);
}

function resetTimer() {
    document.getElementById('timer-progress').style.width = '100%';
}

function updateTimer() {
    const timer = document.getElementById('timer-progress');
    const currentWidth = parseFloat(timer.style.width) || 100;
    
    if (currentWidth <= 0) {
        gameOver();
        return;
    }
    
    timer.style.width = (currentWidth - 1) + '%';
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function gameOver() {
    clearInterval(timerInterval);
    document.getElementById('digit-input').disabled = true;
    setTimeout(() => {
        alert(`Game Over! Final Score: ${score}\nYou memorized ${score} digits of the golden ratio!`);
        startGame();
    }, 10);
}

// Prevent losing focus from input
document.addEventListener('click', function(e) {
    if (!document.getElementById('digit-input').disabled) {
        document.getElementById('digit-input').focus();
    }
});
