let currentIndex = 0;
let score = 0;
let timerInterval = null;
let enteredDigits = [];
let gameActive = false;

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('digit-input');
    if (input) {
        input.addEventListener('input', handleInput);
        startGame();
    }
});

function startGame() {
    currentIndex = 0;
    score = 0;
    enteredDigits = [];
    gameActive = true;
    
    updateScore();
    updateDisplay();
    
    const input = document.getElementById('digit-input');
    if (input) {
        input.value = '';
        input.disabled = false;
        input.focus();
    }
    
    startTimer();
}

function updateDisplay() {
    const display = document.getElementById('digit-display');
    if (!display) return;
    
    display.innerHTML = '';
    
    for (let i = 0; i <= currentIndex; i++) {
        const span = document.createElement('span');
        span.style.fontFamily = 'Courier New, monospace';
        span.style.fontSize = '36px';
        
        if (i < enteredDigits.length) {
            span.textContent = enteredDigits[i];
            if (enteredDigits[i] === phiDigits[i]) {
                span.style.color = '#27ae60';
            } else {
                span.style.color = '#e74c3c';
                span.style.textDecoration = 'line-through';
            }
        } else if (i === currentIndex && gameActive) {
            span.textContent = '_';
            span.style.color = '#e74c3c';
            span.style.fontWeight = 'bold';
            span.style.fontSize = '42px';
            span.style.borderBottom = '3px solid #3498db';
        }
        
        if (i > 0 && i % 10 === 0) {
            span.style.marginLeft = '20px';
        }
        
        display.appendChild(span);
    }
}

function handleInput(e) {
    if (!gameActive) {
        e.target.value = '';
        return;
    }
    
    const value = e.target.value;
    
    if (value.length !== 1) {
        return;
    }
    
    if (!/^[0-9]$/.test(value)) {
        e.target.value = '';
        return;
    }
    
    const correctDigit = phiDigits[currentIndex];
    
    if (value === correctDigit) {
        enteredDigits.push(value);
        score++;
        currentIndex++;
        updateScore();
        resetTimer();
        e.target.value = '';
        updateDisplay();
        
        if (currentIndex >= phiDigits.length) {
            gameWin();
        }
    } else {
        enteredDigits.push(value);
        e.target.value = '';
        updateDisplay();
        gameOver();
    }
}

function startTimer() {
    stopTimer();
    resetTimer();
    timerInterval = setInterval(updateTimer, 30);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    const progress = document.getElementById('timer-progress');
    if (progress) {
        progress.style.width = '100%';
    }
}

function updateTimer() {
    if (!gameActive) return;
    
    const progress = document.getElementById('timer-progress');
    if (!progress) return;
    
    let width = parseFloat(progress.style.width);
    if (isNaN(width)) {
        width = 100;
    }
    
    width -= 1;
    progress.style.width = width + '%';
    
    if (width <= 0) {
        gameOver();
    }
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

function gameOver() {
    if (!gameActive) return;
    
    gameActive = false;
    stopTimer();
    
    const input = document.getElementById('digit-input');
    if (input) {
        input.disabled = true;
    }
    
    setTimeout(function() {
        alert('Game Over! Final Score: ' + score + '\nYou memorized ' + score + ' digits of the golden ratio!');
        startGame();
    }, 100);
}

function gameWin() {
    if (!gameActive) return;
    
    gameActive = false;
    stopTimer();
    
    const input = document.getElementById('digit-input');
    if (input) {
        input.disabled = true;
    }
    
    setTimeout(function() {
        alert('Congratulations! You\'ve memorized all ' + score + ' digits of the golden ratio!\nYou\'re a true math genius! 🎉');
        startGame();
    }, 100);
}

document.addEventListener('click', function() {
    if (gameActive) {
        const input = document.getElementById('digit-input');
        if (input && !input.disabled) {
            input.focus();
        }
    }
});
