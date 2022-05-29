let cards;

const cardsAmount = 12;
const picturesAmount = 8;

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
    setupCards();
    gameState.isStarted = true;
    gameState.countFlippedCards = 0;
    gameState.score = 0;
    gameState.moves = 0;
    cards.forEach(card => card.classList.add('flipped'))
    setTimeout(() => cards.forEach(card => card.classList.remove('flipped')), 1500);
    timer = setInterval(updateTimer, 1500);
    addEventHandlers();
}

function setupCards(){
    let pictures = getFilesNames(choosePictures());
    for (let i = 0; i < cardsAmount; i++) {
        createCard(pictures);
    }
    cards = document.querySelectorAll(".memoryCard");
}

function choosePictures(){
    let pictures = Array(picturesAmount).fill().map((x,i)=>i);
    let takenPictures = []
    for (let i = 0; i < cardsAmount / 2; i++){
        let pictureIndex = Math.floor(Math.random() * pictures.length);
        takenPictures.push(pictures[pictureIndex] + 1);
        pictures.splice(pictureIndex, 1);
    }
    return takenPictures;
}

function getFilesNames(pictures){
    let files = [];
    for (let picture of pictures){
        let fileName = 'images/open' + picture + '.jpg';
        files.push(fileName);
        files.push(fileName);
    }
    return files;
}

function createCard(pictures){
    let card = document.createElement("div");
    card.className = "memoryCard";
    card.tabIndex = "0";
    let openCard = document.createElement("img");
    openCard.className = "openedCardImg";
    openCard.alt = "open";
    setSrc(openCard, pictures)
    let closedCard = document.createElement("img");
    closedCard.className = "closedCardImg";
    closedCard.alt = "closed";
    closedCard.src = "images/closed.jpg"
    card.appendChild(openCard);
    card.appendChild(closedCard);
    document.querySelector(".board").appendChild(card);
}

function setSrc(card, pictures){
    let pictureIndex = Math.floor(Math.random() * pictures.length);
    card.src = pictures[pictureIndex];
    pictures.splice(pictureIndex, 1);
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


