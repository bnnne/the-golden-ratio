let currentIndex = 0;
let score = 0;
let timerInterval;
let enteredDigits = [];
let gameActive = true;

// Initialize game
document.getElementById('digit-input').addEventListener('input', handleInput);
startGame();

function startGame() {
    currentIndex = 0;
    score = 0;
    enteredDigits = [];
    gameActive = true;
    updateScore();
    updateDisplay();
    document.getElementById('digit-input').value = '';
    document.getElementById('digit-input').disabled = false;
    document.getElementById('digit-input').focus();
    startTimer();
}

function updateDisplay() {
    const display = document.getElementById('digit-display');
    display.innerHTML = '';
    
    // Show all entered digits up to current position
    for (let i = 0; i <= currentIndex; i++) {
        const digitSpan = document.createElement('span');
        
        if (i < enteredDigits.length) {
            // Already entered digits
            digitSpan.textContent = enteredDigits[i];
            if (enteredDigits[i] === phiDigits[i]) {
                digitSpan.className = 'correct-digit';
            } else {
                digitSpan.className = 'wrong-digit';
            }
        } else if (i === currentIndex && gameActive) {
            // Current position - show underscore
            digitSpan.textContent = '_';
            digitSpan.className = 'current-digit';
        }
        
        // Add spacing between groups of 10
        if (i > 0 && i % 10 === 0) {
            digitSpan.style.marginLeft = '15px';
        }
        
        display.appendChild(digitSpan);
    }
}

function handleInput(e) {
    if (!gameActive) return;
    
    const inputDigit = e.target.value;
    
    // Only process single digits
    if (inputDigit.length !== 1 || !/[0-9]/.test(inputDigit)) {
        e.target.value = '';
        return;
    }
    
    const correctDigit = phiDigits[currentIndex];
    
    if (inputDigit === correctDigit) {
        // Correct digit
        enteredDigits.push(inputDigit);
        score++;
        currentIndex++;
        updateScore();
        resetTimer();
        updateDisplay();
        
        // Clear input for next digit
        setTimeout(() => {
            e.target.value = '';
        }, 50);
        
        // Check if we've reached the end of our digits
        if (currentIndex >= phiDigits.length) {
            gameWin();
        }
    } else {
        // Wrong digit
        enteredDigits.push(inputDigit);
        updateDisplay();
        gameOver();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    resetTimer();
    timerInterval = setInterval(updateTimer, 30);
}

function resetTimer() {
    document.getElementById('timer-progress').style.width = '100%';
}

function updateTimer() {
    if (!gameActive) return;
    
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
    gameActive = false;
    clearInterval(timerInterval);
    document.getElementById('digit-input').disabled = true;
    
    setTimeout(() => {
        alert(`Game Over! Final Score: ${score}\nYou memorized ${score} digits of the golden ratio!`);
        startGame();
    }, 100);
}

function gameWin() {
    gameActive = false;
    clearInterval(timerInterval);
    document.getElementById('digit-input').disabled = true;
    
    setTimeout(() => {
        alert(`Congratulations! You've memorized all ${score} digits of the golden ratio!\nYou're a true math genius! 🎉`);
        startGame();
    }, 100);
}

// Keep focus on input field
document.addEventListener('click', function(e) {
    if (gameActive && !document.getElementById('digit-input').disabled) {
        document.getElementById('digit-input').focus();
    }
});

// Handle keyboard input
document.addEventListener('keydown', function(e) {
    if (gameActive && !document.getElementById('digit-input').disabled) {
        document.getElementById('digit-input').focus();
    }
});
