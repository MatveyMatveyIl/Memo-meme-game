const cards = document.querySelectorAll('.memoryCard');
document.querySelector('#startGameButton').addEventListener('click', startGame);
cards.forEach(card => {
    card.addEventListener('click', flipCard)
});

const gameState = {
    countFlippedCards: 0,
    score: 0,
    isStarted: false,
}

function startGame() {
    if(!gameState.isStarted) {
        gameState.countFlippedCards = 0;
        gameState.isStarted = true;
        cards.forEach(card => card.classList.add('flipped'));
        setTimeout(() => cards.forEach(card => card.classList.remove('flipped')), 1500);
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
            document.getElementById("score").innerHTML = gameState.score;
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
        gameState.countFlippedCards = 0;
        gameState.isStarted = false;
        alert('you win!');
        setTimeout(() => cards.forEach(card => card.classList.remove('flipped')), 1500);
    }
}
