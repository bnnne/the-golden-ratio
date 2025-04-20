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
    
    if (inputDigit === correctDigit) {
        score++;
        currentIndex++;
        updateScore();
        resetTimer();
        document.getElementById('digit-input').value = '';
    } else if (inputDigit !== '') {
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
        alert(`Game Over! Final Score: ${score}`);
        document.getElementById('digit-input').disabled = false;
        startGame();
    }, 10);
}
