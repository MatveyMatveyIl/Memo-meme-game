const cards = document.querySelectorAll('.memoryCard');
const gameState = {
    countFlippedCards: 0,
    score: 0,
    moves: 0,
    isStarted: false
}

const controls = {
    flipKeyCode: 32,
    upKeyCode: 1,
    downKeyCode: 2,
    leftKeyCode: 3,
    rightKeyCode: 4
}

let timer;
let timeLeft = 30;

window.onload = function () {
    gameState.isStarted = true;
    gameState.countFlippedCards = 0;
    gameState.score = 0;
    gameState.moves = 0;
    cards.forEach(card => card.classList.add('flipped'))
    setTimeout(() => cards.forEach(card => card.classList.remove('flipped')), 1500);
    timer = setInterval(updateTimer, 1500);
}

function gameOver() {
    clearInterval(timer);
    window.location.href = "/gameover";
}

function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft >= 0)
        document.getElementById("timeLeft").innerHTML = timeLeft;
    else {
        gameOver();
    }
}

function updateScore() {
    gameState.score += 1;
    document.getElementById("scoreValue").innerHTML = gameState.score;
}

function updateMoves() {
    gameState.moves += 1;
    document.getElementById("movesValue").innerHTML = gameState.moves;
}

function updateFlipped() {
    ++gameState.countFlippedCards;
    if (gameState.countFlippedCards <= 2) {
        this.classList.add('flipped');
    }
}

function checkForFlip (e) {
    return  e.keyCode !== controls.flipKeyCode && e.type !== 'click' ||
        !gameState.isStarted ||
        this.classList.contains('flipped');
}

function flipCard(e) {
    if (checkForFlip.call(this, e)) return;
    updateFlipped.call(this);
    if (gameState.countFlippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.checked)');
        if (flippedCards[0].children[0].src === flippedCards[1].children[0].src) {
            flippedCards[0].classList.add('checked');
            flippedCards[1].classList.add('checked');
            updateScore();
        }
        updateMoves();
        setTimeout(() => flipCardsBack(), 1000);
    }
    setTimeout(() => defineWin(), 1500);
}

function flipCardsBack() {
    gameState.countFlippedCards = 0;
    const flippedCards = document.querySelectorAll('.memoryCard:not(.checked)');
    for (let card of flippedCards) {
        card.classList.remove('flipped');
    }
}

function defineWin() {
    const countFlippedCards = document.querySelectorAll('.memoryCard:not(.checked)').length;
    if(!countFlippedCards) {
        setTimeout(() => window.location.href = "/win", 500);
    }
}

function addEventHandlers() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard)
        card.addEventListener('keydown', flipCard)
    });
}

addEventHandlers();
