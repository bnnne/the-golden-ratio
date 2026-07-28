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
    document.getElementById('digit-input').disabled = false;
    document.getElementById('digit-input').focus();
    startTimer();
}

function updateDisplay() {
    const display = document.getElementById('digit-display');
    display.innerHTML = '';
    
    // Group digits in tens
    for (let i = 0; i < enteredDigits.length; i++) {
        if (i > 0 && i % 10 === 0) {
            display.innerHTML += '<br>';
        }
        display.innerHTML += `<span class="digit-group">${enteredDigits[i]}</span>`;
    }
    
    // Add blinking cursor for next position
    if (currentIndex < phiDigits.length) {
        display.innerHTML += '<span class="digit-group" style="opacity: 0.5; animation: blink 1s infinite;">_</span>';
    }
}

function handleInput(e) {
    const inputDigit = e.target.value;
    const correctDigit = phiDigits[currentIndex];
    
    if (inputDigit === correctDigit) {
        score++;
        enteredDigits.push(inputDigit);
        currentIndex++;
        updateScore();
        updateDisplay();
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
        alert(`Game Over! Final Score: ${score}\nDigits entered: ${enteredDigits.join('')}`);
        startGame();
    }, 10);
}

// Add CSS animation for cursor blink
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);
