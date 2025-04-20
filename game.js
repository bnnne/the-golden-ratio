let currentIndex = 0;
let score = 0;
let timerInterval;

// Initialize game
document.getElementById('digit-input').addEventListener('input', handleInput);
startGame();

function startGame() {
    currentIndex = 0;
    score = 0;
    updateScore();
    document.getElementById('digit-input').value = '';
    document.getElementById('digit-input').focus();
    startTimer();
}

function handleInput(e) {
    const inputDigit = e.target.value;
    const correctDigit = phiDigits[currentIndex];
    
    // Clear input immediately
    e.target.value = '';
    
    if (inputDigit === correctDigit) {
        score++;
        currentIndex++;
        updateScore();
        resetTimer();
        
        // If we've reached the end of available digits
        if (currentIndex >= phiDigits.length) {
            gameOver(true); // Pass true for victory
        }
    } else if (inputDigit !== '') {
        gameOver(false); // Pass false for loss
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
        gameOver(false);
        return;
    }
    
    timer.style.width = (currentWidth - 1) + '%';
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function gameOver(isVictory) {
    clearInterval(timerInterval);
    document.getElementById('digit-input').disabled = true;
    
    setTimeout(() => {
        if (isVictory) {
            alert(`Congratulations! You completed all ${phiDigits.length} digits with perfect score!`);
        } else {
            alert(`Game Over! Final Score: ${score}`);
        }
        
        document.getElementById('digit-input').disabled = false;
        startGame();
    }, 10);
}
