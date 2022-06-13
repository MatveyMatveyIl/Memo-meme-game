let cards;

const cardsAmount = localStorage.getItem('cardsCount');
const defaultPicturesAmount = 8;
const customPicturesAmount = localStorage.getItem('picturesAmount') === null ? 0 : localStorage.getItem('picturesAmount');

const gameState = {
    countFlippedCards: 0,
    score: cardsAmount * 100 * 2,
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
let timeLeft = cardsAmount * 4;

window.onload = function () {
    setupCards();
    clearGameState();
    flipCards();
    document.getElementById("scoreValue").innerHTML = gameState.score;
}

function clearGameState() {
    gameState.countFlippedCards = 0;
    gameState.score = cardsAmount * 100 * 2;
    gameState.moves = 0;
    gameState.isStarted = true;
}

function flipCards(){
    cards.forEach(card => card.classList.add('flipped'))
    setTimeout(() => cards.forEach(card => card.classList.remove('flipped')), 3000);
    timer = setInterval(updateTimer, 1500);
}

function setupCards() {
    let pictures = choosePictures();
    for (let i = 0; i < cardsAmount; i++) {
        createCard(pictures, i);
    }
    cards = document.querySelectorAll(".memoryCard");
    addEventHandlers();
    if (cardsAmount == 2){
        alert()
        document.querySelector(".board").style.gridTemplateColumns = 'repeat(2, max-content)';
    }
}

function choosePictures() {
    let customPictures = [];
    for (let i = 0; i < customPicturesAmount; i++){
        customPictures.push(localStorage.getItem(`im${i}`));
    }

    let defaultPictures = [];
    for (let i = 0; i < defaultPicturesAmount; i++){
        defaultPictures.push(`images/open${i}.jpg`)
    }

    shuffle(customPictures);
    shuffle(defaultPictures);
    let availablePictures = customPictures.concat(defaultPictures);
    let takenPictures = availablePictures.splice(0, cardsAmount / 2);

    for (let i = 0; i < cardsAmount / 2; i++){
        takenPictures.push(takenPictures[i]);
    }
    shuffle(takenPictures);

    return takenPictures;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(pictures, index) {
    let card = document.createElement("div");
    card.className = "memoryCard";
    card.tabIndex = "0";

    let openCard = setCardImage("openedCardImg", "open", pictures[index]);
    let closedCard = setCardImage("closedCardImg", "closed", "images/closed.jpg");

    card.appendChild(openCard);
    card.appendChild(closedCard);
    document.querySelector(".board").appendChild(card);
}

function setCardImage(className, alt, src){
    let cardImg = document.createElement("img");
    cardImg.className = className;
    cardImg.alt = alt;
    cardImg.src = src;
    return cardImg;
}

function gameOver() {
    clearInterval(timer);
    localStorage.setItem('score', gameState.score);
    localStorage.setItem('moves', gameState.moves);
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

function updateScore(guess) {
    if(!guess) gameState.score -= 100;
    localStorage.setItem('score', gameState.score);
    if(gameState.score <= 0) gameOver();
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

function checkForFlip(e) {
    return e.keyCode !== controls.flipKeyCode && e.type !== 'click' ||
        !gameState.isStarted ||
        this.classList.contains('flipped');
}

function flipCard(e) {
    if (checkForFlip.call(this, e)) return;
    updateFlipped.call(this);
    let guess = false;
    if (gameState.countFlippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.checked)');
        if (flippedCards[0].children[0].src === flippedCards[1].children[0].src) {
            flippedCards[0].classList.add('checked');
            flippedCards[1].classList.add('checked');
            guess = true;
        }
        updateScore(guess);
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
    if (!countFlippedCards) {
        localStorage.setItem('score', gameState.score);
        localStorage.setItem('moves', gameState.moves);
        setTimeout(() => window.location.href = "/win", 500);
    }
}

function addEventHandlers() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard)
        card.addEventListener('keydown', flipCard)
    });
}


