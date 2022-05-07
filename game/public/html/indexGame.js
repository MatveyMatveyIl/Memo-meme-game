const cards = document.querySelectorAll('.memoryCard');
// document.querySelector('#startGameButton').addEventListener('click', startGame);
cards.forEach(card => {
    card.addEventListener('click', flipCard)
});

let timer;
let timeLeft = 5;
const gameState = {
    countFlippedCards: 0,
    score: 0,
    isStarted: false
}

window.onload = function () {
    gameState.isStarted = true;
    gameState.countFlippedCards = 0;
    gameState.score = 0;
    cards.forEach(card => card.classList.add('flipped'))
    setTimeout(() => cards.forEach(card => card.classList.remove('flipped')), 1500);
    timer = setInterval(updateTimer, 1500);
}

function gameOver() {
    clearInterval(timer);
    window.location.href = "loseGame.html";
}

function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft >= 0)
        document.getElementById("timeLeft").innerHTML = timeLeft;
    else {
        gameOver();
    }
}

function flipCard() {
    if(!gameState.isStarted) return;
    if(this.classList.contains('flipped')) return;
    ++gameState.countFlippedCards;
    if (gameState.countFlippedCards <= 2) {
        this.classList.add('flipped');
    }

    if (gameState.countFlippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.checked)');
        if (flippedCards[0].children[0].src === flippedCards[1].children[0].src) {
            flippedCards[0].classList.add('checked');
            flippedCards[1].classList.add('checked');
            gameState.score += 1;
            document.getElementById("scoreValue").innerHTML = gameState.score;
        }

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
        setTimeout(() => window.location.href = "finishGame.html", 500);
    }
}
