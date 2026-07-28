let currentIndex = 0;
let score = 0;
let timerInterval;
let enteredDigits = [];
let gameActive = true;

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('digit-input');
    input.addEventListener('input', handleInput);
    startGame();
});

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
        digitSpan.style.display = 'inline-block';
        
        if (i < enteredDigits.length) {
            // Already entered digits
            digitSpan.textContent = enteredDigits[i];
            if (enteredDigits[i] === phiDigits[i]) {
                digitSpan.style.color = '#27ae60';
            } else {
                digitSpan.style.color = '#e74c3c';
                digitSpan.style.textDecoration = 'line-through';
            }
        } else if (i === currentIndex && gameActive) {
            // Current position - show underscore with line
            digitSpan.textContent = '_';
            digitSpan.style.color = '#e74c3c';
            digitSpan.style.fontWeight = 'bold';
            digitSpan.style.fontSize = '42px';
            digitSpan.style.borderBottom = '2px solid #3498db';
            digitSpan.style.paddingBottom = '2px';
        }
        
        // Add spacing between groups of 10
        if (i > 0 && i % 10 === 0) {
            digitSpan.style.marginLeft = '15px';
        }
        
        display.appendChild(digitSpan);
    }
}

function handleInput(e) {
    if (!gameActive) {
        e.target.value = '';
        return;
    }
    
    const inputDigit = e.target.value;
    
    // Only process single digits
    if (inputDigit.length !== 1) {
        return;
    }
    
    if (!/[0-9]/.test(inputDigit)) {
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
        e.target.value = '';
        updateDisplay();
        
        // Check if we've reached the end
        if (currentIndex >= phiDigits.length) {
            gameWin();
        }
    } else {
        // Wrong digit
        enteredDigits.push(inputDigit);
        e.target.value = '';
        updateDisplay();
        gameOver();
    }
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    resetTimer();
    timerInterval = setInterval(updateTimer, 30);
}

function resetTimer() {
    const timerProgress = document.getElementById('timer-progress');
    if (timerProgress) {
        timerProgress.style.width = '100%';
    }
}

function updateTimer() {
    if (!gameActive) return;
    
    const timer = document.getElementById('timer-progress');
    if (!timer) return;
    
    let currentWidth = parseFloat(timer.style.width);
    if (isNaN(currentWidth)) {
        currentWidth = 100;
    }
    
    if (currentWidth <= 0) {
        gameOver();
        return;
    }
    
    timer.style.width = (currentWidth - 1) + '%';
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

function gameOver() {
    if (!gameActive) return; // Prevent multiple game overs
    
    gameActive = false;
    clearInterval(timerInterval);
    timerInterval = null;
    
    const input = document.getElementById('digit-input');
    if (input) {
        input.disabled = true;
    }
    
    setTimeout(() => {
        alert(`Game Over! Final Score: ${score}\nYou memorized ${score} digits of the golden ratio!`);
        startGame();
    }, 100);
}

function gameWin() {
    if (!gameActive) return;
    
    gameActive = false;
    clearInterval(timerInterval);
    timerInterval = null;
    
    const input = document.getElementById('digit-input');
    if (input) {
        input.disabled = true;
    }
    
    setTimeout(() => {
        alert(`Congratulations! You've memorized all ${score} digits of the golden ratio!\nYou're a true math genius! 🎉`);
        startGame();
    }, 100);
}

// Keep focus on input field
document.addEventListener('click', function() {
    const input = document.getElementById('digit-input');
    if (gameActive && input && !input.disabled) {
        input.focus();
    }
});
