// Golden Ratio digits (first 100 digits)
const phiDigits = "6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374";
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
    showNextDigit();
    startTimer();
}

function showNextDigit() {
    document.getElementById('current-digit').textContent = 
        phiDigits[currentIndex] || "0"; // Fallback to 0 if we exceed our digits
    document.getElementById('digit-input').value = '';
    document.getElementById('digit-input').focus();
}

function handleInput(e) {
    const inputDigit = e.target.value;
    const correctDigit = phiDigits[currentIndex];
    
    if (inputDigit === correctDigit) {
        score++;
        currentIndex++;
        updateScore();
        resetTimer();
        showNextDigit();
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
